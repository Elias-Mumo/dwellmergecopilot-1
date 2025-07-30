# Step-by-Step Database Setup

## If you're having trouble running the full schema, try these smaller chunks:

### STEP 1: Enable Extensions and Create Types
```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create custom types
CREATE TYPE user_role AS ENUM ('tenant', 'landlord', 'admin');
CREATE TYPE property_type AS ENUM ('bedsitter', 'apartment', 'house', 'commercial', 'other');
CREATE TYPE property_status AS ENUM ('pending', 'approved', 'rejected');
```

### STEP 2: Create Profiles Table
```sql
-- Create profiles table
CREATE TABLE profiles (
    id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    role user_role NOT NULL DEFAULT 'tenant',
    full_name TEXT,
    phone TEXT,
    avatar_url TEXT,
    is_banned BOOLEAN DEFAULT FALSE,
    is_scammer BOOLEAN DEFAULT FALSE,
    terms_accepted BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    last_login TIMESTAMP WITH TIME ZONE
);
```

### STEP 3: Create Properties Table
```sql
-- Create properties table
CREATE TABLE properties (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    landlord_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    property_type property_type NOT NULL,
    bedrooms INTEGER NOT NULL DEFAULT 1,
    country TEXT NOT NULL,
    county TEXT NOT NULL,
    sub_county TEXT NOT NULL,
    estate TEXT NOT NULL,
    landlord_phone TEXT NOT NULL,
    landlord_email TEXT NOT NULL,
    caretaker_name TEXT,
    caretaker_phone TEXT,
    caretaker_email TEXT,
    show_caretaker_contact BOOLEAN DEFAULT FALSE,
    status property_status DEFAULT 'pending',
    images TEXT[] DEFAULT '{}',
    videos TEXT[] DEFAULT '{}',
    view_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
```

### STEP 4: Create Supporting Tables
```sql
-- Create favorites table
CREATE TABLE favorites (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    property_id UUID REFERENCES properties(id) ON DELETE CASCADE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(user_id, property_id)
);

-- Create property analytics table
CREATE TABLE property_analytics (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    property_id UUID REFERENCES properties(id) ON DELETE CASCADE NOT NULL,
    user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    action TEXT NOT NULL CHECK (action IN ('view', 'save', 'contact')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create search analytics table
CREATE TABLE search_analytics (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    search_query TEXT NOT NULL,
    location TEXT,
    property_type property_type,
    min_price DECIMAL(10,2),
    max_price DECIMAL(10,2),
    bedrooms INTEGER,
    results_count INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
```

### STEP 5: Create Indexes
```sql
-- Create indexes for better performance
CREATE INDEX idx_properties_status ON properties(status);
CREATE INDEX idx_properties_location ON properties(country, county, sub_county, estate);
CREATE INDEX idx_properties_price ON properties(price);
CREATE INDEX idx_properties_type ON properties(property_type);
CREATE INDEX idx_properties_bedrooms ON properties(bedrooms);
CREATE INDEX idx_properties_created_at ON properties(created_at);
CREATE INDEX idx_property_analytics_property_id ON property_analytics(property_id);
CREATE INDEX idx_property_analytics_created_at ON property_analytics(created_at);
CREATE INDEX idx_search_analytics_created_at ON search_analytics(created_at);
CREATE INDEX idx_favorites_user_id ON favorites(user_id);
```

### STEP 6: Enable Row Level Security
```sql
-- Create RLS (Row Level Security) policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE property_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE search_analytics ENABLE ROW LEVEL SECURITY;
```

### STEP 7: Create Security Policies
```sql
-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert their own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Properties policies
CREATE POLICY "Approved properties are viewable by everyone" ON properties FOR SELECT USING (status = 'approved' OR auth.uid() = landlord_id);
CREATE POLICY "Landlords can insert their own properties" ON properties FOR INSERT WITH CHECK (auth.uid() = landlord_id);
CREATE POLICY "Landlords can update their own properties" ON properties FOR UPDATE USING (auth.uid() = landlord_id);
CREATE POLICY "Landlords can delete their own properties" ON properties FOR DELETE USING (auth.uid() = landlord_id);

-- Favorites policies
CREATE POLICY "Users can view their own favorites" ON favorites FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own favorites" ON favorites FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete their own favorites" ON favorites FOR DELETE USING (auth.uid() = user_id);

-- Analytics policies
CREATE POLICY "Property analytics are viewable by property owner" ON property_analytics FOR SELECT USING (
    EXISTS (SELECT 1 FROM properties WHERE properties.id = property_id AND properties.landlord_id = auth.uid())
);
CREATE POLICY "Anyone can insert property analytics" ON property_analytics FOR INSERT WITH CHECK (true);

CREATE POLICY "Search analytics are viewable by user" ON search_analytics FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Anyone can insert search analytics" ON search_analytics FOR INSERT WITH CHECK (true);
```

### STEP 8: Create Functions and Triggers
```sql
-- Create functions
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, role, full_name)
  VALUES (
    new.id,
    new.email,
    CASE 
      WHEN new.email = 'benedictmugambi12@gmail.com' THEN 'admin'::user_role
      ELSE COALESCE(new.raw_user_meta_data->>'role', 'tenant')::user_role
    END,
    new.raw_user_meta_data->>'full_name'
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Create function to update last_login
CREATE OR REPLACE FUNCTION public.update_last_login()
RETURNS trigger AS $$
BEGIN
  UPDATE public.profiles 
  SET last_login = timezone('utc'::text, now())
  WHERE id = new.id;
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for login tracking
CREATE TRIGGER on_auth_user_login
  AFTER UPDATE OF last_sign_in_at ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.update_last_login();

-- Create function to increment property view count
CREATE OR REPLACE FUNCTION public.increment_property_views(property_uuid UUID)
RETURNS void AS $$
BEGIN
  UPDATE properties 
  SET view_count = view_count + 1 
  WHERE id = property_uuid;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

### STEP 9: Create Views for Analytics
```sql
-- Create view for analytics dashboard
CREATE VIEW public.daily_user_stats AS
SELECT 
  DATE(created_at) as date,
  role,
  COUNT(*) as new_users
FROM profiles 
GROUP BY DATE(created_at), role
ORDER BY date DESC;

CREATE VIEW public.daily_property_stats AS
SELECT 
  DATE(created_at) as date,
  COUNT(*) as new_properties
FROM properties 
GROUP BY DATE(created_at)
ORDER BY date DESC;

CREATE VIEW public.popular_locations AS
SELECT 
  CONCAT(county, ', ', sub_county, ', ', estate) as location,
  COUNT(*) as search_count
FROM search_analytics 
WHERE location IS NOT NULL
GROUP BY county, sub_county, estate
ORDER BY search_count DESC
LIMIT 10;

CREATE VIEW public.popular_properties AS
SELECT 
  p.id,
  p.title,
  p.view_count,
  COUNT(f.id) as favorite_count
FROM properties p
LEFT JOIN favorites f ON p.id = f.property_id
WHERE p.status = 'approved'
GROUP BY p.id, p.title, p.view_count
ORDER BY p.view_count DESC, favorite_count DESC
LIMIT 10;
```

## Instructions:
1. Copy each step one by one
2. Paste into Supabase SQL Editor
3. Run each step individually
4. Wait for success before moving to next step
5. If a step fails, let me know the error message

# Database Setup Guide for DwellMerge

## Overview
This guide will help you set up the database tables for the DwellMerge rental platform in your Supabase project.

## Prerequisites
- Supabase project connected to your Vercel deployment
- Access to your Supabase dashboard

## Step-by-Step Setup

### 1. Access Supabase SQL Editor
1. Go to your [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your DwellMerge project
3. Navigate to "SQL Editor" in the left sidebar

### 2. Execute the Database Schema
1. Copy the contents of `supabase-schema.sql` file
2. Paste it into the SQL Editor
3. Click "Run" to execute all commands

### 3. Verify Tables Creation
After running the schema, you should see these tables in the "Table Editor":

#### Core Tables:
- **profiles** - User information and roles
- **properties** - Property listings
- **favorites** - User's saved properties
- **property_analytics** - Property view/interaction tracking
- **search_analytics** - Search behavior tracking

#### Views (for analytics):
- **daily_user_stats** - Daily user registration statistics
- **daily_property_stats** - Daily property listing statistics
- **popular_locations** - Most searched locations
- **popular_properties** - Most viewed properties

### 4. Set Environment Variables in Vercel
Make sure these environment variables are set in your Vercel project:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
ADMIN_EMAIL=your_admin_email
NEXT_PUBLIC_APP_URL=https://your-vercel-app.vercel.app
```

### 5. Test the Setup
Visit your deployed app and go to:
- `/test-database` - Test database connectivity and table access
- `/test-supabase` - Test basic Supabase connection

## Database Schema Features

### User Roles
- **tenant** - Can search and save properties
- **landlord** - Can create and manage property listings
- **admin** - Can approve/reject properties and manage users

### Property Types
- bedsitter
- apartment
- house
- commercial
- other

### Property Status
- **pending** - Awaiting admin approval
- **approved** - Live and searchable
- **rejected** - Not approved for listing

### Security Features
- Row Level Security (RLS) enabled on all tables
- Users can only see their own data or approved public data
- Automatic user profile creation on signup
- Property approval workflow for quality control

### Analytics Features
- Property view tracking
- Search behavior analytics
- User registration trends
- Popular locations and properties tracking

## Troubleshooting

### If tables don't appear:
1. Check for SQL errors in the Supabase SQL Editor
2. Ensure you have proper permissions
3. Try running sections of the schema separately

### If authentication doesn't work:
1. Verify environment variables in Vercel
2. Check Supabase Auth settings
3. Ensure auth triggers are created properly

### If RLS policies block access:
1. Check that policies are created correctly
2. Verify user authentication is working
3. Test with different user roles

## Next Steps
After setting up the database:
1. Test user registration and authentication
2. Test property creation and approval workflow
3. Verify analytics data collection
4. Set up any additional custom policies if needed

For any issues, check the test pages at `/test-database` and `/test-supabase` to diagnose connection and table access problems.

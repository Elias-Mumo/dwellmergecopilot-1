# DwellMerge - Modern Rental Listing Platform

DwellMerge is a comprehensive rental listing platform that connects tenants with verified landlords. Built with modern web technologies, it provides a secure and user-friendly experience for property rental transactions.

## 🚀 Features

### 🔐 Authentication & User Roles
- **Three User Types**: Tenant, Landlord, Admin
- **Email Verification**: Secure signup process
- **Admin Auto-Assignment**: First user with specified email becomes admin
- **Password Reset**: Forgot password functionality

### 🏘️ Property Management
- **Rich Property Listings**: Title, description, price, type, bedrooms
- **Media Upload**: Images and videos via Supabase Storage
- **Location Hierarchy**: Country → County → Sub-county → Estate
- **Contact Management**: Landlord and optional caretaker contacts
- **Admin Approval**: All properties require admin approval before going live

### 👥 Tenant Features
- **Advanced Search**: Keywords, location, price, bedrooms, property type
- **Property Details**: Full media gallery and contact information
- **Favorites System**: Save properties for later viewing
- **Scam Protection**: Warning popup and safety guidelines

### 🛡️ Admin Panel
- **User Management**: View all users, ban accounts, mark scammers
- **Property Oversight**: Approve/reject listings, delete properties
- **Analytics Dashboard**: Comprehensive charts and statistics
- **Hidden Routes**: Secure admin-only access

### 📊 Analytics & Insights
- Daily/weekly/monthly active users
- New user signups by role
- Property listing trends
- Most viewed properties
- Popular search locations
- Saved/favorited properties

### 🎨 Design & UX
- **Responsive Design**: Mobile-first approach
- **Modern UI**: Tailwind CSS with Shadcn UI components
- **Smooth Animations**: Hover effects and transitions
- **Accessibility**: WCAG compliant components

### 🌐 SEO Optimization
- **Dynamic Meta Tags**: Title, description, Open Graph
- **Semantic HTML**: Proper heading structure and landmarks
- **Clean URLs**: SEO-friendly routing
- **Sitemap & Robots**: Automated generation
- **Performance**: Image optimization and lazy loading

### 📜 Legal Compliance
- **Terms & Conditions**: Comprehensive legal framework
- **Scam Protection**: Clear warnings and liability disclaimers
- **Data Protection**: Privacy-focused design
- **Global Compliance**: Section 230 and international laws

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **UI Components**: Shadcn UI, Radix UI
- **Backend**: Supabase (Auth, Database, Storage)
- **Database**: PostgreSQL with Row Level Security
- **Charts**: Chart.js with React wrapper
- **Icons**: Lucide React
- **Forms**: React Hook Form with Zod validation
- **State Management**: React Query

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn/pnpm
- Supabase account and project

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd dwellmerge
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   Copy `.env.local.example` to `.env.local` and fill in your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   ADMIN_EMAIL=your_admin_email@example.com
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

4. **Set up the database**
   - Go to your Supabase project dashboard
   - Navigate to the SQL Editor
   - Run the SQL script from `supabase-schema.sql`

5. **Configure Supabase Storage**
   - Create a public bucket named "property-media"
   - Set up appropriate RLS policies for file access

6. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

7. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── auth/              # Authentication pages
│   ├── admin/             # Admin panel pages
│   ├── landlord/          # Landlord dashboard
│   ├── properties/        # Property listing pages
│   └── api/               # API routes
├── components/            # React components
│   ├── ui/                # Shadcn UI components
│   ├── layout/            # Layout components
│   ├── forms/             # Form components
│   └── charts/            # Chart components
├── lib/                   # Utility functions
├── types/                 # TypeScript definitions
└── hooks/                 # Custom React hooks
```

## 🔧 Configuration

### Supabase Setup
1. Create a new Supabase project
2. Run the provided SQL migration script
3. Set up authentication providers (email is enabled by default)
4. Configure storage buckets for property media
5. Set up RLS policies for security

### Environment Variables
| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (server-side only) |
| `ADMIN_EMAIL` | Email that gets admin privileges on first signup |
| `NEXT_PUBLIC_APP_URL` | Your app's URL for metadata and redirects |

## 🚢 Deployment

### Vercel (Recommended)
1. Connect your repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms
- **Netlify**: Configure build settings and environment variables
- **Railway**: Deploy with automatic PostgreSQL and Redis
- **Digital Ocean**: Use App Platform with container deployment

## 🔒 Security Features

- **Row Level Security**: Database-level access control
- **Role-based Access**: Three distinct user roles with different permissions
- **Email Verification**: Prevents unauthorized account creation
- **Input Validation**: Zod schemas for form validation
- **XSS Protection**: Sanitized user inputs
- **CSRF Protection**: Built-in Next.js protection

## 📊 Analytics Implementation

The platform includes comprehensive analytics tracking:

- **User Activity**: Login timestamps, page views, search queries
- **Property Metrics**: Views, saves, contact interactions
- **Search Analytics**: Popular locations and search terms
- **Performance Data**: Response times and error rates

## 🎨 Theming

DwellMerge uses a custom color palette inspired by modern real estate platforms:

```css
--color-primary: #F28C42;     /* vibrant amber orange */
--color-secondary: #537895;   /* slate blue */
--color-bg: #FCF9F3;          /* light cream background */
--color-text: #2B2B2B;        /* dark charcoal */
--color-muted: #A0A397;       /* soft gray */
```

## 🧪 Testing

```bash
# Run unit tests
npm test

# Run e2e tests
npm run test:e2e

# Run linting
npm run lint

# Type checking
npm run type-check
```

## 📝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Support

For support, email support@dwellmerge.com or join our Discord community.

## 🚨 Security

Please report security vulnerabilities to security@dwellmerge.com.

---

**Built with ❤️ for the rental community**

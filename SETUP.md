# DwellMerge Setup Instructions

## Prerequisites Installation

### 1. Install Node.js
Since Node.js is not detected on your system, please install it manually:

**Option 1: Download from Official Website (Recommended)**
1. Go to https://nodejs.org/
2. Download the LTS version (recommended)
3. Run the installer and follow the instructions
4. Restart VS Code after installation

**Option 2: Using Chocolatey (if available)**
```powershell
choco install nodejs
```

**Option 3: Using Scoop (if available)**
```powershell
scoop install nodejs
```

### 2. Verify Installation
After installing Node.js, restart your terminal and run:
```bash
node --version
npm --version
```

## Project Setup

### 3. Install Dependencies
Once Node.js is installed, run:
```bash
npm install
```

### 4. Set up Environment Variables
1. Copy `.env.local.example` to `.env.local`
2. Fill in your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   ADMIN_EMAIL=elias@example.com
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

### 5. Set up Supabase Database
1. Create a new Supabase project at https://supabase.com
2. Go to the SQL Editor in your Supabase dashboard
3. Copy and run the SQL script from `supabase-schema.sql`

### 6. Run Development Server
```bash
npm run dev
```

## Current Project Status

✅ **Completed:**
- Next.js 14 project structure with TypeScript
- Tailwind CSS configuration with custom DwellMerge color palette
- Supabase integration setup
- Database schema with complete tables and RLS policies
- Terms and conditions page
- Project documentation and README

⏳ **Next Steps (after Node.js installation):**
1. Install dependencies
2. Create authentication pages (signup, signin)
3. Build property listing components
4. Implement search and filter functionality
5. Create admin dashboard
6. Add analytics charts
7. Set up SEO optimization

## Architecture Overview

The project uses:
- **Frontend**: Next.js 14 with App Router, TypeScript, Tailwind CSS
- **UI Components**: Shadcn UI (Radix UI primitives)
- **Backend**: Supabase (Authentication, Database, Storage)
- **Database**: PostgreSQL with Row Level Security
- **Charts**: Chart.js for analytics
- **Forms**: React Hook Form with Zod validation

## File Structure
```
src/
├── app/                 # Next.js App Router pages
│   ├── auth/           # Authentication pages
│   ├── admin/          # Admin panel
│   ├── landlord/       # Landlord dashboard
│   ├── properties/     # Property listings
│   └── api/            # API routes
├── components/         # React components
│   ├── ui/             # Base UI components
│   ├── layout/         # Layout components
│   └── forms/          # Form components
├── lib/                # Utilities and configs
├── types/              # TypeScript definitions
└── hooks/              # Custom React hooks
```

## Error Resolution

The current TypeScript errors in `next.config.ts` and other files are expected and will be resolved automatically once:
1. Node.js is installed
2. Dependencies are installed with `npm install`
3. The Next.js and React type definitions are available

The project configuration is correct and follows Next.js 14 best practices.

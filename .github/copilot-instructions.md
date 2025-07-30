<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# DwellMerge Project Instructions

## Project Overview
DwellMerge is a modern rental listing platform built with Next.js 14, TypeScript, Supabase, and Tailwind CSS. The application supports three user roles: Tenant, Landlord, and Admin.

## Architecture
- **Frontend**: Next.js 14 with App Router, TypeScript, Tailwind CSS, Shadcn UI
- **Backend**: Supabase (Auth, Database, Storage)
- **Database**: PostgreSQL with Row Level Security (RLS)
- **Styling**: Tailwind CSS with custom color palette
- **State Management**: React Query for server state, Supabase Auth for authentication

## Key Features
1. **Authentication & Roles**: Email verification, role-based access (Tenant/Landlord/Admin)
2. **Property Management**: CRUD operations with admin approval workflow
3. **Search & Filters**: Location-based search with multiple filter options
4. **Admin Panel**: User management, property approval, analytics dashboard
5. **Analytics**: Charts for user activity, property views, search trends
6. **SEO Optimization**: Dynamic meta tags, sitemap, robots.txt

## Coding Guidelines
1. Use TypeScript for all files
2. Follow Next.js 14 App Router patterns
3. Use Supabase client for database operations
4. Implement proper error handling with toast notifications
5. Use Shadcn UI components consistently
6. Follow the established file structure and naming conventions
7. Implement proper loading states and form validation
8. Use React Query for data fetching and caching
9. Ensure mobile-responsive design with Tailwind CSS
10. Follow security best practices with RLS policies

## Color Palette
- Primary: #F28C42 (vibrant amber orange)
- Secondary: #537895 (slate blue)
- Background: #FCF9F3 (light cream)
- Text: #2B2B2B (dark charcoal)
- Muted: #A0A397 (soft gray)

## File Structure
- `/src/app` - Next.js pages and layouts
- `/src/components` - Reusable React components
- `/src/lib` - Utility functions and configurations
- `/src/types` - TypeScript type definitions
- `/src/hooks` - Custom React hooks

## Database Schema
Refer to `supabase-schema.sql` for the complete database structure including tables, policies, and functions.

## Environment Variables
Set up the following in `.env.local`:
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- SUPABASE_SERVICE_ROLE_KEY
- ADMIN_EMAIL
- NEXT_PUBLIC_APP_URL

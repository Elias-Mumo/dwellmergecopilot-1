# Vercel Environment Variables Setup

## Important: Set These in Your Vercel Dashboard

Go to your Vercel project dashboard and add these environment variables:

### 1. Go to Vercel Dashboard
- Visit [vercel.com/dashboard](https://vercel.com/dashboard)
- Select your `dwellmergecopilot-1` project
- Go to "Settings" → "Environment Variables"

### 2. Add These Variables

**NEXT_PUBLIC_SUPABASE_URL**
```
https://wdgxkrvrrhkwivpxqvjf.supabase.co
```

**NEXT_PUBLIC_SUPABASE_ANON_KEY**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndkZ3hrcnZycmhrd2l2cHhxdmpmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM4NjY0OTQsImV4cCI6MjA2OTQ0MjQ5NH0.9SrKRaUBbe8LX8f2DhEFoj_obb78KfBp2gawft8ZGEY
```

**SUPABASE_SERVICE_ROLE_KEY**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndkZ3hrcnZycmhrd2l2cHhxdmpmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1Mzg2NjQ5NCwiZXhwIjoyMDY5NDQyNDk0fQ.U_pApBg4e4giBkPdoElAh0mSgK5Y7A0YTOmUdQPJGvE
```

**ADMIN_EMAIL**
```
benedictmugambi12@gmail.com
```

**NEXT_PUBLIC_APP_URL**
```
https://dwellmergecopilot-1.vercel.app
```

### 3. Important Notes

- Make sure to set the environment for "Production", "Preview", and "Development"
- After adding the variables, redeploy your application
- The corrected Supabase URL is: `https://wdgxkrvrrhkwivpxqvjf.supabase.co` (not the dashboard URL)

### 4. Trigger Redeployment
After setting the environment variables:
- Go to "Deployments" tab in Vercel
- Click "Redeploy" on the latest deployment
- Or push a new commit to trigger automatic redeployment

### 5. Verify Setup
Once redeployed, visit:
- https://dwellmergecopilot-1.vercel.app/setup
- This will check if Supabase connection is working with the new variables

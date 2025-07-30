// Environment variables configuration for Next.js
declare const process: {
  env: {
    [key: string]: string | undefined
  }
}

export const env = {
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY || '',
  ADMIN_EMAIL: process.env.ADMIN_EMAIL || '',
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || '',
} as const

// Type-safe environment variable getter
export function getEnvVar(key: keyof typeof env): string {
  const value = env[key]
  if (!value) {
    throw new Error(`Environment variable ${key} is not defined`)
  }
  return value
}

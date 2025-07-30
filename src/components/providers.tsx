"use client"

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState, createContext, useContext, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import type { User } from '@supabase/supabase-js'

type SupabaseContext = {
  user: User | null
}

const Context = createContext<SupabaseContext | undefined>(undefined)

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient())
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  return (
    <Context.Provider value={{ user }}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </Context.Provider>
  )
}

export const useSupabase = () => {
  const context = useContext(Context)
  if (context === undefined) {
    throw new Error('useSupabase must be used inside SupabaseProvider')
  }
  return context
}

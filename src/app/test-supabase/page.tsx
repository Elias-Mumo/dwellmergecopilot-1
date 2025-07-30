"use client"

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function TestSupabasePage() {
  const [connectionStatus, setConnectionStatus] = useState<'testing' | 'connected' | 'error'>('testing')
  const [error, setError] = useState<string>('')
  const [sessionInfo, setSessionInfo] = useState<string>('')

  useEffect(() => {
    const testConnection = async () => {
      try {
        // Test the connection by trying to get the current session
        const { data, error: authError } = await supabase.auth.getSession()
        
        if (authError) {
          setError(`Supabase connection error: ${authError.message}`)
          setConnectionStatus('error')
        } else {
          setConnectionStatus('connected')
          setSessionInfo(data.session ? 'User is logged in' : 'No active session (connection successful)')
        }
      } catch (err) {
        setError(`Connection test failed: ${err instanceof Error ? err.message : 'Unknown error'}`)
        setConnectionStatus('error')
      }
    }

    testConnection()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-center mb-6">Supabase Connection Test</h1>
        
        <div className="space-y-4">
          <div className="border rounded-lg p-4">
            <h2 className="font-semibold text-lg mb-2">Connection Status</h2>
            <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
              connectionStatus === 'testing' 
                ? 'bg-yellow-100 text-yellow-800' 
                : connectionStatus === 'connected'
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}>
              {connectionStatus === 'testing' && '🔄 Testing...'}
              {connectionStatus === 'connected' && '✅ Connected'}
              {connectionStatus === 'error' && '❌ Error'}
            </div>
          </div>

          {sessionInfo && (
            <div className="border rounded-lg p-4">
              <h2 className="font-semibold text-lg mb-2">Session Status</h2>
              <p className="text-sm text-gray-600">
                {sessionInfo}
              </p>
            </div>
          )}

          {error && (
            <div className="border rounded-lg p-4 border-red-200 bg-red-50">
              <h2 className="font-semibold text-lg mb-2 text-red-800">Error Details</h2>
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {connectionStatus === 'connected' && (
            <div className="border rounded-lg p-4 border-green-200 bg-green-50">
              <h2 className="font-semibold text-lg mb-2 text-green-800">Success!</h2>
              <p className="text-sm text-green-700">
                ✅ Supabase client initialized successfully<br/>
                ✅ Authentication service accessible<br/>
                ✅ Ready for database operations
              </p>
            </div>
          )}
        </div>

        <div className="mt-6 text-center">
          <a 
            href="/" 
            className="text-blue-600 hover:text-blue-800 underline"
          >
            ← Back to Home
          </a>
        </div>
      </div>
    </div>
  )
}

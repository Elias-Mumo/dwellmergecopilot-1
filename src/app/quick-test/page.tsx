"use client"

import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

export default function QuickTestPage() {
  const [status, setStatus] = useState<'testing' | 'success' | 'error'>('testing')
  const [message, setMessage] = useState('')

  useEffect(() => {
    const testConnection = async () => {
      try {
        // Create client with the new credentials
        const supabase = createClient(
          'https://wdgxkrvrrhkwivpxqvjf.supabase.co',
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndkZ3hrcnZycmhrd2l2cHhxdmpmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM4NjY0OTQsImV4cCI6MjA2OTQ0MjQ5NH0.9SrKRaUBbe8LX8f2DhEFoj_obb78KfBp2gawft8ZGEY'
        )

        // Test basic connection
        const { data, error } = await supabase.auth.getSession()
        
        if (error) {
          setStatus('error')
          setMessage(`Connection failed: ${error.message}`)
        } else {
          setStatus('success')
          setMessage('✅ Successfully connected to Supabase with new credentials!')
        }
      } catch (err) {
        setStatus('error')
        setMessage(`Test failed: ${err instanceof Error ? err.message : 'Unknown error'}`)
      }
    }

    testConnection()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-center mb-6">Quick Connection Test</h1>
        
        <div className={`p-4 rounded-lg text-center ${
          status === 'testing' 
            ? 'bg-yellow-50 text-yellow-800' 
            : status === 'success'
            ? 'bg-green-50 text-green-800'
            : 'bg-red-50 text-red-800'
        }`}>
          {status === 'testing' && '🔄 Testing connection...'}
          {status === 'success' && message}
          {status === 'error' && message}
        </div>

        <div className="mt-6 space-y-2 text-sm text-gray-600">
          <p><strong>Supabase URL:</strong> https://wdgxkrvrrhkwivpxqvjf.supabase.co</p>
          <p><strong>Status:</strong> Testing with corrected credentials</p>
        </div>

        <div className="mt-6 text-center space-x-4">
          <a 
            href="/setup" 
            className="text-blue-600 hover:text-blue-800 underline"
          >
            Go to Full Setup Check
          </a>
          <a 
            href="/" 
            className="text-blue-600 hover:text-blue-800 underline"
          >
            Back to Home
          </a>
        </div>
      </div>
    </div>
  )
}

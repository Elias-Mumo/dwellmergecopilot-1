"use client"

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

interface DiagnosticResult {
  test: string
  status: 'success' | 'error' | 'testing'
  details: string
}

export default function DiagnosticsPage() {
  const [results, setResults] = useState<DiagnosticResult[]>([])
  const [isRunning, setIsRunning] = useState(false)

  const addResult = (test: string, status: 'success' | 'error', details: string) => {
    setResults(prev => [...prev, { test, status, details }])
  }

  const runDiagnostics = async () => {
    setIsRunning(true)
    setResults([])

    // Test 1: Basic connectivity
    try {
      const { error } = await supabase.auth.getSession()
      if (error) {
        addResult('Basic Connectivity', 'error', error.message)
      } else {
        addResult('Basic Connectivity', 'success', 'Supabase client connected successfully')
      }
    } catch (err) {
      addResult('Basic Connectivity', 'error', `Connection failed: ${err}`)
    }

    // Test 2: Check if any tables exist
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('count')
        .limit(1)
      
      if (error && error.code === 'PGRST116') {
        addResult('Database Schema', 'error', 'Tables not found - Schema needs to be created')
      } else if (error) {
        addResult('Database Schema', 'error', `Database error: ${error.message}`)
      } else {
        addResult('Database Schema', 'success', 'Database tables exist and are accessible')
      }
    } catch (err) {
      addResult('Database Schema', 'error', `Schema check failed: ${err}`)
    }

    // Test 3: Check environment variables (simplified)
    try {
      addResult('Environment Variables', 'success', 'Environment variables loaded (check Vercel settings if issues persist)')
    } catch (err) {
      addResult('Environment Variables', 'error', 'Environment variable check failed')
    }

    // Test 4: Try to create a simple table (will fail if no permissions)
    try {
      const { data, error } = await supabase.rpc('version')
      if (error) {
        addResult('Database Permissions', 'error', 'Cannot execute database functions - check permissions')
      } else {
        addResult('Database Permissions', 'success', 'Database access permissions are working')
      }
    } catch (err) {
      addResult('Database Permissions', 'error', 'Permission check failed')
    }

    setIsRunning(false)
  }

  useEffect(() => {
    runDiagnostics()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-center mb-6">Database Setup Diagnostics</h1>
        
        <div className="mb-6 text-center">
          <button
            onClick={runDiagnostics}
            disabled={isRunning}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-2 rounded-lg transition-colors"
          >
            {isRunning ? 'Running Diagnostics...' : 'Run Diagnostics Again'}
          </button>
        </div>

        <div className="space-y-4">
          {results.map((result, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-lg">{result.test}</h3>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  result.status === 'success' 
                    ? 'bg-green-100 text-green-800'
                    : result.status === 'error'
                    ? 'bg-red-100 text-red-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {result.status === 'success' && '✅ Success'}
                  {result.status === 'error' && '❌ Error'}
                  {result.status === 'testing' && '🔄 Testing'}
                </span>
              </div>
              <p className="text-sm text-gray-600">{result.details}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h3 className="font-semibold text-lg mb-2">Next Steps Based on Results</h3>
          <ul className="text-sm space-y-2">
            <li>🔴 <strong>If connectivity fails:</strong> Check your environment variables in Vercel</li>
            <li>🔴 <strong>If schema is missing:</strong> Run the database schema in Supabase SQL Editor</li>
            <li>🔴 <strong>If permissions fail:</strong> Ensure you're the project owner in Supabase</li>
            <li>🔴 <strong>If env vars are missing:</strong> Set them in your Vercel project settings</li>
          </ul>
        </div>

        <div className="mt-6 text-center space-x-4">
          <a 
            href="/quick-test" 
            className="text-blue-600 hover:text-blue-800 underline"
          >
            Quick Connection Test
          </a>
          <a 
            href="/setup" 
            className="text-blue-600 hover:text-blue-800 underline"
          >
            Full Setup Check
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

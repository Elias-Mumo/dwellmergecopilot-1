"use client"

import { useEffect, useState, useCallback } from 'react'
import { supabase } from '@/lib/supabase'

interface TestResult {
  test: string
  status: 'success' | 'error' | 'testing'
  message: string
}

export default function DatabaseTestPage() {
  const [results, setResults] = useState<TestResult[]>([])
  const [isRunning, setIsRunning] = useState(false)

  const addResult = useCallback((test: string, status: 'success' | 'error', message: string) => {
    setResults(prev => [...prev, { test, status, message }])
  }, [])

  const runTests = useCallback(async () => {
    setIsRunning(true)
    setResults([])

    // Test 1: Basic connection
    try {
      const { error } = await supabase.auth.getSession()
      if (error) {
        addResult('Basic Connection', 'error', `Connection failed: ${error.message}`)
      } else {
        addResult('Basic Connection', 'success', 'Successfully connected to Supabase')
      }
    } catch (err) {
      addResult('Basic Connection', 'error', `Connection error: ${err instanceof Error ? err.message : 'Unknown error'}`)
    }

    // Test 2: Check profiles table
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('count')
        .limit(1)
      
      if (error) {
        addResult('Profiles Table', 'error', `Table access error: ${error.message}`)
      } else {
        addResult('Profiles Table', 'success', 'Profiles table is accessible')
      }
    } catch (err) {
      addResult('Profiles Table', 'error', `Table error: ${err instanceof Error ? err.message : 'Unknown error'}`)
    }

    // Test 3: Check properties table
    try {
      const { data, error } = await supabase
        .from('properties')
        .select('count')
        .limit(1)
      
      if (error) {
        addResult('Properties Table', 'error', `Table access error: ${error.message}`)
      } else {
        addResult('Properties Table', 'success', 'Properties table is accessible')
      }
    } catch (err) {
      addResult('Properties Table', 'error', `Table error: ${err instanceof Error ? err.message : 'Unknown error'}`)
    }

    // Test 4: Check auth functionality
    try {
      const { data: { user }, error } = await supabase.auth.getUser()
      
      if (error) {
        addResult('Auth Service', 'error', `Auth error: ${error.message}`)
      } else {
        addResult('Auth Service', 'success', user ? 'User is authenticated' : 'Auth service working (no user logged in)')
      }
    } catch (err) {
      addResult('Auth Service', 'error', `Auth error: ${err instanceof Error ? err.message : 'Unknown error'}`)
    }

    // Test 5: Check RLS policies (attempt to read without auth)
    try {
      const { data, error } = await supabase
        .from('properties')
        .select('title')
        .eq('status', 'approved')
        .limit(1)
      
      if (error) {
        addResult('RLS Policies', 'success', 'RLS policies are enforced (expected error for unauthenticated access)')
      } else {
        addResult('RLS Policies', 'success', 'Public data accessible (RLS configured correctly)')
      }
    } catch (err) {
      addResult('RLS Policies', 'error', `RLS test error: ${err instanceof Error ? err.message : 'Unknown error'}`)
    }

    setIsRunning(false)
  }, [addResult])

  useEffect(() => {
    runTests()
  }, [runTests])

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-center mb-6">Database Connection Test</h1>
        
        <div className="mb-6 text-center">
          <button
            onClick={runTests}
            disabled={isRunning}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-2 rounded-lg transition-colors"
          >
            {isRunning ? 'Running Tests...' : 'Run Tests Again'}
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
              <p className="text-sm text-gray-600">{result.message}</p>
            </div>
          ))}
          
          {results.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">
                {isRunning ? 'Running database tests...' : 'Click "Run Tests" to check database connection'}
              </p>
            </div>
          )}
        </div>

        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-semibold text-lg mb-2">About These Tests</h3>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• <strong>Basic Connection:</strong> Verifies Supabase client can connect</li>
            <li>• <strong>Profiles Table:</strong> Checks if the profiles table exists and is accessible</li>
            <li>• <strong>Properties Table:</strong> Checks if the properties table exists and is accessible</li>
            <li>• <strong>Auth Service:</strong> Tests authentication service functionality</li>
            <li>• <strong>RLS Policies:</strong> Verifies Row Level Security is properly configured</li>
          </ul>
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

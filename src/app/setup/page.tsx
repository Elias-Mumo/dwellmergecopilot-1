"use client"

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

interface TableCheck {
  name: string
  exists: boolean
  rowCount?: number
  error?: string
}

export default function DatabaseSetupPage() {
  const [tableChecks, setTableChecks] = useState<TableCheck[]>([])
  const [isChecking, setIsChecking] = useState(false)
  const [setupInstructions, setSetupInstructions] = useState(false)

  const expectedTables = [
    'profiles',
    'properties', 
    'favorites',
    'property_analytics',
    'search_analytics'
  ]

  const expectedViews = [
    'daily_user_stats',
    'daily_property_stats', 
    'popular_locations',
    'popular_properties'
  ]

  const checkTables = async () => {
    setIsChecking(true)
    setTableChecks([])
    
    const results: TableCheck[] = []

    // Check main tables
    for (const tableName of expectedTables) {
      try {
        const { data, error, count } = await supabase
          .from(tableName)
          .select('*', { count: 'exact', head: true })
        
        if (error) {
          results.push({
            name: tableName,
            exists: false,
            error: error.message
          })
        } else {
          results.push({
            name: tableName,
            exists: true,
            rowCount: count || 0
          })
        }
      } catch (err) {
        results.push({
          name: tableName,
          exists: false,
          error: err instanceof Error ? err.message : 'Unknown error'
        })
      }
    }

    // Check views
    for (const viewName of expectedViews) {
      try {
        const { data, error } = await supabase
          .from(viewName)
          .select('*')
          .limit(1)
        
        if (error) {
          results.push({
            name: `${viewName} (view)`,
            exists: false,
            error: error.message
          })
        } else {
          results.push({
            name: `${viewName} (view)`,
            exists: true
          })
        }
      } catch (err) {
        results.push({
          name: `${viewName} (view)`,
          exists: false,
          error: err instanceof Error ? err.message : 'Unknown error'
        })
      }
    }

    setTableChecks(results)
    setIsChecking(false)
  }

  useEffect(() => {
    checkTables()
  }, [])

  const allTablesExist = tableChecks.length > 0 && tableChecks.every(check => check.exists)

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-center mb-6">Database Setup Status</h1>
        
        <div className="mb-6 text-center">
          <button
            onClick={checkTables}
            disabled={isChecking}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-2 rounded-lg transition-colors mr-4"
          >
            {isChecking ? 'Checking...' : 'Check Tables Again'}
          </button>
          
          <button
            onClick={() => setSetupInstructions(!setupInstructions)}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            {setupInstructions ? 'Hide Instructions' : 'Show Setup Instructions'}
          </button>
        </div>

        {/* Setup Status Overview */}
        <div className={`p-4 rounded-lg mb-6 ${
          allTablesExist 
            ? 'bg-green-50 border border-green-200' 
            : 'bg-yellow-50 border border-yellow-200'
        }`}>
          <h2 className="font-semibold text-lg mb-2">
            {allTablesExist ? '✅ Database Setup Complete!' : '⚠️ Database Setup Required'}
          </h2>
          <p className="text-sm">
            {allTablesExist 
              ? 'All required tables and views are present in your Supabase database.'
              : 'Some tables are missing. Please run the database schema in your Supabase SQL Editor.'
            }
          </p>
        </div>

        {/* Table Status */}
        <div className="space-y-4 mb-6">
          <h3 className="text-xl font-semibold">Table Status</h3>
          {tableChecks.map((check, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">{check.name}</h4>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  check.exists 
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {check.exists ? '✅ Exists' : '❌ Missing'}
                </span>
              </div>
              {check.exists && typeof check.rowCount === 'number' && (
                <p className="text-sm text-gray-600">Rows: {check.rowCount}</p>
              )}
              {check.error && (
                <p className="text-sm text-red-600">Error: {check.error}</p>
              )}
            </div>
          ))}
        </div>

        {/* Setup Instructions */}
        {setupInstructions && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
            <h3 className="text-xl font-semibold mb-4">Setup Instructions</h3>
            <div className="space-y-4 text-sm">
              <div>
                <h4 className="font-medium mb-2">1. Access Supabase SQL Editor</h4>
                <p>Go to your Supabase dashboard → SQL Editor</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">2. Run Database Schema</h4>
                <p>Copy and paste the contents of <code className="bg-gray-100 px-1 rounded">supabase-schema.sql</code> into the SQL Editor and run it.</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">3. Verify Environment Variables</h4>
                <p>Ensure your Vercel project has the correct Supabase environment variables set.</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">4. Test the Setup</h4>
                <p>Click "Check Tables Again" to verify all tables were created successfully.</p>
              </div>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="flex justify-center space-x-4 flex-wrap gap-4">
          <a 
            href="/test-supabase" 
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Test Supabase Connection
          </a>
          <a 
            href="/test-database" 
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Test Database Operations
          </a>
          <a 
            href="/auth/signup" 
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Test User Registration
          </a>
          <a 
            href="/" 
            className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Back to Home
          </a>
        </div>
      </div>
    </div>
  )
}

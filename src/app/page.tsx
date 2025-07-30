import { Header } from "@/components/layout/header"
import Link from "next/link"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">DwellMerge</h1>
        <p className="text-lg text-center text-gray-600 mb-8">
          Modern rental listing platform
        </p>
        
        {/* Temporary test links */}
        <div className="flex justify-center space-x-4 flex-wrap gap-4">
          <Link 
            href="/quick-test" 
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors font-semibold"
          >
            ⚡ Quick Test
          </Link>
          <Link 
            href="/setup" 
            className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg transition-colors font-semibold"
          >
            🚀 Database Setup
          </Link>
          <Link 
            href="/test-supabase" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Test Supabase Connection
          </Link>
          <Link 
            href="/test-database" 
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Test Database Tables
          </Link>
          <Link 
            href="/auth/signup" 
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </main>
  )
}

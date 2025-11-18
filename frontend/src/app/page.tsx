'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

export default function Home() {
  const [backendStatus, setBackendStatus] = useState<'checking' | 'connected' | 'error'>('checking')
  const [backendMessage, setBackendMessage] = useState('')

  useEffect(() => {
    // Test connection to Supabase
    const testSupabase = async () => {
      try {
        // Simple query to test connection
        const { data, error } = await supabase
          .from('articles')
          .select('count', { count: 'exact', head: true })

        if (error) throw error

        setBackendStatus('connected')
        setBackendMessage('Connected to Supabase!')
      } catch (error) {
        setBackendStatus('error')
        setBackendMessage('Could not connect to Supabase')
        console.error('Supabase connection error:', error)
      }
    }

    testSupabase()
  }, [])

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="max-w-2xl w-full space-y-8 text-center">
        {/* Logo/Title */}
        <div>
          <h1 className="text-6xl font-bold text-primary-600 mb-4">
            FETCH
          </h1>
          <p className="text-2xl text-gray-600">
            Your Personalized Content Curator
          </p>
        </div>

        {/* Backend Status */}
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Backend Status</h2>
          <div className="flex items-center justify-center space-x-3">
            {backendStatus === 'checking' && (
              <>
                <div className="animate-spin h-5 w-5 border-2 border-primary-600 border-t-transparent rounded-full"></div>
                <span className="text-gray-600">Checking connection...</span>
              </>
            )}
            {backendStatus === 'connected' && (
              <>
                <div className="h-3 w-3 bg-green-500 rounded-full"></div>
                <span className="text-green-600 font-medium">{backendMessage}</span>
              </>
            )}
            {backendStatus === 'error' && (
              <>
                <div className="h-3 w-3 bg-red-500 rounded-full"></div>
                <span className="text-red-600">{backendMessage}</span>
              </>
            )}
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <div className="card">
            <div className="text-4xl mb-3">🎯</div>
            <h3 className="font-semibold mb-2">Curated Content</h3>
            <p className="text-sm text-gray-600">
              Articles tailored to your interests
            </p>
          </div>
          <div className="card">
            <div className="text-4xl mb-3">🔍</div>
            <h3 className="font-semibold mb-2">Information Trails</h3>
            <p className="text-sm text-gray-600">
              Discover connected ideas
            </p>
          </div>
          <div className="card">
            <div className="text-4xl mb-3">📱</div>
            <h3 className="font-semibold mb-2">Anywhere, Anytime</h3>
            <p className="text-sm text-gray-600">
              Works on all your devices
            </p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Link href="/auth/signup" className="btn-primary">
            Get Started
          </Link>
          <Link href="/auth/login" className="btn-secondary">
            Sign In
          </Link>
        </div>

        {/* Phase Indicator */}
        <div className="text-sm text-gray-500 mt-8">
          Phase 1.1 - Core Setup
        </div>
      </div>
    </main>
  )
}

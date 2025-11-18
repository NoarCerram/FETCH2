'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase, type Article } from '@/lib/supabase'

export default function Feed() {
  const router = useRouter()
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [userName, setUserName] = useState<string>('')

  useEffect(() => {
    // Check authentication and fetch data
    const initializeFeed = async () => {
      try {
        // Check if user is logged in
        const { data: { session }, error: sessionError } = await supabase.auth.getSession()

        if (sessionError || !session) {
          router.push('/auth/login')
          return
        }

        // Get user profile
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('name')
          .eq('id', session.user.id)
          .single()

        if (profileError) {
          console.error('Profile fetch error:', profileError)
          setUserName(session.user.email?.split('@')[0] || 'User')
        } else {
          setUserName(profile.name)
        }

        // Fetch articles
        const { data: articlesData, error: articlesError } = await supabase
          .from('articles')
          .select('*')
          .order('published_at', { ascending: false })

        if (articlesError) throw articlesError

        setArticles(articlesData || [])
      } catch (error) {
        console.error('Failed to initialize feed:', error)
      } finally {
        setLoading(false)
      }
    }

    initializeFeed()
  }, [router])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-3 border-primary-600 border-t-transparent rounded-full"></div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/feed" className="text-2xl font-bold text-primary-600">
            FETCH
          </Link>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">
              Welcome, {userName}!
            </span>
            <button
              onClick={handleLogout}
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Your Feed</h1>
          <p className="text-gray-600">
            Personalized content curated just for you
          </p>
        </div>

        {/* Success Notice */}
        <div className="card mb-6 bg-green-50 border border-green-200">
          <h3 className="font-semibold text-green-900 mb-2">🎉 Phase 1 Complete!</h3>
          <p className="text-sm text-green-800">
            Your app is now live with Supabase! You have a working database, authentication,
            and article feed. Next up: adding web scraping in Phase 2.
          </p>
        </div>

        {/* Articles Grid */}
        <div className="space-y-4">
          {articles.map((article) => (
            <article key={article.id} className="card hover:shadow-lg transition-shadow">
              <h2 className="text-xl font-semibold mb-2">
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary-600"
                >
                  {article.title}
                </a>
              </h2>
              <p className="text-gray-600 mb-4">{article.summary}</p>
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>{new Date(article.published_at).toLocaleDateString()}</span>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 hover:underline"
                >
                  Read More →
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* Empty State */}
        {articles.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📭</div>
            <h3 className="text-xl font-semibold mb-2">No articles yet</h3>
            <p className="text-gray-600">
              We'll start fetching articles once you set up your interests!
            </p>
          </div>
        )}
      </div>
    </main>
  )
}

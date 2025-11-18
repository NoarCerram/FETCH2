'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface Article {
  id: number
  title: string
  summary: string
  url: string
  published_at: string
}

export default function Feed() {
  const router = useRouter()
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem('user')
    if (!userData) {
      router.push('/auth/login')
      return
    }
    setUser(JSON.parse(userData))

    // Fetch articles
    const fetchArticles = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
        const response = await fetch(`${apiUrl}/articles`)
        const data = await response.json()
        setArticles(data.articles)
      } catch (error) {
        console.error('Failed to fetch articles:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchArticles()
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('user')
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
              Welcome, {user?.name}!
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

        {/* Coming Soon Notice */}
        <div className="card mb-6 bg-blue-50 border border-blue-200">
          <h3 className="font-semibold text-blue-900 mb-2">🚀 Phase 1.1 Complete!</h3>
          <p className="text-sm text-blue-800">
            Your account system is working! Next up: connecting to Supabase database
            and adding real article scraping in Phase 2.
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

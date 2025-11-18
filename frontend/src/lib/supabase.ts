import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env.local file.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for our database tables
export interface Profile {
  id: string
  email: string
  name: string
  created_at: string
  updated_at: string
}

export interface Article {
  id: string
  title: string
  summary: string | null
  url: string
  source: string | null
  published_at: string
  created_at: string
}

export interface UserInterest {
  id: string
  user_id: string
  interest_name: string
  created_at: string
}

export interface SavedArticle {
  id: string
  user_id: string
  article_id: string
  is_read: boolean
  saved_at: string
}

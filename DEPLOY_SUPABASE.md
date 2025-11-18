# FETCH - Simplified Cloud Deployment Guide
## Using Supabase + Vercel (No Backend Deployment Needed!)

**Total Time: 20 minutes**
**Total Cost: $0/month**
**Difficulty: Beginner-friendly**

---

## 🎯 New Architecture (Simpler!)

```
┌─────────────┐
│   Browser   │
└──────┬──────┘
       │
┌──────▼─────────┐
│ Vercel Frontend│ ← Your Next.js website
└──────┬─────────┘
       │ Direct connection
┌──────▼─────────┐
│   SUPABASE     │ ← Database + Auth + API (all-in-one!)
│  - PostgreSQL  │
│  - Auth system │
│  - Auto API    │
└────────────────┘
```

**What changed?**
- ❌ No Railway backend deployment
- ❌ No custom FastAPI server to manage
- ✅ Supabase provides everything backend needs
- ✅ Frontend connects directly to Supabase
- ✅ Even simpler for beginners!

---

## 📋 Step 1: Create Supabase Project (5 minutes)

### 1.1 Sign Up

1. Go to [supabase.com](https://supabase.com)
2. Click **"Start your project"**
3. Sign up with GitHub (easiest)
4. Verify your email

### 1.2 Create Your Project

1. Click **"New Project"**
2. Choose your organization (create one if needed)
3. Fill in project details:
   - **Name:** `fetch-app`
   - **Database Password:** Generate a strong password (save this!)
   - **Region:** Choose closest to you (e.g., "US West" or "Europe Central")
   - **Pricing Plan:** Free (select this)
4. Click **"Create new project"**

⏳ **Wait 2-3 minutes** while Supabase sets up your database.

### 1.3 Save Your Credentials

Once your project is ready:

1. Go to **Settings** (gear icon) → **API**
2. Copy these values (you'll need them soon):
   ```
   Project URL: https://xxxxx.supabase.co
   anon/public key: eyJhbGc...long string...
   ```

**⚠️ Keep these safe!** You'll add them to Vercel in Step 3.

---

## 📋 Step 2: Set Up Database Tables (5 minutes)

### 2.1 Open SQL Editor

1. In Supabase dashboard, click **"SQL Editor"** (left sidebar)
2. Click **"New Query"**

### 2.2 Create Tables

Copy and paste this SQL, then click **"Run"**:

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create users table (Supabase auth handles this, but we'll add a profiles table)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create articles table
CREATE TABLE public.articles (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  summary TEXT,
  url TEXT NOT NULL UNIQUE,
  source TEXT,
  published_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create user_interests table
CREATE TABLE public.user_interests (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  interest_name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, interest_name)
);

-- Create saved_articles table (users can save articles)
CREATE TABLE public.saved_articles (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  article_id UUID REFERENCES public.articles(id) ON DELETE CASCADE,
  is_read BOOLEAN DEFAULT FALSE,
  saved_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, article_id)
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_interests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_articles ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- RLS Policies for articles (everyone can read)
CREATE POLICY "Anyone can view articles"
  ON public.articles FOR SELECT
  TO authenticated
  USING (true);

-- RLS Policies for user_interests
CREATE POLICY "Users can view their own interests"
  ON public.user_interests FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own interests"
  ON public.user_interests FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own interests"
  ON public.user_interests FOR DELETE
  USING (auth.uid() = user_id);

-- RLS Policies for saved_articles
CREATE POLICY "Users can view their saved articles"
  ON public.saved_articles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can save articles"
  ON public.saved_articles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their saved articles"
  ON public.saved_articles FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their saved articles"
  ON public.saved_articles FOR DELETE
  USING (auth.uid() = user_id);

-- Function to automatically create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1))
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile when user signs up
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Insert some sample articles
INSERT INTO public.articles (title, summary, url, source) VALUES
  ('Welcome to FETCH!', 'Your personalized content curator is now live. Start by selecting your interests to get curated articles.', 'https://example.com/welcome', 'FETCH'),
  ('Getting Started with Content Curation', 'Learn how FETCH discovers and filters content from across the web to match your interests.', 'https://example.com/getting-started', 'FETCH Blog'),
  ('The Power of Information Trails', 'Discover how FETCH connects related content to help you explore topics in depth.', 'https://example.com/trails', 'FETCH Blog');
```

✅ You should see **"Success. No rows returned"** - that's perfect!

### 2.3 Verify Tables

1. Click **"Table Editor"** (left sidebar)
2. You should see: `profiles`, `articles`, `user_interests`, `saved_articles`
3. Click `articles` - you should see 3 sample articles

---

## 📋 Step 3: Deploy Frontend to Vercel (8 minutes)

### 3.1 Sign Up for Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click **"Sign Up"**
3. Choose **"Continue with GitHub"**
4. Authorize Vercel

### 3.2 Import Your Project

1. Click **"Add New..."** → **"Project"**
2. Find your `FETCH2` repository and click **"Import"**
3. Configure build settings:
   - **Framework Preset:** Next.js (auto-detected)
   - **Root Directory:** Click "Edit" → Enter: `frontend`
   - **Build Command:** `npm run build` (leave default)
   - **Output Directory:** `.next` (leave default)

### 3.3 Add Environment Variables

Click **"Environment Variables"** and add these two:

**Variable 1:**
- **Name:** `NEXT_PUBLIC_SUPABASE_URL`
- **Value:** Your Supabase Project URL (from Step 1.3)
- **Environments:** Production, Preview, Development (check all)

**Variable 2:**
- **Name:** `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **Value:** Your Supabase anon/public key (from Step 1.3)
- **Environments:** Production, Preview, Development (check all)

### 3.4 Deploy!

1. Click **"Deploy"**
2. ⏳ Wait 2-3 minutes while Vercel builds and deploys
3. ✅ You'll see "Congratulations!" when done

### 3.5 Get Your Live URL

- Click **"Visit"** or copy the URL
- It looks like: `https://fetch2-yourname.vercel.app`

---

## 🧪 Step 4: Test Your Live App! (2 minutes)

### 4.1 Test Backend Connection

1. Open your Vercel URL
2. Look at "Backend Status" section
3. Should show: 🟢 **"Connected to Supabase"**

### 4.2 Create an Account

1. Click **"Get Started"**
2. Fill in:
   - Name: Your Name
   - Email: your@email.com
   - Password: test123456
3. Click **"Sign Up"**
4. ✅ You should see "Account created successfully!"

### 4.3 Log In

1. Enter your email and password
2. Click **"Sign In"**
3. ✅ You should land on your **Feed** page!

### 4.4 Check Your Feed

- You should see 3 sample articles
- Your name appears in the header
- You can click "Read More" on articles

### 4.5 Verify in Supabase

1. Go back to Supabase dashboard
2. Click **"Authentication"** → **"Users"**
3. ✅ You should see your new user account!
4. Click **"Table Editor"** → `profiles`
5. ✅ You should see your profile!

---

## 🎉 You're Live!

**✅ What's Working:**
- Frontend website on Vercel
- PostgreSQL database on Supabase
- User authentication (signup/login)
- Sample articles in your feed
- Row-level security (users only see their data)

**📍 What's Next:**
- Phase 2: Add real web scraping (we'll add a Render backend for this)
- Phase 3: Interest selection UI
- Phase 4: Automated article fetching

---

## 💰 Costs

| Service | What You're Using | Cost |
|---------|------------------|------|
| **Supabase** | 500MB database, 50k auth users | $0/month |
| **Vercel** | Unlimited deployments | $0/month |

**Total: $0/month** ✨

---

## 🐛 Troubleshooting

### "Failed to connect to Supabase"

**Check:**
1. Environment variables are set correctly in Vercel
2. Both variables are present (URL and anon key)
3. No extra spaces in the values
4. Redeploy after adding env vars: Deployments → "..." → Redeploy

### "Email already registered"

**Solution:**
- Go to Supabase → Authentication → Users
- Delete the user
- Try signing up again

OR just use a different email!

### "Row Level Security" errors

**Solution:**
- Make sure you ran ALL the SQL from Step 2.2
- Check Table Editor → Click table → "Policies" tab
- Should see multiple policies enabled

### Build fails on Vercel

**Check:**
1. Root Directory is set to `frontend`
2. Node.js version is 18+ (Settings → General)
3. All environment variables are added

---

## 🆘 Need Help?

**Check these:**
1. Supabase dashboard for database errors
2. Vercel deployment logs for build errors
3. Browser console (F12) for JavaScript errors

**Common issues:**
- Forgot to set environment variables → Add them and redeploy
- Wrong Root Directory → Change in Settings → General
- SQL didn't run completely → Re-run the SQL query

---

## ✅ Checklist

Before moving to Phase 2, confirm:

- [ ] Supabase project is created and running
- [ ] All database tables exist (profiles, articles, user_interests, saved_articles)
- [ ] Sample articles are visible in Supabase
- [ ] Vercel site is deployed and accessible
- [ ] Environment variables are set in Vercel
- [ ] Backend status shows "Connected to Supabase"
- [ ] You can create an account
- [ ] You can log in successfully
- [ ] Feed page shows 3 sample articles
- [ ] User appears in Supabase Auth dashboard

**All checked? You're ready for Phase 2!** 🚀

---

**Questions? Let me know and I'll help you troubleshoot!**

# Phase 2: Deploy Scraping Backend to Render

**Time:** 15-20 minutes
**Cost:** $0/month (free tier: 750 hours/month)
**Difficulty:** Beginner-friendly

---

## 🎯 What We're Deploying

Your **web scraping backend** - a FastAPI server that:
- ✅ Fetches articles from any URL
- ✅ Extracts title, summary, and content (using Trafilatura)
- ✅ Saves articles to your Supabase database
- ✅ Handles duplicates automatically
- ✅ Supports batch scraping

---

## 📋 Prerequisites

Before starting, make sure you have:
- [x] **Supabase project** from Phase 1 (with database tables set up)
- [x] **GitHub account** (for deploying code)
- [x] **Supabase credentials** handy:
  - Project URL
  - Service Role Key (NOT the anon key!)

---

## 🚀 Step 1: Get Supabase Service Key (2 minutes)

The scraper needs a **service key** (more powerful than the anon key) to write to the database.

1. Go to your **Supabase project dashboard**
2. Click **Settings** (⚙️ icon, bottom left)
3. Click **API**
4. Scroll to "Project API keys"
5. Find **`service_role`** key (⚠️ **secret** key)
6. Click the copy icon
7. **Save this somewhere safe** - you'll need it in Step 3

⚠️ **Important:** The service key bypasses Row Level Security. Never expose it in frontend code!

---

## 🚀 Step 2: Create Render Account (3 minutes)

1. Go to **https://render.com**
2. Click **"Get Started"** or **"Sign Up"**
3. Choose **"Sign up with GitHub"** (easiest)
4. Authorize Render to access your GitHub
5. You'll land on the Render dashboard

**✅ Checkpoint:** You're logged into Render

---

## 🚀 Step 3: Deploy Backend (10 minutes)

### 3.1 Create New Web Service

1. On Render dashboard, click **"New +"** (top right)
2. Select **"Web Service"**
3. Click **"Build and deploy from a Git repository"**
4. Click **"Connect account"** if this is your first time
5. Find your **`FETCH2`** repository
6. Click **"Connect"**

### 3.2 Configure Deployment

Fill in these settings:

**Basic Settings:**
- **Name:** `fetch-scraper` (or whatever you like)
- **Region:** Choose closest to you (e.g., "Oregon (US West)")
- **Branch:** `main` (make sure your latest code is on main!)
- **Root Directory:** `backend` ⚠️ **IMPORTANT!**
- **Environment:** `Python 3`
- **Build Command:** `pip install -r requirements.txt`
- **Start Command:** `uvicorn main:app --host 0.0.0.0 --port $PORT`

**Instance Type:**
- **Plan:** Select **"Free"** ($0/month, 750 hours)

### 3.3 Add Environment Variables

Scroll down to **"Environment Variables"** section.

Click **"Add Environment Variable"** and add these TWO variables:

**Variable 1:**
- **Key:** `SUPABASE_URL`
- **Value:** Your Supabase Project URL (from Phase 1)
  - Example: `https://abcdefg.supabase.co`

**Variable 2:**
- **Key:** `SUPABASE_SERVICE_KEY`
- **Value:** Your Supabase Service Role Key (from Step 1)
  - Example: `eyJhbGc...` (very long string)

### 3.4 Deploy!

1. Click **"Create Web Service"** (at the bottom)
2. Render will:
   - Clone your repository
   - Install Python dependencies (~2-3 minutes)
   - Start your FastAPI server
   - Give you a public URL

⏳ **Wait 3-5 minutes** for the first deployment to complete.

**✅ Checkpoint:** You should see "Deploy succeeded" in green!

---

## 🚀 Step 4: Get Your Scraper URL (1 minute)

1. On your service page, look for **"Your service is live at..."**
2. Copy the URL - it looks like:
   ```
   https://fetch-scraper-xxxx.onrender.com
   ```
3. **Save this URL** - you'll use it to scrape articles!

---

## 🧪 Step 5: Test Your Scraper (3 minutes)

Let's make sure everything works!

### Test 1: Health Check

1. Open a new browser tab
2. Go to: `https://your-scraper-url.onrender.com/`
3. You should see:
   ```json
   {
     "message": "FETCH Scraper is running!",
     "status": "healthy",
     "phase": "2 - Web Scraping",
     "supabase_connected": true
   }
   ```

✅ **If `supabase_connected` is `true`**, you're good!
❌ **If it's `false`**, check your environment variables.

### Test 2: API Documentation

1. Go to: `https://your-scraper-url.onrender.com/docs`
2. You should see the **FastAPI interactive documentation**
3. You'll see endpoints like:
   - `POST /scrape` - Scrape an article
   - `POST /scrape-and-save` - Scrape and save to database
   - `POST /scrape-batch` - Scrape multiple articles
   - `GET /articles` - Get articles from database

### Test 3: Scrape a Real Article!

1. In the API docs (`/docs`), click **`POST /scrape-and-save`**
2. Click **"Try it out"**
3. In the request body, paste:
   ```json
   {
     "url": "https://example.com",
     "source": "test"
   }
   ```
4. Click **"Execute"**
5. You should see a response like:
   ```json
   {
     "success": true,
     "message": "Article saved successfully",
     "article": {
       "id": "...",
       "title": "Example Domain",
       "summary": "Example Domain This domain is...",
       "url": "https://example.com",
       "source": "test"
     },
     "is_duplicate": false
   }
   ```

### Test 4: Verify in Supabase

1. Go to your **Supabase dashboard**
2. Click **"Table Editor"**
3. Click **`articles`** table
4. You should see your newly scraped article! 🎉

**✅ Checkpoint:** Article appears in Supabase = scraper is working!

---

## 🎉 You're Done!

**What's working:**
- ✅ FastAPI scraper deployed on Render
- ✅ Connected to Supabase database
- ✅ Can scrape any article URL
- ✅ Automatically saves to database
- ✅ Handles duplicates
- ✅ **100% free!**

---

## 🐛 Troubleshooting

### "supabase_connected": false

**Problem:** Scraper can't connect to Supabase

**Solutions:**
1. Check environment variables in Render dashboard:
   - Go to your service → "Environment" tab
   - Verify `SUPABASE_URL` and `SUPABASE_SERVICE_KEY` are set
   - Make sure no extra spaces in the values
2. Verify the service key is correct:
   - Go to Supabase → Settings → API
   - Copy the **`service_role`** key again
   - Update in Render
3. **Redeploy after fixing:**
   - Click "Manual Deploy" → "Deploy latest commit"

### Build fails: "No module named 'supabase'"

**Problem:** Dependencies didn't install

**Solutions:**
1. Check `Root Directory` is set to `backend` in Render settings
2. Verify `requirements.txt` exists in `backend/` folder
3. Check build command is: `pip install -r requirements.txt`
4. Redeploy

### Service keeps crashing / "Deploy failed"

**Problem:** Startup command or code error

**Solutions:**
1. Check the logs:
   - Go to your service → "Logs" tab
   - Look for error messages
2. Common issues:
   - Start command typo (should be `uvicorn main:app --host 0.0.0.0 --port $PORT`)
   - Python version issue (Render uses Python 3.7 by default, we need 3.11+)
   - Add to environment variables: `PYTHON_VERSION` = `3.11.0`

### "Failed to fetch URL" when scraping

**Problem:** Some sites block scrapers

**Solutions:**
1. Try a different article URL (some sites have strict anti-scraping measures)
2. Test with these beginner-friendly sites:
   - `https://example.com` (simple HTML)
   - Any Wikipedia article
   - Most blog posts
3. For JavaScript-heavy sites, we'll add Playwright in Phase 4

### Render free tier limitations

**What's included in free tier:**
- 750 hours/month (enough to run 24/7 with downtime)
- Service spins down after 15 minutes of inactivity
- Cold start: 30-60 seconds on first request after spin-down
- This is PERFECT for testing and low-traffic apps!

**To prevent spin-down (optional):**
- Use a cron job or uptime monitor to ping your health endpoint every 10 minutes
- Or upgrade to paid plan ($7/month for always-on)

---

## 📝 Save Your Scraper URL

Add this to your notes:

```
Scraper URL: https://your-scraper-url.onrender.com
```

You'll use this in Phase 3 when we add a "Fetch Articles" button to the frontend!

---

## 🔗 Useful Links

- **Render Dashboard:** https://dashboard.render.com
- **Render Docs:** https://render.com/docs
- **Your Service Logs:** Dashboard → Your Service → "Logs" tab
- **Environment Variables:** Dashboard → Your Service → "Environment" tab

---

## ✅ Phase 2 Checklist

Before moving to Phase 3, confirm:

- [ ] Render service is deployed and shows "Live"
- [ ] Health check shows `supabase_connected: true`
- [ ] API docs are accessible at `/docs`
- [ ] Successfully scraped a test article
- [ ] Article appears in Supabase `articles` table
- [ ] Saved scraper URL for later use

**All checked? Ready for Phase 3!** 🚀

---

## 🎯 What's Next (Phase 3)?

In Phase 3, we'll add:
- **Frontend "Add Article" button** - Scrape from the UI
- **Interest selection** - Pick topics you care about
- **Keyword filtering** - Only show relevant articles
- **Better UX** - Loading states, error handling, success messages

**Tell me when you're ready to start Phase 3!**

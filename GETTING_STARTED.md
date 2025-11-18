# 🚀 Getting Started with FETCH

Welcome! This guide will walk you through deploying FETCH from **zero to live website** in about 30 minutes. No coding experience required!

## 📋 What You'll Need

- [x] A GitHub account (to store your code)
- [x] An email address (for signing up to services)
- [x] 30 minutes of time
- [x] This repository already exists! ✅

---

## ⚡ Phase 1.1: Deploy Your Backend (10 minutes)

### Step 1: Create Railway Account

1. Go to [Railway.app](https://railway.app)
2. Click **"Start a New Project"** or **"Login"**
3. Choose **"Login with GitHub"**
4. Authorize Railway to access your GitHub

**Why Railway?** It's free for starters ($5/month credit) and automatically handles all the server setup for you.

---

### Step 2: Deploy Backend to Railway

1. In Railway dashboard, click **"+ New Project"**
2. Select **"Deploy from GitHub repo"**
3. Choose this repository: `NoarCerram/FETCH2`
4. Railway will ask which folder to deploy:
   - Click **"Configure"**
   - Set **Root Directory** to: `backend`
   - Click **"Deploy"**

5. Railway will automatically:
   - Detect it's a Python project
   - Install all dependencies from `requirements.txt`
   - Start your FastAPI server
   - Give you a public URL

---

### Step 3: Get Your Backend URL

1. In Railway, click on your deployed service
2. Go to **"Settings"** tab
3. Scroll to **"Domains"**
4. Click **"Generate Domain"**
5. You'll get a URL like: `https://fetch-backend-production.up.railway.app`

**✅ Test it:** Click your URL or visit it in a browser. You should see:
```json
{
  "message": "FETCH Backend is running!",
  "status": "healthy",
  "phase": "1 - Core Setup"
}
```

**🎉 Your backend is live!** Copy this URL - you'll need it in the next step.

---

## 🎨 Phase 1.2: Deploy Your Frontend (10 minutes)

### Step 4: Create Vercel Account

1. Go to [Vercel.com](https://vercel.com)
2. Click **"Sign Up"**
3. Choose **"Continue with GitHub"**
4. Authorize Vercel to access your GitHub

**Why Vercel?** It's made by the creators of Next.js and offers unlimited free deployments for personal projects.

---

### Step 5: Deploy Frontend to Vercel

1. In Vercel dashboard, click **"Add New..."** → **"Project"**
2. Click **"Import"** next to your `NoarCerram/FETCH2` repository
3. **Important:** Configure these settings:
   - **Framework Preset:** Next.js (should auto-detect)
   - **Root Directory:** Click "Edit" and type: `frontend`
   - **Build Command:** `npm run build` (default is fine)
   - **Output Directory:** `.next` (default is fine)

4. **Add Environment Variable:**
   - Click **"Environment Variables"**
   - Name: `NEXT_PUBLIC_API_URL`
   - Value: `https://your-railway-url.railway.app` (paste your URL from Step 3)
   - Click **"Add"**

5. Click **"Deploy"**

Vercel will:
- Install all npm packages
- Build your Next.js app
- Deploy it to a global CDN
- Give you a public URL (usually in 2-3 minutes)

---

### Step 6: Visit Your Live Website!

1. After deployment completes, Vercel shows your URL
2. It looks like: `https://fetch2-yourname.vercel.app`
3. Click **"Visit"** or open the URL in your browser

**✅ You should see:**
- FETCH logo and title
- "Backend Status" showing green dot and "FETCH Backend is running!"
- "Get Started" and "Sign In" buttons

**🎉 YOUR WEBSITE IS LIVE!**

---

## 🧪 Phase 1.3: Test Your App (5 minutes)

Let's make sure everything works end-to-end:

### Test 1: Create an Account

1. On your live website, click **"Get Started"**
2. Fill out the signup form:
   - Name: Your Name
   - Email: your@email.com
   - Password: test123
3. Click **"Sign Up"**
4. You should see: "Account created successfully! Please log in."

### Test 2: Log In

1. You'll be redirected to the login page
2. Enter your email and password
3. Click **"Sign In"**
4. You should land on your **Feed** page!

### Test 3: Check Your Feed

1. You should see: "Welcome, [Your Name]!"
2. There's a placeholder article titled "Welcome to FETCH!"
3. You'll see a blue notice: "Phase 1.1 Complete!"

**✅ Everything works!** You now have:
- Working backend API on Railway
- Working frontend website on Vercel
- User authentication (signup/login)
- A basic feed page

---

## 🎯 What You Just Built

Here's what's actually running:

```
[Your Browser]
      ↓
[Vercel Frontend] ← https://your-site.vercel.app
      ↓ API calls
[Railway Backend] ← https://your-api.railway.app
      ↓
[In-Memory Storage] ← (Phase 1.2 will add Supabase database)
```

**Current Features:**
- ✅ User signup/login (stored in server memory)
- ✅ Protected feed page (requires login)
- ✅ Responsive design (works on phone/tablet/desktop)
- ✅ Backend health monitoring

**Not Yet Implemented:**
- ❌ Persistent database (users disappear on server restart)
- ❌ Real article scraping
- ❌ Interest selection
- ❌ AI-powered curation

---

## 🐛 Troubleshooting

### Problem: "Could not connect to backend"

**Solution:**
1. Check that Railway backend is running:
   - Go to Railway dashboard
   - Look for green "Active" status
2. Make sure you added the environment variable in Vercel:
   - Go to Vercel → Your Project → Settings → Environment Variables
   - Verify `NEXT_PUBLIC_API_URL` matches your Railway URL
3. If you changed the env variable, redeploy:
   - Vercel → Deployments → click "..." → Redeploy

### Problem: "Email already registered"

**Solution:**
Your backend restarted and lost the in-memory users. Just use a different email or wait for Phase 1.2 when we add a real database!

### Problem: "404 Page Not Found"

**Solution:**
- Make sure you set Root Directory to `frontend` in Vercel
- Go to Vercel → Settings → General → Root Directory

### Problem: Railway shows "Build Failed"

**Solution:**
1. Check that `backend/requirements.txt` exists
2. Make sure Root Directory is set to `backend`
3. Check Railway logs for specific error messages

---

## 💰 Cost Breakdown

### Current Phase 1.1 Costs:

| Service | Free Tier | What You're Using |
|---------|-----------|-------------------|
| **Railway** | $5/month credit | ~$0.50/month (far under limit) |
| **Vercel** | Unlimited | Free forever for personal use |
| **GitHub** | Unlimited public repos | Free |

**Total Cost: $0/month** ✨

Your Railway credit will last ~10 months before you need to upgrade.

---

## 📚 Next Steps

### Immediate (Phase 1.2): Add Real Database

**What:** Connect Supabase so users are stored permanently

**Benefits:**
- Users don't disappear on server restart
- Better security (password hashing)
- Prepare for storing articles

**Time:** 15 minutes

---

### Coming Soon (Phase 2): Article Scraping

**What:** Automatically fetch articles from the web

**Benefits:**
- Real content in your feed
- Test the core value proposition
- See the scraper in action

**Time:** 1-2 hours

---

### Future (Phase 3+): Full Features

- Interest selection (🎯)
- AI-powered ranking (🤖)
- Information trails (🔍)
- PWA/offline support (📱)
- Social sharing (👥)

---

## 🎓 Understanding Your Stack

### Backend (Railway)
- **Language:** Python 3.11
- **Framework:** FastAPI (modern, fast, auto-documented)
- **What it does:** Handles signup, login, and will fetch articles
- **File:** `backend/main.py`

### Frontend (Vercel)
- **Language:** TypeScript (JavaScript with types)
- **Framework:** Next.js 14 (React-based)
- **Styling:** Tailwind CSS (utility classes)
- **What it does:** The website users see and interact with
- **Files:** `frontend/src/app/`

### How They Talk:
```
Frontend (Vercel) → HTTP requests → Backend (Railway)
                   ← JSON responses ←
```

Example:
```
Signup form → POST /auth/signup → Save user → Return success
```

---

## 🆘 Getting Help

### Documentation
- **FastAPI:** [fastapi.tiangolo.com/tutorial/](https://fastapi.tiangolo.com/tutorial/)
- **Next.js:** [nextjs.org/docs](https://nextjs.org/docs)
- **Railway:** [docs.railway.app](https://docs.railway.app)
- **Vercel:** [vercel.com/docs](https://vercel.com/docs)

### Community
- Railway Discord: [railway.app/discord](https://railway.app/discord)
- Vercel Discord: [vercel.com/discord](https://vercel.com/discord)

### AI Assistants
- Ask ChatGPT or Claude with specific error messages
- Include: the error, what you were trying to do, and relevant code

---

## ✅ Phase 1.1 Checklist

Before moving to Phase 1.2, confirm:

- [ ] Railway backend is deployed and shows "Active"
- [ ] Backend URL returns JSON when visited
- [ ] Vercel frontend is deployed successfully
- [ ] Frontend URL loads the FETCH homepage
- [ ] Backend status shows green "connected"
- [ ] You can create an account
- [ ] You can log in
- [ ] Feed page loads after login
- [ ] You can log out

**All checked?** You're ready for Phase 1.2! 🎉

---

## 🎯 Ready for Phase 1.2?

The next phase adds **Supabase** for a real database. This means:
- ✅ Users persist across server restarts
- ✅ Secure password hashing
- ✅ JWT authentication tokens
- ✅ Ready to store articles

**Time Required:** 15-20 minutes
**Cost:** Free (Supabase free tier: 500MB, 50k users)

**Tell me when you're ready, and I'll guide you through it!**

---

**Questions? Stuck? Just ask! I'll help you troubleshoot any issues. 🚀**

# FETCH - Beginner-Friendly Build Plan
## Cloud-First, Core-First Strategy

### 🎯 **Philosophy**
- Start with the **absolute minimum** that works
- Deploy to **cloud platforms** (no local setup needed)
- Add **one feature at a time**
- Test each step before moving forward

---

## 📦 **What We're Building (Simplified)**

FETCH = A website that:
1. Lets users create an account
2. Scrapes articles from the web
3. Shows them in a clean feed
4. Filters content based on interests

**Later:** AI ranking, offline reading, mobile app features

---

## 🛠️ **Technology Stack (Beginner-Friendly)**

### **Backend** (The "brain")
- **Supabase** - Database + Authentication (Free tier, no setup)
- **Railway** - Hosting for Python scraper (Free $5/month credit)
- **Python FastAPI** - Web server (simple, fast, beginner-friendly)

### **Frontend** (The "face")
- **Next.js** - Website framework (React-based)
- **Vercel** - Free hosting (zero configuration)
- **Tailwind CSS** - Styling (easier than regular CSS)

### **Scraping** (The "collector")
- **Beautiful Soup** - HTML parser (simple, no browser needed)
- **HTTPX** - Fetch web pages (modern, async)

---

## 🏗️ **Build Order: Core → Features**

### **PHASE 1: The Absolute Core (Week 1-2)**
**Goal:** Get a working website with login and database

#### Step 1.1: Set Up Supabase (10 minutes)
- [ ] Create free Supabase account
- [ ] Create new project
- [ ] Get database connection string
- [ ] Create `users` table

#### Step 1.2: Set Up Backend on Railway (20 minutes)
- [ ] Create Railway account
- [ ] Deploy "Hello World" FastAPI app
- [ ] Connect to Supabase database
- [ ] Test with simple endpoint

#### Step 1.3: Set Up Frontend on Vercel (15 minutes)
- [ ] Create Next.js project
- [ ] Deploy to Vercel
- [ ] Add simple login page
- [ ] Connect to backend

**✅ Checkpoint:** You can create an account and log in

---

### **PHASE 2: Basic Scraping (Week 3-4)**
**Goal:** Fetch one article and display it

#### Step 2.1: Simple Scraper
- [ ] Install Beautiful Soup + HTTPX
- [ ] Write function to scrape one article
- [ ] Save article to database
- [ ] Test with a simple blog post

#### Step 2.2: Display Articles
- [ ] Create "Feed" page in Next.js
- [ ] Fetch articles from database
- [ ] Show title + summary + link
- [ ] Add "Fetch New Article" button

**✅ Checkpoint:** Click button → article appears in feed

---

### **PHASE 3: Interest System (Week 5-6)**
**Goal:** Let users pick topics

#### Step 3.1: Interest Management
- [ ] Create `interests` table (tech, sports, science, etc.)
- [ ] Build "Select Interests" page
- [ ] Save user preferences to database
- [ ] Filter articles by selected interests

#### Step 3.2: Smart Filtering
- [ ] Add keyword matching (simple rules)
- [ ] Filter articles based on user interests
- [ ] Show only relevant articles in feed

**✅ Checkpoint:** Only articles matching your interests appear

---

### **PHASE 4: Automated Fetching (Week 7-8)**
**Goal:** Articles appear automatically

#### Step 4.1: Background Jobs
- [ ] Set up Railway Cron jobs
- [ ] Schedule scraper to run every hour
- [ ] Scrape from 5-10 popular sources
- [ ] Store new articles in database

#### Step 4.2: Feed Improvements
- [ ] Add "New" badge for unread articles
- [ ] Sort by publish date
- [ ] Add pagination (10 articles per page)
- [ ] Mark articles as read

**✅ Checkpoint:** New articles appear automatically every hour

---

### **PHASE 5: Polish & UX (Week 9-10)**
**Goal:** Make it beautiful and fast

#### Step 5.1: Better Design
- [ ] Add loading states
- [ ] Improve mobile layout
- [ ] Add icons for interests
- [ ] Smooth animations

#### Step 5.2: Performance
- [ ] Cache article images
- [ ] Add Redis for faster queries (Upstash free tier)
- [ ] Optimize database queries
- [ ] Add error handling

**✅ Checkpoint:** Fast, beautiful, professional-looking app

---

## 🚀 **Future Features (After MVP)**

### **Phase 6: Information Trails**
- Extract links from articles
- Find related content
- Build "rabbit hole" exploration

### **Phase 7: AI Ranking**
- Use embeddings to score relevance
- Personalize article order
- Smart recommendations

### **Phase 8: PWA Features**
- Offline reading
- Save to home screen
- Push notifications

### **Phase 9: Social Features**
- Share articles
- Curate collections
- Follow other users' interests

---

## 💰 **Cost Breakdown (Free for MVP)**

| Service | Free Tier | What We Use It For |
|---------|-----------|-------------------|
| **Supabase** | 500MB database, 50k users | Database + Auth |
| **Railway** | $5/month credit | Backend hosting |
| **Vercel** | Unlimited personal projects | Frontend hosting |
| **Upstash** | 10k requests/day | Redis caching (later) |

**Total Cost:** $0 for first few months (Railway credit covers it)

---

## 🎓 **Learning Resources**

### **Complete Beginners:**
1. **Python FastAPI:** [Official Tutorial](https://fastapi.tiangolo.com/tutorial/)
2. **Next.js:** [Next.js Learn](https://nextjs.org/learn)
3. **Supabase:** [Quick Start Guide](https://supabase.com/docs/guides/getting-started)

### **When You're Stuck:**
1. Check error messages carefully
2. Search error on Google/StackOverflow
3. Ask ChatGPT/Claude for help with specific errors
4. Join Supabase/Railway Discord communities

---

## 📋 **Next Steps (Right Now)**

1. **Create accounts** on these platforms:
   - [Supabase](https://supabase.com) - Click "Start your project"
   - [Railway](https://railway.app) - Sign up with GitHub
   - [Vercel](https://vercel.com) - Sign up with GitHub

2. **Tell me when ready**, and I'll:
   - Create your first database table
   - Write your first API endpoint
   - Deploy your first "Hello World" app

3. **No installations needed** - everything runs in the cloud!

---

## ⚡ **Quick Start Command Summary**

```bash
# You'll run these IN THE BROWSER (Railway/Vercel dashboards)
# No terminal needed on your computer!

# When we DO need terminal commands, I'll provide exact copy-paste instructions
```

---

**Ready to start? Tell me and I'll guide you through Phase 1, Step 1.1! 🚀**

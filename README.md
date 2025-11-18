# FETCH - Your Personalized Content Curator

<div align="center">

![Status](https://img.shields.io/badge/Status-Phase%201-blue)
![License](https://img.shields.io/badge/License-MIT-green)
![Backend](https://img.shields.io/badge/Backend-Supabase-3ECF8E)
![Frontend](https://img.shields.io/badge/Frontend-Next.js%2014-black)

**An intelligent web content aggregation and curation platform that delivers perfectly-sized, personalized content packages.**

[Getting Started](#-quick-start) • [Documentation](#-documentation) • [Features](#-features) • [Tech Stack](#-tech-stack)

</div>

---

## 🎯 What is FETCH?

FETCH solves **information overload** by intelligently discovering, filtering, and curating web content based on your interests. Instead of endless scrolling, you get carefully-sized content packages (7 items) - like a TV episode for your reading time.

### Core Value Proposition

- 📰 **Aggregates** content from diverse sources (news, blogs, Reddit, YouTube)
- 🎯 **Filters** using AI-powered relevance scoring
- 🔍 **Discovers** information trails - related content that connects topics
- 📦 **Packages** content in digestible, "episode-sized" formats
- 📱 **Works** offline as a PWA on all your devices

---

## ✨ Features

### Phase 1 (Current - MVP Core) ✅
- ✅ User authentication via Supabase Auth
- ✅ PostgreSQL database with Row Level Security
- ✅ Clean, responsive UI (Tailwind CSS)
- ✅ Article feed display
- ✅ Cloud-first deployment (Supabase + Vercel)
- ✅ **100% free to deploy and run!**

### Phase 2 (Next - Coming Soon)
- 🔄 Web scraping backend (FastAPI on Render)
- 🔄 Article extraction (Trafilatura)
- 🔄 Interest management system
- 🔄 Rule-based content filtering

### Phase 3 (Planned)
- 🔜 AI-powered ranking (Sentence Transformers)
- 🔜 Information trail discovery
- 🔜 Personalized recommendations
- 🔜 Deduplication system

### Phase 4+ (Future)
- 📅 PWA with offline reading
- 📅 Background sync
- 📅 Social features (share, curate)
- 📅 Premium subscription tier

---

## 🚀 Quick Start

### For Beginners (No Coding Required)

**Total Time: ~20 minutes**

1. **Read** the [Supabase Deployment Guide](DEPLOY_SUPABASE.md)
2. **Set up Supabase** database (5 min)
3. **Deploy frontend** to Vercel (10 min)
4. **Test** your live website (5 min)

**That's it!** You'll have a live website with authentication, database, and sample articles!

### For Developers

**Prerequisites:** Node.js 18+, Supabase account

```bash
# Clone the repository
git clone https://github.com/NoarCerram/FETCH2.git
cd FETCH2

# Set up Supabase (follow DEPLOY_SUPABASE.md for SQL setup)

# Frontend setup
cd frontend
npm install

# Create .env.local from template
cp .env.local.example .env.local
# Edit .env.local with your Supabase credentials

# Run development server
npm run dev
# Visit http://localhost:3000
```

---

## 📁 Project Structure

```
FETCH2/
├── backend/                 # FastAPI backend (Phase 2+)
│   ├── main.py             # Scraping server (future)
│   ├── requirements.txt    # Python dependencies
│   └── README.md           # Backend docs
│
├── frontend/               # Next.js frontend ✅ ACTIVE
│   ├── src/
│   │   ├── app/           # App router pages
│   │   │   ├── page.tsx   # Home
│   │   │   ├── auth/      # Login/Signup
│   │   │   └── feed/      # Article feed
│   │   └── lib/
│   │       └── supabase.ts # Supabase client
│   ├── package.json       # Node dependencies
│   └── README.md          # Frontend docs
│
├── DEPLOY_SUPABASE.md     # 📘 START HERE - Deployment guide
├── BEGINNER_BUILD_PLAN.md # Detailed build roadmap
├── GETTING_STARTED.md     # Alternative guide (Railway-based)
├── technical-brief.md     # Original technical spec
└── README.md              # This file
```

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **HTTP Client:** Supabase JS Client
- **Hosting:** Vercel (free)

### Backend (Phase 1 - Current)
- **Database:** PostgreSQL 15+ (Supabase)
- **Auth:** Supabase Auth (built-in JWT)
- **API:** Auto-generated REST API (Supabase)
- **Row Level Security:** PostgreSQL RLS
- **Hosting:** Supabase (free)

### Backend (Phase 2+ - Planned)
- **Framework:** FastAPI (Python 3.11+)
- **Scraping:** HTTPX, Playwright, Trafilatura
- **Queue:** Celery (background jobs)
- **Cache:** Redis (Upstash)
- **Hosting:** Render.com (free 750hrs/month)

### AI/ML (Phase 3+)
- **Embeddings:** Sentence Transformers (all-MiniLM-L6-v2)
- **Scoring:** Hybrid (50% semantic + 30% quality + 20% rules)

---

## 📚 Documentation

| Document | Description |
|----------|-------------|
| [DEPLOY_SUPABASE.md](DEPLOY_SUPABASE.md) | **📘 START HERE** - Complete deployment walkthrough |
| [BEGINNER_BUILD_PLAN.md](BEGINNER_BUILD_PLAN.md) | Phase-by-phase build roadmap |
| [GETTING_STARTED.md](GETTING_STARTED.md) | Alternative guide (Railway-based, for Phase 2+) |
| [technical-brief.md](technical-brief.md) | Original technical specification |
| [frontend/README.md](frontend/README.md) | Frontend setup and structure |
| [backend/README.md](backend/README.md) | Backend API documentation (Phase 2+) |

---

## 🏗️ Architecture

### Phase 1 (Current - Simplified):
```
┌──────────────┐
│   Browser    │  ← User Interface (Next.js on Vercel)
└──────┬───────┘
       │ Direct API calls (Supabase JS Client)
┌──────▼────────┐
│   SUPABASE    │  ← All-in-one backend
│ ╔════════════╗│
│ ║ PostgreSQL ║│  • User profiles
│ ╚════════════╝│  • Articles
│ ╔════════════╗│  • User interests
│ ║   Auth     ║│  • Saved articles
│ ╚════════════╝│
│ ╔════════════╗│
│ ║  REST API  ║│  • Auto-generated
│ ╚════════════╝│  • Row Level Security
└───────────────┘
```

**Benefits:**
- ✅ No backend to deploy
- ✅ Built-in authentication
- ✅ Real-time subscriptions
- ✅ Completely free
- ✅ Scales to 50k users

### Phase 2+ (Planned - Full Stack):
```
┌──────────────┐
│   Browser    │  ← Next.js (Vercel)
└──────┬───────┘
       │
   ┌───┴────────────┐
   │                │
┌──▼───────┐  ┌────▼──────┐
│Supabase  │  │  FastAPI  │  ← Scraping backend (Render)
│ Database │  │  +Celery  │     • Web scraping
│ + Auth   │  └────┬──────┘     • Background jobs
└──────────┘       │             • AI ranking
              ┌────▼────┐
              │  Redis  │  ← Job queue & cache (Upstash)
              └─────────┘
```

---

## 💰 Cost Breakdown

### Phase 1 Deployment (0-1,000 users) - **Current**
- **Vercel (frontend):** $0 (free unlimited for personal use)
- **Supabase (database + auth):** $0 (free 500MB, 50k auth users, 2GB bandwidth)

**Total: $0/month** ✨

### Phase 2+ Deployment (1,000-10,000 users)
- **Vercel:** $0 (still free)
- **Supabase:** $0 (free tier sufficient)
- **Render (scraper):** $0 (free 750 hours/month)
- **Upstash (Redis):** $0 (free 10k requests/day)

**Total: Still $0/month!** 🎉

### Growth (10K-100K users)
- **Vercel:** $20/month (Pro plan)
- **Supabase:** $25/month (Pro tier)
- **Render:** $7/month (Starter)
- **Upstash:** $10/month

**Total: ~$62/month**

---

## 🎯 Build Phases

### ✅ Phase 1: Foundation (Week 1) - **COMPLETE**
- [x] Supabase database setup
- [x] PostgreSQL tables (users, articles, interests)
- [x] Row Level Security policies
- [x] Next.js frontend with Tailwind CSS
- [x] Authentication (signup/login via Supabase)
- [x] Article feed display
- [x] Vercel deployment
- [x] Complete documentation

**Status:** 🎉 **YOU CAN DEPLOY THIS NOW!**

### 🔄 Phase 2: Scraping (Week 2-3) - **Next**
- [ ] FastAPI scraping server
- [ ] Beautiful Soup + HTTPX
- [ ] Article extraction (Trafilatura)
- [ ] Save scraped articles to Supabase
- [ ] Deploy to Render.com

### 📅 Phase 3: Interests (Week 4-5)
- [ ] Interest selection UI
- [ ] Keyword-based filtering
- [ ] User preference storage
- [ ] Filter feed by interests

### 📅 Phase 4: Automation (Week 6-7)
- [ ] Celery background jobs
- [ ] Scheduled article fetching
- [ ] Multiple source support
- [ ] Redis caching

### 📅 Phase 5+: Advanced Features
- [ ] AI-powered ranking (Sentence Transformers)
- [ ] Information trails
- [ ] PWA capabilities
- [ ] Social sharing
- [ ] Premium features

---

## 🤝 Contributing

This is currently a solo project in active development. Contributions welcome after Phase 2!

**Interested in helping?**
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

## 📄 License

MIT License - See [LICENSE](LICENSE) for details

---

## 🆘 Support

### Having Issues?

1. Check [DEPLOY_SUPABASE.md](DEPLOY_SUPABASE.md) troubleshooting section
2. Review [frontend/README.md](frontend/README.md) for frontend-specific issues
3. Open an issue with:
   - What you were trying to do
   - What happened instead
   - Error messages (if any)
   - Screenshots (if helpful)

---

## 🗺️ Roadmap

- [x] **Nov 2024:** Phase 1 - Core setup with Supabase ✅
- [ ] **Dec 2024:** Phase 2 - Web scraping
- [ ] **Jan 2025:** Phase 3 - Interests system
- [ ] **Feb 2025:** Phase 4 - Automation & AI
- [ ] **Mar 2025:** Beta launch with 100 users
- [ ] **Q2 2025:** Public launch

---

## 📊 Status

**Current Phase:** 1 - Complete ✅

**What's Working:**
- ✅ Supabase database with 4 tables
- ✅ Row Level Security policies
- ✅ User signup/login via Supabase Auth
- ✅ Article feed from database
- ✅ Frontend on Vercel
- ✅ Sample articles pre-loaded
- ✅ 100% free deployment

**What's Next:**
- Phase 2: Add web scraping backend on Render
- Fetch real articles from web
- Implement interest filtering

---

## 🚀 Ready to Deploy?

Follow these steps:

1. **Read** [DEPLOY_SUPABASE.md](DEPLOY_SUPABASE.md)
2. **Create** Supabase account and project (5 min)
3. **Run** SQL setup script (copy-paste)
4. **Deploy** frontend to Vercel (10 min)
5. **Test** your live website!

**Total time:** ~20 minutes
**Total cost:** $0

---

<div align="center">

**Built with ❤️ by [NoarCerram](https://github.com/NoarCerram)**

[⭐ Star this repo](https://github.com/NoarCerram/FETCH2) if you find it useful!

**Questions? Open an issue or check the [documentation](#-documentation)!**

</div>

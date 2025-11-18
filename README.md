# FETCH - Your Personalized Content Curator

<div align="center">

![Status](https://img.shields.io/badge/Status-Phase%201-blue)
![License](https://img.shields.io/badge/License-MIT-green)
![Backend](https://img.shields.io/badge/Backend-FastAPI-009688)
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

### Phase 1 (Current - MVP Core)
- ✅ User authentication (signup/login)
- ✅ Clean, responsive UI
- ✅ Article feed display
- ✅ Cloud-first deployment (Railway + Vercel)

### Phase 2 (Next - Coming Soon)
- 🔄 Web scraping engine (cascade pattern: HTTP → Playwright)
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

**Total Time: ~30 minutes**

1. **Read** the [Getting Started Guide](GETTING_STARTED.md)
2. **Deploy backend** to Railway (10 min)
3. **Deploy frontend** to Vercel (10 min)
4. **Test** your live website (5 min)

**That's it!** You'll have a live website with authentication.

### For Developers

**Prerequisites:** Python 3.11+, Node.js 18+

```bash
# Clone the repository
git clone https://github.com/NoarCerram/FETCH2.git
cd FETCH2

# Backend setup
cd backend
pip install -r requirements.txt
python main.py
# Visit http://localhost:8000/docs

# Frontend setup (in new terminal)
cd frontend
npm install
npm run dev
# Visit http://localhost:3000
```

---

## 📁 Project Structure

```
FETCH2/
├── backend/                 # FastAPI backend
│   ├── main.py             # Main API server
│   ├── requirements.txt    # Python dependencies
│   ├── railway.json        # Railway config
│   └── README.md           # Backend docs
│
├── frontend/               # Next.js frontend
│   ├── src/
│   │   └── app/           # App router pages
│   │       ├── page.tsx   # Home
│   │       ├── auth/      # Login/Signup
│   │       └── feed/      # Article feed
│   ├── package.json       # Node dependencies
│   └── README.md          # Frontend docs
│
├── GETTING_STARTED.md     # Step-by-step beginner guide
├── BEGINNER_BUILD_PLAN.md # Detailed build roadmap
├── technical-brief.md     # Original technical spec
└── README.md              # This file
```

---

## 🛠️ Tech Stack

### Backend
- **Framework:** FastAPI (Python 3.11+)
- **Database:** PostgreSQL 15+ (via Supabase)
- **Cache:** Redis 7+
- **Queue:** Celery (coming in Phase 4)
- **Scraping:** HTTPX, Playwright, Trafilatura
- **Auth:** JWT with python-jose

### Frontend
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State:** Zustand
- **HTTP:** Axios

### Infrastructure
- **Backend Hosting:** Railway (free $5/month credit)
- **Frontend Hosting:** Vercel (free unlimited)
- **Database:** Supabase (free 500MB)
- **Cache:** Upstash Redis (free 10k requests/day)

### AI/ML
- **Embeddings:** Sentence Transformers (all-MiniLM-L6-v2)
- **Scoring:** Hybrid (50% semantic + 30% quality + 20% rules)

---

## 📚 Documentation

| Document | Description |
|----------|-------------|
| [GETTING_STARTED.md](GETTING_STARTED.md) | Complete deployment walkthrough for beginners |
| [BEGINNER_BUILD_PLAN.md](BEGINNER_BUILD_PLAN.md) | Phase-by-phase build roadmap |
| [technical-brief.md](technical-brief.md) | Original technical specification |
| [backend/README.md](backend/README.md) | Backend API documentation |
| [frontend/README.md](frontend/README.md) | Frontend setup and structure |

---

## 🏗️ Architecture

```
┌─────────────────┐
│   Browser       │  ← User Interface (Next.js)
└────────┬────────┘
         │ HTTPS/REST API
┌────────▼────────┐
│   FastAPI       │  ← Application Logic
└────────┬────────┘
         │
    ┌────┼────┬──────────┐
    │    │    │          │
┌───▼──┐ │ ┌──▼───┐  ┌──▼────┐
│Celery│ │ │Redis │  │Scraper│
│Worker│ │ │Cache │  │Engine │
└──────┘ │ └──────┘  └───────┘
         │
    ┌────▼────┐
    │PostgreSQL│  ← Data Storage
    └─────────┘
```

---

## 💰 Cost Breakdown

### Development
- **Tools:** $0 (all open-source)
- **Local testing:** $0

### MVP Deployment (0-1,000 users)
- **Railway (backend):** $0 (covered by free credit)
- **Vercel (frontend):** $0 (free tier)
- **Supabase (database):** $0 (free 500MB)
- **Upstash (Redis):** $0 (free 10k requests/day)

**Total: $0/month** for first few months!

### Growth (1K-10K users)
- **Railway:** $20-30/month
- **Vercel:** $0 (still free)
- **Supabase:** $25/month (Pro tier)
- **Upstash:** $10/month

**Total: ~$55-65/month**

---

## 🎯 Build Phases

### ✅ Phase 1: Foundation (Weeks 1-2) - **Current**
- [x] FastAPI backend with basic auth
- [x] Next.js frontend with login/signup
- [x] Cloud deployment (Railway + Vercel)
- [x] Documentation for beginners

### 🔄 Phase 2: Scraping (Weeks 3-4) - **Next**
- [ ] HTTP scraper with Beautiful Soup
- [ ] Article extraction (Trafilatura)
- [ ] Save articles to database
- [ ] Display in feed

### 📅 Phase 3: Interests (Weeks 5-6)
- [ ] Interest management UI
- [ ] Keyword-based filtering
- [ ] User preferences storage

### 📅 Phase 4: Automation (Weeks 7-8)
- [ ] Background job scheduling
- [ ] Automatic article fetching
- [ ] Multiple source support

### 📅 Phase 5+: Advanced Features
- [ ] AI-powered ranking
- [ ] Information trails
- [ ] PWA capabilities
- [ ] Social features

---

## 🤝 Contributing

This is currently a solo project, but contributions are welcome once Phase 2 is complete!

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

1. Check [GETTING_STARTED.md](GETTING_STARTED.md) troubleshooting section
2. Review [backend/README.md](backend/README.md) or [frontend/README.md](frontend/README.md)
3. Open an issue with:
   - What you were trying to do
   - What happened instead
   - Error messages (if any)
   - Your environment (Railway/Vercel URLs)

---

## 🗺️ Roadmap

- [x] **Q4 2024:** Phase 1 - Core setup
- [ ] **Q1 2025:** Phases 2-3 - Scraping & Interests
- [ ] **Q2 2025:** Phase 4-5 - Automation & AI
- [ ] **Q3 2025:** Beta launch with 100 users
- [ ] **Q4 2025:** Public launch

---

## 📊 Status

**Current Phase:** 1.1 - Core Deployment ✅

**What's Working:**
- Backend API on Railway
- Frontend website on Vercel
- User signup/login
- Basic feed display

**What's Next:**
- Phase 1.2: Connect Supabase database
- Phase 2: Add web scraping
- Phase 3: Implement interests

---

<div align="center">

**Built with ❤️ by [NoarCerram](https://github.com/NoarCerram)**

[⭐ Star this repo](https://github.com/NoarCerram/FETCH2) if you find it useful!

</div>

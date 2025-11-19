# FETCH Backend - Web Scraping Engine

This is the Python FastAPI server that scrapes and extracts articles for FETCH.

**Phase:** 2 - Web Scraping
**Purpose:** Fetch articles from the web and save to Supabase
**Deployment:** Render.com (free tier)

---

## 🎯 What This Does

The backend scraper:
- ✅ Fetches articles from any URL
- ✅ Extracts content using Trafilatura (F1 score: 0.958)
- ✅ Falls back to BeautifulSoup if needed
- ✅ Saves articles to Supabase database
- ✅ Handles duplicate detection automatically
- ✅ Supports batch scraping

---

## 🚀 Quick Deploy to Render (Recommended)

**See:** [DEPLOY_RENDER.md](../DEPLOY_RENDER.md) for complete step-by-step guide.

### Quick Steps:

1. **Create Render account** (sign up with GitHub)
2. **Deploy from GitHub:**
   - New Web Service → Connect `FETCH2` repo
   - Root Directory: `backend`
   - Build: `pip install -r requirements.txt`
   - Start: `uvicorn main:app --host 0.0.0.0 --port $PORT`
3. **Add environment variables:**
   - `SUPABASE_URL` - Your Supabase project URL
   - `SUPABASE_SERVICE_KEY` - Your Supabase service role key
4. **Deploy!**

**Cost:** $0/month (free 750 hours)

---

## 🔗 Your Scraper URL

After deployment, Render gives you a URL like:
```
https://fetch-scraper-xxxx.onrender.com
```

### Test it:
- `https://your-url.onrender.com/` - Health check
- `https://your-url.onrender.com/docs` - Interactive API docs

---

## 📖 API Endpoints

### Health Check
```http
GET /
GET /health
```
Returns scraper status and Supabase connection state.

### Scrape Article (Preview Only)
```http
POST /scrape
Content-Type: application/json

{
  "url": "https://example.com/article",
  "source": "web"
}
```
Returns extracted article data **without** saving to database.

### Scrape and Save
```http
POST /scrape-and-save
Content-Type: application/json

{
  "url": "https://example.com/article",
  "source": "web"
}
```
Scrapes article and saves to Supabase. Handles duplicates automatically.

**Response:**
```json
{
  "success": true,
  "message": "Article saved successfully",
  "article": {
    "id": "uuid",
    "title": "Article Title",
    "summary": "First 200 chars of content...",
    "url": "https://example.com/article",
    "source": "web",
    "published_at": "2024-11-18T12:00:00"
  },
  "is_duplicate": false
}
```

### Batch Scraping
```http
POST /scrape-batch
Content-Type: application/json

[
  "https://example.com/article1",
  "https://example.com/article2",
  "https://example.com/article3"
]
```
Scrapes up to 10 URLs. Returns results for each.

### Get Articles
```http
GET /articles?limit=50
```
Returns recent articles from database (for testing).

---

## 🔧 Environment Variables

### Required for Deployment:

```env
# Supabase Connection
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_KEY=eyJhbGc...  # Service role key, NOT anon key

# Optional
PORT=8000  # Render sets this automatically
```

**Where to get these:**
- Supabase Dashboard → Settings → API
- Use **`service_role`** key (bypasses RLS, needed for server-side writes)

---

## 📁 File Structure

```
backend/
├── main.py              # FastAPI app with scraping logic
├── requirements.txt     # Python dependencies
├── render.yaml          # Render deployment config
├── Procfile             # Alternative deployment config
└── README.md            # This file
```

---

## 🧪 Test Locally (Optional)

If you want to run this on your computer:

### Prerequisites:
- Python 3.11+ ([download here](https://www.python.org/downloads/))
- Supabase project with credentials

### Steps:

```bash
# Navigate to backend directory
cd backend

# Create virtual environment (recommended)
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Set environment variables
export SUPABASE_URL="https://your-project.supabase.co"
export SUPABASE_SERVICE_KEY="your-service-key"

# Run server
python main.py

# Visit http://localhost:8000/docs
```

---

## 🔍 How Scraping Works

### Cascade Pattern:

```
1. Fetch HTML with HTTPX (fast, works 80% of time)
    ↓
2. Extract with Trafilatura (best extraction quality)
    ↓ (if fails)
3. Fallback to BeautifulSoup (reliable but less accurate)
    ↓
4. Save to Supabase (with duplicate check)
```

### Features:

- **User-Agent header:** Identifies as FETCH educational project
- **Timeout:** 30 seconds max per URL
- **Follows redirects:** Automatically
- **Duplicate detection:** MD5 hash of URL
- **Error handling:** Returns meaningful error messages

---

## 🛠️ Tech Stack

- **Framework:** FastAPI 0.104.1 (async support)
- **HTTP Client:** HTTPX 0.25.2 (modern, async)
- **HTML Parser:** BeautifulSoup4 4.12.2
- **Content Extractor:** Trafilatura 1.6.2 (F1: 0.958)
- **Database:** Supabase Python Client 2.3.0
- **Server:** Uvicorn (ASGI server)

---

## 🐛 Troubleshooting

### "supabase_connected": false

**Check:**
1. Environment variables are set in Render
2. Using **service role** key, not anon key
3. Supabase project is active (not paused)
4. No typos in SUPABASE_URL

### "Failed to fetch URL"

**Common causes:**
1. Site blocks scrapers (use different URL)
2. Site requires JavaScript (we'll add Playwright in Phase 4)
3. Site is down or slow (check in browser first)
4. Invalid URL format

**Test with these beginner-friendly sites:**
- https://example.com
- Any Wikipedia article
- Most blog posts

### Build fails on Render

**Check:**
1. Root Directory is set to `backend`
2. `requirements.txt` exists in backend folder
3. Python version is 3.11+ (add `PYTHON_VERSION=3.11.0` to env vars)

---

## 📚 Next Steps

After deploying:

1. ✅ Test health endpoint
2. ✅ Test scraping via `/docs`
3. ✅ Verify articles appear in Supabase
4. ✅ Save your scraper URL
5. 🔜 Move to Phase 3 (add frontend integration)

---

## 🔗 Related Docs

- [Deploy to Render Guide](../DEPLOY_RENDER.md) - Complete deployment walkthrough
- [Main README](../README.md) - Project overview
- [Supabase Deployment](../DEPLOY_SUPABASE.md) - Database setup

---

**Built for FETCH Phase 2** 🚀

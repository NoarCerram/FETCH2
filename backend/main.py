# FETCH Backend - Phase 2: Web Scraping Engine
# This is the scraping server that will run on Render.com

from fastapi import FastAPI, HTTPException, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, HttpUrl
from typing import Optional, List
import os
import httpx
from bs4 import BeautifulSoup
import trafilatura
from datetime import datetime
from supabase import create_client, Client
import hashlib

# Initialize FastAPI
app = FastAPI(
    title="FETCH Scraper API",
    version="2.0.0",
    description="Web scraping and article extraction service for FETCH"
)

# CORS - Allow Vercel frontend to call this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with your Vercel URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Supabase client
supabase_url = os.getenv("SUPABASE_URL")
supabase_key = os.getenv("SUPABASE_SERVICE_KEY")  # Use service key for server-side

if not supabase_url or not supabase_key:
    print("⚠️  WARNING: Supabase credentials not found. Article storage will fail.")
    supabase: Optional[Client] = None
else:
    supabase: Client = create_client(supabase_url, supabase_key)
    print("✅ Connected to Supabase")


# ===== DATA MODELS =====
class ScrapeRequest(BaseModel):
    url: HttpUrl
    source: Optional[str] = "web"

class Article(BaseModel):
    title: str
    summary: Optional[str] = None
    url: str
    source: Optional[str] = "web"
    content: Optional[str] = None  # Full extracted content
    published_at: Optional[datetime] = None


# ===== HEALTH CHECK =====
@app.get("/")
def read_root():
    """Health check endpoint"""
    return {
        "message": "FETCH Scraper is running!",
        "status": "healthy",
        "phase": "2 - Web Scraping",
        "supabase_connected": supabase is not None
    }

@app.get("/health")
def health_check():
    """Health check for Render"""
    return {"status": "ok", "supabase": supabase is not None}


# ===== SCRAPING FUNCTIONS =====
async def scrape_article(url: str) -> dict:
    """
    Scrape an article from a URL using cascade pattern:
    1. Try simple HTTP request (fast, works 80% of the time)
    2. Use Trafilatura for content extraction
    3. Fallback to BeautifulSoup if Trafilatura fails

    Returns dict with article data or raises exception
    """
    try:
        # Step 1: Fetch the page
        async with httpx.AsyncClient(timeout=30.0) as client:
            headers = {
                'User-Agent': 'FETCH/2.0 (Educational Content Aggregator; https://github.com/NoarCerram/FETCH2)'
            }
            response = await client.get(url, headers=headers, follow_redirects=True)
            response.raise_for_status()
            html_content = response.text

        # Step 2: Extract article content with Trafilatura (best extraction)
        extracted = trafilatura.extract(
            html_content,
            include_comments=False,
            include_tables=False,
            output_format='json',
            url=url
        )

        if extracted:
            import json
            data = json.loads(extracted)

            # Create summary (first 200 chars of content)
            content = data.get('text', '')
            summary = content[:200] + "..." if len(content) > 200 else content

            return {
                "title": data.get('title', 'Untitled'),
                "summary": summary,
                "content": content,
                "url": url,
                "author": data.get('author'),
                "published_at": data.get('date'),
            }

        # Step 3: Fallback to BeautifulSoup if Trafilatura fails
        soup = BeautifulSoup(html_content, 'html.parser')

        # Try to extract title
        title = None
        if soup.find('title'):
            title = soup.find('title').get_text().strip()
        elif soup.find('h1'):
            title = soup.find('h1').get_text().strip()
        else:
            title = "Untitled Article"

        # Try to extract main content
        content = ""
        # Look for common article containers
        article_tags = soup.find_all(['article', 'main', 'div'], class_=['content', 'article', 'post'])
        if article_tags:
            content = article_tags[0].get_text(strip=True, separator=' ')
        else:
            # Fallback: get all paragraphs
            paragraphs = soup.find_all('p')
            content = ' '.join([p.get_text(strip=True) for p in paragraphs[:10]])  # First 10 paragraphs

        summary = content[:200] + "..." if len(content) > 200 else content

        return {
            "title": title,
            "summary": summary,
            "content": content,
            "url": url,
            "author": None,
            "published_at": None,
        }

    except httpx.HTTPError as e:
        raise HTTPException(status_code=400, detail=f"Failed to fetch URL: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Scraping error: {str(e)}")


def save_article_to_supabase(article_data: dict) -> dict:
    """
    Save article to Supabase database
    Returns the saved article data
    """
    if not supabase:
        raise HTTPException(status_code=503, detail="Supabase not configured")

    try:
        # Create URL hash for deduplication
        url_hash = hashlib.md5(article_data['url'].encode()).hexdigest()

        # Check if article already exists
        existing = supabase.table('articles').select('id, url').eq('url', article_data['url']).execute()

        if existing.data:
            return {
                "message": "Article already exists",
                "article": existing.data[0],
                "is_duplicate": True
            }

        # Prepare article data for database
        db_article = {
            "title": article_data['title'],
            "summary": article_data.get('summary'),
            "url": article_data['url'],
            "source": article_data.get('source', 'web'),
            "published_at": article_data.get('published_at') or datetime.now().isoformat(),
        }

        # Insert into database
        result = supabase.table('articles').insert(db_article).execute()

        return {
            "message": "Article saved successfully",
            "article": result.data[0] if result.data else db_article,
            "is_duplicate": False
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")


# ===== API ENDPOINTS =====
@app.post("/scrape")
async def scrape_single_article(request: ScrapeRequest):
    """
    Scrape a single article from a URL

    This endpoint:
    1. Fetches the article content
    2. Extracts title, summary, and content
    3. Returns the extracted data (does NOT save to database)

    Use /scrape-and-save to automatically save to Supabase
    """
    article_data = await scrape_article(str(request.url))
    article_data['source'] = request.source

    return {
        "success": True,
        "article": article_data
    }


@app.post("/scrape-and-save")
async def scrape_and_save_article(request: ScrapeRequest):
    """
    Scrape an article and save it to Supabase

    This endpoint:
    1. Fetches and extracts the article
    2. Saves it to the Supabase database
    3. Returns the saved article data

    Automatically handles duplicates (won't save the same URL twice)
    """
    # Scrape the article
    article_data = await scrape_article(str(request.url))
    article_data['source'] = request.source

    # Save to database
    result = save_article_to_supabase(article_data)

    return {
        "success": True,
        **result
    }


@app.post("/scrape-batch")
async def scrape_batch_articles(urls: List[HttpUrl], background_tasks: BackgroundTasks):
    """
    Scrape multiple articles in the background

    This endpoint:
    1. Accepts a list of URLs
    2. Queues them for scraping in the background
    3. Returns immediately with a job ID

    Use this for scraping many articles at once without waiting
    """
    # For now, we'll do a simple implementation
    # In Phase 4, we'll add Celery for proper background jobs

    results = []
    for url in urls[:10]:  # Limit to 10 URLs for safety
        try:
            article_data = await scrape_article(str(url))
            result = save_article_to_supabase(article_data)
            results.append({
                "url": str(url),
                "success": True,
                "is_duplicate": result.get('is_duplicate', False)
            })
        except Exception as e:
            results.append({
                "url": str(url),
                "success": False,
                "error": str(e)
            })

    return {
        "total": len(urls),
        "processed": len(results),
        "results": results
    }


@app.get("/articles")
def get_articles(limit: int = 50):
    """
    Get recent articles from Supabase

    This is mainly for testing - frontend should call Supabase directly
    """
    if not supabase:
        raise HTTPException(status_code=503, detail="Supabase not configured")

    try:
        result = supabase.table('articles')\
            .select('*')\
            .order('published_at', desc=True)\
            .limit(limit)\
            .execute()

        return {
            "articles": result.data,
            "total": len(result.data)
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")


# Run the server
if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=True)

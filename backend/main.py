# FETCH Backend - Phase 1: The Absolute Core
# This is your FastAPI server that will run on Railway

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os

# Create the FastAPI app
app = FastAPI(title="FETCH API", version="1.0.0")

# Allow frontend to talk to backend (CORS)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with your Vercel URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ===== PHASE 1: HELLO WORLD =====
@app.get("/")
def read_root():
    """Test endpoint - Visit this URL to see if your backend is working"""
    return {
        "message": "FETCH Backend is running!",
        "status": "healthy",
        "phase": "1 - Core Setup"
    }

@app.get("/health")
def health_check():
    """Health check for Railway"""
    return {"status": "ok"}


# ===== PHASE 1: SIMPLE AUTHENTICATION =====
# Data models (what data looks like)
class UserCreate(BaseModel):
    email: str
    password: str
    name: str

class UserLogin(BaseModel):
    email: str
    password: str


# Temporary storage (will be replaced with Supabase later)
fake_users_db = {}

@app.post("/auth/signup")
def signup(user: UserCreate):
    """
    Create a new user account

    For now, this just stores in memory (resets when server restarts)
    We'll connect Supabase in the next step
    """
    if user.email in fake_users_db:
        raise HTTPException(status_code=400, detail="Email already registered")

    fake_users_db[user.email] = {
        "email": user.email,
        "name": user.name,
        "password": user.password  # WARNING: Never store passwords like this in production!
    }

    return {
        "message": "Account created successfully!",
        "user": {"email": user.email, "name": user.name}
    }

@app.post("/auth/login")
def login(credentials: UserLogin):
    """
    Log in to your account

    Returns a simple success message for now
    We'll add JWT tokens in the next phase
    """
    user = fake_users_db.get(credentials.email)

    if not user or user["password"] != credentials.password:
        raise HTTPException(status_code=401, detail="Invalid email or password")

    return {
        "message": "Login successful!",
        "user": {"email": user["email"], "name": user["name"]}
    }

@app.get("/users/me")
def get_current_user():
    """Get current user info - placeholder for now"""
    return {"message": "User authentication will be added in Phase 1.2"}


# ===== PHASE 2: ARTICLE ENDPOINTS (Coming Soon) =====
@app.get("/articles")
def get_articles():
    """
    Get all articles from the feed

    This will connect to Supabase in Phase 1.2
    For now, it returns placeholder data
    """
    return {
        "articles": [
            {
                "id": 1,
                "title": "Welcome to FETCH!",
                "summary": "This is a placeholder article. Once you connect Supabase, real articles will appear here.",
                "url": "https://example.com",
                "published_at": "2025-11-18T00:00:00Z"
            }
        ],
        "total": 1
    }


# ===== PHASE 3: INTERESTS (Coming Soon) =====
@app.get("/interests")
def get_interests():
    """Get list of available interests"""
    return {
        "interests": [
            {"id": 1, "name": "Technology", "icon": "💻"},
            {"id": 2, "name": "Science", "icon": "🔬"},
            {"id": 3, "name": "Business", "icon": "💼"},
            {"id": 4, "name": "Health", "icon": "🏥"},
            {"id": 5, "name": "Sports", "icon": "⚽"},
        ]
    }


# Run the server (for local testing only - Railway runs this automatically)
if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=True)

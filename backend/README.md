# FETCH Backend

This is the Python FastAPI server that powers FETCH.

## 🚀 Quick Deploy to Railway

### Option 1: Deploy via Railway Dashboard (Easiest)

1. Go to [Railway](https://railway.app)
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Choose this repository
5. Select the `backend` folder as the root directory
6. Railway will automatically detect and deploy!

### Option 2: Deploy via Railway CLI

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Link project
railway link

# Deploy
railway up
```

## 🔗 Your Backend URL

After deployment, Railway will give you a URL like:
```
https://fetch-backend-production.up.railway.app
```

Test it by visiting:
- `https://your-url.railway.app/` - Should show "FETCH Backend is running!"
- `https://your-url.railway.app/health` - Should show `{"status": "ok"}`

## 📖 API Documentation

Once deployed, visit:
```
https://your-url.railway.app/docs
```

This shows all available endpoints with a **test interface**!

## 🔧 Environment Variables (Phase 1.2)

You'll add these in Railway dashboard later:

```env
# Database
SUPABASE_URL=your-project-url
SUPABASE_KEY=your-anon-key

# Security
JWT_SECRET_KEY=your-random-secret-key
```

## 📁 File Structure

```
backend/
├── main.py           # Main FastAPI application
├── requirements.txt  # Python dependencies
├── railway.json      # Railway configuration
├── Procfile          # Alternative deployment config
└── README.md         # This file
```

## 🧪 Test Locally (Optional)

If you want to run this on your computer:

```bash
# Install Python 3.11+
# Install dependencies
pip install -r requirements.txt

# Run server
python main.py

# Visit http://localhost:8000
```

## 📚 Next Steps

- [x] Phase 1.1: Deploy basic backend ← **YOU ARE HERE**
- [ ] Phase 1.2: Connect Supabase database
- [ ] Phase 2: Add article scraping
- [ ] Phase 3: Add interests system

# FETCH Frontend

This is the Next.js 14 frontend for FETCH, built with React, TypeScript, and Tailwind CSS.

## 🚀 Quick Deploy to Vercel (Easiest!)

### Deploy with One Click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Click the button above (or go to [Vercel](https://vercel.com))
2. Connect your GitHub account
3. Import this repository
4. Set the **Root Directory** to `frontend`
5. Add environment variables (see below)
6. Click Deploy!

## 🔗 Your Frontend URL

After deployment, Vercel will give you a URL like:
```
https://fetch-frontend-yourname.vercel.app
```

## 🔧 Environment Variables

### For Vercel Deployment:

Add these in Vercel dashboard (Settings → Environment Variables):

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

Get these values from your Supabase project dashboard:
**Settings → API**

### For Local Development:

1. Copy `.env.local.example` to `.env.local`
2. Fill in your Supabase credentials
3. Never commit `.env.local` to git

## 📁 File Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx             # Home page
│   │   ├── globals.css          # Global styles
│   │   ├── auth/
│   │   │   ├── login/page.tsx   # Login page
│   │   │   └── signup/page.tsx  # Signup page
│   │   └── feed/
│   │       └── page.tsx         # Main feed
│   └── lib/
│       └── supabase.ts          # Supabase client & types
├── public/                      # Static files
├── .env.local.example           # Environment variable template
├── package.json                 # Dependencies
├── next.config.js               # Next.js config
├── tailwind.config.ts           # Tailwind CSS config
└── tsconfig.json                # TypeScript config
```

## 🧪 Test Locally (Optional)

If you want to run this on your computer:

### Prerequisites:
- Node.js 18+ ([download here](https://nodejs.org/))
- A Supabase project (see [DEPLOY_SUPABASE.md](../DEPLOY_SUPABASE.md))

### Steps:

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Create environment file
cp .env.local.example .env.local

# Edit .env.local with your Supabase credentials
# (use your favorite text editor)

# Run development server
npm run dev

# Visit http://localhost:3000
```

## 📚 Pages

- `/` - Home page with Supabase connection status
- `/auth/signup` - Create new account (uses Supabase Auth)
- `/auth/login` - Sign in (uses Supabase Auth)
- `/feed` - Article feed (requires login, fetches from Supabase)

## 🎨 Styling

This project uses:
- **Tailwind CSS** - Utility-first CSS framework
- **Custom components** - Buttons, cards, input fields in `globals.css`
- **Responsive design** - Works on mobile, tablet, and desktop

### Custom CSS Classes:

```css
.btn-primary     /* Primary action buttons */
.btn-secondary   /* Secondary buttons */
.input-field     /* Form inputs */
.card            /* Content cards */
```

## 🔐 Authentication Flow

### Signup:
1. User fills signup form
2. Frontend calls `supabase.auth.signUp()`
3. Supabase creates auth user
4. Database trigger creates profile entry
5. User redirected to login

### Login:
1. User fills login form
2. Frontend calls `supabase.auth.signInWithPassword()`
3. Supabase returns session token
4. Token stored in browser (httpOnly cookie)
5. User redirected to feed

### Protected Routes:
- Feed page checks `supabase.auth.getSession()`
- If no session, redirect to login
- If session exists, fetch user profile and articles

## 📊 Data Flow

```
┌──────────┐
│ Browser  │
└─────┬────┘
      │
      ├─► Signup/Login
      │   └─► supabase.auth.signUp/signInWithPassword
      │
      ├─► Fetch Articles
      │   └─► supabase.from('articles').select()
      │
      └─► Fetch Profile
          └─► supabase.from('profiles').select()
```

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Database/Auth:** Supabase
- **Deployment:** Vercel

## 🐛 Troubleshooting

### "Cannot connect to Supabase"
- Verify environment variables are set correctly in Vercel
- Check Supabase project is active and not paused
- Ensure anon key starts with `eyJ...`

### "Failed to fetch profile"
- Make sure you ran the SQL setup script in Supabase
- Check that the `profiles` table exists
- Verify Row Level Security policies are enabled

### Build fails on Vercel
- Ensure root directory is set to `frontend`
- Check all environment variables are added
- Verify Node.js version is 18+ (Settings → General → Node.js Version)

### "Session not found" after login
- Check browser cookies are enabled
- Verify Supabase URL is correct (should be HTTPS)
- Try clearing browser cache and cookies

## 📚 Next Steps

- [x] Phase 1: Deploy with Supabase ← **YOU ARE HERE**
- [ ] Phase 2: Add web scraping backend (Render)
- [ ] Phase 3: Add interests selection UI
- [ ] Phase 4: Automated article fetching

## 📖 Learn More

- **Next.js Docs:** [nextjs.org/docs](https://nextjs.org/docs)
- **Supabase Docs:** [supabase.com/docs](https://supabase.com/docs)
- **Tailwind CSS:** [tailwindcss.com/docs](https://tailwindcss.com/docs)
- **TypeScript:** [typescriptlang.org/docs](https://www.typescriptlang.org/docs/)

## 🔄 Development Workflow

```bash
# Start development server
npm run dev

# Build for production (test locally)
npm run build
npm start

# Lint code
npm run lint

# Deploy to Vercel
# Just push to GitHub - Vercel auto-deploys!
git push
```

## 🎯 Common Tasks

### Add a new page:
1. Create file in `src/app/your-page/page.tsx`
2. Export default React component
3. Auto-routes to `/your-page`

### Add a new API endpoint (if needed later):
1. Create file in `src/app/api/your-endpoint/route.ts`
2. Export GET/POST/etc handlers
3. Auto-routes to `/api/your-endpoint`

### Update styles:
- Global styles: `src/app/globals.css`
- Component styles: Use Tailwind classes
- Custom utilities: Add to `@layer utilities` in globals.css

---

**Built with ❤️ for FETCH**

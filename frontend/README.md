# FETCH Frontend

This is the Next.js 14 frontend for FETCH, built with React, TypeScript, and Tailwind CSS.

## 🚀 Quick Deploy to Vercel (Easiest!)

### Deploy with One Click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Click the button above (or go to [Vercel](https://vercel.com))
2. Connect your GitHub account
3. Import this repository
4. Set the **Root Directory** to `frontend`
5. Add environment variable:
   ```
   NEXT_PUBLIC_API_URL=https://your-railway-backend-url.railway.app
   ```
6. Click Deploy!

## 🔗 Your Frontend URL

After deployment, Vercel will give you a URL like:
```
https://fetch-frontend-yourname.vercel.app
```

## 🔧 Environment Variables

Add these in Vercel dashboard (Settings → Environment Variables):

```env
# Your Railway backend URL
NEXT_PUBLIC_API_URL=https://your-backend.railway.app
```

## 📁 File Structure

```
frontend/
├── src/
│   └── app/
│       ├── layout.tsx          # Root layout
│       ├── page.tsx             # Home page
│       ├── globals.css          # Global styles
│       ├── auth/
│       │   ├── login/page.tsx   # Login page
│       │   └── signup/page.tsx  # Signup page
│       └── feed/
│           └── page.tsx         # Main feed
├── public/                      # Static files
├── package.json                 # Dependencies
├── next.config.js               # Next.js config
├── tailwind.config.ts           # Tailwind CSS config
└── tsconfig.json                # TypeScript config
```

## 🧪 Test Locally (Optional)

If you want to run this on your computer:

```bash
# Install Node.js 18+ first

# Install dependencies
npm install

# Run development server
npm run dev

# Visit http://localhost:3000
```

## 📚 Pages

- `/` - Home page with backend status
- `/auth/signup` - Create new account
- `/auth/login` - Sign in
- `/feed` - Article feed (requires login)

## 🎨 Styling

This project uses:
- **Tailwind CSS** - Utility-first CSS framework
- **Custom components** - Buttons, cards, input fields
- **Responsive design** - Works on mobile and desktop

## 📚 Next Steps

- [x] Phase 1.1: Deploy basic frontend ← **YOU ARE HERE**
- [ ] Phase 1.2: Connect to deployed backend
- [ ] Phase 2: Add article display
- [ ] Phase 3: Add interests selection

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **HTTP Client:** Axios
- **Deployment:** Vercel

## 🐛 Troubleshooting

### "Cannot connect to backend"
- Make sure your Railway backend is deployed and running
- Check that `NEXT_PUBLIC_API_URL` is set correctly in Vercel
- Check browser console for CORS errors

### "Page not found"
- Make sure you set the root directory to `frontend` in Vercel

### Build fails
- Check that all dependencies are in `package.json`
- Make sure Node.js version is 18+ (set in Vercel settings)

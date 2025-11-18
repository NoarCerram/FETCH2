/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Add your Railway backend URL here after deployment
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
  },
}

module.exports = nextConfig

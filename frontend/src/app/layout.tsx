import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'FETCH - Your Personalized Content Curator',
  description: 'Discover curated content tailored to your interests',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen">
        {children}
      </body>
    </html>
  )
}

import type { Viewport } from 'next'
import HomeClient from '@/components/HomeClient'

// Keep these export constants
export const dynamic = 'force-static';
export const generateStaticParams = async () => { return [{}] };

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#171717' },
  ],
}

export default function HomePage() {
  return (
    <>
      {/* IMPORTANT: Remove aria-hidden and sr-only so Bing can see the H1 */}
      <div className="visually-hidden-unless-focused">
        <h1>Mohamed Yaakoubi | Emerging AI and Technology Specialist</h1>
        <p>Expert in AI/ML, web development, and localization services with expertise in Next.js, React, and machine learning technologies.</p>
      </div>
      
      <HomeClient />
    </>
  )
}
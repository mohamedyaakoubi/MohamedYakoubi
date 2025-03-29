import type { Viewport, Metadata } from 'next'
import ServicesClient from '@/components/ServicesClient'

export const metadata: Metadata = {
  title: 'Services | Mohamed Yaakoubi',
  description: 'Professional services offered by Mohamed Yaakoubi including AI solutions, web development, and translation services.',
  alternates: {
    canonical: 'https://mohamed-yakoubi.vercel.app/services'
  }
}
// Define viewport separately - this is now in a server component
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

export default function ServicesPage() {
  return (
    <>
      {/* Add static pre-rendered content for search engines */}
      <div className="sr-only" aria-hidden="false">
        <h1>Professional Services - Mohamed Yaakoubi</h1>
        <p>Discover professional services in AI solutions, web development, translation, and localization by Mohamed Yaakoubi, an emerging AI and technology specialist.</p>
        <ul>
          <li>Machine Learning & AI</li>
          <li>Web Development</li>
          <li>Translation & Localization</li>
          <li>Data Annotation</li>
        </ul>
      </div>
      
      <ServicesClient />
    </>
  )
}
import type { Viewport, Metadata } from 'next'
import ExperienceClient from '@/components/ExperienceClient'

export const metadata: Metadata = {
  title: 'Experience | Mohamed Yaakoubi',
  description: 'Professional experience of Mohamed Yaakoubi at companies like DeepL, RWS, Uber, and Volga Partners in AI, translation, and localization.',
  alternates: {
    canonical: 'https://mohamed-yakoubi.vercel.app/experience'
  }
}

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

export default function ExperiencePage() {
  return (
    <>
      {/* Add static pre-rendered content for search engines */}
      <div className="sr-only" aria-hidden="false">
        <h1>Professional Experience - Mohamed Yaakoubi</h1>
        <p>Explore Mohamed Yaakoubi's professional experience in AI solutions, translation, and localization at companies like DeepL, RWS (Meta AI), Uber, and Volga Partners.</p>
        <ul>
          <li>Linguistic Editor at DeepL</li>
          <li>Linguistic AI Evaluator at RWS (Meta AI)</li>
          <li>Localization Vendor Coordinator at Uber</li>
          <li>Language Data and Quality Reviewer at Volga Partners</li>
          <li>Freelance AI Data Annotator and Editor</li>
        </ul>
      </div>
      
      <ExperienceClient />
    </>
  )
}
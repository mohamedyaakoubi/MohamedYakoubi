import type { Viewport, Metadata } from 'next'
import HomeClient from '@/components/HomeClient'
import { StaticHome } from '@/components/StaticHome'

// Keep these export constants
export const dynamic = 'force-static';
export const generateStaticParams = async () => { return [{}] };

export const metadata: Metadata = {
  title: 'Mohamed Yaakoubi | Emerging AI and Technology Specialist',
  description: 'Driven, adaptable AI specialist with expertise in translations, localization, and technology solutions. Experience at DeepL, RWS (Meta AI), Uber, and Volga Partners.',
  alternates: {
    canonical: 'https://mohamed-yakoubi.vercel.app'
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

export default function HomePage() {
  return (
    <>
      {/* Remove duplicate StaticSEO component */}
      {/* Include ONLY ONE h1 via StaticHome */}
      <StaticHome />
      <HomeClient />
    </>
  )
}
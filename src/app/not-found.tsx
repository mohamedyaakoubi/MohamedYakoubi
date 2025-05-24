import type { Metadata, Viewport } from 'next'
import AnimatedNotFound from '@/components/AnimateNotFound'

export const metadata: Metadata = {
  title: '404 - Page Not Found | Mohamed Yaakoubi',
  description: 'The page you are looking for does not exist. Return to Mohamed Yaakoubi\'s portfolio homepage.',
  robots: 'noindex,nofollow'
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

export default function NotFound() {
  return <AnimatedNotFound />
}
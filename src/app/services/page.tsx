import type { Viewport } from 'next'
import ServicesClient from '@/components/ServicesClient'

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
  return <ServicesClient />
}
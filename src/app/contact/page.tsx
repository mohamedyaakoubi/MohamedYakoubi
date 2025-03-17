import type { Viewport } from 'next'
import ContactClient from '@/components/ContactClient'

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

// Server component
export default function ContactPage() {
  return <ContactClient />
}
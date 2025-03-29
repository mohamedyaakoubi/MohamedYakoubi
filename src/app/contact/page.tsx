import type { Viewport, Metadata } from 'next'
import ContactClient from '@/components/ContactClient'

export const metadata: Metadata = {
  title: 'Contact | Mohamed Yaakoubi',
  description: 'Get in touch with Mohamed Yaakoubi for AI solutions, web development, or language services. Contact form and professional social profiles.',
  alternates: {
    canonical: 'https://mohamed-yakoubi.vercel.app/contact'
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

export default function ContactPage() {
  return (
    <>
      {/* Add static pre-rendered content for search engines */}
      <div className="sr-only" aria-hidden="false">
        <h1>Contact Mohamed Yaakoubi</h1>
        <p>Get in touch with Mohamed Yaakoubi for inquiries about AI solutions, web development, translation, and localization services.</p>
        <ul>
          <li>Professional Email Contact</li>
          <li>Contact Form</li>
          <li>Social Media Profiles</li>
          <li>Professional Networks</li>
        </ul>
      </div>
      
      <ContactClient />
    </>
  )
}
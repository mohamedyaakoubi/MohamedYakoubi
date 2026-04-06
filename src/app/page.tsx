import { permanentRedirect } from 'next/navigation'

export default function RootPage() {
  permanentRedirect('/en')
}

export const dynamic = 'force-static'
export const revalidate = false

export const metadata = {
  title: 'Redirecting to English Version...',
  description: 'Redirecting to the English version of Mohamed Yaakoubi\'s portfolio',
  robots: 'noindex, nofollow, noarchive, nosnippet', // Be more explicit
  alternates: {
    canonical: 'https://www.mohamedyaakoubi.com/en' // Point to actual content
  }
}
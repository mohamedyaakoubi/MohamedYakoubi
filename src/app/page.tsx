import { redirect } from 'next/navigation'

export default function RootPage() {
  // Use redirect instead of permanentRedirect for better search engine handling
  redirect('/en')
}

export const dynamic = 'force-static'
export const revalidate = false

export const metadata = {
  title: 'Mohamed Yaakoubi - Redirecting...',
  description: 'Redirecting to English version of Mohamed Yaakoubi\'s portfolio',
  robots: 'noindex, nofollow', // Prevent indexing of redirect page
  alternates: {
    canonical: 'https://www.mohamedyaakoubi.live/en' // Point to actual content
  }
}
import { permanentRedirect } from 'next/navigation'

export default function RootPage() {
  permanentRedirect('/en')
}

export const dynamic = 'force-static'
export const revalidate = false

export const metadata = {
  title: 'Mohamed Yaakoubi - Redirecting...',
  robots: 'noindex, nofollow'
}
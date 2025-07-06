import { permanentRedirect } from 'next/navigation'

export default function RootPage() {
  // Use permanentRedirect for 301 status instead of redirect (307)
  permanentRedirect('/en')
}

export const dynamic = 'force-static'
export const revalidate = false
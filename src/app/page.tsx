import { redirect } from 'next/navigation'

export default function RootPage() {
  redirect('/en')
}

// Force this page to be generated at build time
export const dynamic = 'force-static'
export const revalidate = false
import { redirect } from 'next/navigation'

export default function RootPage() {
  redirect('/en')
}

// Add this to ensure static generation
export const dynamic = 'force-static'
import { redirect } from 'next/navigation'

export default function RootPage() {
  // Redirect to English version by default
  redirect('/en')
}


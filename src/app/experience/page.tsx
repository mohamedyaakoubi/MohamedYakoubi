import { redirect } from 'next/navigation'

export default function ExperiencePage() {
  // Redirect to English version by default
  redirect('/en/experience')
}


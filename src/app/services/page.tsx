import { redirect } from 'next/navigation'

export default function ServicesPage() {
  // Redirect to English version by default
  redirect('/en/services')
}


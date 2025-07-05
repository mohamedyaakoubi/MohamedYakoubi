import { redirect } from 'next/navigation'

export default function ContactPage() {
  // Redirect to English version by default
  redirect('/en/contact')
}


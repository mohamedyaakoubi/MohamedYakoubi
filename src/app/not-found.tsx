import { redirect } from 'next/navigation'

export default function GlobalNotFound() {
  // Remove trailing slash for consistency
  redirect('/en/not-found')
}
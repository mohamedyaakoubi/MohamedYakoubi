import { redirect } from 'next/navigation'

export default function GlobalNotFound() {
  redirect('/en/not-found/')
}
import { redirect } from 'next/navigation'

export default function ServicesRedirect() {
  redirect('/en/services')
}

export const dynamic = 'force-static'
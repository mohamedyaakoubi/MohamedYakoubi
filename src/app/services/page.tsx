import { permanentRedirect } from 'next/navigation'

export default function ServicesRedirect() {
  permanentRedirect('/en/services')
}

export const dynamic = 'force-static'
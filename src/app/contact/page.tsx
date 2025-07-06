import { permanentRedirect } from 'next/navigation'

export default function ContactRedirect() {
  permanentRedirect('/en/contact')
}

export const dynamic = 'force-static'
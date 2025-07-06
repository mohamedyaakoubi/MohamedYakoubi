import { permanentRedirect } from 'next/navigation'

export default function ExperienceRedirect() {
  permanentRedirect('/en/experience')
}

export const dynamic = 'force-static'
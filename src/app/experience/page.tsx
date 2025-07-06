import { redirect } from 'next/navigation'

export default function ExperienceRedirect() {
  redirect('/en/experience')
}

export const dynamic = 'force-static'
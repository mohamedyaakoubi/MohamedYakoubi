import { permanentRedirect } from 'next/navigation'

export default function ProjectsRedirect() {
  permanentRedirect('/en/projects')
}

export const dynamic = 'force-static'
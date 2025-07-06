import { redirect } from 'next/navigation'

export default function ProjectsRedirect() {
  redirect('/en/projects')
}

export const dynamic = 'force-static'
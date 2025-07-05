import { redirect } from 'next/navigation'

export default function ProjectsPage() {
  // Redirect to English version by default
  redirect('/en/projects')
}


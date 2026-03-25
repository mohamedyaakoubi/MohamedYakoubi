import AnimatedNotFound from '@/components/AnimateNotFound'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Page Not Found | Mohamed Yaakoubi',
  robots: 'noindex, nofollow'
}

export default function RootNotFound() {
  return (
    <html lang="en" dir="ltr">
      <body>
        <div className="sr-only" aria-hidden="false">
          <h1>404 - Page Not Found | Mohamed Yaakoubi</h1>
          <p>The page you are looking for could not be found.</p>
        </div>
        <AnimatedNotFound />
      </body>
    </html>
  )
}

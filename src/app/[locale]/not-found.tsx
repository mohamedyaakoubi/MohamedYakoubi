import type { Metadata } from 'next'
import AnimatedNotFound from '@/components/AnimateNotFound'

// Remove generateStaticParams - not needed for not-found pages
// export async function generateStaticParams() { ... }

// Simplified metadata without locale dependency
export const metadata: Metadata = {
  title: 'Page Not Found | Mohamed Yaakoubi',
  robots: 'noindex, nofollow'
}

// Remove the params prop entirely - not-found.tsx doesn't receive it
export default function NotFoundPage() {
  // No locale needed here - the AnimatedNotFound component will handle locale detection
  return (
    <>
      {/* Static SEO content - language neutral */}
      <div className="sr-only" aria-hidden="false">
        <h1>404 - Page Not Found | Mohamed Yaakoubi</h1>
        <p>The page you are looking for could not be found. You may have followed an invalid link or the page may have been moved.</p>
        
        <section aria-labelledby="helpful-links">
          <h2 id="helpful-links">Helpful Links</h2>
          <nav>
            <ul>
              <li><a href="/en">Home Page</a></li>
              <li><a href="/en/experience">Professional Experience</a></li>
              <li><a href="/en/projects">Projects Portfolio</a></li>
              <li><a href="/en/services">Professional Services</a></li>
              <li><a href="/en/contact">Contact Information</a></li>
            </ul>
          </nav>
        </section>

        <section aria-labelledby="search-suggestions">
          <h2 id="search-suggestions">What you can do:</h2>
          <ul>
            <li>Check the URL for typos</li>
            <li>Use the navigation menu to find the page you're looking for</li>
            <li>Go back to the home page and start fresh</li>
            <li>Contact Mohamed Yaakoubi if you believe this is an error</li>
          </ul>
        </section>
      </div>
      
      <AnimatedNotFound />
    </>
  )
}
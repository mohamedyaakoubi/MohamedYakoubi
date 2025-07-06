import type { Metadata } from 'next'
import { getTranslations } from '@/lib/translations'
import AnimatedNotFound from '@/components/AnimateNotFound'

export async function generateStaticParams() {
  return [
    { locale: 'en' },
    { locale: 'fr' },
    { locale: 'ar' },
  ]
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  
  const titles = {
    en: 'Page Not Found | Mohamed Yaakoubi',
    fr: 'Page Non Trouvée | Mohamed Yaakoubi',
    ar: 'الصفحة غير موجودة | محمد يعقوبي'
  }

  return {
    title: titles[locale as keyof typeof titles] || titles.en,
    robots: 'noindex, nofollow',
    alternates: {
      canonical: locale === 'en' 
        ? 'https://www.mohamedyaakoubi.live/en/not-found'
        : `https://www.mohamedyaakoubi.live/${locale}/not-found`
    }
  }
}

interface NotFoundPageProps {
  params: Promise<{ locale: string }>
}

export default async function NotFoundPage({ params }: NotFoundPageProps) {
  const { locale } = await params
  const translations = getTranslations(locale)
  
  return (
    <>
      {/* SEO content for search engines */}
      <div className="sr-only" aria-hidden="false">
        <h1>404 - Page Not Found | Mohamed Yaakoubi</h1>
        <p>The page you are looking for could not be found. You may have followed an invalid link or the page may have been moved.</p>
        
        <section aria-labelledby="helpful-links">
          <h2 id="helpful-links">Helpful Links</h2>
          <nav>
            <ul>
              <li><a href={`/${locale}`}>Home Page</a></li>
              <li><a href={`/${locale}/experience`}>Professional Experience</a></li>
              <li><a href={`/${locale}/projects`}>Projects Portfolio</a></li>
              <li><a href={`/${locale}/services`}>Professional Services</a></li>
              <li><a href={`/${locale}/contact`}>Contact Information</a></li>
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
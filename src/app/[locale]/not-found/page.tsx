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

export default async function LocaleNotFoundPage(props: NotFoundPageProps) {
  const params = await props.params
  const { locale } = params
  const translations = getTranslations(locale)
  
  const messages = {
    en: {
      title: '404 - Page Not Found',
      description: 'The page you are looking for does not exist.',
      homeLink: 'Go Home',
      contactLink: 'Contact Me'
    },
    fr: {
      title: '404 - Page Non Trouvée',
      description: 'La page que vous recherchez n\'existe pas.',
      homeLink: 'Accueil',
      contactLink: 'Me Contacter'
    },
    ar: {
      title: '404 - الصفحة غير موجودة',
      description: 'الصفحة التي تبحث عنها غير موجودة.',
      homeLink: 'الصفحة الرئيسية',
      contactLink: 'تواصل معي'
    }
  }

  const content = messages[locale as keyof typeof messages] || messages.en
  
  return (
    <>
      {/* SEO content for search engines */}
      <div className="sr-only" aria-hidden="false">
        <h1>{content.title} | Mohamed Yaakoubi</h1>
        <p>{content.description}</p>
        
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
      </div>
      
      <AnimatedNotFound />
    </>
  )
}
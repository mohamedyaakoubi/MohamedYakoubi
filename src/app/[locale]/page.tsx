import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import HomeClient from '@/components/HomeClient'
import { getTranslations } from '@/lib/translations'

export async function generateStaticParams() {
  return [
    { locale: 'en' },
    { locale: 'fr' },
    { locale: 'ar' },
  ]
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const translations = getTranslations(locale)
  
  return {
    title: translations.meta.title,
    description: translations.meta.description,
    alternates: {
      canonical: `https://www.mohamedyaakoubi.com/${locale}`,
      languages: {
        en: 'https://www.mohamedyaakoubi.com/en',
        fr: 'https://www.mohamedyaakoubi.com/fr',
        ar: 'https://www.mohamedyaakoubi.com/ar',
        'x-default': 'https://www.mohamedyaakoubi.com/en',
      },
    },
    openGraph: {
      title: translations.meta.title,
      description: translations.meta.description,
      url: `https://www.mohamedyaakoubi.com/${locale}`,
      siteName: 'Mohamed Yaakoubi - AI Language Technology Portfolio',
      locale: locale === 'ar' ? 'ar_TN' : locale === 'fr' ? 'fr_FR' : 'en_US',
      type: 'profile',
      images: [
        {
          url: 'https://www.mohamedyaakoubi.com/profile.jpg',
          width: 1200,
          height: 630,
          alt: 'Mohamed Yaakoubi — AI Language Technology Specialist',
          type: 'image/jpeg',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: translations.meta.title,
      description: translations.meta.description,
      site: '@Mohamed0Yakoubi',
      creator: '@Mohamed0Yakoubi',
      images: ['https://www.mohamedyaakoubi.com/profile.jpg'],
    },
  }
}


interface HomePageProps {
  params: Promise<{ locale: string }>
}

export default async function HomePage(props: HomePageProps) {
  const params = await props.params
  const { locale } = params

  // If locale is not valid (e.g. /randomstring), show 404
  if (!['en', 'fr', 'ar'].includes(locale)) {
    notFound()
  }

  const translations = getTranslations(locale)
  
  return (
    <>
      <HomeClient locale={locale} translations={translations} />
    </>
  )
}


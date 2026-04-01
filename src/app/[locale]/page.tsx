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
      canonical: `https://www.mohamedyaakoubi.com/${locale}`
    },
    openGraph: {
      images: [
        {
          url: 'https://www.mohamedyaakoubi.com/profile.jpg',
          width: 1200,
          height: 630,
          alt: 'Mohamed Yaakoubi - AI Language Technology Specialist',
          type: 'image/jpeg',
        }
      ],
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


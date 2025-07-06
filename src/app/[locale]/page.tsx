import type { Metadata } from 'next'
import HomeClient from '@/components/HomeClient'
import { StaticHome } from '@/components/StaticHome'
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
      // Fixed canonical URL - should point to /en instead of root for English
      canonical: locale === 'en' 
        ? 'https://mohamed-yakoubi.vercel.app/en'
        : `https://mohamed-yakoubi.vercel.app/${locale}`
    }
  }
}

interface HomePageProps {
  params: Promise<{ locale: string }>
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params
  const translations = getTranslations(locale)
  
  return (
    <>
      <StaticHome locale={locale} translations={translations} />
      <HomeClient locale={locale} translations={translations} />
    </>
  )
}


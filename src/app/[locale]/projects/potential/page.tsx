import type { Metadata } from 'next'
import { getSupportedLocales, getTranslations } from '@/lib/translations'
import { getPotentialI18n } from '@/data/potential-i18n'
import PotentialProjectClient from '@/components/PotentialProjectClient'

export async function generateStaticParams() {
  return getSupportedLocales().map(locale => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = getPotentialI18n(locale)

  const titles = {
    en: 'Potential — AI Search Engine for Abu Dhabi Open Data | Mohamed Yaakoubi',
    fr: 'Potential — Moteur de Recherche IA pour l\'Open Data d\'Abu Dhabi | Mohamed Yaakoubi',
    ar: 'Potential — محرك بحث ذكي لمنصة بيانات أبوظبي المفتوحة | محمد يعقوبي',
  }
  const descriptions = {
    en: 'Potential is an AI-powered search engine built on the Abu Dhabi Open Data Platform. Uses GPT-4 and Azure AI Search for natural language dataset retrieval, real-time indexing, and in-browser visualization. Top 10 at Abu Dhabi Spark AI Hackathon.',
    fr: 'Potential est un moteur de recherche IA construit sur la plateforme Open Data d\'Abu Dhabi. Utilise GPT-4 et Azure AI Search pour la récupération de jeux de données en langage naturel. Top 10 au Hackathon Abu Dhabi Spark AI.',
    ar: 'Potential محرك بحث مدعوم بالذكاء الاصطناعي مبني على منصة بيانات أبوظبي المفتوحة. يستخدم GPT-4 وAzure AI Search لاسترجاع مجموعات البيانات بلغة طبيعية. ضمن أفضل 10 في هاكاثون أبوظبي سبارك.',
  }

  const title = titles[locale as keyof typeof titles] ?? titles.en
  const description = descriptions[locale as keyof typeof descriptions] ?? descriptions.en

  return {
    title,
    description,
    keywords: [
      'Potential', 'AI search engine', 'Abu Dhabi Open Data', 'GPT-4', 'Azure AI Search',
      'natural language processing', 'NLP', 'RAG', 'retrieval augmented generation',
      'hackathon project', 'Next.js', 'open data platform', 'Mohamed Yaakoubi',
      'محرك بحث ذكي', 'بيانات أبوظبي المفتوحة', 'الذكاء الاصطناعي',
    ],
    authors: [{ name: 'Mohamed Yaakoubi', url: 'https://www.mohamedyaakoubi.com' }],
    creator: 'Mohamed Yaakoubi',
    alternates: {
      canonical: `https://www.mohamedyaakoubi.com/${locale}/projects/potential`,
      languages: {
        'en': 'https://www.mohamedyaakoubi.com/en/projects/potential',
        'fr': 'https://www.mohamedyaakoubi.com/fr/projects/potential',
        'ar': 'https://www.mohamedyaakoubi.com/ar/projects/potential',
        'x-default': 'https://www.mohamedyaakoubi.com/en/projects/potential',
      },
    },
    openGraph: {
      title,
      description,
      url: `https://www.mohamedyaakoubi.com/${locale}/projects/potential`,
      type: 'website',
      siteName: 'Mohamed Yaakoubi Portfolio',
      locale: locale === 'ar' ? 'ar_AE' : locale === 'fr' ? 'fr_FR' : 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      creator: '@mohamedyaakoubi',
    },
  }
}

export default async function PotentialProjectPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const translations = getTranslations(locale)
  const t = getPotentialI18n(locale)

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: translations.navigation?.links.home ?? 'Home',
        item: `https://www.mohamedyaakoubi.com/${locale}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: translations.navigation?.links.projects ?? 'Projects',
        item: `https://www.mohamedyaakoubi.com/${locale}/projects`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Potential',
        item: `https://www.mohamedyaakoubi.com/${locale}/projects/potential`,
      },
    ],
  }

  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Potential',
    description: t.heroDesc,
    url: 'https://potential-kegz.vercel.app/',
    applicationCategory: 'SearchApplication',
    operatingSystem: 'Web',
    author: {
      '@type': 'Person',
      name: 'Mohamed Yaakoubi',
      url: 'https://www.mohamedyaakoubi.com',
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    screenshot: `https://www.mohamedyaakoubi.com/${locale}/projects/potential/opengraph-image`,
    softwareVersion: '1.0',
    keywords: 'AI search, open data, natural language processing, Abu Dhabi, GPT-4, Azure AI Search',
    codeRepository: 'https://github.com/mohamedyaakoubi/potential',
  }

  return (
    <>
      <script
        id="potential-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        id="potential-software-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />

      <PotentialProjectClient />
    </>
  )
}

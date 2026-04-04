import type { Metadata } from 'next'
import Script from 'next/script'
import { getSupportedLocales, getTranslations } from '@/lib/translations'
import { getInternationalSkillsI18n } from '@/data/internationalskills-i18n'
import InternationalSkillsClient from '@/components/InternationalSkillsClient'

export async function generateStaticParams() {
  return getSupportedLocales().map(locale => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = getInternationalSkillsI18n(locale)

  const titles = {
    en: 'InternationalSkills.fi — Recruiting Management System | Mohamed Yaakoubi',
    fr: 'InternationalSkills.fi — Système de Gestion du Recrutement | Mohamed Yaakoubi',
    ar: 'InternationalSkills.fi — نظام إدارة التوظيف | محمد يعقوبي',
  }
  const descriptions = {
    en: 'Full-stack recruiting platform for InternationalSkills.fi: multi-step candidate applications, AI scoring with Gemini 2.5 Pro, automated Google Meet scheduling, and a real-time admin dashboard — built with Next.js and Firebase.',
    fr: 'Plateforme de recrutement full-stack pour InternationalSkills.fi : candidatures multi-étapes, notation IA avec Gemini 2.5 Pro, planification automatisée Google Meet et tableau de bord administrateur en temps réel — construite avec Next.js et Firebase.',
    ar: 'منصة توظيف متكاملة لـ InternationalSkills.fi: طلبات متعددة الخطوات، تقييم ذكي بـ Gemini 2.5 Pro، جدولة تلقائية عبر Google Meet، ولوحة تحكم إدارية — مبنية بـ Next.js و Firebase.',
  }

  const title = titles[locale as keyof typeof titles] ?? titles.en
  const description = descriptions[locale as keyof typeof descriptions] ?? descriptions.en

  return {
    title,
    description,
    keywords: [
      'InternationalSkills.fi', 'recruiting management system', 'hiring platform', 'candidate portal',
      'AI candidate scoring', 'Gemini 2.5 Pro', 'Google Meet scheduling', 'Firebase', 'Next.js',
      'fullstack', 'admin dashboard', 'job application', 'labor recruitment', 'Finland',
      'Mohamed Yaakoubi', 'نظام إدارة التوظيف', 'منصة توظيف', 'تقييم المرشحين بالذكاء الاصطناعي',
    ],
    authors: [{ name: 'Mohamed Yaakoubi', url: 'https://www.mohamedyaakoubi.com' }],
    creator: 'Mohamed Yaakoubi',
    alternates: {
      canonical: `https://www.mohamedyaakoubi.com/${locale}/projects/internationalskills`,
      languages: {
        'en': 'https://www.mohamedyaakoubi.com/en/projects/internationalskills',
        'fr': 'https://www.mohamedyaakoubi.com/fr/projects/internationalskills',
        'ar': 'https://www.mohamedyaakoubi.com/ar/projects/internationalskills',
        'x-default': 'https://www.mohamedyaakoubi.com/en/projects/internationalskills',
      },
    },
    openGraph: {
      title,
      description,
      url: `https://www.mohamedyaakoubi.com/${locale}/projects/internationalskills`,
      type: 'website',
      siteName: 'Mohamed Yaakoubi Portfolio',
      locale: locale === 'ar' ? 'ar_AE' : locale === 'fr' ? 'fr_FR' : 'en_US',
      images: [
        {
          url: `https://www.mohamedyaakoubi.com/${locale}/projects/internationalskills/opengraph-image`,
          width: 1200,
          height: 630,
          alt: 'InternationalSkills.fi — Recruiting Management System',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      creator: '@mohamedyaakoubi',
    },
  }
}

export default async function InternationalSkillsProjectPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const translations = getTranslations(locale)
  const t = getInternationalSkillsI18n(locale)

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
        name: 'InternationalSkills.fi',
        item: `https://www.mohamedyaakoubi.com/${locale}/projects/internationalskills`,
      },
    ],
  }

  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'InternationalSkills.fi Recruiting System',
    description: t.heroDesc,
    url: 'https://candidate-git-latest-mohamedyaakoubis-projects.vercel.app/',
    applicationCategory: 'BusinessApplication',
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
    softwareVersion: '1.0',
    keywords: 'recruiting management, candidate portal, AI scoring, Gemini 2.5 Pro, Google Meet, Firebase, Next.js',
    screenshot: `https://www.mohamedyaakoubi.com/${locale}/projects/internationalskills/opengraph-image`,
  }

  return (
    <>
      <Script
        id="internationalskills-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Script
        id="internationalskills-software-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />

      <InternationalSkillsClient />
    </>
  )
}

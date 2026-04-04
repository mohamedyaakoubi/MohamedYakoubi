import type { Metadata } from 'next'
import Script from 'next/script'
import { getSupportedLocales, getTranslations } from '@/lib/translations'
import { getDocuMedI18n } from '@/data/documed-i18n'
import DocuMedProjectClient from '@/components/DocuMedProjectClient'

export async function generateStaticParams() {
  return getSupportedLocales().map(locale => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = getDocuMedI18n(locale)

  const titles = {
    en: 'DocuMed — Healthcare Management Platform | Mohamed Yaakoubi',
    fr: 'DocuMed — Plateforme de Gestion de Santé | Mohamed Yaakoubi',
    ar: 'DocuMed — منصة إدارة الرعاية الصحية | محمد يعقوبي',
  }
  const descriptions = {
    en: 'DocuMed is a full-stack healthcare platform with dual dashboards for doctors and patients, real-time appointment scheduling, and secure medical records — built with Next.js and Firebase.',
    fr: 'DocuMed est une plateforme de santé full-stack avec des tableaux de bord doubles pour médecins et patients, une prise de rendez-vous en temps réel et des dossiers médicaux sécurisés — construite avec Next.js et Firebase.',
    ar: 'DocuMed منصة رعاية صحية متكاملة تضم لوحتَي تحكم للأطباء والمرضى، وجدولة مواعيد فورية، وسجلات طبية آمنة — مبنية بـ Next.js و Firebase.',
  }

  const title = titles[locale as keyof typeof titles] ?? titles.en
  const description = descriptions[locale as keyof typeof descriptions] ?? descriptions.en

  return {
    title,
    description,
    keywords: [
      'DocuMed', 'healthcare management', 'medical records', 'appointment scheduling',
      'Firebase', 'Next.js', 'fullstack', 'doctor dashboard', 'patient portal',
      'MentorNations bootcamp', 'Mohamed Yaakoubi', 'healthcare app',
      'إدارة الرعاية الصحية', 'سجلات طبية', 'حجز مواعيد',
    ],
    authors: [{ name: 'Mohamed Yaakoubi', url: 'https://www.mohamedyaakoubi.com' }],
    creator: 'Mohamed Yaakoubi',
    alternates: {
      canonical: `https://www.mohamedyaakoubi.com/${locale}/projects/documed`,
      languages: {
        'en': 'https://www.mohamedyaakoubi.com/en/projects/documed',
        'fr': 'https://www.mohamedyaakoubi.com/fr/projects/documed',
        'ar': 'https://www.mohamedyaakoubi.com/ar/projects/documed',
        'x-default': 'https://www.mohamedyaakoubi.com/en/projects/documed',
      },
    },
    openGraph: {
      title,
      description,
      url: `https://www.mohamedyaakoubi.com/${locale}/projects/documed`,
      type: 'website',
      siteName: 'Mohamed Yaakoubi Portfolio',
      locale: locale === 'ar' ? 'ar_AE' : locale === 'fr' ? 'fr_FR' : 'en_US',
      images: [
        {
          url: `https://www.mohamedyaakoubi.com/${locale}/projects/documed/opengraph-image`,
          width: 1200,
          height: 630,
          alt: 'DocuMed — Healthcare Management Platform',
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

export default async function DocuMedProjectPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const translations = getTranslations(locale)
  const t = getDocuMedI18n(locale)

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
        name: 'DocuMed',
        item: `https://www.mohamedyaakoubi.com/${locale}/projects/documed`,
      },
    ],
  }

  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'DocuMed',
    description: t.heroDesc,
    url: 'https://docu-med.vercel.app/',
    applicationCategory: 'HealthApplication',
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
    keywords: 'healthcare management, medical records, appointment scheduling, Firebase, Next.js',
    codeRepository: 'https://github.com/mohamedyaakoubi/documed',
    screenshot: `https://www.mohamedyaakoubi.com/${locale}/projects/documed/opengraph-image`,
    hasPart: {
      '@type': 'DigitalDocument',
      name: 'DocuMed Project Documentation',
      encodingFormat: 'application/pdf',
      url: 'https://www.mohamedyaakoubi.com/projects/documed.pdf',
    },
  }

  return (
    <>
      <Script
        id="documed-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Script
        id="documed-software-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />

      <DocuMedProjectClient />
    </>
  )
}

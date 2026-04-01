import type { Metadata } from 'next'
import { getSupportedLocales } from '@/lib/translations'
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

  return {
    title: t.metaTitle,
    description: t.metaDesc,
    alternates: {
      canonical: `https://www.mohamedyaakoubi.com/${locale}/projects/potential`,
      languages: {
        en: 'https://www.mohamedyaakoubi.com/en/projects/potential',
        fr: 'https://www.mohamedyaakoubi.com/fr/projects/potential',
        ar: 'https://www.mohamedyaakoubi.com/ar/projects/potential',
        'x-default': 'https://www.mohamedyaakoubi.com/en/projects/potential',
      },
    },
    openGraph: {
      title: t.metaTitle,
      description: t.metaDesc,
      url: `https://www.mohamedyaakoubi.com/${locale}/projects/potential`,
      type: 'website',
      images: [
        {
          url: 'https://www.mohamedyaakoubi.com/Potential.webp',
          width: 1200,
          height: 630,
          alt: 'Potential — AI-Powered Open Data Search',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t.metaTitle,
      description: t.metaDesc,
      images: ['https://www.mohamedyaakoubi.com/Potential.webp'],
    },
  }
}

export default function PotentialProjectPage() {
  return <PotentialProjectClient />
}

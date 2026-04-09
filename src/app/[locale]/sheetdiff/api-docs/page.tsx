import type { Metadata } from 'next'
import { getSupportedLocales } from '@/lib/translations'
import StructuralApiClient from '@/components/StructuralApiClient'
import { getStructuralApiI18n } from '@/data/structural-api-i18n'

export async function generateStaticParams() {
  return getSupportedLocales().map(locale => ({ locale }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = getStructuralApiI18n(locale)
  const title = t.meta.title
  const description = t.meta.description

  return {
    title,
    description,
    keywords: [
      'transcript diff API',
      'structural diff REST API',
      'transcript QA API',
      'CER WER SER API',
      'localization QA API',
      'transcription comparison API',
      'row diff JSON API',
      'SheetDiff API',
      'split merge diff detection',
      'transcript scoring API',
    ],
    alternates: {
      canonical: `https://www.mohamedyaakoubi.com/${locale}/sheetdiff/api-docs`,
      languages: {
        en: 'https://www.mohamedyaakoubi.com/en/sheetdiff/api-docs',
        fr: 'https://www.mohamedyaakoubi.com/fr/sheetdiff/api-docs',
        ar: 'https://www.mohamedyaakoubi.com/ar/sheetdiff/api-docs',
        'x-default': 'https://www.mohamedyaakoubi.com/en/sheetdiff/api-docs',
      },
    },
    openGraph: {
      title,
      description,
      url: `https://www.mohamedyaakoubi.com/${locale}/sheetdiff/api-docs`,
      type: 'website',
      siteName: 'Mohamed Yaakoubi Portfolio',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  }
}

export default function StructuralApiPage() {
  return <StructuralApiClient />
}

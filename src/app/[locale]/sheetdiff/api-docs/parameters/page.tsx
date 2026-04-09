import type { Metadata } from 'next'
import { getSupportedLocales } from '@/lib/translations'
import ParametersGuideClient from '@/components/ParametersGuideClient'
import { getParametersGuideI18n } from '@/data/parameters-guide-i18n'

export async function generateStaticParams() {
  return getSupportedLocales().map(locale => ({ locale }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = getParametersGuideI18n(locale)
  return {
    title: t.meta.title,
    description: t.meta.description,
    keywords: [
      'structural diff API config',
      'simpleMode transcript diff',
      'stripDiacritics Arabic NLP',
      'ignoreColNames annotation QA',
      'positionalMode diff',
      'enableSplits enableMerges',
      'transcript comparison parameters',
      'SheetDiff API config guide',
    ],
    alternates: {
      canonical: `https://www.mohamedyaakoubi.com/${locale}/sheetdiff/api-docs/parameters`,
      languages: {
        en: 'https://www.mohamedyaakoubi.com/en/sheetdiff/api-docs/parameters',
        fr: 'https://www.mohamedyaakoubi.com/fr/sheetdiff/api-docs/parameters',
        ar: 'https://www.mohamedyaakoubi.com/ar/sheetdiff/api-docs/parameters',
        'x-default': 'https://www.mohamedyaakoubi.com/en/sheetdiff/api-docs/parameters',
      },
    },
    openGraph: {
      title: t.meta.title,
      description: t.meta.description,
      url: `https://www.mohamedyaakoubi.com/${locale}/sheetdiff/api-docs/parameters`,
      type: 'website',
      siteName: 'Mohamed Yaakoubi Portfolio',
    },
  }
}

export default function ParametersPage() {
  return <ParametersGuideClient />
}

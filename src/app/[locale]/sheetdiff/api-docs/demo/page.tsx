import type { Metadata } from 'next'
import { getSupportedLocales } from '@/lib/translations'
import DemoWalkthroughClient from '@/components/DemoWalkthroughClient'
import { getDemoWalkthroughI18n } from '@/data/demo-walkthrough-i18n'

export async function generateStaticParams() {
  return getSupportedLocales().map(locale => ({ locale }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = getDemoWalkthroughI18n(locale)
  return {
    title: t.meta.title,
    description: t.meta.description,
    keywords: [
      'structural diff API demo',
      'transcript QA walkthrough',
      'annotation diff example',
      'CER WER SER score interpretation',
      'column name mapping API',
      'podcast transcript diff',
      'AI annotation QA pipeline',
      'SheetDiff demo',
    ],
    alternates: {
      canonical: `https://www.mohamedyaakoubi.com/${locale}/sheetdiff/api-docs/demo`,
      languages: {
        en: 'https://www.mohamedyaakoubi.com/en/sheetdiff/api-docs/demo',
        fr: 'https://www.mohamedyaakoubi.com/fr/sheetdiff/api-docs/demo',
        ar: 'https://www.mohamedyaakoubi.com/ar/sheetdiff/api-docs/demo',
        'x-default': 'https://www.mohamedyaakoubi.com/en/sheetdiff/api-docs/demo',
      },
    },
    openGraph: {
      title: t.meta.title,
      description: t.meta.description,
      url: `https://www.mohamedyaakoubi.com/${locale}/sheetdiff/api-docs/demo`,
      type: 'website',
      siteName: 'Mohamed Yaakoubi Portfolio',
    },
  }
}

export default function DemoPage() {
  return <DemoWalkthroughClient />
}

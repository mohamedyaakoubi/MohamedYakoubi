import type { Metadata } from 'next'
import { getSupportedLocales } from '@/lib/translations'
import LiveSimulatorClient from '@/components/LiveSimulatorClient'
import { getLiveSimulatorI18n } from '@/data/live-simulator-i18n'

export async function generateStaticParams() {
  return getSupportedLocales().map(locale => ({ locale }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = getLiveSimulatorI18n(locale)
  return {
    title: t.meta.title,
    description: t.meta.description,
    keywords: [
      'structural diff API simulator',
      'live diff test tool',
      'transcript QA API playground',
      'JSON diff online',
      'annotation diff tool',
      'CER WER SER live scoring',
      'transcript comparison API',
      'SheetDiff live demo',
      'AI annotation QA pipeline',
    ],
    alternates: {
      canonical: `https://www.mohamedyaakoubi.com/${locale}/sheetdiff/api-docs/live-demo`,
      languages: {
        en: 'https://www.mohamedyaakoubi.com/en/sheetdiff/api-docs/live-demo',
        fr: 'https://www.mohamedyaakoubi.com/fr/sheetdiff/api-docs/live-demo',
        ar: 'https://www.mohamedyaakoubi.com/ar/sheetdiff/api-docs/live-demo',
        'x-default': 'https://www.mohamedyaakoubi.com/en/sheetdiff/api-docs/live-demo',
      },
    },
    openGraph: {
      title: t.meta.title,
      description: t.meta.description,
      url: `https://www.mohamedyaakoubi.com/${locale}/sheetdiff/api-docs/live-demo`,
      type: 'website',
      siteName: 'Mohamed Yaakoubi Portfolio',
    },
  }
}

export default function LiveDemoPage() {
  return <LiveSimulatorClient />
}

import type { Metadata } from 'next'
import { getSupportedLocales } from '@/lib/translations'
import DiffStatusesClient from '@/components/DiffStatusesClient'
import { getDiffStatusesI18n } from '@/data/diff-statuses-i18n'

export async function generateStaticParams() {
  return getSupportedLocales().map(locale => ({ locale }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = getDiffStatusesI18n(locale)
  return {
    title: t.meta.title,
    description: t.meta.description,
    keywords: [
      'diff status UNCHANGED MODIFIED ADDED DELETED',
      'SPLIT MERGED transcript diff',
      'transcriptDiff inline diff',
      'annotation QA diff statuses',
      'source row MERGED artifact',
      'CER WER SER transcript scoring',
      'structural diff status reference',
      'SheetDiff diff statuses',
    ],
    alternates: {
      canonical: `https://www.mohamedyaakoubi.com/${locale}/sheetdiff/api-docs/diff-statuses`,
      languages: {
        en: 'https://www.mohamedyaakoubi.com/en/sheetdiff/api-docs/diff-statuses',
        fr: 'https://www.mohamedyaakoubi.com/fr/sheetdiff/api-docs/diff-statuses',
        ar: 'https://www.mohamedyaakoubi.com/ar/sheetdiff/api-docs/diff-statuses',
        'x-default': 'https://www.mohamedyaakoubi.com/en/sheetdiff/api-docs/diff-statuses',
      },
    },
    openGraph: {
      title: t.meta.title,
      description: t.meta.description,
      url: `https://www.mohamedyaakoubi.com/${locale}/sheetdiff/api-docs/diff-statuses`,
      type: 'website',
      siteName: 'Mohamed Yaakoubi Portfolio',
    },
  }
}

export default function DiffStatusesPage() {
  return <DiffStatusesClient />
}

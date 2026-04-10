import type { Metadata } from 'next'
import { getSupportedLocales } from '@/lib/translations'
import StructuralApiPrivacyClient from '@/components/StructuralApiPrivacyClient'

export async function generateStaticParams() {
  return getSupportedLocales().map(locale => ({ locale }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return {
    title: 'Privacy Policy — Structural Diff API | Mohamed Yaakoubi',
    description:
      'Privacy Policy for the Structural Diff API: how request data is processed, what is logged, and how API keys are stored.',
    alternates: {
      canonical: `https://www.mohamedyaakoubi.com/${locale}/sheetdiff/api-docs/privacy-policy`,
      languages: {
        en: 'https://www.mohamedyaakoubi.com/en/sheetdiff/api-docs/privacy-policy',
        fr: 'https://www.mohamedyaakoubi.com/fr/sheetdiff/api-docs/privacy-policy',
        ar: 'https://www.mohamedyaakoubi.com/ar/sheetdiff/api-docs/privacy-policy',
        'x-default': 'https://www.mohamedyaakoubi.com/en/sheetdiff/api-docs/privacy-policy',
      },
    },
    openGraph: {
      title: 'Privacy Policy — Structural Diff API | Mohamed Yaakoubi',
      description:
        'Privacy Policy for the Structural Diff API: how request data is processed, what is logged, and how API keys are stored.',
      url: `https://www.mohamedyaakoubi.com/${locale}/sheetdiff/api-docs/privacy-policy`,
      type: 'website',
      siteName: 'Mohamed Yaakoubi Portfolio',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Privacy Policy — Structural Diff API | Mohamed Yaakoubi',
      description:
        'Privacy Policy for the Structural Diff API: how request data is processed, what is logged, and how API keys are stored.',
    },
  }
}

export default function StructuralApiPrivacyPage() {
  return <StructuralApiPrivacyClient />
}

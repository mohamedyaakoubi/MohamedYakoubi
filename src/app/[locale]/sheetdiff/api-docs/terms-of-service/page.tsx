import type { Metadata } from 'next'
import { getSupportedLocales } from '@/lib/translations'
import StructuralApiTermsClient from '@/components/StructuralApiTermsClient'

export async function generateStaticParams() {
  return getSupportedLocales().map(locale => ({ locale }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return {
    title: 'Terms of Service — Structural Diff API | Mohamed Yaakoubi',
    description:
      'Terms of Service for the Structural Diff API: permitted use, prohibited activities, rate limits, IP rights, and governing law.',
    alternates: {
      canonical: `https://www.mohamedyaakoubi.com/${locale}/sheetdiff/api-docs/terms-of-service`,
      languages: {
        en: 'https://www.mohamedyaakoubi.com/en/sheetdiff/api-docs/terms-of-service',
        fr: 'https://www.mohamedyaakoubi.com/fr/sheetdiff/api-docs/terms-of-service',
        ar: 'https://www.mohamedyaakoubi.com/ar/sheetdiff/api-docs/terms-of-service',
        'x-default': 'https://www.mohamedyaakoubi.com/en/sheetdiff/api-docs/terms-of-service',
      },
    },
    openGraph: {
      title: 'Terms of Service — Structural Diff API | Mohamed Yaakoubi',
      description:
        'Terms of Service for the Structural Diff API: permitted use, prohibited activities, rate limits, IP rights, and governing law.',
      url: `https://www.mohamedyaakoubi.com/${locale}/sheetdiff/api-docs/terms-of-service`,
      type: 'website',
      siteName: 'Mohamed Yaakoubi Portfolio',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Terms of Service — Structural Diff API | Mohamed Yaakoubi',
      description:
        'Terms of Service for the Structural Diff API: permitted use, prohibited activities, rate limits, IP rights, and governing law.',
    },
  }
}

export default function StructuralApiTermsPage() {
  return <StructuralApiTermsClient />
}

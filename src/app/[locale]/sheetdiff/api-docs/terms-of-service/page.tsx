import type { Metadata } from 'next'
import { getSupportedLocales } from '@/lib/translations'
import StructuralApiTermsClient from '@/components/StructuralApiTermsClient'

export async function generateStaticParams() {
  return getSupportedLocales().map(locale => ({ locale }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const titles: Record<string, string> = {
    en: 'Terms of Service — Structural Diff API | Mohamed Yaakoubi',
    fr: "Conditions d'utilisation — API Structural Diff | Mohamed Yaakoubi",
    ar: 'شروط الخدمة — Structural Diff API | محمد يعقوبي',
  }
  const descriptions: Record<string, string> = {
    en: 'Terms of Service for the Structural Diff API: permitted use, prohibited activities, rate limits, IP rights, and governing law.',
    fr: "Conditions d'utilisation de l'API Structural Diff : usages autorisés, activités interdites, limites de débit et droit applicable.",
    ar: 'شروط استخدام Structural Diff API: الاستخدامات المسموح بها، الأنشطة المحظورة، حدود المعدل والقانون الحاكم.',
  }
  return {
    title: titles[locale] ?? titles.en,
    description: descriptions[locale] ?? descriptions.en,
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
      title: titles[locale] ?? titles.en,
      description: descriptions[locale] ?? descriptions.en,
      url: `https://www.mohamedyaakoubi.com/${locale}/sheetdiff/api-docs/terms-of-service`,
      type: 'website',
      siteName: 'Mohamed Yaakoubi Portfolio',
    },
    twitter: {
      card: 'summary_large_image',
      title: titles[locale] ?? titles.en,
      description: descriptions[locale] ?? descriptions.en,
    },
  }
}

export default function StructuralApiTermsPage() {
  return <StructuralApiTermsClient />
}

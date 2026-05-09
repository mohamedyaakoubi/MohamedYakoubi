import type { Metadata } from 'next'
import { getSupportedLocales } from '@/lib/translations'
import StructuralApiPrivacyClient from '@/components/StructuralApiPrivacyClient'

export async function generateStaticParams() {
  return getSupportedLocales().map(locale => ({ locale }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const titles: Record<string, string> = {
    en: 'Privacy Policy — Structural Diff API | Mohamed Yaakoubi',
    fr: 'Politique de confidentialité — API Structural Diff | Mohamed Yaakoubi',
    ar: 'سياسة الخصوصية — Structural Diff API | محمد يعقوبي',
  }
  const descriptions: Record<string, string> = {
    en: 'Privacy Policy for the Structural Diff API: how request data is processed, what is logged, and how API keys are stored.',
    fr: "Politique de confidentialité de l'API Structural Diff : traitement des données, journaux serveur et gestion des clés API.",
    ar: 'سياسة الخصوصية لـ Structural Diff API: كيفية معالجة البيانات والسجلات وتخزين مفاتيح API.',
  }
  return {
    title: titles[locale] ?? titles.en,
    description: descriptions[locale] ?? descriptions.en,
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
      title: titles[locale] ?? titles.en,
      description: descriptions[locale] ?? descriptions.en,
      url: `https://www.mohamedyaakoubi.com/${locale}/sheetdiff/api-docs/privacy-policy`,
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

export default function StructuralApiPrivacyPage() {
  return <StructuralApiPrivacyClient />
}

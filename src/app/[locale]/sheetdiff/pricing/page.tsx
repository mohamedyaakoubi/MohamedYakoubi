import type { Metadata } from 'next'
import { getSupportedLocales } from '@/lib/translations'
import SheetDiffPricingClient from '@/components/SheetDiffPricingClient'

export async function generateStaticParams() {
  return getSupportedLocales().map(locale => ({ locale }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const titles: Record<string, string> = {
    en: 'Pricing — SheetDiff™ | Compare, QA for Sheets',
    fr: 'Tarifs — SheetDiff™ | Comparaison, QA pour Sheets',
    ar: 'الأسعار — SheetDiff™ | مقارنة وضمان الجودة',
  }
  const descriptions: Record<string, string> = {
    en: 'SheetDiff™ pricing plans: 7-day free trial, free tier with 50 rows and 10 comparisons/month, or unlimited access with SheetDiff™ Pro starting at $4.99/month.',
    fr: "Tarifs SheetDiff™ : 7 jours d'essai gratuit, forfait gratuit avec 50 lignes et 10 comparaisons/mois, ou accès illimité avec SheetDiff™ Pro à partir de 4,99 $/mois.",
    ar: 'خطط أسعار SheetDiff™: تجربة مجانية 7 أيام، أو طبقة مجانية بـ 50 صفًا و10 مقارنات شهريًا، أو وصول غير محدود مع SheetDiff™ Pro من 4.99 $/شهر.',
  }
  return {
    title: titles[locale] ?? titles.en,
    description: descriptions[locale] ?? descriptions.en,
    alternates: {
      canonical: `https://www.mohamedyaakoubi.com/${locale}/sheetdiff/pricing`,
      languages: {
        'en': 'https://www.mohamedyaakoubi.com/en/sheetdiff/pricing',
        'fr': 'https://www.mohamedyaakoubi.com/fr/sheetdiff/pricing',
        'ar': 'https://www.mohamedyaakoubi.com/ar/sheetdiff/pricing',
        'x-default': 'https://www.mohamedyaakoubi.com/en/sheetdiff/pricing',
      },
    },
  }
}

export default function SheetDiffPricingPage() {
  return <SheetDiffPricingClient />
}

import type { Metadata } from 'next'
import { getSupportedLocales } from '@/lib/translations'
import PortfolioPrivacyClient from '@/components/PortfolioPrivacyClient'

export async function generateStaticParams() {
  return getSupportedLocales().map(locale => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params

  const titles: Record<string, string> = {
    en: 'Privacy Policy | Mohamed Yaakoubi',
    fr: 'Politique de Confidentialité | Mohamed Yaakoubi',
    ar: 'سياسة الخصوصية | محمد يعقوبي',
  }

  const descriptions: Record<string, string> = {
    en: 'Privacy Policy for mohamedyaakoubi.com — how your data is collected, used, and protected, including information about Google AdSense advertising cookies.',
    fr: 'Politique de confidentialité de mohamedyaakoubi.com — comment vos données sont collectées, utilisées et protégées, y compris les cookies publicitaires Google AdSense.',
    ar: 'سياسة الخصوصية لموقع mohamedyaakoubi.com — كيفية جمع بياناتكم واستخدامها وحمايتها، بما في ذلك معلومات عن كوكيز الإعلانات من Google AdSense.',
  }

  return {
    title: titles[locale] ?? titles.en,
    description: descriptions[locale] ?? descriptions.en,
    alternates: {
      canonical: `https://www.mohamedyaakoubi.com/${locale}/privacy-policy`,
      languages: {
        en: 'https://www.mohamedyaakoubi.com/en/privacy-policy',
        fr: 'https://www.mohamedyaakoubi.com/fr/privacy-policy',
        ar: 'https://www.mohamedyaakoubi.com/ar/privacy-policy',
        'x-default': 'https://www.mohamedyaakoubi.com/en/privacy-policy',
      },
    },
    robots: { index: true, follow: true },
  }
}

export default function PrivacyPolicyPage() {
  return <PortfolioPrivacyClient />
}

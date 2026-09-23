import type { Metadata } from 'next'
import { getSupportedLocales, assertSupportedLocale, getTranslations } from '@/lib/translations'
import { getPortfolioLegalI18n } from '@/data/portfolio-legal-i18n'
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
    openGraph: {
      locale: locale === 'ar' ? 'ar_TN' : locale === 'fr' ? 'fr_FR' : 'en_US',
      title: titles[locale] ?? titles.en,
      description: descriptions[locale] ?? descriptions.en,
      url: `https://www.mohamedyaakoubi.com/${locale}/privacy-policy`,
      type: 'website',
      siteName: 'Mohamed Yaakoubi - AI Language Technology Portfolio',
    },
    twitter: {
      card: 'summary_large_image',
      title: titles[locale] ?? titles.en,
      description: descriptions[locale] ?? descriptions.en,
      site: '@Mohamed0Yakoubi',
      creator: '@Mohamed0Yakoubi',
    },
  }
}

export default async function PrivacyPolicyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  assertSupportedLocale(locale)

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: getTranslations(locale).navigation?.links.home || 'Home', item: `https://www.mohamedyaakoubi.com/${locale}` },
      { '@type': 'ListItem', position: 2, name: getPortfolioLegalI18n(locale).privacy.title, item: `https://www.mohamedyaakoubi.com/${locale}/privacy-policy` },
    ],
  }

  return (
    <>
      <script
        id="privacy-policy-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <PortfolioPrivacyClient />
    </>
  )
}

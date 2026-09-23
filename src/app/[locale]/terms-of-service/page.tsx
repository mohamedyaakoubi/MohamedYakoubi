import type { Metadata } from 'next'
import { getSupportedLocales, assertSupportedLocale, getTranslations } from '@/lib/translations'
import { getPortfolioLegalI18n } from '@/data/portfolio-legal-i18n'
import PortfolioTermsClient from '@/components/PortfolioTermsClient'

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
    en: 'Terms of Service | Mohamed Yaakoubi',
    fr: "Conditions d'utilisation | Mohamed Yaakoubi",
    ar: 'شروط الخدمة | محمد يعقوبي',
  }

  const descriptions: Record<string, string> = {
    en: 'Terms of Service for mohamedyaakoubi.com — rules for using this website, intellectual property, disclaimers, and governing law.',
    fr: "Conditions d'utilisation de mohamedyaakoubi.com — règles d'utilisation du site, propriété intellectuelle, exclusions de garantie et droit applicable.",
    ar: 'شروط الخدمة لموقع mohamedyaakoubi.com — قواعد استخدام الموقع، الملكية الفكرية، إخلاء المسؤولية، والقانون الحاكم.',
  }

  return {
    title: titles[locale] ?? titles.en,
    description: descriptions[locale] ?? descriptions.en,
    alternates: {
      canonical: `https://www.mohamedyaakoubi.com/${locale}/terms-of-service`,
      languages: {
        en: 'https://www.mohamedyaakoubi.com/en/terms-of-service',
        fr: 'https://www.mohamedyaakoubi.com/fr/terms-of-service',
        ar: 'https://www.mohamedyaakoubi.com/ar/terms-of-service',
        'x-default': 'https://www.mohamedyaakoubi.com/en/terms-of-service',
      },
    },
    openGraph: {
      locale: locale === 'ar' ? 'ar_TN' : locale === 'fr' ? 'fr_FR' : 'en_US',
      title: titles[locale] ?? titles.en,
      description: descriptions[locale] ?? descriptions.en,
      url: `https://www.mohamedyaakoubi.com/${locale}/terms-of-service`,
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

export default async function TermsOfServicePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  assertSupportedLocale(locale)

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: getTranslations(locale).navigation?.links.home || 'Home', item: `https://www.mohamedyaakoubi.com/${locale}` },
      { '@type': 'ListItem', position: 2, name: getPortfolioLegalI18n(locale).terms.title, item: `https://www.mohamedyaakoubi.com/${locale}/terms-of-service` },
    ],
  }

  return (
    <>
      <script
        id="terms-of-service-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <PortfolioTermsClient />
    </>
  )
}

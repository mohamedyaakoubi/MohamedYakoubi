import type { Metadata } from 'next'
import { getSupportedLocales } from '@/lib/translations'
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
    robots: { index: true, follow: true },
  }
}

export default function TermsOfServicePage() {
  return <PortfolioTermsClient />
}

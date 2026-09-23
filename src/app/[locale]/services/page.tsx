import type { Metadata } from 'next'
import ServicesClient from '@/components/ServicesClient'
import { getTranslations, getSupportedLocales, assertSupportedLocale } from '@/lib/translations'

export async function generateStaticParams() {
  const locales = getSupportedLocales();
  return locales.map(locale => ({ locale }));
}

// Add this generateMetadata function with canonical URL
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  
  const titles = {
    en: 'Professional Services | Mohamed Yaakoubi | AI Data Annotation, Translation & Localization, Web Development, Resume Writing, Technical Support',
    fr: 'Services Professionnels | Mohamed Yaakoubi | Annotation Données IA, Traduction & Localisation, Développement Web, Rédaction CV, Support Technique',
    ar: 'الخدمات المهنية | محمد يعقوبي | تعليق بيانات الذكاء الاصطناعي، الترجمة والتوطين، تطوير الويب، كتابة السيرة الذاتية، الدعم التقني'
  }
  
  const descriptions = {
    en: 'Professional services by Mohamed Yaakoubi: AI data annotation, translation & localization, web development, career coaching, technical support, and IT consulting.',
    fr: 'Services professionnels par Mohamed Yaakoubi : annotation de données IA, traduction et localisation, développement web, coaching de carrière, support technique et conseil IT.',
    ar: 'الخدمات المهنية من محمد يعقوبي: تعليق البيانات بالذكاء الاصطناعي، الترجمة والتوطين، تطوير الويب، تدريب المهن، الدعم التقني، والاستشارات التقنية.'
  }

  return {
    title: titles[locale as keyof typeof titles] || titles.en,
    description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
    keywords: [
      'AI services', 'data annotation', 'translation services', 'web development',
      'career coaching', 'technical support', 'IT consulting', 'localization',
      'Mohamed Yaakoubi services', 'freelance AI specialist', 'Arabic English translation',
      'resume writing', 'portfolio development', 'multilingual support'
    ].join(', '),
    alternates: {
      canonical: `https://www.mohamedyaakoubi.com/${locale}/services`,
      languages: {
        en: 'https://www.mohamedyaakoubi.com/en/services',
        fr: 'https://www.mohamedyaakoubi.com/fr/services',
        ar: 'https://www.mohamedyaakoubi.com/ar/services',
        'x-default': 'https://www.mohamedyaakoubi.com/en/services',
      },
    },
    openGraph: {
      locale: locale === 'ar' ? 'ar_TN' : locale === 'fr' ? 'fr_FR' : 'en_US',
      title: titles[locale as keyof typeof titles] || titles.en,
      description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
      type: 'website',
      url: `https://www.mohamedyaakoubi.com/${locale}/services`,
    },
    twitter: {
      card: 'summary_large_image',
      title: titles[locale as keyof typeof titles] || titles.en,
      description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
    }
  }
}

// Add the missing interface
interface ServicesPageProps {
  params: Promise<{ locale: string }>
}

export default async function ServicesPage(props: ServicesPageProps) {
  // Fix: Properly await params
  const params = await props.params
  const { locale } = params
  assertSupportedLocale(locale)
  const translations = getTranslations(locale)
  // Breadcrumb schema for services
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": translations.navigation?.links.home || "Home",
        "item": `https://www.mohamedyaakoubi.com/${locale}`
      },
      {
        "@type": "ListItem", 
        "position": 2,
        "name": translations.navigation?.links.services || "Services",
        "item": `https://www.mohamedyaakoubi.com/${locale}/services`
      }
    ]
  }

  return (
    <>
      {/* FAQPage schema removed: its 3 Q&A pairs were rendered nowhere on this page.
          Marking up content not visible to users violates Google's structured-data
          general guidelines, and FAQ rich results were retired from Search on
          2026-05-07, so the markup carried risk with no upside. */}
      <script
        id="services-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema)
        }}
      />
      <ServicesClient locale={locale} translations={translations} />
    </>
  )
}
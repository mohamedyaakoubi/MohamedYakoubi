import type { Metadata } from 'next'
import ContactClient from '@/components/ContactClient'
import { getTranslations } from '@/lib/translations'
import Script from 'next/script'

export async function generateStaticParams() {
  return [
    { locale: 'en' },
    { locale: 'fr' },
    { locale: 'ar' },
  ]
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  
  const titles = {
    en: 'Contact Mohamed Yaakoubi | Hire AI Language Specialist | Translation, Localization, LLM Evaluation Services | Sfax, Tunisia',
    fr: 'Contacter Mohamed Yaakoubi | Embaucher Spécialiste IA Linguistique | Services Traduction, Localisation, Évaluation LLM | Sfax, Tunisie',
    ar: 'تواصل مع محمد يعقوبي | توظيف متخصص لغة الذكاء الاصطناعي | خدمات الترجمة والتوطين وتقييم نماذج اللغة | صفاقس، تونس'
  }
  
  const descriptions = {
    en: 'Get in touch with Mohamed Yaakoubi for AI solutions, web development, or language services. Contact form and professional social profiles.',
    fr: 'Contactez Mohamed Yaakoubi pour des solutions IA, développement web ou services linguistiques. Formulaire de contact et profils sociaux professionnels.',
    ar: 'تواصل مع محمد يعقوبي للحصول على حلول الذكاء الاصطناعي أو تطوير الويب أو الخدمات اللغوية. نموذج الاتصال والملفات الشخصية المهنية.'
  }
  
  return {
    title: titles[locale as keyof typeof titles] || titles.en,
    description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
    alternates: {
      canonical: `https://www.mohamedyaakoubi.com/${locale}/contact`
    },
    openGraph: {
      title: titles[locale as keyof typeof titles] || titles.en,
      description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
      type: 'website',
      url: `https://www.mohamedyaakoubi.com/${locale}/contact`,
    },
  }
}

interface ContactPageProps {
  params: Promise<{ locale: string }>
}

export default async function ContactPage(props: ContactPageProps) {
  const params = await props.params
  const { locale } = params
  const translations = getTranslations(locale)
  
  // Add breadcrumb schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": translations.navigation?.links?.home || "Home", // Fix: Use links.home
        "item": `https://www.mohamedyaakoubi.com/${locale}`
      },
      {
        "@type": "ListItem", 
        "position": 2,
        "name": translations.contact?.title || "Contact",
        "item": `https://www.mohamedyaakoubi.com/${locale}/contact`
      }
    ]
  }
  
  return (
    <>
          {/* Add breadcrumb schema */}
      <Script
        id="contact-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema)
        }}
      />
      <ContactClient locale={locale} translations={translations} />
    </>
  )
}
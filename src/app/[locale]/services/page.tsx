import type { Metadata } from 'next'
import ServicesClient from '@/components/ServicesClient'
import { getTranslations, getSupportedLocales } from '@/lib/translations'
import Script from 'next/script'

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
      canonical: `https://www.mohamedyaakoubi.com/${locale}/services`
    },
    openGraph: {
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

  // FAQ schema for services - multilingual
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": locale === 'ar' 
          ? "ما هي خدمات الذكاء الاصطناعي التي يقدمها محمد يعقوبي؟"
          : locale === 'fr' 
            ? "Quels services IA propose Mohamed Yaakoubi ?"
            : "What AI services does Mohamed Yaakoubi offer?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": locale === 'ar'
            ? "يقدم محمد خدمات تعليق البيانات بالذكاء الاصطناعي وتقييم الترجمة الآلية وتطوير الويب المدعوم بالذكاء الاصطناعي."
            : locale === 'fr'
              ? "Mohamed propose des services d'annotation de données IA, d'évaluation de traduction automatique et de développement web alimenté par l'IA."
              : "Mohamed offers AI data annotation, machine translation evaluation, and AI-powered web development services."
        }
      },
      {
        "@type": "Question",
        "name": locale === 'ar'
          ? "ما هي اللغات التي يدعمها محمد في خدمات الترجمة؟"
          : locale === 'fr'
            ? "Quelles langues Mohamed prend-il en charge pour les services de traduction ?"
            : "What languages does Mohamed support for translation services?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": locale === 'ar'
            ? "يتخصص محمد في الترجمة بين العربية والإنجليزية والفرنسية، مع خبرة خاصة في الترجمة التقنية والتوطين."
            : locale === 'fr'
              ? "Mohamed se spécialise dans la traduction arabe-anglais-français, avec une expertise particulière en traduction technique et localisation."
              : "Mohamed specializes in Arabic-English-French translation, with particular expertise in technical translation and localization."
        }
      },
      {
        "@type": "Question",
        "name": locale === 'ar'
          ? "كيف يمكنني طلب خدمات تطوير الويب؟"
          : locale === 'fr'
            ? "Comment puis-je demander des services de développement web ?"
            : "How can I request web development services?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": locale === 'ar'
            ? "يمكنك التواصل مع محمد عبر نموذج الاتصال أو البريد الإلكتروني أو منصات العمل الحر مثل Upwork وFiverr للحصول على استشارة مجانية."
            : locale === 'fr'
              ? "Vous pouvez contacter Mohamed via le formulaire de contact, email, ou plateformes freelance comme Upwork et Fiverr pour une consultation gratuite."
              : "You can contact Mohamed through the contact form, email, or freelance platforms like Upwork and Fiverr for a free consultation."
        }
      }
    ]
  }
  return (
    <>
          {/* Add both schemas */}
      <Script
        id="services-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema)
        }}
      />
      
      <Script
        id="services-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema)
        }}
      />
      <ServicesClient locale={locale} translations={translations} />
    </>
  )
}
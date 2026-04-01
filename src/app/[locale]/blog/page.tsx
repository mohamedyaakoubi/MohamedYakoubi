import type { Metadata } from 'next'
import { getTranslations, getSupportedLocales } from '@/lib/translations'
import { blogCategories, getLocalizedBlogPosts } from '@/data/blog'
import BlogClient from '@/components/BlogClient'
import Script from 'next/script'

export async function generateStaticParams() {
  const locales = getSupportedLocales()
  return locales.map(locale => ({ locale }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params

  const titles = {
    en: 'Blog | Mohamed Yaakoubi | AI, Cybersecurity & Language Technology Insights',
    fr: 'Blog | Mohamed Yaakoubi | IA, Cybersécurité & Technologie Linguistique',
    ar: 'المدونة | محمد يعقوبي | الذكاء الاصطناعي والأمن السيبراني وتكنولوجيا اللغة',
  }

  const descriptions = {
    en: 'Read articles by Mohamed Yaakoubi on AI security, penetration testing, responsible disclosure, and the intersection of AI-assisted development and cybersecurity best practices.',
    fr: 'Lisez les articles de Mohamed Yaakoubi sur la sécurité de l\'IA, les tests de pénétration, la divulgation responsable et l\'intersection du développement assisté par l\'IA et des meilleures pratiques en cybersécurité.',
    ar: 'اقرأ مقالات محمد يعقوبي حول أمن الذكاء الاصطناعي واختبار الاختراق والإفصاح المسؤول وتقاطع التطوير المدعوم بالذكاء الاصطناعي وأفضل ممارسات الأمن السيبراني.',
  }

  return {
    title: titles[locale as keyof typeof titles] || titles.en,
    description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
    alternates: {
      canonical: `https://www.mohamedyaakoubi.com/${locale}/blog`,
      languages: {
        'en': 'https://www.mohamedyaakoubi.com/en/blog',
        'fr': 'https://www.mohamedyaakoubi.com/fr/blog',
        'ar': 'https://www.mohamedyaakoubi.com/ar/blog',
        'x-default': 'https://www.mohamedyaakoubi.com/en/blog',
      },
    },
    openGraph: {
      title: titles[locale as keyof typeof titles] || titles.en,
      description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
      url: `https://www.mohamedyaakoubi.com/${locale}/blog`,
      siteName: 'Mohamed Yaakoubi - AI Language Technology Portfolio',
      locale: locale === 'ar' ? 'ar_TN' : locale === 'fr' ? 'fr_FR' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: titles[locale as keyof typeof titles] || titles.en,
      description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
    },
  }
}

interface BlogPageProps {
  params: Promise<{ locale: string }>
}

export default async function BlogPage(props: BlogPageProps) {
  const params = await props.params
  const { locale } = params
  const translations = getTranslations(locale)
  const localizedPosts = getLocalizedBlogPosts(locale)

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: translations.navigation?.links.home || 'Home',
        item: `https://www.mohamedyaakoubi.com/${locale}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: `https://www.mohamedyaakoubi.com/${locale}/blog`,
      },
    ],
  }

  const blogListSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Blog - Mohamed Yaakoubi',
    description: 'Articles on AI, cybersecurity, and language technology.',
    url: `https://www.mohamedyaakoubi.com/${locale}/blog`,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: localizedPosts.map((post, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `https://www.mohamedyaakoubi.com/${locale}/blog/${post.slug}`,
        name: post.title,
      })),
    },
  }

  return (
    <>
      <Script
        id="blog-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Script
        id="blog-list-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogListSchema) }}
      />

      <BlogClient locale={locale} translations={translations} posts={localizedPosts} />
    </>
  )
}

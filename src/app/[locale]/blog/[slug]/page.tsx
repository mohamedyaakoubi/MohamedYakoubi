import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getTranslations, getSupportedLocales } from '@/lib/translations'
import { blogPosts, getLocalizedBlogPost } from '@/data/blog'
import BlogPostClient from '@/components/BlogPostClient'
import Script from 'next/script'

export async function generateStaticParams() {
  const locales = getSupportedLocales()
  const params: { locale: string; slug: string }[] = []

  for (const locale of locales) {
    for (const post of blogPosts) {
      params.push({ locale, slug: post.slug })
    }
  }

  return params
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params
  const post = getLocalizedBlogPost(slug, locale)

  if (!post) {
    return { title: 'Post Not Found' }
  }

  return {
    title: `${post.title} | Mohamed Yaakoubi Blog`,
    description: post.description,
    authors: [{ name: post.author.name, url: post.author.url }],
    alternates: {
      canonical: `https://www.mohamedyaakoubi.com/${locale}/blog/${slug}`,
      languages: {
        'en': `https://www.mohamedyaakoubi.com/en/blog/${slug}`,
        'fr': `https://www.mohamedyaakoubi.com/fr/blog/${slug}`,
        'ar': `https://www.mohamedyaakoubi.com/ar/blog/${slug}`,
        'x-default': `https://www.mohamedyaakoubi.com/en/blog/${slug}`,
      },
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://www.mohamedyaakoubi.com/${locale}/blog/${slug}`,
      siteName: 'Mohamed Yaakoubi - AI Language Technology Portfolio',
      locale: locale === 'ar' ? 'ar_TN' : locale === 'fr' ? 'fr_FR' : 'en_US',
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt || post.publishedAt,
      authors: [post.author.name],
      tags: post.tags,
      images: [
        {
          url: `https://www.mohamedyaakoubi.com/${locale}/blog/${slug}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
    },
  }
}

interface BlogPostPageProps {
  params: Promise<{ locale: string; slug: string }>
}

export default async function BlogPostPage(props: BlogPostPageProps) {
  const params = await props.params
  const { locale, slug } = params
  const post = getLocalizedBlogPost(slug, locale)

  if (!post) {
    notFound()
  }

  const translations = getTranslations(locale)

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
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: `https://www.mohamedyaakoubi.com/${locale}/blog/${slug}`,
      },
    ],
  }

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    author: {
      '@type': 'Person',
      name: post.author.name,
      url: post.author.url,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Mohamed Yaakoubi',
      url: 'https://www.mohamedyaakoubi.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.mohamedyaakoubi.com/profile.jpg',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://www.mohamedyaakoubi.com/${locale}/blog/${slug}`,
    },
    keywords: post.tags.join(', '),
    articleSection: post.category,
    wordCount: post.content.split(/\s+/).length,
    image: post.image || 'https://www.mohamedyaakoubi.com/profile.jpg',
    url: `https://www.mohamedyaakoubi.com/${locale}/blog/${slug}`,
    inLanguage: locale === 'ar' ? 'ar' : locale === 'fr' ? 'fr' : 'en',
  }

  return (
    <>
      <Script
        id="blogpost-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Script
        id="blogpost-article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      {/* Static SEO content — no heading here; the visible <h1> is in BlogPostClient */}
      <div className="sr-only" aria-hidden="false">
        <p><strong>{post.title}</strong></p>
        <p>{post.description}</p>
        <p>Author: {post.author.name}</p>
        <p>Published: {post.publishedAt}</p>
        <p>Category: {post.category}</p>
        <p>Tags: {post.tags.join(', ')}</p>
        <p>Reading time: {post.readingTime} minutes</p>
      </div>

      <BlogPostClient post={post} locale={locale} translations={translations} />
    </>
  )
}

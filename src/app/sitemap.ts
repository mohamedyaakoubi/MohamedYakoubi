import { MetadataRoute } from 'next'
import { blogPosts } from '@/data/blog'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.mohamedyaakoubi.com'

  // Derive the blog index date from the most recently published/updated post
  const latestPostDate = blogPosts.reduce<Date>((latest, post) => {
    const d = new Date(post.updatedAt || post.publishedAt)
    return d > latest ? d : latest
  }, new Date('2026-04-05'))

  // Per-page last-modified dates — sourced from git history, update when content changes
  const pageLastModified: Record<string, Date> = {
    '':              new Date('2026-04-04'), // hero/home components updated Apr 4
    '/experience':   new Date('2026-04-07'), // JSON-LD script SSR fix Apr 7
    '/projects':     new Date('2026-04-07'), // JSON-LD script SSR fix Apr 7
    '/services':     new Date('2026-04-07'), // JSON-LD script SSR fix Apr 7
    '/contact':      new Date('2026-04-07'), // JSON-LD script SSR fix Apr 7
    '/blog':         latestPostDate,
    '/sheetdiff':    new Date('2026-04-07'), // JSON-LD script SSR fix Apr 7
  }

  const apiDocsDate        = new Date('2026-04-09') // API docs section added Apr 9
  const sheetdiffSubPageDate = new Date('2026-04-05')

  const projectPageDates: Record<string, Date> = {
    '/projects/potential':            new Date('2026-04-07'), // JSON-LD script SSR fix Apr 7
    '/projects/documed':              new Date('2026-04-07'), // JSON-LD script SSR fix Apr 7
    '/projects/internationalskills':  new Date('2026-04-07'), // JSON-LD script SSR fix Apr 7
  }

  const locales = ['en', 'fr', 'ar']
  const pages = ['', '/experience', '/projects', '/services', '/contact', '/blog', '/sheetdiff']

  const sitemapEntries: MetadataRoute.Sitemap = []

  // DON'T add root URL - only add localized versions
  locales.forEach(locale => {
    pages.forEach(page => {
      const url = `${baseUrl}/${locale}${page}`

      const priority = page === '' ? 1.0 :
                     page === '/experience' || page === '/services' ? 0.9 :
                     page === '/projects' || page === '/blog' ? 0.8 :
                     page === '/contact' ? 0.7 : 0.5

      const changeFrequency: "monthly" | "weekly" | "yearly" =
        page === '/experience' ? 'monthly' :
        page === '/blog' ? 'weekly' : 'yearly'

      sitemapEntries.push({
        url,
        lastModified: pageLastModified[page],
        changeFrequency,
        priority,
      })
    })

    // Add SheetDiff sub-pages
    const sheetdiffPages = ['/sheetdiff/pricing', '/sheetdiff/terms-of-service', '/sheetdiff/privacy-policy']
    sheetdiffPages.forEach(page => {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}${page}`,
        lastModified: sheetdiffSubPageDate,
        changeFrequency: 'yearly',
        priority: 0.5,
      })
    })

    // Add API docs section
    sitemapEntries.push({
      url: `${baseUrl}/${locale}/sheetdiff/api-docs`,
      lastModified: apiDocsDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    })
    const apiDocSubPages = [
      '/sheetdiff/api-docs/parameters',
      '/sheetdiff/api-docs/diff-statuses',
      '/sheetdiff/api-docs/demo',
      '/sheetdiff/api-docs/live-demo',
    ]
    apiDocSubPages.forEach(page => {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}${page}`,
        lastModified: apiDocsDate,
        changeFrequency: 'monthly',
        priority: 0.7,
      })
    })

    // Add project detail sub-pages
    sitemapEntries.push({
      url: `${baseUrl}/${locale}/projects/potential`,
      lastModified: projectPageDates['/projects/potential'],
      changeFrequency: 'monthly',
      priority: 0.8,
    })
    sitemapEntries.push({
      url: `${baseUrl}/${locale}/projects/documed`,
      lastModified: projectPageDates['/projects/documed'],
      changeFrequency: 'monthly',
      priority: 0.8,
    })
    sitemapEntries.push({
      url: `${baseUrl}/${locale}/projects/internationalskills`,
      lastModified: projectPageDates['/projects/internationalskills'],
      changeFrequency: 'monthly',
      priority: 0.8,
    })

    // Add individual blog posts
    blogPosts.forEach(post => {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}/blog/${post.slug}`,
        lastModified: new Date(post.updatedAt || post.publishedAt),
        changeFrequency: 'monthly',
        priority: 0.7,
      })
    })
  })
  
  return sitemapEntries
}
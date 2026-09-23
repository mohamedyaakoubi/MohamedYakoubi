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

  // Per-page last-modified dates. Google uses <lastmod> ONLY if it is "consistently and
  // verifiably accurate" — an inaccurate date makes it ignore the signal site-wide, so
  // these must track real main-content changes, not deploy dates.
  // Each value = the newest git date across that route's page.tsx, its client component,
  // and the i18n/translation module supplying its copy. Re-derive when content changes:
  //   git log -1 --format=%ad --date=short -- <file>
  const pageLastModified: Record<string, Date> = {
    '':                  new Date('2026-09-03'), // page.tsx + HomeClient/Hero, Sep 3
    '/experience':       new Date('2026-07-09'), // ExperienceClient + translations, Jul 9
    '/projects':         new Date('2026-07-09'), // ProjectsClient + translations, Jul 9
    '/services':         new Date('2026-07-09'), // ServicesClient + translations, Jul 9
    '/contact':          new Date('2026-07-09'), // ContactClient + translations, Jul 9
    '/blog':             latestPostDate,
    '/sheetdiff':        new Date('2026-09-03'), // SheetDiffClient, Sep 3
    '/privacy-policy':   new Date('2026-05-04'), // portfolio-legal-i18n.ts, May 4
    '/terms-of-service': new Date('2026-05-04'), // portfolio-legal-i18n.ts, May 4
  }

  const apiDocsDate        = new Date('2026-05-09') // Footer cross-locale links, hreflang + URL fixes May 9
  const apiDocsLegalDate    = new Date('2026-04-10') // API-specific ToS + privacy added Apr 10
  const sheetdiffSubPageDates: Record<string, Date> = {
    '/sheetdiff/pricing':           new Date('2026-09-03'), // SheetDiffPricingClient, Sep 3
    '/sheetdiff/terms-of-service':  new Date('2026-09-03'), // SheetDiffTermsClient, Sep 3
    '/sheetdiff/privacy-policy':    new Date('2026-09-03'), // SheetDiffPrivacyClient, Sep 3
  }

  const projectPageDates: Record<string, Date> = {
    '/projects/potential':            new Date('2026-04-07'), // PotentialProjectClient, Apr 7
    '/projects/documed':              new Date('2026-04-07'), // DocuMedProjectClient, Apr 7
    '/projects/internationalskills':  new Date('2026-04-07'), // InternationalSkillsClient, Apr 7
  }

  const locales = ['en', 'fr', 'ar']
  const pages = ['', '/experience', '/projects', '/services', '/contact', '/blog', '/sheetdiff', '/privacy-policy', '/terms-of-service']

  const sitemapEntries: MetadataRoute.Sitemap = []

  // Must mirror the per-page metadata.alternates.languages block exactly, x-default
  // included — Google reads sitemap hreflang and on-page hreflang as one set, and an
  // x-default present in the HTML but absent here is an inconsistent annotation.
  const getAlternates = (path: string) => ({
    languages: {
      en: `${baseUrl}/en${path}`,
      fr: `${baseUrl}/fr${path}`,
      ar: `${baseUrl}/ar${path}`,
      'x-default': `${baseUrl}/en${path}`,
    }
  })

  // DON'T add root URL - only add localized versions
  locales.forEach(locale => {
    pages.forEach(page => {
      const url = `${baseUrl}/${locale}${page}`

      const priority = page === '' ? 1.0 :
                     page === '/experience' || page === '/services' ? 0.9 :
                     page === '/projects' || page === '/blog' ? 0.8 :
                     page === '/contact' ? 0.7 :
                     page === '/privacy-policy' || page === '/terms-of-service' ? 0.5 : 0.5

      const changeFrequency: "monthly" | "weekly" | "yearly" =
        page === '/experience' ? 'monthly' :
        page === '/blog' ? 'weekly' : 'yearly'

      sitemapEntries.push({
        url,
        lastModified: pageLastModified[page],
        changeFrequency,
        priority,
        alternates: getAlternates(page),
      })
    })

    // Add SheetDiff sub-pages
    const sheetdiffPages = ['/sheetdiff/pricing', '/sheetdiff/terms-of-service', '/sheetdiff/privacy-policy']
    sheetdiffPages.forEach(page => {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}${page}`,
        lastModified: sheetdiffSubPageDates[page],
        changeFrequency: 'yearly',
        priority: 0.5,
        alternates: getAlternates(page),
      })
    })

    // Add API docs section
    sitemapEntries.push({
      url: `${baseUrl}/${locale}/sheetdiff/api-docs`,
      lastModified: apiDocsDate,
      changeFrequency: 'monthly',
      priority: 0.8,
      alternates: getAlternates('/sheetdiff/api-docs'),
    })
    const apiDocSubPages = [
      '/sheetdiff/api-docs/parameters',
      '/sheetdiff/api-docs/diff-statuses',
      '/sheetdiff/api-docs/demo',
      '/sheetdiff/api-docs/playground',
      '/sheetdiff/api-docs/engine-precision',
    ]
    apiDocSubPages.forEach(page => {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}${page}`,
        lastModified: apiDocsDate,
        changeFrequency: 'monthly',
        priority: 0.7,
        alternates: getAlternates(page),
      })
    })

    // API-specific legal pages
    const apiLegalPages = [
      '/sheetdiff/api-docs/terms-of-service',
      '/sheetdiff/api-docs/privacy-policy',
    ]
    apiLegalPages.forEach(page => {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}${page}`,
        lastModified: apiDocsLegalDate,
        changeFrequency: 'yearly',
        priority: 0.4,
        alternates: getAlternates(page),
      })
    })

    // Add project detail sub-pages
    sitemapEntries.push({
      url: `${baseUrl}/${locale}/projects/potential`,
      lastModified: projectPageDates['/projects/potential'],
      changeFrequency: 'monthly',
      priority: 0.8,
      alternates: getAlternates('/projects/potential'),
    })
    sitemapEntries.push({
      url: `${baseUrl}/${locale}/projects/documed`,
      lastModified: projectPageDates['/projects/documed'],
      changeFrequency: 'monthly',
      priority: 0.8,
      alternates: getAlternates('/projects/documed'),
    })
    sitemapEntries.push({
      url: `${baseUrl}/${locale}/projects/internationalskills`,
      lastModified: projectPageDates['/projects/internationalskills'],
      changeFrequency: 'monthly',
      priority: 0.8,
      alternates: getAlternates('/projects/internationalskills'),
    })

    // Add individual blog posts
    blogPosts.forEach(post => {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}/blog/${post.slug}`,
        lastModified: new Date(post.updatedAt || post.publishedAt),
        changeFrequency: 'monthly',
        priority: 0.7,
        alternates: getAlternates(`/blog/${post.slug}`),
      })
    })
  })
  
  return sitemapEntries
}
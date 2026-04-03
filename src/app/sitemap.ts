import { MetadataRoute } from 'next'
import { blogPosts } from '@/data/blog'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.mohamedyaakoubi.com'
  const lastModified = new Date()
  
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
        lastModified,
        changeFrequency,
        priority,
      })
    })

    // Add SheetDiff sub-pages
    const sheetdiffPages = ['/sheetdiff/pricing', '/sheetdiff/terms-of-service', '/sheetdiff/privacy-policy']
    sheetdiffPages.forEach(page => {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}${page}`,
        lastModified,
        changeFrequency: 'yearly',
        priority: 0.5,
      })
    })

    // Add project detail sub-pages
    sitemapEntries.push({
      url: `${baseUrl}/${locale}/projects/potential`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    })
    sitemapEntries.push({
      url: `${baseUrl}/${locale}/projects/documed`,
      lastModified,
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
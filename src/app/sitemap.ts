import { MetadataRoute } from 'next'
import { blogPosts } from '@/data/blog'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.mohamedyaakoubi.com'
  const lastModified = new Date('2025-10-11')
  
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
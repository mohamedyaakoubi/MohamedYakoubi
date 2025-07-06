import { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.mohamedyaakoubi.live'
  const lastModified = new Date('2025-01-06')
  
  const locales = ['en', 'fr', 'ar']
  const pages = ['', '/experience', '/projects', '/services', '/contact']
  
  const sitemapEntries: MetadataRoute.Sitemap = []
  
  // DON'T add root URL - only add localized versions
  locales.forEach(locale => {
    pages.forEach(page => {
      const url = `${baseUrl}/${locale}${page}`
      
      const priority = page === '' ? 1.0 : 
                     page === '/experience' ? 0.9 :
                     page === '/projects' || page === '/services' ? 0.8 :
                     page === '/contact' ? 0.7 : 0.5
      
      const changeFrequency: "monthly" | "weekly" | "yearly" = 
        page === '/experience' ? 'monthly' : 'yearly'
      
      sitemapEntries.push({
        url,
        lastModified,
        changeFrequency,
        priority,
      })
    })
  })
  
  return sitemapEntries
}
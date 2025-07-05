import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://mohamed-yakoubi.vercel.app'
  const lastModified = new Date().toISOString()
  
  const locales = ['en', 'fr', 'ar']
  const pages = ['', '/experience', '/projects', '/services', '/contact', '/sitemap']
  
  const sitemapEntries: MetadataRoute.Sitemap = []
  
  // Add entries for each locale and page combination
  locales.forEach(locale => {
    pages.forEach(page => {
      const url = locale === 'en' 
        ? `${baseUrl}${page}` 
        : `${baseUrl}/${locale}${page}`
      
      const priority = page === '' ? 1.0 : 
                     page === '/experience' ? 0.9 :
                     page === '/projects' || page === '/services' ? 0.8 :
                     page === '/contact' ? 0.7 : 0.5
      
      sitemapEntries.push({
        url,
        lastModified,
        changeFrequency: 'monthly',
        priority,
      })
    })
  })
  
  return sitemapEntries
}


import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/']
      },
      {
        userAgent: 'bingbot',
        allow: '/',
        disallow: ['/api/']
      },
      {
        userAgent: 'msnbot',
        allow: '/',
        disallow: ['/api/']
      }
    ],
    sitemap: 'https://www.mohamedyaakoubi.live/sitemap.xml',
    host: 'https://www.mohamedyaakoubi.live',
  }
}
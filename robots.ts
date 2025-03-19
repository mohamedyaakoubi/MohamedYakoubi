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
    sitemap: 'https://mohamed-yakoubi.vercel.app/sitemap.xml',
    host: 'https://mohamed-yakoubi.vercel.app',
  }
}
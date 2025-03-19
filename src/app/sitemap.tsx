// Rename from sitemap.tsx to sitemap.ts
import { MetadataRoute } from 'next'

// Set a fixed date instead of using new Date() for better caching
const lastModified = '2025-03-19T12:00:00.000Z';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://mohamed-yakoubi.vercel.app'
  
  return [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/experience`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/sitemap`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.4,
    }
  ]
}
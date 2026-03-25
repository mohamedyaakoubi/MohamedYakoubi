import { ImageResponse } from 'next/og'
import { getLocalizedBlogPost, blogPosts } from '@/data/blog'

export const alt = 'Blog Post - Mohamed Yaakoubi'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export async function generateStaticParams() {
  const locales = ['en', 'fr', 'ar']
  const params: { locale: string; slug: string }[] = []
  for (const locale of locales) {
    for (const post of blogPosts) {
      params.push({ locale, slug: post.slug })
    }
  }
  return params
}

export default async function Image({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { slug } = await params
  // Always use English post data for OG images — Satori cannot render Arabic glyphs
  const post = getLocalizedBlogPost(slug, 'en')

  const title = post?.title || 'Blog Post'
  const category = post?.category || 'Article'
  const readingTime = post?.readingTime || 5
  const tags = post?.tags?.slice(0, 3) || []

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '60px',
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 40%, #334155 100%)',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '20px',
                fontWeight: 700,
              }}
            >
              MY
            </div>
            <span style={{ color: 'rgba(255,255,255,0.9)', fontSize: '22px', fontWeight: 600 }}>
              Mohamed Yaakoubi
            </span>
          </div>
          <div
            style={{
              display: 'flex',
              padding: '8px 20px',
              background: 'rgba(96,165,250,0.2)',
              borderRadius: '20px',
              color: '#93c5fd',
              fontSize: '18px',
              fontWeight: 600,
            }}
          >
            {category}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ width: '80px', height: '4px', background: '#60a5fa', borderRadius: '2px' }} />
          <h1
            style={{
              color: 'white',
              fontSize: title.length > 60 ? '42px' : title.length > 40 ? '48px' : '56px',
              fontWeight: 800,
              lineHeight: 1.2,
              margin: 0,
              maxWidth: '1000px',
            }}
          >
            {title}
          </h1>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '12px' }}>
            {tags.map((tag) => (
              <span
                key={tag}
                style={{
                  padding: '6px 14px',
                  background: 'rgba(255,255,255,0.1)',
                  borderRadius: '14px',
                  color: 'rgba(255,255,255,0.7)',
                  fontSize: '16px',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
          <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '18px' }}>
            {readingTime} min read
          </span>
        </div>
      </div>
    ),
    { ...size }
  )
}

import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

export const alt = 'Mohamed Yaakoubi — AI Language Technology Specialist'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

// Only the three real locales get a card; anything else 404s instead of rendering on demand.
export const dynamicParams = false

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'fr' }, { locale: 'ar' }]
}

export default async function Image() {
  const photo = await readFile(join(process.cwd(), 'public', 'mohamed-yaakoubi-square.jpg'))
  const photoSrc = `data:image/jpeg;base64,${photo.toString('base64')}`

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '60px 70px',
          background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 55%, #4c1d95 100%)',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', maxWidth: '700px' }}>
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
            <span style={{ color: 'rgba(255,255,255,0.9)', fontSize: '24px', fontWeight: 600 }}>
              Portfolio
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div style={{ width: '80px', height: '4px', background: '#60a5fa', borderRadius: '2px' }} />
            <h1 style={{ color: 'white', fontSize: '68px', fontWeight: 800, lineHeight: 1.05, margin: 0 }}>
              Mohamed Yaakoubi
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '32px', fontWeight: 600, margin: 0 }}>
              AI Language Technology Specialist
            </p>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '24px', margin: 0 }}>
              Machine Translation - LLM Evaluation - Localization
            </p>
          </div>

          <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '20px' }}>www.mohamedyaakoubi.com</span>
        </div>

        <img
          src={photoSrc}
          width={300}
          height={300}
          alt=""
          style={{ borderRadius: '50%', objectFit: 'cover', border: '6px solid rgba(255,255,255,0.18)' }}
        />
      </div>
    ),
    { ...size }
  )
}

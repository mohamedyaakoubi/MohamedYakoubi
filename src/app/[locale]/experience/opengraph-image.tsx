import { ImageResponse } from 'next/og'

export const alt = 'Professional Experience - Mohamed Yaakoubi'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
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
          background: 'linear-gradient(135deg, #1e3a5f 0%, #1e40af 40%, #312e81 100%)',
          fontFamily: 'sans-serif',
        }}
      >
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
            Mohamed Yaakoubi
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ width: '80px', height: '4px', background: '#60a5fa', borderRadius: '2px' }} />
          <h1 style={{ color: 'white', fontSize: '64px', fontWeight: 800, lineHeight: 1.1, margin: 0 }}>
            Professional Experience
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '26px', margin: 0 }}>
            Wirestock - DeepL - Meta AI (RWS) - Uber - Unbabel
          </p>
        </div>

        <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '20px' }}>
          www.mohamedyaakoubi.com
        </span>
      </div>
    ),
    { ...size }
  )
}

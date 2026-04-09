import { ImageResponse } from 'next/og'

export const alt = 'Structural Diff API Documentation — SheetDiff™'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'fr' }, { locale: 'ar' }]
}

export default async function Image() {
  const logoRes = await fetch('https://www.mohamedyaakoubi.com/sheetdiff-logo.png')
  const logoBuffer = await logoRes.arrayBuffer()
  const logoSrc = `data:image/png;base64,${Buffer.from(logoBuffer).toString('base64')}`

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
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0d2348 100%)',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Top row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <img
              src={logoSrc}
              width={56}
              height={56}
              alt="SheetDiff logo"
              style={{ borderRadius: '10px' }}
            />
            <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '22px', fontWeight: 600 }}>
              SheetDiff™ · by Mohamed Yaakoubi
            </span>
          </div>
          <div
            style={{
              display: 'flex',
              padding: '8px 22px',
              background: 'rgba(99,102,241,0.22)',
              border: '1px solid rgba(99,102,241,0.45)',
              borderRadius: '20px',
              color: '#a5b4fc',
              fontSize: '18px',
              fontWeight: 600,
            }}
          >
            API Documentation
          </div>
        </div>

        {/* Center */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h1
            style={{
              color: 'white',
              fontSize: '74px',
              fontWeight: 800,
              lineHeight: 1.08,
              margin: 0,
              letterSpacing: '-1px',
            }}
          >
            Structural Diff API
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '30px', margin: 0 }}>
            REST · JSON · Splits · Merges · CER / WER / SER
          </p>
          <div style={{ display: 'flex', gap: '14px', marginTop: '8px' }}>
            <div
              style={{
                padding: '9px 20px',
                background: 'rgba(52,211,153,0.12)',
                border: '1px solid rgba(52,211,153,0.3)',
                borderRadius: '10px',
                color: '#6ee7b7',
                fontSize: '18px',
              }}
            >
              POST /v1/diff
            </div>
            <div
              style={{
                padding: '9px 20px',
                background: 'rgba(52,211,153,0.12)',
                border: '1px solid rgba(52,211,153,0.3)',
                borderRadius: '10px',
                color: '#6ee7b7',
                fontSize: '18px',
              }}
            >
              6 diff statuses
            </div>
            <div
              style={{
                padding: '9px 20px',
                background: 'rgba(52,211,153,0.12)',
                border: '1px solid rgba(52,211,153,0.3)',
                borderRadius: '10px',
                color: '#6ee7b7',
                fontSize: '18px',
              }}
            >
              Inline char diff
            </div>
            <div
              style={{
                padding: '9px 20px',
                background: 'rgba(52,211,153,0.12)',
                border: '1px solid rgba(52,211,153,0.3)',
                borderRadius: '10px',
                color: '#6ee7b7',
                fontSize: '18px',
              }}
            >
              Quality scoring
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
          <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '20px' }}>
            www.mohamedyaakoubi.com/sheetdiff/api-docs
          </span>
          <span
            style={{
              padding: '8px 20px',
              background: 'rgba(99,102,241,0.12)',
              borderRadius: '14px',
              color: '#a5b4fc',
              fontSize: '18px',
            }}
          >
            For Agencies &amp; Teams
          </span>
        </div>
      </div>
    ),
    { ...size }
  )
}

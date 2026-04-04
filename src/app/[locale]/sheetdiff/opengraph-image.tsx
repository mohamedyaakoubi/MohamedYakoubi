import { ImageResponse } from 'next/og'

export const alt = 'SheetDiff™ - Compare, QA for Google Sheets™'
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
          background: 'linear-gradient(135deg, #022c22 0%, #064e3b 40%, #065f46 100%)',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <img
              src={logoSrc}
              width={64}
              height={64}
              alt="SheetDiff logo"
              style={{ borderRadius: '12px' }}
            />
            <span style={{ color: 'rgba(255,255,255,0.9)', fontSize: '22px', fontWeight: 600 }}>
              by Mohamed Yaakoubi
            </span>
          </div>
          <div
            style={{
              display: 'flex',
              padding: '8px 20px',
              background: 'rgba(52,211,153,0.2)',
              borderRadius: '20px',
              color: '#6ee7b7',
              fontSize: '18px',
              fontWeight: 600,
            }}
          >
            Google Sheets™ Add-on
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
          <img
            src={logoSrc}
            width={200}
            height={200}
            alt="SheetDiff — Google Sheets comparison tool logo"
            style={{ borderRadius: '24px' }}
          />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h1
              style={{
                color: 'white',
                fontSize: '72px',
                fontWeight: 800,
                lineHeight: 1.1,
                margin: 0,
              }}
            >
              SheetDiff™
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '28px', margin: 0, maxWidth: '600px' }}>
              Compare, QA for Spreadsheets
            </p>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '22px', margin: 0, maxWidth: '600px' }}>
              Schema-agnostic version comparison with color-coded QA diff reports
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
          <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '20px' }}>
            www.mohamedyaakoubi.com/sheetdiff
          </span>
          <span
            style={{
              padding: '8px 20px',
              background: 'rgba(52,211,153,0.15)',
              borderRadius: '14px',
              color: '#6ee7b7',
              fontSize: '18px',
            }}
          >
            7-day free trial
          </span>
        </div>
      </div>
    ),
    { ...size }
  )
}

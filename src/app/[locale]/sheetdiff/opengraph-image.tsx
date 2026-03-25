import { ImageResponse } from 'next/og'

export const alt = 'SheetDiff™ - Compare, Diff & QA for Google Sheets™'
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
          background: 'linear-gradient(135deg, #022c22 0%, #064e3b 40%, #065f46 100%)',
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

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ width: '80px', height: '4px', background: '#34d399', borderRadius: '2px' }} />
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
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '28px', margin: 0, maxWidth: '800px' }}>
            Compare, Diff & QA for Spreadsheets
          </p>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '22px', margin: 0, maxWidth: '800px' }}>
            Schema-agnostic version comparison with color-coded QA diff reports
          </p>
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

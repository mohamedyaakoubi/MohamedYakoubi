import { ImageResponse } from 'next/og'

export const alt = 'InternationalSkills.fi — Recruiting Management System'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'fr' }, { locale: 'ar' }]
}

export default async function Image() {
  const imgRes = await fetch('https://www.mohamedyaakoubi.com/projects/international-skills-labor-company.PNG')
  const imgBuffer = await imgRes.arrayBuffer()
  const imgSrc = `data:image/png;base64,${Buffer.from(imgBuffer).toString('base64')}`

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
          background: 'linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 50%, #2563eb 100%)',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: '22px', fontWeight: 600 }}>
            by Mohamed Yaakoubi
          </span>
          <div
            style={{
              display: 'flex',
              padding: '8px 20px',
              background: 'rgba(255,255,255,0.15)',
              borderRadius: '20px',
              color: 'rgba(255,255,255,0.9)',
              fontSize: '18px',
              fontWeight: 600,
            }}
          >
            InternationalSkills.fi · Finland
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '48px' }}>
          <img
            src={imgSrc}
            width={340}
            height={220}
            alt="InternationalSkills.fi recruiting management system screenshot"
            style={{ borderRadius: '16px' }}
          />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', flex: 1 }}>
            <h1
              style={{
                color: 'white',
                fontSize: '56px',
                fontWeight: 800,
                lineHeight: 1,
                margin: 0,
              }}
            >
              InternationalSkills.fi
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '26px', margin: 0, lineHeight: 1.4 }}>
              Recruiting Management System
            </p>
            <div style={{ display: 'flex', gap: '10px', marginTop: '4px' }}>
              <span
                style={{
                  padding: '6px 14px',
                  background: 'rgba(255,255,255,0.15)',
                  borderRadius: '8px',
                  color: 'rgba(255,255,255,0.9)',
                  fontSize: '18px',
                  fontWeight: 500,
                }}
              >
                Next.js
              </span>
              <span
                style={{
                  padding: '6px 14px',
                  background: 'rgba(255,255,255,0.15)',
                  borderRadius: '8px',
                  color: 'rgba(255,255,255,0.9)',
                  fontSize: '18px',
                  fontWeight: 500,
                }}
              >
                Gemini AI
              </span>
              <span
                style={{
                  padding: '6px 14px',
                  background: 'rgba(255,255,255,0.15)',
                  borderRadius: '8px',
                  color: 'rgba(255,255,255,0.9)',
                  fontSize: '18px',
                  fontWeight: 500,
                }}
              >
                Firebase
              </span>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '18px' }}>
            mohamedyaakoubi.com
          </span>
          <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '18px' }}>
            AI-Powered · Firebase · Google Meet
          </span>
        </div>
      </div>
    ),
    { ...size }
  )
}

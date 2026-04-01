import { ImageResponse } from 'next/og'

export const alt = 'Potential — AI-Powered Search Engine for Abu Dhabi Open Data'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'fr' }, { locale: 'ar' }]
}

export default async function Image() {
  const imgRes = await fetch('https://www.mohamedyaakoubi.com/Potential.webp')
  const imgBuffer = await imgRes.arrayBuffer()
  const imgSrc = `data:image/webp;base64,${Buffer.from(imgBuffer).toString('base64')}`

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
        {/* Top bar */}
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
            🏆 Abu Dhabi Spark AI Hackathon · Top 10
          </div>
        </div>

        {/* Main content */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '48px' }}>
          {/* Screenshot */}
          <img
            src={imgSrc}
            width={340}
            height={220}
            style={{ borderRadius: '16px', objectFit: 'cover', boxShadow: '0 8px 32px rgba(0,0,0,0.4)' }}
          />

          {/* Text */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', flex: 1 }}>
            <h1
              style={{
                color: 'white',
                fontSize: '80px',
                fontWeight: 800,
                lineHeight: 1,
                margin: 0,
              }}
            >
              Potential
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '26px', margin: 0, lineHeight: 1.4 }}>
              AI-Powered Search Engine for Abu Dhabi Open Data
            </p>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '4px' }}>
              {['Next.js', 'GPT-4', 'Azure AI Search'].map((tag) => (
                <span
                  key={tag}
                  style={{
                    padding: '6px 14px',
                    background: 'rgba(255,255,255,0.15)',
                    borderRadius: '8px',
                    color: 'rgba(255,255,255,0.9)',
                    fontSize: '18px',
                    fontWeight: 500,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
          <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '20px' }}>
            www.mohamedyaakoubi.com/projects/potential
          </span>
          <span
            style={{
              padding: '8px 20px',
              background: 'rgba(255,255,255,0.12)',
              borderRadius: '14px',
              color: 'rgba(255,255,255,0.8)',
              fontSize: '18px',
            }}
          >
            Natural Language · Open Data · RAG
          </span>
        </div>
      </div>
    ),
    { ...size }
  )
}

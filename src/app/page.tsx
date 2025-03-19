import type { Viewport } from 'next'
import HomeClient from '@/components/HomeClient'

// Keep these export constants
export const dynamic = 'force-static';
export const generateStaticParams = async () => { return [{}] };

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#171717' },
  ],
}

export default function HomePage() {
  return (
    <>
      {/* Plain text H1 that will be directly in the HTML source */}
      <h1 style={{
        position: 'absolute',
        top: '0',
        left: '0',
        width: '1px',
        height: '1px',
        padding: '10px',
        margin: '0',
        overflow: 'hidden',
        clip: 'rect(0, 0, 0, 0)',
        whiteSpace: 'nowrap',
        borderWidth: '0',
      }}>
        Mohamed Yaakoubi | Emerging AI and Technology Specialist
      </h1>
      
      <HomeClient />
    </>
  )
}
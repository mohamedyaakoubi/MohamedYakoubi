"use client"

import Script from "next/script"
import { Analytics as VercelAnalytics } from '@vercel/analytics/react'

export default function Analytics() {
  return (
    <>
      {/* Google Analytics - use Next.js Script component */}
      <Script 
        src="https://www.googletagmanager.com/gtag/js?id=G-0NVCDPTBCZ" 
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-0NVCDPTBCZ');
        `}
      </Script>
      
      {/* Vercel Analytics - zero config */}
      <VercelAnalytics />
    </>
  )
}
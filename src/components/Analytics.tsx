"use client"

import Script from "next/script"
import { Analytics as VercelAnalytics } from '@vercel/analytics/react'

export default function Analytics() {
  return (
    <>
      {/* Google Analytics or other analytics script - add your actual tracking ID */}
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=YOUR-GA-ID`}
      />
      <Script
        id="ga-script"
        strategy="lazyOnload"
      >
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'YOUR-GA-ID');
        `}
      </Script>
      
      {/* Vercel Analytics - zero config */}
      <VercelAnalytics />
    </>
  )
}
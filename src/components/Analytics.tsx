"use client"

import Script from "next/script"
import { Analytics as VercelAnalytics } from '@vercel/analytics/react'

export default function Analytics() {
  return (
    <>
      {/* Google Analytics - optimized loading */}
      <Script 
        src="https://www.googletagmanager.com/gtag/js?id=G-0NVCDPTBCZ" 
        strategy="lazyOnload" // Changed from afterInteractive to lazyOnload
      />
      <Script id="google-analytics" strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-0NVCDPTBCZ', {
            send_page_view: false, // Disable automatic page views
            'anonymize_ip': true,   // GDPR compliance
            'transport_type': 'beacon' // More efficient data sending
          });
          // Send pageview only after page has fully loaded
          window.addEventListener('load', function() {
            gtag('event', 'page_view');
          });
        `}
      </Script>
      
      {/* Vercel Analytics - already optimized */}
      <VercelAnalytics />
    </>
  )
}
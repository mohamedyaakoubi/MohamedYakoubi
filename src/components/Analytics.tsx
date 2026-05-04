"use client"

import Script from "next/script"
import { Analytics as VercelAnalytics } from '@vercel/analytics/react'

export default function Analytics() {
  return (
    <>
      {/* Google Analytics — load gtag.js */}
      <Script 
        src="https://www.googletagmanager.com/gtag/js?id=G-0NVCDPTBCZ" 
        strategy="lazyOnload"
      />
      <Script id="google-analytics" strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          // Consent Mode v2 — deny everything by default (GDPR compliant).
          // The CookieConsent component calls gtag('consent','update',...) on user action.
          gtag('consent', 'default', {
            analytics_storage:    'denied',
            ad_storage:           'denied',
            ad_user_data:         'denied',
            ad_personalization:   'denied',
            wait_for_update:      500,
          });

          // If user already accepted in a previous visit, restore granted state immediately.
          try {
            var _consent = localStorage.getItem('portfolio-cookie-consent');
            if (_consent === 'accepted') {
              gtag('consent', 'update', {
                analytics_storage:    'granted',
                ad_storage:           'granted',
                ad_user_data:         'granted',
                ad_personalization:   'granted',
              });
            }
          } catch(e) {}

          gtag('config', 'G-0NVCDPTBCZ', {
            send_page_view:  false,
            anonymize_ip:    true,
            transport_type:  'beacon',
          });

          // Only fire page_view when analytics is permitted.
          window.addEventListener('load', function() {
            try {
              if (localStorage.getItem('portfolio-cookie-consent') === 'accepted') {
                gtag('event', 'page_view');
              }
            } catch(e) {}
          });
        `}
      </Script>
      
      {/* Vercel Analytics — privacy-friendly, no consent required */}
      <VercelAnalytics />
    </>
  )
}
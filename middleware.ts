import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const isCrawler = (userAgent: string | null) => {
  if (!userAgent) return false;
  return /bot|crawl|spider|slurp|bingbot|msnbot|yandex|baidu/i.test(userAgent);
}

export function middleware(request: NextRequest) {
  // Clone the request headers
  const requestHeaders = new Headers(request.headers)
  // Add this line to get userAgent from the request
  const userAgent = request.headers.get('user-agent');
  
  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
  
  // If it's a crawler, don't apply the same middleware rules
  if (isCrawler(userAgent)) {
    // Return minimal headers for crawlers
    const response = NextResponse.next();
    response.headers.set('X-Robots-Tag', 'index, follow');
    return response;
  }
  
  // Add security headers
  response.headers.set('Content-Security-Policy', 
    "default-src 'self'; " +
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://va.vercel-scripts.com; " +
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
    "img-src 'self' data: blob: https://*.vercel-storage.com https://api.github.com https://img.buymeacoffee.com; " +
    "font-src 'self' https://fonts.gstatic.com data:; " +
    "connect-src 'self' https://vitals.vercel-insights.com https://va.vercel-analytics.com https://api.mistral.ai https://api.github.com; " +
    "frame-src 'self'; " +
    "object-src 'none'; " +
    "base-uri 'self'; " +
    "form-action 'self';"
  )
  
  
  // Additional security headers
  response.headers.set('X-DNS-Prefetch-Control', 'on')
  response.headers.set('X-XSS-Protection', '1; mode=block')
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), interest-cohort=()')
  
  // Add Font Display header
  response.headers.set('Font-Display', 'swap')

  return response
}

// Configure the middleware to run for all routes
export const config = {
    matcher: [
      /*
       * Match all paths except static assets which are handled by Next.js directly
       * and shouldn't be modified by middleware
       */
      '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:jpg|jpeg|gif|png|svg|webp|xml)).*)'
    ],
  }
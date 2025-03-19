import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const isCrawler = (userAgent: string | null) => {
  if (!userAgent) return false;
  return /bot|crawl|spider|slurp|bingbot|msnbot|yandex|baidu/i.test(userAgent);
}

export function middleware(request: NextRequest) {
  // Get userAgent from request
  const userAgent = request.headers.get('user-agent');

  // If it's a crawler, SKIP ALL security headers to ensure indexing works
  if (isCrawler(userAgent)) {
    const response = NextResponse.next();
    
    // Add specific headers for search engines
    response.headers.set('X-Robots-Tag', 'index, follow');
    
    // Don't add any Content-Security-Policy that might block crawling
    return response;
  }
  
  // For regular users, apply security headers
  const requestHeaders = new Headers(request.headers);
  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
  
  // Regular security headers for normal users
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
  );
  
  response.headers.set('X-DNS-Prefetch-Control', 'on');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), interest-cohort=()');
  
  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|BingSiteAuth.xml|.*\\.(?:jpg|jpeg|gif|png|svg|webp|xml)).*)'
  ],
};
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const supportedLocales = ['en', 'fr', 'ar']
const defaultLocale = 'en'

// Known valid routes (without locale prefix)
const validRoutes = new Set([
  '',
  'experience',
  'projects',
  'contact',
  'services',
  'blog',
  'sitemap',
  'sheetdiff',
  'sheetdiff/pricing',
  'sheetdiff/privacy-policy',
  'sheetdiff/terms-of-service',
  'projects/potential',
  'privacy-policy',
  'terms-of-service'
])

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip middleware for static files, API routes, and specific paths
  if (
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/api/') ||
    pathname.includes('.') ||
    pathname === '/favicon.ico' ||
    pathname === '/manifest.webmanifest' ||
    pathname.startsWith('/_error') ||
    pathname.startsWith('/_not-found') ||
    pathname === '/404' ||
    pathname === '/404.html' ||
    pathname === '/sitemap.xml' ||
    pathname === '/robots.txt' ||
    pathname === '/' // Let the root page handle the redirect
  ) {
    return NextResponse.next()
  }

  const segments = pathname.split('/').filter(Boolean)
  const maybeLocale = segments[0]

  if (supportedLocales.includes(maybeLocale)) {
    // Valid locale prefix - let Next.js routing handle it
    // Unknown routes will be caught by the [...slug] catch-all which triggers not-found.tsx
    return NextResponse.next()
  } else {
    // No locale prefix - need to add default locale
    const fullPath = segments.join('/')
    const targetUrl = new URL(`/${defaultLocale}/${fullPath}`, request.url)

    // For known valid routes, redirect so the URL updates (SEO canonical)
    if (validRoutes.has(fullPath) || fullPath.startsWith('blog/')) {
      return NextResponse.redirect(targetUrl, 301)
    }

    // For unknown routes, REWRITE (not redirect) so the catch-all [...slug] handles it
    // and shows 404 inside the full locale layout (with header, footer, theme)
    return NextResponse.rewrite(targetUrl)
  }
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)',
  ]
}
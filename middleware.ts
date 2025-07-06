import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const supportedLocales = ['en', 'fr', 'ar']
const defaultLocale = 'en'

const validRoutes = [
  '',
  'experience',
  'projects', 
  'contact',
  'services',
  'sitemap',
  'not-found'
]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip middleware for static files and API routes
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
    pathname === '/robots.txt'
  ) {
    return NextResponse.next()
  }

  // Handle root path - redirect to default locale (no trailing slash)
  if (pathname === '/') {
    return NextResponse.redirect(new URL(`/${defaultLocale}`, request.url))
  }

  // Check if pathname already has a supported locale
  const segments = pathname.split('/').filter(Boolean)
  const maybeLocale = segments[0]
  const routePath = segments.slice(1).join('/')

  if (supportedLocales.includes(maybeLocale)) {
    // Valid locale, check if route exists
    if (validRoutes.includes(routePath)) {
      return NextResponse.next()
    } else {
      // Invalid route for valid locale - redirect to locale's home
      return NextResponse.redirect(new URL(`/${maybeLocale}`, request.url))
    }
  } else {
    // Path without locale prefix - check if it's a valid route and redirect with default locale
    const fullPath = segments.join('/')
    if (validRoutes.includes(fullPath)) {
      return NextResponse.redirect(new URL(`/${defaultLocale}/${fullPath}`, request.url))
    } else {
      // Invalid route - redirect to home
      return NextResponse.redirect(new URL(`/${defaultLocale}`, request.url))
    }
  }
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)',
  ]
}
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

  // Check if pathname already has a supported locale
  const segments = pathname.split('/').filter(Boolean)
  const maybeLocale = segments[0]
  const routePath = segments.slice(1).join('/')

  if (supportedLocales.includes(maybeLocale)) {
    // Valid locale, check if route exists
    if (validRoutes.includes(routePath)) {
      return NextResponse.next()
    } else {
      // Invalid route for valid locale - permanent redirect to locale's not-found
      return NextResponse.redirect(new URL(`/${maybeLocale}/not-found`, request.url), 301)
    }
  } else {
    // Path without locale prefix - permanent redirect with default locale
    const fullPath = segments.join('/')
    if (validRoutes.includes(fullPath)) {
      return NextResponse.redirect(new URL(`/${defaultLocale}/${fullPath}`, request.url), 301)
    } else {
      // Invalid route - permanent redirect to not-found
      return NextResponse.redirect(new URL(`/${defaultLocale}/not-found`, request.url), 301)
    }
  }
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)',
  ]
}
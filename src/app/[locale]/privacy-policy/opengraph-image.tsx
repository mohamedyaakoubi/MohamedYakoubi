// Reuses the parent section's share card so this route has its own og:image and twitter:image
// (without it, the page's own openGraph metadata leaves the route with no image at all).
export { default, alt, size, contentType } from '../opengraph-image'

export const dynamicParams = false

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'fr' }, { locale: 'ar' }]
}

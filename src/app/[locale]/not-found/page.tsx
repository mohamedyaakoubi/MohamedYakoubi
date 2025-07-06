import type { Metadata } from 'next'
import AnimatedNotFound from '@/components/AnimateNotFound'

export async function generateStaticParams() {
  return [
    { locale: 'en' },
    { locale: 'fr' },
    { locale: 'ar' },
  ]
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  return {
    title: '404 - Page Not Found | Mohamed Yaakoubi',
    description: 'The page you are looking for does not exist. Return to Mohamed Yaakoubi\'s portfolio homepage.',
    robots: 'noindex,nofollow'
  }
}

interface NotFoundPageProps {
  params: Promise<{ locale: string }>
}

export default async function NotFoundPage({ params }: NotFoundPageProps) {
  return <AnimatedNotFound />
}
import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Mohamed Yaakoubi',
    short_name: 'MY',
    description: 'Emerging AI Specialist & Web Developer',
    start_url: '/',
    display: 'standalone',
    background_color: '#fff',
    theme_color: '#fff',
    icons: [
      {
        src: '/icon.png',
        sizes: '180x180',
        type: 'image/png'
      }
    ]
  }
}
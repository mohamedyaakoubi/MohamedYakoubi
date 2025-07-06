const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Add explicit permanent redirects
  async redirects() {
    return [
      // Redirect non-www to www domain
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'mohamedyaakoubi.live',
          },
        ],
        destination: 'https://www.mohamedyaakoubi.live/:path*',
        permanent: true,
      },
      // Root path redirects to /en (after www redirect is applied)
      {
        source: '/',
        destination: '/en',
        permanent: true, // 301 redirect for SEO
      },
      {
        source: '/experience',
        destination: '/en/experience',
        permanent: true,
      },
      {
        source: '/projects',
        destination: '/en/projects',
        permanent: true,
      },
      {
        source: '/services',
        destination: '/en/services',
        permanent: true,
      },
      {
        source: '/contact',
        destination: '/en/contact',
        permanent: true,
      }
    ]
  },
  
  // Your existing config...
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  poweredByHeader: false,
  reactStrictMode: true,
  
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hebbkx1anhila5yf.public.blob.vercel-storage.com',
      },
      {
        protocol: 'https',
        hostname: 'api.github.com',
      },
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'github.com',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'user-images.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'repository-images.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'img.buymeacoffee.com',
      },
      // Add both www and non-www domains for images
      {
        protocol: 'https',
        hostname: 'www.mohamedyaakoubi.live',
      },
      {
        protocol: 'https',
        hostname: 'mohamedyaakoubi.live',
      },
    ],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  serverExternalPackages: [], 
  outputFileTracingRoot: process.cwd(),
  
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['react-icons', 'framer-motion'],
    webpackBuildWorker: true,
    optimizeServerReact: true,
  }
};

module.exports = withBundleAnalyzer(nextConfig);
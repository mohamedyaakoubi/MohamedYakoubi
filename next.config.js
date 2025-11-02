const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove the root redirect - let middleware handle it
  async redirects() {
    return [
      // Keep non-www to www domain redirect
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
      // Remove the root '/' redirect - middleware will handle this
      // Keep other path redirects
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
  },

  // Add cache control headers to force fresh content
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, must-revalidate',
          },
        ],
      },
      {
        source: '/service-worker.js',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, must-revalidate',
          },
          {
            key: 'Service-Worker-Allowed',
            value: '/',
          },
        ],
      },
      // Static assets can be cached longer
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

module.exports = withBundleAnalyzer(nextConfig);
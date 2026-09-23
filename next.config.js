const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // Keep non-www to www domain redirect
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'mohamedyaakoubi.com',
          },
        ],
        destination: 'https://www.mohamedyaakoubi.com/:path*',
        permanent: true,
      },
      // The root '/' → '/en' redirect lives in src/app/page.tsx (permanentRedirect).
      // Legacy locale-less paths:
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
      },
      // Old SheetDiff route redirects (legacy name → old location → new location)
      {
        source: '/transcript-qa-diff-engine',
        destination: '/en/sheetdiff',
        permanent: true,
      },
      {
        source: '/privacy-policy/transcript-qa',
        destination: '/en/sheetdiff/privacy-policy',
        permanent: true,
      },
      {
        source: '/terms-of-service/transcript-qa',
        destination: '/en/sheetdiff/terms-of-service',
        permanent: true,
      },
      // SheetDiff old routes → new routes (301)
      {
        source: '/sheetdiff',
        destination: '/en/sheetdiff',
        permanent: true,
      },
      {
        source: '/sheetdiff/pricing',
        destination: '/en/sheetdiff/pricing',
        permanent: true,
      },
      {
        source: '/privacy-policy/sheetdiff',
        destination: '/en/sheetdiff/privacy-policy',
        permanent: true,
      },
      {
        source: '/terms-of-service/sheetdiff',
        destination: '/en/sheetdiff/terms-of-service',
        permanent: true,
      },

      // Locale-less URLs for routes that used to rely on a middleware.ts that Next.js
      // never compiled (it sat at the repo root while the App Router lives in src/app;
      // it has since been removed). Without these rules the paths below hard-404, and the
      // two /sheetdiff legal paths were worse: [locale] matched the literal "sheetdiff",
      // serving the PORTFOLIO legal pages with 200 instead of SheetDiff's.
      {
        source: '/blog',
        destination: '/en/blog',
        permanent: true,
      },
      {
        source: '/blog/:slug',
        destination: '/en/blog/:slug',
        permanent: true,
      },
      {
        source: '/privacy-policy',
        destination: '/en/privacy-policy',
        permanent: true,
      },
      {
        source: '/terms-of-service',
        destination: '/en/terms-of-service',
        permanent: true,
      },
      {
        source: '/projects/:project(potential|documed|internationalskills)',
        destination: '/en/projects/:project',
        permanent: true,
      },
      {
        source: '/sheetdiff/privacy-policy',
        destination: '/en/sheetdiff/privacy-policy',
        permanent: true,
      },
      {
        source: '/sheetdiff/terms-of-service',
        destination: '/en/sheetdiff/terms-of-service',
        permanent: true,
      },
      {
        source: '/sheetdiff/api-docs',
        destination: '/en/sheetdiff/api-docs',
        permanent: true,
      },
      {
        source: '/sheetdiff/api-docs/:page(parameters|diff-statuses|demo|playground|engine-precision|privacy-policy|terms-of-service)',
        destination: '/en/sheetdiff/api-docs/:page',
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
        hostname: 'i.ytimg.com',
      },
      {
        protocol: 'https',
        hostname: 'www.mohamedyaakoubi.com',
      },
      {
        protocol: 'https',
        hostname: 'mohamedyaakoubi.com',
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
    optimizePackageImports: ['react-icons', 'framer-motion', 'lucide-react', 'country-flag-icons'],
    webpackBuildWorker: true,
    optimizeServerReact: true,
  },

  // Add cache control and security headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, must-revalidate',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
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
      {
        source: '/automated_workflows_case_studies.pdf',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex, nofollow, noarchive, nosnippet',
          },
        ],
      },
      {
        source: '/ai_coding_agents_case_studies.pdf',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex, nofollow, noarchive, nosnippet',
          },
        ],
      },
      {
        source: '/Mohamed__Yaakoubi.pdf',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex, nofollow, noarchive, nosnippet',
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
        source: '/companies/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=2592000, stale-while-revalidate=86400',
          },
        ],
      },
      {
        source: '/projects/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=2592000, stale-while-revalidate=86400',
          },
        ],
      },
      {
        source: '/:file(hero-light\\.webp|hero-dark\\.webp|profile\\.jpg|sheetdiff-logo\\.png|mohamed-yaakoubi\\.jpg|mohamed-yaakoubi-square\\.jpg|DocuMed\\.webp|NotYet\\.webp|Potential\\.webp)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=2592000, stale-while-revalidate=86400',
          },
        ],
      },
    ];
  },
};

module.exports = withBundleAnalyzer(nextConfig);
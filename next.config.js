const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Compiler options
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Enable React optimization features
  reactStrictMode: true,
  
  // Rewrites for API routes
  async rewrites() {
    return [
      {
        source: '/api/github/:path*',
        destination: '/api/github/:path*'
      },
      {
        source: '/api/coffee-button',
        destination: '/api/coffee-button'
      }
    ];
  },
  
  // Image optimization config
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
        hostname: 'img.buymeacoffee.com',
      },
    ],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    formats: ['image/webp'],
    minimumCacheTTL: 31536000, // 1 year
  },
  
  // Root level options
  serverExternalPackages: [], 
  outputFileTracingRoot: process.cwd(),
  
  // Updated experimental options - removed canary-only features
  experimental: {
    // Replace critters with Next.js built-in CSS optimization
    optimizeCss: true,
    optimizePackageImports: ['react-icons', 'framer-motion'],
    // Removed: ppr, taint (these are canary features)
    webpackBuildWorker: true, // Speed up builds
  }
};

module.exports = withBundleAnalyzer(nextConfig);
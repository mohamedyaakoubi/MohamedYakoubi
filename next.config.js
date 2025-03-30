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
      },
      {
        source: '/api/chat',
        destination: '/api/chat'
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
    ],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // CHANGE THIS LINE - only these two formats are supported
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000, // 1 year
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    unoptimized: process.env.NODE_ENV === 'development', // Only optimize in production
  },
  
  // Root level options
  serverExternalPackages: [], 
  outputFileTracingRoot: process.cwd(),
  
  // Updated experimental options
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['react-icons', 'framer-motion'],
    webpackBuildWorker: true, // Speed up builds
  }
};

module.exports = withBundleAnalyzer(nextConfig);
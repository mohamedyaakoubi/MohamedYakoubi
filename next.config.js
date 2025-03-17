/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        // Define headers for all paths
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: `
              default-src 'self';
              script-src 'self' 'unsafe-inline' 'unsafe-eval';
              style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
              img-src 'self' data: blob: https://hebbkx1anhila5yf.public.blob.vercel-storage.com https://api.github.com https://img.buymeacoffee.com;
              font-src 'self' https://fonts.gstatic.com;
              connect-src 'self' https://api.mistral.ai https://api.github.com;
              frame-src 'self';
              object-src 'none';
            `.replace(/\s+/g, ' ').trim()
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          }
        ]
      }
    ];
  },
  
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
  
  images: {
    domains: [
      'hebbkx1anhila5yf.public.blob.vercel-storage.com', 
      'api.github.com', 
      'img.buymeacoffee.com'
    ],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

module.exports = nextConfig;
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove the headers section to avoid conflicts with middleware
  
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
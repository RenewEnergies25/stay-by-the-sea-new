/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,

  // Keep OG static to avoid runtime issues
  async rewrites() {
    return [{ source: '/api/og', destination: '/og.png' }];
  },

  async headers() {
    // Don't apply CSP in development to avoid conflicts with Bolt's preview/HMR infrastructure
    if (process.env.NODE_ENV !== 'production') {
      return [];
    }

    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "frame-src 'self' https://login.smoobu.com https://booking.smoobu.com https://*.smoobu.com",
              "child-src 'self' https://login.smoobu.com https://booking.smoobu.com https://*.smoobu.com",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' data: blob: https://login.smoobu.com https://booking.smoobu.com https://*.smoobu.com 'wasm-unsafe-eval'",
              "style-src 'self' 'unsafe-inline' https://login.smoobu.com https://booking.smoobu.com https://*.smoobu.com https://fonts.googleapis.com https://unpkg.com",
              "img-src 'self' data: blob: https://login.smoobu.com https://booking.smoobu.com https://*.smoobu.com https://images.pexels.com",
              "font-src 'self' data: https://login.smoobu.com https://booking.smoobu.com https://*.smoobu.com https://fonts.gstatic.com",
              "connect-src 'self' https://login.smoobu.com https://booking.smoobu.com https://*.smoobu.com ws: wss:",
              "media-src 'self'",
              "object-src 'none'",
              "base-uri 'self'",
              "worker-src 'self' blob: data:",
            ].join('; '),
          },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          { key: 'TDM-Reservation', value: '0' },
        ],
      },
    ];
  },

  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        pathname: '/**',
      },
    ],
  },

  eslint: {
    ignoreDuringBuilds: false,
  },
};

module.exports = nextConfig;
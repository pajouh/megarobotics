import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/images/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
        ],
      },
      {
        source: '/feed.xml',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/rss+xml; charset=utf-8',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, s-maxage=3600',
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'megarobotics.de' }],
        destination: 'https://www.megarobotics.de/:path*',
        permanent: true,
      },
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
      {
        source: '/blog/:slug',
        destination: '/articles/:slug',
        permanent: true,
      },
      {
        source: '/news/:slug',
        destination: '/articles/:slug',
        permanent: true,
      },
      // Legacy productCategory routes — redirect to the unified product family system
      {
        source: '/products/category/humanoid-legged-robots',
        destination: '/products/categories/robot-platforms',
        permanent: true,
      },
      {
        source: '/products/category/industrial-cobots',
        destination: '/products/categories/robot-platforms',
        permanent: true,
      },
      {
        source: '/products/category/warehouse-logistics',
        destination: '/products/categories/robot-platforms',
        permanent: true,
      },
      {
        source: '/products/category/drones-aerial',
        destination: '/products/categories/robot-platforms',
        permanent: true,
      },
      {
        source: '/products/category/service-robots',
        destination: '/products/categories/service-cleaning-facility-robots',
        permanent: true,
      },
      // Catch-all for any other /products/category/... route (incl. /de variant)
      {
        source: '/products/category/:slug',
        destination: '/products',
        permanent: true,
      },
      {
        source: '/:locale(en|de)/products/category/:slug',
        destination: '/:locale/products',
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);

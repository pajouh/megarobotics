import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  images: {
    // Bypass Vercel's metered image optimizer entirely: every image already
    // comes from cdn.sanity.io, which resizes and format-negotiates for free.
    // See src/lib/sanity-image-loader.ts for the full rationale.
    loader: 'custom',
    loaderFile: './src/lib/sanity-image-loader.ts',
    // Unused while the custom loader is active (Next only validates these for
    // its built-in optimizer), kept so reverting `loader` above still works.
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/images/**',
      },
    ],
    // Next's default deviceSizes top out at 3840, so every srcset advertised a
    // 4K candidate that could only upscale our Sanity sources. The loader now
    // also caps each candidate at the authored width, so the remaining large
    // entries collapse to the authored URL rather than fetching anything wider.
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
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

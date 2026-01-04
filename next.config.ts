import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/images/**',
      },
    ],
  },
  // Suppress hydration warnings for Sanity Studio
  reactStrictMode: true,
  // Enable static exports if needed
  // output: 'export',
};

export default nextConfig;

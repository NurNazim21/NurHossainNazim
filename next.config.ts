import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  // do not advertise the framework in responses
  poweredByHeader: false,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;

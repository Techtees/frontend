import type { NextConfig } from 'next';
import { env } from '@/env';

const getHostnameFromUrl = (url: string): string => {
  try {
    return new URL(url).hostname;
  } catch {
    return url.replace(/^https?:\/\//, '');
  }
};

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: getHostnameFromUrl(env.HOST_URL || ''),
        port: '',
        pathname: '**'
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '**'
      },
      {
        protocol: 'https',
        hostname: getHostnameFromUrl(env.NEXT_PUBLIC_S3_PUB_LAB_ACCESS_URL || ''),
        pathname: '/**'
      }
    ]
  }
};

export default nextConfig;

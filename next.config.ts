import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
     remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.tmdb.org',
        port: '',
        pathname: "/t/p/**", // allow all movie poster paths
      }
    ]
  },
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost']
    }
  }
}
export default nextConfig;
// @ts-check
 
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.tmdb.org",
        pathname: "/t/p/**", // allow all movie poster paths
      },
    ],
  },
};

export default nextConfig;

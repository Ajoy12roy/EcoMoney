import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com', // Needed for your uploaded profile pics
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com', // Used in your UI designs
      },
      {
        protocol: 'https',
        hostname: 'placehold.co', // Used as your fallback image
      },
    ],
  },
};

export default nextConfig;
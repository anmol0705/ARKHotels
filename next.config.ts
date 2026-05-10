import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/about", destination: "/", permanent: true },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
    qualities: [70, 80, 90],
    formats: ["image/avif", "image/webp"],
  },
  poweredByHeader: false,
  compress: true,
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
    ],
  },
  allowedDevOrigins: ["192.168.0.101", "192.168.0.102"],
};

export default nextConfig;

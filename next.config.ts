import type { NextConfig } from "next";
import os from "os";

// Get all local IPv4 addresses to automatically allow them in dev mode
const localIps = Object.values(os.networkInterfaces())
  .flatMap((interfaces) => interfaces ?? [])
  .filter((iface) => iface.family === "IPv4" && !iface.internal)
  .map((iface) => iface.address);

const nextConfig: NextConfig = {
  images: {
    qualities: [25, 50, 75, 100],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
      },
    ],
  },
  allowedDevOrigins: localIps,
};

export default nextConfig;

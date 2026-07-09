import type { NextConfig } from "next";
import os from "os";

// Get all local IPv4 addresses to automatically allow them in dev mode
const localIps = Object.values(os.networkInterfaces())
  .flatMap((interfaces) => interfaces ?? [])
  .filter((iface) => iface.family === "IPv4" && !iface.internal)
  .map((iface) => iface.address);

const securityHeaders = [
  // Prevent the page from being embedded in a frame (clickjacking protection)
  { key: "X-Frame-Options", value: "DENY" },
  // Prevent browsers from MIME-sniffing a response away from the declared content-type
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Control how much referrer information is sent with requests
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Restrict access to browser features not used by this application
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
  },
  // Enforce HTTPS for 2 years; preload-safe for Vercel (always HTTPS)
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        // Apply to every route
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
  images: {
    qualities: [25, 50, 80, 100],
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

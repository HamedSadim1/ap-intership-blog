import type { NextConfig } from "next";

/**
 * Next.js Configuration
 *
 * Next.js 15/16 Best Practices:
 * - Turbopack: Faster development builds (enabled by default in dev)
 * - transpilePackages: Required for Sanity packages
 * - experimental.taint: Enhanced security for server-only code
 * - Image optimization: Remote patterns for CDN images
 */
const nextConfig: NextConfig = {
  // Transpile Sanity packages for proper ESM support
  transpilePackages: ["next-sanity", "@sanity/vision"],

  // Experimental features
  experimental: {
    // Taint API: Prevents server-only values from being sent to client
    taint: true,
  },

  // Image optimization configuration
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
        pathname: "/images/**",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: "",
        pathname: "/u/**",
      },
    ],
    // Enable image optimization
    formats: ["image/avif", "image/webp"],
  },

  // Logging
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* other config options */
  experimental: {
    turbo: {
      // Turbopack is disabled by default
    },
  },
};

export default nextConfig;

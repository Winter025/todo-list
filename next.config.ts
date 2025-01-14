import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizeCss: true,
  },
  resourceHints: false,
  reactStrictMode: false,
};

export default nextConfig;

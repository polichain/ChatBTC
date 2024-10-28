import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
  },
  // Add any other configuration options here
};

export default nextConfig;

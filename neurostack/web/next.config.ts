import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    // Explicit root to avoid lockfile root detection warning
    root: __dirname,
  },
};

export default nextConfig;


import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: [
    "@manoxen/shared-types",
    "@manoxen/auth-client",
    "@manoxen/iam-core"
  ],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", 
      },
    ],
  },
  experimental: {
    turbo: {},
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
};

export default nextConfig;

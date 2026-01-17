import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: [
    "@manoxen/shared-types",
    "@manoxen/catalog",
    "@manoxen/sales",
    "@manoxen/pos",
    "@manoxen/erp",
    "@manoxen/hrm"
  ],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", 
      },
    ],
  },
};

export default nextConfig;

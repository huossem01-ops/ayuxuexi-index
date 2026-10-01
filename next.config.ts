import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  assetPrefix: "/_seo",
  poweredByHeader: false,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;

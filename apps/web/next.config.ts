import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:4000/api/:path*",
      },
      {
        source: "/assets/:path*",
        destination: "http://localhost:4000/assets/:path*",
      },
    ];
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/Portaflio_Jose_Picado",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;

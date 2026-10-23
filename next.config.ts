import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    cpus: 1,
    useTypeScriptCli: false,
  },
};
export default nextConfig;

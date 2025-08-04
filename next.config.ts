import withPWA from "next-pwa";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // オプション
};

const pwaConfig = withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
});

export default pwaConfig(nextConfig);

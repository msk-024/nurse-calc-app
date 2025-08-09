import withPWA from "next-pwa";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // オプション
};

export default withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable:process.env.NODE_ENV === "development", // dev時は無効化
})(nextConfig);

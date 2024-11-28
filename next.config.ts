import type { NextConfig } from "next";

const withPWA = require("next-pwa")({
  dest: 'public',
})

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  }
};

module.exports = withPWA(nextConfig)
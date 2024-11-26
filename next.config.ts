import type { NextConfig } from "next";
import nextPWA from 'next-pwa'

const withPWA = nextPWA({
  dest: 'public'
})

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [{
      hostname: "i.scdn.co"
    }, { hostname: "e-cdns-images.dzcdn.net" }],
  },
};

module.exports = nextConfig;

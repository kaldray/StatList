/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: "standalone",
  images: {
    domains: ["i.scdn.co", "e-cdns-images.dzcdn.net"],
  },
};

module.exports = nextConfig;

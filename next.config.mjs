/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
   experimental: {
    serverActions: {
      bodySizeLimit: "6mb",
    },
  },
  images: {
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "shop.uncrate.com",
        pathname: "**"
      },
      {
        protocol: "http",
        hostname: "shop.uncrate.com",
        pathname: "**"
      },
      {
        protocol: "https",
        hostname: "assets-prd.ignimgs.com",
        pathname: "**"
      },
      {
        protocol: "https",
        hostname: "**",
        pathname: "**"
      }
    ]
  }
};

export default nextConfig;

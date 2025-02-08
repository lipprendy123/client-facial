/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
      remotePatterns: [
        {
          protocol: "http",
          hostname: "localhost",
          port: "4000",
          pathname: "/public/images/**",
        },
      ],
      domains: ["localhost"], 
    },
};

export default nextConfig;
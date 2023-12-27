// next.config.js
const nextConfig = {
  reactStrictMode: true,
  env: {
    API_URL: process.env.API_URL,
  },
  images: {
    domains: ["img.freepik.com", "veterinaire-tour-hassan.com"],
    unoptimized: true,
  },
  trailingSlash: false,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.node/,
      use: "raw-loader",
    });
    return config;
  },
};
module.exports = nextConfig;

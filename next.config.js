// next.config.js
const nextConfig = {
  reactStrictMode: true,

  images: {
    domains: ["img.freepik.com", "veterinaire-tour-hassan.com"],
    unoptimized: true
  
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.node/,
      use: "raw-loader",
    });
return config;
  },
};
module.exports = nextConfig;
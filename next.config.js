// next.config.js
const nextConfig = {
  reactStrictMode: true,

  images: {
    domains: ["img.freepik.com", "veterinaire-tour-hassan.com"],
    unoptimized: true
  },
  i18n: {
    locales: ["en", "ar"],
    defaultLocale: "ar", localeDetection: false
  },
};
  
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


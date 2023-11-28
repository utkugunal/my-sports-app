/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // images: {
  //   domains: [
  //     "example-apis.vercel.app",
  //     "lh3.googleusercontent.com",
  //     "assets-global.website-files.com",
  //     "www.clever-fit.com",
  //     "www.berlinerbaeder.de",
  //     "beachmitte.de",
  //   ],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
        port: "",
      },
    ],
  },

  compiler: {
    styledComponents: true,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};

module.exports = nextConfig;

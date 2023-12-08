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

  //To be able to use the images from different sources on the Internet, first I had to add related domains (hostnames) into this file
  // And then I proceeded with the following solution allowing any domain to be used

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
        port: "",
      },
      {
        protocol: "http",
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

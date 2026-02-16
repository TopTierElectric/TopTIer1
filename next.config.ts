import type { NextConfig } from "next";

const config: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    // Add remotePatterns if you load images from a CDN
    // remotePatterns: [{ protocol: 'https', hostname: 'cdn.example.com' }],
  },

  async headers() {
    return [
      // Cache static images in /public with a long max-age (adjust if you overwrite filenames)
      {
        source: "/:all*(png|jpg|jpeg|gif|webp|avif|svg)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default config;

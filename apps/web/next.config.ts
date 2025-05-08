/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure MDX handling
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],

  // Enable static file serving from packages/mdx-content/media
  async rewrites() {
    return [
      {
        source: "/media/:slug/:filename",
        destination: "/api/media/:slug/:filename",
      },
    ];
  },

  // Updated image configuration using remotePatterns instead of domains
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ytimg.com",
      },
      {
        protocol: "https",
        hostname: "img.youtube.com",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },
};

module.exports = nextConfig;

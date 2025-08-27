import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/mods/stardewvalley/:slug*",
        destination: "/mods/stardew-valley/:slug*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

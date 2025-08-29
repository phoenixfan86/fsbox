import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/mods/stardewvalley/:slug*",
        destination: "/mods/stardew-valley/:slug*",
        permanent: true,
      },
      {
        source: "/page/1",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

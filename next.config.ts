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
  images:{
    domains:[
      'media.forgecdn.net',
      'staticdelivery.nexusmods.com',
      'bisecthosting.com',
      'i.imgur.com',
      'docs.darkhax.net',
      'github.com',
      'cdn.modrinth.com',
      'gitlab.com',
      'pixelmonmod.com',
      'chocolateminecraft.com',
      'puu.sh',
      'raw.githubusercontent.com',
      'minecrafter.in.ua',
      'i.ibb.co',
      'static.wikia.nocookie.net',
      'blogger.googleusercontent.com',
      'playcraft.com.ua'
    ]
  }
};

export default nextConfig;

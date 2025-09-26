import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers(){
    return[
      {
        source: "/:path*.xml",
        headers: [
          {
            key: "Content-Type",
            value: "application/xml",
          },
        ],
      },
      {
        source: "/robots.txt",
        headers: [
          {
            key: "Content-Type",
            value: "text/plain",
          },
        ],
      },
    ]
  },

  async redirects() {
    return [
      {
        source: "/page/1",
        destination: "/",
        permanent: true,
      },
      {
        source:"/2025/05/shs-wild-animals-stardew-valley-1615.html",
        destination: "/mods/stardew-valley/shs-wild-animals",
        permanent: true,
      },
      {
        source:"/p/minecraft.html",
        destination: "/mods/minecraft",
        permanent: true,
      },
      {
        source:"/2025/05/scholar-minecraft-1211.html",
        destination: "/mods/minecraft/scholar",
        permanent: true,
      },
      {
        source:"/2025/05/enchantment-descriptions-minecraft-1211.html",
        destination: "/mods/minecraft/enchantment-descriptions",
        permanent: true,
      },
      {
        source:"/2025/05/all-mods-10-atm10-minecraft-1211.html",
        destination: "mods/minecraft/all-the-mods-10",
        permanent: true,
      },
    ];
  },
  images:{
    unoptimized: true,
    domains:[
      'media.forgecdn.net',
      'staticdelivery.nexusmods.com',
      'bisecthosting.com',
      'imgur.com',
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
      'playcraft.com.ua',
      'i.blamejared.com'
    ]
  }
};

export default nextConfig;

"use client";

import Link from "next/link";

export type GameItem = {
  slug: string;
  name: string
}

type Props = {
  games: GameItem[];
  variant?: "text" | "logos";
  className?: string;
}

const LOGO_MAP: Record<string, { src: string; alt: string }> = {
  "minecraft": { src: "img/logos/minecraft-logo.jpg", alt: "Minecraft" },
  "stardew-valley": { src: "img/logos/stardew-valley-logo.jpg", alt: "Stardew Valley" },
  "terraria": { src: "img/logos/terraria-logo.jpg", alt: "Terraria" },
  "ksp": { src: "img/logos/ksp-logo.png", alt: "KSP" },
  "wow": { src: "img/logos/wow-logo.png", alt: "WoW" },
};


const TopNav = ({ games, variant = "text", className = "" }: Props) => {

  return (
    <nav className={`w-full flex gap-2 items-center ${className}`}>
      <Link href="/" className="text-[11px] uppercase">
        Home
      </Link>
      {games.map((game) => {
        const logo = LOGO_MAP[game.slug.toLowerCase()];
        return (
          <Link
            key={game.slug}
            href={`/mods/${game.slug}`}
            className="flex items-center"
            aria-label={game.name}
          >
            {variant === "logos" && logo ? (
              <img
                src={logo.src}
                alt={logo.alt}
                className="w-[100px] "
                loading="lazy"
              />
            ) : (
              <span className="text-[11px] uppercase">{game.name}</span>
            )}
          </Link>
        );
      })}
    </nav>
  );
}
export default TopNav;
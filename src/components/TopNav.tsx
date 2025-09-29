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
  "minecraft": { src: "/img/logos/minecraft-logo.jpg", alt: "Minecraft" },
  "stardew-valley": { src: "/img/logos/stardew-valley-logo.jpg", alt: "Stardew Valley" },
  "terraria": { src: "/img/logos/terraria-logo.jpg", alt: "Terraria" },
  "teardown": { src: "/img/logos/teardown-logo.png", alt: "Teardown" },
  "pz": { src: "/img/logos/project-zomboid-logo.png", alt: "Project Zomboid" },
  "ksp": { src: "/img/logos/ksp-logo.png", alt: "KSP" },
  "wow": { src: "/img/logos/wow-logo.png", alt: "WoW" },
};


const TopNav = ({ games, variant = "text", className = "" }: Props) => {

  return (
    <nav className={`w-full flex gap-2 items-center ${className}`}>
      {variant === "text" && (
        <Link href="/" className="text-[8px] md:text-[11px] uppercase">
          Головна
        </Link>
      )}
      <div className={`flex ${variant === "logos" ? "flex-col" : ""} gap-1 md:gap-2 mx-1 md:mx-3`}>
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
                  width={100}
                  height={100}
                />
              ) : (
                <span className="text-[8px] md:text-[11px] uppercase">{game.name}</span>
              )}
            </Link>
          );
        })}
      </div>
      {variant === "text" && (
        <Link href="/instruction" className="text-[8px] md:text-[11px] uppercase">
          Інструкції
        </Link>
      )}
      {variant === "text" && (
        <Link href="/game-servers" className="text-[8px] md:text-[11px] uppercase">
          Сервери для Ігор
        </Link>
      )}
    </nav>
  );
}
export default TopNav;
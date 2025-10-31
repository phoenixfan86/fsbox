"use client";

import Link from "next/link";
import { useState } from "react";

export type GameItem = {
  slug: string;
  name: string
}

type Props = {
  games: GameItem[];
  variant?: "text" | "logos";
  position?: "header" | "footer" | "sidebar";
  className?: string;
}

const LOGO_MAP: Record<string, { src: string; alt: string }> = {
  "minecraft": { src: "/img/logos/minecraft-logo.webp", alt: "Minecraft" },
  "stardew-valley": { src: "/img/logos/stardew-valley-logo.webp", alt: "Stardew Valley" },
  "terraria": { src: "/img/logos/terraria-logo.webp", alt: "Terraria" },
  "teardown": { src: "/img/logos/teardown-logo.webp", alt: "Teardown" },
  "pz": { src: "/img/logos/project-zomboid-logo.webp", alt: "Project Zomboid" },
  "star-craft-2": { src: "/img/logos/sc2-logo.webp", alt: "Star Craft 2" },
  "ksp": { src: "/img/logos/ksp-logo.webp", alt: "KSP" },
  "wow": { src: "/img/logos/wow-logo.webp", alt: "WoW" },
};

const Nav = ({ games, variant = "text", position = "header", className = "" }: Props) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <nav className={`w-full flex justify-center md:justify-start ${className}`}>
      <div className={`relative w-full flex gap-1 md:gap-2 items-center ${position === "footer" ? "text-[8px] justify-center" : "text-[12px] justify-start"} leading-5 md:leading-6 uppercase mx-1 md:mx-3`}>
        {variant === "text" && (
          <Link href="/">
            Головна
          </Link>
        )}
        <div
          className={`
          burger md:hidden 
          ${position === "footer" ? "hidden" : ""}
          ${menuOpen ? " open" : ""}
          `}
          onClick={toggleMenu}
        >
          <span className=""></span>
        </div>
        <div className="relative flex items-center">
          <ul
            className={`
                ${position === "header" ? "md:flex menu-header" : ""}
                ${position === "footer" ? "menu-footer" : ""}
                ${position === "sidebar" ? "menu-sidebar" : ""}
                ${menuOpen ? "flex flex-col items-start" : "hidden"}`}
          >
            <span className="text-amber-100">Моди:</span>
            {games.map((game) => {
              const logo = LOGO_MAP[game.slug.toLowerCase()];
              return (
                <li key={game.slug}>
                  <Link
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
                        loading="lazy"
                      />
                    ) : (
                      <span>{game.name}</span>
                    )}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
        {variant === "text" && (
          <Link href="/instruction">
            Інструкції
          </Link>
        )}
        {variant === "text" && (
          <Link href="/game-servers">
            Сервери для Ігор
          </Link>
        )}
      </div>
    </nav>
  );
}
export default Nav;
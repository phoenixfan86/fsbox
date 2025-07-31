"use client";

import Link from "next/link";

type Props = {
  games: {
    slug: string;
    name: string
  }[];
};

const TopNav = ({ games }: Props) => {

  return (
    <nav className="w-full flex   gap-2 items-center  mx-6">
      <a href="/" className=" text-[11px] uppercase">Home</a>
      {games.map((game) => (
        <Link key={game.slug} href={`/mods/${game.slug}`} className=" text-[11px] uppercase ">
          {game.name}
        </Link>
      ))}
    </nav>
  );
}
export default TopNav;
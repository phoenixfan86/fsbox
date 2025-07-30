"use client";

import Link from "next/link";

type Props = {
  games: string[];
};

const TopNav = ({ games }: Props) => {
  return (
    <nav className="">
      {games.map((game) => (
        <Link key={game} href={`/mods/${game}`} className="hover:underline">
          {game}
        </Link>
      ))}
    </nav>
  );
}
export default TopNav;
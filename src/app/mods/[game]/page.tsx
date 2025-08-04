
import Link from "next/link";
import { Metadata } from "next";
import { ModData } from "@/types/ModsData";
import { getAllGames, getSortedModsData, getModData } from "@/lib/mods";
import { stripMarkdown } from "@/lib/stripMarkDown";

type GameParams = Promise<{ game: string }>;

export async function generateMetadata({
  params
}: {
  params: GameParams
}): Promise<Metadata> {
  const { game } = await params;
  const canonical = `https://fsbox.pp.ua/mods/${game}`;

  // Capitalize first letter of game name for title
  const gameTitle = game.charAt(0).toUpperCase() + game.slice(1);
  const title = `Моди для ${gameTitle}`;
  const description = `Моди для ${game}`;

  return {
    alternates: { canonical },
    title,
    description,
  };
}


export function generateStaticParams() {
  const games = getAllGames();
  return games.map((game) => ({ game: game.slug }));
}

export default async function GameModsPage({ params }: { params: Promise<{ game: string }> }) {
  const { game } = await params;
  const allMods = getSortedModsData();
  const gameMods = allMods.filter(mod => mod.gameSlug === game);

  if (gameMods.length === 0) {
    return <p>Немає модів для цієї гри.</p>;
  }

  const gameName = gameMods[0].game;

  return (
    <main className="md:w-[80%] py-[15px] px-[20px] md:py-[25px] md:px-[30px]">
      <h1 className="text-xl font-bold mb-6">
        Моди для {gameName}
      </h1>
      <ul className="space-y-8">
        {gameMods.map((mod) => (
          <li key={mod.slug} className="p-4 rounded shadow">
            <Link href={`/mods/${mod.gameSlug}/${mod.slug}`}>
              <div className="flex flex-col md:flex-row items-center gap-3 md:gap-4 cursor-pointer hover:opacity-90 transition">
                <img
                  src={mod.image_first}
                  alt={mod.title}
                  className="postImg hover:!scale-none object-cover rounded"
                />
                <div className="flex gap-5 flex-col justify-between">
                  <div>
                    <h2 className="text-xl font-semibold">{mod.title} для {mod.game}</h2>
                    <div className="flex items-center text-xs text-gray-500 gap-1">
                      <span className="material-symbols-outlined text-gray-400" style={{ fontSize: 16 }}>
                        calendar_month
                      </span>
                      <span>{mod.date}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 mr-10">
                    {stripMarkdown(mod.content).slice(0, 100)}...
                  </p>
                  <div>
                    <div className="flex gap-1.5 flex-wrap mt-1 md:mt-2 space-x-0  md:space-x-2">
                      {mod.tags?.map((tag) => (
                        <span key={tag} className="text-xs bg-gray-200 hover:bg-blue-500 hover:text-white duration-300 px-2 py-1 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex justify-between mt-4">
                      <span className="text-xs text-gray-500 block">Автор: {mod.author}</span>
                      <span className="text-xs text-gray-500 block">для: {mod.game}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}

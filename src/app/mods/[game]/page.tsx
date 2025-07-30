
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllGames, getSortedModsData } from "@/lib/mods";
import { stripMarkdown } from "@/lib/stripMarkDown";


export function generateStaticParams() {
  const games = getAllGames();
  return games.map((game) => ({ game }));
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
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-6">
        Моди для {gameName}
      </h1>
      <ul className="space-y-8">
        {gameMods.map((mod) => (
          <li key={mod.slug} className="p-4 rounded shadow">
            <Link href={`/mods/${mod.gameSlug}/${mod.slug}`}>
              <div className="flex gap-4 cursor-pointer hover:opacity-90 transition">
                <img
                  src={mod.image_first}
                  alt={mod.title}
                  className="!w-100 postImg hover:!scale-none object-cover rounded mb-3"
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
                    <div className="mt-2 space-x-2">
                      {mod.tags?.map((tag) => (
                        <span key={tag} className="text-xs bg-gray-200 hover:bg-blue-500 hover:text-white duration-300 px-2 py-1 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="text-xs text-gray-500 block">Автор: {mod.author}</span>
                    <span className="text-xs text-gray-500 block">Гра: {mod.game}</span>
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

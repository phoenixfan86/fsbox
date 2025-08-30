
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { getAllGames, getSortedModsData } from "@/lib/mods";
import { stripMarkdown } from "@/lib/stripMarkDown";

type GameParams = Promise<{ game: string }>;

export async function generateMetadata({
  params
}: {
  params: GameParams
}): Promise<Metadata> {
  const { game } = await params;
  const canonical = `https://fsbox.pp.ua/mods/${game}`;

  const gameTitle = game.charAt(0).toUpperCase() + game.slice(1);
  const title = `Збірка модів на ${gameTitle}`;
  const description = `Добірка модів для ${gameTitle}: моди на зброю та броню, моди на техніку і транспорт, моди на біоми, меблі та прикраси. Завантажуйте доповнення для різних версій гри та робіть світ в ${gameTitle} ще цікавішим`;

  return {
    alternates: { canonical },
    title,
    description,
    openGraph: {
      title,
      description,
      url: canonical,
      type: "article",
      siteName: "FSBox",
    }
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
    <section className="md:w-[80%] py-[15px] px-[20px] md:py-[25px] md:px-[30px]">
      <h1 className="text-xl font-bold mb-6">
        Збірка модів на {gameName}
      </h1>
      <p className="mb-5">Популярні моди для {gameName}: моди на зброю та броню, моди на техніку і транспорт, моди на біоми, меблі та прикраси. Завантажуйте доповнення для різних версій гри та робіть світ в {gameName} ще цікавішим.</p>
      <ul className="space-y-8">
        {gameMods.map((mod) => (
          <li key={mod.slug} className="p-4 rounded shadow">
            <div className="flex flex-col md:flex-row items-center gap-3 md:gap-4 hover:opacity-90 transition">
              <Image
                src={mod.image_first}
                alt={mod.title}
                width={300}
                height={100}
                className="postImg hover:!scale-none object-cover rounded"
              />
              <div className="flex gap-5 flex-col justify-between">
                <div>
                  <h2 className="text-xl font-semibold">
                    <Link href={`/mods/${mod.gameSlug}/${mod.slug}`}>
                      {mod.title_ua} для {mod.game} {mod.tags?.[mod.tags.length - 1] ?? ''}
                    </Link>
                  </h2>
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
                </div>
              </div>
            </div>

            <div className="flex justify-between mt-4">
              <span className="text-xs text-gray-500 block">Автор: {mod.author}</span>
              <span className="text-xs text-gray-500 block">
                <a href={mod.game_collection}>для: {mod.game}</a>
              </span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

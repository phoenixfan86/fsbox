// app/game-servers/[game]/page.tsx

import Link from "next/link";
import { Metadata } from "next";
import { ServerData } from "@/types/ServerData";
import { getAllServers, getSortedServerData } from "@/lib/servers";
import { stripMarkdown } from "@/lib/stripMarkDown";

type GameParams = Promise<{ game: string }>;

export async function generateMetadata({
  params
}: {
  params: GameParams
}): Promise<Metadata> {
  const { game } = await params;
  const canonical = `https://fsbox.pp.ua/game-servers/${game}`;

  const gameTitle = game.charAt(0).toUpperCase() + game.slice(1);
  const title = `Сервери для ${gameTitle}`;
  const description = `Підбірка самих кращих серверів з України та усього світу, для ${game}`;

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
  const games = getAllServers();
  return games.map((game) => ({ game: game.slug }));
}

export default async function GameServersPage({ params }: { params: Promise<{ game: string }> }) {
  const { game } = await params;
  const allServers = getSortedServerData();
  const gameServers = allServers.filter(server => server.gameSlug === game);

  if (gameServers.length === 0) {
    return <p>Немає серверів для цієї гри.</p>;
  }

  const gameName = gameServers[0].game;

  return (
    <main className="md:w-[80%] py-[15px] px-[20px] md:py-[25px] md:px-[30px]">
      <h1 className="text-xl font-bold mb-6">
        Сервери для {gameName}
      </h1>
      <ul className="space-y-8">
        {gameServers.map((server) => (
          <li key={server.slug} className="p-4 rounded shadow">
            <Link href={`/game-servers/${server.gameSlug}/${server.slug}`}>
              <div className="flex flex-col md:flex-row items-center gap-3 md:gap-4 cursor-pointer hover:opacity-90 transition">
                <img
                  src={server.server_image}
                  alt={server.title}
                  className="postImg hover:!scale-none object-cover rounded"
                />
                <div className="flex gap-5 flex-col justify-between">
                  <div>
                    <h2 className="text-xl font-semibold">{server.title_ua} для {server.game} {server.tags?.[server.tags.length - 1] ?? ''}</h2>
                    <div className="flex items-center text-xs text-gray-500 gap-1">
                      <span className="material-symbols-outlined text-gray-400" style={{ fontSize: 16 }}>
                        calendar_month
                      </span>
                      <span>{server.date}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 mr-10">
                    {stripMarkdown(server.content).slice(0, 100)}...
                  </p>
                  <div>
                    <div className="flex gap-1.5 flex-wrap mt-1 md:mt-2 space-x-0  md:space-x-2">
                      {server.tags?.map((tag) => (
                        <span key={tag} className="text-xs bg-gray-200 hover:bg-blue-500 hover:text-white duration-300 px-2 py-1 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
            <div className="flex justify-between mt-4">
              <span className="text-xs text-gray-500 block">
                <a href={server.game_collection}>сервер для: {server.game}</a>
              </span>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}

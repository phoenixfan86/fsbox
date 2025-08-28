import { Metadata } from "next";
import Link from "next/link";
import type { ServerData } from "@/types/ServerData";
import { getSortedServerData } from "@/lib/servers";
import { stripMarkdown } from "@/lib/stripMarkDown";

const SERVERS_PER_PAGE = 5;

export const metadata: Metadata = {
  title: "FSbox - сервера для Майнкрафт та для інших ігор",
  description: "Підбірка серверів на Майнкрафт, Українські сервера для Minecraft.",
  alternates: {
    canonical: "https://fsbox.pp.ua/game-servers"
  },
  openGraph: {
    title: "FSbox - сервера для Майнкрафт та для інших ігор",
    description: "Підбірка серверів на Майнкрафт, Українські сервера для Minecraft.",
    url: "https://fsbox.pp.ua/game-servers",
    siteName: "FSBox",
    type: "website",
    images: [
      {
        url: "/img/preview.png",
        width: 1200,
        height: 630,
        alt: "FSBox — кращі моди для ігор",
      },
    ],
  }
};

const GameServers = () => {
  const servers: ServerData[] = getSortedServerData();
  console.log(servers);
  const pageServers = servers.slice(0, SERVERS_PER_PAGE);
  const totalPages = Math.ceil(servers.length / SERVERS_PER_PAGE);

  return (
    <section className="md:w-[80%] py-[15px] px-[20px] md:py-[25px] md:px-[30px] shadow">
      <h1 className="text-xl font-bold mb-6">Нові сервери</h1>
      <p>
        Вибирайте з нашого списку найпопулярніших серверів для улюблених ігор — Minecraft, CS:GO, Rust, GTA та інших.
        Тут ви знайдете активні спільноти, стабільний онлайн і кращі місця для гри з друзями.
      </p>

      <ul className="space-y-4 md:space-y-8">
        {pageServers.map((server) => (
          <li key={server.slug} className="p-0 md:p-4 rounded shadow">
            <Link href={`/game-servers/${server.gameSlug}/${server.slug}`}>
              <div className="flex flex-col md:flex-row items-center gap-3 md:gap-6 md:py-4 cursor-pointer hover:opacity-90 transition">
                <img
                  src={server.server_image}
                  alt={server.title}
                  className="postImg hover:!scale-none object-cover rounded"
                />
                <div className="flex gap-5 flex-col justify-between">
                  <div>
                    <h2 className="text-xl font-semibold">{server.title_ua} для {server.game} {server.game_version}</h2>
                    <div className="flex items-center text-xs text-gray-500 gap-1">
                      <span className="material-symbols-outlined text-gray-400" style={{ fontSize: 16 }}>
                        calendar_month
                      </span>
                      <span>{server.date}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 mr-10">
                    {stripMarkdown(server.content).slice(0, 150)}...
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

      {totalPages > 1 && (
        <div className="mt-8 flex justify-center">
          <Link href={`/page/2`} className="hover:translate-x-2">
            Вперед →
          </Link>
        </div>
      )}
    </section>
  );
}
export default GameServers;
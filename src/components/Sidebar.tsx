import Link from "next/link";
import { getSortedServerData } from "@/lib/servers";
import { getSortedModsData, getAllGames } from "@/lib/mods";
import { pickRandomMods } from "@/lib/randomMods";
import type { ServerData } from "@/types/ServerData";
import type { ModData } from "@/types/ModsData";
import TopNav from "./TopNav";
import Nav from "./Nav";
import OptimizedImage from "@/components/OptimizedImages"

type Props = {
  exclude?: string;
};


const Sidebar = ({ exclude }: Props) => {
  const servers: ServerData[] = getSortedServerData();
  const games = getAllGames();
  const allMods: ModData[] = getSortedModsData();
  const randoms = pickRandomMods(allMods, 3, exclude);

  const uniqueGames = Array.from(
    new Map(servers.map((s) => [s.gameSlug, s])).values()
  );

  if (randoms.length === 0) return null;

  return (
    <aside className="hidden md:w-[20%] md:flex md:gap-5 md:flex-col md:p-[25px] border-l-1 border-(--color-5)">

      <div className="shadow">
        <h4>Моди для:</h4>
        <TopNav games={games} variant="logos" className="items-center flex-col py-5" />
        {/*<Nav games={games} variant="logos" position="sidebar" className="" />*/}
      </div>
      <div className="shadow">
        <h4>Сервери для:</h4>
        <ul>
          {uniqueGames.map((server) => (
            <li key={server.gameSlug}>
              <Link href={`/game-servers/${server.gameSlug}`}>
                {server.game}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="shadow pb-1">
        <Link href={`/articles`} className=" !text-(--primary-color-1)">Статті та новини</Link>
      </div>
      <div className="mt-10">
        <h4>Інші моди:</h4>
        <ul className="space-y-1 py-5">
          {randoms.map((mod) => (
            <li key={mod.slug} className=" p-2 rounded hover:opacity-90 transition hover:shadow">
              <Link href={`/mods/${mod.gameSlug}/${mod.slug}`} className="block">
                <div className="flex gap-3 flex-col items-center">
                  <OptimizedImage
                    src={mod.image_first}
                    alt={`${mod.mod_name} для ${mod.game}`}
                    width={140}
                    className="object-cover rounded"
                  />
                  <div className="">
                    <div className="text-sm text-(--primary-color-1) font-medium">{mod.title_ua}</div>
                    <div className="text-xs text-(--color-1)">{mod.game}</div>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="">
        <h4>Каталоги</h4>
        <ul className="flex flex-col items-center gap-3 mt-4">
          <li>
            <a href="https://www.ontoplist.com/web-development-companies/" target="_blank">
              <img
                src="https://www.ontoplist.com/images/ontoplist32.png?id=68fe91d37dab9"
                alt="Best Web Development Companies - OnToplist.com"
              />
            </a>
          </li>
          <li>
            <a href="https://follow.it/fsbox-game-mods-feed?leanpub">
              <img
                src="/img/follow.png"
                alt="follow me"
                width={120}
              />
            </a>
          </li>
          <li>
            <a href="https://www.wingee.com">
              Top Blog Feeds
            </a>
          </li>
          <li>
            <a href="https://catalog.clubcoua.com">
              <img src="https://catalog.clubcoua.com/images/banner/wcccu.gif" alt="Безкоштовний каталог сайтів" />
            </a>
          </li>
          <li>
            <Link rel="me" href="https://mastodon.social/@fsboxmods">Mastodon</Link>
          </li>
        </ul>
      </div>
    </aside >
  );
}
export default Sidebar;

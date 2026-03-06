import Link from "next/link";
import Nav from "./Nav";
import TopNav from "./TopNav";
import { getAllGames, getSortedModsData } from "@/lib/mods";


const Footer = () => {
  const games = getAllGames()
  const mods = getSortedModsData()
  const totalMods = mods.length

  return (
    <footer className="flex gap-3 flex-col md:flex-row items-center bg-(--bg-2) py-[15px] px-[15px] md:py-[25px] md:px-[30px]">
      <div className="md:min-w-35 flex items-center justify-between px-[10px]">
        <div className="flex flex-col">
          <a href="/" className="group text-3xl uppercase font-bold">
            <span className="text-(--primary-color-1) group-hover:text-white transition-colors duration-600 grayscale-50">FS<span className="text-white group-hover:text-(--primary-color-1) transition-colors duration-600">box</span>
            </span>
          </a>
          <span className="text-xs md:text-sm">Кращі моди для ігор</span>
        </div>

      </div>
      <div className="w-full flex flex-col gap-4 items-center">
        <Nav games={games} position="footer" />
        <div className="flex flex-col items-center mt-6 md:mt-0">
          <span>Каталоги</span>
          <ul className="flex flex-col md:flex-row gap-2">
            <li className="text-xs">
              <a href="https://www.blogarama.com/fashion-blogs/1351624-blog/" title="Blogarama.com - Follow me on Blogarama">Blogarama - Blog Directory</a>
            </li>
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
          <span className="text-[10px] md:text-[12px] my-3">На сайті всього: {totalMods} модів</span>
          <span className="text-xs">2025 Fan</span>
        </div>
      </div>
    </footer>
  );
}
export default Footer;

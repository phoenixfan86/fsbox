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
          <ul>
            <li className="text-xs">
              <a href="http://www.blogarama.com/fashion-blogs/1351624-blog/" title="Blogarama.com - Follow me on Blogarama">Blogarama - Blog Directory</a>
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

import TopNav from "./TopNav";
import { getAllGames, getSortedModsData } from "@/lib/mods";


const Footer = () => {
  const games = getAllGames()
  const mods = getSortedModsData()
  const totalMods = mods.length

  return (
    <footer className="flex gap-3 flex-col md:flex-row items-start md:items-center justify-between bg-(--bg-2) py-[15px] px-[15px] md:py-[25px] md:px-[30px]">
      <div className="w-full md:w-1/2 flex items-center justify-between px-[10px]">
        <div className="flex flex-col">
          <a href="/" className="group text-3xl uppercase font-bold">
            <span className="text-(--primary-color-1) group-hover:text-white transition-colors duration-600 grayscale-50">FS<span className="text-white group-hover:text-(--primary-color-1) transition-colors duration-600">box</span>
            </span>
          </a>
          <span className="text-xs md:text-sm">Кращі моди для ігор</span>
        </div>
        <span className="text-[10px] md:text-[12px]">На сайті всього: {totalMods} модів</span>
      </div>
      <div className="w-full md:w-auto flex gap-4 flex-col items-center md:items-start">
        <TopNav games={games} className="" />
        <span className="text-xs text-center">2025 Fan</span>
      </div>
    </footer>
  );
}
export default Footer;

import TopNav from "./TopNav";
import { getAllGames } from "@/lib/mods";


const Footer = () => {
  const games = getAllGames()

  return (
    <footer className="flex items-center justify-between bg-(--bg-2) py-[15px] px-[20px] md:py-[25px] md:px-[30px]">
      <div className="">
        <a href="/" className="group text-3xl uppercase font-bold">
          <h1 className="text-(--primary-color-1) group-hover:text-white transition-colors duration-600 grayscale-50">FS<span className="text-white group-hover:text-(--primary-color-1) transition-colors duration-600">box</span>
          </h1>
        </a>
        <span className="text-xs md:text-sm">Кращі моди для ігор</span>
      </div>
      <span className="text-xs">2025 Fan</span>
      <div className="">
        <TopNav games={games} />
      </div>
    </footer>
  );
}
export default Footer;
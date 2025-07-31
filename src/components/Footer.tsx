import TopNav from "./TopNav";
import { getAllGames } from "@/lib/mods";


const Footer = () => {
  const games = getAllGames()

  return (
    <footer className="flex items-center justify-between bg-(--bg-2) py-[25px] px-[30px]">
      <div className="w-[40%]">
        <a href="/" className="group text-3xl uppercase font-bold">
          <h1 className="text-(--primary-color-1) group-hover:text-white transition-colors duration-600 grayscale-50">FS<span className="text-white group-hover:text-(--primary-color-1) transition-colors duration-600">box</span>
          </h1>
        </a>
        <span className="text-xs md:text-sm">Кращі моди для ігор</span>
      </div>
      <div className="">
        <TopNav games={games} />
      </div>
    </footer>
  );
}
export default Footer;
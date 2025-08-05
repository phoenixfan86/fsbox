import { getAllGames } from "@/lib/mods";
import TopNav from "./TopNav";

const Header = () => {
  const games = getAllGames()

  return (
    <header>
      <div className="h-10 flex items-center bg-(--bg-1) ">
        <TopNav games={games} variant="text" className="mx-6" />
      </div>
      <div className="h-35 flex gap-10 md:gap-30 items-center justify-between py-[25px] px-[25px] md:px-[30px] bg-(--bg-2)">
        <div className="md:w-[40%] flex flex-col">
          <a href="/" className="group text-3xl uppercase font-bold">
            <span className="text-(--primary-color-1) group-hover:text-white transition-colors duration-600">FS<span className="text-white group-hover:text-(--primary-color-1) transition-colors duration-600">box</span>
            </span>
          </a>
          <span className="text-xs md:text-sm" >Кращі моди для ігор</span>
        </div>
        <div className="w-[60%] flex gap-4 justify-end">
          <input
            type="text"
            placeholder="Почніть писати назву"
            autoComplete="off"
            className="w-40 focus:w-1/2 text-white py-[5px] px-[10px] ring-1 ring-(--color-1) focus:ring-(--primary-color-1) rounded-[5px] outline-0 placeholder:text-sm duration-500" />
          <button className="py-[3px] px-[10px] text-white bg-(--primary-color-1) rounded-[5px] hover:scale-95 duration-300">Пошук</button>
        </div>
      </div>
    </header>
  );
}
export default Header;

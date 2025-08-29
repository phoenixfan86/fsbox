"use client"

import { useState } from "react";
import Link from "next/link";
import TopNav from "./TopNav";
import { ModData } from "@/types/ModsData";
import { stripMarkdown } from "@/lib/stripMarkDown";

type Props = {
  allMods: ModData[];
  games: { slug: string; name: string }[];
};

const Header = ({ allMods, games }: Props) => {
  const [query, setQuery] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const results = searchTerm
    ? allMods.filter((mod) =>
      mod.mod_name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    : [];

  const handleSearch = () => {
    setSearchTerm(query.trim());
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setQuery("");
    setSearchTerm("");
  };

  return (
    <header>
      <div className="h-10 flex items-center bg-(--bg-1) ">
        <TopNav games={games} variant="text" className="mx-4 md:mx-6" />
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
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoComplete="off"
            className="w-40 md:focus:w-1/2 text-white py-[5px] px-[10px] ring-1 ring-(--color-1) focus:ring-(--primary-color-1) rounded-[5px] outline-0 placeholder:text-sm duration-500" />
          <button className="py-[3px] px-[10px] text-white bg-(--primary-color-1) rounded-[5px] hover:scale-95 duration-300" onClick={handleSearch}>Пошук</button>
        </div>
        {results.length > 0 && (
          <div className="w-full h-full fixed inset-0 flex items-center justify-center p-1 md:p-7 bg-(--bg-6) z-100">
            <div className="w-full max-h-[95vh] flex flex-col gap-5 mx-2 md:mx-15 md:px-10 md:pb-15 bg-(--background) overflow-y-auto">
              <div className="sticky top-0 flex items-center justify-between shadow p-3 md:px-0 bg-(--background)">
                <span>Результати пошуку:</span>
                <span className="material-symbols-outlined right-2 cursor-pointer hover:rotate-90 duration-500" onClick={handleCloseModal}>
                  close
                </span>
              </div>
              <div className="px-5 md:p-0">
                <ul className="flex flex-col gap-5">
                  {results.map((mod) => (
                    <li key={mod.slug}>
                      <Link href={`/mods/${mod.gameSlug}/${mod.slug}`} onClick={handleCloseModal}>
                        <div className="flex flex-col md:flex-row gap-3 items-start md:items-end shadow">
                          <img src={mod.image_first} alt={mod.title} className="size-20" />
                          <h3 className="!text-(--primary-color-1)">{mod.mod_name}</h3>
                          <p className="text-sm text-gray-700 mr-10">
                            {stripMarkdown(mod.content).slice(0, 150)}...
                          </p>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
export default Header;

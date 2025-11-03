import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { getSortedModsData } from "@/lib/mods";
import { stripMarkdown } from "@/lib/stripMarkDown";
import { ModData } from "@/types/ModsData";
import Pagination from "@/components/Pagination";
import OptimizedImage from '@/components/OptimizedImages'


const MODS_PER_PAGE = 5;

export const metadata: Metadata = {
  title: "FSbox - скачати безкоштовно моди для Майнкрафт та для інших ігор",
  keywords: "моди для ігор, скачати моди, моди українською, minecraft mods, моди на Майнкрафт, моди на Project Zomboid, аддони на WoW, моди на Stardew Valley",
  description: "Cкачати моди на Майнкрафт, скачати моди для Stardew Valley, скачати моди для Terraria та інших ігор. Безплатно, швидко, без реєстрації.",
  alternates: {
    canonical: "https://fsbox.pp.ua/"
  },
  openGraph: {
    title: "FSbox - скачати безкоштовно моди для Майнкрафт та для інших ігор",
    description: "Cкачати моди для Майнкрафт, скачати моди для Stardew Valley, скачати моди для Terraria та інших ігор. Безплатно, швидко, без реєстрації.",
    url: "https://fsbox.pp.ua/",
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

export default function Home() {
  const mods: ModData[] = getSortedModsData();
  const allMods = mods.slice(0, MODS_PER_PAGE);
  const totalPages = Math.ceil(mods.length / MODS_PER_PAGE);


  return (
    <main className="md:w-[80%] py-[15px] px-[20px] md:py-[25px] md:px-[30px] shadow">
      <h1 className="text-xl font-bold mb-6">Нові моди на FSBox</h1>
      <ul className="space-y-4 md:space-y-8">
        {allMods.map((mod) => (
          <li key={mod.slug} className="p-4 rounded shadow">
            <div className="flex flex-col md:flex-row items-center gap-3 md:gap-6 cursor-pointer hover:opacity-90 transition">
              <OptimizedImage
                src={mod.image_first}
                alt={`${mod.mod_name} для ${mod.game}`}
                width={380}
                aspectRatio="16/9"
                priority={true}
                quality={85}
                fit="inside"
                objectFit="contain"
                className="postImg hover:!scale-none object-cover rounded"
              />
              <div className="flex gap-5 flex-col justify-between">
                <div>
                  <h2 className="text-xl font-semibold">
                    <Link href={`/mods/${mod.gameSlug}/${mod.slug}`}>
                      {mod.title_ua} для {mod.game} {mod.tags?.[mod.tags.length - 1]}
                    </Link>
                  </h2>
                  <div className="flex items-center text-xs text-gray-500 gap-1">
                    <MdOutlineCalendarMonth size={16} className="inline-block text-gray-400" />
                    <span>{mod.date}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-700 mr-10">
                  {stripMarkdown(mod.content).slice(0, 150)}...
                </p>
                <div>
                  <div className="flex gap-1.5 flex-wrap mt-1 md:mt-2 space-x-0  md:space-x-2">
                    {mod.tags?.map((tag) => (
                      <span key={tag} className="text-xs bg-gray-200 hover:bg-blue-500 hover:text-white duration-300 px-2 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>

                </div>
              </div>
            </div>

            <div className="flex justify-between mt-4">
              <span className="text-xs text-gray-500 block">Автор: {mod.author}</span>
              <span className="text-xs text-gray-500 block">
                <Link href={`${mod.game_collection}`}>мод для: {mod.game}</Link>
              </span>
            </div>
          </li>
        ))}
      </ul>

      {totalPages > 1 && (
        <div className="mt-8 flex justify-center">
          <Pagination
            pageNumber={1}
            totalPages={totalPages}
            basePath="/page"
          />
        </div>
      )}
    </main>
  );
}


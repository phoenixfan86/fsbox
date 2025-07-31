import Link from "next/link";
import { getSortedModsData } from "@/lib/mods";
import { stripMarkdown } from "@/lib/stripMarkDown";
import { ModData } from "@/types/ModsData";

const MODS_PER_PAGE = 5;

export default function Home() {
  const mods: ModData[] = getSortedModsData();
  const pageMods = mods.slice(0, MODS_PER_PAGE);
  const totalPages = Math.ceil(mods.length / MODS_PER_PAGE);

  return (
    <main className="py-[25px] px-[30px]">
      <h1 className="text-2xl font-bold mb-6">Нові моди</h1>
      <ul className="space-y-8">
        {pageMods.map((mod) => (
          <li key={mod.slug} className="p-4 rounded shadow">
            <Link href={`/mods/${mod.gameSlug}/${mod.slug}`}>
              <div className="flex gap-4 cursor-pointer hover:opacity-90 transition">
                <img
                  src={mod.image_first}
                  alt={mod.title}
                  className="postImg hover:!scale-none object-cover rounded"
                />
                <div className="flex gap-5 flex-col justify-between">
                  <div>
                    <h2 className="text-xl font-semibold">{mod.title} для {mod.game}</h2>
                    <div className="flex items-center text-xs text-gray-500 gap-1">
                      <span className="material-symbols-outlined text-gray-400" style={{ fontSize: 16 }}>
                        calendar_month
                      </span>
                      <span>{mod.date}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 mr-10">
                    {stripMarkdown(mod.content).slice(0, 100)}...
                  </p>
                  <div>
                    <div className="mt-2 space-x-2">
                      {mod.tags?.map((tag) => (
                        <span key={tag} className="text-xs bg-gray-200 hover:bg-blue-500 hover:text-white duration-300 px-2 py-1 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="text-xs text-gray-500 block">Автор: {mod.author}</span>
                    <span className="text-xs text-gray-500 block">Гра: {mod.game}</span>
                  </div>
                </div>
              </div>
            </Link>
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
    </main>
  );
}


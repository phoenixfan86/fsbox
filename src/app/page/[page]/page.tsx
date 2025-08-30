import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getSortedModsData } from "@/lib/mods";
import { stripMarkdown } from "@/lib/stripMarkDown";

const MODS_PER_PAGE = 5;


export async function generateStaticParams() {
  const mods = getSortedModsData();
  const totalPages = Math.ceil(mods.length / MODS_PER_PAGE);

  return Array.from({ length: totalPages }, (_, i) => ({
    page: (i + 1).toString(),
  }));
}

export default async function Page({ params }: { params: Promise<{ page: string }> }) {
  const { page } = await params;
  const mods = getSortedModsData();
  const pageNumber = parseInt(page, 10);
  const totalPages = Math.ceil(mods.length / MODS_PER_PAGE);

  if (isNaN(pageNumber) || pageNumber < 1 || pageNumber > totalPages) {
    return notFound();
  }

  const startIndex = (pageNumber - 1) * MODS_PER_PAGE;
  const endIndex = startIndex + MODS_PER_PAGE;
  const pageMods = mods.slice(startIndex, endIndex);



  return (
    <main className="md:w-[80%] py-[15px] px-[20px] md:py-[25px] md:px-[30px]">
      <ul className="space-y-8">
        {pageMods.map((mod) => (
          <li key={mod.slug} className="p-0 md:p-4 rounded shadow">

            <div className="flex flex-col md:flex-row items-center gap-3 md:gap-4 cursor-pointer hover:opacity-90 transition">
              <Image
                src={mod.image_first}
                alt={mod.title}
                width={300}
                height={100}
                className="postImg hover:!scale-none object-cover rounded "
              />
              <div className="flex gap-5 flex-col justify-between">
                <div>
                  <h2 className="text-xl font-semibold">
                    <Link href={`/mods/${mod.gameSlug}/${mod.slug}`}>
                      {mod.title_ua} для {mod.game} {mod.tags?.[mod.tags.length - 1] ?? ''}
                    </Link>
                  </h2>
                  <div className="flex items-center text-xs text-gray-500 gap-1">
                    <span className="material-symbols-outlined text-gray-400" style={{ fontSize: 16 }}>
                      calendar_month
                    </span>
                    <span>{mod.date}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-700 mr-10">
                  {stripMarkdown(mod.content).slice(0, 150)}...
                </p>
                <div>
                  <div className="flex gap-1.5 flex-wrap mt-1 md:mt-2 space-x-0  md:space-x-2">
                    {mod.tags?.map((tag) => (
                      <span key={tag} className="text-[10px] md:text-xs bg-gray-200 hover:bg-blue-500 hover:text-white duration-300 px-2 py-1 rounded-full">
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
                <a href={mod.game_collection}>для: {mod.game}</a>
              </span>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-8 flex justify-center">
        {pageNumber > 1 ? (
          <Link href={pageNumber === 2 ? `/` : `/page/${pageNumber - 1}`} className="hover:-translate-x-2">
            ← Назад
          </Link>
        ) : <span />} <span className="text-center"> [ {page} ] </span>
        {pageNumber < totalPages && (
          <Link href={`/page/${pageNumber + 1}`} className="hover:translate-x-2">
            Вперед →
          </Link>
        )}
      </div>
    </main>
  );
}

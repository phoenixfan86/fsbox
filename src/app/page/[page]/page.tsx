import Link from "next/link";
import { notFound } from "next/navigation";
import { getSortedModsData } from "@/lib/mods";
import { stripMarkdown } from "@/lib/stripMarkDown";

const MODS_PER_PAGE = 5;

type Props = {
  params: {
    page: string;
  };
};

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
    <div className="wrapper">
      <main className="p-6">
        <ul className="space-y-8">
          {pageMods.map((mod) => (
            <li key={mod.slug} className="p-4 rounded shadow">
              <Link href={`/mods/${mod.game}/${mod.slug}`}>
                <div className="flex gap-4 cursor-pointer hover:opacity-90 transition">
                  <img
                    src={mod.image_first}
                    alt={mod.title}
                    className="!w-100 postImg hover:!scale-none object-cover rounded mb-3"
                  />
                  <div className="flex gap-5 flex-col justify-between">
                    <div>
                      <h2 className="text-xl font-semibold">{mod.title}</h2>
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

        <div className="mt-8 flex justify-center">
          {pageNumber > 1 ? (
            <Link href={pageNumber === 2 ? `/` : `/page/${pageNumber - 1}`} className="hover:-translate-x-2">
              ← Назад
            </Link>
          ) : <span />} <span className="text-center"> [ {page} ] </span>
          {pageNumber < totalPages && (
            <Link href={`/page/${page + 1}`} className="hover:translate-x-2">
              Вперед →
            </Link>
          )}
        </div>
      </main>
    </div>
  );
}

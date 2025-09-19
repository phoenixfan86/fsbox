import Link from "next/link";
import { notFound } from "next/navigation";
import { getSortedServerData } from "@/lib/servers";
import { stripMarkdown } from "@/lib/stripMarkDown";
import Pagination from "@/components/Pagination";

const SERVERS_PER_PAGE = 5;


export async function generateStaticParams() {
  const servs = getSortedServerData();
  const totalPages = Math.ceil(servs.length / SERVERS_PER_PAGE);

  return Array.from({ length: totalPages }, (_, i) => ({
    page: (i + 1).toString(),
  }));
}

export default async function Page({ params }: { params: Promise<{ page: string }> }) {
  const { page } = await params;
  const servers = getSortedServerData();
  const pageNumber = parseInt(page, 10);
  const totalPages = Math.ceil(servers.length / SERVERS_PER_PAGE);

  if (isNaN(pageNumber) || pageNumber < 1 || pageNumber > totalPages) {
    return notFound();
  }

  const startIndex = (pageNumber - 1) * SERVERS_PER_PAGE;
  const endIndex = startIndex + SERVERS_PER_PAGE;
  const pageServers = servers.slice(startIndex, endIndex);



  return (
    <main className="md:w-[80%] py-[15px] px-[20px] md:py-[25px] md:px-[30px]">
      <div className="flex gap-2 mb-2">
        <h1 className="text-sm text-gray-500">Список серверів на FSBox </h1>
        <span className="text-sm text-gray-500">сторінка {pageNumber}</span>
        <span className="text-sm text-gray-500">
          Всього {totalPages <= 2 ? `${totalPages} сторінки` : `${totalPages} сторінок`}
        </span>
      </div>
      <ul className="space-y-8">
        {pageServers.map((serv) => (
          <li key={serv.slug} className="p-4 rounded shadow">

            <div className="flex flex-col md:flex-row items-center gap-3 md:gap-4 cursor-pointer hover:opacity-90 transition">
              <img
                src={serv.server_image}
                alt={serv.title}
                width={300}
                height={100}
                className="postImg hover:!scale-none object-cover rounded "
              />
              <div className="flex gap-5 flex-col justify-between">
                <div>
                  <h2 className="text-xl font-semibold">
                    <Link href={`/game-servers/${serv.gameSlug}/${serv.slug}`}>
                      {serv.title_ua} для {serv.game} {serv.tags?.[serv.tags.length - 1] ?? ''}
                    </Link>
                  </h2>
                  <div className="flex items-center text-xs text-gray-500 gap-1">
                    <span className="material-symbols-outlined text-gray-400" style={{ fontSize: 16 }}>
                      calendar_month
                    </span>
                    <span>{serv.date}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-700 mr-10">
                  {stripMarkdown(serv.content).slice(0, 150)}...
                </p>
                <div>
                  <div className="flex gap-1.5 flex-wrap mt-1 md:mt-2 space-x-0  md:space-x-2">
                    {serv.tags?.map((tag) => (
                      <span key={tag} className="text-[10px] md:text-xs bg-gray-200 hover:bg-blue-500 hover:text-white duration-300 px-2 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between mt-4">
              <span className="text-xs text-gray-500 block">
                <a href={serv.game_collection}>для: {serv.game}</a>
              </span>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-8 flex justify-center">
        <Pagination
          pageNumber={pageNumber}
          totalPages={totalPages}
          basePath="/game-servers/page"
        />
      </div>
    </main>
  );
}

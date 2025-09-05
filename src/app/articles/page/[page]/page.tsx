import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getSortedArticlesData } from "@/lib/articles";
import { stripMarkdown } from "@/lib/stripMarkDown";
import Pagination from "@/components/Pagination";

const ARTICLES_PER_PAGE = 5;


export async function generateStaticParams() {
  const articls = getSortedArticlesData();
  const totalPages = Math.ceil(articls.length / ARTICLES_PER_PAGE);

  return Array.from({ length: totalPages }, (_, i) => ({
    page: (i + 1).toString(),
  }));
}

export default async function Page({ params }: { params: Promise<{ page: string }> }) {
  const { page } = await params;
  const articles = getSortedArticlesData();
  const pageNumber = parseInt(page, 10);
  const totalPages = Math.ceil(articles.length / ARTICLES_PER_PAGE);

  if (isNaN(pageNumber) || pageNumber < 1 || pageNumber > totalPages) {
    return notFound();
  }

  const startIndex = (pageNumber - 1) * ARTICLES_PER_PAGE;
  const endIndex = startIndex + ARTICLES_PER_PAGE;
  const pageArticles = articles.slice(startIndex, endIndex);



  return (
    <main className="md:w-[80%] py-[15px] px-[20px] md:py-[25px] md:px-[30px]">
      <ul className="space-y-8">
        {pageArticles.map((artcl) => (
          <li key={artcl.slug} className="p-0 md:p-4 rounded shadow">

            <div className="flex flex-col md:flex-row items-center gap-3 md:gap-4 cursor-pointer hover:opacity-90 transition">
              {artcl.article_img?.map((src, i) => (
                <Image
                  key={i}
                  src={src}
                  alt={artcl.title}
                  width={300}
                  height={100}
                  className="postImg hover:!scale-none object-cover rounded "
                />
              ))}

              <div className="flex gap-5 flex-col justify-between">
                <div>
                  <h2 className="text-xl font-semibold">
                    <Link href={`/articles/${artcl.gameSlug}/${artcl.slug}`}>
                      {artcl.title_ua}
                    </Link>
                  </h2>
                  <div className="flex items-center text-xs text-gray-500 gap-1">
                    <span className="material-symbols-outlined text-gray-400" style={{ fontSize: 16 }}>
                      calendar_month
                    </span>
                    <span>{artcl.date}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-700 mr-10">
                  {stripMarkdown(artcl.content).slice(0, 150)}...
                </p>
                <div>
                  <div className="flex gap-1.5 flex-wrap mt-1 md:mt-2 space-x-0  md:space-x-2">
                    {artcl.tags?.map((tag) => (
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
                <a href={artcl.game_collection}>для: {artcl.game}</a>
              </span>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-8 flex justify-center">
        <Pagination
          pageNumber={pageNumber}
          totalPages={totalPages}
          basePath="/articles"
        />
      </div>
    </main>
  );
}

import { Metadata } from "next";
import Link from "next/link";
import { getSortedArticlesData } from "@/lib/articles";
import { stripMarkdown } from "@/lib/stripMarkDown";
import type { ArticleData } from "@/types/ArticleData";
import Pagination from "@/components/Pagination";

const ARTICLES_PER_PAGE = 5;

export const metadata: Metadata = {
  title: "FSbox - Статті про Майнкрафт та для інших ігор",
  description: "Статті та гайди по Minecraft та інших ігор: як встановити моди, налаштувати сервер. Покрокові інструкції українською мовою для початківців та досвідчених",
  alternates: {
    canonical: "https://fsbox.pp.ua/articles"
  },
  openGraph: {
    title: "FSbox - Статті про Майнкрафт та для інших ігор",
    description: "Статті та гайди по Minecraft та інших ігор: як встановити моди, налаштувати сервер. Покрокові інструкції українською мовою для початківців та досвідчених",
    url: "https://fsbox.pp.ua/articles",
    siteName: "FSBox",
    type: "article",
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

const Articles = () => {
  const articles: ArticleData[] = getSortedArticlesData();
  const allArticles = articles.slice(0, ARTICLES_PER_PAGE);
  const totalPages = Math.ceil(articles.length / ARTICLES_PER_PAGE);

  return (
    <section className="md:w-[80%] py-[15px] px-[20px] md:py-[25px] md:px-[30px] shadow">
      <h1 className="text-xl font-bold mb-6">Список статей на FSBox:</h1>
      <p>
        Статті та гайди по Minecraft: як встановити моди, налаштувати сервер, оптимізувати гру та відкрити нові можливості. Покрокові інструкції українською мовою для початківців та досвідчених гравців.
      </p>

      <ul className="space-y-4 md:space-y-8">
        {allArticles.map((article) => (
          <li key={article.slug} className="p-0 md:p-4 rounded shadow">

            <div className="flex flex-col md:flex-row items-center gap-3 md:gap-6 md:py-4 cursor-pointer hover:opacity-90 transition">
              {article.article_img?.[0] && (
                <img
                  src={article.article_img[0]}
                  alt={`${article.title}`}
                  width={300}
                  height={100}
                  className="postImg hover:!scale-none object-cover rounded"
                />
              )}

              <div className="flex gap-5 flex-col justify-between">
                <div>
                  <h2 className="text-xl font-semibold">
                    <Link href={`/articles/${article.gameSlug}/${article.slug}`}>
                      {article.title_ua}
                    </Link>
                  </h2>
                  <div className="flex items-center text-xs text-gray-500 gap-1">
                    <span className="material-symbols-outlined text-gray-400" style={{ fontSize: 16 }}>
                      calendar_month
                    </span>
                    <span>{article.date}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-700 mr-10">
                  {stripMarkdown(article.content).slice(0, 150)}...
                </p>
                <div>
                  <div className="flex gap-1.5 flex-wrap mt-1 md:mt-2 space-x-0  md:space-x-2">
                    {article.tags?.map((tag) => (
                      <span key={tag} className="text-xs bg-gray-200 hover:bg-blue-500 hover:text-white duration-300 px-2 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>

                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {totalPages > 1 && (
        <div className="mt-8 flex justify-center">
          <Pagination
            pageNumber={1}
            totalPages={totalPages}
            basePath="/articles"
          />
        </div>
      )}
    </section>
  );
}
export default Articles;
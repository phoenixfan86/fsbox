import { getArticleData } from "@/lib/articles";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Markdown from "react-markdown";
import type { ArticleData } from "@/types/ArticleData";
import { stripMarkdown } from "@/lib/stripMarkDown";


type SlugParams = Promise<{ slug: string[] }>;


export async function generateMetadata({ params }: { params: SlugParams }): Promise<Metadata> {
  const { slug } = await params;
  const slugPatch = slug.join("/");
  const canonical = `https://fsbox.pp.ua/articles/${slugPatch}`
  const article: ArticleData = getArticleData(slugPatch);
  if (!article) return {};

  const title = article.title;
  const description = `${stripMarkdown(article.description).slice(0, 150)}...`

  return {
    alternates: { canonical },
    title: `${article.title} for ${article.game}`,
    description,
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "FSBox",
      type: "article",
      images: article.article_img ? [
        {
          url: article.article_img[0],
          width: 300,
          alt: article.title,
        },
      ] : [],
    }
  };
}

export default async function articlePage({ params }: { params: SlugParams }) {
  const { slug } = await params;

  if (!slug || slug.length !== 2) {
    return notFound();
  }

  const [game, file] = slug;
  const slugPath = `${game}/${file}`;
  const article = getArticleData(slugPath);

  if (!article) return notFound();


  return (
    <div className="md:w-[80%] py-[15px] px-[20px] md:py-[25px] md:px-[30px] shadow">
      <h1 className="text-3xl font-bold mb-2">{article.title_ua}</h1>
      <div className="flex justify-between">
        <p className="text-xs text-(--color-4) mb-4">Додано: {article.date}</p>
      </div>
      <div className="mb-5 space-x-2">
        {(article.tags ?? []).map((tag) => (
          <span
            key={tag}
            className="text-xs bg-gray-200 hover:text-white hover:bg-(--primary-color-1) duration-300 px-2 py-1 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="flex flex-wrap gap-4 items-center justify-center pt-5">
        {article.article_img?.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`${article.title} image ${i + 1}`}
            className="postImg h-auto rounded mb-6"
          />
        ))}
      </div>
      <div className="flex gap-5 flex-col mt-5">
        <h3 className="text-xl text-center">{article.article_type}</h3>
        <div className="text-sm text-(--color-3)">
          <Markdown>{article.content}</Markdown>
        </div>
      </div>
      {article.link && (
        <div className="flex flex-col items-start mt-6">
          <span>Посилання: </span>

        </div>
      )}
    </div>
  );
}

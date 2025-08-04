import { getModData } from "@/lib/mods";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Markdown from "react-markdown";
import { ModData } from "@/types/ModsData";
import { stripMarkdown } from "@/lib/stripMarkDown";

type SlugParams = Promise<{ slug: string[] }>;

export async function generateMetadata({ params }: { params: SlugParams }): Promise<Metadata> {
  const { slug } = await params;
  const slugPatch = slug.join("/");
  const mod: ModData = getModData(slugPatch);
  if (!mod) return {};
  return {
    title: mod.title,
    description: `${mod.title} — ${stripMarkdown(mod.content).slice(0, 100)}...`,
  };
}

export default async function ModPage({ params }: { params: SlugParams }) {
  const { slug } = await params;

  if (!slug || slug.length !== 2) {
    return notFound();
  }

  const [game, file] = slug;
  const slugPath = `${game}/${file}`;
  const mod = getModData(slugPath);

  if (!mod) return notFound();

  return (
    <div className="md:w-[80%] py-[15px] px-[20px] md:py-[25px] md:px-[30px] shadow">
      <h1 className="text-3xl font-bold mb-2">{mod.title} для {mod.game}</h1>
      <p className="text-xs text-(--color-4) mb-4">Додано: {mod.date}</p>
      <div className="mb-5 space-x-2">
        {(mod.tags ?? []).map((tag) => (
          <span
            key={tag}
            className="text-xs bg-gray-200 hover:text-white hover:bg-(--primary-color-1) duration-300 px-2 py-1 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex gap-4 items-center justify-center pt-5">
        <img
          src={mod.image_first}
          alt={mod.title}
          className="postImg h-auto rounded mb-6"
        />
        {mod.image_second && (
          <img
            src={mod.image_second}
            alt={mod.title}
            className="postImg h-auto rounded mb-6"
          />
        )}

      </div>

      <div className="flex gap-5 flex-col mt-5">
        <h3 className="text-xl text-center">Опис моду</h3>
        <div className="text-sm text-(--color-3)">
          <Markdown>{mod.content}</Markdown>
        </div>

        {mod.mod_dependencies && (
          <div className="px-3">
            <span className="py-1 px-3 text-(--color-1) rounded-sm bg-(--bg-3)">
              Для роботи цього мода потрібен:
            </span>
            <span className="py-1 px-3 bg-(--color-4)">
              <a
                href={mod.dependencies_link}
                className="tracking-wide text-shadow-xs font-thin"
              >
                {mod.mod_dependencies}
              </a>
            </span>
          </div>
        )}

        <p>
          Автор:
          <a href={mod.author_link} className="!text-(--primary-color-1)">
            {mod.author}
          </a>
        </p>
      </div>

      {mod.download_link && (
        <div className="text-center mt-6">
          <a
            href={mod.download_link}
            target="_blank"
            rel="noopener noreferrer"
            className="downloadBtn"
            aria-label="Завантажити мод"
          >
            <span>Завантажити</span>
            <span className="text-extra">: {mod.mod_name}</span>
          </a>
        </div>
      )}
    </div>
  );
}
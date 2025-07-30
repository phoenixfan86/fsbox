import { getModData } from "@/lib/mods";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Markdown from "react-markdown";
import { ModData } from "@/types/ModsData";

type Params = {
  slug: string;
};

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const mod: ModData = getModData(params.slug);
  if (!mod) return {};
  return {
    title: mod.title,
    description: `${mod.title} — мод від ${mod.author}`,
  };
}

export default function ModPage({ params }: { params: Params }) {
  if (!params.slug || params.slug.length !== 2) {
    return notFound();
  }

  const [game, file] = params.slug;
  const slugPath = `${game}/${file}`;

  const mod = getModData(slugPath);

  if (!mod) return notFound();

  return (
    <div className="flex flex-col p-6">
      <h1 className="text-3xl font-bold mb-2">{mod.title}</h1>
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

      <div className="flex gap-4 items-center justify-center">
        <img
          src={mod.image_first}
          alt={mod.title}
          className="postImg h-auto rounded mb-6"
        />
        <img
          src={mod.image_second}
          alt={mod.title}
          className="postImg h-auto rounded mb-6"
        />
      </div>
      <div className="flex gap-5 flex-col mt-5">
        <h3 className="text-xl text-center">Опис моду</h3>
        <div className="text-sm text-(--color-3) px-10">
          <Markdown >
            {mod.content}
          </Markdown>
        </div>
        {mod.mod_dependencies && (
          <div className="px-3">
            <span className="py-1 px-3 text-(--color-1) rounded-sm bg-(--bg-3)">Для роботи цього мода потрібен:
            </span>
            <span className="py-1 px-3 bg-(--color-4)"><a href={mod.dependencies_link} className="tracking-wide text-shadow-xs font-thin">{mod.mod_dependencies}</a></span>
          </div>
        )}
        <p>
          Автор:
          <a href={mod.author_link} className="!text-(--primary-color-1)">{mod.author}</a>
        </p>
      </div>
      {mod.download_link && (
        <div className="text-center mt-6">
          <a
            href={mod.download_link}
            target="_blank"
            rel="noopener noreferrer"
            className="downloadBtn"
          >
            <span className="">Завантажити</span>
            <span className="text-extra">: {mod.mod_name}</span>
          </a>
        </div>
      )}
    </div>
  );
}

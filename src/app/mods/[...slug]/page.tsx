import { getModData, getSortedModsData } from "@/lib/mods";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import Markdown from "react-markdown";
import { ModData } from "@/types/ModsData";
import { stripMarkdown } from "@/lib/stripMarkDown";
import { pickStableMods } from "@/lib/randomGameMod";

type SlugParams = Promise<{ slug: string[] }>;

function getLastVersion(mod: ModData) {
  return mod.tags?.[mod.tags.length - 1] ?? ''
}

export async function generateMetadata({ params }: { params: SlugParams }): Promise<Metadata> {
  const { slug } = await params;
  const slugPatch = slug.join("/");
  const canonical = `https://fsbox.pp.ua/mods/${slugPatch}`
  const mod: ModData = getModData(slugPatch);
  if (!mod) return {};

  const title = mod.title;
  const lastVersion = getLastVersion(mod)
  const description = `${stripMarkdown(mod.content).slice(0, 160)}...`

  return {
    alternates: { canonical },
    title: `${mod.title} для ${mod.game} ${lastVersion}`,
    description,
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "FSBox",
      type: "article",
      images: mod.image_first ? [
        {
          url: mod.image_first,
          width: 300,
          alt: mod.title,
        },
      ] : [],
    }
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
  const lastVersion = getLastVersion(mod);

  if (!mod) return notFound();

  const allMods = getSortedModsData();
  const similarMods = pickStableMods(allMods, mod, 3);

  return (
    <div className="md:w-[80%] py-[15px] px-[20px] md:py-[25px] md:px-[30px] shadow">
      <h1 className="text-3xl font-bold mb-2">{mod.title} для {mod.game} {lastVersion}</h1>
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

      <div className="flex flex-col md:flex-row gap-4 items-center justify-center pt-5">
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

      {similarMods.length > 0 && (
        <div className="my-10">
          <h3 className="text-xl font-bold mb-4">Добірка модів на {mod.game}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {similarMods.map(simMod => (
              <Link key={simMod.slug} href={`https://fsbox.pp.ua${mod.game_collection}/${simMod.slug}`} className="flex flex-col items-center justify-between p-3 rounded hover:shadow-lg transition !text-(--primary-color-1)">
                <img src={simMod.image_first} alt={simMod.title} className="md:w-40 mb-2 rounded" />
                <h4 className="font-semibold">{simMod.title}</h4>
              </Link>
            ))}
          </div>
        </div>
      )}
      {mod.game_collection && (
        <p>
          Дивись більше модів для <Link href={mod.game_collection} className="!text-(--primary-color-1)"> {mod.game}</Link>
        </p>
      )}
    </div>
  );
}
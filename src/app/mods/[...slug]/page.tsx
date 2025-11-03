import { getModData, getSortedModsData } from "@/lib/mods";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import Markdown from "react-markdown";
import { ModData } from "@/types/ModsData";
import { stripMarkdown } from "@/lib/stripMarkDown";
import { pickStableMods } from "@/lib/randomGameMod";
import { VideoEmbed } from "@/components/VideoEmbed";
import { VideoSchema } from "@/components/Schema/VideoSchema";
import { ModSchema } from "@/components/Schema/ModSchema";
import OptimizedImage from "@/components/OptimizedImages";

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

  const title = mod.title_ua;
  const lastVersion = getLastVersion(mod)
  const description = `${stripMarkdown(mod.description).slice(0, 150)}...`

  return {
    alternates: { canonical },
    title: `${mod.title_ua} ${mod.game} ${lastVersion}`,
    description,
    keywords: `${mod.game}, мод, ${mod.mod_name}, модифікація, доповнення, скачати, українською`,
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

      <ModSchema mod={mod} lastVersion={lastVersion} />

      {mod.video_link && (
        <VideoSchema
          videoLink={mod.video_link}
          modName={mod.mod_name}
          modTitle={mod.title_ua}
          date={mod.date}
        />
      )}

      <ul className="flex gap-2 text-[10px] md:text-xs mb-4">
        <li className="">
          <Link
            href={`/`}
            className="!text-(--color-1) hover:!text-(--primary-color-1)"
          >Mods</Link>
        </li>
        <li className="before:content-['>'] before:mr-2">
          <Link
            href={`${mod.game_collection}`}
            className="!text-(--color-1) hover:!text-(--primary-color-1)"
          >{mod.game}</Link>
        </li>
        <li className="before:content-['>'] before:mr-2">
          <Link
            href={`${mod.game_collection}/${mod.slug}`}
            className="!text-(--color-1) hover:!text-(--primary-color-1)"
          >{mod.title_ua}</Link>
        </li>
      </ul>

      <span></span>

      <h1 className="text-3xl font-bold mb-2">{mod.title_ua} для {mod.game} {lastVersion}</h1>
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
        <OptimizedImage
          src={mod.image_first}
          alt={`${mod.mod_name} для ${mod.game} версії ${lastVersion}`}
          width={300}
          className="postImg h-auto rounded mb-6"
        />
        {mod.image_second && (
          <OptimizedImage
            src={mod.image_second}
            alt={`${mod.mod_name} для ${mod.game} версії ${lastVersion}`}
            width={300}
            className="postImg h-auto rounded mb-6"
          />
        )}

      </div>

      <div className="flex gap-5 flex-col mt-5">
        <h2 className="text-xl text-center">Що робить мод {mod.mod_name} для {mod.game} {lastVersion}</h2>
        <div className="description text-sm text-(--color-3)">
          <Markdown>{mod.content}</Markdown>
        </div>

        {mod.video_link && (
          <VideoEmbed
            videoLink={mod.video_link}
            modName={mod.mod_name}
          />
        )}

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
            {` ${mod.author}`}
          </a>
        </p>
      </div>

      {mod.download_link && (
        <div className="flex flex-col items-center mt-6">
          <span>Для того щоб скачати мод натисніть: </span>
          <Link
            href={mod.download_link}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="downloadBtn"
            aria-label={`Завантажити мод ${mod.mod_name}`}
          >
            <svg className="inline w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 12l-5-5h3V3h4v4h3l-5 5z" />
            </svg>
            <span>Download mod</span>
            <span className="text-extra">: {mod.mod_name}</span>
          </Link>
          {mod.game === "Minecraft" && (
            <Link href={`/articles/minecraft/minecraft-mod-install-guide`}
              className="!text-(--primary-color-1)">Як встановити мод {mod.mod_name} на Майнкрафт</Link>
          )}
        </div>

      )}

      {similarMods.length > 0 && (
        <div className="my-10">
          <h3 className="text-lg font-bold mb-4">Також якщо вам сподобався мод {mod.mod_name} скачайте один з цих модів</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {similarMods.map(simMod => (
              <Link key={simMod.slug} href={`https://fsbox.pp.ua${mod.game_collection}/${simMod.slug}`} className="flex flex-col items-center justify-between p-3 rounded hover:shadow-lg transition !text-(--primary-color-1)">
                <OptimizedImage
                  src={simMod.image_first}
                  alt={`${simMod.mod_name} для ${simMod.game} версії ${lastVersion}`}
                  width={160}
                  height={100}
                  fit="inside"
                  objectFit="contain"
                  className="mb-2 rounded" />
                <h4 className="font-semibold">{simMod.mod_name} для {simMod.game}</h4>
              </Link>
            ))}
          </div>
        </div>
      )}
      <h4 className="shadow mb-3">Корисні посилання:</h4>
      <ul>
        <li>
          {mod.game_collection && (
            <p>
              Дивись більше модів для <Link href={mod.game_collection} className="!text-(--primary-color-1)"> {mod.game}</Link>
            </p>
          )}
        </li>
      </ul>
    </div>
  );
}

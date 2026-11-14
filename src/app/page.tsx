import Link from "next/link";
import { Metadata } from "next";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { getCachedModsData } from "@/lib/modCached";
import { stripMarkdown } from "@/lib/stripMarkDown";
import { getAllGames } from "@/lib/mods";
import { gameSeo } from "@/lib/gameSeo";
import { ModData } from "@/types/ModsData";
import Pagination from "@/components/Pagination";
import OptimizedImage from "@/components/OptimizedImages";

const MODS_PER_PAGE = 8;

export const metadata: Metadata = {
  title: "Скачати моди для Minecraft та інших ігор безкоштовно | FSBox",
  description:
    "Скачати безкоштовно моди для Minecraft, Stardew Valley, Teardown, Terraria та інших ігор. Добірка модифікацій українською мовою з описом і інструкціями.",
  keywords: [
    "моди для ігор",
    "скачати моди",
    "моди для майнкрафт",
    "моди українською",
    "minecraft mods",
  ],
  alternates: {
    canonical: "https://fsbox.pp.ua/",
  },
  openGraph: {
    title: "Скачати моди для Minecraft та інших ігор безкоштовно | FSBox",
    description:
      "Моди для Minecraft, Stardew Valley, Teardown, Terraria та інших ігор. Безкоштовно, українською мовою.",
    url: "https://fsbox.pp.ua/",
    siteName: "FSBox",
    type: "website",
    images: [
      {
        url: "/img/preview.png",
        width: 1200,
        height: 630,
        alt: "FSBox - кращі моди для ігор",
      },
    ],
  },
};

const SITE_URL = "https://fsbox.pp.ua";

export default function Home() {
  const mods: ModData[] = getCachedModsData();
  const allMods = mods.slice(0, MODS_PER_PAGE);
  const totalPages = Math.ceil(mods.length / MODS_PER_PAGE);
  const games = getAllGames();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: "FSBox",
        inLanguage: "uk",
        description:
          "Безкоштовні моди для Minecraft, Stardew Valley, Teardown, Terraria та інших ігор з описом українською мовою.",
        publisher: { "@id": `${SITE_URL}/#organization` },
      },
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: "FSBox",
        url: SITE_URL,
      },
      {
        "@type": "ItemList",
        name: "Колекції модів за іграми",
        numberOfItems: games.length,
        itemListElement: games.map((game, index) => ({
          "@type": "ListItem",
          position: index + 1,
          url: `${SITE_URL}/mods/${game.slug}`,
          name: gameSeo[game.slug]?.displayName ?? game.slug,
        })),
      },
    ],
  };

  return (

    <main className="md:w-[80%] py-[15px] px-[20px] md:py-[25px] md:px-[30px] shadow bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h1 className="text-xl font-bold mb-6">Завантажуйте моди для ігор українською: найкращі модифікації, аддони та шейдери на FSBox</h1>
      <ul className="space-y-6 md:space-y-8">
        {allMods.map((mod, index) => {
          const versionTag = mod.tags && mod.tags.length > 0 ? mod.tags[mod.tags.length - 1] : '';
          return (
            <li key={mod.slug} className="p-4 rounded shadow bg-white border border-gray-100">
              <div className="flex flex-col md:flex-row items-start gap-3 md:gap-6 transition hover:bg-gray-50 rounded-lg p-2 -m-2">
                <Link
                  href={`/mods/${mod.gameSlug}/${mod.slug}`}
                  className="w-full md:w-[380px] flex-shrink-0 block"
                  aria-label={`Читати більше про ${mod.mod_name}`}
                >
                  <OptimizedImage
                    src={mod.image_first}
                    alt={`${mod.mod_name} - мод для ${mod.game}`}
                    width={380}
                    sizes="(max-width: 768px) 100vw, 380px"
                    aspectRatio="16/9"
                    priority={index === 0}
                    quality={60}
                    fit="cover"
                    className="rounded object-cover w-full h-auto"
                  />
                </Link>
                <div className="flex flex-col gap-2 w-full">
                  <div>
                    <h2 className="text-xl font-semibold leading-tight text-gray-900">
                      <Link href={`/mods/${mod.gameSlug}/${mod.slug}`} className="hover:text-[var(--primary-color-1)] transition-colors">
                        {mod.title_ua} для {mod.game} {versionTag}
                      </Link>
                    </h2>
                    <div className="flex items-center text-xs text-gray-500 gap-1 mt-1.5">
                      <MdOutlineCalendarMonth size={16} className="text-gray-400" />
                      <time dateTime={mod.date}>{mod.date}</time>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 line-clamp-2 md:line-clamp-4">
                    {mod.summary_ua
                      ? mod.summary_ua
                      : stripMarkdown(mod.content).slice(0, 300) + "..."
                    }
                  </p>
                  <div className="mt-auto pt-2">
                    <div className="flex gap-2 flex-wrap">
                      {mod.tags?.slice(0, 4).map((tag) => (
                        <Link
                          key={tag}
                          href={`/mods/tags/${tag}`}
                          className="text-[11px] font-medium text-gray-600 bg-gray-100 hover:bg-(--primary-color-1) hover:!text-white transition-colors px-2.5 py-1 rounded-full"
                        >
                          {tag}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-100 text-xs text-gray-500">
                <span>Автор: <span className="font-medium text-gray-700">{mod.author}</span></span>
                <Link
                  href={mod.game_collection || '/'}
                  className="hover:underline hover:text-blue-600 transition-colors"
                >
                  Всі моди для {mod.game}
                </Link>
              </div>
            </li>
          )
        })}
      </ul>
      {totalPages > 1 && (
        <div className="mt-10 flex justify-center">
          <Pagination
            pageNumber={1}
            totalPages={totalPages}
            basePath="/page"
          />
        </div>
      )}
    </main>
  );
}
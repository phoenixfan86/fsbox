
import Link from "next/link";
import { Metadata } from "next";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { gameSpecificContent } from "@/lib/gameContent";
import { getAllGames, getSortedModsData } from "@/lib/mods";
import { getCachedModsData } from "@/lib/modCached";
import { stripMarkdown } from "@/lib/stripMarkDown";
import OptimizedImage from "@/components/OptimizedImages";

type GameParams = Promise<{ game: string }>;

export async function generateMetadata({
  params
}: {
  params: GameParams
}): Promise<Metadata> {
  const { game } = await params;
  const canonical = `https://fsbox.pp.ua/mods/${game}`;

  const gameTitle = game.charAt(0).toUpperCase() + game.slice(1);
  const title = `Найкращі моди на ${gameTitle} 2026 - Завантажити збірки та модифікації`;
  const description = `Шукаєте найкращі моди для ${gameTitle}? У нас зібрано безліч модифікацій: від крутої зброї та техніки до нових біомів. Завантажуйте безкоштовно та покращуйте свій геймплей!`;
  const keywords = `моди ${game}, ${game} mods, моди на зброю, моди на машини, шейдери, карти, інтерєри`;

  return {
    alternates: { canonical },
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      images: [
        {
          url: "./img/preview.png",
          width: 1200,
          height: 630,
          alt: title,
        }
      ],
      url: canonical,
      type: "article",
      siteName: "FSBox",
    }
  };
}


export function generateStaticParams() {
  const games = getAllGames();
  return games.map((game) => ({ game: game.slug }));
}

export default async function GameModsPage({ params }: { params: Promise<{ game: string }> }) {
  const { game } = await params;
  const allMods = getCachedModsData();
  const gameMods = allMods.filter(mod => mod.gameSlug === game);

  if (gameMods.length === 0) {
    return <p>Немає модів для цієї гри.</p>;
  }

  const gameName = gameMods[0].game;
  const customContent = gameSpecificContent[game] || {
    seoText: `<h2>Найкращі модифікації для ${gameName} </h2> <p>У нашому каталозі ви знайдете тільки перевірені моди на ${gameName}.  Ми регулярно оновлюємо версії до новіших.  Особливу увагу приділяємо продуктивності (Sodium, Iris) та новим механікам.</p><p>Завантажуйте найкращі моди для ${gameName} українською мовою...</p>`
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": `Кращі моди на ${gameName}`,
    "description": `Список найпопулярніших модифікацій для гри ${gameName}`,
    "numberOfItems": gameMods.length,
    "itemListElement": gameMods.map((mod, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "url": `https://fsbox.pp.ua/mods/${mod.gameSlug}/${mod.slug}`,
      "name": mod.mod_name || mod.title_ua
    }))
  };

  return (
    <section className="md:w-[80%] py-[15px] px-[20px] md:py-[25px] md:px-[30px]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h1 className="text-3xl font-bold mb-6">
        Моди на {gameName} - Завантажити найкращі модифікації для {gameName}
      </h1>
      <ul className="space-y-4 md:space-y-8">
        {gameMods.map((mod) => (
          <li key={mod.slug} className="p-4 rounded shadow">
            <div className="flex flex-col md:flex-row items-center gap-3 md:gap-4 hover:opacity-90 transition">
              <OptimizedImage
                src={mod.image_first}
                alt={`Скріншот мода ${mod.mod_name} для ${mod.game}`}
                width={300}
                height={0}
                fit="inside"
                objectFit="contain"
                className="postImg hover:!scale-none object-cover rounded"
              />
              <div className="flex gap-5 flex-col justify-between">
                <div>
                  <h2 className="text-xl font-semibold">
                    <Link href={`/mods/${mod.gameSlug}/${mod.slug}`}>
                      {mod.title_ua} для {mod.game} {mod.tags?.[mod.tags.length - 1] ?? ''}
                    </Link>
                  </h2>
                  <div className="flex items-center text-xs text-gray-500 gap-1">
                    <MdOutlineCalendarMonth size={16} className="inline-block text-gray-400" />
                    <span>{mod.date}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-700 mr-10">
                  {mod.summary_ua
                    ? mod.summary_ua
                    : stripMarkdown(mod.content).substring(0, 200).split(" ").slice(0, -1).join(" ") + "..."
                  }
                </p>
                <div>
                  <div className="flex gap-1.5 flex-wrap mt-1 md:mt-2 space-x-0  md:space-x-2">
                    {mod.tags?.map((tag) => (
                      <Link
                        key={tag}
                        href={`/mods/tags/${tag}`}
                        className="text-xs !text-gray-500 bg-gray-200 hover:!text-white hover:bg-(--primary-color-1) duration-300 px-2 py-1 rounded-full"
                      >
                        {tag}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between mt-4">
              <span className="text-xs text-gray-500 block">Автор: {mod.author}</span>
              <span className="text-xs text-gray-500 block">
                <Link href={`${mod.game_collection}`}>для: {mod.game}</Link>
              </span>
            </div>
          </li>
        ))}
      </ul>
      <div className="max-w-4xl pt-10">
        <div
          className="prose prose-invert max-w-none text-gray-300
                     prose-h2:text-2xl prose-h2:text-(--bg-2) prose-h2:font-bold
                     prose-h3:text-xl prose-h3:mt-6 prose-p:mb-4
                     prose-strong:text-(--bg-2)"
          dangerouslySetInnerHTML={{ __html: customContent.seoText }}
        />
      </div>
    </section>
  );
}

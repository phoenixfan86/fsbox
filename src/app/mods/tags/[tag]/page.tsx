//import { getSortedModsData } from "@/lib/mods";
import { getCachedModsData } from "@/lib/modCached";
import Link from "next/link";
import { Metadata } from "next";
import OptimizedImage from "@/components/OptimizedImages";
import { stripMarkdown } from "@/lib/stripMarkDown";
import { ModData } from "@/types/ModsData";


type TagParams = Promise<{ tag: string }>;

async function getModsByTag(tag: string) {
  const allMods = getCachedModsData();
  const filtered = allMods.filter((mod) =>
    mod.tags?.some(
      (t) => t.toLowerCase() === decodeURIComponent(tag).toLowerCase()
    )
  );

  const game = filtered[0]?.game ?? "Ігри";

  return { mods: filtered, game };
}

export async function generateMetadata({ params }: { params: TagParams }): Promise<Metadata> {
  const { tag } = await params;
  const { mods, game } = await getModsByTag(tag);

  const title = `Скачати моди для ${game} ${tag}`
  const description = `Моди для ${game} ${tag} українською мовою - нові блоки, предмети, функції та пригоди, що розширюють ігровий світ.`
  const canonical = `https://fsbox.pp.ua/mods/tags/${tag}`;

  return {
    title: title,
    description: description,
    alternates: { canonical },
    openGraph: {
      title: title,
      description: description,
      url: canonical,
      siteName: "FSBox",
      type: "website",
    },
  };
}

export default async function TagPage({ params }: { params: TagParams }) {
  const { tag } = await params;
  const { mods, game } = await getModsByTag(tag)

  const filteredMods = mods.filter((mod: ModData) =>
    mod.tags?.map(t => t.toLowerCase()).includes(tag.toLowerCase())
  );

  if (!filteredMods.length) {
    return (
      <div className="p-6 text-center">
        <h1 className="text-2xl font-bold mb-2">Моди для ${game} "{tag}"</h1>
        <p>На жаль, модів з цим тегом поки немає.</p>
      </div>
    );
  }

  return (
    <div className="md:w-[80%] py-[15px] px-[20px] md:py-[25px] md:px-[30px] shadow">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Скачати моди для {game} {tag}
      </h1>
      <p className="text-sm mb-3 pb-3 shadow">Моди для Minecraft 1.19.4 - це популярні доповнення, які дозволяють розширити можливості гри, додаючи нові блоки, предмети, біоми та функції. Завдяки їм ви можете створювати унікальні світи, експериментувати з механіками та робити гру ще цікавішою. Усі моди доступні українською мовою, що робить процес гри ще зручнішим і приємнішим. Завантажте моди для Minecraft 1.19.4 українською та відкрийте нові можливості у знайомому світі.</p>

      <div className="flex flex-col gap-6">
        {filteredMods.map((mod: ModData) => (
          <div key={mod.slug} className="w-full flex p-2 shadow">
            <Link
              key={mod.slug}
              href={`${mod.game_collection}/${mod.slug}`}
              className="w-full flex gap-3 items-start p-4 rounded-lg !text-(--primary-color-1)"
            >
              <OptimizedImage
                src={mod.image_first}
                alt={`${mod.mod_name} для ${mod.game}`}
                width={300}
                aspectRatio="16/9"
                fit="inside"
                objectFit="contain"
                className="rounded mb-3"
              />
              <div className="w-full flex gap-3 flex-col">
                <h2 className="font-semibold text-lg">{mod.mod_name}</h2>
                <p className="text-sm text-gray-500">{stripMarkdown(mod.content).slice(0, 200)}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

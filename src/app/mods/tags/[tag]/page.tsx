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

  const title = `Скачати найкращі моди для ${game} ${tag} 2026`;
  const description = `Шукаєте моди для ${game} ${tag}? Ми зібрали найкращі модифікації українською такі як ${mods.slice(0, 2).map(m => m.mod_name).join(', ')} - нові блоки, предмети, функції та пригоди, що розширюють ігровий світ.`;
  const canonical = `https://fsbox.pp.ua/mods/tags/${tag}`;



  return {
    title: title,
    description: description,
    alternates: { canonical },
    openGraph: {
      title: title,
      description: description,
      images: [
        {
          url: "/img/preview.png",
          width: 1200,
          height: 630,
          alt: "FSBox — кращі моди для ігор",
        },
      ],
      url: canonical,
      siteName: "FSBox",
      type: "website",
    },
  };
}

export default async function TagPage({ params }: { params: TagParams }) {
  const { tag } = await params;
  const { mods, game } = await getModsByTag(tag)
  const filteredMods = mods.filter(m => m.gameSlug === game || m.game.toLowerCase() === game.toLowerCase());

  // Використовуємо filteredMods для хлібних крихт
  const gamePath = filteredMods.length > 0 && filteredMods[0].game_collection
    ? filteredMods[0].game_collection
    : `/mods/${game}`;

  const displayGameName = filteredMods.length > 0 ? filteredMods[0].game : game;

  // const filteredMods = mods.filter((mod: ModData) =>
  //   mod.tags?.map(t => t.toLowerCase()).includes(tag.toLowerCase())
  // );

  if (!filteredMods.length) {
    return (
      <div className="p-6 text-center">
        <h1 className="text-2xl font-bold mb-2">Моди для {game} "{tag}"</h1>
        <p>На жаль, модів з цим тегом поки немає.</p>
      </div>
    );
  }

  const description = `Моди для ${game} ${tag} українською мовою.`;
  const canonical = `https://fsbox.pp.ua/mods/tags/${tag}`;

  const tagSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": `Моди для ${game} за тегом ${tag}`,
    "description": description,
    "url": canonical,
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": mods.map((m, i) => ({
        "@type": "ListItem",
        "position": i + 1,
        "url": `https://fsbox.pp.ua/mods/${m.gameSlug}/${m.slug}`
      }))
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Головна",
        "item": "https://fsbox.pp.ua/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": displayGameName,
        "item": `https://fsbox.pp.ua${gamePath}`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": tag,
        "item": `https://fsbox.pp.ua/mods/tags/${tag}`
      }
    ]
  };

  return (
    <div className="md:w-[80%] py-[15px] px-[20px] md:py-[25px] md:px-[30px] shadow">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(tagSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <nav aria-label="Breadcrumb" className="mb-6">
        <ul className="flex gap-2 text-[10px] md:text-xs text-gray-600 flex-wrap items-center">
          <li>
            <Link href="/" className="hover:text-[var(--primary-color-1)] transition-colors">
              Головна
            </Link>
          </li>
          <li className="before:content-['/'] before:mr-2 before:text-gray-400">
            <Link href={`https://fsbox.pp.ua${gamePath}`} className="hover:text-[var(--primary-color-1)] transition-colors">
              {displayGameName}
            </Link>
          </li>
          <li className="before:content-['/'] before:mr-2 before:text-gray-400">
            <span className="text-gray-900 font-medium capitalize">
              {tag}
            </span>
          </li>
        </ul>
      </nav>
      <h1 className="text-3xl font-bold mb-6 text-center">
        Скачати найкращі моди для {game} {tag} в 2026
      </h1>
      <p className="text-sm mb-3 pb-3 shadow">Моди для <strong>{game} {tag}</strong> - це популярні доповнення, які дозволяють розширити можливості гри, додаючи нові блоки, предмети, біоми та функції. Завдяки їм ви можете створювати унікальні світи, експериментувати з механіками та робити гру ще цікавішою. Усі моди доступні українською мовою, що робить процес гри ще зручнішим і приємнішим. Завантажте моди для <strong>{game} {tag}</strong> українською та відкрийте нові можливості у знайомому світі.</p>

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

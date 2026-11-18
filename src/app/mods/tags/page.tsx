import Link from "next/link";
//import { getSortedModsData } from "@/lib/mods";
import { getCachedModsData } from "@/lib/modCached";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Моди на майнкрафт за версією та тегами | FSBox",
  description:
    "Знайдіть моди на майнкрафт за версією гри, лоадером і тематикою. Оберіть тег і скачайте мод безкоштовно з описом українською.",
};


export default async function TagsPage() {
  const allMods = getCachedModsData();

  const allTags = Array.from(
    new Set(allMods.flatMap((mod) => mod.tags || []))
  ).sort((a, b) => a.localeCompare(b));

  return (
    <section className="md:w-[80%] py-[15px] px-[20px] md:py-[25px] md:px-[30px] shadow">
      <h1 className="text-3xl font-bold mb-6">Моди на майнкрафт за версіями та тегами</h1>
      <p className="mb-2">Обирайте моди на майнкрафт за версією гри, завантажувачем і тематикою. Також на сайті є моди для Project Zomboid, World of Warcraft і KSP. Оберіть тег, який вам потрібен, і скачайте мод безкоштовно.</p>
      <ul className="grid md:grid-cols-7 gap-2">
        {allTags.map((tag) => (
          <li key={tag}>
            <Link
              href={`/mods/tags/${encodeURIComponent(tag)}`}
              className="inline-block bg-gray-100 hover:bg-blue-300 px-3 py-1 rounded-full transition"
            >
              {tag}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

import Link from "next/link";
//import { getSortedModsData } from "@/lib/mods";
import { getCachedModsData } from "@/lib/modCached";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Усі теги для модів | FSBox",
  description:
    "Перегляньте всі теги модів для Minecraft - знайдіть улюблені моди за версією, лоадером, тематикою чи типом. Зручна навігація українською мовою.",
};

export default async function TagsPage() {
  const allMods = getCachedModsData();

  const allTags = Array.from(
    new Set(allMods.flatMap((mod) => mod.tags || []))
  ).sort((a, b) => a.localeCompare(b));

  return (
    <section className="md:w-[80%] py-[15px] px-[20px] md:py-[25px] md:px-[30px] shadow">
      <h1 className="text-3xl font-bold mb-6">Список усіх тегів для модів</h1>
      <p className="mb-2">Тут зібрані найкращі моди для Minecraft, Project Zomboid, WoW, KSP</p>
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

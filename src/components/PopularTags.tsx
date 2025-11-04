import Link from "next/link";
import { getSortedModsData } from "@/lib/mods";

export default function PopularTags() {
  const allMods = getSortedModsData();

  const tagCount: Record<string, number> = {};
  allMods.forEach((mod) => {
    (mod.tags || []).forEach((tag) => {
      tagCount[tag] = (tagCount[tag] || 0) + 1;
    });
  });

  const popularTags = Object.entries(tagCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([tag]) => tag);

  return (
    <aside className="bg-white shadow-md rounded-xl p-4">
      <h2 className="text-lg font-semibold mb-3">Популярні теги</h2>
      <ul className="space-y-2">
        {popularTags.map((tag) => (
          <li key={tag}>
            <Link
              href={`/mods/tags/${encodeURIComponent(tag)}`}
              className=""
            >
              {tag}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}

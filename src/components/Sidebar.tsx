import Link from "next/link";
import { getSortedModsData } from "@/lib/mods";
import { pickRandomMods } from "@/lib/randomMods";
import type { ModData } from "@/types/ModsData";

type Props = {
  exclude?: string; // slug того, що зараз відкрито, щоб не повторювати
};


const Sidebar = ({ exclude }: Props) => {
  const allMods: ModData[] = getSortedModsData();
  const randoms = pickRandomMods(allMods, 3, exclude);

  if (randoms.length === 0) return null;

  return (
    <aside className="hidden md:flex md:flex-col md:py-[25px] md:px-[30px] border-l-1 border-(--color-5)">
      <div className="">
        <h4>Інші моди:</h4>
        <ul className="space-y-1">
          {randoms.map((mod) => (
            <li key={mod.slug} className=" p-2 rounded hover:opacity-90 transition hover:shadow">
              <Link href={`/mods/${mod.gameSlug}/${mod.slug}`} className="block">
                <div className="flex gap-3 flex-col items-baseline">
                  <img
                    src={mod.image_first}
                    alt={mod.title}
                    className="size-20 object-cover rounded"
                    loading="lazy"
                  />
                  <div className="">
                    <div className="text-sm text-(--primary-color-1) font-medium">{mod.title}</div>
                    <div className="text-xs text-(--color-1)">{mod.game}</div>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
export default Sidebar;
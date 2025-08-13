import type { ModData } from "@/types/ModsData";

function stableHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 31 + str.charCodeAt(i)) % 100000;
  }
  return hash;
}

export function pickStableMods(
  all: ModData[],
  currentMod: ModData,
  count: number
): ModData[] {const pool = all.filter(m => m.slug !== currentMod.slug && m.game === currentMod.game);
  return pool
    .sort((a, b) => stableHash(a.slug + currentMod.slug) - stableHash(b.slug + currentMod.slug))
    .slice(0, count);
}

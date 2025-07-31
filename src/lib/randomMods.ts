import type { ModData } from "@/types/ModsData";

export function pickRandomMods(all: ModData[], count: number, excludeSlug?: string): ModData[] {
  const pool = excludeSlug ? all.filter((m) => m.slug !== excludeSlug) : [...all];

  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }

  return pool.slice(0, Math.min(count, pool.length));
}

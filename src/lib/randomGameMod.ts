import type { ModData } from "@/types/ModsData";

// Хеш-функція для створення "випадкового" але стабільного порядку
function stableHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0; // перетворюємо в 32-бітне число
  }
  return Math.abs(hash);
}

export function pickStableMods(
  all: ModData[],
  count: number,
  currentMod: ModData
): ModData[] {
  // Фільтруємо моди по грі (беремо ті ж, що і в поточного мода)
  const pool = all.filter(
    (m) =>
      m.slug !== currentMod.slug &&
      (m.game === currentMod.game ||
        m.game_collection === currentMod.game_collection)
  );


  const hash = stableHash(currentMod.slug);
  const sorted = [...pool].sort((a, b) => {
    const ha = stableHash(a.slug + hash);
    const hb = stableHash(b.slug + hash);
    return ha - hb;
  });

  return sorted.slice(0, Math.min(count, sorted.length));
}

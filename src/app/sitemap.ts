// app/sitemap.ts
import { getSortedModsData } from "@/lib/mods"; 
import type { ModData } from "@/types/ModsData";
import { MetadataRoute } from "next";

function resolveLastModified(mod: ModData): string {
 
  if ("updated" in mod && mod.updated) {
    return new Date(mod.updated).toISOString();
  }
  if (mod.date) {
    return new Date(mod.date).toISOString();
  }
  return new Date().toISOString();
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://fsbox.pp.ua";
  const mods = await getSortedModsData();

  const modEntries: MetadataRoute.Sitemap = mods.map((mod) => ({
    url: `${baseUrl}/mods/${mod.game}/${mod.slug}`,
    lastModified: resolveLastModified(mod),
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date().toISOString(),
    },
    ...modEntries,
  ];
}

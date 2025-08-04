import { getSortedModsData } from "@/lib/mods";
import type { ModData } from "@/types/ModsData";
import { NextResponse } from "next/server";

function resolveLastModified(mod: ModData): string {
  if ("updated" in mod && mod.updated) {
    const d = new Date(mod.updated);
    if (!isNaN(d.valueOf())) return d.toISOString();
  }
  if (mod.date) {
    const d = new Date(mod.date);
    if (!isNaN(d.valueOf())) return d.toISOString();
  }
  return new Date().toISOString();
}

export async function GET() {
  const baseUrl = "https://fsbox.pp.ua";
  const mods = await getSortedModsData();

  const validMods = mods.filter(
    (m): m is ModData & { slug: string; gameSlug: string } =>
      typeof m.slug === "string" && typeof m.gameSlug === "string"
  );

  const urls = [
    {
      loc: baseUrl,
      lastmod: new Date().toISOString(),
    },
    ...validMods.map((mod) => ({
      loc: `${baseUrl}/mods/${encodeURIComponent(mod.gameSlug)}/${encodeURIComponent(mod.slug)}`,
      lastmod: resolveLastModified(mod),
    })),
  ];

  const xmlParts = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls.map(
      (u) => `
  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
  </url>`
    ),
    "</urlset>",
  ];

  const xml = xmlParts.join("").trim();

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}

import { getSortedModsData } from "@/lib/mods";
import type { ModData } from "@/types/ModsData";
import { NextResponse } from "next/server";

function formatDate(date: Date): string {
  return date.toISOString().split("T")[0];
}

function resolveLastModified(mod: ModData): string {
  if ("updated" in mod && mod.updated) {
    const d = new Date(mod.updated);
    if (!isNaN(d.valueOf())) return formatDate(d);
  }
  if (mod.date) {
    const d = new Date(mod.date);
    if (!isNaN(d.valueOf())) return formatDate(d);
  }
  return formatDate(new Date());
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET() {
  try {
    const baseUrl = "https://fsbox.pp.ua";
    const mods = await getSortedModsData();

    const validMods = mods.filter(
      (m): m is ModData & { slug: string; gameSlug: string } =>
        typeof m.slug === "string" && 
        typeof m.gameSlug === "string" &&
        m.slug.length > 0 && 
        m.gameSlug.length > 0
    );

    const urls = [
      {
        loc: baseUrl,
        lastmod: formatDate(new Date()),
        changefreq: 'daily',
        priority: '1.0'
      },
      ...validMods.map((mod) => ({
        loc: `${baseUrl}/mods/${encodeURIComponent(mod.gameSlug)}/${encodeURIComponent(mod.slug)}`,
        lastmod: resolveLastModified(mod),
        changefreq: 'weekly',
        priority: '0.8'
      })),
    ];

    const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${escapeXml(url.loc)}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

    return new NextResponse(xmlContent, {
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
      },
    });

  } catch (error) {
    console.error('Sitemap generation error:', error);
    
    const fallbackXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://fsbox.pp.ua</loc>
    <lastmod>${formatDate(new Date())}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`;

    return new NextResponse(fallbackXml, {
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
      },
    });
  }
}
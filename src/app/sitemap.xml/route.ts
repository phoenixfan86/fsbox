import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const hostname = "https://fsbox.pp.ua";
const modsDirectory = path.join(process.cwd(), "src", "data", "mods");

function getAllModUrls() {
  if (!fs.existsSync(modsDirectory)) return [];

  const urls: string[] = [];
  const games = fs.readdirSync(modsDirectory);

  for (const game of games) {
    const gamePath = path.join(modsDirectory, game);
    if (!fs.existsSync(gamePath)) continue;

    const filenames = fs.readdirSync(gamePath);
    for (const filename of filenames) {
      if (!filename.endsWith(".md")) continue;

      const { mtime } = fs.statSync(path.join(gamePath, filename));
      const { data } = matter(fs.readFileSync(path.join(gamePath, filename), "utf8"));
      const basePath = (data?.game_collection || "").replace(/\/+$/, "");
      const slug = filename.replace(/\.md$/, "");
      const urlPath = `${basePath}/${slug}`.replace(/\/+/g, "/");

      urls.push(`
  <url>
    <loc>${hostname}${urlPath}</loc>
    <lastmod>${mtime.toISOString().split("T")[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`);
    }
  }

  return urls.join("");
}

export async function GET() {
  const urls = getAllModUrls();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${hostname}/</loc>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  ${urls}
</urlset>`;

  return new NextResponse(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, must-revalidate",
      "X-Robots-Tag": "all",
    },
  });
}

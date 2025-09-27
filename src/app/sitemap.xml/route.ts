import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const modsDirectory = path.join(process.cwd(), "src", "data", "mods");

function getAllModUrls() {
  if (!fs.existsSync(modsDirectory)) return [];
  const games = fs.readdirSync(modsDirectory);
  const urls: string[] = [];

  for (const game of games) {
    const gamePath = path.join(modsDirectory, game);
    if (!fs.existsSync(gamePath)) continue;
    const filenames = fs.readdirSync(gamePath);

    for (const filename of filenames) {
      if (!filename.endsWith(".md")) continue;
      const fullPath = path.join(gamePath, filename);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContents);
      const modUrl = `${data.game_collection}/${filename.replace(/\.md$/, "")}`;
      urls.push(modUrl);
    }
  }
  return urls;
}

export async function GET() {
  const urls = getAllModUrls();

  const urlset = urls.map(u => `
  <url>
    <loc>https://fsbox.pp.ua/${u}</loc>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`).join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlset}
</urlset>`;

  return new NextResponse(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "no-cache, no-store, must-revalidate",
    },
  });
}

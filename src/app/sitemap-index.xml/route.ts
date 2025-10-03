import { SitemapStream, streamToPromise } from "sitemap";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const hostname = "https://fsbox.pp.ua";
const modsDirectory = path.join(process.cwd(), "src", "data", "mods");

function getAllModUrls() {
  if (!fs.existsSync(modsDirectory)) return [];

  const games = fs.readdirSync(modsDirectory);
  const urls: { url: string; changefreq: string; priority: number }[] = [];

  for (const game of games) {
    const gamePath = path.join(modsDirectory, game);
    if (!fs.existsSync(gamePath)) continue;

    const filenames = fs.readdirSync(gamePath);
    for (const filename of filenames) {
      if (!filename.endsWith(".md")) continue;

      const fullPath = path.join(gamePath, filename);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContents);

      let basePath = (data?.game_collection || "").replace(/\/+$/, "");
      const slug = filename.replace(/\.md$/, "");
      const urlPath = `${basePath}/${slug}`.replace(/\/+/g, "/");

      urls.push({
        url: urlPath,
        changefreq: "weekly",
        priority: 0.8,
      });
    }
  }

  return urls;
}

export async function GET() {
  const smStream = new SitemapStream({ hostname });

  // Статичні сторінки
  smStream.write({ url: "/", changefreq: "daily", priority: 1.0 });
  smStream.write({ url: "/mods", changefreq: "weekly", priority: 0.8 });

  // Динамічні моди
  const modUrls = getAllModUrls();
  modUrls.forEach((u) => smStream.write(u));

  smStream.end();

  const buffer = await streamToPromise(smStream);
  const xmlString = buffer.toString("utf-8");

   const ts = new Date().toISOString();

  return new NextResponse(xmlString.replace(/^\uFEFF/, ""), {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, must-revalidate",
    },
  });
}

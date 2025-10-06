import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const hostname = "https://fsbox.pp.ua";
const modsDirectory = path.join(process.cwd(), "src", "data", "mods");

interface ModUrl {
  loc: string;
  lastmod: string;
  changefreq: string;
  priority: number;
}

function getAllModUrls(): ModUrl[] {
  if (!fs.existsSync(modsDirectory)) return [];

  const urls: ModUrl[] = [];
  const games = fs.readdirSync(modsDirectory);

  for (const game of games) {
    const gamePath = path.join(modsDirectory, game);
    if (!fs.statSync(gamePath).isDirectory()) continue;

    const filenames = fs.readdirSync(gamePath);
    for (const filename of filenames) {
      if (!filename.endsWith(".md")) continue;

      try {
        const fullPath = path.join(gamePath, filename);
        const { mtime } = fs.statSync(fullPath);
        const fileContents = fs.readFileSync(fullPath, "utf8");
        const { data } = matter(fileContents);

        const basePath = (data?.game_collection || "").replace(/\/+$/, "");
        const slug = filename.replace(/\.md$/, "");
        const urlPath = `${basePath}/${slug}`.replace(/\/+/g, "/");

        // Переконуємося що URL правильний
        const fullUrl = `${hostname}${urlPath}`;
        
        urls.push({
          loc: fullUrl,
          lastmod: mtime.toISOString(),
          changefreq: "weekly",
          priority: 0.8,
        });
      } catch (error) {
        console.error(`Error processing ${filename}:`, error);
        continue;
      }
    }
  }

  return urls;
}

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  try {
    const modUrls = getAllModUrls();
    const currentDate = new Date().toISOString();

    // Статичні сторінки
    const staticPages = [
      { loc: `${hostname}/`, lastmod: currentDate, changefreq: "daily", priority: 1.0 },
      { loc: `${hostname}/mods`, lastmod: currentDate, changefreq: "daily", priority: 0.9 },
      { loc: `${hostname}/mods/minecraft`, lastmod: currentDate, changefreq: "daily", priority: 0.9 },
      { loc: `${hostname}/articles`, lastmod: currentDate, changefreq: "weekly", priority: 0.7 },
      { loc: `${hostname}/game-servers`, lastmod: currentDate, changefreq: "weekly", priority: 0.7 },
    ];

    // Об'єднуємо всі URL
    const allUrls = [...staticPages, ...modUrls];

    // Генеруємо XML
    const urlEntries = allUrls
      .map((url) => {
        return `  <url>
    <loc>${escapeXml(url.loc)}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`;
      })
      .join("\n");

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${urlEntries}
</urlset>`;

    return new NextResponse(xml, {
      status: 200,
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
        "X-Robots-Tag": "all",
      },
    });
  } catch (error) {
    console.error("Sitemap generation error:", error);
    return new NextResponse("Error generating sitemap", { status: 500 });
  }
}

// Додатково: robots.txt helper
export function generateRobotsTxt(): string {
  return `# https://www.robotstxt.org/robotstxt.html
User-agent: *
Allow: /

# Sitemaps
Sitemap: ${hostname}/sitemap.xml

# Disallow admin pages if any
# Disallow: /admin/
# Disallow: /api/
`;
}
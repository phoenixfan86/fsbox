// src/app/sitemap.xml/route.js
import fs from "fs";
import path from "path";
import matter from "gray-matter";

function getAllModUrls() {
  const modsDirectory = path.join(process.cwd(), "src/data/mods");
  
  if (!fs.existsSync(modsDirectory)) return [];
  
  const games = fs.readdirSync(modsDirectory);
  const urls = [];
  
  for (const game of games) {
    const gamePath = path.join(modsDirectory, game);
    if (!fs.existsSync(gamePath)) continue;
    
    const filenames = fs.readdirSync(gamePath);
    for (const filename of filenames) {
      if (!filename.endsWith(".md")) continue;
      
      const fullPath = path.join(gamePath, filename);
      const { data } = matter(fs.readFileSync(fullPath, "utf8"));
      const modUrl = `${data.game_collection}/${filename.replace(/\.md$/, "")}`;
      urls.push(modUrl);
    }
  }
  
  return urls;
}

export async function GET() {
  try {
    const urls = getAllModUrls();
    
    const xmlUrls = urls.map(u => `  <url>
    <loc>https://fsbox.pp.ua/${u}</loc>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`).join("\n");
    
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://fsbox.pp.ua</loc>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
${xmlUrls}
</urlset>`;

    return new Response(xml, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return new Response('Error generating sitemap', { status: 500 });
  }
}
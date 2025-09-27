const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

const modsDirectory = path.join(process.cwd(), "src/data/mods");

const publicPath = path.join(process.cwd(), "public", "sitemap.xml");

function getAllModUrls() {
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

const urls = getAllModUrls();
const xmlUrls = urls.map(u => `
  <url>
    <loc>https://fsbox.pp.ua/${u}</loc>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`).join("");

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlUrls}
</urlset>`;

fs.writeFileSync(publicPath, xml, "utf8");
console.log(`✅ sitemap.xml generated in /public (${urls.length} URLs)`);

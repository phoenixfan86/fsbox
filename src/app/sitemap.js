// src/app/sitemap.js
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

export default function sitemap() {
  const urls = getAllModUrls();
  
  const sitemapEntries = urls.map(url => ({
    url: `https://fsbox.pp.ua/${url}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [
    {
      url: 'https://fsbox.pp.ua',
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    ...sitemapEntries,
  ];
}
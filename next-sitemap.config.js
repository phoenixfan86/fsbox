// next-sitemap.config.js
const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

// Правильний шлях до твоїх md-файлів
const modsDirectory = path.join(process.cwd(), "src", "data", "mods");

// Функція, яка повертає усі URL модів
function getAllModUrls() {
  const games = fs.readdirSync(modsDirectory);
  let urls = [];

  for (const game of games) {
    const gamePath = path.join(modsDirectory, game);
    const filenames = fs.readdirSync(gamePath);

    for (const filename of filenames) {
      if (!filename.endsWith(".md")) continue;

      const fullPath = path.join(gamePath, filename);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContents);

      // Формуємо URL модів
      const modUrl = `${data.game_collection}/${filename.replace(/\.md$/, "")}`;
      urls.push(modUrl);
    }
  }

  return urls;
}

module.exports = {
  siteUrl: "https://fsbox.pp.ua",
  generateRobotsTxt: true,
  sitemapSize: 5000, // щоб всі URL потрапили в один файл
  outDir: "./public",

  // Додаємо динамічні URL модів
  additionalPaths: async (config) => {
    const modUrls = getAllModUrls();
    return modUrls.map((url) => ({
      loc: url,
      lastmod: new Date().toISOString(),
      changefreq: "weekly",
      priority: 0.8,
    }));
  },

  transform: async (config, url) => {
    return {
      loc: url,
      changefreq: "weekly",
      priority: 0.8,
      lastmod: new Date().toISOString(),
    };
  },
};

/** @type {import('next-sitemap').IConfig} */
const { getSortedModsData } = require('./lib/mods');

module.exports = {
  siteUrl: 'https://fsbox.pp.ua',
  generateRobotsTxt: true,
  sitemapSize: 5000,

  // Додаємо кастомні сторінки / моди
  async additionalPaths(config) {
    const mods = await getSortedModsData();

    const validMods = mods.filter(
      m => typeof m.slug === 'string' && typeof m.gameSlug === 'string'
    );

    return validMods.map(mod => ({
      loc: `/mods/${mod.gameSlug}/${mod.slug}`,
      lastmod: mod.updated || mod.date || new Date().toISOString().split('T')[0],
    }));
  },
};

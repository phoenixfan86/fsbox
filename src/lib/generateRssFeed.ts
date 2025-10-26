import fs from "fs";
import path from "path";
import { getSortedModsData } from "@/lib/mods";
import RSS from "rss";

export async function generateRssFeed(returnAsString = false) {
  const mods = getSortedModsData();

  const feed = new RSS({
    title: "FSBox game mods Feed",
    description: "Останні моди з FSBox",
    site_url: "https://fsbox.pp.ua",
    feed_url: "https://fsbox.pp.ua/rss.xml",
    language: "uk",
  });

  mods.forEach((mod) => {
    feed.item({
      title: mod.title_ua,
      description: mod.description,
      url: `https://fsbox.pp.ua${mod.game_collection}/${mod.slug}`,
      date: mod.date,
    });
  });

  const xml = feed.xml({ indent: true });

  if (returnAsString) {
    return xml;
  }

  const outputPath = path.join(process.cwd(), "public", "rss.xml");
  fs.writeFileSync(outputPath, xml);
}

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { ModData } from "@/types/ModsData";

const modsDirectory = path.join(process.cwd(), "src", "mods");

export function getSortedModsData(): ModData[] {
  const games = fs.readdirSync(modsDirectory);

  let allMods: ModData[] = [];

  for (const game of games) {
    const gamePath = path.join(modsDirectory, game);
    const filenames = fs.readdirSync(gamePath);

    for (const filename of filenames) {
      if (!filename.endsWith(".md")) continue;

      const fullPath = path.join(gamePath, filename);
      const fileContents = fs.readFileSync(fullPath, "utf8");

      const { data, content } = matter(fileContents);

      const slug = filename.replace(/\.md$/, "");

      allMods.push({
        slug,
        title: data.title,
        mod_name: data.mod_name,
        game: data.game,
        gameSlug: game,
        date: data.date,
        tags: data.tags || [],
        image_first: data.image_first || "",
        image_second: data.image_second || "",
        author: data.author,
        author_link: data.author_link || "",
        download_link: data.download_link || "",
        mod_dependencies: data.mod_dependencies || undefined,
        dependencies_link: data.dependencies_link || undefined,
        content,
      });
    }
  }

  return allMods.sort((a, b) => (a.date < b.date ? 1 : -1));
}


export function getModData(slug: string | string[]): ModData {
  let game: string;
  let file: string;

  if (Array.isArray(slug)) {
    [game, file] = slug;
  } else {
    [game, file] = slug.split("/");
  }

  const fullPath = path.join(modsDirectory, game, `${file}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const { data, content } = matter(fileContents);

  return {
    slug: file,
    game: data.game,
    title: data.title,
    mod_name: data.mod_name,
    date: data.date,
    tags: data.tags || [],
    image_first: data.image_first || "",
    image_second: data.image_second || "",
    author: data.author,
    author_link: data.author_link || "",
    download_link: data.download_link || "",
    mod_dependencies: data.mod_dependencies || undefined,
    dependencies_link: data.dependencies_link || undefined,
    content,
  };
}

export function getAllGames(): string[] {
  return fs
    .readdirSync(modsDirectory)
    .filter((folder) => {
      const folderPath = path.join(modsDirectory, folder);
      return fs.statSync(folderPath).isDirectory();
    });
}

export function getModsByGame(game: string): ModData[] {
  const gamePath = path.join(modsDirectory, game);
  if (!fs.existsSync(gamePath)) return [];

  const fileNames = fs.readdirSync(gamePath);
  return fileNames.map((fileName) => {
    const fullPath = path.join(gamePath, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      ...(data as ModData),
      content,
      slug: `${game}/${fileName.replace(/\.md$/, "")}`,
    };
  });
}





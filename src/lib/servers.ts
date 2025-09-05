import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { ServerData } from "@/types/ServerData";

const serversDirectory = path.join(process.cwd(), "src", "data", "gameServers");

export function getSortedServerData(): ServerData[] {
  const servers = fs.readdirSync(serversDirectory);

  let allServers: ServerData[] = [];

  for (const server of servers) {
    const serverPath = path.join(serversDirectory, server);
    const filenames = fs.readdirSync(serverPath);

    for (const filename of filenames) {
      if (!filename.endsWith(".md")) continue;

      const fullPath = path.join(serverPath, filename);
      const fileContents = fs.readFileSync(fullPath, "utf8");

      const { data, content } = matter(fileContents);

      const slug = filename.replace(/\.md$/, "");

      allServers.push({
        slug,
        title: data.title,
        title_ua: data.title_ua,
        server_name: data.server_name,
        description: data.description,
        game: data.game,
        game_collection: data.game_collection,
        gameSlug: server,
        game_version: data.game_version,
        date: data.date,
        tags: data.tags || [],
        server_image: data.server_image || "",
        server_link: data.server_link || "",
        server_ip: data.server_ip || "",
        server_port: data.server_port || "",
        content,
      });
    }
  }

  return allServers.sort((a, b) => (a.date < b.date ? 1 : -1));
}


export function getServerData(slug: string | string[]): ServerData {
  let server: string;
  let file: string;

  if (Array.isArray(slug)) {
    [server, file] = slug;
  } else {
    [server, file] = slug.split("/");
  }

  const fullPath = path.join(serversDirectory, server, `${file}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const { data, content } = matter(fileContents);

  return {
    slug: file,
    game: data.game,
    game_collection: data.game_collection,
    title: data.title,
    title_ua: data.title_ua,
    server_name: data.server_name,
    description: data.description,
    game_version: data.game_version,
    date: data.date,
    tags: data.tags || [],
    server_online: data.server_online || "",
    server_image: data.server_image || "",
    server_link: data.server_link || "",
    server_ip: data.server_ip || "",
    server_port: data.server_port || "",
    server_discord: data.server_discord || "",
    content,
  };
}

export function getAllServers(): { slug: string; name: string }[] {
  return fs
    .readdirSync(serversDirectory)
    .filter((folder) => {
      const folderPath = path.join(serversDirectory, folder);
      return fs.statSync(folderPath).isDirectory();
    })
    .map((folder) => {
      const folderPath = path.join(serversDirectory, folder);
      const files = fs.readdirSync(folderPath);
      const firstMd = files.find((f) => f.endsWith(".md"));
      
      if (!firstMd) {
        return { slug: folder, name: folder };
      }

      const fileContents = fs.readFileSync(path.join(folderPath, firstMd), "utf8");
      const { data } = matter(fileContents);
      return {
        slug: folder,
        name: data.game || folder,
      };
    });
}


{/*export function getModsByGame(game: string): ServerData[] {
  const gamePath = path.join(serversDirectory, game);
  if (!fs.existsSync(gamePath)) return [];

  const fileNames = fs.readdirSync(gamePath);
  return fileNames.map((fileName) => {
    const fullPath = path.join(gamePath, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      ...(data as ServerData),
      content,
      slug: `${game}/${fileName.replace(/\.md$/, "")}`,
    };
  });
*/}

{/*export function searchMods(query: string): ServerData[] {
  const allMods = getSortedServerData();
  const lowerQuery = query.toLowerCase().trim();

  if (!lowerQuery) return allMods;

  return allMods.filter((mod) =>
    mod.mod_name?.toLowerCase().includes(lowerQuery) ||
    mod.title?.toLowerCase().includes(lowerQuery) ||
    mod.tags?.some((tag) => tag.toLowerCase().includes(lowerQuery)) ||
    mod.content?.toLowerCase().includes(lowerQuery)
  );
}*/}

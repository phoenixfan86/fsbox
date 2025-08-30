import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { ArticleData } from "@/types/ArticleData";

const articlesDirectory = path.join(process.cwd(), "src", "data", "articles");


//Виводить всі статті
export function getSortedArticlesData(): ArticleData[] {
  const articles = fs.readdirSync(articlesDirectory);

  let allArticles: ArticleData[] = [];

  for (const article of articles) {
    const articlePath = path.join(articlesDirectory, article);
    const filenames = fs.readdirSync(articlePath);

    for (const filename of filenames) {
      if (!filename.endsWith(".md")) continue;

      const fullPath = path.join(articlePath, filename);
      const fileContents = fs.readFileSync(fullPath, "utf8");

      const { data, content } = matter(fileContents);

      const slug = filename.replace(/\.md$/, "");

      allArticles.push({
        slug,
        title: data.title,
        title_ua: data.title_ua,
        description: data.description,
        game: data.game,
        game_collection: data.game_collection,
        gameSlug: article,
        article_type: data.article_type || "",
        article_img: data.article_img || [],
        link: data.link,
        link_text: data.link_text || "",
        video_link: data.video_link || "",
        date: data.date,
        tags: data.tags || [],
        content,
      });
    }
  }

  return allArticles.sort((a, b) => (a.date < b.date ? 1 : -1));
}

//Відображення конкретної статті 
export function getArticleData(slug: string | string[]): ArticleData {
  let article: string;
  let file: string;

  if (Array.isArray(slug)) {
    [article, file] = slug;
  } else {
    [article, file] = slug.split("/");
  }

  const fullPath = path.join(articlesDirectory, article, `${file}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const { data, content } = matter(fileContents);

  return {
    slug: file,
    game: data.game,
    game_collection: data.game_collection,
    title: data.title,
    title_ua: data.title_ua,
    description: data.description,
    date: data.date,
    tags: data.tags || [],
    article_type: data.article_type || "",
    article_img: data.article_img || [],
    link: data.link,
    link_text: data.link_text || "",
    video_link: data.video_link || "",
    content,
  };
}

export function getAllArticles(): { slug: string; name: string }[] {
  return fs
    .readdirSync(articlesDirectory)
    .filter((folder) => {
      const folderPath = path.join(articlesDirectory, folder);
      return fs.statSync(folderPath).isDirectory();
    })
    .map((folder) => {
      const folderPath = path.join(articlesDirectory, folder);
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

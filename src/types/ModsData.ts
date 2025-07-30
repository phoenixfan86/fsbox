export type ModData = {
  title: string;
  mod_name: string;
  game: string;
  date: string;
  tags: string[];
  image_first: string;
  image_second: string;
  author: string;
  author_link: string;
  download_link: string;
  mod_dependencies?: string;
  dependencies_link?: string;
  slug: string;
  content: string;
};
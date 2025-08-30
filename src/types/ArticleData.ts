export type ArticleData = {
  title: string;
  title_ua: string;
  description: string;
  game: string;
  game_collection?:string;
  gameSlug?: string;
  date: string;
  updated?: string;
  tags?: string[];
  article_type?: string;
  article_img?: string[];
  link?: string;
  link_text?:string;
  video_link?: string;
  slug: string;
  content: string;
};
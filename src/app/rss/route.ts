import { generateRssFeed } from "@/lib/generateRssFeed";

export async function GET() {
  const xml = await generateRssFeed(true);

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}

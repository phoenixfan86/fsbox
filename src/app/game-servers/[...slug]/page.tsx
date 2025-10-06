import { getServerData } from "@/lib/servers";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Markdown from "react-markdown";
import { ServerData } from "@/types/ServerData";
import { stripMarkdown } from "@/lib/stripMarkDown";
import CopyText from "@/components/CopyText";


type SlugParams = Promise<{ slug: string[] }>;

function getLastVersion(server: ServerData) {
  return server.tags?.[server.tags.length - 1] ?? ''
}

export async function generateMetadata({ params }: { params: SlugParams }): Promise<Metadata> {
  const { slug } = await params;
  const slugPatch = slug.join("/");
  const canonical = `https://fsbox.pp.ua/game-servers/${slugPatch}`
  const server: ServerData = getServerData(slugPatch);
  if (!server) return {};

  const title = server.title;
  const lastVersion = getLastVersion(server)
  const description = `${stripMarkdown(server.description).slice(0, 150)}...`

  return {
    alternates: { canonical },
    title: `${server.title} for ${server.game} ${lastVersion}`,
    description,
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "FSBox",
      type: "article",
      images: server.server_image ? [
        {
          url: server.server_image,
          width: 300,
          alt: server.title,
        },
      ] : [],
    }
  };
}

export default async function serverPage({ params }: { params: SlugParams }) {
  const { slug } = await params;

  if (!slug || slug.length !== 2) {
    return notFound();
  }

  const [game, file] = slug;
  const slugPath = `${game}/${file}`;
  const server = getServerData(slugPath);
  const lastVersion = getLastVersion(server);

  if (!server) return notFound();


  return (
    <div className="md:w-[80%] py-[15px] px-[20px] md:py-[25px] md:px-[30px] shadow">
      <h1 className="text-3xl font-bold mb-2">{server.title_ua} для {server.game} {lastVersion}</h1>
      <div className="flex justify-between">
        <p className="text-xs text-(--color-4) mb-4">Додано: {server.date}</p>
        <span className="text-xs text-(--color-4) mb-4">Максимально онлайн: <span className="text-(--primary-color-1)">{server.server_online}</span></span>
      </div>
      <div className="mb-5 space-x-2">
        {(server.tags ?? []).map((tag) => (
          <span
            key={tag}
            className="text-xs bg-gray-200 hover:text-white hover:bg-(--primary-color-1) duration-300 px-2 py-1 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="flex flex-col md:flex-row gap-4 items-center justify-center pt-5">
        <img
          src={server.server_image}
          alt={`Скріншот мода ${server.title_ua} для ${server.game}`}
          width={300}
          height={100}
          className="postImg rounded mb-6"
        />
      </div>
      <div className="flex gap-5 flex-col mt-5">
        <h3 className="text-xl text-center">Опис сервера {server.server_name}</h3>
        <div className="description text-sm text-(--color-3)">
          <Markdown>{server.content}</Markdown>
        </div>
      </div>
      {server.server_link && (
        <div className="flex flex-col items-start mt-6">
          <span className="font-bold">Посилання на сервер: </span>
          <div className="">
            <ul className="flex gap-2 flex-col bg-(--bg-3) py-1 px-3 !text-(--primary-color-1) mt-2 rounded-sm">
              <li className="flex gap-3 justify-between shadow">
                <span>Сайт: </span>
                {server.server_link === "/" ? (
                  "Відсутній"
                ) : (
                  <a
                    href={server.server_link}
                    target="_blank"
                    rel="noopener noreferrer noindex"
                    className="!text-(--color-1)"
                    aria-label={`Discord ${server.title}`}
                  >
                    {server.title}
                  </a>
                )}
              </li>
              <li className="flex gap-3 justify-between shadow">
                <span>IP: </span>
                <CopyText text={server.server_ip ?? ""} label={`IP ${server.title}`} />
              </li>
              {server.server_port && (
                <li className="flex gap-3 justify-between shadow">
                  <span >PORT: </span>
                  <CopyText text={server.server_port ?? ""} label={`Port ${server.title}`} />
                </li>
              )}
              <li className="flex gap-3 justify-between mt-3">
                <span >Discord: </span>
                {server.server_discord === "/" ? (
                  "Відсутній"
                ) : (
                  <a
                    href={server.server_discord}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="!text-(--color-1)"
                    aria-label={`Discord ${server.title}`}
                  >
                    {server.server_discord}
                  </a>
                )}
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

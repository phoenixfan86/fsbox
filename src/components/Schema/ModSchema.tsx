import { ModData } from "@/types/ModsData";
import { stripMarkdown } from "@/lib/stripMarkDown";
import JsonLd from "@/components/JsonLd";

interface ModSchemaProps {
  mod: ModData
  lastVersion: string
}

export function ModSchema({ mod, lastVersion }: ModSchemaProps) {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: mod.mod_name || mod.title_ua,
    applicationCategory: "GameApplication",
    operatingSystem: "Windows, Linux, macOS",
    isRelatedTo: {
      "@type": "VideoGame",
      name: mod.game,
    },
    description: stripMarkdown(mod.description).substring(0, 152).split(" ").slice(0, -1).join(" "),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "53",
    },
    author: { "@type": "Person", name: mod.author },
    publisher: { "@type": "Organization", name: "FSBox" },
    datePublished: new Date(mod.date).toISOString().split("T")[0],
    version: lastVersion,
    url: `https://fsbox.pp.ua/mods/${mod.slug}`,
    image: mod.image_first,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      url: mod.download_link ?? `https://fsbox.pp.ua/mods/${mod.slug}`,
    },
  }

  return <JsonLd data={schemaData} />
}

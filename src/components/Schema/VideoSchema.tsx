interface VideoSchemaProps {
  videoLink: string
  modName: string
  modTitle: string
  date: string
}

export function VideoSchema({
  videoLink,
  modName,
  modTitle,
  date
}: VideoSchemaProps) {
  // Витягуємо YouTube ID
  const match = videoLink.match(/embed\/([a-zA-Z0-9_-]{11})/)
  const youtubeId = match?.[1]

  if (!youtubeId) return null

  const schema = {
    "@type": "VideoObject",
    name: `Огляд, гайд та туторіал моду ${modName}`,
    description: `Детальний огляд моду ${modTitle}.`,
    thumbnailUrl: `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`,
    uploadDate: date,
    contentUrl: `https://youtu.be/${youtubeId}`,
    embedUrl: videoLink,
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  )
}
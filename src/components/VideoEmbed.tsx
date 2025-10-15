interface VideoEmbedProps {
  videoLink: string
  modName: string
}

export function VideoEmbed({ videoLink, modName }: VideoEmbedProps) {
  if (!videoLink) return null

  return (
    <section className="my-8 w-full">
      <h2 className="text-lg font-semibold mb-4">
        Огляд, гайд та туторіал моду {modName}
      </h2>

      <div
        className="relative w-full bg-black rounded-lg overflow-hidden"
        style={{ paddingBottom: '56.25%' }}
      >
        <iframe
          className="absolute top-0 left-0 w-full h-full rounded-lg"
          src={videoLink}
          title={`Огляд, гайд та туторіал мода ${modName}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
        />
      </div>

      <p className="mt-3 text-sm text-gray-600">
        На цьому відео ви дізнаєтесь як встановити та користуватися модом {modName}.
      </p>
    </section>
  )
}
// lib/imageOptimizer.ts
export interface ImageOptions {
  width?: number
  height?: number
  quality?: number
  format?: 'webp' | 'avif' | 'jpg' | 'png'
  blur?: number
  fit?: 'contain' | 'cover' | 'fill' | 'inside' | 'outside'
}

/**
 * Оптимізує зображення через weserv.nl
 */
export function getOptimizedImageUrl(
  src: string,
  options: ImageOptions = {}
): string {
  if (src.startsWith('/')) return src
  if (src.includes('images.weserv.nl')) return src

  const {
    width,
    height,
    quality = 75,
    format = 'webp',
    blur,
    fit = 'cover',
  } = options

  const params = new URLSearchParams()
  params.append('url', src)

  if (width) params.append('w', width.toString())
  if (height) params.append('h', height.toString())

  params.append('q', quality.toString())
  params.append('output', format)
  params.append('fit', fit)
  params.append('il', '') // progressive
  params.append('n', '-1') // strip metadata

  if (blur) params.append('blur', blur.toString())

  return `https://images.weserv.nl/?${params.toString()}`
}

export function generateSrcSet(
  src: string,
  widths: number[] = [640, 768, 1024, 1280, 1536],
  quality: number = 75
): string {
  return widths
    .map((width) => {
      const url = getOptimizedImageUrl(src, { width, quality })
      return `${url} ${width}w`
    })
    .join(', ')
}

export function generateSizes(maxWidth: number): string {
  return `(max-width: 640px) 100vw, (max-width: 1024px) 50vw, ${maxWidth}px`
}

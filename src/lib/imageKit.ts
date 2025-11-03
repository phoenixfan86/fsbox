// lib/imagekit.ts
export interface ImageKitOptions {
  width?: number
  height?: number
  quality?: number
  format?: 'auto' | 'webp' | 'avif' | 'jpg' | 'png'
  blur?: number
  aspectRatio?: string
}

const IMAGEKIT_URL_ENDPOINT = 'https://ik.imagekit.io/9ahcnjyn8i' // Замініть на ваш endpoint

/**
 * Оптимізує зображення через ImageKit.io
 * @param src - URL оригінального зображення
 * @param options - параметри оптимізації
 */
export function getOptimizedImageUrl(
  src: string,
  options: ImageKitOptions = {}
): string {
  // Якщо це вже оптимізоване зображення або локальне - повертаємо як є
  if (src.startsWith(IMAGEKIT_URL_ENDPOINT) || src.startsWith('/')) {
    return src
  }

  const {
    width,
    height,
    quality = 75,
    format = 'auto',
    blur,
    aspectRatio,
  } = options

  // Створюємо transformation string для ImageKit
  const transformations: string[] = []

  if (width) transformations.push(`w-${width}`)
  if (height) transformations.push(`h-${height}`)
  if (quality) transformations.push(`q-${quality}`)
  if (format) transformations.push(`f-${format}`)
  if (blur) transformations.push(`bl-${blur}`)
  if (aspectRatio) transformations.push(`ar-${aspectRatio}`)

  // Progressive loading
  transformations.push('pr-true')

  const transformString = transformations.length > 0 
    ? `tr:${transformations.join(',')}` 
    : ''

  // Кодуємо URL зображення
  const encodedSrc = encodeURIComponent(src)

  return `${IMAGEKIT_URL_ENDPOINT}/${transformString}/${encodedSrc}`
}

/**
 * Генерує srcset для responsive зображень
 */
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
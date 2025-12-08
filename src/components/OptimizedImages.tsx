'use client'

import { getOptimizedImageUrl, generateSrcSet, generateSizes } from '@/lib/imageOptimizer'
import { useState, useRef, useEffect, CSSProperties, ImgHTMLAttributes } from 'react'

interface OptimizedImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  src: string
  alt: string
  width: number
  height?: number
  priority?: boolean
  quality?: number
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down'
  fit?: 'contain' | 'cover' | 'fill' | 'inside' | 'outside'
  responsive?: boolean
  showPlaceholder?: boolean
  aspectRatio?: string
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  priority = false, // Якщо true - це LCP картинка
  quality = 75,
  objectFit = 'cover',
  fit = 'inside',
  responsive = true,
  showPlaceholder = true,
  aspectRatio,
  className = '',
  style,
  ...props
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)

  // Якщо priority, ми вважаємо, що вона завантажена одразу (для CSS)
  // Це прибирає залежність від гідратації JS
  const isVisible = priority || isLoaded

  useEffect(() => {
    if (!priority && imgRef.current?.complete && imgRef.current.naturalWidth > 0) {
      setIsLoaded(true)
    }
  }, [priority])

  // Розрахунок висоти
  const calculatedHeight =
    height ||
    (aspectRatio
      ? Math.round(width / (Number(aspectRatio.split('/')[0]) / Number(aspectRatio.split('/')[1])))
      : undefined)

  // Розрахунок CSS Aspect Ratio для уникнення CLS
  const cssAspectRatio = aspectRatio
    ? aspectRatio.replace('/', ' / ')
    : (width && calculatedHeight ? `${width} / ${calculatedHeight}` : undefined)

  if (hasError) {
    return (
      <div
        className={`bg-gray-200 flex items-center justify-center ${className}`}
        style={{ width, height: calculatedHeight, aspectRatio: cssAspectRatio, ...style }}
      >
        <span className="text-gray-400 text-xs">Error</span>
      </div>
    )
  }

  const optimizedSrc = getOptimizedImageUrl(src, {
    width,
    height: calculatedHeight,
    quality,
    fit,
    format: 'webp',
  })

  const srcSet = responsive
    ? generateSrcSet(src, [640, 768, 1024, 1280, 1536], quality) // Стандартизовані розміри
    : undefined

  const sizes = responsive ? generateSizes(width) : undefined

  // НЕ показуємо плейсхолдер для LCP (priority) картинок - це економить запити
  const shouldShowPlaceholder = showPlaceholder && !priority && !isLoaded

  const placeholderSrc = shouldShowPlaceholder
    ? getOptimizedImageUrl(src, {
      width: 20,
      quality: 10,
      blur: 5,
      format: 'webp',
    })
    : undefined

  const containerStyle: CSSProperties = {
    position: 'relative',
    width: '100%', // Дозволяємо контейнеру бути гнучким
    maxWidth: width,
    aspectRatio: cssAspectRatio,
    height: calculatedHeight || 'auto',
    overflow: 'hidden',
    ...style, // Дозволяємо перезаписувати стилі ззовні
  }

  return (
    <div style={containerStyle} className={className}>
      {shouldShowPlaceholder && placeholderSrc && (
        <img
          src={placeholderSrc}
          alt=""
          aria-hidden="true"
          style={{
            width: '100%',
            height: '100%',
            objectFit,
            filter: 'blur(10px)',
            position: 'absolute',
            inset: 0,
            zIndex: 1,
          }}
        />
      )}

      <img
        ref={imgRef}
        src={optimizedSrc}
        srcSet={srcSet}
        sizes={sizes}
        alt={alt}
        width={width}
        height={calculatedHeight}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        // Важливо: для priority ставимо high, щоб браузер вантажив раніше за CSS/JS
        fetchPriority={priority ? 'high' : 'auto'}
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        style={{
          width: '100%',
          height: '100%',
          objectFit,
          // Ключовий момент: якщо priority, opacity завжди 1
          opacity: isVisible ? 1 : 0,
          transition: priority ? 'none' : 'opacity 0.4s ease-in-out',
          position: 'relative',
          zIndex: 2,
        }}
        {...props}
      />
    </div>
  )
}
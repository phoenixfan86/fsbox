// components/OptimizedImage.tsx
'use client'

import { getOptimizedImageUrl, generateSrcSet, ImageKitOptions } from '@/lib/imageKit'
import { useState, ImgHTMLAttributes } from 'react'

interface OptimizedImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  src: string
  alt: string
  width?: number
  height?: number
  priority?: boolean
  quality?: number
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down'
  responsive?: boolean
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  priority = false,
  quality = 75,
  objectFit = 'cover',
  responsive = true,
  className = '',
  ...props
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)

  // Якщо зображення має помилку, показуємо placeholder
  if (hasError) {
    return (
      <div
        className={`bg-gray-200 flex items-center justify-center ${className}`}
        style={{ width, height }}
      >
        <span className="text-gray-400">Зображення недоступне</span>
      </div>
    )
  }

  const optimizedSrc = getOptimizedImageUrl(src, { width, height, quality, format: 'auto' })

  // Генеруємо srcset для responsive зображень
  const srcSet = responsive && width
    ? generateSrcSet(src, [Math.floor(width * 0.5), width, Math.floor(width * 1.5)], quality)
    : undefined

  // Placeholder blur effect
  const blurDataUrl = getOptimizedImageUrl(src, { width: 10, quality: 10, blur: 10 })

  return (
    <img
      src={optimizedSrc}
      srcSet={srcSet}
      sizes={responsive && width ? `(max-width: ${width}px) 100vw, ${width}px` : undefined}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      onLoad={() => setIsLoaded(true)}
      onError={() => setHasError(true)}
      className={className}
      style={{
        objectFit,
        opacity: isLoaded ? 1 : 0,
        transition: 'opacity 0.3s ease-in-out',
        backgroundImage: !isLoaded ? `url(${blurDataUrl})` : undefined,
        backgroundSize: 'cover',
        ...props.style,
      }}
      {...props}
    />
  )
}
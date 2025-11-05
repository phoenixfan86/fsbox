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
  priority = false,
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


  useEffect(() => {
    if (imgRef.current?.complete && imgRef.current.naturalWidth > 0) {
      setIsLoaded(true)
    }
  }, [])

  const calculatedHeight =
    height ||
    (aspectRatio
      ? Math.round(width / (Number(aspectRatio.split('/')[0]) / Number(aspectRatio.split('/')[1])))
      : undefined)

  if (hasError) {
    return (
      <div
        className={`bg-gray-200 flex items-center justify-center ${className}`}
        style={{ width, height: calculatedHeight, ...style }}
      >
        <svg
          className="w-12 h-12 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
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
    ? generateSrcSet(src, [Math.floor(width * 0.5), width, Math.floor(width * 1.5)], quality)
    : undefined

  const sizes = responsive ? generateSizes(width) : undefined

  const placeholderSrc = showPlaceholder
    ? getOptimizedImageUrl(src, {
      width: 20,
      quality: 10,
      blur: 5,
      format: 'webp',
    })
    : undefined

  const containerStyle: CSSProperties = {
    position: 'relative',
    width,
    height: calculatedHeight || 'auto',
    overflow: 'hidden',
  }

  const imageStyle: CSSProperties = {
    width: '100%',
    height: calculatedHeight ? '100%' : 'auto',
    objectFit,
    opacity: isLoaded ? 1 : 0,
    transition: 'opacity 0.4s ease-in-out',
    position: 'relative',
    zIndex: 2,
    ...style,
  }

  const placeholderStyle: CSSProperties = {
    width: '100%',
    height: '100%',
    objectFit,
    filter: 'blur(10px)',
    position: 'absolute',
    inset: 0,
    transition: 'opacity 0.4s ease-in-out',
    opacity: isLoaded ? 0 : 1,
    zIndex: 1,
  }

  return (
    <div style={containerStyle} className={className}>
      {showPlaceholder && placeholderSrc && (
        <img
          src={placeholderSrc}
          alt="fsbox.pp.ua"
          aria-hidden
          style={placeholderStyle}
          decoding="async"
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
        fetchPriority={priority ? 'high' : 'auto'}
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        style={imageStyle}
        {...props}
      />
    </div>
  )
}

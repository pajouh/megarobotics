'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { ProductGalleryImage, SanityImage } from '@/types'
import { urlFor } from '@/lib/sanity'

interface ProductGalleryProps {
  mainImage?: SanityImage
  gallery?: ProductGalleryImage[]
  productName: string
}

export default function ProductGallery({ mainImage, gallery, productName }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  // Combine main image with gallery
  const allImages = [
    ...(mainImage ? [mainImage] : []),
    ...(gallery || []),
  ]

  if (allImages.length === 0) {
    return (
      <div className="aspect-square bg-gray-100 rounded-2xl flex items-center justify-center">
        <span className="text-6xl opacity-30">🤖</span>
      </div>
    )
  }

  const currentImage = allImages[selectedIndex]

  const goToPrevious = () => {
    setSelectedIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setSelectedIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1))
  }

  return (
    <>
      {/* Main Image */}
      <div className="space-y-4">
        <div
          className="relative aspect-square bg-gray-50 rounded-2xl overflow-hidden cursor-zoom-in"
          onClick={() => setLightboxOpen(true)}
        >
          <Image
            src={urlFor(currentImage).width(800).height(800).url()}
            alt={currentImage.alt || productName}
            fill
            className="object-contain p-6"
            priority
          />

          {/* Navigation Arrows */}
          {allImages.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  goToPrevious()
                }}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-gray-700" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  goToNext()
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-gray-700" />
              </button>
            </>
          )}
        </div>

        {/* Thumbnails */}
        {allImages.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-2">
            {allImages.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedIndex(index)}
                className={`relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-colors ${
                  index === selectedIndex
                    ? 'border-emerald-500'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Image
                  src={urlFor(image).width(160).height(160).url()}
                  alt={image.alt || `${productName} ${index + 1}`}
                  fill
                  className="object-contain p-1 bg-gray-50"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>

          {allImages.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  goToPrevious()
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  goToNext()
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>
            </>
          )}

          <div
            className="relative w-full max-w-4xl aspect-square mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={urlFor(currentImage).width(1200).height(1200).url()}
              alt={currentImage.alt || productName}
              fill
              className="object-contain"
            />
          </div>

          {/* Counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-white/10 rounded-full text-white text-sm">
            {selectedIndex + 1} / {allImages.length}
          </div>
        </div>
      )}
    </>
  )
}

'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react'

interface HeroBannerSlide {
  _id: string
  title: string
  subtitle?: string
  mediaType: 'image' | 'video' | 'youtube'
  imageUrl?: string
  videoUrl?: string
  youtubeUrl?: string
  overlayOpacity?: number
  textColor?: 'white' | 'dark'
  ctaButton?: {
    text?: string
    url?: string
    style?: 'primary' | 'secondary'
  }
  secondaryButton?: {
    text?: string
    url?: string
  }
}

interface HeroBannerProps {
  slides: HeroBannerSlide[]
  autoPlayInterval?: number
}

function extractYouTubeId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /youtube\.com\/shorts\/([^&\n?#]+)/,
  ]
  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match) return match[1]
  }
  return null
}

export default function HeroBanner({ slides, autoPlayInterval = 6000 }: HeroBannerProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const goToSlide = useCallback((index: number) => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentIndex(index)
    setTimeout(() => setIsTransitioning(false), 500)
  }, [isTransitioning])

  const goToNext = useCallback(() => {
    goToSlide((currentIndex + 1) % slides.length)
  }, [currentIndex, slides.length, goToSlide])

  const goToPrevious = useCallback(() => {
    goToSlide((currentIndex - 1 + slides.length) % slides.length)
  }, [currentIndex, slides.length, goToSlide])

  // Auto-play
  useEffect(() => {
    if (!isAutoPlaying || slides.length <= 1) return
    const interval = setInterval(goToNext, autoPlayInterval)
    return () => clearInterval(interval)
  }, [isAutoPlaying, goToNext, autoPlayInterval, slides.length])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goToPrevious()
      if (e.key === 'ArrowRight') goToNext()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [goToNext, goToPrevious])

  if (!slides || slides.length === 0) {
    return null
  }

  const currentSlide = slides[currentIndex]
  const textColorClass = currentSlide.textColor === 'dark' ? 'text-gray-900' : 'text-white'
  const overlayOpacity = currentSlide.overlayOpacity ?? 40

  return (
    <section className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide._id}
          className={`absolute inset-0 transition-opacity duration-500 ${
            index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          {/* Media Background */}
          {slide.mediaType === 'image' && slide.imageUrl && (
            <Image
              src={slide.imageUrl}
              alt={slide.title}
              fill
              className="object-cover"
              priority={index === 0}
            />
          )}

          {slide.mediaType === 'video' && slide.videoUrl && (
            <video
              src={slide.videoUrl}
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}

          {slide.mediaType === 'youtube' && slide.youtubeUrl && (
            <div className="absolute inset-0">
              <iframe
                src={`https://www.youtube.com/embed/${extractYouTubeId(slide.youtubeUrl)}?autoplay=1&mute=1&loop=1&playlist=${extractYouTubeId(slide.youtubeUrl)}&controls=0&showinfo=0&rel=0&modestbranding=1`}
                allow="autoplay; encrypted-media"
                allowFullScreen
                className="absolute inset-0 w-full h-full pointer-events-none"
                style={{ transform: 'scale(1.2)' }}
              />
            </div>
          )}

          {/* Dark Overlay */}
          <div
            className="absolute inset-0 bg-black"
            style={{ opacity: overlayOpacity / 100 }}
          />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-20 h-full flex items-center">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl">
            <h1
              className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight tracking-tight transition-all duration-500 ${textColorClass}`}
            >
              {currentSlide.title}
            </h1>

            {currentSlide.subtitle && (
              <p
                className={`text-lg md:text-xl mb-8 leading-relaxed transition-all duration-500 ${
                  currentSlide.textColor === 'dark' ? 'text-gray-600' : 'text-white/90'
                }`}
              >
                {currentSlide.subtitle}
              </p>
            )}

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              {currentSlide.ctaButton?.text && currentSlide.ctaButton?.url && (
                <Link
                  href={currentSlide.ctaButton.url}
                  className={`inline-flex items-center px-6 py-3 rounded-lg font-semibold transition-all ${
                    currentSlide.ctaButton.style === 'secondary'
                      ? 'bg-white/10 backdrop-blur-sm border border-white/30 text-white hover:bg-white/20'
                      : 'bg-emerald-500 hover:bg-emerald-600 text-white'
                  }`}
                >
                  {currentSlide.ctaButton.text}
                </Link>
              )}

              {currentSlide.secondaryButton?.text && currentSlide.secondaryButton?.url && (
                <Link
                  href={currentSlide.secondaryButton.url}
                  className={`inline-flex items-center px-6 py-3 rounded-lg font-semibold transition-all ${
                    currentSlide.textColor === 'dark'
                      ? 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                      : 'bg-white/10 backdrop-blur-sm border border-white/30 text-white hover:bg-white/20'
                  }`}
                >
                  {currentSlide.secondaryButton.text}
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      {slides.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-black/30 backdrop-blur-sm text-white hover:bg-black/50 transition-all"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-black/30 backdrop-blur-sm text-white hover:bg-black/50 transition-all"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}

      {/* Bottom Controls */}
      {slides.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-4">
          {/* Dots */}
          <div className="flex gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  index === currentIndex
                    ? 'bg-white w-8'
                    : 'bg-white/50 hover:bg-white/70'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Play/Pause */}
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className="p-2 rounded-full bg-black/30 backdrop-blur-sm text-white hover:bg-black/50 transition-all"
            aria-label={isAutoPlaying ? 'Pause autoplay' : 'Start autoplay'}
          >
            {isAutoPlaying ? (
              <Pause className="w-4 h-4" />
            ) : (
              <Play className="w-4 h-4" />
            )}
          </button>
        </div>
      )}
    </section>
  )
}

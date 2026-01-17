import { getHeroBannerSlides, urlFor } from '@/lib/sanity'
import HeroBanner from './HeroBanner'

export default async function HeroBannerWrapper() {
  const slides = await getHeroBannerSlides()

  if (!slides || slides.length === 0) {
    return null
  }

  // Process slides for client component
  const processedSlides = slides.map((slide) => ({
    _id: slide._id,
    title: slide.title,
    subtitle: slide.subtitle,
    mediaType: slide.mediaType,
    imageUrl: slide.image
      ? urlFor(slide.image).width(1920).height(1080).url()
      : undefined,
    videoUrl: slide.video?.asset?.url,
    youtubeUrl: slide.youtubeUrl,
    overlayOpacity: slide.overlayOpacity,
    textColor: slide.textColor,
    ctaButton: slide.ctaButton,
    secondaryButton: slide.secondaryButton,
  }))

  return <HeroBanner slides={processedSlides} />
}

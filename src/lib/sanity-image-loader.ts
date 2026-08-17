import type { ImageLoaderProps } from 'next/image'

/**
 * Serve Sanity-hosted images straight from Sanity's image CDN instead of
 * routing them through /_next/image.
 *
 * Every image on this site already comes from cdn.sanity.io, and `urlFor()`
 * has already asked Sanity to resize and crop it. Letting Vercel re-optimize
 * that finished image bought nothing and burned one metered transformation per
 * (source, width, quality) combination — which exhausted the account quota and
 * turned every uncached render into an HTTP 402
 * (x-vercel-error: OPTIMIZED_IMAGE_REQUEST_PAYMENT_REQUIRED).
 *
 * The authored URL carries the design intent: `.width()/.height()` emit a
 * hotspot `rect=` crop plus `w`/`h`, `.maxWidth()/.maxHeight()` emit a
 * `max-w`/`max-h` bounding box, and some call sites add `fit=fill&bg=`. All of
 * it is preserved here — the loader only rescales the delivered pixels to the
 * width Next asks for, and never past the authored size.
 */
export default function sanityImageLoader({ src, width, quality }: ImageLoaderProps): string {
  // Local /public assets and third-party URLs pass through untouched.
  if (!src.startsWith('https://cdn.sanity.io/')) return src

  const url = new URL(src)
  const params = url.searchParams

  const num = (key: string) => {
    const value = Number(params.get(key))
    return params.has(key) && Number.isFinite(value) && value > 0 ? value : null
  }

  // `.width()/.height()` emit a real w/h pair (alongside a hotspot `rect=`).
  // `.maxWidth()/.maxHeight()` emit max-w/max-h, which Sanity's CDN silently
  // ignores — it returns the full-size original. Those call sites only ever
  // looked correct because /_next/image did the resizing downstream, so the
  // box has to be restated as `w`/`h` + `fit=max`: fit within, preserve aspect,
  // never crop, never upscale.
  const isBox = !params.has('w') && params.has('max-w')
  const widthKey = isBox ? 'max-w' : 'w'
  const heightKey = isBox ? 'max-h' : 'h'
  const authoredWidth = num(widthKey)

  if (authoredWidth) {
    // Scale the width/height pair as a unit so the authored aspect ratio and
    // any `rect=` crop stay consistent. Cap at the authored width: asking for
    // more than the source was cut to only upscales.
    const target = Math.round(Math.min(width, authoredWidth))
    const authoredHeight = num(heightKey)

    if (isBox) {
      params.delete('max-w')
      params.delete('max-h')
      // `fit=max` is what makes w+h a bounding box rather than a crop.
      if (!params.has('fit')) params.set('fit', 'max')
    }

    params.set('w', String(target))
    if (authoredHeight) {
      const scaled = Math.round(authoredHeight * (target / authoredWidth))
      params.set('h', String(Math.max(1, scaled)))
    }
  } else {
    // No authored size (e.g. a bare `urlFor(image).url()`) — set width only so
    // the aspect ratio is untouched, and let `fit=max` prevent upscaling.
    params.set('w', String(width))
    if (!params.has('fit')) params.set('fit', 'max')
  }

  params.set('q', String(quality ?? 75))
  // Sanity negotiates webp/avif per browser, replacing next.config `formats`.
  params.set('auto', 'format')

  url.search = params.toString()
  return url.toString()
}

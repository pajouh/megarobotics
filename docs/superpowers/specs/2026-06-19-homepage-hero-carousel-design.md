# Homepage Hero Carousel — Design

**Date:** 2026-06-19
**Status:** Approved

## Goal

Replace the single image in the homepage hero's right-hand column with an
image **+ video** carousel whose **area size is settable** from Sanity Studio.
Text/CTAs stay in the left column. Fully backward-compatible: with no slides
configured, the hero renders exactly as today.

## Decisions (from brainstorming)

- **Managed in Sanity Studio** by extending the existing `homeHero` singleton.
- **Carousel lives in the right column**; text stays left.
- **Each slide** is an Image, an uploaded Video file, or an external Video URL.
- **Size settable** by aspect ratio **and** width span.

## Schema — extend `sanity/schemas/homeHero.ts` (Media group)

- `slides`: `array` of inline `object`:
  - `mediaType`: string select — `image` | `videoFile` | `videoUrl` (radio).
  - `image`: `image` (hotspot) — hidden unless `mediaType == 'image'`.
  - `video`: `file` (accept `video/*`) — hidden unless `mediaType == 'videoFile'`.
  - `videoUrl`: `url` (YouTube / Vimeo / direct MP4) — hidden unless `mediaType == 'videoUrl'`.
  - `alt`: localizedString — accessible description.
- `mediaAspectRatio`: select `square` | `4:3` | `16:9` | `portrait` (default `4:3`).
- `mediaWidth`: select `narrow` (~40%) | `medium` (~50%) | `wide` (~60%) (default `narrow`).
- `autoplay`: boolean (default `true`).
- `autoplayInterval`: number, seconds (default `6`) — used for image/URL slides.
- Existing `image` / `imageAlt` retained as the single-image fallback.

## Query — `getHomeHero` (src/lib/sanity.ts)

Extend `HomeHeroDoc` + projection with:
`slides[]{ mediaType, "imageUrl": image.asset->url, "videoFileUrl": video.asset->url,
"externalUrl": videoUrl, "alt": <localized> }`, plus
`"aspectRatio": mediaAspectRatio, "width": mediaWidth, autoplay, autoplayInterval`.

## Components

- **`src/components/industrial/HeroCarousel.tsx`** (`'use client'`):
  - Renders slides inside the existing framed box (border + accent corner ticks),
    `object-cover`.
  - Image → `next/image` (`fill`); first slide gets `priority`.
  - Uploaded video → muted `autoPlay playsInline` `<video>`, advances on `ended`;
    loops if it is the only slide.
  - External URL → YouTube/Vimeo → `<iframe>` (autoplay + mute); direct MP4 → `<video>`.
    Auto-advances on the interval timer.
  - Controls: prev/next arrows, dot indicators, keyboard arrows, pause on hover/focus.
  - `prefers-reduced-motion` → autoplay disabled. `aria-roledescription="carousel"`,
    polite live region announcing slide index. Single slide → static, no controls.
- **`HeroIndustrial.tsx`**: add optional `media` prop
  `{ slides, aspectRatio, width, autoplay, interval }`. When `slides.length > 0`,
  render `<HeroCarousel>` in the right column; else the existing single `<Image>`.
  - Aspect ratio → class map (`aspect-square` / `aspect-[4/3]` / `aspect-video` / `aspect-[3/4]`).
  - Width → grid column span (text column flips: narrow 7/5, medium 6/6, wide 5/7).

## Data flow

`src/app/[locale]/page.tsx` builds `media` from `getHomeHero` and passes it to
`HeroIndustrial`. No slides → existing single-image path (bundled `heroImage`
fallback preserved).

## Out of scope (YAGNI)

Caption overlays, per-slide durations, thumbnail strip, drag/swipe gestures
(arrows + dots + keyboard only).

## Verification

`tsc --noEmit`; production build; Playwright screenshot of the hero with sample
slides (autoplay, arrows, dots, video playback, ratio/width changes); EN/DE
intact; Lighthouse not regressed (first slide `priority`, videos lazy). Schema
ships with the Next build (Studio embedded at `/studio` — no separate deploy).

## Rollout

Seed one starter slide (current hero image as slide 1) so the carousel is
visibly active; editors add video/more slides and tune size in Studio.

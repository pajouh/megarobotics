// Shape of the category buying pages at /pages/<slug> (cobots, grippers,
// palletizing, cleaning, quadrupeds, mobile robots, service robots).
// One content file per page in this folder; the page template is
// src/components/landing/CategoryLanding.tsx. The humanoid page keeps its own
// route and data file (src/data/humanoid-robots.ts).
//
// Rules for content files:
// - Every figure comes from the product's published Sanity entry
//   (specifications, tagline, description). Never estimate or round up.
//   A dash (NONE) in the comparison means the manufacturer gives no value.
// - No prices, lead times or stock levels.
// - Models that are inactive in Sanity drop out of the page automatically.

export type L = { en: string; de: string }

export const CDN = 'https://cdn.sanity.io/images/wudur8e8/production'
export const same = (v: string): L => ({ en: v, de: v })
export const NONE: L = { en: '–', de: '–' }

export interface LandingModel {
  /** Sanity product slug; also the anchor id on the page. */
  slug: string
  name: L
  /** Short product type, e.g. "6-axis cobot". */
  type: L
  /** Full Sanity CDN image URL without query string (usually the mainImage). */
  image: string
  /** 'cover' for photos, 'contain' for cut-outs on a plain panel. */
  fit: 'cover' | 'contain'
  position?: string
  /** CSS background behind a 'contain' picture that brings its own backdrop. */
  backdrop?: string
  /** One to three sentences: what it is and what it is good for. */
  blurb: L
  /** Two to four spec tiles on the card. */
  specs: { label: L; value: L }[]
  /** Filter keys for the comparison table (keys of compare.filters). */
  tags: string[]
  /** Comparison table cells, keyed by compare.cols[].key. */
  row: Record<string, L>
}

export interface LandingGroup {
  /** Anchor id, kebab-case. */
  id: string
  /** Short label for the sticky in-page navigation. */
  nav: L
  eyebrow: L
  /** H2. Carries the group's main search term. */
  title: L
  lead: L
  /** Optional second paragraph with background or buying advice. */
  body?: L
  /** Optional short facts shown as a check list next to the cards. */
  points?: L[]
  /** Manufacturer slug: shows its logo and an "all products from" link. */
  manufacturer?: string
  /** Model shown large at the top of the group. */
  feature?: string
  /** Models shown as cards (feature not repeated here). */
  models: string[]
}

export interface LandingContent {
  meta: {
    /** Full <title>, ending in " | MegaRobotics", at most about 65 characters. */
    title: L
    /** 140 to 160 characters. */
    description: L
    /** Breadcrumb label. */
    crumb: L
  }
  /** Product slugs whose hero clips (src/data/product-heroes.ts) open the page. May be empty. */
  heroSlugs: string[]
  /** Shown beside the intro when the page has no hero clips. */
  heroImage?: { src: string; alt: L; fit?: 'cover' | 'contain' }
  hero: { carousel: L }
  intro: {
    eyebrow: L
    /** H1. */
    title: L
    /** May contain {count} (active models on the page). */
    lead: L
    body: L
    /** Three or four "which model for which job" cards. */
    jobs: { icon: string; title: L; body: L; models: string[] }[]
  }
  /** Four to six key figures across the range ("up to 20 kg payload"). */
  facts: { value: L; label: L }[]
  groups: LandingGroup[]
  /** Keyword-rich explainer: what the category is, how it works, where it is used. */
  explainer: { eyebrow: L; title: L; paragraphs: L[] }
  compare: {
    eyebrow: L
    title: L
    subtitle: L
    filters: { key: string; label: L }[]
    /** Columns after the model name. */
    cols: { key: string; label: L }[]
    foot: L
  }
  choose: { eyebrow: L; title: L; items: { title: L; body: L }[] }
  /** Six to eight questions; they also go into the FAQPage schema. */
  faq: { eyebrow: L; title: L; items: { q: L; a: L }[] }
  /** Internal links under the FAQ (solutions, categories, other buying pages). */
  related: { href: string; label: L }[]
  cta: { eyebrow: L; title: L; body: L; button: L; subject: L }
  fine: L[]
}

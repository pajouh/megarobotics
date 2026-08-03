/**
 * Repairs auto-generated manufacturer `seo.metaTitle` values.
 *
 * The original generator built "<name> Robotics Products & Solutions | MegaRobotics"
 * and then hard-cut the result at 60 characters. That produced three defects:
 *   1. "Robotics Robotics" whenever the manufacturer name already ended in
 *      "Robotics" (Pudu Robotics, Unitree Robotics, KEENON Robotics, ...).
 *   2. Titles cut mid-word inside the brand suffix ("... | MegaRob...").
 *   3. A baked-in "| MegaRobotics" that the layout's title template then
 *      appended a second time.
 *
 * Titles are rewritten without the brand suffix — `brandedTitle()` in
 * src/lib/page-seo.ts adds exactly one at render time.
 *
 * Hand-written titles (those not matching the generated pattern) are left alone.
 *
 * Usage: node --env-file=.env.local scripts/fix-seo-manufacturer-titles.mjs [--dry]
 */
import { createClient } from '@sanity/client'

const DRY = process.argv.includes('--dry')

const token = process.env.SANITY_API_TOKEN
if (!token) {
  console.error('Missing SANITY_API_TOKEN. Run with: node --env-file=.env.local ...')
  process.exit(1)
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'wudur8e8',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
})

// Only rewrite titles that came out of the old generator. Anything else was
// written by hand and must not be clobbered.
const GENERATED_EN = /^(.*?)\s+Robotics Products & Solutions(\s*[|–—-].*)?$/i
const GENERATED_DE = /^(.*?)\s+Robotik-Produkte & Lösungen(\s*[|–—-].*)?$/i

function titleFor(name, locale) {
  // "Pudu Robotics" + "Robotics Products" would stutter; drop the duplicate.
  const alreadyRobotics = /robotics?$/i.test(name.trim())
  if (locale === 'de') {
    return alreadyRobotics ? `${name} Produkte & Lösungen` : `${name} Robotik-Produkte & Lösungen`
  }
  return alreadyRobotics ? `${name} Products & Solutions` : `${name} Robotics Products & Solutions`
}

async function run() {
  const manufacturers = await client.fetch(
    `*[_type == "manufacturer" && defined(seo.metaTitle)]{
      _id, name, "en": seo.metaTitle.en, "de": seo.metaTitle.de
    }`
  )

  let tx = client.transaction()
  let changed = 0
  const skipped = []

  for (const m of manufacturers) {
    const set = {}

    for (const [locale, pattern] of [['en', GENERATED_EN], ['de', GENERATED_DE]]) {
      const current = m[locale]
      if (!current) continue
      if (!pattern.test(current)) {
        skipped.push(`${m.name} (${locale}): hand-written — "${current}"`)
        continue
      }
      const next = titleFor(m.name, locale)
      if (next !== current) set[`seo.metaTitle.${locale}`] = next
    }

    if (!Object.keys(set).length) continue

    console.log(`${DRY ? '[dry] ' : ''}${m.name} (${m._id})`)
    for (const [k, v] of Object.entries(set)) {
      console.log(`   ${k}`)
      console.log(`     was: ${m[k.endsWith('.en') ? 'en' : 'de']}`)
      console.log(`     now: ${v}`)
    }
    tx = tx.patch(m._id, (p) => p.set(set))
    changed++
  }

  if (skipped.length) {
    console.log(`\nLeft untouched (${skipped.length}):`)
    for (const s of skipped) console.log(`  - ${s}`)
  }

  if (DRY) {
    console.log(`\n[dry run] ${changed} manufacturer(s) would change.`)
    return
  }
  if (!changed) {
    console.log('\nNothing to change.')
    return
  }

  await tx.commit()
  console.log(`\n✅ Patched ${changed} manufacturer(s).`)
}

run().catch((error) => {
  console.error(error)
  process.exit(1)
})

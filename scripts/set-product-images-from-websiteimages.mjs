/**
 * Upload the user's category-themed WebP images from /websiteimages/ to
 * Sanity, then assign one per productFamily as the mainImage for every
 * NEW seeded product (the 29 from seed-component-products rounds 1 + 2).
 *
 * Why this approach
 * -----------------
 * The 29 new products were seeded without product photography. Earlier
 * fallback set mainImage to the manufacturer logo, which made every card
 * from the same brand look identical. The user has a library of
 * category-themed industrial images at /websiteimages/*.webp already
 * licensed for use on this site. Mapping those to families gives each
 * product a representative category photo (with the brand logo still
 * shown as a corner badge on the card), which is much more readable
 * than the logo-as-everything fallback.
 *
 * Mapping
 * -------
 *  robot-platforms                          → Humanoid_and_ai_robotics
 *  end-effectors-robot-tooling              → Components_and_End_EFfectors
 *  motion-actuators-drives                  → Industrial Automation
 *  plc-control-industrial-automation        → Industrial Automation
 *  sensors-vision-perception                → Inspection and Security
 *  safety-machine-protection                → Inspection and Security
 *  industrial-communication-connectivity    → Application Solution
 *  software-hmi-scada-digital-twin          → Application Solution
 *  robotic-cells-application-packages       → Industrial Automation
 *  service-cleaning-facility-robots         → mobile Robots and Intralogistics
 *  research-education-embodied-ai           → Humanoid_and_ai_robotics
 *  spare-parts-modules-accessories          → Components_and_End_EFfectors
 *
 * Safety
 * ------
 * - Dry-run by default. --apply required.
 * - Only updates products that currently have NO mainImage OR whose
 *   mainImage is the manufacturer logo (the prior fallback). Manually
 *   uploaded images in Studio are never overwritten.
 * - Idempotent — uploads each asset only once (looks up by SHA).
 *
 * Usage
 * -----
 *   node scripts/set-product-images-from-websiteimages.mjs           # dry-run
 *   node scripts/set-product-images-from-websiteimages.mjs --apply
 */

import { createClient } from '@sanity/client'
import * as dotenv from 'dotenv'
import { readFileSync } from 'fs'
import { resolve } from 'path'
import { createHash } from 'crypto'

dotenv.config({ path: '.env.local' })

const APPLY = process.argv.includes('--apply')

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const token = process.env.SANITY_API_TOKEN
if (!projectId) {
  console.error('❌ NEXT_PUBLIC_SANITY_PROJECT_ID is not set')
  process.exit(1)
}
if (APPLY && !token) {
  console.error('❌ SANITY_API_TOKEN required for --apply')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  useCdn: false,
  token,
})

const IMAGE_DIR = resolve(process.cwd(), 'websiteimages')

const FAMILY_TO_IMAGE = {
  'robot-platforms': 'Humanoid_and_ai_robotics.webp',
  'end-effectors-robot-tooling': 'Components_and_End_EFfectors.webp',
  'motion-actuators-drives': 'Industrial Automation.webp',
  'plc-control-industrial-automation': 'Industrial Automation.webp',
  'sensors-vision-perception': 'Inspection and Security.webp',
  'safety-machine-protection': 'Inspection and Security.webp',
  'industrial-communication-connectivity': 'Application Solution.webp',
  'software-hmi-scada-digital-twin': 'Application Solution.webp',
  'robotic-cells-application-packages': 'Industrial Automation.webp',
  'service-cleaning-facility-robots': 'mobile Robots and Intralogistics.webp',
  'research-education-embodied-ai': 'Humanoid_and_ai_robotics.webp',
  'spare-parts-modules-accessories': 'Components_and_End_EFfectors.webp',
}

function fileHash(buf) {
  return createHash('sha1').update(buf).digest('hex')
}

async function getOrUploadAsset(filename) {
  const filepath = resolve(IMAGE_DIR, filename)
  const buf = readFileSync(filepath)
  const sha = fileHash(buf)
  // Look up an asset already uploaded with this sha
  const existing = await client.fetch(
    `*[_type == "sanity.imageAsset" && sha1hash == $sha][0]{_id, url}`,
    { sha },
  )
  if (existing) {
    return existing._id
  }
  const asset = await client.assets.upload('image', buf, {
    filename,
    contentType: 'image/webp',
  })
  return asset._id
}

async function main() {
  console.log(`▶  Project: ${projectId}/${dataset}`)
  console.log(`▶  Mode: ${APPLY ? 'APPLY' : 'DRY-RUN'}`)
  console.log()

  // Identify the new seeded products: those whose productFamily is set
  // AND whose current mainImage either is empty or references one of the
  // 20 manufacturer-logo assets (the prior fallback).
  const logoRefs = await client.fetch(
    `*[_type == "manufacturer" && defined(logo.asset._ref)].logo.asset._ref`,
  )
  const logoSet = new Set(logoRefs || [])
  console.log(`(internal) logo-asset refs known: ${logoSet.size}`)

  const products = await client.fetch(
    `*[_type == "product" && isActive != false && defined(productFamily)]{
      _id, _rev, name, "slug": slug.current,
      "familySlug": productFamily->slug.current,
      "mainImageRef": mainImage.asset._ref
    } | order(familySlug, name)`,
  )

  const targets = products.filter(
    (p) => !p.mainImageRef || logoSet.has(p.mainImageRef),
  )

  console.log(`📦 Plan:`)
  console.log(`   ${targets.length} of ${products.length} products will get a family-themed mainImage.`)

  if (!targets.length) {
    console.log('Nothing to do.')
    return
  }

  const byFamily = {}
  for (const t of targets) {
    ;(byFamily[t.familySlug] ??= []).push(t)
  }
  for (const [family, list] of Object.entries(byFamily)) {
    console.log(`   ${family.padEnd(40)} → ${FAMILY_TO_IMAGE[family] || '(no mapping)'}   (${list.length} products)`)
  }
  console.log()

  if (!APPLY) {
    console.log('To apply: re-run with --apply')
    return
  }

  // Upload assets once per unique filename
  const assetCache = {}
  for (const filename of new Set(Object.values(FAMILY_TO_IMAGE))) {
    process.stdout.write(`  upload ${filename} ... `)
    const id = await getOrUploadAsset(filename)
    assetCache[filename] = id
    console.log(`✅ ${id}`)
  }
  console.log()

  let ok = 0
  let skipped = 0
  for (const p of targets) {
    const filename = FAMILY_TO_IMAGE[p.familySlug]
    if (!filename) {
      console.log(`  ⚠  skip ${p.slug}: no mapping for family ${p.familySlug}`)
      skipped++
      continue
    }
    const assetId = assetCache[filename]
    try {
      await client
        .patch(p._id)
        .ifRevisionId(p._rev)
        .set({
          mainImage: { _type: 'image', asset: { _type: 'reference', _ref: assetId } },
        })
        .commit()
      ok++
    } catch (err) {
      console.log(`  ❌ ${p.slug}: ${err.message}`)
      skipped++
    }
  }
  console.log(`✅ ${ok} products updated, ${skipped} skipped.`)
}

main().catch((err) => {
  console.error('❌ Script failed:', err.message)
  process.exit(1)
})

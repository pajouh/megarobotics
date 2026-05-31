/**
 * Seed the Sanity content collections that power /solutions, /industries,
 * /robot-technologies, and /projects from the existing messages JSON.
 *
 * Why
 * ---
 * When those pages were built (PR #1, industrial rebrand), the content
 * lived directly in messages/en.json + messages/de.json. The Sanity
 * schemas for `solution`, `industry`, `robotTechnology`, and `projectStudy`
 * were added in Phase A (PR #4) but no documents were ever created — so
 * Studio shows the doc types in the sidebar with empty lists, and the
 * pages keep reading from JSON regardless of what an editor does in
 * Studio.
 *
 * This script migrates the existing JSON content into Sanity docs with
 * stable IDs derived from the `id` field on each JSON item. Once the
 * docs exist, Studio editors can modify them and the page-side fix
 * (which switches each page to query Sanity, falling back to JSON only
 * if no docs exist) will pick up the changes.
 *
 * Safety
 * ------
 * - Dry-run by default. --apply required.
 * - Idempotent (uses createIfNotExists). Re-running does nothing if
 *   docs already exist.
 * - Preserves both EN and DE strings under the {en, de} localized
 *   shape the schemas use.
 *
 * Out of scope
 * ------------
 * referenceEcosystem — user explicitly opted into manual creation in
 * Studio for brand-listing safety. Not seeded.
 *
 * Usage
 * -----
 *   node scripts/seed-content-pages-from-json.mjs           # dry-run
 *   node scripts/seed-content-pages-from-json.mjs --apply
 */

import { createClient } from '@sanity/client'
import * as dotenv from 'dotenv'
import { readFileSync } from 'fs'
import { resolve } from 'path'
import { randomBytes } from 'crypto'

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

const en = JSON.parse(readFileSync(resolve('messages/en.json'), 'utf8'))
const de = JSON.parse(readFileSync(resolve('messages/de.json'), 'utf8'))

function loc(enValue, deValue) {
  return { en: enValue, de: deValue ?? enValue }
}

function locArr(enArr, deArr) {
  return { en: enArr ?? [], de: deArr ?? enArr ?? [] }
}

function blockKey() {
  return randomBytes(6).toString('hex')
}

// Convert a paragraph string into a portable-text block.
function textToBlock(text) {
  return {
    _type: 'block',
    _key: blockKey(),
    style: 'normal',
    markDefs: [],
    children: [{ _type: 'span', _key: blockKey(), text, marks: [] }],
  }
}

function textToBlockContent(textOrArray) {
  if (!textOrArray) return undefined
  const items = Array.isArray(textOrArray) ? textOrArray : [textOrArray]
  return items.map(textToBlock)
}

// ---------- Build doc lists ----------

function buildSolutions() {
  const enItems = en.industrial.solutions.items
  const deItems = de.industrial.solutions.items
  const byId = new Map(deItems.map((i) => [i.id, i]))
  return enItems.map((it, idx) => {
    const d = byId.get(it.id) || {}
    return {
      _id: `solution.${it.id}`,
      _type: 'solution',
      title: loc(it.title, d.title),
      slug: { _type: 'slug', current: it.id },
      excerpt: loc(it.description, d.description),
      body: undefined,
      applications: locArr(it.applications, d.applications),
      robotTypes: locArr(it.robotTypes, d.robotTypes),
      order: (idx + 1) * 10,
      featured: false,
      isActive: true,
    }
  })
}

function buildIndustries() {
  const enItems = en.industrial.industries.items
  const deItems = de.industrial.industries.items
  const byId = new Map(deItems.map((i) => [i.id, i]))
  return enItems.map((it, idx) => {
    const d = byId.get(it.id) || {}
    return {
      _id: `industry.${it.id}`,
      _type: 'industry',
      title: loc(it.title, d.title),
      slug: { _type: 'slug', current: it.id },
      applications: locArr(it.applications, d.applications),
      order: (idx + 1) * 10,
      featured: false,
      isActive: true,
    }
  })
}

function buildRobotTechnologies() {
  const enItems = en.industrial.robotTechnologies.items
  const deItems = de.industrial.robotTechnologies.items
  const byId = new Map(deItems.map((i) => [i.id, i]))
  return enItems.map((it, idx) => {
    const d = byId.get(it.id) || {}
    return {
      _id: `robotTechnology.${it.id}`,
      _type: 'robotTechnology',
      title: loc(it.title, d.title),
      slug: { _type: 'slug', current: it.id },
      excerpt: loc(it.description, d.description),
      applications: locArr(it.applications, d.applications),
      selectionCriteria: locArr(it.criteria, d.criteria),
      order: (idx + 1) * 10,
      featured: false,
      isActive: true,
    }
  })
}

function buildProjectStudies() {
  const enItems = en.industrial.projects.items
  const deItems = de.industrial.projects.items
  const byId = new Map(deItems.map((i) => [i.id, i]))
  return enItems.map((it, idx) => {
    const d = byId.get(it.id) || {}
    return {
      _id: `projectStudy.${it.id}`,
      _type: 'projectStudy',
      title: loc(it.title, d.title),
      subtitle: loc(it.subtitle, d.subtitle),
      slug: { _type: 'slug', current: it.id },
      status: 'concept',
      body: {
        en: textToBlockContent(it.body),
        de: textToBlockContent(d.body || it.body),
      },
      order: (idx + 1) * 10,
      featured: false,
      isActive: true,
    }
  })
}

const ALL = [
  { type: 'solution', docs: buildSolutions() },
  { type: 'industry', docs: buildIndustries() },
  { type: 'robotTechnology', docs: buildRobotTechnologies() },
  { type: 'projectStudy', docs: buildProjectStudies() },
]

// ---------- Execute ----------

async function main() {
  console.log(`▶  Project: ${projectId}/${dataset}`)
  console.log(`▶  Mode: ${APPLY ? 'APPLY' : 'DRY-RUN'}`)
  console.log()

  for (const group of ALL) {
    const existing = new Set(
      await client.fetch(`*[_type == $t]._id`, { t: group.type }),
    )
    const toCreate = group.docs.filter((d) => !existing.has(d._id))
    console.log(`📦 ${group.type}: ${toCreate.length} of ${group.docs.length} to create (${existing.size} already exist)`)
    for (const d of toCreate) console.log(`     - ${d._id}`)
    if (!APPLY) continue

    for (const d of toCreate) {
      try {
        await client.createIfNotExists(d)
        console.log(`     ✅ ${d._id}`)
      } catch (err) {
        console.log(`     ❌ ${d._id}: ${err.message}`)
      }
    }
    console.log()
  }

  if (!APPLY) {
    console.log('\nTo apply: re-run with --apply')
  }
}

main().catch((err) => {
  console.error('❌ Script failed:', err.message)
  process.exit(1)
})

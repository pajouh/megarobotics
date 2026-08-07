/**
 * Set the public relationship status for manufacturers MegaRobotics distributes.
 *
 * relationshipStatus drives the verified-distributor wording on each brand page
 * and on every product that inherits from it, so this is a legal claim, not a
 * cosmetic flag. Only brands with a confirmed agreement belong in BRANDS.
 *
 * Confirmed by the account owner on 2026-08-07: OnRobot, Agile Robots,
 * Franka Robotics, MagicLab and LimX Dynamics.
 *
 * Run:
 *   node --env-file=.env.local scripts/set-distributor-status.mjs --dry
 *   node --env-file=.env.local scripts/set-distributor-status.mjs
 */
import { createClient } from '@sanity/client'

const token = process.env.SANITY_API_TOKEN
if (!token) {
  console.error('✗ SANITY_API_TOKEN missing. Run with: node --env-file=.env.local scripts/set-distributor-status.mjs')
  process.exit(1)
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'wudur8e8',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
})

const DRY = process.argv.includes('--dry')
const STATUS = 'official_distributor'
const BRANDS = ['onrobot', 'agile-robots', 'franka-robotics', 'magiclab', 'limx-dynamics']

async function run() {
  console.log(DRY ? '— DRY RUN, nothing will be written —\n' : '— LIVE RUN —\n')

  const docs = await client.fetch(
    `*[_type=="manufacturer" && slug.current in $slugs]{
       _id, name, "slug": slug.current, relationshipStatus,
       "products": count(*[_type=="product" && references(^._id) && isActive != false])
     } | order(name asc)`,
    { slugs: BRANDS },
  )

  const found = new Set(docs.map((d) => d.slug))
  const missing = BRANDS.filter((s) => !found.has(s))
  if (missing.length) throw new Error(`manufacturer slug(s) not found: ${missing.join(', ')}`)

  let changed = 0
  for (const d of docs) {
    const from = d.relationshipStatus || '(unset)'
    if (d.relationshipStatus === STATUS) {
      console.log(`  skip   ${d.name.padEnd(18)} already ${STATUS}`)
      continue
    }
    changed++
    console.log(`  set    ${d.name.padEnd(18)} ${from} → ${STATUS}   (${d.products} products inherit)`)
    if (!DRY) await client.patch(d._id).set({ relationshipStatus: STATUS }).commit()
  }

  const total = docs.reduce((n, d) => n + d.products, 0)
  console.log(`\n${docs.length} manufacturers, ${changed} changed, ${total} products inherit the claim`)
  if (DRY) console.log('\nDry run complete. Re-run without --dry to write.')
  else console.log('\n✅ Done.')
}

run().catch((e) => {
  console.error('\n✗ Failed:', e.message)
  process.exit(1)
})

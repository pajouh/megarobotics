/**
 * Clear stale footerLinks on the Sanity Site Settings singleton.
 *
 * The new Footer (PR #5) renders a JSON-defined 4-column layout
 * (Platform / Catalog / Network / Company) when CMS footerLinks is
 * empty. With CMS footerLinks populated, the new Catalog column is
 * appended but the rest of the layout uses old portal-era data
 * (Articles / Companies / Events / Research, raw /products/category
 * links). Clearing footerLinks lets the new JSON fallback take over
 * cleanly.
 *
 * Safety:
 * - Dry-run by default. Prints what would change. No mutations.
 * - --apply flag required to actually patch.
 * - Backs up the current footerLinks to a timestamped JSON file
 *   in /tmp/ BEFORE patching.
 * - Idempotent: running twice is safe (second run reports "already
 *   cleared" and exits 0).
 *
 * Usage:
 *   node scripts/clear-stale-footer-links.mjs          # dry-run
 *   node scripts/clear-stale-footer-links.mjs --apply  # actually clear
 *
 * Requires the same env as other Sanity scripts in this repo:
 *   NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET,
 *   SANITY_API_TOKEN  (write-scoped)
 */

import { createClient } from '@sanity/client'
import * as dotenv from 'dotenv'
import { writeFileSync, mkdirSync } from 'fs'
import { dirname } from 'path'

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
  console.error('❌ SANITY_API_TOKEN is required for --apply (write-scoped)')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  useCdn: false,
  token,
})

const stamp = new Date().toISOString().replace(/[:.]/g, '-')
const backupPath = `/tmp/sanity-footer-backup-${stamp}.json`

function summarizeFooterLinks(footerLinks) {
  if (!Array.isArray(footerLinks)) return 'not an array'
  if (footerLinks.length === 0) return '(empty)'
  return footerLinks
    .map((col, i) => {
      const title = col?.title ?? '(untitled)'
      const linkCount = Array.isArray(col?.links) ? col.links.length : 0
      const sampleLinks = (col?.links ?? [])
        .slice(0, 3)
        .map((l) => `${l?.label ?? '?'} → ${l?.url ?? '?'}`)
        .join(', ')
      return `  Col ${i + 1}: "${title}" (${linkCount} links)${
        linkCount > 0 ? ` — ${sampleLinks}${linkCount > 3 ? ', …' : ''}` : ''
      }`
    })
    .join('\n')
}

async function main() {
  console.log(`▶  Project: ${projectId}/${dataset}`)
  console.log(`▶  Mode: ${APPLY ? 'APPLY (will mutate)' : 'DRY-RUN (no changes)'}`)
  console.log()

  // Find the siteSettings singleton. By convention there should be one.
  const docs = await client.fetch(`*[_type == "siteSettings"]{_id, _rev, footerLinks}`)

  if (!docs.length) {
    console.error('❌ No siteSettings document found. Nothing to do.')
    process.exit(1)
  }
  if (docs.length > 1) {
    console.warn(
      `⚠  Multiple siteSettings documents found (${docs.length}). Will operate on all of them.`,
    )
  }

  let anyChanges = false

  for (const doc of docs) {
    console.log(`📄 siteSettings doc: ${doc._id} (rev ${doc._rev})`)

    if (!doc.footerLinks || doc.footerLinks.length === 0) {
      console.log('   footerLinks: (already empty / unset) — nothing to clear.')
      continue
    }

    anyChanges = true
    console.log(`   footerLinks: ${doc.footerLinks.length} column(s)`)
    console.log(summarizeFooterLinks(doc.footerLinks))
    console.log()

    if (APPLY) {
      // Back up the existing footerLinks before patching
      mkdirSync(dirname(backupPath), { recursive: true })
      writeFileSync(
        backupPath,
        JSON.stringify(
          {
            takenAt: new Date().toISOString(),
            project: `${projectId}/${dataset}`,
            siteSettingsId: doc._id,
            siteSettingsRev: doc._rev,
            footerLinks: doc.footerLinks,
          },
          null,
          2,
        ),
        'utf8',
      )
      console.log(`💾 Backup written: ${backupPath}`)

      const result = await client
        .patch(doc._id)
        .ifRevisionId(doc._rev) // optimistic concurrency: fail if someone edited in Studio meanwhile
        .set({ footerLinks: [] })
        .commit()
      console.log(`✅ Cleared footerLinks on ${result._id} (new rev ${result._rev})`)
    } else {
      console.log('   (dry-run) Would set footerLinks: [] on this doc.')
    }
  }

  if (!anyChanges) {
    console.log('✓ Nothing to do — all siteSettings docs already have empty footerLinks.')
    return
  }

  if (!APPLY) {
    console.log()
    console.log('To actually apply: re-run with --apply')
    console.log('  node scripts/clear-stale-footer-links.mjs --apply')
  } else {
    console.log()
    console.log('Done. The new Footer JSON fallback (Platform / Catalog / Network /')
    console.log('Company) will take effect on the next page render.')
    console.log()
    console.log(`To revert, restore footerLinks from: ${backupPath}`)
  }
}

main().catch((err) => {
  console.error('❌ Script failed:', err.message)
  if (err.statusCode === 409) {
    console.error('   The document was modified between fetch and patch.')
    console.error('   Re-run the script — it will pick up the new revision.')
  }
  process.exit(1)
})

/**
 * Import research institutes from Excel into Sanity CMS
 *
 * Usage:
 *   node scripts/import-institutes.mjs
 *
 * Reads: ~/dach_robotics_research_centers_v2.xlsx
 * Sheets: DACH_All (77 rows — all DACH institutes)
 */

import { createClient } from '@sanity/client'
import { readFileSync } from 'fs'
import { resolve } from 'path'
import { config } from 'dotenv'
import XLSX from 'xlsx'

// Load .env.local
config({ path: resolve(process.cwd(), '.env.local') })

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const token = process.env.SANITY_API_TOKEN

if (!projectId || !token) {
  console.error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_TOKEN in .env.local')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: '2024-01-01',
  useCdn: false,
})

// Slug generation from institution + unit name
function generateSlug(institution, unitName) {
  const combined = `${institution} ${unitName}`
  return combined
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 80)
    .replace(/-$/, '')
}

// Parse focus areas — could be comma or semicolon separated
function parseFocusAreas(raw) {
  if (!raw || typeof raw !== 'string') return []
  // Split on semicolons or commas, then clean up
  return raw
    .split(/[;,]\s*/)
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean)
}

// Map Entity_Type from Excel to our centerType values
function mapEntityType(raw) {
  if (!raw) return undefined
  const val = raw.trim()
  const mapping = {
    'Institute': 'Institute',
    'Laboratory': 'Laboratory',
    'Lab': 'Laboratory',
    'Center': 'Center',
    'Centre': 'Center',
    'Department': 'Department',
    'National network': 'Umbrella network',
    'Umbrella network': 'Umbrella network',
    'Research group': 'Laboratory',
    'Group': 'Laboratory',
    'Program': 'Center',
    'Cluster': 'Center',
    'Unit': 'Department',
  }
  return mapping[val] || val
}

// Clean string value
function clean(val) {
  if (val === undefined || val === null) return undefined
  const s = String(val).trim()
  return s === '' || s === 'N/A' || s === 'n/a' ? undefined : s
}

async function main() {
  const excelPath = resolve(process.env.HOME || '/home/pajou', 'dach_robotics_research_centers_v2.xlsx')
  console.log(`Reading Excel file: ${excelPath}`)

  const buf = readFileSync(excelPath)
  const workbook = XLSX.read(buf, { type: 'buffer' })

  const sheetNames = workbook.SheetNames
  console.log(`Found sheets: ${sheetNames.join(', ')}`)

  // Use DACH_All sheet which has all 77 rows
  const sheetName = 'DACH_All'
  const sheet = workbook.Sheets[sheetName]
  if (!sheet) {
    console.error(`Sheet "${sheetName}" not found!`)
    process.exit(1)
  }

  const rows = XLSX.utils.sheet_to_json(sheet)
  console.log(`\nSheet "${sheetName}": ${rows.length} rows`)
  console.log(`Columns: ${Object.keys(rows[0]).join(', ')}`)

  /**
   * Excel columns:
   *   Country, City, Institution, Unit_Name, Entity_Type,
   *   Focus_Area, Inclusion_Basis, Verification_Level,
   *   Primary_URL, Source_URL, Notes
   */

  const documents = []
  const slugSet = new Set()

  for (const row of rows) {
    const institution = clean(row['Institution']) || ''
    const unitName = clean(row['Unit_Name']) || ''
    if (!unitName) {
      console.log(`  SKIP (no Unit_Name): row for ${institution}`)
      continue
    }

    let slug = generateSlug(institution, unitName)
    if (slugSet.has(slug)) {
      // Append city for uniqueness
      const city = (clean(row['City']) || '').toLowerCase().replace(/[^a-z0-9]/g, '-').slice(0, 15)
      slug = `${slug}-${city}`.slice(0, 80).replace(/-$/, '')
    }
    slugSet.add(slug)

    const country = clean(row['Country']) || ''
    const city = clean(row['City'])
    const entityType = mapEntityType(clean(row['Entity_Type']))
    const focusAreas = parseFocusAreas(row['Focus_Area'])
    const website = clean(row['Primary_URL'])
    const notes = []
    const inclusionBasis = clean(row['Inclusion_Basis'])
    if (inclusionBasis) notes.push(`Inclusion: ${inclusionBasis}`)
    const verificationLevel = clean(row['Verification_Level'])
    if (verificationLevel) notes.push(`Verification: ${verificationLevel}`)
    const rawNotes = clean(row['Notes'])
    if (rawNotes) notes.push(rawNotes)

    // Determine profile status based on verification level
    let profileStatus = 'Foundational'
    if (verificationLevel && (
      verificationLevel.toLowerCase().includes('official') ||
      verificationLevel.toLowerCase().includes('verified')
    )) {
      profileStatus = 'Ready'
    }

    // All entries from this file are DACH
    documents.push({
      _type: 'institute',
      name: unitName,
      slug: { _type: 'slug', current: slug },
      parentInstitution: institution,
      region: 'DACH',
      country,
      city,
      centerType: entityType,
      focusAreas,
      website,
      outreachPriority: 1, // All DACH institutes are priority
      profileStatus,
      notes: notes.length > 0 ? notes.join('\n') : undefined,
    })
  }

  console.log(`\nTotal documents to create: ${documents.length}`)

  // Import to Sanity
  let created = 0
  let skipped = 0
  let errors = 0

  for (const doc of documents) {
    try {
      // Check if slug already exists
      const existing = await client.fetch(
        `*[_type == "institute" && slug.current == $slug][0]._id`,
        { slug: doc.slug.current }
      )

      if (existing) {
        console.log(`  SKIP (exists): ${doc.name} [${doc.slug.current}]`)
        skipped++
        continue
      }

      await client.create(doc)
      console.log(`  CREATED: ${doc.name} [${doc.slug.current}]`)
      created++
    } catch (err) {
      console.error(`  ERROR: ${doc.name} — ${err.message}`)
      errors++
    }
  }

  console.log('\n===== SUMMARY =====')
  console.log(`Created: ${created}`)
  console.log(`Skipped (already exists): ${skipped}`)
  console.log(`Errors: ${errors}`)
  console.log(`Total processed: ${documents.length}`)
}

main().catch((err) => {
  console.error('Fatal error:', err)
  process.exit(1)
})

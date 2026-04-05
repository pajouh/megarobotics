/**
 * Update institutes from v4 Excel:
 * - Update existing DACH entries with enriched data from Directory_Master
 * - Import new Global_Seed entries (Ready only)
 * - Merge Contact & Basic_Info data where available
 * - Remove institutes that are now "Needs enrichment"
 *
 * Usage: node scripts/update-institutes-v4.mjs
 */

import { createClient } from '@sanity/client'
import { readFileSync } from 'fs'
import { resolve } from 'path'
import { config } from 'dotenv'
import XLSX from 'xlsx'

config({ path: resolve(process.cwd(), '.env.local') })

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const token = process.env.SANITY_API_TOKEN

if (!projectId || !token) {
  console.error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_TOKEN in .env.local')
  process.exit(1)
}

const client = createClient({ projectId, dataset, token, apiVersion: '2024-01-01', useCdn: false })

function generateSlug(institution, name) {
  return `${institution} ${name}`
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 80)
    .replace(/-$/, '')
}

function parseFocusAreas(raw) {
  if (!raw || typeof raw !== 'string') return []
  return raw.split(/[;,]\s*/).map(s => s.trim().toLowerCase()).filter(Boolean)
}

function mapCenterType(raw) {
  if (!raw) return undefined
  const val = raw.trim()
  const mapping = {
    'Institute': 'Institute', 'Laboratory': 'Laboratory', 'Lab': 'Laboratory',
    'Center': 'Center', 'Centre': 'Center', 'Department': 'Department',
    'National network': 'Umbrella network', 'Umbrella network': 'Umbrella network',
    'Chair / lab': 'Laboratory', 'Chair/lab': 'Laboratory', 'Research group': 'Laboratory',
    'Group': 'Laboratory', 'Program': 'Center', 'Cluster': 'Center', 'Unit': 'Department',
  }
  return mapping[val] || val
}

function clean(val) {
  if (val === undefined || val === null) return undefined
  const s = String(val).trim()
  return s === '' || s === 'N/A' || s === 'n/a' ? undefined : s
}

function parsePriority(val) {
  const n = parseInt(val, 10)
  return isNaN(n) ? undefined : n
}

async function main() {
  const excelPath = resolve(process.env.HOME || '/home/pajou', 'megarobotics_robotics_research_directory_v4.xlsx')
  console.log(`Reading: ${excelPath}`)

  const buf = readFileSync(excelPath)
  const wb = XLSX.read(buf, { type: 'buffer' })
  console.log(`Sheets: ${wb.SheetNames.join(', ')}`)

  // Load all sheets
  const masterRows = XLSX.utils.sheet_to_json(wb.Sheets['Directory_Master'])
  const globalRows = XLSX.utils.sheet_to_json(wb.Sheets['Global_Seed'])
  const contactRows = XLSX.utils.sheet_to_json(wb.Sheets['Contact'])
  const basicRows = XLSX.utils.sheet_to_json(wb.Sheets['Basic_Info'])

  console.log(`Directory_Master: ${masterRows.length}, Global_Seed: ${globalRows.length}`)
  console.log(`Contact: ${contactRows.length}, Basic_Info: ${basicRows.length}`)

  // Index contact and basic_info by ID for quick lookup
  const contactById = {}
  for (const r of contactRows) { if (r.ID) contactById[r.ID] = r }
  const basicById = {}
  for (const r of basicRows) { if (r.ID) basicById[r.ID] = r }

  // Fetch all existing institutes from Sanity
  const existing = await client.fetch(`*[_type == "institute"]{ _id, name, slug, "s": slug.current }`)
  const existingBySlug = {}
  for (const e of existing) { existingBySlug[e.s] = e }
  console.log(`\nExisting institutes in Sanity: ${existing.length}`)

  let created = 0, updated = 0, skipped = 0, removed = 0, errors = 0
  const processedSlugs = new Set()
  const slugSet = new Set()

  // --- Process Directory_Master (DACH) ---
  console.log('\n--- Processing Directory_Master ---')
  for (const row of masterRows) {
    const status = clean(row['Website_Profile_Status'])
    const id = clean(row['ID'])
    const parentInstitution = clean(row['Parent_Institution']) || ''
    const name = clean(row['Center_Lab']) || ''
    if (!name) continue

    let slug = generateSlug(parentInstitution, name)
    if (slugSet.has(slug)) {
      const city = (clean(row['City']) || '').toLowerCase().replace(/[^a-z0-9]/g, '-').slice(0, 15)
      slug = `${slug}-${city}`.slice(0, 80).replace(/-$/, '')
    }
    slugSet.add(slug)
    processedSlugs.add(slug)

    // Skip "Needs enrichment"
    if (status === 'Needs enrichment') {
      console.log(`  SKIP (needs enrichment): ${name}`)
      skipped++
      continue
    }

    // Merge contact data
    const contact = id ? contactById[id] : null
    const basic = id ? basicById[id] : null

    const doc = {
      _type: 'institute',
      name,
      slug: { _type: 'slug', current: slug },
      parentInstitution,
      region: clean(row['Region_Group']) || 'DACH',
      country: clean(row['Country']) || '',
      city: clean(row['City']),
      centerType: mapCenterType(clean(row['Center_Type'])),
      focusAreas: parseFocusAreas(row['Focus_Areas']),
      website: clean(row['Website']),
      outreachPriority: parsePriority(row['Outreach_Priority']),
      profileStatus: status || 'Foundational',
      // From Basic_Info sheet
      director: clean(basic?.Director) || clean(row['Public_Lead']) || undefined,
      founded: clean(basic?.Founded_Year) || undefined,
      staffCount: clean(basic?.Team_Size) || undefined,
      // From Contact sheet
      email: clean(contact?.Contact_Email) || clean(row['Public_Email']) || undefined,
      phone: clean(contact?.Contact_Phone) || undefined,
      address: clean(contact?.Address) || undefined,
      socialLinks: (contact?.LinkedIn || contact?.X_Twitter || contact?.YouTube || contact?.GitHub) ? {
        linkedin: clean(contact?.LinkedIn) || undefined,
        twitter: clean(contact?.X_Twitter) || undefined,
        youtube: clean(contact?.YouTube) || undefined,
        github: clean(contact?.GitHub) || undefined,
      } : undefined,
      // Notes
      notes: [clean(row['Notes']), clean(row['Example_Project_Keywords']) ? `Projects: ${row['Example_Project_Keywords']}` : null]
        .filter(Boolean).join('\n') || undefined,
    }

    try {
      if (existingBySlug[slug]) {
        // Update existing
        const existingId = existingBySlug[slug]._id
        await client.patch(existingId).set({
          name: doc.name,
          parentInstitution: doc.parentInstitution,
          region: doc.region,
          country: doc.country,
          city: doc.city,
          centerType: doc.centerType,
          focusAreas: doc.focusAreas,
          website: doc.website,
          outreachPriority: doc.outreachPriority,
          profileStatus: doc.profileStatus,
          notes: doc.notes,
          ...(doc.director ? { director: doc.director } : {}),
          ...(doc.founded ? { founded: doc.founded } : {}),
          ...(doc.staffCount ? { staffCount: doc.staffCount } : {}),
          ...(doc.email ? { email: doc.email } : {}),
          ...(doc.phone ? { phone: doc.phone } : {}),
          ...(doc.address ? { address: doc.address } : {}),
          ...(doc.socialLinks ? { socialLinks: doc.socialLinks } : {}),
        }).commit()
        console.log(`  UPDATED: ${name} [${slug}]`)
        updated++
      } else {
        // Create new
        await client.create(doc)
        console.log(`  CREATED: ${name} [${slug}]`)
        created++
      }
    } catch (err) {
      console.error(`  ERROR: ${name} — ${err.message}`)
      errors++
    }
  }

  // --- Process Global_Seed ---
  console.log('\n--- Processing Global_Seed ---')
  for (const row of globalRows) {
    const status = clean(row['Profile_Status'])
    if (status !== 'Ready') {
      console.log(`  SKIP (${status}): ${clean(row['Center_Lab'])}`)
      skipped++
      continue
    }

    const id = clean(row['ID'])
    const parentInstitution = clean(row['Institution']) || ''
    const name = clean(row['Center_Lab']) || ''
    if (!name) continue

    let slug = generateSlug(parentInstitution, name)
    if (slugSet.has(slug)) {
      const country = (clean(row['Country']) || '').toLowerCase().replace(/\s+/g, '-').slice(0, 10)
      slug = `${slug}-${country}`.slice(0, 80).replace(/-$/, '')
    }
    slugSet.add(slug)
    processedSlugs.add(slug)

    // Merge contact data
    const contact = id ? contactById[id] : null
    const basic = id ? basicById[id] : null

    const doc = {
      _type: 'institute',
      name,
      slug: { _type: 'slug', current: slug },
      parentInstitution,
      region: 'Global',
      country: clean(row['Country']) || '',
      city: clean(row['City']),
      centerType: mapCenterType(clean(row['Center_Type'])),
      focusAreas: parseFocusAreas(row['Focus_Areas']),
      website: clean(row['Website']),
      outreachPriority: parsePriority(row['Priority_For_Megarobotics']),
      profileStatus: 'Ready',
      director: clean(basic?.Director) || undefined,
      founded: clean(basic?.Founded_Year) || undefined,
      staffCount: clean(basic?.Team_Size) || undefined,
      email: clean(contact?.Contact_Email) || undefined,
      phone: clean(contact?.Contact_Phone) || undefined,
      address: clean(contact?.Address) || undefined,
      socialLinks: (contact?.LinkedIn || contact?.X_Twitter || contact?.YouTube || contact?.GitHub) ? {
        linkedin: clean(contact?.LinkedIn) || undefined,
        twitter: clean(contact?.X_Twitter) || undefined,
        youtube: clean(contact?.YouTube) || undefined,
        github: clean(contact?.GitHub) || undefined,
      } : undefined,
      notes: clean(row['Why_Seed_List']) || undefined,
    }

    try {
      if (existingBySlug[slug]) {
        const existingId = existingBySlug[slug]._id
        await client.patch(existingId).set({
          name: doc.name,
          parentInstitution: doc.parentInstitution,
          region: doc.region,
          country: doc.country,
          city: doc.city,
          centerType: doc.centerType,
          focusAreas: doc.focusAreas,
          website: doc.website,
          outreachPriority: doc.outreachPriority,
          profileStatus: doc.profileStatus,
          notes: doc.notes,
        }).commit()
        console.log(`  UPDATED: ${name} [${slug}]`)
        updated++
      } else {
        await client.create(doc)
        console.log(`  CREATED: ${name} [${slug}]`)
        created++
      }
    } catch (err) {
      console.error(`  ERROR: ${name} — ${err.message}`)
      errors++
    }
  }

  // --- Mark removed institutes as "Needs enrichment" ---
  console.log('\n--- Checking for removed institutes ---')
  for (const e of existing) {
    if (!processedSlugs.has(e.s)) {
      try {
        await client.patch(e._id).set({ profileStatus: 'Needs enrichment' }).commit()
        console.log(`  HIDDEN: ${e.name} [${e.s}] (marked as Needs enrichment)`)
        removed++
      } catch (err) {
        console.error(`  ERROR hiding ${e.name}: ${err.message}`)
        errors++
      }
    }
  }

  console.log('\n===== SUMMARY =====')
  console.log(`Created: ${created}`)
  console.log(`Updated: ${updated}`)
  console.log(`Skipped: ${skipped}`)
  console.log(`Hidden (removed from v4): ${removed}`)
  console.log(`Errors: ${errors}`)
}

main().catch(err => { console.error('Fatal:', err); process.exit(1) })

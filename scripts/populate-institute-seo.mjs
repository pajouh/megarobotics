/**
 * Populate professional SEO data for all institutes
 * Usage: node scripts/populate-institute-seo.mjs
 */

import { createClient } from '@sanity/client'
import { resolve } from 'path'
import { config } from 'dotenv'

config({ path: resolve(process.cwd(), '.env.local') })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
})

function generateMetaTitle(inst) {
  // Max ~60 chars, include institute name + parent + key context
  const name = inst.name
  const parent = inst.parentInstitution

  // If name is short enough, include parent
  if (`${name} – ${parent} | Robotics Research`.length <= 65) {
    return `${name} – ${parent} | Robotics Research`
  }
  if (`${name} | Robotics Research`.length <= 65) {
    return `${name} | Robotics Research`
  }
  // Truncate name
  return `${name.slice(0, 45)}… | Robotics Research`
}

function generateMetaDescription(inst) {
  const name = inst.name
  const parent = inst.parentInstitution
  const city = inst.city || ''
  const country = inst.country
  const type = (inst.centerType || 'research group').toLowerCase()
  const areas = inst.focusAreas || []

  // Build a professional 140-160 char description
  const location = city ? `${city}, ${country}` : country
  const focusPhrase = areas.length > 0
    ? areas.slice(0, 3).join(', ')
    : 'robotics'

  const templates = [
    // Template 1: Focus on institute identity
    `${name} at ${parent} in ${location}. Leading ${type} focused on ${focusPhrase}. Research profile, contact details, and key projects.`,
    // Template 2: Focus on what visitors get
    `Explore ${name}, a ${type} at ${parent} (${location}). Research areas: ${focusPhrase}. Contact info, team details, and publications.`,
    // Template 3: SEO-optimized
    `${name} – ${parent}, ${location}. Robotics ${type} specializing in ${focusPhrase}. Directory profile with contact information and research overview.`,
  ]

  // Pick the template that fits best in 150-160 chars
  for (const t of templates) {
    if (t.length >= 120 && t.length <= 165) return t
  }
  // Default: use template 0 and truncate if needed
  const desc = templates[0]
  return desc.length > 160 ? desc.slice(0, 157) + '...' : desc
}

function generateKeywords(inst) {
  const keywords = new Set()
  const name = inst.name
  const parent = inst.parentInstitution
  const country = inst.country
  const city = inst.city
  const type = inst.centerType
  const areas = inst.focusAreas || []

  // Institute-specific
  keywords.add(name.toLowerCase())
  keywords.add(parent.toLowerCase())
  if (name !== parent) {
    keywords.add(`${parent} robotics`.toLowerCase())
  }

  // Location
  keywords.add(`robotics research ${country.toLowerCase()}`)
  if (city && !city.includes('/')) {
    keywords.add(`robotics ${city.toLowerCase()}`)
  }

  // Type
  if (type) {
    keywords.add(`robotics ${type.toLowerCase()}`)
  }

  // Focus areas as keywords
  for (const area of areas.slice(0, 6)) {
    keywords.add(area.toLowerCase())
    keywords.add(`${area.toLowerCase()} research`)
  }

  // General SEO terms
  keywords.add('robotics research')
  keywords.add('robotics institute')

  if (inst.region === 'DACH') {
    keywords.add('DACH robotics')
  }

  // Country-specific terms
  const countryTerms = {
    'Germany': ['German robotics', 'Robotik Deutschland', 'robotics Germany'],
    'Austria': ['Austrian robotics', 'Robotik Österreich'],
    'Switzerland': ['Swiss robotics', 'Robotik Schweiz', 'ETH robotics', 'EPFL robotics'],
    'USA': ['US robotics research', 'American robotics'],
    'UK': ['UK robotics research', 'British robotics'],
    'Italy': ['Italian robotics research'],
    'Spain': ['Spanish robotics research'],
    'Singapore': ['Singapore robotics'],
    'Canada': ['Canadian robotics research'],
    'Australia': ['Australian robotics research'],
  }
  for (const term of (countryTerms[country] || [])) {
    keywords.add(term.toLowerCase())
  }

  return [...keywords].slice(0, 15)
}

async function main() {
  const institutes = await client.fetch(
    `*[_type == "institute" && profileStatus in ["Ready", "Foundational"]] {
      _id, name, parentInstitution, country, city, centerType, focusAreas, region
    }`
  )

  console.log(`Processing SEO for ${institutes.length} institutes...\n`)

  let updated = 0
  let errors = 0

  for (const inst of institutes) {
    const metaTitle = generateMetaTitle(inst)
    const metaDescription = generateMetaDescription(inst)
    const keywords = generateKeywords(inst)

    try {
      await client.patch(inst._id).set({
        seo: {
          metaTitle,
          metaDescription,
          keywords,
        }
      }).commit()
      console.log(`  OK: ${inst.name}`)
      console.log(`      Title (${metaTitle.length}): ${metaTitle}`)
      console.log(`      Desc (${metaDescription.length}): ${metaDescription.slice(0, 80)}...`)
      console.log(`      Keywords: ${keywords.length}`)
      updated++
    } catch (err) {
      console.error(`  ERROR: ${inst.name} — ${err.message}`)
      errors++
    }
  }

  console.log(`\n===== SUMMARY =====`)
  console.log(`Updated: ${updated}`)
  console.log(`Errors: ${errors}`)
}

main().catch(err => { console.error('Fatal:', err); process.exit(1) })

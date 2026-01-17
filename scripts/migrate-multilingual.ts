/**
 * Migration script to convert existing content to multilingual format
 * and translate missing language fields
 */

import { createClient } from '@sanity/client'
import * as dotenv from 'dotenv'

// Load environment variables
dotenv.config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN, // Need write token
})

// Simple language detection (checks for German-specific characters/words)
function detectLanguage(text: string): 'en' | 'de' {
  if (!text) return 'en'

  const germanIndicators = [
    'ä', 'ö', 'ü', 'ß', 'Ä', 'Ö', 'Ü',
    ' und ', ' oder ', ' der ', ' die ', ' das ', ' ist ', ' sind ', ' für ',
    ' mit ', ' von ', ' zu ', ' im ', ' am ', ' auf ', ' bei ', ' nach ',
    'Roboter', 'Unternehmen', 'Produkt', 'Beschreibung'
  ]

  const lowerText = text.toLowerCase()
  let germanScore = 0

  for (const indicator of germanIndicators) {
    if (text.includes(indicator) || lowerText.includes(indicator.toLowerCase())) {
      germanScore++
    }
  }

  return germanScore >= 2 ? 'de' : 'en'
}

// Simple translations for common terms (fallback)
const translations: Record<string, Record<string, string>> = {
  en: {
    'High-performance': 'Hochleistungs-',
    'robot': 'Roboter',
    'advanced': 'fortschrittlich',
    'technology': 'Technologie',
    'industrial': 'industriell',
    'automation': 'Automatisierung',
  },
  de: {
    'Hochleistungs-': 'High-performance',
    'Roboter': 'robot',
    'fortschrittlich': 'advanced',
    'Technologie': 'technology',
    'industriell': 'industrial',
    'Automatisierung': 'automation',
  }
}

// Translate text (basic implementation - in production use DeepL or Google Translate API)
async function translateText(text: string, from: 'en' | 'de', to: 'en' | 'de'): Promise<string> {
  if (!text || from === to) return text

  // For now, just return the original with a note
  // In production, integrate with DeepL API or Google Translate
  console.log(`  [TODO] Translate from ${from} to ${to}: "${text.substring(0, 50)}..."`)
  return text // Return original for now
}

// Migrate a localized string field
async function migrateLocalizedField(
  currentValue: any,
  fieldName: string
): Promise<{ en?: string; de?: string } | null> {
  // If already in new format
  if (currentValue && typeof currentValue === 'object' && (currentValue.en || currentValue.de)) {
    const result: { en?: string; de?: string } = {}

    if (currentValue.en) result.en = currentValue.en
    if (currentValue.de) result.de = currentValue.de

    // Translate missing language
    if (result.en && !result.de) {
      result.de = await translateText(result.en, 'en', 'de')
    } else if (result.de && !result.en) {
      result.en = await translateText(result.de, 'de', 'en')
    }

    return result
  }

  // If it's a plain string (old format)
  if (typeof currentValue === 'string' && currentValue.trim()) {
    const detectedLang = detectLanguage(currentValue)
    const result: { en?: string; de?: string } = {}

    result[detectedLang] = currentValue

    // Translate to other language
    const otherLang = detectedLang === 'en' ? 'de' : 'en'
    result[otherLang] = await translateText(currentValue, detectedLang, otherLang)

    console.log(`  ${fieldName}: detected as ${detectedLang.toUpperCase()}`)
    return result
  }

  return null
}

// Migrate array fields (like features, applications)
async function migrateLocalizedArray(
  currentValue: any,
  fieldName: string
): Promise<{ en?: string[]; de?: string[] } | null> {
  // If already in new format
  if (currentValue && typeof currentValue === 'object' && (currentValue.en || currentValue.de)) {
    return currentValue
  }

  // If it's a plain array (old format)
  if (Array.isArray(currentValue) && currentValue.length > 0) {
    const detectedLang = detectLanguage(currentValue.join(' '))
    const result: { en?: string[]; de?: string[] } = {}

    result[detectedLang] = currentValue
    console.log(`  ${fieldName}: detected as ${detectedLang.toUpperCase()} (${currentValue.length} items)`)

    return result
  }

  return null
}

// Migrate products
async function migrateProducts() {
  console.log('\n📦 Migrating Products...\n')

  const products = await client.fetch(`*[_type == "product"]{
    _id,
    name,
    tagline,
    description,
    fullDescription,
    features,
    applications
  }`)

  console.log(`Found ${products.length} products`)

  for (const product of products) {
    console.log(`\nProcessing: ${product.name}`)

    const updates: Record<string, any> = {}

    // Migrate tagline
    const tagline = await migrateLocalizedField(product.tagline, 'tagline')
    if (tagline) updates.tagline = tagline

    // Migrate description
    const description = await migrateLocalizedField(product.description, 'description')
    if (description) updates.description = description

    // Migrate fullDescription (block content - more complex)
    if (product.fullDescription && !product.fullDescription.en && !product.fullDescription.de) {
      if (Array.isArray(product.fullDescription)) {
        const detectedLang = detectLanguage(
          product.fullDescription.map((b: any) => b.children?.map((c: any) => c.text).join(' ')).join(' ')
        )
        updates.fullDescription = { [detectedLang]: product.fullDescription }
        console.log(`  fullDescription: detected as ${detectedLang.toUpperCase()}`)
      }
    }

    // Migrate features
    const features = await migrateLocalizedArray(product.features, 'features')
    if (features) updates.features = features

    // Migrate applications
    const applications = await migrateLocalizedArray(product.applications, 'applications')
    if (applications) updates.applications = applications

    // Apply updates
    if (Object.keys(updates).length > 0) {
      console.log(`  Updating ${Object.keys(updates).length} fields...`)
      await client.patch(product._id).set(updates).commit()
      console.log(`  ✅ Updated`)
    } else {
      console.log(`  ⏭️  No changes needed`)
    }
  }
}

// Migrate articles
async function migrateArticles() {
  console.log('\n📰 Migrating Articles...\n')

  const articles = await client.fetch(`*[_type == "article"]{
    _id,
    title,
    excerpt,
    body
  }`)

  console.log(`Found ${articles.length} articles`)

  for (const article of articles) {
    const titleText = typeof article.title === 'string' ? article.title : article.title?.en || article.title?.de || 'Untitled'
    console.log(`\nProcessing: ${titleText}`)

    const updates: Record<string, any> = {}

    // Migrate title
    const title = await migrateLocalizedField(article.title, 'title')
    if (title) updates.title = title

    // Migrate excerpt
    const excerpt = await migrateLocalizedField(article.excerpt, 'excerpt')
    if (excerpt) updates.excerpt = excerpt

    // Migrate body (block content)
    if (article.body && !article.body.en && !article.body.de) {
      if (Array.isArray(article.body)) {
        const detectedLang = detectLanguage(
          article.body.map((b: any) => b.children?.map((c: any) => c.text).join(' ')).join(' ')
        )
        updates.body = { [detectedLang]: article.body }
        console.log(`  body: detected as ${detectedLang.toUpperCase()}`)
      }
    }

    if (Object.keys(updates).length > 0) {
      console.log(`  Updating ${Object.keys(updates).length} fields...`)
      await client.patch(article._id).set(updates).commit()
      console.log(`  ✅ Updated`)
    } else {
      console.log(`  ⏭️  No changes needed`)
    }
  }
}

// Migrate pages
async function migratePages() {
  console.log('\n📄 Migrating Pages...\n')

  const pages = await client.fetch(`*[_type == "page"]{
    _id,
    title,
    subtitle,
    body,
    seo
  }`)

  console.log(`Found ${pages.length} pages`)

  for (const page of pages) {
    const titleText = typeof page.title === 'string' ? page.title : page.title?.en || page.title?.de || 'Untitled'
    console.log(`\nProcessing: ${titleText}`)

    const updates: Record<string, any> = {}

    // Migrate title
    const title = await migrateLocalizedField(page.title, 'title')
    if (title) updates.title = title

    // Migrate subtitle
    const subtitle = await migrateLocalizedField(page.subtitle, 'subtitle')
    if (subtitle) updates.subtitle = subtitle

    // Migrate body
    if (page.body && !page.body.en && !page.body.de) {
      if (Array.isArray(page.body)) {
        const detectedLang = detectLanguage(
          page.body.map((b: any) => b.children?.map((c: any) => c.text).join(' ')).join(' ')
        )
        updates.body = { [detectedLang]: page.body }
        console.log(`  body: detected as ${detectedLang.toUpperCase()}`)
      }
    }

    if (Object.keys(updates).length > 0) {
      console.log(`  Updating ${Object.keys(updates).length} fields...`)
      await client.patch(page._id).set(updates).commit()
      console.log(`  ✅ Updated`)
    } else {
      console.log(`  ⏭️  No changes needed`)
    }
  }
}

// Migrate categories
async function migrateCategories() {
  console.log('\n🏷️  Migrating Categories...\n')

  const categories = await client.fetch(`*[_type == "category" || _type == "productCategory"]{
    _id,
    _type,
    title,
    name,
    description
  }`)

  console.log(`Found ${categories.length} categories`)

  for (const category of categories) {
    const nameText = category.title || category.name
    const displayName = typeof nameText === 'string' ? nameText : nameText?.en || nameText?.de || 'Untitled'
    console.log(`\nProcessing: ${displayName} (${category._type})`)

    const updates: Record<string, any> = {}

    // Migrate title/name
    if (category._type === 'category') {
      const title = await migrateLocalizedField(category.title, 'title')
      if (title) updates.title = title
    } else {
      const name = await migrateLocalizedField(category.name, 'name')
      if (name) updates.name = name
    }

    // Migrate description
    const description = await migrateLocalizedField(category.description, 'description')
    if (description) updates.description = description

    if (Object.keys(updates).length > 0) {
      console.log(`  Updating ${Object.keys(updates).length} fields...`)
      await client.patch(category._id).set(updates).commit()
      console.log(`  ✅ Updated`)
    } else {
      console.log(`  ⏭️  No changes needed`)
    }
  }
}

// Migrate manufacturers
async function migrateManufacturers() {
  console.log('\n🏭 Migrating Manufacturers...\n')

  const manufacturers = await client.fetch(`*[_type == "manufacturer"]{
    _id,
    name,
    description,
    specialties
  }`)

  console.log(`Found ${manufacturers.length} manufacturers`)

  for (const manufacturer of manufacturers) {
    console.log(`\nProcessing: ${manufacturer.name}`)

    const updates: Record<string, any> = {}

    // Migrate description
    const description = await migrateLocalizedField(manufacturer.description, 'description')
    if (description) updates.description = description

    // Migrate specialties
    const specialties = await migrateLocalizedArray(manufacturer.specialties, 'specialties')
    if (specialties) updates.specialties = specialties

    if (Object.keys(updates).length > 0) {
      console.log(`  Updating ${Object.keys(updates).length} fields...`)
      await client.patch(manufacturer._id).set(updates).commit()
      console.log(`  ✅ Updated`)
    } else {
      console.log(`  ⏭️  No changes needed`)
    }
  }
}

// Migrate site settings
async function migrateSiteSettings() {
  console.log('\n⚙️  Migrating Site Settings...\n')

  const settings = await client.fetch(`*[_type == "siteSettings"][0]{
    _id,
    siteTagline,
    footerDescription,
    copyrightText,
    address
  }`)

  if (!settings) {
    console.log('No site settings found')
    return
  }

  console.log('Processing site settings...')

  const updates: Record<string, any> = {}

  // Migrate siteTagline
  const siteTagline = await migrateLocalizedField(settings.siteTagline, 'siteTagline')
  if (siteTagline) updates.siteTagline = siteTagline

  // Migrate footerDescription
  const footerDescription = await migrateLocalizedField(settings.footerDescription, 'footerDescription')
  if (footerDescription) updates.footerDescription = footerDescription

  // Migrate copyrightText
  const copyrightText = await migrateLocalizedField(settings.copyrightText, 'copyrightText')
  if (copyrightText) updates.copyrightText = copyrightText

  // Migrate address
  const address = await migrateLocalizedField(settings.address, 'address')
  if (address) updates.address = address

  if (Object.keys(updates).length > 0) {
    console.log(`  Updating ${Object.keys(updates).length} fields...`)
    await client.patch(settings._id).set(updates).commit()
    console.log(`  ✅ Updated`)
  } else {
    console.log(`  ⏭️  No changes needed`)
  }
}

// Main migration function
async function main() {
  console.log('🚀 Starting Multilingual Migration\n')
  console.log('=' .repeat(50))

  if (!process.env.SANITY_API_TOKEN) {
    console.error('❌ Error: SANITY_API_TOKEN is required')
    console.log('\nTo get a token:')
    console.log('1. Go to https://www.sanity.io/manage')
    console.log('2. Select your project')
    console.log('3. Go to API > Tokens')
    console.log('4. Create a token with "Editor" permissions')
    console.log('5. Add it to .env.local as SANITY_API_TOKEN=...')
    process.exit(1)
  }

  try {
    await migrateProducts()
    await migrateArticles()
    await migratePages()
    await migrateCategories()
    await migrateManufacturers()
    await migrateSiteSettings()

    console.log('\n' + '=' .repeat(50))
    console.log('✅ Migration complete!')
    console.log('\nNote: Automatic translation was not applied.')
    console.log('Please review and add translations manually in Sanity Studio.')
  } catch (error) {
    console.error('❌ Migration failed:', error)
    process.exit(1)
  }
}

main()

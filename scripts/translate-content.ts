/**
 * Translation script to translate all English content to German
 */

import { createClient } from '@sanity/client'
import * as dotenv from 'dotenv'
import { translate } from '@vitalets/google-translate-api'

// Load environment variables
dotenv.config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

// Rate limiting - wait between API calls
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

// Translate text from English to German
async function translateText(text: string): Promise<string> {
  if (!text || text.trim() === '') return text

  try {
    const result = await translate(text, { from: 'en', to: 'de' })
    return result.text
  } catch (error: any) {
    console.error(`    Translation error: ${error.message}`)
    return text // Return original on error
  }
}

// Translate an array of strings
async function translateArray(arr: string[]): Promise<string[]> {
  const translated: string[] = []
  for (const item of arr) {
    const result = await translateText(item)
    translated.push(result)
    await delay(100) // Small delay between translations
  }
  return translated
}

// Translate block content (rich text)
async function translateBlockContent(blocks: any[]): Promise<any[]> {
  if (!Array.isArray(blocks)) return blocks

  const translatedBlocks = []
  for (const block of blocks) {
    if (block._type === 'block' && block.children) {
      const translatedChildren = []
      for (const child of block.children) {
        if (child._type === 'span' && child.text) {
          const translatedText = await translateText(child.text)
          translatedChildren.push({ ...child, text: translatedText })
          await delay(50)
        } else {
          translatedChildren.push(child)
        }
      }
      translatedBlocks.push({ ...block, children: translatedChildren })
    } else {
      translatedBlocks.push(block)
    }
  }
  return translatedBlocks
}

// Translate products
async function translateProducts() {
  console.log('\n📦 Translating Products...\n')

  const products = await client.fetch(`*[_type == "product"]{
    _id,
    name,
    tagline,
    description,
    fullDescription,
    features,
    applications
  }`)

  console.log(`Found ${products.length} products to translate`)

  for (let i = 0; i < products.length; i++) {
    const product = products[i]
    console.log(`\n[${i + 1}/${products.length}] ${product.name}`)

    const updates: Record<string, any> = {}

    // Translate tagline
    if (product.tagline?.en && (!product.tagline?.de || product.tagline.de === product.tagline.en)) {
      console.log('  Translating tagline...')
      const translated = await translateText(product.tagline.en)
      updates.tagline = { en: product.tagline.en, de: translated }
      await delay(200)
    }

    // Translate description
    if (product.description?.en && (!product.description?.de || product.description.de === product.description.en)) {
      console.log('  Translating description...')
      const translated = await translateText(product.description.en)
      updates.description = { en: product.description.en, de: translated }
      await delay(200)
    }

    // Translate fullDescription (block content)
    if (product.fullDescription?.en && (!product.fullDescription?.de ||
        JSON.stringify(product.fullDescription.de) === JSON.stringify(product.fullDescription.en))) {
      console.log('  Translating full description...')
      const translated = await translateBlockContent(product.fullDescription.en)
      updates.fullDescription = { en: product.fullDescription.en, de: translated }
      await delay(200)
    }

    // Translate features
    if (product.features?.en && (!product.features?.de ||
        JSON.stringify(product.features.de) === JSON.stringify(product.features.en))) {
      console.log('  Translating features...')
      const translated = await translateArray(product.features.en)
      updates.features = { en: product.features.en, de: translated }
      await delay(200)
    }

    // Translate applications
    if (product.applications?.en && (!product.applications?.de ||
        JSON.stringify(product.applications.de) === JSON.stringify(product.applications.en))) {
      console.log('  Translating applications...')
      const translated = await translateArray(product.applications.en)
      updates.applications = { en: product.applications.en, de: translated }
      await delay(200)
    }

    // Apply updates
    if (Object.keys(updates).length > 0) {
      await client.patch(product._id).set(updates).commit()
      console.log(`  ✅ Translated ${Object.keys(updates).length} fields`)
    } else {
      console.log('  ⏭️  Already translated')
    }
  }
}

// Translate articles
async function translateArticles() {
  console.log('\n📰 Translating Articles...\n')

  const articles = await client.fetch(`*[_type == "article"]{
    _id,
    title,
    excerpt,
    body
  }`)

  console.log(`Found ${articles.length} articles to translate`)

  for (let i = 0; i < articles.length; i++) {
    const article = articles[i]
    const titleText = article.title?.en || article.title?.de || 'Untitled'
    console.log(`\n[${i + 1}/${articles.length}] ${titleText}`)

    const updates: Record<string, any> = {}

    // Translate title
    if (article.title?.en && (!article.title?.de || article.title.de === article.title.en)) {
      console.log('  Translating title...')
      const translated = await translateText(article.title.en)
      updates.title = { en: article.title.en, de: translated }
      await delay(200)
    }

    // Translate excerpt
    if (article.excerpt?.en && (!article.excerpt?.de || article.excerpt.de === article.excerpt.en)) {
      console.log('  Translating excerpt...')
      const translated = await translateText(article.excerpt.en)
      updates.excerpt = { en: article.excerpt.en, de: translated }
      await delay(200)
    }

    // Translate body
    if (article.body?.en && (!article.body?.de ||
        JSON.stringify(article.body.de) === JSON.stringify(article.body.en))) {
      console.log('  Translating body...')
      const translated = await translateBlockContent(article.body.en)
      updates.body = { en: article.body.en, de: translated }
      await delay(200)
    }

    if (Object.keys(updates).length > 0) {
      await client.patch(article._id).set(updates).commit()
      console.log(`  ✅ Translated ${Object.keys(updates).length} fields`)
    } else {
      console.log('  ⏭️  Already translated')
    }
  }
}

// Translate pages
async function translatePages() {
  console.log('\n📄 Translating Pages...\n')

  const pages = await client.fetch(`*[_type == "page"]{
    _id,
    title,
    subtitle,
    body
  }`)

  console.log(`Found ${pages.length} pages to translate`)

  for (let i = 0; i < pages.length; i++) {
    const page = pages[i]
    const titleText = page.title?.en || page.title?.de || 'Untitled'
    console.log(`\n[${i + 1}/${pages.length}] ${titleText}`)

    const updates: Record<string, any> = {}

    // Translate title
    if (page.title?.en && (!page.title?.de || page.title.de === page.title.en)) {
      console.log('  Translating title...')
      const translated = await translateText(page.title.en)
      updates.title = { en: page.title.en, de: translated }
      await delay(200)
    }

    // Translate subtitle
    if (page.subtitle?.en && (!page.subtitle?.de || page.subtitle.de === page.subtitle.en)) {
      console.log('  Translating subtitle...')
      const translated = await translateText(page.subtitle.en)
      updates.subtitle = { en: page.subtitle.en, de: translated }
      await delay(200)
    }

    // Translate body - check if it needs translation
    if (page.body?.en && (!page.body?.de ||
        JSON.stringify(page.body.de) === JSON.stringify(page.body.en))) {
      console.log('  Translating body...')
      const translated = await translateBlockContent(page.body.en)
      updates.body = { en: page.body.en, de: translated }
      await delay(200)
    }

    if (Object.keys(updates).length > 0) {
      await client.patch(page._id).set(updates).commit()
      console.log(`  ✅ Translated ${Object.keys(updates).length} fields`)
    } else {
      console.log('  ⏭️  Already translated')
    }
  }
}

// Translate categories
async function translateCategories() {
  console.log('\n🏷️  Translating Categories...\n')

  const categories = await client.fetch(`*[_type == "category" || _type == "productCategory"]{
    _id,
    _type,
    title,
    name,
    description
  }`)

  console.log(`Found ${categories.length} categories to translate`)

  for (let i = 0; i < categories.length; i++) {
    const category = categories[i]
    const nameField = category._type === 'category' ? 'title' : 'name'
    const nameValue = category[nameField]
    const displayName = nameValue?.en || nameValue?.de || 'Untitled'
    console.log(`\n[${i + 1}/${categories.length}] ${displayName}`)

    const updates: Record<string, any> = {}

    // Translate title/name
    if (nameValue?.en && (!nameValue?.de || nameValue.de === nameValue.en)) {
      console.log(`  Translating ${nameField}...`)
      const translated = await translateText(nameValue.en)
      updates[nameField] = { en: nameValue.en, de: translated }
      await delay(200)
    }

    // Translate description
    if (category.description?.en && (!category.description?.de || category.description.de === category.description.en)) {
      console.log('  Translating description...')
      const translated = await translateText(category.description.en)
      updates.description = { en: category.description.en, de: translated }
      await delay(200)
    }

    if (Object.keys(updates).length > 0) {
      await client.patch(category._id).set(updates).commit()
      console.log(`  ✅ Translated ${Object.keys(updates).length} fields`)
    } else {
      console.log('  ⏭️  Already translated')
    }
  }
}

// Translate manufacturers
async function translateManufacturers() {
  console.log('\n🏭 Translating Manufacturers...\n')

  const manufacturers = await client.fetch(`*[_type == "manufacturer"]{
    _id,
    name,
    description,
    specialties
  }`)

  console.log(`Found ${manufacturers.length} manufacturers to translate`)

  for (let i = 0; i < manufacturers.length; i++) {
    const manufacturer = manufacturers[i]
    console.log(`\n[${i + 1}/${manufacturers.length}] ${manufacturer.name}`)

    const updates: Record<string, any> = {}

    // Translate description
    if (manufacturer.description?.en && (!manufacturer.description?.de || manufacturer.description.de === manufacturer.description.en)) {
      console.log('  Translating description...')
      const translated = await translateText(manufacturer.description.en)
      updates.description = { en: manufacturer.description.en, de: translated }
      await delay(200)
    }

    // Translate specialties
    if (manufacturer.specialties?.en && (!manufacturer.specialties?.de ||
        JSON.stringify(manufacturer.specialties.de) === JSON.stringify(manufacturer.specialties.en))) {
      console.log('  Translating specialties...')
      const translated = await translateArray(manufacturer.specialties.en)
      updates.specialties = { en: manufacturer.specialties.en, de: translated }
      await delay(200)
    }

    if (Object.keys(updates).length > 0) {
      await client.patch(manufacturer._id).set(updates).commit()
      console.log(`  ✅ Translated ${Object.keys(updates).length} fields`)
    } else {
      console.log('  ⏭️  Already translated')
    }
  }
}

// Translate site settings
async function translateSiteSettings() {
  console.log('\n⚙️  Translating Site Settings...\n')

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

  // Translate siteTagline
  if (settings.siteTagline?.en && (!settings.siteTagline?.de || settings.siteTagline.de === settings.siteTagline.en)) {
    console.log('  Translating site tagline...')
    const translated = await translateText(settings.siteTagline.en)
    updates.siteTagline = { en: settings.siteTagline.en, de: translated }
    await delay(200)
  }

  // Translate footerDescription
  if (settings.footerDescription?.en && (!settings.footerDescription?.de || settings.footerDescription.de === settings.footerDescription.en)) {
    console.log('  Translating footer description...')
    const translated = await translateText(settings.footerDescription.en)
    updates.footerDescription = { en: settings.footerDescription.en, de: translated }
    await delay(200)
  }

  // Translate copyrightText
  if (settings.copyrightText?.en && (!settings.copyrightText?.de || settings.copyrightText.de === settings.copyrightText.en)) {
    console.log('  Translating copyright text...')
    const translated = await translateText(settings.copyrightText.en)
    updates.copyrightText = { en: settings.copyrightText.en, de: translated }
    await delay(200)
  }

  // Translate address
  if (settings.address?.en && (!settings.address?.de || settings.address.de === settings.address.en)) {
    console.log('  Translating address...')
    const translated = await translateText(settings.address.en)
    updates.address = { en: settings.address.en, de: translated }
    await delay(200)
  }

  if (Object.keys(updates).length > 0) {
    await client.patch(settings._id).set(updates).commit()
    console.log(`  ✅ Translated ${Object.keys(updates).length} fields`)
  } else {
    console.log('  ⏭️  Already translated')
  }
}

// Main function
async function main() {
  console.log('🌐 Starting Translation to German\n')
  console.log('=' .repeat(50))

  try {
    await translateProducts()
    await translateArticles()
    await translatePages()
    await translateCategories()
    await translateManufacturers()
    await translateSiteSettings()

    console.log('\n' + '=' .repeat(50))
    console.log('✅ Translation complete!')
    console.log('\nAll content has been translated from English to German.')
    console.log('You can review and edit translations in Sanity Studio.')
  } catch (error) {
    console.error('❌ Translation failed:', error)
    process.exit(1)
  }
}

main()

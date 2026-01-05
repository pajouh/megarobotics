import { createClient } from '@sanity/client'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'wudur8e8',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

async function importAdditionalProducts() {
  console.log('Starting additional products import...\n')

  const dataPath = path.join(__dirname, 'additional-products.json')
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'))

  // Get existing references
  const [manufacturers, categories] = await Promise.all([
    client.fetch('*[_type == "manufacturer"]{_id, "slug": slug.current}'),
    client.fetch('*[_type == "productCategory"]{_id, "slug": slug.current}')
  ])

  const manufacturerRefs = {}
  manufacturers.forEach(m => manufacturerRefs[m.slug] = m._id)

  const categoryRefs = {}
  categories.forEach(c => categoryRefs[c.slug] = c._id)

  console.log('Importing products...')
  let imported = 0
  let failed = 0

  for (const product of data.products) {
    const manufacturerId = manufacturerRefs[product.manufacturerSlug]
    const categoryId = categoryRefs[product.categorySlug]

    if (!manufacturerId) {
      console.error(`  ✗ ${product.name}: Manufacturer "${product.manufacturerSlug}" not found`)
      failed++
      continue
    }

    if (!categoryId) {
      console.error(`  ✗ ${product.name}: Category "${product.categorySlug}" not found`)
      failed++
      continue
    }

    const doc = {
      _type: 'product',
      name: product.name,
      slug: { _type: 'slug', current: product.slug },
      manufacturer: { _type: 'reference', _ref: manufacturerId },
      category: { _type: 'reference', _ref: categoryId },
      tagline: product.tagline,
      description: product.description,
      priceRange: product.priceRange,
      availability: product.availability,
      featured: product.featured,
      isNew: product.isNew,
      specifications: product.specifications,
      features: product.features,
      applications: product.applications,
      productUrl: product.productUrl,
      publishedAt: new Date().toISOString(),
    }

    try {
      await client.createOrReplace({
        _id: `product-${product.slug}`,
        ...doc,
      })
      console.log(`  ✓ ${product.name}`)
      imported++
    } catch (error) {
      console.error(`  ✗ ${product.name}:`, error.message)
      failed++
    }
  }

  console.log(`\n✅ Import complete! ${imported} products imported, ${failed} failed.`)
}

importAdditionalProducts().catch(console.error)

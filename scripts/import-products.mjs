import { createClient } from '@sanity/client'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Initialize Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'wudur8e8',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

async function importData() {
  console.log('Starting data import...')

  // Read data file
  const dataPath = path.join(__dirname, 'products-data.json')
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'))

  // Import Product Categories first
  console.log('Importing product categories...')
  const categoryRefs = {}

  for (const category of data.productCategories) {
    const doc = {
      _type: 'productCategory',
      name: category.name,
      slug: { _type: 'slug', current: category.slug },
      description: category.description,
      icon: category.icon,
      order: category.order,
    }

    try {
      const result = await client.createOrReplace({
        _id: `productCategory-${category.slug}`,
        ...doc,
      })
      categoryRefs[category.slug] = result._id
      console.log(`  ✓ ${category.name}`)
    } catch (error) {
      console.error(`  ✗ ${category.name}:`, error.message)
    }
  }

  // Import Manufacturers
  console.log('\nImporting manufacturers...')
  const manufacturerRefs = {}

  for (const manufacturer of data.manufacturers) {
    const doc = {
      _type: 'manufacturer',
      name: manufacturer.name,
      slug: { _type: 'slug', current: manufacturer.slug },
      description: manufacturer.description,
      website: manufacturer.website,
      headquarters: manufacturer.headquarters,
      founded: manufacturer.founded,
      specialties: manufacturer.specialties,
      featured: manufacturer.featured,
    }

    try {
      const result = await client.createOrReplace({
        _id: `manufacturer-${manufacturer.slug}`,
        ...doc,
      })
      manufacturerRefs[manufacturer.slug] = result._id
      console.log(`  ✓ ${manufacturer.name}`)
    } catch (error) {
      console.error(`  ✗ ${manufacturer.name}:`, error.message)
    }
  }

  // Import Products
  console.log('\nImporting products...')

  for (const product of data.products) {
    const manufacturerId = manufacturerRefs[product.manufacturerSlug]
    const categoryId = categoryRefs[product.categorySlug]

    if (!manufacturerId || !categoryId) {
      console.error(`  ✗ ${product.name}: Missing manufacturer or category reference`)
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
    } catch (error) {
      console.error(`  ✗ ${product.name}:`, error.message)
    }
  }

  console.log('\n✅ Import complete!')
}

importData().catch(console.error)

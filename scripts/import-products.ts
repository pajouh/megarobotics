import { createClient } from '@sanity/client'
import * as fs from 'fs'
import * as path from 'path'

// Initialize Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'wudur8e8',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN, // You need a write token
  useCdn: false,
})

interface ManufacturerData {
  name: string
  slug: string
  description: string
  website: string
  headquarters: string
  founded: string
  specialties: string[]
  featured: boolean
}

interface ProductCategoryData {
  name: string
  slug: string
  description: string
  icon: string
  order: number
}

interface ProductData {
  name: string
  slug: string
  manufacturerSlug: string
  categorySlug: string
  tagline: string
  description: string
  priceRange: string
  availability: string
  featured: boolean
  isNew: boolean
  specifications: { label: string; value: string }[]
  features: string[]
  applications: string[]
  productUrl?: string
}

async function importData() {
  console.log('Starting data import...')

  // Read data file
  const dataPath = path.join(__dirname, 'products-data.json')
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'))

  // Import Product Categories first
  console.log('Importing product categories...')
  const categoryRefs: Record<string, string> = {}

  for (const category of data.productCategories as ProductCategoryData[]) {
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
      console.error(`  ✗ ${category.name}:`, error)
    }
  }

  // Import Manufacturers
  console.log('\nImporting manufacturers...')
  const manufacturerRefs: Record<string, string> = {}

  for (const manufacturer of data.manufacturers as ManufacturerData[]) {
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
      console.error(`  ✗ ${manufacturer.name}:`, error)
    }
  }

  // Import Products
  console.log('\nImporting products...')

  for (const product of data.products as ProductData[]) {
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
      console.error(`  ✗ ${product.name}:`, error)
    }
  }

  console.log('\n✅ Import complete!')
}

importData().catch(console.error)

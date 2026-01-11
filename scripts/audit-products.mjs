// Script to audit products - check manufacturer and image assignments
import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'wudur8e8',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

async function auditProducts() {
  console.log('Fetching all products...\n')

  const products = await client.fetch(`
    *[_type == "product"] | order(manufacturer->name, name) {
      _id,
      name,
      slug,
      "manufacturerName": manufacturer->name,
      "manufacturerSlug": manufacturer->slug.current,
      "categoryName": category->name,
      "hasImage": defined(mainImage),
      "imageUrl": mainImage.asset->url
    }
  `)

  console.log(`Found ${products.length} products\n`)
  console.log('=' .repeat(80))

  // Group by manufacturer
  const byManufacturer = {}
  for (const product of products) {
    const mfr = product.manufacturerName || 'NO MANUFACTURER'
    if (!byManufacturer[mfr]) {
      byManufacturer[mfr] = []
    }
    byManufacturer[mfr].push(product)
  }

  // Print products grouped by manufacturer
  for (const [manufacturer, prods] of Object.entries(byManufacturer).sort()) {
    console.log(`\n📦 ${manufacturer} (${prods.length} products)`)
    console.log('-'.repeat(60))

    for (const p of prods) {
      const imageStatus = p.hasImage ? '✅' : '❌ NO IMAGE'
      const slug = p.slug?.current || 'no-slug'

      // Check if product name contains manufacturer name (basic sanity check)
      const nameMatchesMfr = manufacturer !== 'NO MANUFACTURER' &&
        (p.name.toLowerCase().includes(manufacturer.toLowerCase()) ||
         manufacturer.toLowerCase().includes(p.name.split(' ')[0].toLowerCase()))

      const warning = !nameMatchesMfr && manufacturer !== 'NO MANUFACTURER' ? '⚠️ ' : '  '

      console.log(`${warning}${imageStatus} ${p.name}`)
      console.log(`      Category: ${p.categoryName || 'None'}`)
      console.log(`      Slug: ${slug}`)
      if (p.imageUrl) {
        console.log(`      Image: ${p.imageUrl.substring(0, 60)}...`)
      }
    }
  }

  // Summary of potential issues
  console.log('\n' + '='.repeat(80))
  console.log('POTENTIAL ISSUES:')
  console.log('='.repeat(80))

  const issues = []

  for (const product of products) {
    // No manufacturer
    if (!product.manufacturerName) {
      issues.push(`❌ "${product.name}" has no manufacturer assigned`)
    }

    // No image
    if (!product.hasImage) {
      issues.push(`❌ "${product.name}" has no image`)
    }

    // Name doesn't seem to match manufacturer
    if (product.manufacturerName) {
      const mfrLower = product.manufacturerName.toLowerCase()
      const nameLower = product.name.toLowerCase()

      // Check common patterns
      const mfrWords = mfrLower.split(/[\s-]+/)
      const nameWords = nameLower.split(/[\s-]+/)

      const hasMatch = mfrWords.some(mw =>
        nameWords.some(nw => nw.includes(mw) || mw.includes(nw))
      )

      if (!hasMatch && product.manufacturerName !== 'Other') {
        issues.push(`⚠️  "${product.name}" might not belong to ${product.manufacturerName}`)
      }
    }
  }

  if (issues.length === 0) {
    console.log('\n✅ No obvious issues found!')
  } else {
    console.log(`\nFound ${issues.length} potential issues:\n`)
    issues.forEach(issue => console.log(issue))
  }

  // Print image URLs for manual verification
  console.log('\n' + '='.repeat(80))
  console.log('PRODUCTS WITH IMAGES (for manual image verification):')
  console.log('='.repeat(80))

  for (const product of products.filter(p => p.hasImage)) {
    console.log(`\n${product.name} (${product.manufacturerName})`)
    console.log(`  ${product.imageUrl}`)
  }
}

auditProducts().catch(console.error)

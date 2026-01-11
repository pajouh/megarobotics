// Deep audit script - checks for image mismatches across products
import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'wudur8e8',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

async function deepAudit() {
  // Fetch all products with full image details
  const products = await client.fetch(`
    *[_type == "product"] | order(name) {
      _id,
      name,
      "manufacturerName": manufacturer->name,
      "imageAssetId": mainImage.asset._ref,
      "imageAlt": mainImage.alt,
      "imageUrl": mainImage.asset->url,
      "originalFilename": mainImage.asset->originalFilename
    }
  `)

  console.log('='.repeat(100))
  console.log('DEEP IMAGE AUDIT - Grouping products by shared images')
  console.log('='.repeat(100))

  // Group by image asset ID
  const byImage = {}
  for (const p of products) {
    const key = p.imageAssetId || 'NO_IMAGE'
    if (!byImage[key]) {
      byImage[key] = {
        url: p.imageUrl,
        alt: p.imageAlt,
        filename: p.originalFilename,
        products: []
      }
    }
    byImage[key].products.push({
      name: p.name,
      manufacturer: p.manufacturerName,
      id: p._id
    })
  }

  // Find shared images (potential problems)
  console.log('\n🔴 SHARED IMAGES (Multiple products using same image):')
  console.log('-'.repeat(100))

  let issueCount = 0
  for (const [assetId, data] of Object.entries(byImage)) {
    if (data.products.length > 1) {
      issueCount++
      const manufacturers = [...new Set(data.products.map(p => p.manufacturer))]
      const isCrossManufacturer = manufacturers.length > 1

      console.log(`\n${isCrossManufacturer ? '❌ CROSS-MANUFACTURER' : '⚠️  SAME MANUFACTURER'} - Image shared by ${data.products.length} products:`)
      console.log(`   Asset: ${assetId}`)
      console.log(`   Filename: ${data.filename || 'unknown'}`)
      console.log(`   Alt text: ${data.alt || 'none'}`)
      console.log(`   URL: ${data.url}`)
      console.log(`   Products using this image:`)
      for (const p of data.products) {
        console.log(`      - ${p.name} (${p.manufacturer})`)
      }
      if (isCrossManufacturer) {
        console.log(`   ⚠️  PROBLEM: Image is used across different manufacturers: ${manufacturers.join(', ')}`)
      }
    }
  }

  // Products with unique images
  console.log('\n\n✅ PRODUCTS WITH UNIQUE IMAGES:')
  console.log('-'.repeat(100))
  for (const [assetId, data] of Object.entries(byImage)) {
    if (data.products.length === 1) {
      const p = data.products[0]
      console.log(`   ${p.name} (${p.manufacturer}) - ${data.filename || 'no filename'}`)
    }
  }

  // Summary
  console.log('\n\n' + '='.repeat(100))
  console.log('SUMMARY:')
  console.log('='.repeat(100))

  const uniqueImages = Object.values(byImage).filter(d => d.products.length === 1).length
  const sharedImages = Object.values(byImage).filter(d => d.products.length > 1).length
  const productsWithSharedImages = Object.values(byImage)
    .filter(d => d.products.length > 1)
    .reduce((sum, d) => sum + d.products.length, 0)

  console.log(`Total products: ${products.length}`)
  console.log(`Unique images: ${uniqueImages}`)
  console.log(`Shared images: ${sharedImages} (used by ${productsWithSharedImages} products)`)

  // Cross-manufacturer issues
  const crossMfrIssues = Object.values(byImage).filter(d => {
    const mfrs = [...new Set(d.products.map(p => p.manufacturer))]
    return d.products.length > 1 && mfrs.length > 1
  })

  console.log(`\n🔴 CRITICAL: ${crossMfrIssues.length} images are shared across different manufacturers!`)

  for (const data of crossMfrIssues) {
    const mfrs = [...new Set(data.products.map(p => p.manufacturer))]
    console.log(`   - 1 image shared by: ${mfrs.join(', ')}`)
  }

  // List all images that need to be fixed
  console.log('\n\n' + '='.repeat(100))
  console.log('PRODUCTS THAT NEED CORRECT IMAGES:')
  console.log('='.repeat(100))

  for (const [assetId, data] of Object.entries(byImage)) {
    if (data.products.length > 1) {
      // For shared images, all but possibly one product need new images
      // The image likely belongs to one of the products (probably first alphabetically or the one matching filename)
      const filenameHint = (data.filename || '').toLowerCase()

      for (const p of data.products) {
        const nameLower = p.name.toLowerCase()
        const mfrLower = (p.manufacturer || '').toLowerCase()

        // Check if filename contains hints about the product
        const filenameMatchesProduct = filenameHint.includes(nameLower.split(' ')[0]) ||
                                       filenameHint.includes(mfrLower.split(' ')[0])

        if (!filenameMatchesProduct) {
          console.log(`   ❌ ${p.name} (${p.manufacturer}) - needs correct image`)
          console.log(`      Current image filename: ${data.filename || 'unknown'}`)
          console.log(`      URL: ${data.url}`)
        } else {
          console.log(`   ✅ ${p.name} (${p.manufacturer}) - image filename matches, likely correct`)
        }
      }
    }
  }
}

deepAudit().catch(console.error)

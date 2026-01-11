// Script to verify all product-manufacturer assignments
import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'wudur8e8',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

async function checkAll() {
  // Get all products with manufacturer info
  const products = await client.fetch(`
    *[_type == "product"] | order(name) {
      _id,
      name,
      slug,
      "manufacturerId": manufacturer._ref,
      "manufacturerName": manufacturer->name
    }
  `)

  // Get all manufacturers
  const manufacturers = await client.fetch(`
    *[_type == "manufacturer"] {
      _id,
      name,
      slug
    }
  `)

  console.log('=== MANUFACTURERS IN DATABASE ===')
  manufacturers.forEach(m => console.log(`  ${m.name} (ID: ${m._id})`))

  console.log('\n=== PRODUCT-MANUFACTURER VERIFICATION ===')

  const issues = []

  for (const p of products) {
    const nameLower = p.name.toLowerCase()
    const mfrLower = (p.manufacturerName || '').toLowerCase()

    // Extract likely brand from product name
    const nameWords = p.name.split(/[\s-]+/)
    const productBrand = nameWords[0].toLowerCase()

    let status = '✅'
    let issue = ''

    if (!p.manufacturerName) {
      status = '❌'
      issue = 'NO MANUFACTURER ASSIGNED'
      issues.push({ product: p.name, issue })
    } else {
      // Check if manufacturer name appears in product name or vice versa
      const mfrWords = mfrLower.split(/[\s-]+/)
      const hasMatch = mfrWords.some(mw =>
        nameLower.includes(mw) || productBrand.includes(mw) || mw.includes(productBrand)
      )

      if (!hasMatch) {
        status = '⚠️ '
        issue = `POSSIBLE MISMATCH`
        issues.push({ product: p.name, manufacturer: p.manufacturerName, issue })
      }
    }

    console.log(`${status} ${p.name} -> ${p.manufacturerName || 'NONE'}`)
  }

  if (issues.length > 0) {
    console.log('\n=== POTENTIAL ISSUES ===')
    issues.forEach(i => {
      console.log(`  ❌ ${i.product}: ${i.issue}${i.manufacturer ? ` (assigned to: ${i.manufacturer})` : ''}`)
    })
  } else {
    console.log('\n✅ All manufacturer assignments look correct!')
  }
}

checkAll().catch(console.error)

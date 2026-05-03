import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'wudur8e8',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

const products = await client.fetch(`*[_type == "product" && !defined(isActive)]{_id, name}`)
console.log(`Setting ${products.length} products to isActive: true`)

for (const p of products) {
  await client.patch(p._id).set({ isActive: true }).commit()
  console.log(`  ✓ ${p.name}`)
}
console.log('Done')

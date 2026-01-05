import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'wudur8e8',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
})

const products = await client.fetch('*[_type == "product"]{name, slug, "hasImage": defined(mainImage), "manufacturer": manufacturer->name} | order(name)')

const withImages = products.filter(p => p.hasImage)
const withoutImages = products.filter(p => !p.hasImage)

console.log(`Products WITH images (${withImages.length}):`)
withImages.forEach(p => console.log(`  ✓ ${p.name}`))

console.log(`\nProducts WITHOUT images (${withoutImages.length}):`)
withoutImages.forEach(p => console.log(`  ✗ ${p.name} (${p.manufacturer})`))

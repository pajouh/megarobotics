import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'wudur8e8',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
})

const [manufacturers, products] = await Promise.all([
  client.fetch('*[_type == "manufacturer"]{name, slug}'),
  client.fetch('*[_type == "product"]{name, "manufacturerSlug": manufacturer->slug.current}')
])

const productsByMfr = {}
products.forEach(p => {
  if (!productsByMfr[p.manufacturerSlug]) productsByMfr[p.manufacturerSlug] = []
  productsByMfr[p.manufacturerSlug].push(p.name)
})

console.log('Manufacturers WITHOUT products:')
manufacturers.forEach(m => {
  const prods = productsByMfr[m.slug.current] || []
  if (prods.length === 0) console.log('  -', m.name, '(slug:', m.slug.current + ')')
})

console.log('\nManufacturers WITH products:')
manufacturers.forEach(m => {
  const prods = productsByMfr[m.slug.current] || []
  if (prods.length > 0) console.log('  -', m.name, '(' + prods.length + ' products)')
})

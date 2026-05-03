import { createClient } from '@sanity/client'

// Initialize Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'wudur8e8',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

async function listArticles() {
  console.log('Fetching all articles...\n')

  const articles = await client.fetch(`
    *[_type == "article"] | order(title asc) {
      _id,
      title,
      "slug": slug.current,
      "bodyLength": length(body)
    }
  `)

  console.log(`Found ${articles.length} articles:\n`)

  articles.forEach(a => {
    const title = typeof a.title === 'object' ? (a.title.en || a.title.de || 'Untitled') : a.title
    console.log(`  ${a.slug}: ${title} (body: ${a.bodyLength || 0} blocks)`)
  })
}

listArticles().catch(console.error)

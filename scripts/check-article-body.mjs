import { createClient } from '@sanity/client'

// Initialize Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'wudur8e8',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

async function checkArticleBody() {
  console.log('Fetching all quadruped articles...\n')

  // Fetch articles matching the pattern
  const articles = await client.fetch(`
    *[_type == "article" && slug.current match "quadruped*"] {
      _id,
      title,
      "slug": slug.current,
      body,
      "bodyLength": length(body),
      "bodyTypes": body[]._type
    }
  `)

  console.log(`Found ${articles.length} articles:\n`)

  articles.forEach(a => {
    console.log(`Article: ${a.slug}`)
    console.log(`  ID: ${a._id}`)
    console.log(`  Title: ${a.title}`)
    console.log(`  Body exists: ${!!a.body}`)
    console.log(`  Body length: ${a.bodyLength || 0}`)
    console.log(`  Body types: ${JSON.stringify(a.bodyTypes || [])}`)

    if (a.body && a.body.length > 0) {
      console.log(`  First block type: ${a.body[0]?._type}`)
      if (a.body[0]?._type === 'htmlEmbed') {
        console.log(`  HTML content preview: ${a.body[0]?.html?.substring(0, 200)}...`)
      }
    }
    console.log('')
  })
}

checkArticleBody().catch(console.error)

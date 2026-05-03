import { createClient } from '@sanity/client'

// Initialize Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'wudur8e8',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

async function fixArticleBody() {
  console.log('Fetching articles...\n')

  // Fetch both articles
  const articles = await client.fetch(`
    *[_type == "article" && slug.current in ["quadruped-robots-applications", "quadruped-robots-applications_2"]] {
      _id,
      title,
      "slug": slug.current,
      body
    }
  `)

  console.log(`Found ${articles.length} articles:`)
  articles.forEach(a => {
    console.log(`  - ${a.slug}: ${a.body ? 'HAS body content' : 'NO body content'}`)
  })

  const original = articles.find(a => a.slug === 'quadruped-robots-applications')
  const withBody = articles.find(a => a.slug === 'quadruped-robots-applications_2')

  if (!original) {
    console.log('\nOriginal article not found!')
    return
  }

  if (!withBody) {
    console.log('\nArticle with body (_2) not found!')
    return
  }

  if (!withBody.body) {
    console.log('\nThe _2 article has no body content either!')
    return
  }

  if (original.body && original.body.length > 0) {
    console.log('\nOriginal article already has body content. Skipping.')
    return
  }

  console.log(`\nCopying body from "${withBody.slug}" to "${original.slug}"...`)

  // Copy the body content
  await client
    .patch(original._id)
    .set({ body: withBody.body })
    .commit()

  console.log('Body content copied successfully!')
  console.log('\nYou can now view the article at: https://megarobotics.de/articles/quadruped-robots-applications')
}

fixArticleBody().catch(console.error)

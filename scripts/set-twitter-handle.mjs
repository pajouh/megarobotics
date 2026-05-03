import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'wudur8e8',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

const settings = await client.fetch(`*[_type == "siteSettings"][0]{_id, socialLinks}`)
if (!settings) {
  console.error('No siteSettings document found')
  process.exit(1)
}

const updated = {
  ...(settings.socialLinks || {}),
  twitter: 'https://x.com/megarobotics_de',
}

await client.patch(settings._id).set({ socialLinks: updated }).commit()
console.log('Twitter handle set to https://x.com/megarobotics_de')

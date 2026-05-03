// Upload images to Sanity and update the LimX article
import { createClient } from '@sanity/client'
import { createReadStream } from 'fs'
import path from 'path'

const client = createClient({
  projectId: 'wudur8e8',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

const ARTICLE_ID = '40L5ChlweOHtktuIUILmV0'

async function uploadImage(filePath, filename) {
  const stream = createReadStream(filePath)
  const asset = await client.assets.upload('image', stream, { filename })
  console.log(`Uploaded ${filename} → ${asset._id}`)
  return asset._id
}

async function main() {
  try {
    // Upload all 3 images
    const [headerId, tron2Id, cosaId] = await Promise.all([
      uploadImage('/tmp/limx-images/header.jpg', 'limx-series-b-header.jpg'),
      uploadImage('/tmp/limx-images/tron2.png', 'limx-tron2.png'),
      uploadImage('/tmp/limx-images/cosa.jpg', 'limx-cosa.jpg'),
    ])

    // Set the header image as mainImage
    await client
      .patch(ARTICLE_ID)
      .set({
        mainImage: {
          _type: 'image',
          alt: 'LimX Dynamics Secures $200 Million in Series B Financing',
          asset: { _type: 'reference', _ref: headerId },
        },
      })
      .commit()
    console.log('Set mainImage (header)')

    // Now insert the TRON 2 and COSA images into the body for both EN and DE
    // We'll add them after the relevant h2 sections
    const article = await client.getDocument(ARTICLE_ID)

    function insertImageAfterKey(blocks, afterKey, imageRef, alt) {
      const idx = blocks.findIndex((b) => b._key === afterKey)
      if (idx === -1) {
        console.warn(`Key ${afterKey} not found, appending image at end`)
        blocks.push({
          _type: 'image',
          _key: `img_${afterKey}`,
          alt,
          asset: { _type: 'reference', _ref: imageRef },
        })
        return blocks
      }
      blocks.splice(idx + 1, 0, {
        _type: 'image',
        _key: `img_${afterKey}`,
        alt,
        asset: { _type: 'reference', _ref: imageRef },
      })
      return blocks
    }

    // Insert TRON 2 image after h2_2 (TRON 2 heading)
    // Insert COSA image after h2_3 (COSA heading)
    for (const lang of ['en', 'de']) {
      let blocks = [...article.body[lang]]
      blocks = insertImageAfterKey(blocks, 'h2_2', tron2Id, 'Multi-Form Embodied Robot TRON 2')
      blocks = insertImageAfterKey(blocks, 'h2_3', cosaId, 'Agentic OS LimX COSA')
      await client
        .patch(ARTICLE_ID)
        .set({ [`body.${lang}`]: blocks })
        .commit()
      console.log(`Updated body.${lang} with inline images`)
    }

    console.log('\nDone! Images added to article.')
    console.log('  EN: https://megarobotics.de/en/articles/limx-dynamics-secures-200-million-series-b-financing')
    console.log('  DE: https://megarobotics.de/de/articles/limx-dynamics-secures-200-million-series-b-financing')
  } catch (error) {
    console.error('Error:', error)
  }
}

main()

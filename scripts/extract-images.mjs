import fs from 'fs'
import path from 'path'

const toolResultsDir = '/home/pajou/.claude/projects/-home-pajou-megarobotics/6e75d17d-dd5d-4a7a-a1d7-8bd302f5cff3/tool-results'

// Find all firecrawl result files
const files = fs.readdirSync(toolResultsDir).filter(f => f.includes('firecrawl'))

const allImages = new Set()

files.forEach(file => {
  try {
    const data = JSON.parse(fs.readFileSync(path.join(toolResultsDir, file), 'utf8'))
    const text = Array.isArray(data) ? data.map(d => d.text || '').join(' ') : JSON.stringify(data)

    // Find Amazon image URLs
    const matches = text.match(/https:\/\/m\.media-amazon\.com\/images\/I\/[^)\s"']+/g) || []
    matches.forEach(url => {
      // Filter out small images and sprites
      if (!url.includes('sprite') && !url.includes('_SS40_') && !url.includes('_SS75_') && !url.includes('_US40_')) {
        // Get the base image ID
        const baseMatch = url.match(/images\/I\/([A-Za-z0-9+-]+)/)
        if (baseMatch) {
          allImages.add(baseMatch[1])
        }
      }
    })
  } catch (e) {
    // Skip files that can't be parsed
  }
})

console.log('Found', allImages.size, 'unique Amazon image IDs:')
Array.from(allImages).slice(0, 30).forEach(id => {
  // Construct high-res URL
  const url = `https://m.media-amazon.com/images/I/${id}._AC_SL1500_.jpg`
  console.log(url)
})

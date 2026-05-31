import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './sanity/schemas'
import { clearCachePlugin } from './sanity/plugins/clearCache'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || ''
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

// Document types with many list items — use compact layout to avoid
// expensive SpanWithTextOverflow layout recalculations on every interaction
const COMPACT_LIST_TYPES = [
  'product',
  'article',
  'manufacturer',
  'institute',
  'buyersGuide',
]

export default defineConfig({
  name: 'megarobotics-studio',
  title: 'MegaRobotics CMS',

  projectId,
  dataset,

  basePath: '/studio',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            ...S.documentTypeListItems().map((item) => {
              const id = item.getId()
              if (id && COMPACT_LIST_TYPES.includes(id)) {
                return item.child(
                  S.documentTypeList(id).defaultLayout('compact'),
                )
              }
              return item
            }),
          ]),
    }),
    visionTool(),
    clearCachePlugin(),
  ],

  schema: {
    types: schemaTypes,
  },
})

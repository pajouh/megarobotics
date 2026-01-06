import { defineType, defineArrayMember } from 'sanity'

export default defineType({
  title: 'Block Content',
  name: 'blockContent',
  type: 'array',
  of: [
    defineArrayMember({
      title: 'Block',
      type: 'block',
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'H2', value: 'h2' },
        { title: 'H3', value: 'h3' },
        { title: 'H4', value: 'h4' },
        { title: 'Quote', value: 'blockquote' },
      ],
      lists: [
        { title: 'Bullet', value: 'bullet' },
        { title: 'Numbered', value: 'number' },
      ],
      marks: {
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' },
          { title: 'Code', value: 'code' },
          { title: 'Underline', value: 'underline' },
          { title: 'Strike', value: 'strike-through' },
        ],
        annotations: [
          {
            title: 'URL',
            name: 'link',
            type: 'object',
            fields: [
              {
                title: 'URL',
                name: 'href',
                type: 'url',
                validation: (Rule) =>
                  Rule.uri({
                    allowRelative: true,
                    scheme: ['https', 'http', 'mailto', 'tel'],
                  }),
              },
              {
                title: 'Open in new tab',
                name: 'blank',
                type: 'boolean',
                initialValue: true,
              },
            ],
          },
        ],
      },
    }),
    defineArrayMember({
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          description: 'Important for SEO and accessibility',
        },
        {
          name: 'caption',
          type: 'string',
          title: 'Caption',
        },
      ],
    }),
    defineArrayMember({
      title: 'Code Block',
      name: 'code',
      type: 'object',
      fields: [
        {
          title: 'Language',
          name: 'language',
          type: 'string',
          options: {
            list: [
              { title: 'HTML', value: 'html' },
              { title: 'CSS', value: 'css' },
              { title: 'JavaScript', value: 'javascript' },
              { title: 'TypeScript', value: 'typescript' },
              { title: 'Python', value: 'python' },
              { title: 'C++', value: 'cpp' },
              { title: 'Rust', value: 'rust' },
              { title: 'Go', value: 'go' },
              { title: 'JSON', value: 'json' },
              { title: 'Bash', value: 'bash' },
              { title: 'YAML', value: 'yaml' },
              { title: 'XML', value: 'xml' },
              { title: 'Other', value: 'text' },
            ],
          },
        },
        {
          title: 'Code',
          name: 'code',
          type: 'text',
        },
        {
          title: 'Filename',
          name: 'filename',
          type: 'string',
        },
      ],
    }),
    defineArrayMember({
      title: 'HTML Embed',
      name: 'htmlEmbed',
      type: 'object',
      fields: [
        {
          title: 'HTML Code',
          name: 'html',
          type: 'text',
          description: 'Raw HTML code that will be rendered on the page. Use with caution.',
          validation: (Rule) => Rule.required(),
        },
        {
          title: 'Label',
          name: 'label',
          type: 'string',
          description: 'Optional label to identify this embed in the editor (not displayed on the page)',
        },
      ],
      preview: {
        select: {
          label: 'label',
          html: 'html',
        },
        prepare({ label, html }) {
          return {
            title: label || 'HTML Embed',
            subtitle: html ? `${html.substring(0, 50)}...` : 'No HTML content',
          }
        },
      },
    }),
    // Stats Grid - for displaying key statistics
    defineArrayMember({
      title: 'Stats Grid',
      name: 'statsGrid',
      type: 'object',
      fields: [
        {
          title: 'Stats',
          name: 'stats',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'value', type: 'string', title: 'Value' },
                { name: 'label', type: 'string', title: 'Label' },
              ],
            },
          ],
          validation: (Rule) => Rule.max(4),
        },
      ],
      preview: {
        select: { stats: 'stats' },
        prepare({ stats }) {
          return {
            title: 'Stats Grid',
            subtitle: stats ? `${stats.length} statistics` : 'No stats',
          }
        },
      },
    }),
    // Feature Grid - for feature cards
    defineArrayMember({
      title: 'Feature Grid',
      name: 'featureGrid',
      type: 'object',
      fields: [
        {
          title: 'Features',
          name: 'features',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'icon', type: 'string', title: 'Icon (emoji)' },
                { name: 'title', type: 'string', title: 'Title' },
                { name: 'description', type: 'text', title: 'Description', rows: 2 },
              ],
            },
          ],
        },
      ],
      preview: {
        select: { features: 'features' },
        prepare({ features }) {
          return {
            title: 'Feature Grid',
            subtitle: features ? `${features.length} features` : 'No features',
          }
        },
      },
    }),
    // Highlight Box - callout box with list
    defineArrayMember({
      title: 'Highlight Box',
      name: 'highlightBox',
      type: 'object',
      fields: [
        { name: 'title', type: 'string', title: 'Title' },
        {
          name: 'items',
          type: 'array',
          title: 'Items',
          of: [{ type: 'text', rows: 2 }],
        },
      ],
      preview: {
        select: { title: 'title', items: 'items' },
        prepare({ title, items }) {
          return {
            title: title || 'Highlight Box',
            subtitle: items ? `${items.length} items` : 'No items',
          }
        },
      },
    }),
    // Quote Box - styled quote with author
    defineArrayMember({
      title: 'Quote Box',
      name: 'quoteBox',
      type: 'object',
      fields: [
        { name: 'quote', type: 'text', title: 'Quote', rows: 3 },
        { name: 'author', type: 'string', title: 'Author' },
      ],
      preview: {
        select: { quote: 'quote', author: 'author' },
        prepare({ quote, author }) {
          return {
            title: 'Quote Box',
            subtitle: author ? `— ${author}` : quote?.substring(0, 50),
          }
        },
      },
    }),
    // Info Table - for product/comparison tables
    defineArrayMember({
      title: 'Info Table',
      name: 'infoTable',
      type: 'object',
      fields: [
        {
          name: 'headers',
          type: 'array',
          title: 'Column Headers',
          of: [{ type: 'string' }],
        },
        {
          name: 'rows',
          type: 'array',
          title: 'Rows',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'cells',
                  type: 'array',
                  title: 'Cells',
                  of: [{ type: 'string' }],
                },
              ],
              preview: {
                select: { cells: 'cells' },
                prepare({ cells }) {
                  return { title: cells?.[0] || 'Row' }
                },
              },
            },
          ],
        },
      ],
      preview: {
        select: { headers: 'headers', rows: 'rows' },
        prepare({ headers, rows }) {
          return {
            title: 'Info Table',
            subtitle: `${headers?.length || 0} columns, ${rows?.length || 0} rows`,
          }
        },
      },
    }),
    // CTA Box - call to action section
    defineArrayMember({
      title: 'CTA Box',
      name: 'ctaBox',
      type: 'object',
      fields: [
        { name: 'title', type: 'string', title: 'Title' },
        { name: 'description', type: 'text', title: 'Description', rows: 3 },
        { name: 'buttonText', type: 'string', title: 'Button Text (optional)' },
        { name: 'buttonUrl', type: 'url', title: 'Button URL (optional)' },
      ],
      preview: {
        select: { title: 'title' },
        prepare({ title }) {
          return { title: 'CTA Box', subtitle: title }
        },
      },
    }),
  ],
})

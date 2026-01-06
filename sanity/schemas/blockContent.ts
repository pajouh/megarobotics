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
  ],
})

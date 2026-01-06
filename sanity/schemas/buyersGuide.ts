// /sanity/schemas/buyersGuide.ts
import { defineType, defineField, defineArrayMember } from 'sanity'

export default defineType({
  name: 'buyersGuide',
  title: "Buyers' Guide",
  type: 'document',
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'seo', title: 'SEO' },
    { name: 'news', title: 'News Optimization' },
  ],
  fields: [
    // Content Group
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'content',
      validation: (Rule) => Rule.required().min(10).max(100),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'content',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      rows: 3,
      group: 'content',
      description: 'A brief summary for previews and social sharing (150-200 characters ideal).',
      validation: (Rule) => Rule.required().min(50).max(300),
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'richImage',
      group: 'content',
      description: 'Featured image for the guide.',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      group: 'content',
      description: 'When this guide was first published.',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'updatedAt',
      title: 'Last Updated',
      type: 'datetime',
      group: 'content',
      description: 'When this guide was last significantly updated. Shown to readers for freshness.',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'string',
      group: 'content',
      initialValue: 'MegaRobotics Editorial',
    }),
    defineField({
      name: 'readTime',
      title: 'Read Time (minutes)',
      type: 'number',
      group: 'content',
      validation: (Rule) => Rule.min(1).max(60),
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      group: 'content',
      of: [
        defineArrayMember({
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
                        scheme: ['https', 'http', 'mailto'],
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
          type: 'richImage',
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
              description: 'Raw HTML code that will be rendered on the page.',
              validation: (Rule) => Rule.required(),
            },
            {
              title: 'Label',
              name: 'label',
              type: 'string',
              description: 'Optional label to identify this embed in the editor.',
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
    }),

    // SEO Group
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'object',
      group: 'seo',
      fields: [
        defineField({
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
          description: 'Title for search engines (50-60 characters ideal).',
          validation: (Rule) => Rule.max(70),
        }),
        defineField({
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          rows: 3,
          description: 'Description for search engines (150-160 characters ideal).',
          validation: (Rule) => Rule.max(200),
        }),
      ],
    }),

    // News Optimization Group
    defineField({
      name: 'news',
      title: 'News & Discover Optimization',
      type: 'object',
      group: 'news',
      fields: [
        defineField({
          name: 'canonicalUrl',
          title: 'Canonical URL',
          type: 'url',
          description: 'If this content exists elsewhere, specify the canonical URL.',
        }),
        defineField({
          name: 'isEvergreen',
          title: 'Is Evergreen Content',
          type: 'boolean',
          description: 'Check if this content remains relevant over time (not time-sensitive news).',
          initialValue: true,
        }),
        defineField({
          name: 'primaryTopic',
          title: 'Primary Topic',
          type: 'string',
          description: 'Main topic for categorization (e.g., "Legged robots").',
        }),
        defineField({
          name: 'tags',
          title: 'Tags',
          type: 'array',
          of: [{ type: 'string' }],
          options: {
            layout: 'tags',
          },
          description: 'Keywords for discovery and internal linking.',
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author',
      media: 'mainImage.image',
      updatedAt: 'updatedAt',
    },
    prepare({ title, author, media, updatedAt }) {
      const date = updatedAt ? new Date(updatedAt).toLocaleDateString() : 'No date'
      return {
        title,
        subtitle: `${author || 'Unknown author'} | Updated: ${date}`,
        media,
      }
    },
  },
  orderings: [
    {
      title: 'Updated, Newest',
      name: 'updatedAtDesc',
      by: [{ field: 'updatedAt', direction: 'desc' }],
    },
    {
      title: 'Published, Newest',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
})

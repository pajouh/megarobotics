import { defineField, defineType } from 'sanity'
import { localizedString, localizedText, localizedBlockContent, localizedStringArray } from './helpers/localizedFields'

export default defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  groups: [
    { name: 'basic', title: 'Basic Info', default: true },
    { name: 'content', title: 'Content' },
    { name: 'media', title: 'Media' },
    { name: 'specs', title: 'Specifications' },
    { name: 'settings', title: 'Settings' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({
      name: 'name',
      title: 'Product Name',
      type: 'string',
      group: 'basic',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'basic',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'manufacturer',
      title: 'Manufacturer',
      type: 'reference',
      to: [{ type: 'manufacturer' }],
      group: 'basic',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Product Category',
      type: 'reference',
      to: [{ type: 'productCategory' }],
      group: 'basic',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'productFamily',
      title: 'Product family',
      type: 'reference',
      to: [{ type: 'productFamily' }],
      group: 'basic',
      description:
        'Top-level family (e.g. Robot Platforms, End Effectors & Robot Tooling). Used by the new /products/categories/<slug> pages. Optional — leave blank to keep the product on the legacy category structure only.',
    }),
    defineField({
      name: 'subcategory',
      title: 'Subcategory',
      type: 'string',
      group: 'basic',
      description:
        'Free-form subcategory label (e.g. "Mechanical grippers", "Industrial 6-axis robots"). Should match one of the suggested subcategories on the chosen Product Family.',
    }),
    localizedString('tagline', 'Tagline', {
      group: 'content',
      description: 'Short marketing tagline',
    }),
    localizedText('description', 'Brief Description', {
      group: 'content',
      rows: 3,
    }),
    localizedBlockContent('fullDescription', 'Full Description', {
      group: 'content',
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      group: 'media',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'gallery',
      title: 'Image Gallery',
      type: 'array',
      group: 'media',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
            },
            {
              name: 'caption',
              title: 'Caption',
              type: 'string',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video URL',
      type: 'url',
      group: 'media',
      description: 'YouTube or video embed URL',
    }),
    defineField({
      name: 'specifications',
      title: 'Specifications',
      type: 'array',
      group: 'specs',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', title: 'Label', type: 'string' },
            { name: 'value', title: 'Value', type: 'string' },
          ],
          preview: {
            select: {
              title: 'label',
              subtitle: 'value',
            },
          },
        },
      ],
    }),
    localizedStringArray('features', 'Key Features', {
      group: 'specs',
    }),
    localizedStringArray('applications', 'Applications', {
      group: 'specs',
      description: 'Use cases for this product',
    }),
    defineField({
      name: 'priceRange',
      title: 'Price Range',
      type: 'string',
      group: 'settings',
      description: 'e.g., "$1,600", "$10,000-50,000", "Contact for pricing"',
    }),
    defineField({
      name: 'availability',
      title: 'Availability (legacy)',
      type: 'string',
      group: 'settings',
      description: 'Legacy field kept for back-compat. New listings should use "Distributor availability status" below.',
      options: {
        list: [
          { title: 'Available', value: 'available' },
          { title: 'Pre-order', value: 'preorder' },
          { title: 'Coming Soon', value: 'coming_soon' },
          { title: 'Contact for Availability', value: 'contact' },
        ],
      },
      initialValue: 'available',
    }),
    defineField({
      name: 'availabilityStatus',
      title: 'Distributor availability status',
      type: 'string',
      group: 'settings',
      description:
        'Replaces the legacy "Availability" field for new distributor listings. Used by the rebuilt /products catalog.',
      options: {
        list: [
          { title: 'In stock', value: 'in_stock' },
          { title: 'Available on request', value: 'available_on_request' },
          { title: 'Sourcing on request', value: 'sourcing_on_request' },
          { title: 'Lead time required', value: 'lead_time_required' },
          { title: 'Information only', value: 'information_only' },
          { title: 'Discontinued', value: 'discontinued' },
        ],
      },
    }),
    defineField({
      name: 'manufacturerRelationshipStatus',
      title: 'Manufacturer relationship status (override)',
      type: 'string',
      group: 'settings',
      description:
        'Optional per-product override. Leave blank to inherit from the manufacturer document. Set only when status differs for this specific product. ONLY use verified values when status is legally confirmed.',
      options: {
        list: [
          { title: '(inherit from manufacturer)', value: '' },
          { title: 'Official distributor (verified)', value: 'official_distributor' },
          { title: 'Authorized reseller (verified)', value: 'authorized_reseller' },
          { title: 'Sales partner (verified)', value: 'sales_partner' },
          { title: 'Technology partner (verified)', value: 'technology_partner' },
          { title: 'Sourcing available', value: 'sourcing_available' },
          { title: 'Information only', value: 'information_only' },
          { title: 'Under evaluation', value: 'under_evaluation' },
          { title: 'Unknown', value: 'unknown' },
        ],
      },
    }),
    defineField({
      name: 'inquiryOnly',
      title: 'Inquiry-only product',
      type: 'boolean',
      group: 'settings',
      description:
        'When true, the product is displayed for inquiry coordination only — no pricing, no buy-flow, no availability promise. Shows "Request Price & Availability" CTA instead.',
      initialValue: false,
    }),
    defineField({
      name: 'productUrl',
      title: 'Official Product URL',
      type: 'url',
      group: 'settings',
    }),
    defineField({
      name: 'datasheetUrl',
      title: 'Datasheet URL',
      type: 'url',
      group: 'settings',
      description: 'Link to PDF datasheet',
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      group: 'settings',
      description: 'Set to inactive to hide this product from the website without deleting it',
      initialValue: true,
    }),
    defineField({
      name: 'featured',
      title: 'Featured Product',
      type: 'boolean',
      group: 'settings',
      initialValue: false,
    }),
    defineField({
      name: 'isNew',
      title: 'New Product',
      type: 'boolean',
      group: 'settings',
      description: 'Show "New" badge',
      initialValue: false,
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      group: 'settings',
    }),
    defineField({
      name: 'order',
      title: 'Sort Order',
      type: 'number',
      group: 'settings',
      description: 'Sort order within category',
      initialValue: 0,
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      group: 'seo',
      description: 'Override auto-generated SEO metadata. Leave blank to use name/description as defaults.',
      fields: [
        localizedString('metaTitle', 'Meta Title', {
          description: 'Custom title for search engines (max 60 chars recommended)',
        }),
        localizedText('metaDescription', 'Meta Description', {
          rows: 3,
          description: 'Custom description for search engines (max 160 chars recommended)',
        }),
        defineField({
          name: 'keywords',
          title: 'Keywords',
          type: 'array',
          of: [{ type: 'string' }],
          options: { layout: 'tags' },
          description: 'SEO keywords / tags',
        }),
      ],
    }),
  ],
  orderings: [
    {
      title: 'Name A-Z',
      name: 'nameAsc',
      by: [{ field: 'name', direction: 'asc' }],
    },
    {
      title: 'Featured First',
      name: 'featuredDesc',
      by: [{ field: 'featured', direction: 'desc' }],
    },
    {
      title: 'Sort Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'manufacturer.name',
      media: 'mainImage',
      isActive: 'isActive',
    },
    prepare(selection) {
      const { title, subtitle, media, isActive } = selection
      const inactive = isActive === false
      return {
        title: inactive ? `[INACTIVE] ${title}` : title,
        subtitle: subtitle ? `by ${subtitle}` : 'No manufacturer',
        media,
      }
    },
  },
})

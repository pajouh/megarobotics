import { defineField } from 'sanity'

// Supported locales
export const locales = [
  { id: 'en', title: 'English', isDefault: true },
  { id: 'de', title: 'Deutsch' },
]

// Create a localized string field
export function localizedString(name: string, title: string, options?: {
  group?: string
  description?: string
  required?: boolean
}) {
  return defineField({
    name,
    title,
    type: 'object',
    group: options?.group,
    description: options?.description,
    fields: locales.map((locale) =>
      defineField({
        name: locale.id,
        title: locale.title,
        type: 'string',
        validation: (Rule) =>
          options?.required && locale.isDefault
            ? Rule.required().error(`${title} (${locale.title}) is required`)
            : Rule,
      })
    ),
  })
}

// Create a localized text field (multiline)
export function localizedText(name: string, title: string, options?: {
  group?: string
  description?: string
  rows?: number
  required?: boolean
}) {
  return defineField({
    name,
    title,
    type: 'object',
    group: options?.group,
    description: options?.description,
    fields: locales.map((locale) =>
      defineField({
        name: locale.id,
        title: locale.title,
        type: 'text',
        rows: options?.rows || 3,
        validation: (Rule) =>
          options?.required && locale.isDefault
            ? Rule.required().error(`${title} (${locale.title}) is required`)
            : Rule,
      })
    ),
  })
}

// Create a localized rich text (block content) field
export function localizedBlockContent(name: string, title: string, options?: {
  group?: string
  description?: string
}) {
  return defineField({
    name,
    title,
    type: 'object',
    group: options?.group,
    description: options?.description,
    fields: locales.map((locale) =>
      defineField({
        name: locale.id,
        title: locale.title,
        type: 'blockContent',
      })
    ),
  })
}

// Create a localized array of strings
export function localizedStringArray(name: string, title: string, options?: {
  group?: string
  description?: string
}) {
  return defineField({
    name,
    title,
    type: 'object',
    group: options?.group,
    description: options?.description,
    fields: locales.map((locale) =>
      defineField({
        name: locale.id,
        title: locale.title,
        type: 'array',
        of: [{ type: 'string' }],
      })
    ),
  })
}

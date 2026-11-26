// UI strings shared by every category buying page (see ./types.ts).

import { same } from './types'

export const COMMON = {
  hero: {
    discover: { en: 'Discover {product}', de: '{product} entdecken' },
    request: { en: 'Request a quote', de: 'Angebot anfragen' },
  },
  nav: {
    label: { en: 'On this page', de: 'Auf dieser Seite' },
    explainer: { en: 'Basics', de: 'Grundlagen' },
    compare: { en: 'Comparison', de: 'Vergleich' },
    faq: { en: 'Questions', de: 'Fragen' },
  },
  card: {
    details: { en: 'Details', de: 'Details' },
    request: { en: 'Request a quote', de: 'Angebot anfragen' },
    allFrom: { en: 'All products from {brand}', de: 'Alle Produkte von {brand}' },
  },
  compare: {
    filterLabel: { en: 'Filter models', de: 'Modelle filtern' },
    reset: { en: 'Show all', de: 'Alle zeigen' },
    count: { en: '{shown} of {total} models', de: '{shown} von {total} Modellen' },
    empty: { en: 'No model matches all filters.', de: 'Kein Modell passt zu allen Filtern.' },
    scroll: { en: 'Swipe sideways to see all columns.', de: 'Zur Seite wischen, um alle Spalten zu sehen.' },
    model: { en: 'Model', de: 'Modell' },
  },
  steps: {
    eyebrow: { en: 'How we work', de: 'So arbeiten wir' },
    title: { en: 'One contact for every brand', de: 'Ein Ansprechpartner für alle Marken' },
    items: [
      { title: { en: 'Application', de: 'Anwendung' }, body: { en: 'You describe the task, the site and the parts or loads involved.', de: 'Sie beschreiben Aufgabe, Einsatzort und die Teile oder Lasten.' } },
      { title: { en: 'Comparison', de: 'Vergleich' }, body: { en: 'We check the technical requirements and compare models across manufacturers.', de: 'Wir prüfen die technischen Anforderungen und vergleichen Modelle über Hersteller hinweg.' } },
      { title: { en: 'Quote', de: 'Angebot' }, body: { en: 'Price and lead time for your configuration, with every item listed.', de: 'Preis und Lieferzeit für Ihre Konfiguration, mit allen Positionen.' } },
      { title: { en: 'Delivery', de: 'Lieferung' }, body: { en: 'We coordinate the suppliers and connect you with integration partners where needed.', de: 'Wir koordinieren die Lieferanten und vermitteln bei Bedarf Partner für die Integration.' } },
    ],
  },
  related: { en: 'Related pages', de: 'Weiterführende Seiten' },
  fine: { en: 'Notes', de: 'Hinweise' },
  facts: { en: 'The range in figures', de: 'Das Programm in Zahlen' },
  brandless: same('MegaRobotics'),
}

// Product documentation offered on /downloads, below the video library.
//
// Sources, in order of preference:
//   self-hosted  files supplied to us directly, served from
//                media.megarobotics.de alongside the video playback copies.
//   linked       files LimX publishes themselves, pointed at their host so a
//                new revision reaches visitors without us re-uploading.
//   web          a few guides LimX publishes only as web pages, with no file
//                behind them. Linked rather than omitted, and labelled so the
//                difference is visible before the click.
//
// Oli and TRON 2 only for now.
//
// Two of LimX's own hosts are unreliable: cms.limxdynamics.com and
// cdn.limxdynamics.com both time out, and the Oli and TRON 2 brochure URLs
// previously stored in Sanity pointed at them. Everything here is on
// www.limxdynamics.com or oss.limxdynamics.com, both of which respond.
//
// Copyright in these documents belongs to LimX Dynamics. MegaRobotics
// publishes them as an official distributor.

import type { ProductKey } from './limx-videos'

export type DocumentKind =
  | 'manual'
  | 'guide'
  | 'quickstart'
  | 'brochure'
  | 'software'
  | 'firmware'
  | 'app'
  | 'reference'

export interface ProductDocument {
  id: string
  product: ProductKey
  title: { en: string; de: string }
  kind: DocumentKind
  /** Version as the publisher states it, where they state one. */
  version?: string
  /** ISO date of the revision. */
  date?: string
  url: string
  /** Shown on the row: PDF, APK, TAR.GZ, BIN — or WEB for a page with no file. */
  format: string
  /** 0 for web-only entries, where there is nothing to size. */
  sizeBytes: number
  selfHosted: boolean
  /** True when the target is a page on limxdynamics.com, not a file. */
  webOnly?: boolean
}

const MEDIA = 'https://media.megarobotics.de/docs'
const LIMX_PDF = 'https://www.limxdynamics.com/pdf'
const LIMX_OSS = 'https://oss.limxdynamics.com/uploads'
const LIMX_DOC = 'https://www.limxdynamics.com/en/documents'

export const limxDocuments: ProductDocument[] = [
  // ---- Oli -----------------------------------------------------------
  {
    id: 'oli-edu-user-manual',
    product: 'oli',
    title: { en: 'Oli EDU User Manual', de: 'Oli EDU Benutzerhandbuch' },
    kind: 'manual',
    version: 'V1.4',
    date: '2026-04-23',
    url: `${MEDIA}/oli/oli-edu-user-manual-v1.4.pdf`,
    format: 'PDF',
    sizeBytes: 6511327,
    selfHosted: true,
  },
  {
    id: 'oli-edu-sdk-development-guide',
    product: 'oli',
    title: { en: 'Oli EDU SDK Development Guide', de: 'Oli EDU SDK-Entwicklerhandbuch' },
    kind: 'guide',
    version: 'V1.3',
    date: '2026-09-16',
    url: `${MEDIA}/oli/oli-edu-sdk-development-guide-v1.3.pdf`,
    format: 'PDF',
    sizeBytes: 2732922,
    selfHosted: true,
  },
  {
    id: 'oli-edu-quick-start-guide',
    product: 'oli',
    title: { en: 'LimX EDU Quick Start Guide', de: 'LimX EDU Schnellstartanleitung' },
    kind: 'quickstart',
    date: '2026-04-14',
    url: `${LIMX_DOC}/831851699013554176`,
    format: 'WEB',
    sizeBytes: 0,
    selfHosted: false,
    webOnly: true,
  },
  {
    id: 'oli-brochure',
    product: 'oli',
    title: { en: 'Oli Product Brochure', de: 'Oli Produktbroschüre' },
    kind: 'brochure',
    date: '2026-06-25',
    url: `${LIMX_PDF}/LimX_Oli_Brochure_20260625.pdf`,
    format: 'PDF',
    sizeBytes: 6618624,
    selfHosted: false,
  },
  {
    id: 'oli-main-software-edu',
    product: 'oli',
    title: { en: 'Oli Main Software (EDU Edition)', de: 'Oli Hauptsoftware (EDU-Edition)' },
    kind: 'software',
    version: '2.4.15',
    date: '2026-09-15',
    url: `${LIMX_OSS}/download/2026/09/15/robot-hu-r-2.4.15.20260910214734.tar.gz`,
    format: 'TAR.GZ',
    sizeBytes: 2555015168,
    selfHosted: false,
  },
  {
    id: 'oli-limx-studio-app',
    product: 'oli',
    title: { en: 'LimX Studio mobile app (Android)', de: 'LimX Studio Mobile-App (Android)' },
    kind: 'app',
    version: 'V1.1.2',
    date: '2026-06-26',
    url: `${LIMX_OSS}/download/2026/06/26/LimX_Studio_V1.1.2.apk`,
    format: 'APK',
    sizeBytes: 60606464,
    selfHosted: false,
  },
  {
    id: 'oli-remote-controller-firmware',
    product: 'oli',
    title: {
      en: 'Oli Remote Controller Firmware (EDU Edition)',
      de: 'Oli Fernsteuerung Firmware (EDU-Edition)',
    },
    kind: 'firmware',
    version: '2.2.8',
    date: '2026-04-21',
    url: `${LIMX_OSS}/download/2026/04/21/RCGen2_HU_V2.2.8_20260323.bin`,
    format: 'BIN',
    sizeBytes: 314572,
    selfHosted: false,
  },

  // ---- TRON 2 --------------------------------------------------------
  {
    id: 'tron2-user-manual',
    product: 'tron2',
    title: { en: 'TRON 2 User Manual', de: 'TRON 2 Benutzerhandbuch' },
    kind: 'manual',
    date: '2026-06-11',
    url: `${LIMX_OSS}/pdf/2026/09/14/1789397452580_TRON_2_Tri-Form_Set_User_Manual.pdf`,
    format: 'PDF',
    sizeBytes: 29497856,
    selfHosted: false,
  },
  {
    id: 'tron2-sdk-development-guide',
    product: 'tron2',
    title: { en: 'TRON 2 SDK Development Guide', de: 'TRON 2 SDK-Entwicklerhandbuch' },
    kind: 'guide',
    date: '2026-06-22',
    // LimX publishes this one as a web page with no file behind it, unlike the
    // Oli SDK guide which is a PDF.
    url: `${LIMX_DOC}/856848486581276672`,
    format: 'WEB',
    sizeBytes: 0,
    selfHosted: false,
    webOnly: true,
  },
  {
    id: 'tron2-dual-arm-teleoperation-quickstart',
    product: 'tron2',
    title: {
      en: 'TRON 2 Dual-Arm Teleoperation Quick Start Guide',
      de: 'TRON 2 Doppelarm-Teleoperation Schnellstartanleitung',
    },
    kind: 'quickstart',
    date: '2026-09-09',
    url: `${LIMX_OSS}/pdf/2026/09/20/1789889789693_TRON_2_Dual-Arm_Robot_Teleoperation_Quick_Start_Guide.pdf`,
    format: 'PDF',
    sizeBytes: 2904555,
    selfHosted: false,
  },
  {
    id: 'tron2-auto-recharge-base-manual',
    product: 'tron2',
    title: {
      en: 'TRON 2 Auto-Recharge Base User Manual',
      de: 'TRON 2 Ladestation Benutzerhandbuch',
    },
    kind: 'manual',
    date: '2026-09-02',
    url: `${LIMX_OSS}/pdf/2026/09/08/1788869427124_TRON_2_Autonomous_Charging_Dock_User_Manual.pdf`,
    format: 'PDF',
    sizeBytes: 629145,
    selfHosted: false,
  },
  {
    id: 'tron2-auto-recharge-base-quickstart',
    product: 'tron2',
    title: {
      en: 'TRON 2 Auto-Recharge Base Quick Start Guide',
      de: 'TRON 2 Ladestation Schnellstartanleitung',
    },
    kind: 'quickstart',
    version: 'V1.0',
    date: '2026-09-01',
    url: `${LIMX_OSS}/pdf/2026/09/09/1788923610560_TRON_2_Auto-Recharge_Base_Quick_Start_Guide_V1.0.pdf`,
    format: 'PDF',
    sizeBytes: 2537553,
    selfHosted: false,
  },
  {
    id: 'tron2-packing-list',
    product: 'tron2',
    title: { en: 'TRON 2 Packing List Summary', de: 'TRON 2 Packliste' },
    kind: 'reference',
    date: '2026-09-18',
    url: `${LIMX_OSS}/pdf/2026/09/23/1790136399257_TRON_2_Packing_List_Summary.pdf`,
    format: 'PDF',
    sizeBytes: 4739563,
    selfHosted: false,
  },
  {
    id: 'tron2-brochure',
    product: 'tron2',
    title: { en: 'TRON 2 Product Brochure', de: 'TRON 2 Produktbroschüre' },
    kind: 'brochure',
    date: '2024-12-18',
    // Published under a Chinese filename ("英文宣传册" = English brochure),
    // pre-encoded here.
    url: `${LIMX_PDF}/LimX_TRON2_%E8%8B%B1%E6%96%87%E5%AE%A3%E4%BC%A0%E5%86%8C_20241218.pdf`,
    format: 'PDF',
    sizeBytes: 642128,
    selfHosted: false,
  },
]

/** Products that actually have documents, in the page's filter order. */
export function documentProducts(): ProductKey[] {
  const present = new Set(limxDocuments.map((doc) => doc.product))
  return (['oli', 'tron2'] as ProductKey[]).filter((key) => present.has(key))
}

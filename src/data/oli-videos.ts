// Oli video library, mirroring the sections LimX Dynamics publishes at
// https://www.limxdynamics.com/en/videos (Intro / Tutorial / Story).
//
// The files are served from LimX's own CDN rather than re-hosted. They total
// ~1.8 GB, which is too large to commit and would cost storage and egress to
// mirror, and linking the source means a corrected or re-cut video reaches
// visitors without a redeploy. The trade-off is that LimX controls
// availability: if a URL moves, the entry 404s until updated.
//
// Copyright in these videos belongs to LimX Dynamics. MegaRobotics publishes
// them as an official distributor.
//
// Generated from the VideoObject JSON-LD on the source page; sizes come from a
// HEAD request against each file.

export type VideoSection = 'intro' | 'tutorial' | 'story'

export interface OliVideo {
  /** Stable slug, used as the anchor id and download filename stem. */
  id: string
  title: { en: string; de: string }
  section: VideoSection
  /** ISO date LimX published it. */
  date: string
  /** Direct URL on LimX's CDN. Pre-encoded: several paths carry CJK characters and spaces. */
  url: string
  thumbnail: string
  sizeBytes: number
  mime: string
}

export const OLI_VIDEO_SECTIONS: VideoSection[] = ['intro', 'tutorial', 'story']

export const oliVideos: OliVideo[] = [
  {
    id: 'oli-introduction-video',
    title: { en: "Oli Introduction Video", de: "Oli Vorstellungsvideo" },
    section: 'intro',
    date: '2025-07-30',
    url: 'https://oss.limxdynamics.com/uploads/video/2026/01/05/1767600243902_%E3%80%90EN%E3%80%91Oli%E7%9A%84%E4%B8%80%E5%A4%A9.mp4',
    thumbnail: 'https://oss.limxdynamics.com/uploads/image/2026/01/05/1767600253924_%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_2025-07-30_093758_628.jpg',
    sizeBytes: 440533449,
    mime: 'video/mp4',
  },
  {
    id: 'oli-device-charging-example',
    title: { en: "Oli Device Charging Example", de: "Oli Gerät laden" },
    section: 'tutorial',
    date: '2026-01-12',
    url: 'https://oss.limxdynamics.com/uploads/video/2026/01/26/1769408448792_%E8%AE%BE%E5%A4%87%E5%85%85%E7%94%B5.mov',
    thumbnail: 'https://oss.limxdynamics.com/uploads/image/2026/01/26/1769408542524_%E8%AE%BE%E5%A4%87%E5%85%85%E7%94%B5.png',
    sizeBytes: 38465187,
    mime: 'video/quicktime',
  },
  {
    id: 'oli-remote-control-upgrade',
    title: { en: "Oli Remote Control Upgrade", de: "Oli Fernsteuerung – Firmware-Update" },
    section: 'tutorial',
    date: '2026-01-12',
    url: 'https://oss.limxdynamics.com/uploads/video/2026/01/26/1769409110129_%E9%81%A5%E6%8E%A7%E5%99%A8%E5%8D%87%E7%BA%A7.mov',
    thumbnail: 'https://oss.limxdynamics.com/uploads/image/2026/01/26/1769409116925_%E9%81%A5%E6%8E%A7%E5%99%A8%E5%8D%87%E7%BA%A7.png',
    sizeBytes: 39063357,
    mime: 'video/quicktime',
  },
  {
    id: 'oli-remote-control-pairing',
    title: { en: "Oli Remote Control Pairing", de: "Oli Fernsteuerung koppeln" },
    section: 'tutorial',
    date: '2026-01-12',
    url: 'https://oss.limxdynamics.com/uploads/video/2026/01/26/1769409060465_%E9%81%A5%E6%8E%A7%E5%99%A8%E9%85%8D%E5%AF%B9.mov',
    thumbnail: 'https://oss.limxdynamics.com/uploads/image/2026/01/26/1769409066773_%E9%81%A5%E6%8E%A7%E5%99%A8%E9%85%8D%E5%AF%B9.png',
    sizeBytes: 34955949,
    mime: 'video/quicktime',
  },
  {
    id: 'oli-remote-control-operation-example',
    title: { en: "Oli Remote Control Operation Example", de: "Oli Fernsteuerung – Bedienbeispiel" },
    section: 'tutorial',
    date: '2026-01-12',
    url: 'https://oss.limxdynamics.com/uploads/video/2026/01/26/1769408900033_%E9%81%A5%E6%8E%A7%E6%93%8D%E4%BD%9C%E7%A4%BA%E4%BE%8B.mov',
    thumbnail: 'https://oss.limxdynamics.com/uploads/image/2026/01/26/1769408918467_%E9%81%A5%E6%8E%A7%E6%93%8D%E4%BD%9C%E7%A4%BA%E4%BE%8B.png',
    sizeBytes: 85437786,
    mime: 'video/quicktime',
  },
  {
    id: 'oli-zero-calibration',
    title: { en: "Oli Zero Calibration", de: "Oli Nullpunkt-Kalibrierung" },
    section: 'tutorial',
    date: '2026-01-12',
    url: 'https://oss.limxdynamics.com/uploads/video/2026/01/26/1769408592336_%E6%A0%A1%E9%9B%B6.mov',
    thumbnail: 'https://oss.limxdynamics.com/uploads/image/2026/01/26/1769408597704_%E6%A0%A1%E9%9B%B6.png',
    sizeBytes: 38211505,
    mime: 'video/quicktime',
  },
  {
    id: 'oli-software-upgrade',
    title: { en: "Oli Software Upgrade", de: "Oli Software-Update" },
    section: 'tutorial',
    date: '2026-01-12',
    url: 'https://oss.limxdynamics.com/uploads/video/2026/01/26/1769408388540_%E8%BD%AF%E4%BB%B6%E5%8D%87%E7%BA%A7.mov',
    thumbnail: 'https://oss.limxdynamics.com/uploads/image/2026/01/26/1769408424406_%E8%BD%AF%E4%BB%B6%E5%8D%87%E7%BA%A7.png',
    sizeBytes: 26298796,
    mime: 'video/quicktime',
  },
  {
    id: 'oli-log-download',
    title: { en: "Oli Log Download", de: "Oli Protokoll-Download" },
    section: 'tutorial',
    date: '2026-01-12',
    url: 'https://oss.limxdynamics.com/uploads/video/2026/01/26/1769408310778_%E6%97%A5%E5%BF%97%E4%B8%8B%E8%BD%BD.mov',
    thumbnail: 'https://oss.limxdynamics.com/uploads/image/2026/01/26/1769408353872_%E6%97%A5%E5%BF%97%E4%B8%8B%E8%BD%BD.png',
    sizeBytes: 22353887,
    mime: 'video/quicktime',
  },
  {
    id: 'oli-unboxing',
    title: { en: "Oli Unboxing", de: "Oli Unboxing" },
    section: 'tutorial',
    date: '2025-11-26',
    url: 'https://oss.limxdynamics.com/uploads/video/2026/01/05/1767600405610_2025.11.25EN%E6%88%90%E7%89%87.mp4',
    thumbnail: 'https://oss.limxdynamics.com/uploads/image/2026/01/05/1767600391602_%E5%BC%80%E7%AE%B1%E8%A7%86%E9%A2%91EN%2016_9.jpg',
    sizeBytes: 345450741,
    mime: 'video/mp4',
  },
  {
    id: 'limx-oli-redefines-smart-guidance',
    title: { en: "LimX Oli Redefines Smart Guidance", de: "LimX Oli definiert intelligente Besucherführung neu" },
    section: 'story',
    date: '2026-04-21',
    url: 'https://oss.limxdynamics.com/uploads/video/2026/05/05/1777953576334_Oli%E5%AF%BC%E8%A7%88EN.mov',
    thumbnail: 'https://oss.limxdynamics.com/uploads/image/2026/05/05/1777953543167_%E5%AF%BC%E8%A7%88%E5%B0%81%E9%9D%A2.webp',
    sizeBytes: 327482274,
    mime: 'video/quicktime',
  },
  {
    id: 'oli-walks-over-construction-debris',
    title: { en: "Oli Walks Over Construction Debris", de: "Oli läuft über Bauschutt" },
    section: 'story',
    date: '2025-11-28',
    url: 'https://oss.limxdynamics.com/uploads/video/2026/01/07/1767779801255_Video%20-%20Humanoid%20Robot%20Oli%20Walks%20Across%20a%20Pile%20of%20Construction%20Rubble%20-%2020251128.mp4',
    thumbnail: 'https://oss.limxdynamics.com/uploads/image/2026/01/07/1767779761036_LimX%20Oli%20%E8%87%AA%E7%84%B6%E6%91%86%E8%87%82%E8%B5%B0%E8%BF%87%E5%BB%BA%E7%AD%91%E5%B7%A5%E5%9C%B0.jpg',
    sizeBytes: 173362463,
    mime: 'video/mp4',
  },
  {
    id: 'oli-fully-autonomous-tennis-ball-picks-up-and-tosses',
    title: { en: "Oli : Fully Autonomous Tennis Ball Picks Up & Tosses", de: "Oli: Vollautonomes Aufheben und Werfen von Tennisbällen" },
    section: 'story',
    date: '2025-09-30',
    url: 'https://oss.limxdynamics.com/uploads/video/2026/01/07/1767779133845_Video%20-%20Full-Size%20Humanoid%20Robot%20LimX%20Oli%20Demonstrates%20Autonomous%20Whole-Body%20Loco-Manipulation%20with%20Active%20Perception%20-%200930%281%29.MP4',
    thumbnail: 'https://oss.limxdynamics.com/uploads/image/2026/01/07/1767778879464_A-Main%20Theme%20Cover:%20Whole-Body%20Loco-Manipulation%20with%20Active%20Perception.jpg',
    sizeBytes: 345312825,
    mime: 'video/mp4',
  },
]

/** "412 MB" / "33 MB" — one decimal only below 100 MB, where it reads as meaningful. */
export function formatSize(bytes: number): string {
  const mb = bytes / 1_048_576
  if (mb >= 1024) return `${(mb / 1024).toFixed(1)} GB`
  return mb >= 100 ? `${Math.round(mb)} MB` : `${mb.toFixed(1)} MB`
}

/** QuickTime files download fine but will not play inline in Chrome or Firefox. */
export function isInlinePlayable(mime: string): boolean {
  return mime === 'video/mp4'
}

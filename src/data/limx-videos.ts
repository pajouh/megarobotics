// LimX Dynamics video library, mirroring the sections LimX publishes at
// https://www.limxdynamics.com/en/videos (Intro / Tutorial / Story).
//
// Two sources per entry:
//   url     LimX's master — 4K, what the Download button serves.
//   webUrl  our 1080p H.264 transcode, what the player streams.
//
// The masters cannot simply be embedded: all are 4K, many are QuickTime
// containers and four are HEVC, which Chrome and Firefox refuse. Transcoding
// also takes the set from 4.4 GB to a size worth streaming.
//
// Playback copies are self-hosted at media.megarobotics.de (nginx on our own
// box, reachable only through Traefik) so there is no storage bill, while the
// download links stay on LimX's CDN so nobody loses the full-quality original.
//
// Copyright in these videos belongs to LimX Dynamics. MegaRobotics publishes
// them as an official distributor.
//
// Generated from the VideoObject JSON-LD on the source page; master sizes come
// from a HEAD against each file.

export type VideoSection = 'intro' | 'tutorial' | 'story'
export type ProductKey = 'oli' | 'tron2'

export interface LimxVideo {
  /** Stable slug; also the filename of the transcoded copy. */
  id: string
  product: ProductKey
  title: { en: string; de: string }
  section: VideoSection
  /** ISO date LimX published it. */
  date: string
  /** LimX's master. Pre-encoded: several paths carry CJK characters and spaces. */
  url: string
  /** Self-hosted 1080p H.264 copy used for in-page playback. */
  webUrl: string
  webSizeBytes: number
  thumbnail: string
  /** Size of the master behind `url`. */
  sizeBytes: number
  /** MIME of the master. The playback copy is always video/mp4. */
  mime: string
  /**
   * LimX's own numbering for tutorial steps, taken from the source filename
   * (1_unboxing, 2_dual_arm_installation, ...). Several tutorials share a
   * publish date, so this is the only signal for the intended sequence.
   * 0 for videos that are not part of a numbered set.
   */
  order: number
}

export const VIDEO_SECTIONS: VideoSection[] = ['intro', 'tutorial', 'story']

/** Filter chip order on the downloads page. */
export const PRODUCTS: ProductKey[] = ['oli', 'tron2']

export const limxVideos: LimxVideo[] = [
  {
    id: 'oli-introduction-video',
    product: 'oli',
    title: { en: "Oli Introduction Video", de: "Oli Vorstellungsvideo" },
    section: 'intro',
    date: '2025-07-30',
    url: 'https://oss.limxdynamics.com/uploads/video/2026/01/05/1767600243902_%E3%80%90EN%E3%80%91Oli%E7%9A%84%E4%B8%80%E5%A4%A9.mp4',
    webUrl: 'https://media.megarobotics.de/oli/oli-introduction-video.mp4',
    webSizeBytes: 62916426,
    thumbnail: 'https://oss.limxdynamics.com/uploads/image/2026/01/05/1767600253924_%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_2025-07-30_093758_628.jpg',
    sizeBytes: 440533449,
    mime: 'video/mp4',
    order: 0,
  },
  {
    id: 'oli-unboxing',
    product: 'oli',
    title: { en: "Oli Unboxing", de: "Oli Unboxing" },
    section: 'tutorial',
    date: '2025-11-26',
    url: 'https://oss.limxdynamics.com/uploads/video/2026/01/05/1767600405610_2025.11.25EN%E6%88%90%E7%89%87.mp4',
    webUrl: 'https://media.megarobotics.de/oli/oli-unboxing.mp4',
    webSizeBytes: 10271616,
    thumbnail: 'https://oss.limxdynamics.com/uploads/image/2026/01/05/1767600391602_%E5%BC%80%E7%AE%B1%E8%A7%86%E9%A2%91EN%2016_9.jpg',
    sizeBytes: 345450741,
    mime: 'video/mp4',
    order: 0,
  },
  {
    id: 'oli-device-charging-example',
    product: 'oli',
    title: { en: "Oli Device Charging Example", de: "Oli Gerät laden" },
    section: 'tutorial',
    date: '2026-01-12',
    url: 'https://oss.limxdynamics.com/uploads/video/2026/01/26/1769408448792_%E8%AE%BE%E5%A4%87%E5%85%85%E7%94%B5.mov',
    webUrl: 'https://media.megarobotics.de/oli/oli-device-charging-example.mp4',
    webSizeBytes: 11323779,
    thumbnail: 'https://oss.limxdynamics.com/uploads/image/2026/01/26/1769408542524_%E8%AE%BE%E5%A4%87%E5%85%85%E7%94%B5.png',
    sizeBytes: 38465187,
    mime: 'video/quicktime',
    order: 0,
  },
  {
    id: 'oli-remote-control-upgrade',
    product: 'oli',
    title: { en: "Oli Remote Control Upgrade", de: "Oli Fernsteuerung – Firmware-Update" },
    section: 'tutorial',
    date: '2026-01-12',
    url: 'https://oss.limxdynamics.com/uploads/video/2026/01/26/1769409110129_%E9%81%A5%E6%8E%A7%E5%99%A8%E5%8D%87%E7%BA%A7.mov',
    webUrl: 'https://media.megarobotics.de/oli/oli-remote-control-upgrade.mp4',
    webSizeBytes: 6343444,
    thumbnail: 'https://oss.limxdynamics.com/uploads/image/2026/01/26/1769409116925_%E9%81%A5%E6%8E%A7%E5%99%A8%E5%8D%87%E7%BA%A7.png',
    sizeBytes: 39063357,
    mime: 'video/quicktime',
    order: 0,
  },
  {
    id: 'oli-remote-control-pairing',
    product: 'oli',
    title: { en: "Oli Remote Control Pairing", de: "Oli Fernsteuerung koppeln" },
    section: 'tutorial',
    date: '2026-01-12',
    url: 'https://oss.limxdynamics.com/uploads/video/2026/01/26/1769409060465_%E9%81%A5%E6%8E%A7%E5%99%A8%E9%85%8D%E5%AF%B9.mov',
    webUrl: 'https://media.megarobotics.de/oli/oli-remote-control-pairing.mp4',
    webSizeBytes: 8301383,
    thumbnail: 'https://oss.limxdynamics.com/uploads/image/2026/01/26/1769409066773_%E9%81%A5%E6%8E%A7%E5%99%A8%E9%85%8D%E5%AF%B9.png',
    sizeBytes: 34955949,
    mime: 'video/quicktime',
    order: 0,
  },
  {
    id: 'oli-remote-control-operation-example',
    product: 'oli',
    title: { en: "Oli Remote Control Operation Example", de: "Oli Fernsteuerung – Bedienbeispiel" },
    section: 'tutorial',
    date: '2026-01-12',
    url: 'https://oss.limxdynamics.com/uploads/video/2026/01/26/1769408900033_%E9%81%A5%E6%8E%A7%E6%93%8D%E4%BD%9C%E7%A4%BA%E4%BE%8B.mov',
    webUrl: 'https://media.megarobotics.de/oli/oli-remote-control-operation-example.mp4',
    webSizeBytes: 16841727,
    thumbnail: 'https://oss.limxdynamics.com/uploads/image/2026/01/26/1769408918467_%E9%81%A5%E6%8E%A7%E6%93%8D%E4%BD%9C%E7%A4%BA%E4%BE%8B.png',
    sizeBytes: 85437786,
    mime: 'video/quicktime',
    order: 0,
  },
  {
    id: 'oli-zero-calibration',
    product: 'oli',
    title: { en: "Oli Zero Calibration", de: "Oli Nullpunkt-Kalibrierung" },
    section: 'tutorial',
    date: '2026-01-12',
    url: 'https://oss.limxdynamics.com/uploads/video/2026/01/26/1769408592336_%E6%A0%A1%E9%9B%B6.mov',
    webUrl: 'https://media.megarobotics.de/oli/oli-zero-calibration.mp4',
    webSizeBytes: 8547142,
    thumbnail: 'https://oss.limxdynamics.com/uploads/image/2026/01/26/1769408597704_%E6%A0%A1%E9%9B%B6.png',
    sizeBytes: 38211505,
    mime: 'video/quicktime',
    order: 0,
  },
  {
    id: 'oli-software-upgrade',
    product: 'oli',
    title: { en: "Oli Software Upgrade", de: "Oli Software-Update" },
    section: 'tutorial',
    date: '2026-01-12',
    url: 'https://oss.limxdynamics.com/uploads/video/2026/01/26/1769408388540_%E8%BD%AF%E4%BB%B6%E5%8D%87%E7%BA%A7.mov',
    webUrl: 'https://media.megarobotics.de/oli/oli-software-upgrade.mp4',
    webSizeBytes: 5468609,
    thumbnail: 'https://oss.limxdynamics.com/uploads/image/2026/01/26/1769408424406_%E8%BD%AF%E4%BB%B6%E5%8D%87%E7%BA%A7.png',
    sizeBytes: 26298796,
    mime: 'video/quicktime',
    order: 0,
  },
  {
    id: 'oli-log-download',
    product: 'oli',
    title: { en: "Oli Log Download", de: "Oli Protokoll-Download" },
    section: 'tutorial',
    date: '2026-01-12',
    url: 'https://oss.limxdynamics.com/uploads/video/2026/01/26/1769408310778_%E6%97%A5%E5%BF%97%E4%B8%8B%E8%BD%BD.mov',
    webUrl: 'https://media.megarobotics.de/oli/oli-log-download.mp4',
    webSizeBytes: 4876661,
    thumbnail: 'https://oss.limxdynamics.com/uploads/image/2026/01/26/1769408353872_%E6%97%A5%E5%BF%97%E4%B8%8B%E8%BD%BD.png',
    sizeBytes: 22353887,
    mime: 'video/quicktime',
    order: 0,
  },
  {
    id: 'oli-fully-autonomous-tennis-ball-picks-up-and-tosses',
    product: 'oli',
    title: { en: "Oli : Fully Autonomous Tennis Ball Picks Up & Tosses", de: "Oli: Vollautonomes Aufheben und Werfen von Tennisbällen" },
    section: 'story',
    date: '2025-09-30',
    url: 'https://oss.limxdynamics.com/uploads/video/2026/01/07/1767779133845_Video%20-%20Full-Size%20Humanoid%20Robot%20LimX%20Oli%20Demonstrates%20Autonomous%20Whole-Body%20Loco-Manipulation%20with%20Active%20Perception%20-%200930%281%29.MP4',
    webUrl: 'https://media.megarobotics.de/oli/oli-fully-autonomous-tennis-ball-picks-up-and-tosses.mp4',
    webSizeBytes: 43147572,
    thumbnail: 'https://oss.limxdynamics.com/uploads/image/2026/01/07/1767778879464_A-Main%20Theme%20Cover:%20Whole-Body%20Loco-Manipulation%20with%20Active%20Perception.jpg',
    sizeBytes: 345312825,
    mime: 'video/mp4',
    order: 0,
  },
  {
    id: 'oli-walks-over-construction-debris',
    product: 'oli',
    title: { en: "Oli Walks Over Construction Debris", de: "Oli läuft über Bauschutt" },
    section: 'story',
    date: '2025-11-28',
    url: 'https://oss.limxdynamics.com/uploads/video/2026/01/07/1767779801255_Video%20-%20Humanoid%20Robot%20Oli%20Walks%20Across%20a%20Pile%20of%20Construction%20Rubble%20-%2020251128.mp4',
    webUrl: 'https://media.megarobotics.de/oli/oli-walks-over-construction-debris.mp4',
    webSizeBytes: 49182591,
    thumbnail: 'https://oss.limxdynamics.com/uploads/image/2026/01/07/1767779761036_LimX%20Oli%20%E8%87%AA%E7%84%B6%E6%91%86%E8%87%82%E8%B5%B0%E8%BF%87%E5%BB%BA%E7%AD%91%E5%B7%A5%E5%9C%B0.jpg',
    sizeBytes: 173362463,
    mime: 'video/mp4',
    order: 0,
  },
  {
    id: 'limx-oli-redefines-smart-guidance',
    product: 'oli',
    title: { en: "LimX Oli Redefines Smart Guidance", de: "LimX Oli definiert intelligente Besucherführung neu" },
    section: 'story',
    date: '2026-04-21',
    url: 'https://oss.limxdynamics.com/uploads/video/2026/05/05/1777953576334_Oli%E5%AF%BC%E8%A7%88EN.mov',
    webUrl: 'https://media.megarobotics.de/oli/limx-oli-redefines-smart-guidance.mp4',
    webSizeBytes: 37604353,
    thumbnail: 'https://oss.limxdynamics.com/uploads/image/2026/05/05/1777953543167_%E5%AF%BC%E8%A7%88%E5%B0%81%E9%9D%A2.webp',
    sizeBytes: 327482274,
    mime: 'video/quicktime',
    order: 0,
  },
  {
    id: 'tron-2-redefining-the-foundation-of-embodied-robotics',
    product: 'tron2',
    title: { en: "TRON 2 : Redefining the Foundation of Embodied Robotics", de: "TRON 2: Die Grundlage verkörperter Robotik neu definiert" },
    section: 'intro',
    date: '2025-12-18',
    url: 'https://oss.limxdynamics.com/uploads/video/2026/01/19/1768826549341_251218_%E9%80%90%E9%99%85%E5%8A%A8%E5%8A%9BTRON_EN.mp4',
    webUrl: 'https://media.megarobotics.de/tron2/tron-2-redefining-the-foundation-of-embodied-robotics.mp4',
    webSizeBytes: 51934082,
    thumbnail: 'https://oss.limxdynamics.com/uploads/image/2026/01/19/1768826365890_TRON2%E5%8F%91%E5%B8%83%20EN%2016_9.jpg',
    sizeBytes: 373802204,
    mime: 'video/mp4',
    order: 251218,
  },
  {
    id: 'tron2-unboxing',
    product: 'tron2',
    title: { en: "TRON2 Unboxing", de: "TRON 2 Unboxing" },
    section: 'tutorial',
    date: '2026-09-14',
    url: 'https://oss.limxdynamics.com/uploads/video/2026/09/14/1789355702850_1_unboxing_EN.mp4',
    webUrl: 'https://media.megarobotics.de/tron2/tron2-unboxing.mp4',
    webSizeBytes: 24033544,
    thumbnail: 'https://oss.limxdynamics.com/uploads/image/2026/09/15/1789459528063_1_%E5%BC%80%E7%AE%B1.webp',
    sizeBytes: 191706245,
    mime: 'video/mp4',
    order: 1,
  },
  {
    id: 'tron2-dual-arm-installation',
    product: 'tron2',
    title: { en: "TRON2 Dual-arm installation", de: "TRON 2 Montage der Doppelarme" },
    section: 'tutorial',
    date: '2026-09-14',
    url: 'https://oss.limxdynamics.com/uploads/video/2026/09/16/1789552416721_2_dual_arm_installation2_EN.mp4',
    webUrl: 'https://media.megarobotics.de/tron2/tron2-dual-arm-installation.mp4',
    webSizeBytes: 42434923,
    thumbnail: 'https://oss.limxdynamics.com/uploads/image/2026/09/15/1789459509486_2_%E5%8F%8C%E8%87%82%E5%AE%89%E8%A3%85.webp',
    sizeBytes: 454972205,
    mime: 'video/mp4',
    order: 2,
  },
  {
    id: 'tron-2-wheel-leg-installation',
    product: 'tron2',
    title: { en: "TRON 2 Wheel-leg installation", de: "TRON 2 Montage der Radbeine" },
    section: 'tutorial',
    date: '2026-09-14',
    url: 'https://oss.limxdynamics.com/uploads/video/2026/09/14/1789355919536_3_wheeled_foot_installation_EN.mp4',
    webUrl: 'https://media.megarobotics.de/tron2/tron-2-wheel-leg-installation.mp4',
    webSizeBytes: 11148398,
    thumbnail: 'https://oss.limxdynamics.com/uploads/image/2026/09/15/1789459758935_3_%E8%B6%B3%E8%BD%AE%E5%AE%89%E8%A3%85.webp',
    sizeBytes: 125486730,
    mime: 'video/mp4',
    order: 3,
  },
  {
    id: 'tron-2-wheeled-foot-flat-foot-switching',
    product: 'tron2',
    title: { en: "TRON 2 Wheeled-foot Flat-foot Switching", de: "TRON 2 Umschalten zwischen Rad- und Flachfuß" },
    section: 'tutorial',
    date: '2026-09-14',
    url: 'https://oss.limxdynamics.com/uploads/video/2026/09/14/1789356075749_4_wheeled_foot_sole_switching_EN.mp4',
    webUrl: 'https://media.megarobotics.de/tron2/tron-2-wheeled-foot-flat-foot-switching.mp4',
    webSizeBytes: 12253546,
    thumbnail: 'https://oss.limxdynamics.com/uploads/image/2026/09/15/1789459738061_4_%E8%BD%AE%E8%B6%B3%E6%A8%A1%E5%BD%A2%E5%88%87%E6%8D%A2%20-%20%E5%89%AF%E6%9C%AC.webp',
    sizeBytes: 134213124,
    mime: 'video/mp4',
    order: 4,
  },
  {
    id: 'tron-2-roll-cage-installation',
    product: 'tron2',
    title: { en: "TRON 2 Roll cage installation", de: "TRON 2 Montage des Überrollkäfigs" },
    section: 'tutorial',
    date: '2026-09-14',
    url: 'https://oss.limxdynamics.com/uploads/video/2026/09/14/1789356161975_5_anti_roll_bar_installation_EN.mp4',
    webUrl: 'https://media.megarobotics.de/tron2/tron-2-roll-cage-installation.mp4',
    webSizeBytes: 6286979,
    thumbnail: 'https://oss.limxdynamics.com/uploads/image/2026/09/15/1789459614399_5_%E9%98%B2%E6%BB%9A%E6%94%AF%E6%9E%B6%E5%AE%89%E8%A3%85.webp',
    sizeBytes: 54314942,
    mime: 'video/mp4',
    order: 5,
  },
  {
    id: 'tron-2-remote-controller-pairing',
    product: 'tron2',
    title: { en: "TRON 2 Remote controller pairing", de: "TRON 2 Fernsteuerung koppeln" },
    section: 'tutorial',
    date: '2026-09-14',
    url: 'https://oss.limxdynamics.com/uploads/video/2026/09/14/1789356247700_6_remote_controller_pairing_EN.mp4',
    webUrl: 'https://media.megarobotics.de/tron2/tron-2-remote-controller-pairing.mp4',
    webSizeBytes: 7699297,
    thumbnail: 'https://oss.limxdynamics.com/uploads/image/2026/09/15/1789459599795_6_%E9%81%A5%E6%8E%A7%E5%99%A8%E9%85%8D%E5%AF%B9.webp',
    sizeBytes: 112139563,
    mime: 'video/mp4',
    order: 6,
  },
  {
    id: 'tron-2-packing',
    product: 'tron2',
    title: { en: "TRON 2 Packing", de: "TRON 2 Verpacken" },
    section: 'tutorial',
    date: '2026-09-14',
    url: 'https://oss.limxdynamics.com/uploads/video/2026/09/14/1789356371536_7_packing_EN.mp4',
    webUrl: 'https://media.megarobotics.de/tron2/tron-2-packing.mp4',
    webSizeBytes: 19629342,
    thumbnail: 'https://oss.limxdynamics.com/uploads/image/2026/09/15/1789459770117_7_%E8%A3%85%E7%AE%B1.webp',
    sizeBytes: 122334697,
    mime: 'video/mp4',
    order: 7,
  },
  {
    id: 'tron-2-remote-controller-arm-operation',
    product: 'tron2',
    title: { en: "TRON 2 Remote Controller Arm Operation", de: "TRON 2 Fernsteuerung – Armbedienung" },
    section: 'tutorial',
    date: '2026-09-14',
    url: 'https://oss.limxdynamics.com/uploads/video/2026/09/14/1789356411220_8_remote_controller_arm_EN.mp4',
    webUrl: 'https://media.megarobotics.de/tron2/tron-2-remote-controller-arm-operation.mp4',
    webSizeBytes: 5306561,
    thumbnail: 'https://oss.limxdynamics.com/uploads/image/2026/09/15/1789459584293_8_%E9%81%A5%E6%8E%A7%E5%99%A8%E6%93%8D%E4%BD%9C.webp',
    sizeBytes: 66212085,
    mime: 'video/mp4',
    order: 8,
  },
  {
    id: 'tron-2-remote-controller-wheeled-flatfoot-operation',
    product: 'tron2',
    title: { en: "TRON 2 Remote Controller Wheeled-Flatfoot Operation", de: "TRON 2 Fernsteuerung – Rad- und Flachfußbetrieb" },
    section: 'tutorial',
    date: '2026-09-14',
    url: 'https://oss.limxdynamics.com/uploads/video/2026/09/14/1789356489931_9_remote_controller_wheeled_foot_EN.mp4',
    webUrl: 'https://media.megarobotics.de/tron2/tron-2-remote-controller-wheeled-flatfoot-operation.mp4',
    webSizeBytes: 16258581,
    thumbnail: 'https://oss.limxdynamics.com/uploads/image/2026/09/15/1789459567859_9_%E8%BD%AE%E8%B6%B3%E9%81%A5%E6%93%8D.webp',
    sizeBytes: 256064723,
    mime: 'video/mp4',
    order: 9,
  },
  {
    id: 'tron-2-dual-arm-vr-teleoperation',
    product: 'tron2',
    title: { en: "TRON 2 Dual-arm VR Teleoperation", de: "TRON 2 VR-Teleoperation mit Doppelarm" },
    section: 'tutorial',
    date: '2026-09-14',
    url: 'https://oss.limxdynamics.com/uploads/video/2026/09/14/1789356585575_10_dual_arm_teleoperation_EN.mp4',
    webUrl: 'https://media.megarobotics.de/tron2/tron-2-dual-arm-vr-teleoperation.mp4',
    webSizeBytes: 26416288,
    thumbnail: 'https://oss.limxdynamics.com/uploads/image/2026/09/15/1789459555495_10_%E5%8F%8C%E8%87%82%E9%81%A5%E6%93%8D.webp',
    sizeBytes: 229560412,
    mime: 'video/mp4',
    order: 10,
  },
  {
    id: 'tron-2-network-settings-and-log-download-and-software-update',
    product: 'tron2',
    title: { en: "TRON 2 Network Settings & Log Download & Software Update", de: "TRON 2 Netzwerk, Protokolle und Software-Update" },
    section: 'tutorial',
    date: '2026-09-14',
    url: 'https://oss.limxdynamics.com/uploads/video/2026/09/14/1789356666294_11_network_setup_EN.mp4',
    webUrl: 'https://media.megarobotics.de/tron2/tron-2-network-settings-and-log-download-and-software-update.mp4',
    webSizeBytes: 9343653,
    thumbnail: 'https://oss.limxdynamics.com/uploads/image/2026/09/15/1789459543029_11_%E6%9C%BA%E5%99%A8%E4%BA%BA%E7%AE%A1%E7%90%86.webp',
    sizeBytes: 152062813,
    mime: 'video/mp4',
    order: 11,
  },
  {
    id: 'tron-2-zero-calibration',
    product: 'tron2',
    title: { en: "TRON 2 Zero Calibration", de: "TRON 2 Nullpunkt-Kalibrierung" },
    section: 'tutorial',
    date: '2026-09-13',
    url: 'https://oss.limxdynamics.com/uploads/video/2026/09/14/1789356776087_12_zero_calibration_EN.mp4',
    webUrl: 'https://media.megarobotics.de/tron2/tron-2-zero-calibration.mp4',
    webSizeBytes: 12331289,
    thumbnail: 'https://oss.limxdynamics.com/uploads/image/2026/09/15/1789464577174_12_%E6%A0%A1%E9%9B%B6.webp',
    sizeBytes: 231385677,
    mime: 'video/mp4',
    order: 12,
  },
  {
    id: 'tron-2-remote-controller-firmware-upgrade',
    product: 'tron2',
    title: { en: "TRON 2 Remote Controller Firmware Upgrade", de: "TRON 2 Fernsteuerung – Firmware-Update" },
    section: 'tutorial',
    date: '2026-09-14',
    url: 'https://oss.limxdynamics.com/uploads/video/2026/09/18/1789719776052_13remote_control_firmware_upgrade_en.mp4',
    webUrl: 'https://media.megarobotics.de/tron2/tron-2-remote-controller-firmware-upgrade.mp4',
    webSizeBytes: 9604815,
    thumbnail: 'https://oss.limxdynamics.com/uploads/image/2026/09/18/1789719648081_%E9%81%A5%E6%8E%A7%E5%99%A8%E5%9B%BA%E4%BB%B6%E5%8D%87%E7%BA%A7%E6%9C%80%E7%BB%88%E7%89%880917-%E5%B0%81%E9%9D%A2.webp',
    sizeBytes: 151966417,
    mime: 'video/mp4',
    order: 13,
  },
  {
    id: 'tron-2-embodied-intelligence-empowers-new-forms-of-retail',
    product: 'tron2',
    title: { en: "TRON 2 : Embodied Intelligence Empowers New Forms of Retail", de: "TRON 2: Verkörperte Intelligenz für neue Handelsformen" },
    section: 'story',
    date: '2026-04-14',
    url: 'https://oss.limxdynamics.com/uploads/video/2026/05/05/1777953451325_TRON2%E5%8F%A0%E8%A1%A3%E6%9C%8D.mov',
    webUrl: 'https://media.megarobotics.de/tron2/tron-2-embodied-intelligence-empowers-new-forms-of-retail.mp4',
    webSizeBytes: 18707555,
    thumbnail: 'https://oss.limxdynamics.com/uploads/image/2026/05/05/1777953488195_Tron2%20%E5%8F%A0%E8%A1%A3%E6%9C%8D%20EN%2016_9.webp',
    sizeBytes: 103314641,
    mime: 'video/quicktime',
    order: 0,
  },
]

/** "412 MB" / "33 MB" — one decimal only below 100 MB, where it reads as meaningful. */
export function formatSize(bytes: number): string {
  const mb = bytes / 1_048_576
  if (mb >= 1024) return `${(mb / 1024).toFixed(1)} GB`
  return mb >= 100 ? `${Math.round(mb)} MB` : `${mb.toFixed(1)} MB`
}

/**
 * Every entry ships a self-hosted mp4, so all of them play inline. Kept as a
 * named check so the reason is greppable if an entry ever arrives without a
 * transcoded copy.
 */
export function isInlinePlayable(video: Pick<LimxVideo, 'webUrl'>): boolean {
  return video.webUrl.length > 0
}

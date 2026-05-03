// Script to import LimX Dynamics Series B article into Sanity
import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'wudur8e8',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

const articleData = {
  _type: 'article',
  title: {
    en: 'LimX Dynamics Secures $200 Million in Series B Financing',
    de: 'LimX Dynamics sichert sich 200 Millionen US-Dollar in Serie-B-Finanzierung',
  },
  slug: { _type: 'slug', current: 'limx-dynamics-secures-200-million-series-b-financing' },
  excerpt: {
    en: 'LimX Dynamics closes a $200M Series B round to accelerate R&D in humanoid robots, modular platforms, and its Agentic OS — backed by Stone Venture, JD, Oriental Fortune Capital, and more.',
    de: 'LimX Dynamics schließt eine Serie-B-Finanzierungsrunde über 200 Mio. USD ab, um die Forschung und Entwicklung humanoider Roboter, modularer Plattformen und seines Agentic OS voranzutreiben.',
  },
  publishedAt: '2026-02-02T00:00:00.000Z',
  readTime: 5,
  featured: false,
  category: { _type: 'reference', _ref: '9854edeb-2162-490b-94c6-a3da2568f574' }, // News
  author: { _type: 'reference', _ref: '6e037607-3f70-4edb-a520-d61d1622875c' }, // MegaRobotics Editorial
  body: {
    en: [
      // Introduction
      {
        _type: 'block',
        _key: 'intro1',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'intro1s',
            text: 'LimX Dynamics has announced securing $200 million USD in Series B financing. The round included leading domestic and international investors: Stone Venture, JD, Oriental Fortune Capital, and CoStone Capital. Existing shareholders also participated, including Shangqi Capital (backed by SAIC Motor), NIO Capital, and Future Capital.',
          },
        ],
      },
      // Stats Grid
      {
        _type: 'statsGrid',
        _key: 'stats1',
        stats: [
          { _key: 's1', value: '$200M', label: 'Series B Raised' },
          { _key: 's2', value: '7+', label: 'Major Investors' },
          { _key: 's3', value: '3', label: 'Core Technology Pillars' },
          { _key: 's4', value: '2', label: 'New Products Released' },
        ],
      },
      // Section 1
      {
        _type: 'block',
        _key: 'h2_1',
        style: 'h2',
        children: [{ _type: 'span', _key: 'h2_1s', text: 'Accelerating Real-World Adoption with Full-Stack Technology Innovation' }],
      },
      {
        _type: 'block',
        _key: 'p1',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'p1s',
            text: 'Entering 2026, LimX Dynamics is focused on accelerating R&D and global market expansion with the support of its shareholders and ecosystem partners. The company advances three core technology pillars: robot hardware design and manufacturing, motion control foundation models, and a physical-world-native Agentic OS.',
          },
        ],
      },
      {
        _type: 'block',
        _key: 'p2',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'p2s',
            text: 'The company pioneers the integration of high-level cognitive planning with whole-body motion control in humanoid robots. It drives innovation in general-purpose humanoids and modular robot platforms through product engineering optimization and supply chain development.',
          },
        ],
      },
      // Highlight Box - Core Technology
      {
        _type: 'highlightBox',
        _key: 'highlight1',
        title: 'Three Core Technology Pillars',
        items: [
          'Robot Hardware Design & Manufacturing: End-to-end hardware development for humanoid and modular platforms',
          'Motion Control Foundation Models: Advanced AI models bridging cognitive planning and physical execution',
          'Agentic OS (LimX COSA): A physical-world-native operating system coupling reasoning with whole-body motion control',
        ],
      },
      // Section 2 - TRON 2
      {
        _type: 'block',
        _key: 'h2_2',
        style: 'h2',
        children: [{ _type: 'span', _key: 'h2_2s', text: 'TRON 2: A Multi-Modal Robotic Platform for Real-World Validation' }],
      },
      {
        _type: 'block',
        _key: 'p3',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'p3s',
            text: 'Among the company\'s recent releases attracting significant industry attention is TRON 2. The platform features an original modular architecture supporting flexible reconfiguration across multiple forms, unifying mobility and manipulation within a single platform.',
          },
        ],
      },
      {
        _type: 'block',
        _key: 'p4',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'p4s',
            text: 'Developers can adapt robots to different applications without repeatedly customizing hardware. The platform serves as a reusable, scalable, and continuously evolving foundation as robotics and AI technologies advance. This modular approach dramatically reduces development time and cost for companies exploring robotic solutions across diverse use cases.',
          },
        ],
      },
      // Feature Grid - TRON 2
      {
        _type: 'featureGrid',
        _key: 'features1',
        features: [
          { _key: 'f1', icon: '🔧', title: 'Modular Architecture', description: 'Flexible reconfiguration across multiple robot forms without custom hardware.' },
          { _key: 'f2', icon: '🤖', title: 'Unified Platform', description: 'Combines mobility and manipulation capabilities in a single system.' },
          { _key: 'f3', icon: '📈', title: 'Scalable Design', description: 'Continuously evolving platform that grows with advancing AI and robotics.' },
          { _key: 'f4', icon: '⚡', title: 'Rapid Deployment', description: 'Developers adapt to new applications without rebuilding from scratch.' },
        ],
      },
      // Section 3 - COSA
      {
        _type: 'block',
        _key: 'h2_3',
        style: 'h2',
        children: [{ _type: 'span', _key: 'h2_3s', text: 'LimX COSA: An Agentic Operating System for Robotic Autonomy' }],
      },
      {
        _type: 'block',
        _key: 'p5',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'p5s',
            text: 'LimX COSA is an operating system purpose-built for robots operating in physical environments, coupling high-level reasoning with whole-body motion control. This represents a fundamental shift from traditional script-based robot programming to truly autonomous operation.',
          },
        ],
      },
      {
        _type: 'block',
        _key: 'p6',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'p6s',
            text: 'Powered by COSA, the full-size humanoid robot Oli no longer relies on fixed scripts. It interprets tasks, perceives its surroundings, plans actions, and adjusts behaviors in real-time for dynamic environments. LimX COSA orchestrates models, skills, and hardware as unified systems, enabling autonomous execution of complex real-world tasks.',
          },
        ],
      },
      // Quote Box
      {
        _type: 'quoteBox',
        _key: 'quote1',
        quote: 'At a pivotal moment for physical AI, LimX Dynamics remains committed to original innovation, grounded in strong product development and customer-first principles. Together with global partners, LimX Dynamics advances real-world validation and robot deployment, ensuring technological progress serves people.',
        author: 'LimX Dynamics',
      },
      // Outlook
      {
        _type: 'block',
        _key: 'h2_4',
        style: 'h2',
        children: [{ _type: 'span', _key: 'h2_4s', text: 'Looking Ahead: From Lab to Real World' }],
      },
      {
        _type: 'block',
        _key: 'p7',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'p7s',
            text: 'With $200 million in fresh capital, LimX Dynamics is well-positioned to accelerate the transition of advanced robotics from research labs to real-world deployment. The combination of modular hardware platforms like TRON 2 and intelligent software systems like COSA creates a compelling full-stack offering for enterprise customers and research institutions alike.',
          },
        ],
      },
      {
        _type: 'block',
        _key: 'p8',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'p8s',
            text: 'The backing of major investors — from automotive giant SAIC Motor to EV pioneer NIO — signals strong confidence in the company\'s vision for general-purpose robotics. As the physical AI landscape continues to evolve rapidly, LimX Dynamics\' integrated approach to hardware, motion control, and autonomous operating systems positions it as a key player in the next generation of robotic solutions.',
          },
        ],
      },
      // CTA Box
      {
        _type: 'ctaBox',
        _key: 'cta1',
        title: 'Explore LimX Dynamics Products',
        description: 'LimX Dynamics is pushing the boundaries of humanoid robotics with modular platforms and AI-powered autonomy. Contact MegaRobotics to learn more about TRON 2, LimX COSA, and other cutting-edge robotic solutions available through our network.',
      },
    ],
    de: [
      // Introduction
      {
        _type: 'block',
        _key: 'intro1',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'intro1s',
            text: 'LimX Dynamics hat den Abschluss einer Serie-B-Finanzierung in Höhe von 200 Millionen US-Dollar bekannt gegeben. An der Runde beteiligten sich führende nationale und internationale Investoren: Stone Venture, JD, Oriental Fortune Capital und CoStone Capital. Auch bestehende Anteilseigner wie Shangqi Capital (unterstützt von SAIC Motor), NIO Capital und Future Capital nahmen teil.',
          },
        ],
      },
      // Stats Grid
      {
        _type: 'statsGrid',
        _key: 'stats1',
        stats: [
          { _key: 's1', value: '200 Mio. $', label: 'Serie-B-Finanzierung' },
          { _key: 's2', value: '7+', label: 'Große Investoren' },
          { _key: 's3', value: '3', label: 'Technologie-Säulen' },
          { _key: 's4', value: '2', label: 'Neue Produkte' },
        ],
      },
      // Section 1
      {
        _type: 'block',
        _key: 'h2_1',
        style: 'h2',
        children: [{ _type: 'span', _key: 'h2_1s', text: 'Beschleunigte Praxiseinführung durch Full-Stack-Technologieinnovation' }],
      },
      {
        _type: 'block',
        _key: 'p1',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'p1s',
            text: 'Zum Start des Jahres 2026 konzentriert sich LimX Dynamics auf die Beschleunigung von F&E und die globale Marktexpansion mit Unterstützung seiner Anteilseigner und Ökosystempartner. Das Unternehmen verfolgt drei zentrale Technologiesäulen: Roboter-Hardware-Design und -Fertigung, Bewegungssteuerungs-Grundlagenmodelle und ein physisch-natives Agentic OS.',
          },
        ],
      },
      {
        _type: 'block',
        _key: 'p2',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'p2s',
            text: 'Das Unternehmen ist Vorreiter bei der Integration von kognitiver Planung auf hoher Ebene mit Ganzkörper-Bewegungssteuerung bei humanoiden Robotern. Es treibt Innovationen bei universellen Humanoiden und modularen Roboterplattformen durch Produktoptimierung und Lieferkettenentwicklung voran.',
          },
        ],
      },
      // Highlight Box
      {
        _type: 'highlightBox',
        _key: 'highlight1',
        title: 'Drei zentrale Technologiesäulen',
        items: [
          'Roboter-Hardware-Design & Fertigung: End-to-End-Hardwareentwicklung für humanoide und modulare Plattformen',
          'Bewegungssteuerungs-Grundlagenmodelle: Fortschrittliche KI-Modelle, die kognitive Planung und physische Ausführung verbinden',
          'Agentic OS (LimX COSA): Ein physisch-natives Betriebssystem, das Argumentation mit Ganzkörper-Bewegungssteuerung verbindet',
        ],
      },
      // Section 2 - TRON 2
      {
        _type: 'block',
        _key: 'h2_2',
        style: 'h2',
        children: [{ _type: 'span', _key: 'h2_2s', text: 'TRON 2: Eine multimodale Roboterplattform für die Praxisvalidierung' }],
      },
      {
        _type: 'block',
        _key: 'p3',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'p3s',
            text: 'Zu den jüngsten Veröffentlichungen des Unternehmens, die große Aufmerksamkeit in der Branche erregen, gehört TRON 2. Die Plattform verfügt über eine originelle modulare Architektur, die eine flexible Rekonfiguration in mehreren Formen unterstützt und Mobilität und Manipulation in einer einzigen Plattform vereint.',
          },
        ],
      },
      {
        _type: 'block',
        _key: 'p4',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'p4s',
            text: 'Entwickler können Roboter an verschiedene Anwendungen anpassen, ohne die Hardware wiederholt anpassen zu müssen. Die Plattform dient als wiederverwendbare, skalierbare und sich kontinuierlich weiterentwickelnde Grundlage. Dieser modulare Ansatz reduziert Entwicklungszeit und -kosten erheblich.',
          },
        ],
      },
      // Feature Grid - TRON 2
      {
        _type: 'featureGrid',
        _key: 'features1',
        features: [
          { _key: 'f1', icon: '🔧', title: 'Modulare Architektur', description: 'Flexible Rekonfiguration über mehrere Roboterformen ohne kundenspezifische Hardware.' },
          { _key: 'f2', icon: '🤖', title: 'Einheitliche Plattform', description: 'Kombiniert Mobilitäts- und Manipulationsfähigkeiten in einem System.' },
          { _key: 'f3', icon: '📈', title: 'Skalierbares Design', description: 'Sich kontinuierlich weiterentwickelnde Plattform mit fortschreitender KI und Robotik.' },
          { _key: 'f4', icon: '⚡', title: 'Schnelle Bereitstellung', description: 'Entwickler passen sich an neue Anwendungen an, ohne von Grund auf neu zu bauen.' },
        ],
      },
      // Section 3 - COSA
      {
        _type: 'block',
        _key: 'h2_3',
        style: 'h2',
        children: [{ _type: 'span', _key: 'h2_3s', text: 'LimX COSA: Ein Agentic-Betriebssystem für robotische Autonomie' }],
      },
      {
        _type: 'block',
        _key: 'p5',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'p5s',
            text: 'LimX COSA ist ein Betriebssystem, das speziell für Roboter entwickelt wurde, die in physischen Umgebungen arbeiten, und hochrangiges Denken mit Ganzkörper-Bewegungssteuerung verbindet. Dies stellt einen grundlegenden Wandel von der traditionellen skriptbasierten Roboterprogrammierung hin zu wirklich autonomem Betrieb dar.',
          },
        ],
      },
      {
        _type: 'block',
        _key: 'p6',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'p6s',
            text: 'Angetrieben von COSA ist der humanoide Roboter Oli in voller Größe nicht mehr auf feste Skripte angewiesen. Er interpretiert Aufgaben, nimmt seine Umgebung wahr, plant Aktionen und passt sein Verhalten in Echtzeit an dynamische Umgebungen an. LimX COSA orchestriert Modelle, Fähigkeiten und Hardware als einheitliche Systeme.',
          },
        ],
      },
      // Quote Box
      {
        _type: 'quoteBox',
        _key: 'quote1',
        quote: 'In einem entscheidenden Moment für physische KI bleibt LimX Dynamics der originären Innovation verpflichtet, verankert in starker Produktentwicklung und kundenorientierten Prinzipien. Gemeinsam mit globalen Partnern treibt LimX Dynamics die Validierung und den Einsatz von Robotern in der realen Welt voran.',
        author: 'LimX Dynamics',
      },
      // Outlook
      {
        _type: 'block',
        _key: 'h2_4',
        style: 'h2',
        children: [{ _type: 'span', _key: 'h2_4s', text: 'Ausblick: Vom Labor in die reale Welt' }],
      },
      {
        _type: 'block',
        _key: 'p7',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'p7s',
            text: 'Mit 200 Millionen Dollar an frischem Kapital ist LimX Dynamics bestens positioniert, um den Übergang fortschrittlicher Robotik vom Forschungslabor in den realen Einsatz zu beschleunigen. Die Kombination aus modularen Hardwareplattformen wie TRON 2 und intelligenten Softwaresystemen wie COSA schafft ein überzeugendes Full-Stack-Angebot für Unternehmenskunden und Forschungseinrichtungen.',
          },
        ],
      },
      {
        _type: 'block',
        _key: 'p8',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'p8s',
            text: 'Die Unterstützung großer Investoren — vom Automobilgiganten SAIC Motor bis zum EV-Pionier NIO — signalisiert starkes Vertrauen in die Vision des Unternehmens für universelle Robotik. LimX Dynamics\' integrierter Ansatz für Hardware, Bewegungssteuerung und autonome Betriebssysteme positioniert das Unternehmen als wichtigen Akteur der nächsten Generation robotischer Lösungen.',
          },
        ],
      },
      // CTA Box
      {
        _type: 'ctaBox',
        _key: 'cta1',
        title: 'LimX Dynamics Produkte entdecken',
        description: 'LimX Dynamics verschiebt die Grenzen der humanoiden Robotik mit modularen Plattformen und KI-gestützter Autonomie. Kontaktieren Sie MegaRobotics, um mehr über TRON 2, LimX COSA und andere innovative Robotiklösungen zu erfahren.',
      },
    ],
  },
}

async function importArticle() {
  try {
    console.log('Creating LimX Dynamics article in Sanity...')
    const result = await client.create(articleData)
    console.log('Article created successfully!')
    console.log('Article ID:', result._id)
    console.log('Slug:', result.slug.current)
    console.log('\nView at:')
    console.log('  EN: https://megarobotics.de/en/articles/' + result.slug.current)
    console.log('  DE: https://megarobotics.de/de/articles/' + result.slug.current)
  } catch (error) {
    console.error('Error creating article:', error)
  }
}

importArticle()

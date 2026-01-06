// Script to import the Unitree article into Sanity
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
  title: 'How Unitree Robotics Is Changing the World: From Factory Floors to Farm Fields',
  slug: { _type: 'slug', current: 'how-unitree-robotics-is-changing-the-world' },
  excerpt: 'Discover how Unitree\'s affordable quadruped and humanoid robots are revolutionizing industries from manufacturing to agriculture, search and rescue, and healthcare.',
  publishedAt: new Date().toISOString(),
  readTime: 15,
  featured: true,
  body: [
    // Introduction
    {
      _type: 'block',
      _key: 'intro1',
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: 'The future of robotics isn\'t just arriving—it\'s already here, walking on four legs and standing on two. Unitree Robotics, the Chinese company that made headlines at CES 2025 and captivated over a billion viewers during China\'s 2025 Spring Festival Gala, is proving that advanced robotics can be both accessible and transformative. From warehouse floors to agricultural fields, from disaster zones to healthcare facilities, Unitree\'s machines are reshaping how we work, farm, and save lives.',
        },
      ],
    },
    // Stats Grid
    {
      _type: 'statsGrid',
      _key: 'stats1',
      stats: [
        { value: '$1,600', label: 'Go2 Starting Price' },
        { value: '5,000+', label: 'G1 Units Sold (H1 2025)' },
        { value: '$837B', label: 'Projected Market by 2050' },
        { value: '150+', label: 'Patents Granted' },
      ],
    },
    // Section 1
    {
      _type: 'block',
      _key: 'h2_1',
      style: 'h2',
      children: [{ _type: 'span', text: 'The Unitree Revolution: Making Advanced Robotics Accessible' }],
    },
    {
      _type: 'block',
      _key: 'p1',
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: 'What sets Unitree apart in the crowded robotics landscape isn\'t just technical capability—it\'s democratization. While Boston Dynamics\' Spot robot commands prices upward of $75,000, Unitree\'s comparable Go2 starts at just $1,600. The G1 humanoid, capable of performing complex industrial tasks, begins at $16,000—a fraction of competing humanoid platforms.',
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
          text: 'This pricing strategy isn\'t accidental. Founded in Hangzhou in 2016, Unitree has consistently pursued a vision of making high-performance robotics accessible to researchers, small businesses, and eventually consumers. The company was the first in the world to publicly retail high-performance quadruped robots, and has led global sales volume ever since.',
        },
      ],
    },
    // Quote Box
    {
      _type: 'quoteBox',
      _key: 'quote1',
      quote: 'Within the next year or two, robots will acquire generalized capabilities for both commercial and household applications, such as tidying rooms and delivering items.',
      author: 'Wang Xingxing, Founder & CEO, Unitree Robotics',
    },
    // Section 2
    {
      _type: 'block',
      _key: 'h2_2',
      style: 'h2',
      children: [{ _type: 'span', text: 'Manufacturing and Industrial Applications' }],
    },
    {
      _type: 'block',
      _key: 'h3_1',
      style: 'h3',
      children: [{ _type: 'span', text: 'The G1: An Affordable Industrial Partner' }],
    },
    {
      _type: 'block',
      _key: 'p3',
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: 'The Unitree G1 humanoid robot represents a significant leap in accessible industrial automation. Standing 127cm tall and weighing 35kg, this compact humanoid offers 23 to 43 degrees of freedom depending on configuration, enabling human-like movements and manipulation capabilities.',
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
          text: 'What makes the G1 particularly compelling for manufacturing environments is its force-controlled dexterous hand system, called Dex3-1. This three-fingered gripper with force-position hybrid control can simulate human-like movements, making it adept at handling delicate objects and executing intricate assembly tasks.',
        },
      ],
    },
    {
      _type: 'block',
      _key: 'p5',
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: 'The G1\'s AI-driven capabilities enable continuous learning and adaptation. Powered by an 8-core high-performance CPU with optional NVIDIA Jetson Orin computing (delivering 100 TOPS of AI processing), the robot can analyze data, adapt to new situations, and improve performance over time.',
        },
      ],
    },
    // Highlight Box - Industrial Applications
    {
      _type: 'highlightBox',
      _key: 'highlight1',
      title: 'Key Industrial Applications',
      items: [
        'Assembly Line Work: Works alongside human employees, handling repetitive tasks with precision and speed',
        'Quality Control: Advanced vision systems enable product inspection and defect detection',
        'Material Handling: Payload capacities up to 3kg per arm support light manufacturing tasks',
        'Hazardous Environments: Robots operate in conditions too dangerous for human workers',
      ],
    },
    {
      _type: 'block',
      _key: 'h3_2',
      style: 'h3',
      children: [{ _type: 'span', text: 'The B2-W: Heavy-Duty Industrial Quadruped' }],
    },
    {
      _type: 'block',
      _key: 'p6',
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: 'For applications requiring greater payload capacity and endurance, the B2-W wheeled-leg robot offers remarkable specifications: a 100kg payload capacity and 20km range on a single charge. This hybrid mobility system combines the stability of legs with the speed of wheels, enabling operation across diverse industrial environments.',
        },
      ],
    },
    // Section 3
    {
      _type: 'block',
      _key: 'h2_3',
      style: 'h2',
      children: [{ _type: 'span', text: 'Agriculture: Robots in the Fields' }],
    },
    {
      _type: 'block',
      _key: 'p7',
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: 'As rural labor forces age globally, robotics offers a compelling solution for sustainable agriculture. In July 2025, Unitree partnered with leading agricultural research institutions to deploy Go2 robots in farming environments—marking a significant step toward intelligent agricultural operations.',
        },
      ],
    },
    {
      _type: 'block',
      _key: 'h3_3',
      style: 'h3',
      children: [{ _type: 'span', text: 'Smart Farming with Go2' }],
    },
    {
      _type: 'block',
      _key: 'p8',
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: 'The Go2 quadruped, equipped with specialized agricultural sensors and custom AI vision systems, can monitor seedling growth in real-time and assist with data-driven decision-making. This application addresses a critical challenge: agricultural environments pose high technical barriers due to unpredictable lighting conditions and constantly changing crop appearances.',
        },
      ],
    },
    {
      _type: 'block',
      _key: 'p9',
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: 'Starting at just $1,600, the Go2 offers an ideal smart terminal platform for agriculture, thanks to its high cost-effectiveness, stable performance, and strong scalability.',
        },
      ],
    },
    // Feature Grid - Agriculture
    {
      _type: 'featureGrid',
      _key: 'features1',
      features: [
        { icon: '🌱', title: 'Real-Time Crop Monitoring', description: 'AI-powered edge computing enables instant analysis and identification of plant conditions across entire fields.' },
        { icon: '📊', title: 'High-Frequency Data Collection', description: 'Robots gather multi-dimensional field data that would be impractical for human workers to collect manually.' },
        { icon: '🔗', title: 'Centralized Data Integration', description: 'Information feeds into agricultural big data platforms that suggest targeted planting strategies.' },
        { icon: '🏃', title: 'Terrain Navigation', description: 'Quadruped locomotion traverses uneven farmland without compacting soil like wheeled vehicles.' },
      ],
    },
    {
      _type: 'block',
      _key: 'p10',
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: 'By lowering technical barriers to advanced farm management, these robotic systems aim to attract younger generations to agriculture as "robot managers"—a new generation of smart farmers who leverage technology rather than performing backbreaking manual labor.',
        },
      ],
    },
    // Section 4
    {
      _type: 'block',
      _key: 'h2_4',
      style: 'h2',
      children: [{ _type: 'span', text: 'Search and Rescue: Robots Saving Lives' }],
    },
    {
      _type: 'block',
      _key: 'p11',
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: 'Perhaps no application demonstrates the humanitarian potential of advanced robotics more clearly than search and rescue operations. Unitree\'s quadruped robots can enter areas unsafe for humans—collapsed buildings, gas leaks, radiation zones—to map environments and locate survivors.',
        },
      ],
    },
    // Highlight Box - Emergency Response
    {
      _type: 'highlightBox',
      _key: 'highlight2',
      title: 'Emergency Response Capabilities',
      items: [
        'All-Terrain Mobility: Navigate complex terrain including stairs, rock piles, and steep slopes',
        'Environmental Sensing: Infrared scanning and 3D mapping provide detailed situational awareness',
        'Payload Capacity: Transport essential supplies or communication equipment into disaster zones',
        'Weather Resistance: IP68 rating ensures operation in wet or dusty conditions',
        'Extended Range: B2-W\'s 20km range enables large-scale disaster response operations',
      ],
    },
    {
      _type: 'block',
      _key: 'p12',
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: 'During recent conflicts, Unitree Go2 robots have been deployed by security companies to explore inside buildings and trenches—locations where drones cannot reach. These robot dogs, equipped with thermal-infrared cameras, can carry supplies, ammunition, or robotic arms for tasks like opening doors.',
        },
      ],
    },
    // Section 5
    {
      _type: 'block',
      _key: 'h2_5',
      style: 'h2',
      children: [{ _type: 'span', text: 'Healthcare and Elder Care: The Caring Machines' }],
    },
    {
      _type: 'block',
      _key: 'p13',
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: 'As populations age globally, the demand for healthcare assistance continues to outpace available human caregivers. Robotics offers potential solutions, and Unitree\'s platforms are being explored for various healthcare applications.',
        },
      ],
    },
    {
      _type: 'block',
      _key: 'h3_4',
      style: 'h3',
      children: [{ _type: 'span', text: 'Mobility Assistance and Monitoring' }],
    },
    {
      _type: 'block',
      _key: 'p14',
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: 'The Go1 and Go2 platforms show potential as mobility assistants for elderly individuals, helping with home tasks or delivering small items. Their ability to walk alongside humans—rather than following behind—creates more natural interaction patterns while maintaining safety.',
        },
      ],
    },
    {
      _type: 'block',
      _key: 'p15',
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: 'The AlienGo platform, designed with advanced sensors including cameras and IMUs, can navigate complex healthcare environments autonomously. Potential applications include delivering medical supplies, monitoring patient health, and detecting falls through gesture recognition.',
        },
      ],
    },
    // Feature Grid - Healthcare
    {
      _type: 'featureGrid',
      _key: 'features2',
      features: [
        { icon: '🏥', title: 'Hospital Delivery', description: 'Transport supplies and medications within healthcare facilities efficiently and reliably.' },
        { icon: '👴', title: 'Elderly Monitoring', description: 'Provide companionship and health monitoring for individuals living independently.' },
        { icon: '🩺', title: 'Physical Therapy', description: 'Assist with rehabilitation exercises and provide consistent therapy support.' },
        { icon: '⚠️', title: 'Fall Detection', description: 'Advanced sensors detect emergencies and alert caregivers or emergency services.' },
      ],
    },
    // Section 6
    {
      _type: 'block',
      _key: 'h2_6',
      style: 'h2',
      children: [{ _type: 'span', text: 'Entertainment and Cultural Impact' }],
    },
    {
      _type: 'block',
      _key: 'p16',
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: 'Unitree\'s robots have captured public imagination through spectacular performances. The 2025 Spring Festival Gala featured 16 robots performing synchronized Yangko folk dance—wowing over a billion viewers with their coordinated movements while dressed in traditional floral-patterned cotton jackets and spinning red handkerchiefs.',
        },
      ],
    },
    {
      _type: 'block',
      _key: 'p17',
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: 'More recently, six G1 humanoid robots performed Webster flips alongside singer Wang Leehom at his Chengdu concert in December 2024. This collaboration demonstrated a level of motion control and coordination rarely seen in live performance settings.',
        },
      ],
    },
    // Quote Box
    {
      _type: 'quoteBox',
      _key: 'quote2',
      quote: 'Before achieving the ultimate goal of integrating humanoids into daily work and life, these performances serve dual purposes—showcasing genuine technological progress while generating interim commercial value.',
      author: 'Wang Xingxing on entertainment applications',
    },
    // Section 7
    {
      _type: 'block',
      _key: 'h2_7',
      style: 'h2',
      children: [{ _type: 'span', text: 'Research and Education' }],
    },
    {
      _type: 'block',
      _key: 'p18',
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: 'Beyond practical applications, Unitree robots serve as powerful tools for robotics education and research. The company\'s platforms are used by universities worldwide for developing and testing new AI algorithms, control systems, and human-robot interaction paradigms.',
        },
      ],
    },
    {
      _type: 'block',
      _key: 'p19',
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: 'The G1 humanoid, with its support for Python, C++, and ROS2, provides an ideal platform for AI and robotics curriculum development. Research applications span reinforcement learning, computer vision, humanoid locomotion, and manipulation research. The R1, recognized by TIME Magazine as one of the Best Inventions of 2025, offers an even more accessible entry point at just $4,900.',
        },
      ],
    },
    // Section 8
    {
      _type: 'block',
      _key: 'h2_8',
      style: 'h2',
      children: [{ _type: 'span', text: 'The Road Ahead: Challenges and Opportunities' }],
    },
    {
      _type: 'block',
      _key: 'p20',
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: 'While Unitree\'s achievements are impressive, significant challenges remain before robots become truly ubiquitous. Battery life remains a limiting factor—most platforms offer 1-2 hours of continuous operation. The G1-D wheeled humanoid addresses this partially with up to 6 hours of operation, but further improvements are needed for many practical applications.',
        },
      ],
    },
    {
      _type: 'block',
      _key: 'p21',
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: 'Despite these challenges, the market opportunity is substantial. Morgan Stanley forecasts China\'s humanoid robot market will grow to 6 trillion yuan (approximately $837 billion) by 2050, with the total number of humanoid robots reaching 59 million.',
        },
      ],
    },
    // Product Table Section
    {
      _type: 'block',
      _key: 'h2_9',
      style: 'h2',
      children: [{ _type: 'span', text: 'Product Overview: Current Unitree Robot Lineup' }],
    },
    {
      _type: 'infoTable',
      _key: 'table1',
      headers: ['Model', 'Type', 'Starting Price', 'Key Applications'],
      rows: [
        { cells: ['Go2', 'Quadruped', '$1,600', 'Consumer, agriculture, education'] },
        { cells: ['Go2-W', 'Wheeled quadruped', 'TBD', 'Enhanced mobility applications'] },
        { cells: ['B1', 'Industrial quadruped', '~$15,000', 'Security, rescue, research'] },
        { cells: ['B2', 'Industrial quadruped', '~$60,000', 'Industrial inspection, heavy-duty'] },
        { cells: ['B2-W', 'Wheeled industrial quadruped', '~$90,000', 'Logistics, construction'] },
        { cells: ['G1', 'Humanoid', '$16,000', 'Research, light industrial, education'] },
        { cells: ['R1', 'Humanoid', '$4,900', 'Research, education, development'] },
        { cells: ['H1', 'Full-size humanoid', '~$90,000', 'Research, industrial'] },
      ],
    },
    // CTA Box
    {
      _type: 'ctaBox',
      _key: 'cta1',
      title: 'The Future of Robotics Is Here',
      description: 'From factory floors where humanoid robots work alongside humans, to agricultural fields where quadrupeds monitor crop health, to disaster zones where robot dogs search for survivors—Unitree\'s machines are beginning to address real human needs. For industries considering robotic adoption, the time to explore these technologies is now.',
    },
    // Conclusion
    {
      _type: 'block',
      _key: 'p22',
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: 'The robotics revolution is no longer a distant vision of the future—it\'s happening now, one affordable robot at a time. As Unitree continues to push the boundaries of what\'s possible while keeping prices accessible, we\'re witnessing the democratization of a technology that will reshape industries, create new opportunities, and ultimately transform how humanity works and lives.',
        },
      ],
    },
  ],
}

async function importArticle() {
  try {
    console.log('Creating article in Sanity...')
    const result = await client.create(articleData)
    console.log('Article created successfully!')
    console.log('Article ID:', result._id)
    console.log('Slug:', result.slug.current)
    console.log('\nView at: https://megarobotics.de/articles/' + result.slug.current)
  } catch (error) {
    console.error('Error creating article:', error)
  }
}

importArticle()

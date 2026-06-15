import type { SkillIconName } from './iconRegistry';

export interface HeroCta {
  label: string;
  href: string;
  download?: boolean;
  external?: boolean;
}

export interface HeroIntroData {
  eyebrow: string;
  title: string;
  lead: string;
  summary: string;
  availability: string;
  statusChips: string[];
  ctas: HeroCta[];
}

export interface LatestItem {
  title: string;
  category: string;
  status: string;
  timeframe: string;
  summary: string;
  projectSlug?: string;
  href?: string;
  tags?: string[];
}

export interface TimelineEntry {
  title: string;
  organization: string;
  track: 'work' | 'education';
  timeframe: string;
  location?: string;
  summary: string;
  highlights: string[];
}

export interface SkillRelatedEntry {
  label: string;
  type: 'work' | 'project' | 'education';
  href?: string;
}

export interface SkillItem {
  id: string;
  label: string;
  icon?: SkillIconName;
  description: string;
  related: SkillRelatedEntry[];
}

export interface SkillGroup {
  title: string;
  items: SkillItem[];
}

export interface Credential {
  name: string;
  issuer: string;
  credentialId?: string;
  issued?: string;
  url?: string;
  type?: string;
}

// Edit homepage content here. Projects still live in src/content/projects/* for case studies.
export const heroIntro: HeroIntroData = {
  eyebrow: 'About / Intro',
  title: 'Aldrick Tadeo',
  lead: 'Robotics and Digital Systems Engineer',
  summary:
    'I work across software, robotics, and digital systems with a focus on dependable tooling, applied AI, and real-world operational constraints.',
  availability: 'Open to software, robotics, and systems engineering opportunities',
  statusChips: [
    'GE Aerospace internship',
    'Robosoft 2026 build cycle',
    'Telemetry and observability systems'
  ],
  ctas: [
    { label: 'View Portfolio', href: '/portfolio' },
    { label: 'Open CV', href: '/cv' }
  ]
};

// Edit the Latest cards here. projectSlug links to /portfolio/[slug].
export const latestItems: LatestItem[] = [
  {
    title: 'Software Engineer Intern',
    category: 'Work',
    status: 'Current',
    timeframe: 'Nov 2025 - Present',
    summary:
      'Designing telemetry infrastructure and NX-integrated tooling for internal CAD/CAE and PLM workflows at GE Aerospace.',
    tags: ['C#/.NET', 'PostgreSQL', 'Grafana', 'Telemetry']
  },
  {
    title: 'B.S. Robotics and Digital Systems Engineering',
    category: 'Academic',
    status: 'In progress',
    timeframe: 'ITESM · 2022 - 2026',
    summary:
      'Completing a scholarship-backed engineering degree focused on robotics, embedded systems, machine learning, and digital product delivery.',
    tags: ['Academic Excellence Scholarship', 'Robotics', 'AI']
  },
  {
    title: 'IEEE Robosoft Competition 2026',
    category: 'Project',
    status: 'Active build',
    timeframe: 'Aug 2025 - Present',
    summary:
      'Leading robotic design and software work for strawberry harvesting with soft robotics, RGB-D localization, and AI vision.',
    tags: ['Soft Robotics', 'Computer Vision', 'IoT']
  },
  {
    title: 'CI/CD Reliability Initiative',
    category: 'Portfolio',
    status: 'Featured case study',
    timeframe: 'Oct 2024 - Present',
    summary:
      'Refined delivery workflows around deterministic builds, reusable pipelines, and deployment guardrails.',
    projectSlug: 'cicd-reliability',
    tags: ['GitHub Actions', 'Terraform', 'AWS']
  }
];

// Edit work and education timeline items here. The homepage renders these into separate lanes.
export const timelineEntries: TimelineEntry[] = [
  {
    title: 'Software Engineer Intern',
    organization: 'GE Aerospace',
    track: 'work',
    timeframe: 'Nov 2025 - Present',
    summary:
      'Building telemetry products for internal engineering toolchains with a strong focus on adoption visibility and workflow instrumentation.',
    highlights: [
      'Defined usage-event models and PostgreSQL schemas for engineering tooling.',
      'Integrated telemetry through C#/.NET services and NX Open plugins.',
      'Built Grafana dashboards for reliability and adoption analysis.'
    ]
  },
  {
    title: 'Telemetry Development Division Lead & Founder',
    organization: 'Electrum Performance Racing Team',
    track: 'work',
    timeframe: 'Jun 2024 - Oct 2025',
    summary:
      'Founded and led the telemetry division, shipping resilient data-acquisition and firmware systems for high-stress racing environments.',
    highlights: [
      'Reduced transmission failures through failsafe serial telemetry architecture.',
      'Improved cross-team CAD workflows with shared versioning practices.',
      'Drove system cost reductions without compromising reliability.'
    ]
  },
  {
    title: 'B.S. Robotics and Digital Systems Engineering',
    organization: 'Monterrey Institute of Technology and Higher Education (ITESM)',
    track: 'education',
    timeframe: '2022 - 2026',
    summary:
      'Robotics and systems engineering program blending software, machine intelligence, control, electronics, and product execution.',
    highlights: [
      'Maintaining a 4.0/4.0 GPA.',
      'Academic Excellence Scholarship recipient.',
      'Applied work spanning robotics, autonomy, and digital systems.'
    ]
  },
  {
    title: 'Technical Degree in Mechatronics',
    organization: 'CBTis #118 Technical High School',
    track: 'education',
    timeframe: '2019 - 2022',
    summary:
      'Technical foundation in mechatronics, electronics, CAD, and multidisciplinary engineering problem solving.',
    highlights: [
      'Graduated with a 4.0/4.0 GPA.',
      'Developed early experience across mechanical and electrical systems.'
    ]
  }
];

// Add, remove, or regroup skills here. Icons fall back to text when no local SVG is defined.
export const skillGroups: SkillGroup[] = [
  {
    title: 'Programming',
    items: [
      {
        id: 'python',
        label: 'Python',
        icon: 'python',
        description:
          'Used for machine learning workflows, data processing, computer vision prototypes, and robotics support tooling.',
        related: [
          { label: 'IEEE Robosoft competition systems', type: 'project' },
          { label: 'Manchester Robotics autonomy work', type: 'education' }
        ]
      },
      {
        id: 'cpp',
        label: 'C/C++',
        icon: 'cpp',
        description:
          'Used for performance-sensitive robotics, embedded, and systems programming where control over execution matters.',
        related: [
          { label: 'Puzzlebot autonomy stack', type: 'education' },
          { label: 'Telemetry system firmware work', type: 'work' }
        ]
      },
      {
        id: 'csharp',
        label: 'C# / .NET',
        icon: 'csharp',
        description:
          'Applied in internal engineering tooling, workflow integrations, and telemetry services around CAD/PLM environments.',
        related: [{ label: 'GE Aerospace telemetry framework', type: 'work' }]
      },
      {
        id: 'javascript',
        label: 'JavaScript / TypeScript',
        icon: 'typescript',
        description:
          'Used for delivery automation, web interfaces, and site or internal tooling where clarity and maintainability matter.',
        related: [
          { label: 'Internal Developer Portal', type: 'project', href: '/portfolio/developer-portal' },
          { label: 'This Astro portfolio', type: 'project', href: '/portfolio' }
        ]
      },
      {
        id: 'matlab',
        label: 'MATLAB',
        icon: 'matlab',
        description:
          'Applied for engineering analysis, modeling, and rapid exploration in academic and systems contexts.',
        related: [{ label: 'Robotics coursework and modeling', type: 'education' }]
      },
      {
        id: 'vhdl',
        label: 'VHDL',
        icon: 'vhdl',
        description:
          'Used for digital systems understanding and hardware-oriented academic work where low-level logic matters.',
        related: [{ label: 'Digital systems engineering coursework', type: 'education' }]
      }
    ]
  },
  {
    title: 'Frameworks & Libraries',
    items: [
      {
        id: 'ros2',
        label: 'ROS2',
        icon: 'ros2',
        description:
          'Used to structure robotic systems, node communication, and sensor integration in autonomy projects.',
        related: [
          { label: 'Manchester Robotics & Tec de Monterrey', type: 'education' },
          { label: 'IEEE Robosoft competition systems', type: 'project' }
        ]
      },
      {
        id: 'opencv',
        label: 'OpenCV',
        icon: 'opencv',
        description:
          'Applied for image-processing, perception, and computer-vision experimentation in robotics and AI workflows.',
        related: [
          { label: 'OpenCV Bootcamp credential', type: 'education' },
          { label: 'Strawberry classification system', type: 'project' }
        ]
      },
      {
        id: 'astro',
        label: 'Astro',
        icon: 'astro',
        description:
          'Used for static web delivery, component composition, and performant content-driven interfaces.',
        related: [
          { label: 'Internal Developer Portal', type: 'project', href: '/portfolio/developer-portal' }
        ]
      },
      {
        id: 'otel',
        label: 'OpenTelemetry',
        icon: 'otel',
        description:
          'Used to standardize instrumentation and connect traces, metrics, and observability data into operational workflows.',
        related: [
          {
            label: 'Platform Observability Upgrade',
            type: 'project',
            href: '/portfolio/platform-observability'
          }
        ]
      }
    ]
  },
  {
    title: 'Platforms & DevOps',
    items: [
      {
        id: 'linux',
        label: 'Linux',
        icon: 'linux',
        description:
          'Core operating environment for robotics, development tooling, deployment workflows, and systems debugging.',
        related: [
          { label: 'Robotics development environments', type: 'education' },
          { label: 'CI/CD reliability work', type: 'project', href: '/portfolio/cicd-reliability' }
        ]
      },
      {
        id: 'docker',
        label: 'Docker',
        icon: 'docker',
        description:
          'Used to make development environments and delivery pipelines more predictable across teams and systems.',
        related: [
          { label: 'CI/CD Reliability Initiative', type: 'project', href: '/portfolio/cicd-reliability' }
        ]
      },
      {
        id: 'github-actions',
        label: 'GitHub Actions',
        icon: 'github-actions',
        description:
          'Used to automate builds, validation, and deployment workflows with reusable pipeline conventions.',
        related: [
          { label: 'CI/CD Reliability Initiative', type: 'project', href: '/portfolio/cicd-reliability' },
          { label: 'Internal Developer Portal', type: 'project', href: '/portfolio/developer-portal' }
        ]
      },
      {
        id: 'postgres',
        label: 'PostgreSQL',
        icon: 'postgres',
        description:
          'Used for telemetry and metadata backends where reliable structure and queryability are central.',
        related: [
          { label: 'GE Aerospace telemetry platform', type: 'work' },
          { label: 'Internal Developer Portal', type: 'project', href: '/portfolio/developer-portal' }
        ]
      },
      {
        id: 'grafana',
        label: 'Grafana',
        icon: 'grafana',
        description:
          'Used to surface usage telemetry, adoption, bottlenecks, and reliability patterns to engineering stakeholders.',
        related: [
          { label: 'GE Aerospace dashboards', type: 'work' },
          {
            label: 'Platform Observability Upgrade',
            type: 'project',
            href: '/portfolio/platform-observability'
          }
        ]
      }
    ]
  },
  {
    title: 'CAD / CAE',
    items: [
      {
        id: 'solidworks',
        label: 'SolidWorks',
        icon: 'solidworks',
        description:
          'Used for mechanical design, prototyping, and engineering iteration on robotics and mechatronics work.',
        related: [{ label: 'Electrum vehicle systems', type: 'work' }]
      },
      {
        id: 'fusion',
        label: 'Autodesk Fusion',
        icon: 'fusion',
        description:
          'Used to accelerate collaborative design iteration and manufacturing-oriented workflows.',
        related: [{ label: 'Electrum collaborative CAD process', type: 'work' }]
      },
      {
        id: 'kicad',
        label: 'KiCad',
        icon: 'kicad',
        description:
          'Used for electronics and PCB-oriented work where hardware design needs to stay close to system requirements.',
        related: [{ label: 'Robotics and embedded hardware projects', type: 'education' }]
      },
      {
        id: 'nx',
        label: 'Siemens NX',
        icon: 'nx',
        description:
          'Used around internal engineering tooling, CAE workflows, and plugin development in production contexts.',
        related: [{ label: 'GE Aerospace NX Open integrations', type: 'work' }]
      },
      {
        id: 'autocad',
        label: 'AutoCAD',
        icon: 'autocad',
        description:
          'Used as part of multidisciplinary engineering drafting and design workflows during technical training.',
        related: [{ label: 'Technical mechatronics education', type: 'education' }]
      }
    ]
  }
];

// Edit course and certification cards here.
export const credentials: Credential[] = [
  {
    name: 'Fundamentals of Deep Learning',
    issuer: 'NVIDIA',
    credentialId: '1tO0Ys3ITkGJkXM3sgBKrQ',
    type: 'Course'
  },
  {
    name: 'Generative AI with Diffusion Models',
    issuer: 'NVIDIA',
    credentialId: 'TauXuWfURMOBYNutOVkopw',
    type: 'Course'
  },
  {
    name: 'OpenCV Bootcamp',
    issuer: 'OpenCV University',
    credentialId: '65a25e083f50497dba5f5538026087',
    type: 'Bootcamp'
  },
  {
    name: 'UR e-Series Tracks (Core, Pro, Application)',
    issuer: 'Universal Robots',
    type: 'Certification Track'
  }
];

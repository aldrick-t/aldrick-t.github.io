const email = 'aldricktadeo@gmail.com';
const githubUrl = 'https://github.com/aldrick-t';
const linkedinUrl = 'https://www.linkedin.com/in/aldrick-t/';

export const siteConfig = {
  name: 'Aldrick Tadeo',
  fullName: 'Aldrick Victor Tadeo Arellano',
  title: 'B.S. Robotics and Digital Systems Engineering',
  description:
    'Robotics and digital systems engineer working across autonomous systems, perception, embedded software, and engineering tooling.',
  introduction:
    'Building dependable robotic and software systems, from perception and autonomy to telemetry, data and engineering tools. My work focuses on systems that transfer cleanly from prototypes and simulation into real operating environments.',
  availability: 'Open to robotics, software, research, and graduate study opportunities.',
  location: 'Mexico',
  email,
  githubUrl,
  linkedinUrl,
  portfolioRoute: '/portfolio',
  cvRoute: '/cv',
  contactLinks: [
    { label: 'LinkedIn', href: linkedinUrl, external: true, mail: false, icon: 'linkedin' },
    { label: 'GitHub', href: githubUrl, external: true, mail: false, icon: 'github' },
    { label: 'Email', href: `mailto:${email}`, external: false, mail: true, icon: 'email' }
  ],
  researchInterests: [
    'Sim-to-real robotics and digital twins',
    'Autonomous robotics',
    'Simulation and modeling of robotic systems',
    'SLAM, perception, and sensor fusion',
    'Embodied AI and field robotics',
    'Soft robotics and compliant mechanisms',
  ],
  languages: [
    { language: 'English', proficiency: 'Native proficiency', detail: 'IELTS 8.5 · C2' },
    { language: 'Spanish', proficiency: 'Native proficiency' },
    { language: 'Japanese', proficiency: 'Elementary proficiency' }
  ]
} as const;

export type SiteConfig = typeof siteConfig;

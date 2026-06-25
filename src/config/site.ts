export const siteConfig = {
  name: 'Aldrick Tadeo',
  fullName: 'Aldrick Victor Tadeo Arellano',
  title: 'Robotics and Digital Systems Engineer',
  description:
    'Robotics and digital systems engineer working across autonomous systems, perception, embedded software, and engineering tooling.',
  introduction:
    'I build dependable robotic and software systems, from perception and autonomy to telemetry and engineering tools. My work focuses on systems that transfer cleanly from prototypes and simulation into real operating environments.',
  availability: 'Open to robotics, software, research, and graduate study opportunities.',
  location: 'Mexico',
  email: 'aldricktadeo@gmail.com',
  githubUrl: 'https://github.com/aldrick-t',
  linkedinUrl: 'https://www.linkedin.com/in/aldrick-t/',
  cvRoute: '/cv',
  researchInterests: [
    'Sim-to-real robotics and digital twins',
    'SLAM, perception, and sensor fusion',
    'Embodied AI and field robotics',
    'Soft robotic manipulation'
  ],
  languages: [
    { language: 'English', proficiency: 'Native proficiency', detail: 'IELTS 8.5 · C2' },
    { language: 'Spanish', proficiency: 'Native proficiency' },
    { language: 'Japanese', proficiency: 'Elementary proficiency' }
  ]
} as const;

export type SiteConfig = typeof siteConfig;

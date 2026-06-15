export const siteConfig = {
  name: 'Aldrick Tadeo',
  tagline: 'Robotics and Digital Systems Engineer',
  email: 'aldricktadeo@gmail.com',
  contact: {
    primaryEmail: 'aldricktadeo@gmail.com',
    academicEmail: 'a01710105@tec.mx',
    phone: '+1 (702) 624-4515'
  },
  githubUrl: 'https://github.com/aldrick-t',
  linkedinUrl: 'https://www.linkedin.com/in/aldrick-t/',
  cvRoute: '/cv'
} as const;

export type SiteConfig = typeof siteConfig;

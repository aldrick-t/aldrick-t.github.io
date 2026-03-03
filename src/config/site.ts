export const siteConfig = {
  name: 'Aldrick Tadeo',
  tagline: 'Engineering systems with practical rigor, thoughtful UX, and measurable outcomes.',
  email: 'aldrick.tadeo@example.com',
  githubUrl: 'https://github.com/aldrick-t',
  linkedinUrl: 'https://www.linkedin.com/in/aldrick-t/',
  cvPdfPath: '/cv/aldrick_tadeo_cv.pdf',
  socialBadgeConfig: {
    locale: 'en_US',
    vanity: 'aldrick-tadeo',
    size: 'large'
  }
} as const;

export type SiteConfig = typeof siteConfig;

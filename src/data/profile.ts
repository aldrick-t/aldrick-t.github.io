import { siteConfig } from '../config/site';

export const profile = siteConfig;

export const landingSections = [
  { id: 'intro', label: 'Intro' },
  { id: 'featured', label: 'Featured' },
  { id: 'news', label: 'News' },
  { id: 'skills', label: 'Skills' },
  { id: 'languages', label: 'Languages' },
  { id: 'credentials', label: 'Courses & certifications' }
] as const;

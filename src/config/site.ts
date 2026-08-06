import { siteLocalConfig } from './site.local';

// This adapter is template-owned. Personal data lives in site.local.ts, which
// is intentionally excluded from template-release synchronization.
export const siteConfig = siteLocalConfig;

export type SiteConfig = typeof siteConfig;

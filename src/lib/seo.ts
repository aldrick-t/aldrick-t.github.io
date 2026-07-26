import { siteConfig } from '../config/site';
import { getSkillLabel } from './items';
import { languageMeta, ui, type Language } from './i18n';
import type { ItemEntry } from './items';
import type { LocalizedNewsEntry } from './news';

export type JsonLd = Record<string, unknown>;

type Breadcrumb = { name: string; url: string };
type CollectionEntryLink = { name: string; url: string };

const personId = (url: string) => `${url}#person`;

export function buildProfileSchema(url: string, language: Language): JsonLd {
  const profileUrl = new URL(url).toString();
  const identityUrl = new URL('/', profileUrl).toString();
  const id = personId(identityUrl);

  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    url: profileUrl,
    inLanguage: languageMeta[language].htmlLang,
    mainEntity: {
      '@type': 'Person',
      '@id': id,
      name: siteConfig.name,
      alternateName: siteConfig.fullName,
      jobTitle: siteConfig.title,
      description: ui[language].site.description,
      url: identityUrl,
      sameAs: [siteConfig.githubUrl, siteConfig.linkedinUrl],
      knowsAbout: siteConfig.researchInterests
    }
  };
}

export function buildBreadcrumbSchema(items: Breadcrumb[], language: Language): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    inLanguage: languageMeta[language].htmlLang,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };
}

export function buildCollectionSchema(
  url: string,
  name: string,
  description: string,
  entries: CollectionEntryLink[],
  language: Language
): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': url,
    url,
    name,
    description,
    inLanguage: languageMeta[language].htmlLang,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: entries.length,
      itemListElement: entries.map((entry, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: entry.name,
        url: entry.url
      }))
    }
  };
}

export function buildItemSchema(item: ItemEntry, url: string, language: Language): JsonLd {
  const tags = item.data.tags ?? [];
  const skills = (item.data.skills ?? []).map((skill) => getSkillLabel(skill, language));
  const sameAs = (item.data.links ?? []).map((link) => link.url).filter((link) => /^https?:\/\//.test(link));

  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    '@id': url,
    url,
    inLanguage: languageMeta[language].htmlLang,
    name: item.data.title,
    headline: item.data.title,
    description: item.data.summary,
    author: { '@id': personId(new URL('/', url).toString()) },
    keywords: [...tags, ...skills],
    sameAs: sameAs.length ? sameAs : undefined,
    image: item.data.thumbnail ? new URL(item.data.thumbnail.path, url).toString() : undefined
  };
}

export function buildNewsSchema(item: LocalizedNewsEntry, url: string, language: Language): JsonLd {
  const exactDate = /^\d{4}-\d{2}-\d{2}$/.test(item.data.datePosted) ? item.data.datePosted : undefined;

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': url,
    url,
    inLanguage: languageMeta[language].htmlLang,
    headline: item.data.title,
    description: item.data.summary,
    author: { '@id': personId(new URL('/', url).toString()) },
    mainEntityOfPage: { '@id': url },
    datePublished: exactDate,
    articleSection: ui[language].newsPage.title,
    image: new URL(siteConfig.socialImage, url).toString()
  };
}

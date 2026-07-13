import { getCollection, type CollectionEntry } from 'astro:content';
import { formatDate, type Language } from './i18n';

export type NewsEntry = CollectionEntry<'news'>;
export type NewsTranslationEntry = CollectionEntry<'newsTranslations'>;
export type NewsKind = NewsEntry['data']['newsKind'];
export type LocalizedNewsEntry = NewsEntry & {
  translation?: NewsTranslationEntry;
};

export function getNewsSlug(news: Pick<NewsEntry, 'id'> | string): string {
  const id = typeof news === 'string' ? news : news.id;
  return id.split('/').filter(Boolean).pop() ?? id;
}

export function newsMonthIndex(value: string): number {
  const [year, month] = value.split('-');
  return Number(year) * 12 + Number(month) - 1;
}

export function formatPostedDate(news: Pick<NewsEntry, 'data'>, language: Language = 'en'): string {
  return formatDate(news.data.datePosted, language);
}

export function sortNews(items: NewsEntry[]): NewsEntry[] {
  return [...items].sort((a, b) => {
    const dateDifference = newsMonthIndex(b.data.datePosted) - newsMonthIndex(a.data.datePosted);
    return dateDifference || Number(b.data.newsKind === 'post') - Number(a.data.newsKind === 'post') || a.data.title.localeCompare(b.data.title);
  });
}

export function getRelatedNewsPosts(news: NewsEntry, allNews: NewsEntry[], limit = 3): NewsEntry[] {
  const newsBySlug = new Map(
    allNews
      .filter((candidate) => candidate.data.published && candidate.data.newsKind === 'post')
      .map((candidate) => [getNewsSlug(candidate), candidate])
  );
  const seen = new Set<string>([getNewsSlug(news)]);

  return (news.data.relations ?? [])
    .map((relation) => newsBySlug.get(relation.id))
    .filter((candidate): candidate is NewsEntry => {
      const slug = candidate ? getNewsSlug(candidate) : undefined;
      if (!candidate || !slug || seen.has(slug)) return false;
      seen.add(slug);
      return true;
    })
    .slice(0, limit);
}

export async function getPublishedNews(): Promise<NewsEntry[]> {
  const news = await getCollection('news');
  return sortNews(news.filter((entry) => entry.data.published));
}

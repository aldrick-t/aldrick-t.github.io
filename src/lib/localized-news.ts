import { getCollection } from 'astro:content';
import { defaultLanguage, type Language } from './i18n';
import { getNewsSlug, getPublishedNews, type LocalizedNewsEntry, type NewsEntry, type NewsTranslationEntry } from './news';

export async function getNewsTranslations(language: Language): Promise<Map<string, NewsTranslationEntry>> {
  if (language === defaultLanguage) return new Map();
  const translations = await getCollection('newsTranslations');
  return new Map(
    translations
      .filter((translation) => translation.id.startsWith(`${language}/`))
      .map((translation) => [translation.id.replace(`${language}/`, ''), translation])
  );
}

export function localizeNews(news: NewsEntry, translations: Map<string, NewsTranslationEntry>, language: Language): LocalizedNewsEntry {
  const translation = language === defaultLanguage ? undefined : translations.get(getNewsSlug(news));
  if (!translation) return news as LocalizedNewsEntry;

  return {
    ...news,
    data: {
      ...news.data,
      title: translation.data.title,
      summary: translation.data.summary
    },
    translation
  } as LocalizedNewsEntry;
}

export function localizeNewsItems(news: NewsEntry[], translations: Map<string, NewsTranslationEntry>, language: Language): LocalizedNewsEntry[] {
  return news.map((entry) => localizeNews(entry, translations, language));
}

export async function getPublishedLocalizedNews(language: Language): Promise<LocalizedNewsEntry[]> {
  const news = await getPublishedNews();
  const translations = await getNewsTranslations(language);
  return localizeNewsItems(news, translations, language);
}

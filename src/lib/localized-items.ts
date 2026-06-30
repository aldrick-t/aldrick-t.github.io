import { getCollection, type CollectionEntry } from 'astro:content';
import type { Language } from './i18n';
import { defaultLanguage } from './i18n';
import type { ItemEntry } from './items';

export type ItemTranslationEntry = CollectionEntry<'itemTranslations'>;
export type LocalizedItemEntry = ItemEntry & {
  data: ItemEntry['data'];
  translation?: ItemTranslationEntry;
};

export async function getItemTranslations(language: Language): Promise<Map<string, ItemTranslationEntry>> {
  if (language === defaultLanguage) return new Map();
  const translations = await getCollection('itemTranslations');
  return new Map(
    translations
      .filter((translation) => translation.id.startsWith(`${language}/`))
      .map((translation) => [translation.id.replace(`${language}/`, ''), translation])
  );
}

export function localizeItem(item: ItemEntry, translations: Map<string, ItemTranslationEntry>, language: Language): LocalizedItemEntry {
  const translation = language === defaultLanguage ? undefined : translations.get(item.id);
  if (!translation) return item as LocalizedItemEntry;

  const links = item.data.links ?? [];
  const translationLinks = translation.data.links ?? [];
  const highlights = item.data.highlights ?? [];
  const translationHighlights = translation.data.highlights ?? [];
  const tags = item.data.tags ?? [];
  const translationTags = translation.data.tags ?? [];
  const translatedLinks = links.map((link, index) => ({
    ...link,
    label: translationLinks[index]?.label ?? link.label
  }));

  return {
    ...item,
    data: {
      ...item.data,
      title: translation.data.title,
      summary: translation.data.summary,
      highlights: translationHighlights.length ? translationHighlights : highlights,
      tags: translationTags.length ? translationTags : tags,
      links: translatedLinks
    },
    translation
  } as LocalizedItemEntry;
}

export function localizeItems(items: ItemEntry[], translations: Map<string, ItemTranslationEntry>, language: Language): LocalizedItemEntry[] {
  return items.map((item) => localizeItem(item, translations, language));
}

export async function getPublishedLocalizedItems(language: Language, predicate: (item: ItemEntry) => boolean = () => true): Promise<LocalizedItemEntry[]> {
  const items = (await getCollection('items')).filter((item) => item.data.published && predicate(item));
  const translations = await getItemTranslations(language);
  return localizeItems(items, translations, language);
}

import type { CollectionEntry } from 'astro:content';
import { getLocalizedSkillLabel, skillMap } from '../data/skills';
import { formatDate as formatLocalizedDate, formatDateRange as formatLocalizedDateRange, getItemTypeLabels, type Language } from './i18n';
import { getYouTubeEmbedUrl } from './media';

export type ItemEntry = CollectionEntry<'items'>;
export type ItemType = ItemEntry['data']['type'];

export const itemTypeLabels: Record<ItemType, string> = getItemTypeLabels('en');

export const itemTypeOrder: ItemType[] = [
  'project',
  'work',
  'education',
  'publication',
  'conference',
  'award',
  'volunteering',
  'course',
  'certification'
];

const currentMonth = new Date().getFullYear() * 12 + new Date().getMonth();

export function getItemSlug(item: Pick<ItemEntry, 'id'> | string): string {
  const id = typeof item === 'string' ? item : item.id;
  return id.split('/').filter(Boolean).pop() ?? id;
}

export function monthIndex(value: string): number {
  if (value === 'Present') return currentMonth;
  const [year, month = '01'] = value.split('-');
  return Number(year) * 12 + Number(month) - 1;
}

export function formatDate(value: string, language: Language = 'en'): string {
  return formatLocalizedDate(value, language);
}

export function formatDateRange(item: ItemEntry, language: Language = 'en'): string {
  return formatLocalizedDateRange(item.data.dateStart, item.data.dateEnd, language);
}

export function sortItems(items: ItemEntry[]): ItemEntry[] {
  return [...items].sort((a, b) => {
    const endDifference = monthIndex(b.data.dateEnd) - monthIndex(a.data.dateEnd);
    return endDifference || monthIndex(b.data.dateStart) - monthIndex(a.data.dateStart) || a.data.title.localeCompare(b.data.title);
  });
}

function hasGalleryMedia(item: ItemEntry): boolean {
  const media = item.data.media ?? [];
  const assets = item.data.assets ?? [];
  const links = item.data.links ?? [];
  return Boolean(item.data.thumbnail || media.length || assets.length || links.some((link) => link.kind === 'video' && getYouTubeEmbedUrl(link.url)));
}

function baselineRelevanceDifference(a: ItemEntry, b: ItemEntry): number {
  const featuredDifference = (a.data.featuredRank ?? 999) - (b.data.featuredRank ?? 999);
  const typeDifference = itemTypeOrder.indexOf(a.data.type) - itemTypeOrder.indexOf(b.data.type);
  const mediaDifference = Number(hasGalleryMedia(b)) - Number(hasGalleryMedia(a));
  const latestDifference = monthIndex(b.data.dateEnd) - monthIndex(a.data.dateEnd);
  const startDifference = monthIndex(b.data.dateStart) - monthIndex(a.data.dateStart);
  return featuredDifference || typeDifference || mediaDifference || latestDifference || startDifference || a.data.title.localeCompare(b.data.title);
}

export function sortItemsByRelevance(items: ItemEntry[]): ItemEntry[] {
  return [...items].sort((a, b) => {
    const aRank = a.data.relevanceRank;
    const bRank = b.data.relevanceRank;
    if (aRank !== undefined && bRank !== undefined) return aRank - bRank || baselineRelevanceDifference(a, b);
    if (aRank !== undefined) return -1;
    if (bRank !== undefined) return 1;
    return baselineRelevanceDifference(a, b);
  });
}

export function groupItemsByType(items: ItemEntry[], language: Language = 'en') {
  const labels = getItemTypeLabels(language);
  return itemTypeOrder
    .map((type) => ({ type, label: labels[type], items: sortItems(items.filter((item) => item.data.type === type)) }))
    .filter((group) => group.items.length);
}

export function getSkillLabel(id: string, language: Language = 'en'): string {
  return getLocalizedSkillLabel(id, language) ?? skillMap.get(id)?.label ?? id;
}

export function getRelatedItems(item: ItemEntry, allItems: ItemEntry[], limit = 4): ItemEntry[] {
  const itemSkills = item.data.skills ?? [];
  const itemSlug = getItemSlug(item);
  const itemBySlug = new Map(allItems.filter((candidate) => candidate.data.published).map((candidate) => [getItemSlug(candidate), candidate]));
  const seenSlugs = new Set<string>([itemSlug]);
  const relatedItems = (item.data.relations ?? [])
    .map((relation) => itemBySlug.get(relation.id))
    .filter((candidate): candidate is ItemEntry => {
      const candidateSlug = candidate ? getItemSlug(candidate) : undefined;
      if (!candidate || !candidateSlug || seenSlugs.has(candidateSlug)) return false;
      seenSlugs.add(candidateSlug);
      return true;
    })
    .slice(0, limit);

  if (item.data.relatedFallback !== 'skills' || relatedItems.length >= limit) return relatedItems;

  const remaining = limit - relatedItems.length;
  const fallbackItems = allItems
    .filter((candidate) => getItemSlug(candidate) !== itemSlug && candidate.data.published)
    .map((candidate) => ({
      candidate,
      score: (candidate.data.skills ?? []).filter((skill) => itemSkills.includes(skill)).length
    }))
    .filter(({ candidate, score }) => score > 0 && !seenSlugs.has(getItemSlug(candidate)))
    .sort((a, b) => b.score - a.score || monthIndex(b.candidate.data.dateEnd) - monthIndex(a.candidate.data.dateEnd))
    .slice(0, remaining)
    .map(({ candidate }) => candidate);

  return [...relatedItems, ...fallbackItems];
}

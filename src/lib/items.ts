import type { CollectionEntry } from 'astro:content';
import { getLocalizedSkillLabel, skillMap } from '../data/skills';
import { formatDate as formatLocalizedDate, formatDateRange as formatLocalizedDateRange, getItemTypeLabels, type Language } from './i18n';

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
  'certification',
  'news'
];

const currentMonth = new Date().getFullYear() * 12 + new Date().getMonth();

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
  return Boolean(item.data.thumbnail || media.length || assets.length || links.some((link) => link.kind === 'video'));
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
  const explicitIds = new Set((item.data.relations ?? []).map((relation) => relation.id));
  return allItems
    .filter((candidate) => candidate.id !== item.id && candidate.data.published)
    .map((candidate) => ({
      candidate,
      score:
        (explicitIds.has(candidate.id) ? 100 : 0) +
        (candidate.data.skills ?? []).filter((skill) => itemSkills.includes(skill)).length
    }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score || monthIndex(b.candidate.data.dateEnd) - monthIndex(a.candidate.data.dateEnd))
    .slice(0, limit)
    .map(({ candidate }) => candidate);
}

export interface TimelinePlacement {
  item: ItemEntry;
  lane: number;
  rowStart: number;
  rowSpan: number;
  concurrent: ItemEntry[];
}

export function buildTimeline(items: ItemEntry[]) {
  const sorted = sortItems(items.filter((item) => item.data.timeline && item.data.published));
  const latest = Math.max(...sorted.map((item) => monthIndex(item.data.dateEnd)));
  const earliest = Math.min(...sorted.map((item) => monthIndex(item.data.dateStart)));
  const laneIntervals: Array<Array<[number, number]>> = [];

  const placements: TimelinePlacement[] = sorted.map((item) => {
    const start = monthIndex(item.data.dateStart);
    const end = monthIndex(item.data.dateEnd);
    let lane = laneIntervals.findIndex((intervals) => intervals.every(([otherStart, otherEnd]) => end < otherStart || start > otherEnd));
    if (lane === -1) {
      lane = laneIntervals.length;
      laneIntervals.push([]);
    }
    laneIntervals[lane].push([start, end]);
    const concurrent = sorted.filter((candidate) => {
      if (candidate.id === item.id) return false;
      const candidateStart = monthIndex(candidate.data.dateStart);
      const candidateEnd = monthIndex(candidate.data.dateEnd);
      return start <= candidateEnd && end >= candidateStart;
    });
    return {
      item,
      lane,
      rowStart: latest - end + 1,
      rowSpan: Math.max(end - start + 1, 1),
      concurrent
    };
  });

  const years = Array.from({ length: Math.floor(latest / 12) - Math.floor(earliest / 12) + 1 }, (_, index) => {
    const year = Math.floor(latest / 12) - index;
    const topMonth = Math.min(latest, year * 12 + 11);
    return { year, offset: latest - topMonth };
  });

  return {
    placements,
    laneCount: Math.max(laneIntervals.length, 1),
    totalMonths: latest - earliest + 1,
    years
  };
}

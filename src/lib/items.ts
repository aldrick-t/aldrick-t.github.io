import type { CollectionEntry } from 'astro:content';
import { skillMap } from '../data/skills';

export type ItemEntry = CollectionEntry<'items'>;
export type ItemType = ItemEntry['data']['type'];

export const itemTypeLabels: Record<ItemType, string> = {
  project: 'Projects',
  work: 'Work',
  education: 'Education',
  publication: 'Publications',
  conference: 'Conferences',
  award: 'Awards',
  course: 'Courses',
  certification: 'Certifications',
  volunteering: 'Volunteering',
  news: 'News'
};

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

export function formatDate(value: string): string {
  if (value === 'Present') return value;
  const [year, month] = value.split('-');
  if (!month) return year;
  return new Intl.DateTimeFormat('en', { month: 'short', year: 'numeric', timeZone: 'UTC' }).format(
    new Date(Date.UTC(Number(year), Number(month) - 1, 1))
  );
}

export function formatDateRange(item: ItemEntry): string {
  return `${formatDate(item.data.dateStart)} — ${formatDate(item.data.dateEnd)}`;
}

export function sortItems(items: ItemEntry[]): ItemEntry[] {
  return [...items].sort((a, b) => {
    const endDifference = monthIndex(b.data.dateEnd) - monthIndex(a.data.dateEnd);
    return endDifference || monthIndex(b.data.dateStart) - monthIndex(a.data.dateStart) || a.data.title.localeCompare(b.data.title);
  });
}

export function groupItemsByType(items: ItemEntry[]) {
  return itemTypeOrder
    .map((type) => ({ type, label: itemTypeLabels[type], items: sortItems(items.filter((item) => item.data.type === type)) }))
    .filter((group) => group.items.length);
}

export function getSkillLabel(id: string): string {
  return skillMap.get(id)?.label ?? id;
}

export function getRelatedItems(item: ItemEntry, allItems: ItemEntry[], limit = 4): ItemEntry[] {
  const explicitIds = new Set(item.data.relations.map((relation) => relation.id));
  return allItems
    .filter((candidate) => candidate.slug !== item.slug && candidate.data.published)
    .map((candidate) => ({
      candidate,
      score:
        (explicitIds.has(candidate.slug) ? 100 : 0) +
        candidate.data.skills.filter((skill) => item.data.skills.includes(skill)).length
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
      if (candidate.slug === item.slug) return false;
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

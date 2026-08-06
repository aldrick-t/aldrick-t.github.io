import { skillGroupsByLanguage, skillLabelsByLanguage, type Language } from '../lib/i18n';
import { mainSkillStackIds, mainTechStackIds, skills } from './skills.local';

export { mainSkillStackIds, mainTechStackIds, skills };

export type SkillStack = 'tech' | 'skill';

export interface SkillDefinition {
  id: string;
  label: string;
  group: string;
  stack: SkillStack;
  iconIds?: string[];
}

type LocalizedSkillDefinition = Omit<SkillDefinition, 'label'> & { label: string };

const skillIconModules = import.meta.glob('../assets/icons/skills/*.svg', {
  eager: true,
  query: '?url',
  import: 'default'
}) as Record<string, string>;

export const skillMap = new Map(skills.map((skill) => [skill.id, skill]));

export function getSkillIconUrls(skill: Pick<SkillDefinition, 'iconIds'>): string[] {
  return (skill.iconIds ?? []).map((iconId) => skillIconModules[`../assets/icons/skills/${iconId}.svg`]).filter((iconUrl): iconUrl is string => Boolean(iconUrl));
}

export function getLocalizedSkillLabel(id: string, language: Language): string {
  return skillLabelsByLanguage[language][id] ?? skillMap.get(id)?.label ?? id;
}

function getLocalizedSkill(skill: SkillDefinition, language: Language): LocalizedSkillDefinition {
  return { ...skill, label: getLocalizedSkillLabel(skill.id, language) };
}

export function getLocalizedSkillStack(stack: SkillStack, language: Language) {
  const grouped = new Map<string, LocalizedSkillDefinition[]>();

  skills.filter((skill) => skill.stack === stack).forEach((skill) => {
    const localizedSkills = grouped.get(skill.group) ?? [];
    localizedSkills.push(getLocalizedSkill(skill, language));
    grouped.set(skill.group, localizedSkills);
  });

  return Array.from(grouped, ([group, localizedSkills]) => ({
    group: skillGroupsByLanguage[language][group] ?? group,
    skills: localizedSkills
  }));
}

export function getLocalizedMainSkillStack(ids: readonly string[], language: Language): LocalizedSkillDefinition[] {
  return ids.map((id) => skillMap.get(id)).filter((skill): skill is SkillDefinition => Boolean(skill)).map((skill) => getLocalizedSkill(skill, language));
}

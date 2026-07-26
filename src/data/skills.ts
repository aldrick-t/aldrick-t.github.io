import { skillGroupsByLanguage, skillLabelsByLanguage, type Language } from '../lib/i18n';

export type SkillStack = 'tech' | 'skill';

export interface SkillDefinition {
  id: string;
  label: string;
  group: string;
  stack: SkillStack;
  iconIds?: string[];
}

type LocalizedSkillDefinition = Omit<SkillDefinition, 'label'> & { label: string };

export const skills: SkillDefinition[] = [
  { id: 'python', label: 'Python', group: 'Programming', stack: 'tech', iconIds: ['python'] },
  { id: 'cpp', label: 'C/C++', group: 'Programming', stack: 'tech', iconIds: ['cpp'] },
  { id: 'csharp', label: 'C# / .NET', group: 'Programming', stack: 'tech', iconIds: ['csharp'] },
  { id: 'matlab', label: 'MATLAB', group: 'Programming', stack: 'tech', iconIds: ['matlab'] },
  { id: 'javascript', label: 'JavaScript', group: 'Programming', stack: 'tech', iconIds: ['javascript'] },
  { id: 'typescript', label: 'TypeScript', group: 'Programming', stack: 'tech', iconIds: ['typescript'] },
  { id: 'rust', label: 'Rust', group: 'Programming', stack: 'tech', iconIds: ['rust'] },
  { id: 'vhdl', label: 'VHDL', group: 'Programming', stack: 'tech', iconIds: ['vhdl'] },
  { id: 'typst', label: 'Typst', group: 'Programming', stack: 'tech', iconIds: ['typst'] },
  { id: 'ros2', label: 'ROS 2', group: 'Robotics & autonomy', stack: 'tech', iconIds: ['ros2'] },
  { id: 'slam', label: 'SLAM', group: 'Robotics & autonomy', stack: 'skill' },
  { id: 'gazebo', label: 'Gazebo', group: 'Robotics & autonomy', stack: 'tech', iconIds: ['gazebo'] },
  { id: 'sensor-integration', label: 'Sensor integration', group: 'Robotics & autonomy', stack: 'skill' },
  { id: 'robot-control', label: 'Robot control', group: 'Robotics & autonomy', stack: 'skill' },
  { id: 'robotics', label: 'Robotics', group: 'Robotics & autonomy', stack: 'skill' },
  { id: 'cyber-physical-systems', label: 'Cyber-physical systems', group: 'Robotics & autonomy', stack: 'skill' },
  { id: 'computer-vision', label: 'Computer vision', group: 'AI & perception', stack: 'skill' },
  { id: 'machine-learning', label: 'Machine learning', group: 'AI & perception', stack: 'skill' },
  { id: 'deep-learning', label: 'Deep learning', group: 'AI & perception', stack: 'skill' },
  { id: 'object-detection', label: 'Object detection', group: 'AI & perception', stack: 'skill' },
  { id: 'pose-estimation', label: 'Pose estimation', group: 'AI & perception', stack: 'skill' },
  { id: 'embedded', label: 'Embedded systems', group: 'Embedded & hardware', stack: 'skill' },
  { id: 'smart-interfaces', label: 'Smart interfaces', group: 'Embedded & hardware', stack: 'skill' },
  { id: 'digital-systems', label: 'Digital systems', group: 'Embedded & hardware', stack: 'skill' },
  { id: 'circuit-design', label: 'Circuit design', group: 'Embedded & hardware', stack: 'skill' },
  { id: 'kicad', label: 'KiCad', group: 'Embedded & hardware', stack: 'tech', iconIds: ['kicad'] },
  { id: 'social-intelligence', label: 'Social intelligence', group: 'Professional & interpersonal', stack: 'skill' },
  { id: 'linux', label: 'Linux', group: 'Software & tools', stack: 'tech', iconIds: ['linux'] },
  { id: 'ffmpeg', label: 'FFmpeg', group: 'Software & tools', stack: 'tech', iconIds: ['ffmpeg'] },
  { id: 'docker', label: 'Docker / Podman', group: 'Software & tools', stack: 'tech', iconIds: ['docker', 'podman'] },
  { id: 'prometheus', label: 'Prometheus', group: 'Software & tools', stack: 'tech', iconIds: ['prometheus'] },
  { id: 'postgresql', label: 'PostgreSQL', group: 'Software & tools', stack: 'tech', iconIds: ['postgres'] },
  { id: 'grafana', label: 'Grafana', group: 'Software & tools', stack: 'tech', iconIds: ['grafana'] },
  { id: 'git', label: 'Git / GitHub', group: 'Software & tools', stack: 'tech', iconIds: ['git', 'github'] },
  { id: 'cicd', label: 'CI/CD', group: 'Software & tools', stack: 'tech', iconIds: ['cicd'] },
  { id: 'azure-devops', label: 'Azure DevOps', group: 'Software & tools', stack: 'tech', iconIds: ['azure-devops'] },
  { id: 'azure-pipelines', label: 'Azure Pipelines', group: 'Software & tools', stack: 'tech', iconIds: ['azure-pipelines'] },
  { id: 'github-actions', label: 'GitHub Actions', group: 'Software & tools', stack: 'tech', iconIds: ['github-actions'] },
  { id: 'teamviewer-spatial', label: 'TeamViewer Spatial', group: 'Software & tools', stack: 'tech', iconIds: ['teamviewer-spatial'] },
  { id: 'nx', label: 'Siemens NX', group: 'CAD / CAE / simulation', stack: 'tech', iconIds: ['nx'] },
  { id: 'fusion', label: 'Autodesk Fusion', group: 'CAD / CAE / simulation', stack: 'tech', iconIds: ['fusion'] },
  { id: 'solidworks', label: 'SolidWorks', group: 'CAD / CAE / simulation', stack: 'tech', iconIds: ['solidworks'] },
  { id: 'fea', label: 'Finite element analysis', group: 'CAD / CAE / simulation', stack: 'skill' },
  { id: 'opencv', label: 'OpenCV', group: 'Libraries & frameworks', stack: 'tech', iconIds: ['opencv'] },
  { id: 'react', label: 'React', group: 'Libraries & frameworks', stack: 'tech', iconIds: ['react'] },
  { id: 'tauri', label: 'Tauri', group: 'Libraries & frameworks', stack: 'tech', iconIds: ['tauri'] },
  { id: 'tensorflow', label: 'TensorFlow', group: 'Libraries & frameworks', stack: 'tech', iconIds: ['tensorflow'] },
  { id: 'pytorch', label: 'PyTorch', group: 'Libraries & frameworks', stack: 'tech', iconIds: ['pytorch'] },
  { id: 'numpy', label: 'NumPy', group: 'Libraries & frameworks', stack: 'tech', iconIds: ['numpy'] }
];

export const mainTechStackIds = ['python', 'ros2', 'opencv', 'cpp', 'fusion', 'csharp'] as const;
export const mainSkillStackIds = ['computer-vision', 'robot-control', 'sensor-integration', 'embedded', 'machine-learning', 'robotics'] as const;

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

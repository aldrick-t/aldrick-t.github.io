export interface SkillDefinition {
  id: string;
  label: string;
  group: string;
}

export const skills: SkillDefinition[] = [
  { id: 'python', label: 'Python', group: 'Programming' },
  { id: 'cpp', label: 'C/C++', group: 'Programming' },
  { id: 'csharp', label: 'C# / .NET', group: 'Programming' },
  { id: 'matlab', label: 'MATLAB', group: 'Programming' },
  { id: 'javascript', label: 'JavaScript', group: 'Programming' },
  { id: 'vhdl', label: 'VHDL', group: 'Programming' },
  { id: 'typst', label: 'Typst', group: 'Programming' },
  { id: 'ros2', label: 'ROS 2', group: 'Robotics & autonomy' },
  { id: 'slam', label: 'SLAM', group: 'Robotics & autonomy' },
  { id: 'gazebo', label: 'Gazebo', group: 'Robotics & autonomy' },
  { id: 'sensor-integration', label: 'Sensor integration', group: 'Robotics & autonomy' },
  { id: 'robot-control', label: 'Robot control', group: 'Robotics & autonomy' },
  { id: 'computer-vision', label: 'Computer vision', group: 'AI & perception' },
  { id: 'machine-learning', label: 'Machine learning', group: 'AI & perception' },
  { id: 'deep-learning', label: 'Deep learning', group: 'AI & perception' },
  { id: 'object-detection', label: 'Object detection', group: 'AI & perception' },
  { id: 'pose-estimation', label: 'Pose estimation', group: 'AI & perception' },
  { id: 'embedded', label: 'Embedded systems', group: 'Embedded & hardware' },
  { id: 'circuit-design', label: 'Circuit design', group: 'Embedded & hardware' },
  { id: 'kicad', label: 'KiCad', group: 'Embedded & hardware' },
  { id: 'linux', label: 'Linux', group: 'Software & tools' },
  { id: 'docker', label: 'Docker / Podman', group: 'Software & tools' },
  { id: 'postgresql', label: 'PostgreSQL', group: 'Software & tools' },
  { id: 'grafana', label: 'Grafana', group: 'Software & tools' },
  { id: 'git', label: 'Git / GitHub', group: 'Software & tools' },
  { id: 'nx', label: 'Siemens NX', group: 'CAD / CAE / simulation' },
  { id: 'fusion', label: 'Autodesk Fusion', group: 'CAD / CAE / simulation' },
  { id: 'solidworks', label: 'SolidWorks', group: 'CAD / CAE / simulation' },
  { id: 'fea', label: 'Finite element analysis', group: 'CAD / CAE / simulation' },
  { id: 'opencv', label: 'OpenCV', group: 'Libraries & frameworks' },
  { id: 'tensorflow', label: 'TensorFlow', group: 'Libraries & frameworks' },
  { id: 'pytorch', label: 'PyTorch', group: 'Libraries & frameworks' },
  { id: 'numpy', label: 'NumPy', group: 'Libraries & frameworks' }
];

export const skillMap = new Map(skills.map((skill) => [skill.id, skill]));

export const skillGroups = Array.from(new Set(skills.map((skill) => skill.group))).map((group) => ({
  group,
  skills: skills.filter((skill) => skill.group === group)
}));

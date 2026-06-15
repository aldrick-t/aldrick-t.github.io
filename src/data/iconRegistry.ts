import autocad from '../assets/icons/skills/autocad.svg?raw';
import astro from '../assets/icons/skills/astro.svg?raw';
import cpp from '../assets/icons/skills/cpp.svg?raw';
import csharp from '../assets/icons/skills/csharp.svg?raw';
import docker from '../assets/icons/skills/docker.svg?raw';
import fusion from '../assets/icons/skills/fusion.svg?raw';
import githubActions from '../assets/icons/skills/github-actions.svg?raw';
import grafana from '../assets/icons/skills/grafana.svg?raw';
import kicad from '../assets/icons/skills/kicad.svg?raw';
import linux from '../assets/icons/skills/linux.svg?raw';
import matlab from '../assets/icons/skills/matlab.svg?raw';
import nx from '../assets/icons/skills/nx.svg?raw';
import opencv from '../assets/icons/skills/opencv.svg?raw';
import otel from '../assets/icons/skills/otel.svg?raw';
import postgres from '../assets/icons/skills/postgres.svg?raw';
import python from '../assets/icons/skills/python.svg?raw';
import ros2 from '../assets/icons/skills/ros2.svg?raw';
import solidworks from '../assets/icons/skills/solidworks.svg?raw';
import typescript from '../assets/icons/skills/typescript.svg?raw';
import vhdl from '../assets/icons/skills/vhdl.svg?raw';
import copy from '../assets/icons/ui/copy.svg?raw';
import download from '../assets/icons/ui/download.svg?raw';
import email from '../assets/icons/ui/email.svg?raw';
import external from '../assets/icons/ui/external.svg?raw';
import github from '../assets/icons/ui/github.svg?raw';
import linkedin from '../assets/icons/ui/linkedin.svg?raw';
import location from '../assets/icons/ui/location.svg?raw';
import phone from '../assets/icons/ui/phone.svg?raw';
import status from '../assets/icons/ui/status.svg?raw';
import website from '../assets/icons/ui/website.svg?raw';

export const uiIconRegistry = {
  copy,
  download,
  email,
  external,
  github,
  linkedin,
  location,
  phone,
  status,
  website
} as const;

export const skillIconRegistry = {
  autocad,
  astro,
  cpp,
  csharp,
  docker,
  fusion,
  'github-actions': githubActions,
  grafana,
  kicad,
  linux,
  matlab,
  nx,
  opencv,
  otel,
  postgres,
  python,
  ros2,
  solidworks,
  typescript,
  vhdl
} as const;

export type UiIconName = keyof typeof uiIconRegistry;
export type SkillIconName = keyof typeof skillIconRegistry;

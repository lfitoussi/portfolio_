export type SkillPoi = {
  id: string;
  name: string;
  x: number;
  y: number;
  label: string;
  details: string;
  video: string;
  level: number;
};

export const WORLD_SIZE = {
  width: 2600,
  height: 1800,
};

export const SKILL_POIS: SkillPoi[] = [
  {
    id: "motivation",
    name: "Motivation",
    x: 540,
    y: 520,
    label: "Point Motivation",
    details: "Motivation [Lvl 98] DRIVE MAXIMUM",
    video: "https://cdn.coverr.co/videos/coverr-programming-at-night-1579/1080p.mp4",
    level: 98,
  },
  {
    id: "autonomie",
    name: "Autonomie",
    x: 980,
    y: 780,
    label: "Point Autonomie",
    details: "Autonomie [Lvl 96] HIGH IMPACT",
    video: "https://cdn.coverr.co/videos/coverr-coding-on-a-laptop-1579/1080p.mp4",
    level: 96,
  },
  {
    id: "observation",
    name: "Sens de l'observation",
    x: 1320,
    y: 620,
    label: "Point Observation",
    details: "Observation [Lvl 97] ATTENTION TO DETAIL",
    video: "https://cdn.coverr.co/videos/coverr-designing-an-app-interface-1579/1080p.mp4",
    level: 97,
  },
  {
    id: "esprit-equipe",
    name: "Esprit d'equipe",
    x: 1780,
    y: 920,
    label: "Point Teamwork",
    details: "Esprit d'equipe [Lvl 95] COLLABORATION PRO",
    video: "https://cdn.coverr.co/videos/coverr-man-working-on-his-laptop-1579/1080p.mp4",
    level: 95,
  },
  {
    id: "aisance-relationnelle",
    name: "Aisance relationnelle",
    x: 2100,
    y: 610,
    label: "Point Relationnel",
    details: "Aisance relationnelle [Lvl 94] COMMUNICATION IMPACT",
    video: "https://cdn.coverr.co/videos/coverr-designer-working-on-a-laptop-1579/1080p.mp4",
    level: 94,
  },
  {
    id: "organisation",
    name: "Organisation",
    x: 2280,
    y: 980,
    label: "Point Organisation",
    details: "Organisation [Lvl 97] EXECUTION CLEAN",
    video: "https://cdn.coverr.co/videos/coverr-city-streets-at-night-1579/1080p.mp4",
    level: 97,
  },
  {
    id: "bilingue-anglais",
    name: "Bilingue en anglais",
    x: 780,
    y: 1160,
    label: "Point Langues",
    details:
      "Bilingue en anglais [Lvl 99] 5 ans vecus a Los Angeles, USA : adaptabilite culturelle forte et vision internationale.",
    video: "https://cdn.coverr.co/videos/coverr-woman-working-with-headphones-1579/1080p.mp4",
    level: 99,
  },
];

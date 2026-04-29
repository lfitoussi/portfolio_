export type DashboardCard = {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  description: string;
  href: string;
  tag?: string;
  trailer?: string;
};

export type SkillCard = {
  id: string;
  name: string;
  image: string;
  match: string;
  tag: string;
  preview?: string;
};

export const featuredProject = {
  title: "Fitlagree",
  tag: "Projet a la une",
  description:
    "Revolutionnez la gestion des studios Lagree grace a l'intelligence artificielle. Fitlagree automatise l'accueil telephonique, la gestion des membres et la creation de contenu video pour transformer chaque studio en une entreprise ultra-performante et disponible 24h/24.",
  image:
    "https://images.unsplash.com/photo-1571019613576-2b22c76fd955?auto=format&fit=crop&w=1800&q=80",
  demoUrl: "https://fitlagree.com/",
  technicalDetails: [
    "Stack frontend: Next.js, TypeScript, Framer Motion, Tailwind CSS.",
    "Architecture orientee composants avec separation data / presentation.",
    "UX ciblee conversion: hero immersive, CTA visibles, interactions rapides.",
  ],
};

export const topProjects: DashboardCard[] = [
  {
    id: "p1",
    title: "Fitlagree",
    subtitle: "IA & Fitness",
    image: "/fitlagree-card-bg.svg",
    description:
      "Revolutionnez la gestion des studios Lagree grace a l'intelligence artificielle. Fitlagree automatise l'accueil telephonique, la gestion des membres et la creation de contenu video pour transformer chaque studio en une entreprise ultra-performante et disponible 24h/24.",
    href: "https://fitlagree.com/",
    tag: "IA & Fitness",
    trailer: "https://cdn.coverr.co/videos/coverr-man-running-on-a-treadmill-1579/1080p.mp4",
  },
  {
    id: "p2",
    title: "Ecowise Campus",
    subtitle: "Education & Impact",
    image: "/ecowise-campus.png",
    description:
      "Immersion dans les coulisses d'un geant de la restauration rapide. Une exploration creative alliant brand content et engagement communautaire : du design de menus digitaux aux campagnes promotionnelles percutantes, decouvrez comment l'identite visuelle nourrit la faim de milliers de followers chaque jour.",
    href: "https://canva.link/7016zauor3y79kf",
    tag: "Green Project",
    trailer: "https://cdn.coverr.co/videos/coverr-hands-holding-a-plant-1579/1080p.mp4",
  },
  {
    id: "p3",
    title: "YS Conciergerie",
    subtitle: "Service premium",
    image: "/ys-conciergerie.png",
    description:
      "Redefinition de l'identite visuelle digitale pour une marque de cosmetiques premium. Entre elegance et naturel, ce projet decline une strategie de contenu Instagram complete : du design des posts aux stories engageantes, pour sublimer l'huile de figue de barbarie et l'heritage des rituels d'Orient.",
    href: "https://canva.link/w8xeisgx15mrla2",
    tag: "Hospitality",
  },
  {
    id: "p4",
    title: "Projet Data",
    subtitle: "Data & Performance",
    image: "/data-project.png",
    description:
      "Transformer la donnee en levier de croissance. Une etude approfondie des indicateurs de performance (KPIs) et des comportements utilisateurs pour optimiser les campagnes digitales. Ce projet demontre comment l'analyse de donnees permet de prendre des decisions strategiques eclairees et de maximiser le retour sur investissement (ROI) d'une marque.",
    href: "https://canva.link/yqm9bg7zltzqzhn",
    tag: "Data",
  },
  {
    id: "p5",
    title: "Looker Studio ROI Dashboard",
    subtitle: "Data Marketing",
    image: "/data-looker-project.png",
    description:
      "Creation d'un tableau de bord dynamique sur Looker Studio pour evaluer l'efficacite des leviers marketing sur le trafic et les revenus. J'ai modelise l'entonnoir de conversion e-commerce pour analyser les points de friction et mis en place le suivi du ROI des campagnes publicitaires afin d'optimiser la strategie d'acquisition.",
    href: "https://datastudio.google.com/reporting/5efbe551-d95c-46ee-83d9-ad41af0d4cc5",
    tag: "Data",
  },
];

export const techStackSkills: SkillCard[] = [
  {
    id: "s1",
    name: "React",
    image:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=700&q=80",
    match: "98% Match",
    tag: "Expert",
  },
  {
    id: "s2",
    name: "Next.js",
    image:
      "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?auto=format&fit=crop&w=700&q=80",
    match: "97% Match",
    tag: "Passionnee",
  },
  {
    id: "s3",
    name: "Tailwind CSS",
    image:
      "https://images.unsplash.com/photo-1618477247222-acbdb0e159b3?auto=format&fit=crop&w=700&q=80",
    match: "96% Match",
    tag: "Expert",
  },
  {
    id: "s4",
    name: "JavaScript",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=700&q=80",
    match: "95% Match",
    tag: "Passionnee",
  },
];

export const productionDesignSkills: SkillCard[] = [
  {
    id: "pds1",
    name: "Canva",
    image:
      "https://images.unsplash.com/photo-1634942537034-2531766767d1?auto=format&fit=crop&w=700&q=80",
    match: "95% Match",
    tag: "Creative",
    preview: "/ecowise-campus.png",
  },
  {
    id: "pds2",
    name: "CapCut",
    image:
      "https://images.unsplash.com/photo-1535016120720-40c646be5580?auto=format&fit=crop&w=700&q=80",
    match: "93% Match",
    tag: "Video",
    preview: "/ys-conciergerie.png",
  },
  {
    id: "pds3",
    name: "Suite Adobe",
    image:
      "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?auto=format&fit=crop&w=700&q=80",
    match: "96% Match",
    tag: "Expert",
    preview:
      "https://images.unsplash.com/photo-1618005198919-d3d4b5a92eee?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: "pds4",
    name: "Figma",
    image:
      "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=700&q=80",
    match: "97% Match",
    tag: "UI/UX",
    preview:
      "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=700&q=80",
  },
];

export const laExperience = {
  title: "The L.A. Experience",
  text: "Bilingue Anglais - 1 an d'immersion a Los Angeles, USA. Adaptabilite culturelle et vision internationale.",
  image: "/los-angeles-map.png",
  badge: "Top 1",
  audio: "Audio: English (Native/Bilingual), French (Native)",
};

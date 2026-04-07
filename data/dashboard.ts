export type DashboardCard = {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  description: string;
};

export const featuredProject = {
  title: "CinemaScope",
  tag: "Projet a la une",
  description:
    "Une plateforme streaming full-stack avec recommandations IA, auth securisee et dashboard analytics.",
  image:
    "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1800&q=80",
  demoUrl: "https://example.com/demo",
  codeUrl: "https://github.com/example/repo",
};

export const topProjects: DashboardCard[] = [
  {
    id: "p1",
    title: "CinemaScope",
    subtitle: "Next.js + Prisma",
    image:
      "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?auto=format&fit=crop&w=900&q=80",
    description: "Plateforme video avec abonnement et recommandations personnalisees.",
  },
  {
    id: "p2",
    title: "Pulse Commerce",
    subtitle: "React + Stripe",
    image:
      "https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=900&q=80",
    description: "E-commerce performant axe conversion et UX mobile-first.",
  },
  {
    id: "p3",
    title: "SkillTrack",
    subtitle: "TypeScript + Node",
    image:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=900&q=80",
    description: "App de suivi d'apprentissage avec progression visuelle.",
  },
  {
    id: "p4",
    title: "Aurora Studio",
    subtitle: "Design System",
    image:
      "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=900&q=80",
    description: "Bibliotheque UI composee de composants reutilisables modernes.",
  },
  {
    id: "p5",
    title: "Realtime Hub",
    subtitle: "Socket + Redis",
    image:
      "https://images.unsplash.com/photo-1518773553398-650c184e0bb3?auto=format&fit=crop&w=900&q=80",
    description: "Dashboard collaboration temps reel pour equipes distribuees.",
  },
];

export const languages: DashboardCard[] = [
  {
    id: "l1",
    title: "TypeScript",
    subtitle: "Langage principal",
    image:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=900&q=80",
    description: "Typage robuste pour apps evolutives et maintainables.",
  },
  {
    id: "l2",
    title: "JavaScript",
    subtitle: "Ecosysteme web",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=900&q=80",
    description: "Polyvalent et central dans mes interfaces interactives.",
  },
  {
    id: "l3",
    title: "Python",
    subtitle: "Automatisation",
    image:
      "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=900&q=80",
    description: "Scripts, data workflows et prototypage rapide.",
  },
  {
    id: "l4",
    title: "SQL",
    subtitle: "Data layer",
    image:
      "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=900&q=80",
    description: "Modelisation et optimisation de requetes de production.",
  },
];

export const tools: DashboardCard[] = [
  {
    id: "t1",
    title: "Next.js",
    subtitle: "Framework React",
    image:
      "https://images.unsplash.com/photo-1621839673705-6617adf9e890?auto=format&fit=crop&w=900&q=80",
    description: "SSR/SSG et architecture performante pour experiences premium.",
  },
  {
    id: "t2",
    title: "Tailwind CSS",
    subtitle: "UI rapide",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80",
    description: "Iteration visuelle rapide avec systeme de design coherent.",
  },
  {
    id: "t3",
    title: "Framer Motion",
    subtitle: "Motion design",
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=900&q=80",
    description: "Micro-interactions et transitions fluides type OTT premium.",
  },
  {
    id: "t4",
    title: "Figma",
    subtitle: "UI/UX workflow",
    image:
      "https://images.unsplash.com/photo-1586717799252-bd134ad00e26?auto=format&fit=crop&w=900&q=80",
    description: "Du wireframe au prototype haute fidelite en continu.",
  },
];

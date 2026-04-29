import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import AboutMeSection from "@/components/AboutMeSection";
import ContactFinaleSection from "@/components/ContactFinaleSection";
import type { PortfolioSection } from "@/components/ProfileSelection";
import OpenWorldSkills from "@/components/OpenWorldSkills";
import {
  featuredProject,
  topProjects,
  type DashboardCard,
} from "@/data/dashboard";

type DashboardProps = {
  activeSection: PortfolioSection | null;
  onBackToProfiles: () => void;
};

function PlayIcon({ className = "h-4 w-4 fill-current", color }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} style={color ? { fill: color } : undefined}>
      <path d="M8 5v14l11-7-11-7z" />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
      <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
    </svg>
  );
}

function ProjectRows({
  previewCardId,
  setHoveredCardId,
  setPreviewCardId,
  setSelectedProject,
}: {
  previewCardId: string | null;
  setHoveredCardId: (id: string | null) => void;
  setPreviewCardId: (fn: (current: string | null) => string | null) => void;
  setSelectedProject: (project: DashboardCard | null) => void;
}) {
  return (
    <section className="mt-10 px-4 sm:mt-14 sm:px-8">
      <h3 className="mb-4 ml-1 text-xl font-semibold text-white sm:text-2xl">Mes projets en vedette</h3>
      <div className="mb-14 grid grid-cols-2 gap-4 sm:gap-6">
        {topProjects.slice(0, 2).map((item) => (
          <button key={`featured-${item.id}`} type="button" onClick={() => setSelectedProject(item)} className="group relative overflow-hidden rounded-lg border border-white/15 bg-zinc-900">
            <div className="relative h-56 sm:h-72">
              <Image src={item.image} alt={item.title} fill sizes="50vw" className="object-cover transition duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3">
                <span className="inline-flex rounded bg-[#E50914] px-2 py-1 text-[10px] font-bold tracking-wider text-white">{item.tag ?? "Projet"}</span>
                <h4 className="mt-2 text-xl font-semibold text-white">{item.title}</h4>
                <p className="text-sm text-zinc-200">{item.subtitle}</p>
              </div>
            </div>
          </button>
        ))}
      </div>

      <h3 className="mb-6 ml-1 text-2xl font-semibold text-white sm:text-3xl">Mon Top 5 des projets</h3>
      <div className="flex gap-7 overflow-x-auto pb-10 pt-2 [scrollbar-color:#E50914_#141414] [scrollbar-width:thin]">
        {topProjects.map((item, index) => (
          <motion.button
            key={item.id}
            type="button"
            onClick={() => setSelectedProject(item)}
            className="group relative min-w-[280px] sm:min-w-[340px]"
            whileHover={{ scale: 1.12, y: -8, zIndex: 30 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            onHoverStart={() => setHoveredCardId(item.id)}
            onHoverEnd={() => {
              setHoveredCardId(null);
              setPreviewCardId((current) => (current === item.id ? null : current));
            }}
          >
            <span className="pointer-events-none absolute -left-6 bottom-5 z-10 font-[var(--font-bebas-neue)] text-8xl leading-none text-black sm:text-[8.5rem]" style={{ WebkitTextStroke: "3px #d4d4d8" }}>
              {index + 1}
            </span>
            <article className="relative overflow-hidden rounded-md border border-white/10 bg-zinc-900 shadow-[0_8px_20px_rgba(0,0,0,0.45)] transition duration-200 group-hover:border-zinc-300/40">
              <div className="relative h-44 sm:h-52">
                <Image src={item.image} alt={item.title} fill sizes="(max-width: 640px) 230px, 260px" className="object-cover transition duration-500 group-hover:scale-110" />
                {item.trailer && previewCardId === item.id && (
                  <video className="absolute inset-0 h-full w-full object-cover" src={item.trailer} autoPlay muted loop playsInline />
                )}
              </div>
            </article>
            <p className="relative z-20 mt-6 pl-2 text-base font-semibold leading-tight text-zinc-100 sm:text-lg">{item.title}</p>
          </motion.button>
        ))}
      </div>
    </section>
  );
}

function ProjectDetailsModal({
  selectedProject,
  onClose,
}: {
  selectedProject: DashboardCard | null;
  onClose: () => void;
}) {
  if (!selectedProject) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-end bg-black/55 p-2 backdrop-blur-[1px] sm:items-center sm:justify-center sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="w-full max-w-4xl overflow-hidden rounded-xl border border-white/15 bg-[#181818] text-white shadow-2xl"
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.98 }}
        transition={{ duration: 0.2 }}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="relative h-56 bg-black sm:h-72">
          <Image
            src={selectedProject.image}
            alt={selectedProject.title}
            fill
            sizes="100vw"
            className="object-contain object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-black/35 to-transparent" />
          <button type="button" onClick={onClose} className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/70 text-white" aria-label="Fermer la fiche projet">×</button>
          <div className="absolute bottom-4 left-4 right-4">
            <h4 className="font-[var(--font-bebas-neue)] text-4xl tracking-wide sm:text-5xl">{selectedProject.title}</h4>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-zinc-200 sm:text-base">{selectedProject.description}</p>
          </div>
        </div>

        <div className="grid gap-7 p-5 sm:grid-cols-[1.2fr_1fr] sm:p-7">
          <div>
            <p className="mb-5 text-sm leading-relaxed text-zinc-200">{selectedProject.subtitle}</p>
            <a
              href={selectedProject.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded bg-white px-5 py-2.5 text-sm font-semibold text-zinc-900 hover:bg-zinc-200"
              style={{ color: "#111111" }}
            >
              <PlayIcon className="h-4 w-4" color="#111111" />
              Lecture
            </a>
          </div>
          <div className="space-y-3 text-sm leading-relaxed text-zinc-300">
            <p><span className="text-zinc-500">Categorie: </span>{selectedProject.tag ?? "Projet"}</p>
            <p><span className="text-zinc-500">Type: </span>Portfolio case study</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Dashboard({ activeSection, onBackToProfiles }: DashboardProps) {
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
  const [previewCardId, setPreviewCardId] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<DashboardCard | null>(null);
  const sectionLabel =
    activeSection === "projects"
      ? "Mes Projets"
      : activeSection === "skills"
        ? "Competences"
        : activeSection === "contact"
          ? "Contact"
          : "A propos";

  const isProjects = activeSection === "projects";
  const isSkills = activeSection === "skills";
  const isContact = activeSection === "contact";
  const isAbout = activeSection === "about";

  useEffect(() => {
    if (!hoveredCardId) return;
    const timeoutId = window.setTimeout(() => {
      setPreviewCardId(hoveredCardId);
    }, 320);
    return () => window.clearTimeout(timeoutId);
  }, [hoveredCardId]);

  return (
    <motion.main
      id={isSkills ? "skills" : "projects"}
      className="min-h-screen bg-gradient-to-b from-neutral-900 via-black to-black pb-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      <header className="fixed inset-x-0 top-0 z-40 h-16 bg-gradient-to-b from-black/90 to-transparent px-4 py-3 backdrop-blur-[1px] sm:px-8">
        <div className="flex items-center justify-between">
          <div className="flex min-w-0 items-center gap-4">
            {!isContact && (
              <button
                type="button"
                onClick={onBackToProfiles}
                className="shrink-0 whitespace-nowrap font-[var(--font-bebas-neue)] text-2xl tracking-widest text-[#E50914] sm:text-3xl"
              >
                NETFLIX
              </button>
            )}
            {!isContact && (
              <nav className="hidden min-w-0 items-center gap-3 text-sm text-zinc-200 xl:flex">
                <span className="text-zinc-200">Accueil</span>
                <span className="text-zinc-400">/</span>
                <span className="truncate font-semibold text-white">{sectionLabel}</span>
              </nav>
            )}
          </div>

          <button
            type="button"
            onClick={onBackToProfiles}
            className="group inline-flex items-center gap-2 rounded-md bg-black/35 px-2 py-1.5 text-white hover:bg-black/60"
            aria-label="Changer de profil"
          >
            <span className="inline-flex h-7 w-7 items-center justify-center rounded bg-gradient-to-br from-fuchsia-500 to-indigo-500 text-xs font-bold">
              L
            </span>
            <span className="hidden text-xs text-zinc-200 sm:inline">Profil</span>
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current text-zinc-300 transition group-hover:text-white">
              <path d="M7 10l5 5 5-5H7z" />
            </svg>
          </button>
        </div>
      </header>

      <div className={isContact ? "pt-44 sm:pt-52" : isAbout ? "pt-28 sm:pt-32" : "pt-20"} />

      {isProjects && (
        <section className="relative mt-6 h-[78vh] min-h-[560px] overflow-hidden">
          <Image src={featuredProject.image} alt={featuredProject.title} fill priority sizes="100vw" className="object-cover object-center saturate-110" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/25" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-black/60 to-transparent" />
          <div className="absolute bottom-[12%] left-5 z-10 max-w-4xl md:left-12">
            <span className="inline-flex rounded bg-[#E50914] px-2 py-1 text-xs font-semibold uppercase tracking-widest text-white">{featuredProject.tag}</span>
            <h2 className="mt-4 font-[var(--font-bebas-neue)] text-7xl tracking-wider text-white sm:text-8xl md:text-9xl">{featuredProject.title}</h2>
            <p className="mt-4 max-w-3xl text-lg leading-relaxed text-zinc-100 sm:text-xl">{featuredProject.description}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href={featuredProject.demoUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded bg-white px-7 py-3.5 text-base font-semibold text-zinc-900 transition hover:bg-zinc-200" style={{ color: "#111111" }}>
                <PlayIcon className="h-4 w-4" color="#111111" />
                Lecture
              </a>
              <button type="button" onClick={() => setIsInfoOpen(true)} className="inline-flex items-center gap-2 rounded bg-zinc-600/75 px-7 py-3.5 text-base font-semibold text-white transition hover:bg-zinc-500/85">
                <InfoIcon />
                Plus d&apos;infos
              </button>
            </div>
          </div>
        </section>
      )}

      {isProjects && (
        <ProjectRows
          previewCardId={previewCardId}
          setHoveredCardId={setHoveredCardId}
          setPreviewCardId={setPreviewCardId}
          setSelectedProject={setSelectedProject}
        />
      )}

      {isSkills && <OpenWorldSkills />}

      {isContact && <ContactFinaleSection onBackHome={onBackToProfiles} />}
      {isAbout && <AboutMeSection onBackHome={onBackToProfiles} />}

      {!isProjects && !isSkills && !isContact && !isAbout && (
        <section className="mt-8 px-3 sm:px-6">
          <div className="rounded-xl border border-white/10 bg-black/35 p-6 text-white">
            <h2 className="font-[var(--font-bebas-neue)] text-5xl tracking-wide">{sectionLabel}</h2>
            <p className="mt-3 max-w-2xl text-zinc-300">
              Cette section est en cours de personnalisation pour garder une experience claire et coherente.
              Utilise le bouton en haut a droite pour changer de profil.
            </p>
          </div>
        </section>
      )}

      <AnimatePresence>
        <ProjectDetailsModal selectedProject={selectedProject} onClose={() => setSelectedProject(null)} />

        {isInfoOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-end bg-black/70 p-3 backdrop-blur-sm sm:items-center sm:justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsInfoOpen(false)}
          >
            <motion.div
              className="w-full max-w-2xl rounded-lg border border-white/10 bg-zinc-900 p-5 text-white shadow-2xl"
              initial={{ y: 32, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 20, opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="mb-3 flex items-start justify-between gap-4">
                <h4 className="font-[var(--font-bebas-neue)] text-4xl tracking-wide">{featuredProject.title}</h4>
                <button type="button" onClick={() => setIsInfoOpen(false)} className="rounded bg-zinc-700 px-2.5 py-1 text-sm hover:bg-zinc-600">
                  Fermer
                </button>
              </div>
              <p className="mb-4 text-sm text-zinc-300">Details techniques et approche produit.</p>
              <ul className="space-y-2 text-sm text-zinc-100">
                {featuredProject.technicalDetails.map((detail) => (
                  <li key={detail} className="rounded bg-black/40 px-3 py-2">{detail}</li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.main>
  );
}

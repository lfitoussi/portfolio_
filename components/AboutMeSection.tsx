import { motion } from "framer-motion";
import Image from "next/image";

type AboutMeSectionProps = {
  onBackHome: () => void;
};

const bulletPoints = [
  "Forme a l'Eugenia School : J'ai appris a transformer l'IA et la Data en outils puissants pour le marketing.",
  "Experience a Los Angeles : Un an d'immersion aux USA. Je suis bilingue et tres adaptable.",
  "Expert IA & Data : Je developpe des solutions intelligentes pour automatiser les taches (comme pour LVMH ou Fitlagree).",
  "Marketing & Design : Je cree des contenus visuels qui marquent les esprits (O'Tacos, Beaute d'Orient).",
  "Esprit d'equipe : Je cherche toujours la solution la plus simple et efficace pour avancer.",
];

const techStack = ["React", "AI", "Data", "Canva", "English"];

function BackIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
      <path d="M14.7 5.3a1 1 0 010 1.4L10.41 11H20a1 1 0 110 2h-9.59l4.3 4.3a1 1 0 11-1.42 1.4l-6-6a1 1 0 010-1.4l6-6a1 1 0 011.41 0z" />
    </svg>
  );
}

export default function AboutMeSection({ onBackHome }: AboutMeSectionProps) {
  return (
    <section className="px-3 pb-14 pt-14 sm:px-6 sm:pt-16">
      <div className="mx-auto flex min-h-[70vh] max-w-6xl flex-col justify-center rounded-2xl border border-white/10 bg-[radial-gradient(circle_at_top_left,_rgba(229,9,20,0.22),_transparent_40%),_linear-gradient(135deg,_#0f0f0f,_#070707)] p-6 sm:p-8">
        <div className="mb-6 flex items-center justify-between gap-3">
          <h2 className="font-[var(--font-bebas-neue)] text-5xl tracking-wide text-[#E50914] sm:text-6xl">
            A Propos de Moi
          </h2>
          <button
            type="button"
            onClick={onBackHome}
            className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black hover:bg-zinc-200"
          >
            <BackIcon />
            Retour
          </button>
        </div>

        <div className="grid items-center gap-6 lg:grid-cols-[1fr_auto_1fr]">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="rounded-xl border border-white/10 bg-black/35 p-4 sm:p-6"
          >
            <div className="space-y-3">
              {bulletPoints.map((bullet, index) => (
                <motion.p
                  key={bullet}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35, delay: 0.08 * index }}
                  className="text-sm leading-relaxed text-zinc-100 sm:text-base"
                >
                  <span className="mr-2 inline-block text-[#E50914]">•</span>
                  {bullet}
                </motion.p>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, ease: "easeOut", delay: 0.12 }}
            className="relative mx-auto h-52 w-40 overflow-hidden rounded-2xl border border-white/20 shadow-[0_0_40px_rgba(229,9,20,0.2)] sm:h-64 sm:w-48"
          >
            <Image
              src="/about-me.png"
              alt="Photo de profil"
              fill
              sizes="224px"
              className="object-cover"
            />
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut", delay: 0.1 }}
            className="rounded-xl border border-white/10 bg-black/35 p-4 sm:p-6"
          >
            <h3 className="mb-4 font-[var(--font-bebas-neue)] text-3xl tracking-wide text-white">
              Tech Stack
            </h3>
            <div className="space-y-2">
              {techStack.map((item) => (
                <div
                  key={item}
                  className="flex items-center justify-between rounded border border-white/10 bg-zinc-900/60 px-3 py-2 text-sm text-zinc-100"
                >
                  <span>{item}</span>
                  <span className="text-[#E50914]">●</span>
                </div>
              ))}
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}

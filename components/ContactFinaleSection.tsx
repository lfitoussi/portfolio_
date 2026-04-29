import { motion } from "framer-motion";
import { FormEvent, useMemo, useState } from "react";

type ContactFinaleSectionProps = {
  onBackHome: () => void;
};

const CONTACT = {
  linkedinUrl: "https://www.linkedin.com/in/lena-fitoussi-b45284382",
  email: "fitoussi@eugeniaschool.com",
  phone: "07 76 77 71 61",
};

function playUiClick() {
  if (typeof window === "undefined") return;
  try {
    const AudioCtx = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "triangle";
    osc.frequency.value = 620;
    gain.gain.value = 0.0001;
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    gain.gain.exponentialRampToValueAtTime(0.03, ctx.currentTime + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.08);
    osc.stop(ctx.currentTime + 0.09);
    window.setTimeout(() => {
      void ctx.close();
    }, 140);
  } catch {
    // no-op
  }
}

function BackIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
      <path d="M14.7 5.3a1 1 0 010 1.4L10.41 11H20a1 1 0 110 2h-9.59l4.3 4.3a1 1 0 11-1.42 1.4l-6-6a1 1 0 010-1.4l6-6a1 1 0 011.41 0z" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6 fill-current">
      <path d="M4.98 3.5a2.5 2.5 0 110 5 2.5 2.5 0 010-5zM3 9h4v12H3V9zm7 0h3.8v1.64h.05c.53-1 1.84-2.05 3.79-2.05C21 8.6 21 11 21 14v7h-4v-6.2c0-1.48-.03-3.4-2.07-3.4-2.07 0-2.39 1.62-2.39 3.29V21H10V9z" />
    </svg>
  );
}

function EnvelopeIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6 fill-current">
      <path d="M3 6a2 2 0 012-2h14a2 2 0 012 2v.4l-9 5.6-9-5.6V6zm0 2.7l8.47 5.28a1 1 0 001.06 0L21 8.7V18a2 2 0 01-2 2H5a2 2 0 01-2-2V8.7z" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6 fill-current">
      <path d="M6.6 10.8a15.3 15.3 0 006.6 6.6l2.2-2.2a1 1 0 011.02-.24c1.1.36 2.26.56 3.46.56a1 1 0 011 1V20a1 1 0 01-1 1C10.4 21 3 13.6 3 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.2.2 2.36.56 3.46a1 1 0 01-.24 1.02l-2.22 2.32z" />
    </svg>
  );
}

export default function ContactFinaleSection({ onBackHome }: ContactFinaleSectionProps) {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const mailtoHref = useMemo(
    () =>
      `mailto:${CONTACT.email}?subject=${encodeURIComponent("Nouvelle opportunite")}&body=${encodeURIComponent(
        "Bonjour, j'aimerais echanger avec vous concernant une opportunite.",
      )}`,
    [],
  );

  async function copyPhone() {
    try {
      await navigator.clipboard.writeText(CONTACT.phone);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    } catch {
      setCopied(false);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const subject = formData.subject || "Prise de contact";
    const body = [
      `Nom: ${formData.name || "-"}`,
      `Email: ${formData.email || "-"}`,
      "",
      formData.message || "",
    ].join("\n");
    const href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = href;
  }

  function handleReset() {
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  }

  return (
    <section className="px-3 pb-14 pt-8 sm:px-6 sm:pt-10">
      <div className="mx-auto flex min-h-[85vh] max-w-6xl flex-col rounded-2xl border border-white/10 bg-[radial-gradient(circle_at_top,_rgba(229,9,20,0.14),_transparent_45%),_linear-gradient(135deg,_#101010,_#0a0a0a)] p-5 sm:p-8 lg:p-10">
        <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="font-[var(--font-bebas-neue)] text-4xl tracking-wide text-white sm:text-6xl">
              Me Contacter
            </h2>
            <p className="mt-2 max-w-3xl text-sm uppercase tracking-[0.14em] text-zinc-400">
              N&apos;hesitez pas a me contacter pour discuter de projets, opportunites ou collaborations.
            </p>
          </div>
          <button
            type="button"
            onClick={onBackHome}
            className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-black/50 px-4 py-2 text-sm font-semibold text-white hover:bg-black/70"
          >
            <BackIcon />
            Retour a l&apos;accueil
          </button>
        </div>

        <div className="mb-8 grid gap-3 md:grid-cols-3">
          <motion.article
            className="group relative overflow-hidden rounded-xl border border-white/15 bg-[#161616] p-4"
            whileHover={{ y: -2 }}
            onHoverStart={playUiClick}
          >
            <div className="mb-3 text-white">
              <LinkedinIcon />
            </div>
            <h3 className="text-lg font-semibold text-white">LinkedIn</h3>
            <p className="mt-1 text-sm text-zinc-300">Suivre mon actualite professionnelle.</p>
            <a
              href={CONTACT.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center rounded bg-white px-3 py-1.5 text-sm font-semibold text-black"
            >
              Connect
            </a>
          </motion.article>

          <motion.article
            className="relative overflow-hidden rounded-xl border border-white/15 bg-[#161616] p-4"
            whileHover={{ y: -2 }}
            onHoverStart={playUiClick}
          >
            <div className="mb-3 text-white">
              <EnvelopeIcon />
            </div>
            <h3 className="text-lg font-semibold text-white">Email</h3>
            <p className="mt-1 text-sm text-zinc-300">Disponible pour de nouvelles opportunites.</p>
            <a href={mailtoHref} className="mt-4 inline-flex items-center rounded bg-zinc-700 px-3 py-1.5 text-sm font-semibold text-white hover:bg-zinc-600">
              Send Message
            </a>
          </motion.article>

          <motion.article
            className="relative overflow-hidden rounded-xl border border-white/15 bg-[#161616] p-4"
            whileHover={{ y: -2 }}
            onHoverStart={playUiClick}
          >
            <div className="mb-3 text-white">
              <PhoneIcon />
            </div>
            <h3 className="text-lg font-semibold text-white">Hotline</h3>
            <p className="mt-1 text-sm text-zinc-300">Reponse rapide & Appels.</p>
            <p className="mt-4 text-sm font-medium text-white">{CONTACT.phone}</p>
            <button
              type="button"
              onClick={copyPhone}
              className="mt-2 inline-flex rounded bg-zinc-700 px-3 py-1.5 text-sm font-semibold text-white hover:bg-zinc-600"
            >
              {copied ? "Numero copie !" : "Copier le numero"}
            </button>
          </motion.article>
        </div>

        <div className="mt-auto rounded-xl border border-white/10 bg-black/35 p-5 sm:p-6">
          <div className="mb-5 space-y-1 text-sm text-zinc-200">
            <p>
              <span className="font-semibold text-white">Mon mail :</span> {CONTACT.email}
            </p>
            <p>
              <span className="font-semibold text-white">Mon lien LinkedIn :</span>{" "}
              <a href={CONTACT.linkedinUrl} target="_blank" rel="noreferrer" className="underline decoration-zinc-500 underline-offset-2 hover:text-white">
                linkedin.com/in/lena-fitoussi-b45284382
              </a>
            </p>
            <p>
              <span className="font-semibold text-white">Mon numero de telephone :</span> {CONTACT.phone}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <input
                type="text"
                placeholder="Votre nom"
                value={formData.name}
                onChange={(event) => setFormData((prev) => ({ ...prev, name: event.target.value }))}
                className="rounded border border-white/15 bg-[#121212] px-4 py-3 text-sm text-white placeholder:text-zinc-500 focus:border-[#E50914] focus:outline-none"
              />
              <input
                type="email"
                placeholder="Votre email"
                value={formData.email}
                onChange={(event) => setFormData((prev) => ({ ...prev, email: event.target.value }))}
                className="rounded border border-white/15 bg-[#121212] px-4 py-3 text-sm text-white placeholder:text-zinc-500 focus:border-[#E50914] focus:outline-none"
              />
            </div>

            <input
              type="text"
              placeholder="Sujet"
              value={formData.subject}
              onChange={(event) => setFormData((prev) => ({ ...prev, subject: event.target.value }))}
              className="w-full rounded border border-white/15 bg-[#121212] px-4 py-3 text-sm text-white placeholder:text-zinc-500 focus:border-[#E50914] focus:outline-none"
            />

            <textarea
              placeholder="Votre message"
              rows={6}
              value={formData.message}
              onChange={(event) => setFormData((prev) => ({ ...prev, message: event.target.value }))}
              className="w-full resize-y rounded border border-white/15 bg-[#121212] px-4 py-3 text-sm text-white placeholder:text-zinc-500 focus:border-[#E50914] focus:outline-none"
            />

            <div className="flex flex-wrap gap-3">
              <button
                type="submit"
                className="rounded border border-white/25 bg-white px-6 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-black hover:bg-zinc-200"
              >
                Envoyer le message
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="rounded border border-white/25 bg-transparent px-6 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-white hover:bg-white/10"
              >
                Effacer
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

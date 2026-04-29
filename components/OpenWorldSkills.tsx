import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { SKILL_POIS, WORLD_SIZE, type SkillPoi } from "@/data/skillsWorld";

type Vec2 = { x: number; y: number };

const BASE_STATS = {
  adaptability: 92,
  vision: 89,
};

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

export default function OpenWorldSkills() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [avatar, setAvatar] = useState<Vec2>({ x: 680, y: 640 });
  const [target, setTarget] = useState<Vec2 | null>(null);
  const [moving, setMoving] = useState(false);
  const [unlocked, setUnlocked] = useState<string[]>([]);
  const [popupSkill, setPopupSkill] = useState<SkillPoi | null>(null);
  const [discoverText, setDiscoverText] = useState<string | null>(null);
  const [selectedFromLog, setSelectedFromLog] = useState<SkillPoi | null>(null);
  const [stats, setStats] = useState(BASE_STATS);
  const pressed = useRef<Record<string, boolean>>({});

  useEffect(() => {
    const interval = window.setInterval(() => {
      const randomShift = () => Math.floor(Math.random() * 11) - 5;
      setStats({
        adaptability: BASE_STATS.adaptability + randomShift(),
        vision: BASE_STATS.vision + randomShift(),
      });
    }, 1500);

    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      const key = event.key.toLowerCase();
      if (["z", "q", "s", "d", "arrowup", "arrowleft", "arrowdown", "arrowright"].includes(key)) {
        pressed.current[key] = true;
      }
    }
    function onKeyUp(event: KeyboardEvent) {
      pressed.current[event.key.toLowerCase()] = false;
    }
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, []);

  useEffect(() => {
    let frameId = 0;
    let lastTime = performance.now();

    function tick(now: number) {
      const dt = (now - lastTime) / 1000;
      lastTime = now;
      const speed = 220;
      let vx = 0;
      let vy = 0;

      if (pressed.current.z || pressed.current.arrowup) vy -= 1;
      if (pressed.current.s || pressed.current.arrowdown) vy += 1;
      if (pressed.current.q || pressed.current.arrowleft) vx -= 1;
      if (pressed.current.d || pressed.current.arrowright) vx += 1;

      setAvatar((previous) => {
        let next = previous;

        if (vx !== 0 || vy !== 0) {
          const length = Math.hypot(vx, vy) || 1;
          next = {
            x: clamp(previous.x + (vx / length) * speed * dt, 60, WORLD_SIZE.width - 60),
            y: clamp(previous.y + (vy / length) * speed * dt, 60, WORLD_SIZE.height - 60),
          };
          setTarget(null);
          setMoving(true);
        } else if (target) {
          const dx = target.x - previous.x;
          const dy = target.y - previous.y;
          const distance = Math.hypot(dx, dy);
          if (distance < 8) {
            setTarget(null);
            setMoving(false);
          } else {
            next = {
              x: clamp(previous.x + (dx / distance) * speed * dt, 60, WORLD_SIZE.width - 60),
              y: clamp(previous.y + (dy / distance) * speed * dt, 60, WORLD_SIZE.height - 60),
            };
            setMoving(true);
          }
        } else {
          setMoving(false);
        }

        SKILL_POIS.forEach((poi) => {
          if (unlocked.includes(poi.id)) return;
          const distance = Math.hypot(next.x - poi.x, next.y - poi.y);
          if (distance < 95) {
            setUnlocked((prev) => [...prev, poi.id]);
            setPopupSkill(poi);
            setDiscoverText(`Competence decouverte: ${poi.name}`);
            window.setTimeout(() => setDiscoverText(null), 1800);
          }
        });

        return next;
      });

      frameId = requestAnimationFrame(tick);
    }

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [target, unlocked]);

  function handleWorldPointer(clientX: number, clientY: number) {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = clientX - centerX;
    const dy = clientY - centerY;
    setTarget({
      x: clamp(avatar.x + dx, 60, WORLD_SIZE.width - 60),
      y: clamp(avatar.y + dy, 60, WORLD_SIZE.height - 60),
    });
  }

  return (
    <section className="mt-7 px-3 sm:px-6">
      <div className="mb-4 flex items-center justify-between rounded-lg border border-white/10 bg-black/45 px-4 py-3">
        <div />
        <div className="text-right text-xs text-zinc-300">
          <p>Adaptability: {stats.adaptability}%</p>
          <p>Cultural Vision: {stats.vision}%</p>
        </div>
      </div>

      <div
        ref={containerRef}
        className="relative h-[62vh] min-h-[460px] overflow-hidden rounded-xl border border-white/10 bg-[#0b0f1c]"
        onClick={(event) => handleWorldPointer(event.clientX, event.clientY)}
        onTouchStart={(event) => {
          const touch = event.touches[0];
          if (touch) handleWorldPointer(touch.clientX, touch.clientY);
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            transform: `translate(${-(avatar.x - 520)}px, ${-(avatar.y - 260)}px)`,
            width: WORLD_SIZE.width,
            height: WORLD_SIZE.height,
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 20% 20%, rgba(34,197,94,0.24), transparent 28%), radial-gradient(circle at 78% 30%, rgba(59,130,246,0.2), transparent 26%), linear-gradient(140deg, #10211a 0%, #132d24 30%, #1a2c48 62%, #222 100%)",
            }}
          />
          <div className="absolute inset-0 opacity-35 [background-size:220px_220px]" style={{ backgroundImage: "radial-gradient(circle at center, rgba(255,255,255,0.14) 0, rgba(255,255,255,0.06) 20%, transparent 22%)" }} />
          <div className="absolute inset-0 opacity-18 [background-size:96px_96px]" style={{ backgroundImage: "linear-gradient(to right, rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.2) 1px, transparent 1px)" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.05), rgba(0,0,0,0.25))" }} />
          <div className="absolute left-[240px] top-[260px] h-16 w-[920px] rotate-[18deg] rounded-full bg-[#ffd166]/30 blur-sm" />
          <div className="absolute left-[980px] top-[880px] h-16 w-[680px] -rotate-[12deg] rounded-full bg-[#ffd166]/30 blur-sm" />
          <div className="absolute left-[1760px] top-[420px] h-14 w-[540px] rotate-[24deg] rounded-full bg-[#ffd166]/35 blur-sm" />
          <div className="absolute left-[420px] top-[1060px] h-52 w-52 rounded-full border border-cyan-300/25 bg-cyan-200/10" />
          <div className="absolute left-[1540px] top-[240px] h-40 w-40 rounded-full border border-emerald-300/25 bg-emerald-200/10" />
          <div className="absolute left-[2110px] top-[1120px] h-36 w-36 rounded-full border border-fuchsia-300/25 bg-fuchsia-200/10" />
          <div className="absolute left-[520px] top-[330px] rounded bg-black/35 px-2 py-1 text-[10px] uppercase tracking-widest text-zinc-100">
            Downtown Quest Zone
          </div>
          <div className="absolute left-[1730px] top-[980px] rounded bg-black/35 px-2 py-1 text-[10px] uppercase tracking-widest text-zinc-100">
            Pacific Skills District
          </div>

          {SKILL_POIS.map((poi) => {
            const isUnlocked = unlocked.includes(poi.id);
            return (
              <motion.div
                key={poi.id}
                className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full border px-3 py-1 text-xs font-semibold ${isUnlocked ? "border-emerald-400 bg-emerald-400/20 text-emerald-200" : "border-[#E50914] bg-[#E50914]/20 text-white"}`}
                style={{ left: poi.x, top: poi.y }}
                animate={{ scale: isUnlocked ? 1 : [1, 1.08, 1] }}
                transition={{ repeat: isUnlocked ? 0 : Infinity, duration: 1.7 }}
              >
                {poi.label}
              </motion.div>
            );
          })}

          <motion.div
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: avatar.x, top: avatar.y }}
            animate={moving ? { y: [0, -4, 0] } : { y: 0 }}
            transition={{ repeat: moving ? Infinity : 0, duration: 0.4 }}
          >
            <div className="relative h-12 w-10">
              <div className="absolute left-1/2 top-0 h-4 w-4 -translate-x-1/2 rounded-full bg-[#f7c9a1]" />
              <div className="absolute left-1/2 top-0.5 h-2 w-5 -translate-x-1/2 rounded-full bg-[#1f1035]" />
              <div className="absolute left-1/2 top-4 h-6 w-7 -translate-x-1/2 rounded-md bg-[#5a4bff]" />
              <div className="absolute bottom-0 left-1 h-4 w-3 rounded bg-[#1e293b]" />
              <div className="absolute bottom-0 right-1 h-4 w-3 rounded bg-[#1e293b]" />
            </div>
          </motion.div>
        </div>

        <AnimatePresence>
          {discoverText && (
            <motion.div
              className="absolute left-1/2 top-6 -translate-x-1/2 rounded bg-[#E50914] px-4 py-2 text-sm font-bold text-white"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
            >
              {discoverText}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-4 rounded-lg border border-white/10 bg-black/35 p-3">
        <p className="mb-4 text-center font-[var(--font-bebas-neue)] text-2xl tracking-wide text-white sm:text-3xl">
          Navigue avec les fleches pour debloquer mes competences
        </p>
        <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-zinc-200">
          COMPETENCES DEBLOQUEES (QUEST LOG)
        </h4>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {SKILL_POIS.map((poi) => {
            const isUnlocked = unlocked.includes(poi.id);
            return (
              <button
                key={poi.id}
                type="button"
                className={`relative min-w-[170px] overflow-hidden rounded-md border text-left ${isUnlocked ? "border-emerald-400/60 bg-zinc-900" : "border-zinc-700 bg-zinc-900/70"}`}
                onClick={() => isUnlocked && setSelectedFromLog(poi)}
              >
                {isUnlocked ? (
                  <>
                    <video src={poi.video} className="h-20 w-full object-cover" autoPlay muted loop playsInline />
                    <div className="p-2">
                      <p className="text-xs font-semibold text-white">{poi.name}</p>
                      <p className="text-[11px] text-emerald-300">Lvl {poi.level}</p>
                    </div>
                  </>
                ) : (
                  <div className="grid h-[108px] place-items-center text-sm text-zinc-500">Verrouille</div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {popupSkill && (
          <motion.div
            className="fixed inset-0 z-50 flex items-end bg-black/60 p-2 sm:items-center sm:justify-center sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPopupSkill(null)}
          >
            <motion.div
              className="w-full max-w-3xl overflow-hidden rounded-xl border border-white/10 bg-[#181818]"
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 18, opacity: 0 }}
              onClick={(event) => event.stopPropagation()}
            >
              <video src={popupSkill.video} className="h-56 w-full object-cover sm:h-72" autoPlay muted loop playsInline />
              <div className="space-y-3 p-5 text-white">
                <h5 className="font-[var(--font-bebas-neue)] text-4xl tracking-wide">{popupSkill.name}</h5>
                <p className="text-sm text-zinc-200">{popupSkill.details}</p>
                <button
                  type="button"
                  onClick={() => setPopupSkill(null)}
                  className="rounded bg-white px-4 py-2 text-sm font-semibold text-black"
                >
                  Continuer la quete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {selectedFromLog && (
          <motion.div
            className="fixed inset-0 z-50 flex items-end bg-black/60 p-2 sm:items-center sm:justify-center sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedFromLog(null)}
          >
            <motion.div
              className="w-full max-w-3xl overflow-hidden rounded-xl border border-white/10 bg-[#181818]"
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 18, opacity: 0 }}
              onClick={(event) => event.stopPropagation()}
            >
              <video src={selectedFromLog.video} className="h-56 w-full object-cover sm:h-72" autoPlay muted loop playsInline />
              <div className="space-y-2 p-5 text-white">
                <h5 className="font-[var(--font-bebas-neue)] text-4xl tracking-wide">{selectedFromLog.name}</h5>
                <p className="text-sm text-zinc-300">{selectedFromLog.details}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

import { motion } from "framer-motion";

type SplashScreenProps = {
  onComplete: () => void;
};

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  return (
    <motion.section
      className="splash-screen"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45, ease: "easeInOut" }}
      aria-label="Netflix style intro"
    >
      <motion.div
        className="splash-glow"
        initial={{ scale: 0.95, opacity: 0.75 }}
        animate={{ scale: [0.95, 1.08, 1], opacity: [0.75, 1, 0.9] }}
        transition={{ duration: 1.2, times: [0, 0.55, 1], ease: "easeOut" }}
      />
      <motion.span
        className="splash-logo"
        initial={{ scale: 0.3, opacity: 0 }}
        animate={{ scale: [0.3, 1.2, 1], opacity: [0, 1, 1] }}
        transition={{ duration: 1.4, times: [0, 0.65, 1], ease: "easeOut" }}
        onAnimationComplete={onComplete}
      >
        N
      </motion.span>
    </motion.section>
  );
}

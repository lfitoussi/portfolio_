import { motion } from "framer-motion";

export type PortfolioSection = "projects" | "skills" | "contact" | "about";

export type Profile = {
  id: PortfolioSection;
  name: string;
  accent: string;
};

type ProfileSelectionProps = {
  profiles: Profile[];
  onSelect: (profileId: PortfolioSection) => void;
};

export default function ProfileSelection({
  profiles,
  onSelect,
}: ProfileSelectionProps) {
  return (
    <motion.section
      className="profile-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45, ease: "easeInOut" }}
    >
      <motion.h1
        className="screen-title"
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        Qui est-ce ?
      </motion.h1>

      <div className="profiles-grid">
        {profiles.map((profile, index) => (
          <motion.button
            key={profile.id}
            className="profile-card"
            type="button"
            onClick={() => onSelect(profile.id)}
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.45, delay: 0.1 * index, ease: "easeOut" }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <span
              className="profile-avatar"
              style={{ background: profile.accent }}
              aria-hidden="true"
            >
              {profile.name.charAt(0)}
            </span>
            <span className="profile-name">{profile.name}</span>
          </motion.button>
        ))}
      </div>
    </motion.section>
  );
}

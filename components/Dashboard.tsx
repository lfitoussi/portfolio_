import { motion } from "framer-motion";
import Image from "next/image";
import type { PortfolioSection } from "@/components/ProfileSelection";
import {
  featuredProject,
  languages,
  tools,
  topProjects,
  type DashboardCard,
} from "@/data/dashboard";

type DashboardProps = {
  activeSection: PortfolioSection | null;
};

function Card({
  item,
  index,
  showRank = false,
}: {
  item: DashboardCard;
  index: number;
  showRank?: boolean;
}) {
  return (
    <motion.article className="row-card-wrap" whileHover={{ scale: 1.08, zIndex: 12 }}>
      {showRank && <span className="top-rank">{index + 1}</span>}
      <div className="row-card">
        <Image src={item.image} alt={item.title} fill sizes="(max-width: 520px) 56vw, 270px" />
        <div className="row-overlay">
          <h4>{item.title}</h4>
          <p>{item.description}</p>
        </div>
      </div>
      <span className="row-card-caption">{item.subtitle}</span>
    </motion.article>
  );
}

function ContentRow({
  title,
  items,
  top10 = false,
}: {
  title: string;
  items: DashboardCard[];
  top10?: boolean;
}) {
  return (
    <section className="content-row">
      <h3>{title}</h3>
      <div className="row-scroll">
        {items.map((item, index) => (
          <Card key={item.id} item={item} index={index} showRank={top10} />
        ))}
      </div>
    </section>
  );
}

export default function Dashboard({ activeSection }: DashboardProps) {
  return (
    <motion.main
      className="dashboard"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      <section className="billboard">
        <Image
          src={featuredProject.image}
          alt={featuredProject.title}
          fill
          priority
          sizes="100vw"
        />
        <div className="billboard-layer" />
        <div className="billboard-content">
          <span className="billboard-tag">{featuredProject.tag}</span>
          <h2>{featuredProject.title}</h2>
          <p>{featuredProject.description}</p>
          <div className="billboard-actions">
            <a href={featuredProject.demoUrl} target="_blank" rel="noreferrer">
              Play
            </a>
            <a href={featuredProject.codeUrl} target="_blank" rel="noreferrer">
              More Info
            </a>
          </div>
          {activeSection && <small>Profil actif: {activeSection}</small>}
        </div>
      </section>

      <ContentRow title="Top 10 de mes Projets" items={topProjects} top10 />
      <ContentRow title="Mes Langages de programmation" items={languages} />
      <ContentRow title="Outils & Technologies" items={tools} />
    </motion.main>
  );
}

import Head from "next/head";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Bebas_Neue, Inter } from "next/font/google";
import ProfileSelection, {
  type PortfolioSection,
} from "@/components/ProfileSelection";
import SplashScreen from "@/components/SplashScreen";
import Dashboard from "@/components/Dashboard";
import { portfolioProfiles } from "@/data/profiles";

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",
  weight: "400",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export default function Home() {
  const [stage, setStage] = useState<"splash" | "profiles" | "dashboard">(
    "splash",
  );
  const [activeSection, setActiveSection] = useState<PortfolioSection | null>(
    null,
  );

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setStage("profiles");
    }, 1650);

    return () => window.clearTimeout(timeoutId);
  }, []);

  function handleSplashComplete() {
    setStage("profiles");
  }

  function handleSelectProfile(profileId: PortfolioSection) {
    setActiveSection(profileId);
    setStage("dashboard");
  }

  return (
    <>
      <Head>
        <title>Portfolio Netflix Experience</title>
        <meta
          name="description"
          content="Portfolio interactif inspire par l'univers Netflix."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={`portfolio-root ${bebasNeue.variable} ${inter.variable}`}>
        <AnimatePresence mode="wait">
          {stage === "splash" && <SplashScreen key="splash" onComplete={handleSplashComplete} />}

          {stage === "profiles" && (
            <ProfileSelection
              key="profiles"
              profiles={portfolioProfiles}
              onSelect={handleSelectProfile}
            />
          )}

          {stage === "dashboard" && (
            <Dashboard key="dashboard" activeSection={activeSection} />
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

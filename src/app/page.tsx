import { Hero } from "@/components/landing/Hero";
import { Bubbles } from "@/components/landing/Bubbles";
import { Story } from "@/components/landing/Story";
import { Features } from "@/components/landing/Features";
import { TechScroller } from "@/components/landing/TechScroller";
import { Team } from "@/components/landing/Team";
import { Footer } from "@/components/landing/Footer";
import { RevealSection } from "@/components/landing/RevealSection";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function Home() {
  return (
    <main className="landing">
      <div className="theme-fab"><ThemeToggle /></div>
      <Hero />
      <RevealSection><Bubbles /></RevealSection>
      <RevealSection><Story /></RevealSection>
      <RevealSection><Features /></RevealSection>
      <RevealSection><TechScroller /></RevealSection>
      <RevealSection><Team /></RevealSection>
      <Footer />
    </main>
  );
}

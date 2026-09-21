import { Atom, Box, Boxes, Cloud, Code2, Github, Hexagon, LayoutTemplate, Sparkles } from "lucide-react";
import { TECH_STACK } from "@/lib/constants";

const ICONS: Record<string, typeof Cloud> = {
  "Microsoft": LayoutTemplate,
  "Microsoft Azure": Cloud,
  "Microsoft Foundry": Sparkles,
  "Node.js": Hexagon,
  "Next.js": Box,
  "GitHub": Github,
  "Docker": Boxes,
  "TypeScript": Code2,
  "React": Atom,
};

export function TechScroller() {
  const loop = [...TECH_STACK, ...TECH_STACK];
  return (
    <section className="tech-section">
      <span className="story-label" style={{ justifyContent: "center" }}>Technology &amp; innovation</span>
      <h2>Powered by a modern, enterprise-grade stack</h2>
      <p>Built end to end on tools trusted by engineering teams worldwide.</p>
      <div className="tech-scroller">
        <div className="tech-track">
          {loop.map((tech, index) => {
            const Icon = ICONS[tech] ?? Sparkles;
            return <div className="tech-chip" key={`${tech}-${index}`}><Icon size={17} /> {tech}</div>;
          })}
        </div>
      </div>
    </section>
  );
}

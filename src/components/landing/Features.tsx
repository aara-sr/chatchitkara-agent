import Link from "next/link";
import { ArrowRight, BadgeCheck, Clock, Layers, MessagesSquare, ShieldCheck, Sparkles } from "lucide-react";
import { AGENT_CAPABILITIES } from "@/lib/constants";

const ICONS = [Sparkles, BadgeCheck, Clock, MessagesSquare, ShieldCheck, Layers];

export function Features() {
  return (
    <section className="features">
      <div className="features-head">
        <div>
          <span className="story-label" style={{ color: "var(--tan)" }}>What can I do for you?</span>
          <h2>An agent built to know your organization inside out.</h2>
        </div>
        <p>From day-one onboarding to deep policy lookups, the agent turns scattered documentation into instant, trustworthy answers.</p>
      </div>
      <div className="feature-grid">
        {AGENT_CAPABILITIES.map((capability, index) => {
          const Icon = ICONS[index % ICONS.length];
          return (
            <div className="feature-card" key={capability.title}>
              <div className="feature-icon"><Icon size={20} /></div>
              <h3>{capability.title}</h3>
              <p>{capability.description}</p>
            </div>
          );
        })}
      </div>
      <div className="features-cta">
        <Link href="/chat" className="btn-primary">Ask the agent <ArrowRight size={17} /></Link>
      </div>
    </section>
  );
}

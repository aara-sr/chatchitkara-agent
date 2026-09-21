import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section className="hero">
      <span className="hero-eyebrow"><Sparkles size={13} /> Enterprise knowledge, on demand</span>
      <h1>Chitkara Knowledge <span>Enterprise</span> Agent</h1>
      <p className="hero-sub">Explore Your Potential</p>
      <div className="hero-actions">
        <Link href="/chat" className="btn-primary">Start chatting <ArrowRight size={17} /></Link>
        <a href="#story" className="btn-secondary">Learn more</a>
      </div>
    </section>
  );
}

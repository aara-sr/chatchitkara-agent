import Link from "next/link";
import { ArrowRight, Users } from "lucide-react";
import { TEAM_MEMBERS } from "@/lib/constants";

function initials(name: string) {
  return name.split(" ").filter(Boolean).slice(0, 2).map((part) => part[0]).join("").toUpperCase();
}

export function Team() {
  return (
    <section className="about">
      <div className="about-head">
        <span className="story-label" style={{ justifyContent: "center" }}><Users size={14} /> About us</span>
        <h2>The people behind the agent</h2>
        <p>A small team that cares a lot about making enterprise knowledge easy to find.</p>
      </div>
      <div className="team-grid">
        {TEAM_MEMBERS.map((member) => (
          <div className="team-card" key={member.name}>
            <div className="team-avatar">{initials(member.name)}</div>
            <div className="team-role">{member.role}</div>
            <h3>{member.name}</h3>
            <p className="team-motto">&quot;{member.motto}&quot;</p>
          </div>
        ))}
      </div>
      <div className="about-cta">
        <Link href="/chat" className="btn-primary">Chat with the agent <ArrowRight size={17} /></Link>
      </div>
    </section>
  );
}

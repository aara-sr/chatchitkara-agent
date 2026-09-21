import { BookOpen } from "lucide-react";

export function Story() {
  return (
    <section id="story" className="story">
      <div>
        <span className="story-label"><BookOpen size={14} /> Our story</span>
        <h2>Why we built this</h2>
      </div>
      <div className="story-body">
        <p>
          We built this because knowledge should be easy to access, not buried across documents, emails, and repeated questions. At Chitkara, people need fast, reliable answers to academic, operational, and institutional questions, but the information they need is often scattered and hard to find. We wanted a simpler way to ask a question in plain language and get a trusted answer grounded in the organization’s own knowledge.
        </p>
        <p>
          This is designed to be practical and secure: a public front end that feels effortless to use, while the backend handles the sensitive work of connecting to enterprise systems and knowledge sources. It reduces friction, saves time, and makes institutional knowledge more useful to everyone—without exposing critical systems or putting security in the browser. In short, we built this so knowledge becomes immediate, accessible, and genuinely helpful.
        </p>
        <p className="story-quote">&quot;Knowledge should never be more than a question away.&quot;</p>
      </div>
    </section>
  );
}

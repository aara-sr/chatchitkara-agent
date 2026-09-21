import Link from "next/link";
import { ExternalLink, Globe, Mail, MessageCircle } from "lucide-react";

export function Footer() {
  return (
    <footer className="landing-footer">
      <div className="footer-top">
        <div>
          <Link href="/" className="footer-brand">
            <span className="brand-mark">CE</span>
            <strong>Chitkara Knowledge Agent</strong>
          </Link>
          <p>An enterprise knowledge assistant built for Chitkara University — ask a question, get a grounded, cited answer.</p>
        </div>
        <div className="footer-col">
          <h4>Contact</h4>
          <ul>
            <li><a href="mailto:info@chitkara.edu.in"><Mail size={14} /> info@chitkara.edu.in</a></li>
            <li><a href="mailto:admissions@chitkara.edu.in"><Mail size={14} /> admissions@chitkara.edu.in</a></li>
            <li><Link href="/chat"><MessageCircle size={14} /> Open the chat agent</Link></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Learn more</h4>
          <ul>
            <li><a href="https://www.chitkara.edu.in" target="_blank" rel="noreferrer"><Globe size={14} /> Chitkara University <ExternalLink size={12} /></a></li>
            <li><a href="https://en.wikipedia.org/wiki/Chitkara_University" target="_blank" rel="noreferrer"><Globe size={14} /> Wikipedia <ExternalLink size={12} /></a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Chitkara Enterprise Knowledge Agent. All rights reserved.</span>
        <span>Built with care by the Chitkara team.</span>
      </div>
    </footer>
  );
}

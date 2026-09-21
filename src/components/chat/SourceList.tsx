import { ExternalLink, FileText } from "lucide-react";
import { Source } from "@/lib/types";

export function SourceList({ sources }: { sources?: Source[] }) {
  if (!sources?.length) return null;
  return <section className="sources" aria-label="Sources"><div className="sources-label">Sources</div><div className="source-grid">{sources.map((source, index) => {
    const card = <><FileText size={15} /><span><strong>{source.title}</strong><small>{source.page ? `Knowledge base · Page ${source.page}` : source.excerpt ?? "Knowledge base reference"}</small></span>{source.url && <ExternalLink size={14} />}</>;
    return source.url ? <a className="source-card" href={source.url} target="_blank" rel="noreferrer" key={`${source.title}-${index}`}>{card}</a> : <div className="source-card" key={`${source.title}-${index}`}>{card}</div>;
  })}</div></section>;
}

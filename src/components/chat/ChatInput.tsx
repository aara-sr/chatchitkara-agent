"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { ArrowUp, Square } from "lucide-react";

export function ChatInput({ onSend, onStop, isStreaming, autoFocus }: { onSend: (value: string) => void; onStop: () => void; isStreaming: boolean; autoFocus?: boolean }) {
  const [value, setValue] = useState("");
  const ref = useRef<HTMLTextAreaElement>(null);
  useEffect(() => { if (autoFocus) ref.current?.focus(); }, [autoFocus]);
  useEffect(() => { const element = ref.current; if (!element) return; element.style.height = "auto"; element.style.height = `${Math.min(element.scrollHeight, 168)}px`; }, [value]);
  const submit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); if (value.trim() && !isStreaming) { onSend(value); setValue(""); } };
  return <form className="composer" onSubmit={submit}><textarea ref={ref} value={value} onChange={(event) => setValue(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); event.currentTarget.form?.requestSubmit(); } }} placeholder="Ask about policies, guidelines, or anything in the knowledge base..." rows={1} aria-label="Message" disabled={isStreaming} /><button type={isStreaming ? "button" : "submit"} onClick={isStreaming ? onStop : undefined} className={`send-button ${isStreaming ? "stop-button" : ""}`} aria-label={isStreaming ? "Stop generation" : "Send message"} disabled={!isStreaming && !value.trim()}>{isStreaming ? <Square size={15} fill="currentColor" /> : <ArrowUp size={18} />}</button><div className="composer-note">Chitkara Enterprise Knowledge · Answers are generated from your organization&apos;s knowledge base</div></form>;
}

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Copy, UserRound, Sparkles } from "lucide-react";
import { ChatMessage as Message } from "@/lib/types";
import { SourceList } from "./SourceList";

function codeText(children: unknown): string {
  if (Array.isArray(children)) return children.map((child) => codeText(child)).join("");
  if (typeof children === "string" || typeof children === "number") return String(children);
  return "";
}

export function ChatMessage({ message }: { message: Message }) {
  const isUser = message.role === "user";
  return <article className={`message-row ${isUser ? "user-row" : "assistant-row"}`}><div className={`message-avatar ${isUser ? "user-avatar" : "assistant-avatar"}`}>{isUser ? <UserRound size={15} /> : <Sparkles size={15} />}</div><div className="message-body"><div className="message-meta">{isUser ? "You" : "Knowledge agent"}</div>{message.content ? <div className="markdown"><ReactMarkdown remarkPlugins={[remarkGfm]} components={{ pre: ({ children }) => <div className="code-wrap"><button className="copy-code" aria-label="Copy code" onClick={() => navigator.clipboard?.writeText(codeText(children))}><Copy size={13} /> Copy</button><pre>{children}</pre></div>, a: ({ href, children }) => <a href={href} target="_blank" rel="noreferrer">{children}</a> }}>{message.content}</ReactMarkdown></div> : <span className="cursor" aria-label="Generating response" />}{!isUser && <SourceList sources={message.sources} />}</div></article>;
}

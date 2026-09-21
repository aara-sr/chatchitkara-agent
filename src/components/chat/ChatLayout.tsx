"use client";

import { useEffect, useMemo, useState } from "react";
import { Menu, RotateCcw, Sparkles } from "lucide-react";
import { useConversations } from "@/hooks/useConversations";
import { useChat } from "@/hooks/useChat";
import { APP_DESCRIPTION, APP_NAME, SUGGESTED_PROMPTS } from "@/lib/constants";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { Sidebar } from "./Sidebar";

export function ChatLayout() {
  const { conversations, ready, addConversation, removeConversation, update } = useConversations();
  const [activeId, setActiveId] = useState<string>();
  const [pendingMessage, setPendingMessage] = useState<string>();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  useEffect(() => {
    if (!ready || activeId || !conversations[0]) return;
    const timer = window.setTimeout(() => setActiveId(conversations[0].id), 0);
    return () => window.clearTimeout(timer);
  }, [ready, activeId, conversations]);
  const active = useMemo(() => conversations.find((conversation) => conversation.id === activeId), [activeId, conversations]);
  const onUpdate = (patch: Parameters<typeof update>[1]) => { if (active) update(active.id, patch); };
  const { sendMessage, stop, isStreaming, error, clearError } = useChat(active, onUpdate);
  useEffect(() => {
    if (!active || !pendingMessage) return;
    const message = pendingMessage;
    const timer = window.setTimeout(() => { setPendingMessage(undefined); void sendMessage(message); }, 0);
    return () => window.clearTimeout(timer);
  }, [active, pendingMessage, sendMessage]);
  const newChat = () => { const conversation = addConversation(); setActiveId(conversation.id); setSidebarOpen(false); };
  const send = (message: string) => { if (!active) { const conversation = addConversation(); setActiveId(conversation.id); setPendingMessage(message); } else void sendMessage(message); };
  return <main className="app-shell"><div className={`sidebar-overlay ${sidebarOpen ? "visible" : ""}`} onClick={() => setSidebarOpen(false)} /><Sidebar conversations={conversations} activeId={activeId} onSelect={(id) => { setActiveId(id); setSidebarOpen(false); }} onNew={newChat} onDelete={(id) => { removeConversation(id); if (id === activeId) setActiveId(undefined); }} open={sidebarOpen} onClose={() => setSidebarOpen(false)} /><section className="chat-panel"><header className="chat-header"><button className="icon-button menu-button" onClick={() => setSidebarOpen(true)} aria-label="Open sidebar"><Menu size={20} /></button><div className="header-title"><span className="eyebrow"><span className="live-dot" /> Private knowledge workspace</span><h1>{active?.title ?? APP_NAME}</h1></div><button className="header-new" onClick={newChat}><Sparkles size={15} /> New chat</button></header><div className="messages" aria-live="polite">{!active?.messages.length ? <div className="empty-state"><div className="hero-icon"><Sparkles size={25} /></div><div className="eyebrow">Enterprise knowledge, made clear</div><h2>How can I help?</h2><p>{APP_DESCRIPTION}</p><div className="prompt-grid">{SUGGESTED_PROMPTS.map((prompt) => <button key={prompt} onClick={() => send(prompt)}>{prompt}<span>↗</span></button>)}</div></div> : <div className="message-list">{active.messages.map((message) => <ChatMessage message={message} key={message.id} />)}{error && <div className="error-box"><span>{error}</span><button onClick={() => { clearError(); const last = active.messages.findLast((message) => message.role === "user"); if (last) sendMessage(last.content); }}><RotateCcw size={14} /> Retry</button></div>}</div>}</div><div className="input-dock"><ChatInput onSend={send} onStop={stop} isStreaming={isStreaming} autoFocus={!active?.messages.length} /></div></section></main>;
}

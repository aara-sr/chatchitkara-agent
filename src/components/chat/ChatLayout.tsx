"use client";

import { useEffect, useMemo, useState } from "react";
import { PanelLeft, Plus, RotateCcw, Sparkles } from "lucide-react";
import { useConversations } from "@/hooks/useConversations";
import { useChat } from "@/hooks/useChat";
import { APP_DESCRIPTION, SUGGESTED_PROMPTS } from "@/lib/constants";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { ChatBubbles } from "./ChatBubbles";
import { Sidebar } from "./Sidebar";
import { ThemeToggle } from "@/components/ThemeToggle";

export function ChatLayout() {
  const { conversations, addConversation, removeConversation, update } = useConversations();
  const [activeId, setActiveId] = useState<string>();
  const [pendingMessage, setPendingMessage] = useState<string>();
  const [sidebarVisible, setSidebarVisible] = useState(false);
  // eslint-disable-next-line react-hooks/set-state-in-effect -- initial visibility depends on viewport width, unknown until mount.
  useEffect(() => { setSidebarVisible(window.innerWidth > 900); }, []);
  const active = useMemo(() => conversations.find((conversation) => conversation.id === activeId), [activeId, conversations]);
  const onUpdate = (patch: Parameters<typeof update>[1]) => { if (active) update(active.id, patch); };
  const { sendMessage, stop, isStreaming, error, clearError } = useChat(active, onUpdate);
  useEffect(() => {
    if (!active || !pendingMessage) return;
    const message = pendingMessage;
    const timer = window.setTimeout(() => { setPendingMessage(undefined); void sendMessage(message); }, 0);
    return () => window.clearTimeout(timer);
  }, [active, pendingMessage, sendMessage]);
  const newChat = () => { setActiveId(undefined); if (window.innerWidth <= 900) setSidebarVisible(false); };
  const send = (message: string) => { if (!active) { const conversation = addConversation(); setActiveId(conversation.id); setPendingMessage(message); } else void sendMessage(message); };
  return (
    <main className="app-shell">
      <div className={`sidebar-overlay ${sidebarVisible ? "visible" : ""}`} onClick={() => setSidebarVisible(false)} />
      <Sidebar
        conversations={conversations}
        activeId={activeId}
        onSelect={(id) => { setActiveId(id); if (window.innerWidth <= 900) setSidebarVisible(false); }}
        onNew={newChat}
        onDelete={(id) => { removeConversation(id); if (id === activeId) setActiveId(undefined); }}
        open={sidebarVisible}
        onClose={() => setSidebarVisible(false)}
      />
      <section className="chat-panel">
        <div className="chat-topbar">
          <button className="sidebar-toggle" onClick={() => setSidebarVisible((visible) => !visible)} aria-label={sidebarVisible ? "Hide sidebar" : "Show sidebar"}><PanelLeft size={18} /></button>
          <button className="new-chat-small" onClick={newChat}><Plus size={15} /> New chat</button>
          <div className="chat-topbar-spacer" />
          <ThemeToggle />
        </div>
        <div className="messages" aria-live="polite">
          {!active?.messages.length && <ChatBubbles />}
          {!active?.messages.length ? (
            <div className="empty-state">
              <div className="hero-icon"><Sparkles size={25} /></div>
              <div className="eyebrow">Enterprise knowledge, made clear</div>
              <h2>How can I help?</h2>
              <p>{APP_DESCRIPTION}</p>
              <div className="prompt-grid">
                {SUGGESTED_PROMPTS.map((prompt) => <button key={prompt} onClick={() => send(prompt)}>{prompt}<span>↗</span></button>)}
              </div>
            </div>
          ) : (
            <div className="message-list">
              {active.messages.map((message) => <ChatMessage message={message} key={message.id} />)}
              {error && (
                <div className="error-box">
                  <span>{error}</span>
                  <button onClick={() => { clearError(); const last = active.messages.findLast((message) => message.role === "user"); if (last) sendMessage(last.content); }}><RotateCcw size={14} /> Retry</button>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="input-dock">
          <ChatInput onSend={send} onStop={stop} isStreaming={isStreaming} autoFocus={!active?.messages.length} />
        </div>
      </section>
    </main>
  );
}

"use client";

import { MoreHorizontal, Plus, Trash2, X } from "lucide-react";
import { ChatConversation } from "@/lib/types";

function groupLabel(date: string) { const days = Math.floor((Date.now() - new Date(date).getTime()) / 86400000); return days < 1 ? "Today" : days < 2 ? "Yesterday" : days < 7 ? "Previous 7 days" : "Older"; }

export function Sidebar({ conversations, activeId, onSelect, onNew, onDelete, open, onClose }: { conversations: ChatConversation[]; activeId?: string; onSelect: (id: string) => void; onNew: () => void; onDelete: (id: string) => void; open: boolean; onClose: () => void }) {
  const groups = conversations.reduce<Record<string, ChatConversation[]>>((all, conversation) => { const group = groupLabel(conversation.updatedAt); (all[group] ??= []).push(conversation); return all; }, {});
  return <aside className={`sidebar ${open ? "sidebar-open" : ""}`}><div className="sidebar-top"><div className="brand-mark">CE</div><div><div className="brand-name">Chitkara</div><div className="brand-sub">Enterprise knowledge</div></div><button className="icon-button mobile-close" onClick={onClose} aria-label="Close sidebar"><X size={18} /></button></div><button className="new-chat" onClick={onNew}><Plus size={17} /> New chat</button><nav className="history" aria-label="Conversation history">{Object.entries(groups).map(([group, items]) => <div className="history-group" key={group}><div className="group-label">{group}</div>{items.map((conversation) => <div className={`history-item ${conversation.id === activeId ? "active" : ""}`} key={conversation.id}><button onClick={() => onSelect(conversation.id)}>{conversation.title}</button><button className="delete-chat" onClick={() => onDelete(conversation.id)} aria-label={`Delete ${conversation.title}`}><Trash2 size={14} /></button></div>)}</div>)}{!conversations.length && <div className="empty-history">Your conversations will appear here.</div>}</nav><div className="sidebar-footer"><div className="status-dot" /> <span>Knowledge service</span><span className="status-live">Ready</span></div></aside>;
}

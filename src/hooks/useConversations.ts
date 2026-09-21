"use client";

import { useCallback, useEffect, useState } from "react";
import { createConversation, deleteConversation, getConversations, saveConversations } from "@/lib/conversations";
import { ChatConversation } from "@/lib/types";

export function useConversations() {
  const [conversations, setConversations] = useState<ChatConversation[]>([]);
  const [ready, setReady] = useState(false);
  useEffect(() => { setConversations(getConversations().sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))); setReady(true); }, []);
  const persist = useCallback((next: ChatConversation[]) => { setConversations(next); saveConversations(next); }, []);
  const addConversation = useCallback(() => { const conversation = createConversation(); persist([conversation, ...conversations]); return conversation; }, [conversations, persist]);
  const removeConversation = useCallback((id: string) => { deleteConversation(id); setConversations((current) => current.filter((item) => item.id !== id)); }, []);
  const update = useCallback((id: string, patch: Partial<ChatConversation>) => { persist(conversations.map((item) => item.id === id ? { ...item, ...patch, updatedAt: new Date().toISOString() } : item)); }, [conversations, persist]);
  return { conversations, ready, addConversation, removeConversation, update };
}

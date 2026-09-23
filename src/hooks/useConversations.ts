"use client";

import { useCallback, useEffect, useState } from "react";
import { createConversation, deleteConversation, getConversations, saveConversations } from "@/lib/conversations";
import { ChatConversation } from "@/lib/types";
import { titleFromMessage } from "@/lib/utils";

function healTitle(conversation: ChatConversation): ChatConversation {
  if (conversation.title !== "New conversation") return conversation;
  const firstUserMessage = conversation.messages.find((message) => message.role === "user");
  if (!firstUserMessage) return conversation;
  return { ...conversation, title: titleFromMessage(firstUserMessage.content) };
}

export function useConversations() {
  const [conversations, setConversations] = useState<ChatConversation[]>([]);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const stored = getConversations().sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
    const healed = stored.map(healTitle);
    if (healed.some((conversation, index) => conversation.title !== stored[index].title)) saveConversations(healed);
    setConversations(healed);
    setReady(true);
  }, []);
  const persist = useCallback((updater: (current: ChatConversation[]) => ChatConversation[]) => {
    setConversations((current) => {
      const next = updater(current);
      saveConversations(next);
      return next;
    });
  }, []);
  const addConversation = useCallback(() => { const conversation = createConversation(); persist((current) => [conversation, ...current]); return conversation; }, [persist]);
  const removeConversation = useCallback((id: string) => { deleteConversation(id); setConversations((current) => current.filter((item) => item.id !== id)); }, []);
  const update = useCallback((id: string, patch: Partial<ChatConversation>) => { persist((current) => current.map((item) => item.id === id ? { ...item, ...patch, updatedAt: new Date().toISOString() } : item)); }, [persist]);
  return { conversations, ready, addConversation, removeConversation, update };
}

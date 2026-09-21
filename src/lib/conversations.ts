import { STORAGE_KEY } from "./constants";
import { ChatConversation } from "./types";
import { makeId } from "./utils";

export function getConversations(): ChatConversation[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored ? (JSON.parse(stored) as ChatConversation[]) : [];
  } catch {
    return [];
  }
}

export function saveConversations(conversations: ChatConversation[]) {
  if (typeof window !== "undefined") window.localStorage.setItem(STORAGE_KEY, JSON.stringify(conversations));
}

export function createConversation(): ChatConversation {
  const now = new Date().toISOString();
  return { id: makeId("local"), title: "New conversation", messages: [], createdAt: now, updatedAt: now };
}

export function getConversation(id: string) { return getConversations().find((conversation) => conversation.id === id); }

export function updateConversation(id: string, patch: Partial<ChatConversation>) {
  const conversations = getConversations().map((conversation) => conversation.id === id ? { ...conversation, ...patch, updatedAt: new Date().toISOString() } : conversation);
  saveConversations(conversations);
  return conversations.find((conversation) => conversation.id === id);
}

export function deleteConversation(id: string) { saveConversations(getConversations().filter((conversation) => conversation.id !== id)); }

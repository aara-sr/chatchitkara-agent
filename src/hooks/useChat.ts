"use client";

import { useCallback, useRef, useState } from "react";
import { streamChat, ApiError } from "@/lib/api";
import { ChatConversation, ChatMessage, Source } from "@/lib/types";
import { makeId, titleFromMessage } from "@/lib/utils";

export function useChat(conversation: ChatConversation | undefined, onUpdate: (patch: Partial<ChatConversation>) => void) {
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const sendMessage = useCallback(async (content: string) => {
    if (!conversation || isStreaming || !content.trim()) return;
    const now = new Date().toISOString();
    const userMessage: ChatMessage = { id: makeId("message"), role: "user", content: content.trim(), createdAt: now };
    const assistantMessage: ChatMessage = { id: makeId("message"), role: "assistant", content: "", createdAt: now };
    const history = [...conversation.messages, userMessage];
    onUpdate({ title: conversation.messages.length ? conversation.title : titleFromMessage(content), messages: [...history, assistantMessage] });
    setError(null); setIsStreaming(true);
    const controller = new AbortController(); abortRef.current = controller;
    let assistantContent = ""; let sources: Source[] = [];
    try {
      await streamChat({ conversationId: conversation.id, foundryConversationId: conversation.foundryConversationId, message: content.trim(), history }, controller.signal, (event) => {
        if (event.type === "conversation") onUpdate({ foundryConversationId: event.foundryConversationId });
        if (event.type === "delta") { assistantContent += event.content; onUpdate({ messages: [...history, { ...assistantMessage, content: assistantContent, sources }] }); }
        if (event.type === "sources") { sources = event.sources; onUpdate({ messages: [...history, { ...assistantMessage, content: assistantContent, sources }] }); }
        if (event.type === "error") throw new ApiError(event.message);
      });
      if (!assistantContent.trim()) setError("The knowledge service returned an empty response.");
    } catch (caught) {
      if (!assistantContent.trim()) onUpdate({ messages: history });
      if (caught instanceof DOMException && caught.name === "AbortError") setError("Generation stopped.");
      else setError(caught instanceof ApiError ? caught.message : "Connection to the knowledge service was interrupted.");
    } finally { setIsStreaming(false); abortRef.current = null; }
  }, [conversation, isStreaming, onUpdate]);
  const stop = useCallback(() => abortRef.current?.abort(), []);
  return { sendMessage, stop, isStreaming, error, clearError: () => setError(null) };
}

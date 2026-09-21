export type Source = {
  title: string;
  url?: string | null;
  page?: number;
  excerpt?: string;
};

export type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: string;
  sources?: Source[];
};

export type ChatConversation = {
  id: string;
  title: string;
  foundryConversationId?: string;
  messages: ChatMessage[];
  createdAt: string;
  updatedAt: string;
};

export type StreamEvent =
  | { type: "conversation"; foundryConversationId: string }
  | { type: "delta"; content: string }
  | { type: "sources"; sources: Source[] }
  | { type: "done" }
  | { type: "error"; message: string };

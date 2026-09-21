import { ChatMessage, Source, StreamEvent } from "./types";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "") ?? "";
const useMock = process.env.NEXT_PUBLIC_USE_MOCK_API === "true";

export class ApiError extends Error {
  status?: number;
  constructor(message: string, status?: number) { super(message); this.name = "ApiError"; this.status = status; }
}

function userMessage(status?: number) {
  if (status === 429) return "Too many requests. Please try again shortly.";
  if (status && status >= 500) return "The knowledge service is temporarily unavailable.";
  return "We could not connect to the knowledge service.";
}

async function mockStream(message: string, signal: AbortSignal, onEvent: (event: StreamEvent) => void) {
  onEvent({ type: "conversation", foundryConversationId: "mock-conversation" });
  const response = `Here is a development-only response to **${message}**.\n\nThe real application sends this question to your Azure VM backend, which then connects to the existing enterprise knowledge agent.`;
  for (const word of response.split(" ")) {
    if (signal.aborted) throw new DOMException("Aborted", "AbortError");
    await new Promise((resolve) => setTimeout(resolve, 22));
    onEvent({ type: "delta", content: `${word} ` });
  }
  onEvent({ type: "sources", sources: [{ title: "Development response", page: 1 }] });
  onEvent({ type: "done" });
}

export async function streamChat(
  input: { conversationId: string; foundryConversationId?: string; message: string; history: ChatMessage[] },
  signal: AbortSignal,
  onEvent: (event: StreamEvent) => void,
) {
  if (useMock) return mockStream(input.message, signal, onEvent);
  if (!baseUrl) throw new ApiError("The backend API URL is not configured.");
  let response: Response;
  try {
    response = await fetch(`${baseUrl}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "text/event-stream, application/x-ndjson, application/json" },
      body: JSON.stringify({ conversation_id: input.conversationId, foundry_conversation_id: input.foundryConversationId, message: input.message }),
      signal,
    });
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") throw error;
    throw new ApiError("The knowledge service is temporarily unavailable.");
  }
  if (!response.ok) throw new ApiError(userMessage(response.status), response.status);
  const contentType = response.headers.get("content-type") ?? "";
  if (contentType.includes("application/json")) {
    let payload: { content?: string; response?: string; answer?: string; message?: string; foundry_conversation_id?: string; sources?: Source[] };
    try { payload = await response.json(); } catch { throw new ApiError("The knowledge service returned an invalid response."); }
    if (payload.foundry_conversation_id) onEvent({ type: "conversation", foundryConversationId: payload.foundry_conversation_id });
    const content = payload.content ?? payload.response ?? payload.answer ?? payload.message;
    if (content) onEvent({ type: "delta", content });
    if (payload.sources) onEvent({ type: "sources", sources: payload.sources });
    onEvent({ type: "done" });
    return;
  }
  if (!response.body) throw new ApiError("Connection to the knowledge service was interrupted.");

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  const consume = (raw: string) => {
    buffer += raw;
    const lines = buffer.split(/\r?\n/);
    buffer = lines.pop() ?? "";
    for (const line of lines) {
      const value = line.trim().replace(/^data:\s*/, "");
      if (!value || value === "[DONE]") continue;
      try { onEvent(JSON.parse(value) as StreamEvent); } catch { throw new ApiError("The knowledge service returned an invalid response."); }
    }
  };
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    consume(decoder.decode(value, { stream: true }));
  }
  if (buffer.trim()) consume("\n");
}

export async function checkHealth() {
  if (useMock || !baseUrl) return true;
  try { return (await fetch(`${baseUrl}/health`, { cache: "no-store" })).ok; } catch { return false; }
}

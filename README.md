# Chitkara Enterprise Knowledge Agent

A public, no-login knowledge chat frontend for Chitkara Enterprise. It provides a ChatGPT-style experience while keeping Microsoft Foundry entirely behind a separate backend API.

> **This repository does not connect directly to Microsoft Foundry.**
>
> `Frontend -> Azure VM API -> Microsoft Foundry -> Existing Foundry Agent -> Existing Knowledge Base`

## Architecture

The Next.js browser application sends only chat requests to the configured backend. It does not contain Azure credentials, Foundry SDKs, project endpoints, agent identifiers, or authentication logic. Browser conversation history is local to the current browser and is not an identity or security boundary.

## Tech stack

- Next.js App Router and React
- TypeScript
- Tailwind CSS v4 (with focused component CSS)
- Lucide React
- react-markdown and remark-gfm

## Installation and local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

Run the checks and production server with:

```bash
npm run typecheck
npm run lint
npm run build
npm start
```

## Environment configuration

Copy `.env.example` to `.env.local` or edit the supplied local file:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
NEXT_PUBLIC_USE_MOCK_API=false
```

`NEXT_PUBLIC_API_BASE_URL` is the only backend address the frontend needs. Mock mode is development-only and opt-in; production defaults to the real API.

## Backend API contract

### Health

`GET /health` should return `{ "status": "ok" }`. The frontend does not poll this endpoint; request errors are handled when a chat is submitted.

### Chat

`POST /api/chat` receives:

```json
{
  "conversation_id": "local-conversation-id",
  "foundry_conversation_id": "optional",
  "message": "What is the leave policy?"
}
```

The frontend intentionally sends the local conversation ID and the Foundry conversation ID as separate fields. The backend owns validation, Azure authentication, Foundry access, conversation creation, rate limiting, and abuse protection.

## Streaming protocol

`src/lib/api.ts` normalizes newline-delimited JSON or SSE `data:` frames into these logical events:

- `conversation`: includes `foundry_conversation_id`
- `delta`: incremental assistant `content`
- `sources`: returned citation metadata
- `done`
- `error`: user-safe message

The UI progressively updates the assistant message, persists sources and conversation IDs, and uses `AbortController` for stop generation.

## Conversation storage

Conversations are saved under `chitkara-enterprise-conversations` in `localStorage`. They include messages, timestamps, titles, sources, local IDs, and the backend-returned Foundry conversation ID. Clearing browser storage removes this browser's history.

## Production and deployment

Build the app with `npm run build` and serve it with `npm start`. Set `NEXT_PUBLIC_API_BASE_URL` at build time to the public HTTPS URL of the Azure VM backend, for example `https://api.example.com`. The FastAPI backend must allow the frontend origin through CORS and expose `/api/chat` over HTTPS. CORS cannot be fixed from the browser.

## Security architecture

The browser contains no Azure credentials, client secrets, tokens, Foundry project endpoint, or Foundry SDK. The backend is the security boundary and must implement authentication to Foundry, validation, rate limiting, and abuse controls. This frontend is public and intentionally has no login in version 1.

## Project structure

- `src/app`: Next.js app entry, metadata, and global styling
- `src/components/chat`: responsive chat UI and message rendering
- `src/hooks`: conversation and streaming state
- `src/lib/api.ts`: the only backend request abstraction
- `src/lib/conversations.ts`: SSR-safe localStorage persistence
- `src/lib/types.ts`: chat, source, and stream contracts

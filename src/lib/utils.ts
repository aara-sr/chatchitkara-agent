export function makeId(prefix = "id") {
  return `${prefix}-${crypto.randomUUID()}`;
}

const TITLE_FILLER_PREFIXES = [
  "can you tell me", "could you tell me", "please tell me", "tell me about",
  "can you please", "could you please", "can you", "could you", "please",
  "what is", "what are", "what's", "who is", "who's", "where is", "where can i find",
  "how do i", "how can i", "how does", "how to", "why is", "why does",
  "when is", "when does", "is there", "are there", "do you know",
];

export function titleFromMessage(message: string) {
  let clean = message.replace(/\s+/g, " ").trim();
  if (!clean) return "New conversation";
  const lower = clean.toLowerCase();
  for (const prefix of TITLE_FILLER_PREFIXES) {
    if (lower.startsWith(`${prefix} `)) { clean = clean.slice(prefix.length + 1).trim(); break; }
  }
  if (!clean) return "New conversation";
  const words = clean.split(" ").slice(0, 6);
  let title = words.join(" ").replace(/[?.!,;:]+$/, "");
  title = title.charAt(0).toUpperCase() + title.slice(1);
  return title.length > 42 ? `${title.slice(0, 42).trim()}...` : title;
}

export function formatTime(value: string) {
  return new Intl.DateTimeFormat("en", { hour: "numeric", minute: "2-digit" }).format(new Date(value));
}

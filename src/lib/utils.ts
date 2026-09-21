export function makeId(prefix = "id") {
  return `${prefix}-${crypto.randomUUID()}`;
}

export function titleFromMessage(message: string) {
  const clean = message.replace(/\s+/g, " ").trim();
  if (!clean) return "New conversation";
  const words = clean.split(" ").slice(0, 7);
  const title = words.join(" ").replace(/[?.!,;:]+$/, "");
  return title.length > 42 ? `${title.slice(0, 42).trim()}...` : title;
}

export function formatTime(value: string) {
  return new Intl.DateTimeFormat("en", { hour: "numeric", minute: "2-digit" }).format(new Date(value));
}

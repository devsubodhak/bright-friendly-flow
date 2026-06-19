import { DISPOSITIONS, SERVICES, STAGES } from "./types";

export const DAY = 86400000;

export function uid() {
  return "id" + Math.random().toString(36).slice(2, 9);
}

export function svc(id: string) {
  return SERVICES.find((s) => s.id === id)?.label ?? id;
}
export function stageLabel(id: string) {
  return STAGES.find((s) => s.id === id)?.label ?? id;
}
export function dispoLabel(id: string) {
  return DISPOSITIONS.find((d) => d.id === id)?.label ?? "—";
}

export function fmtWhen(ts: number | null) {
  if (!ts) return "—";
  const d = new Date(ts);
  const now = new Date();
  const sameDay = d.toDateString() === now.toDateString();
  const tom = new Date(now.getTime() + DAY).toDateString() === d.toDateString();
  const yest = new Date(now.getTime() - DAY).toDateString() === d.toDateString();
  const t = d.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
  if (sameDay) return "Today " + t;
  if (tom) return "Tomorrow " + t;
  if (yest) return "Yesterday " + t;
  return d.toLocaleDateString([], { day: "numeric", month: "short" }) + " " + t;
}

export function relOverdue(ts: number) {
  const diff = Date.now() - ts;
  const days = Math.floor(diff / DAY);
  if (days >= 1) return days + "d overdue";
  const hrs = Math.floor(diff / 3600e3);
  if (hrs >= 1) return hrs + "h overdue";
  return "due now";
}

export function toDatetimeLocal(ts: number | null): string {
  if (!ts) return "";
  return new Date(ts - new Date().getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 16);
}

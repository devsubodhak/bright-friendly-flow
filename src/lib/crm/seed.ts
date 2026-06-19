import type { DB } from "./types";
import { DAY, uid } from "./format";

function todayAt(h: number, m: number) {
  const d = new Date();
  d.setHours(h, m, 0, 0);
  return d.getTime();
}

export function seed(): DB {
  const now = Date.now();
  const users = [
    { id: "u1", name: "Subodha Kalhara", role: "Co-Founder", color: "#ea613b", initials: "SK" },
    { id: "u2", name: "Sadeepa Namarathna", role: "Co-Founder", color: "#cc5434", initials: "SN" },
    { id: "u3", name: "Sahan Madhawa", role: "Co-Founder", color: "#b8860b", initials: "SM" },
    { id: "u4", name: "Pulasthi Wijayarathna", role: "Co-Founder", color: "#3c7a4e", initials: "PW" },
    { id: "u5", name: "Ashan Indusara", role: "Co-Founder", color: "#5a466a", initials: "AI" },
  ];

  type CSeed = Partial<DB["contacts"][number]> & Pick<DB["contacts"][number], "name" | "company" | "phone" | "service" | "stage" | "owner" | "source">;
  const C = (o: CSeed): DB["contacts"][number] => ({
    id: uid(), email: "", notes: "", doNotCall: false, lastDisposition: "",
    createdAt: now - Math.random() * 40 * DAY, nextCallAt: null,
    ...o,
  });

  const contacts: DB["contacts"] = [];
  const appointments: DB["appointments"] = [];
  const calls: DB["calls"] = [];
  return { users, contacts, appointments, calls, currentUserId: "u1" };
}

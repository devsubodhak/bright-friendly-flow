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
    { id: "u1", name: "Subodha K.", role: "Director / Admin", color: "#1f5c5a", initials: "SK" },
    { id: "u2", name: "Tharindu", role: "Account manager", color: "#bb472b", initials: "TH" },
    { id: "u3", name: "Ishara", role: "Telecaller", color: "#9a6a14", initials: "IS" },
    { id: "u4", name: "Kavindu", role: "Telecaller", color: "#3c7a4e", initials: "KV" },
    { id: "u5", name: "Dilini", role: "Project coordinator", color: "#5a466a", initials: "DL" },
    { id: "u6", name: "Roshan", role: "Photographer / Videographer", color: "#2b6178", initials: "RO" },
  ];

  type CSeed = Partial<DB["contacts"][number]> & Pick<DB["contacts"][number], "name" | "company" | "phone" | "service" | "stage" | "owner" | "source">;
  const C = (o: CSeed): DB["contacts"][number] => ({
    id: uid(), email: "", notes: "", doNotCall: false, lastDisposition: "",
    createdAt: now - Math.random() * 40 * DAY, nextCallAt: null,
    ...o,
  });

  const contacts: DB["contacts"] = [
    C({ name: "Nimal Perera", company: "Sunrise Villas, Bentota", phone: "077 412 6650", service: "web", stage: "qualified", owner: "u3", source: "Referral", nextCallAt: now - 2 * DAY, lastDisposition: "callback" }),
    C({ name: "Anushka Silva", company: "Cecrafto Kombucha", phone: "071 998 2210", service: "social", stage: "proposal", owner: "u2", source: "Instagram DM", nextCallAt: now - DAY + 3 * 3600e3, lastDisposition: "answered" }),
    C({ name: "Mr. Bandara", company: "Mahawaththa Distributors", phone: "076 330 0145", service: "web", stage: "contacted", owner: "u3", source: "Cold call", nextCallAt: now - 5 * 3600e3, lastDisposition: "noanswer" }),
    C({ name: "Sanduni Fernando", company: "Goddess Heritage Villa", phone: "070 226 8890", service: "photo", stage: "qualified", owner: "u4", source: "Website form", nextCallAt: now + 2 * 3600e3, lastDisposition: "callback" }),
    C({ name: "Ravi Jayasuriya", company: "Yantech Lanka", phone: "077 700 1234", service: "video", stage: "new", owner: "u4", source: "Expo lead", nextCallAt: now + 5 * 3600e3, lastDisposition: "" }),
    C({ name: "Hashini", company: "Bathle Eco Resort", phone: "072 545 1190", service: "social", stage: "contacted", owner: "u2", source: "Referral", nextCallAt: now + DAY, lastDisposition: "busy" }),
    C({ name: "Mohamed Rizwan", company: "Sigiri Hunter's Tree Lodge", phone: "075 880 7766", service: "web", stage: "new", owner: "u3", source: "Facebook", nextCallAt: now + 3 * DAY, lastDisposition: "" }),
    C({ name: "Priyanka", company: "Misty Hills Villa", phone: "078 414 0098", service: "photo", stage: "won", owner: "u2", source: "Repeat client", nextCallAt: null, lastDisposition: "won" }),
    C({ name: "Kasun Madushanka", company: "Vocell Lanka", phone: "077 121 3344", service: "web", stage: "proposal", owner: "u3", source: "Cold call", nextCallAt: now - 3 * DAY, lastDisposition: "answered" }),
  ];

  const byName = Object.fromEntries(contacts.map((c) => [c.name, c.id]));
  const appointments: DB["appointments"] = [
    { id: uid(), contactId: byName["Anushka Silva"], userId: "u5", title: "Proposal review", type: "Proposal review", at: todayAt(15, 30), durationMin: 45, location: "Zoom", notes: "Walk through 3 content packages", status: "scheduled" },
    { id: uid(), contactId: byName["Sanduni Fernando"], userId: "u6", title: "Villa photo shoot", type: "Shoot / site visit", at: Date.now() + 2 * DAY + (10 - new Date().getHours()) * 3600e3, durationMin: 240, location: "Kandy", notes: "Bring drone + wide lens", status: "scheduled" },
    { id: uid(), contactId: byName["Nimal Perera"], userId: "u1", title: "Discovery meeting", type: "Discovery meeting", at: Date.now() + DAY, durationMin: 60, location: "Office", notes: "", status: "scheduled" },
  ];
  const calls: DB["calls"] = [
    { id: uid(), contactId: byName["Anushka Silva"], userId: "u2", at: now - DAY, disposition: "answered", note: "Likes the south-coast season idea", durationSec: 480 },
    { id: uid(), contactId: byName["Kasun Madushanka"], userId: "u3", at: now - 3 * DAY, disposition: "answered", note: "Sent quotation, waiting", durationSec: 300 },
  ];
  return { users, contacts, appointments, calls, currentUserId: "u1" };
}

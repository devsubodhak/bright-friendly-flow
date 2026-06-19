export type ServiceId = "web" | "social" | "photo" | "video";
export type StageId = "new" | "contacted" | "qualified" | "proposal" | "won";
export type DispositionId =
  | "answered" | "callback" | "noanswer" | "busy" | "appt"
  | "won" | "notnow" | "notint" | "wrong" | "dnc";

export interface User {
  id: string;
  name: string;
  role: string;
  color: string;
  initials: string;
}

export interface Contact {
  id: string;
  name: string;
  company: string;
  phone: string;
  email: string;
  service: ServiceId;
  stage: StageId;
  owner: string;
  source: string;
  notes: string;
  nextCallAt: number | null;
  lastDisposition: DispositionId | "";
  doNotCall: boolean;
  createdAt: number;
}

export interface Call {
  id: string;
  contactId: string;
  userId: string;
  at: number;
  disposition: DispositionId;
  note: string;
  durationSec: number;
}

export interface Appointment {
  id: string;
  contactId: string;
  userId: string;
  title: string;
  type: string;
  at: number;
  durationMin: number;
  location: string;
  notes: string;
  status: "scheduled" | "done" | "cancelled";
}

export interface DB {
  users: User[];
  contacts: Contact[];
  appointments: Appointment[];
  calls: Call[];
  currentUserId: string;
}

export const SERVICES: { id: ServiceId; label: string }[] = [
  { id: "web", label: "Web" },
  { id: "social", label: "Social media" },
  { id: "photo", label: "Photography" },
  { id: "video", label: "Videography" },
];

export const STAGES: { id: StageId; label: string }[] = [
  { id: "new", label: "New lead" },
  { id: "contacted", label: "Contacted" },
  { id: "qualified", label: "Qualified" },
  { id: "proposal", label: "Proposal" },
  { id: "won", label: "Won" },
];

export const DISPOSITIONS: { id: DispositionId; label: string; tone: "" | "good" | "bad" }[] = [
  { id: "answered", label: "Spoke — interested", tone: "good" },
  { id: "callback", label: "Call back later", tone: "" },
  { id: "noanswer", label: "No answer", tone: "" },
  { id: "busy", label: "Busy / engaged", tone: "" },
  { id: "appt", label: "Booked appointment", tone: "good" },
  { id: "won", label: "Closed — won", tone: "good" },
  { id: "notnow", label: "Not now", tone: "" },
  { id: "notint", label: "Not interested", tone: "bad" },
  { id: "wrong", label: "Wrong number", tone: "bad" },
  { id: "dnc", label: "Do not call", tone: "bad" },
];

export const APPT_TYPES = [
  "Discovery meeting",
  "Shoot / site visit",
  "Proposal review",
  "Follow-up call",
  "Handover",
];

import {
  createContext, useCallback, useContext, useEffect, useMemo, useRef, useState,
  type ReactNode,
} from "react";
import type { Appointment, Contact, DB, DispositionId, User } from "./types";
import { seed } from "./seed";
import { DAY, uid } from "./format";

const KEY = "univerz_crm_v1";

function load(): DB {
  if (typeof window === "undefined") return seed();
  try {
    const raw = window.localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw) as DB;
  } catch {}
  const s = seed();
  try { window.localStorage.setItem(KEY, JSON.stringify(s)); } catch {}
  return s;
}
function persist(db: DB) {
  try { window.localStorage.setItem(KEY, JSON.stringify(db)); } catch {}
}

interface ToastItem { id: string; msg: string }

interface CrmCtx {
  db: DB;
  search: string;
  setSearch: (s: string) => void;
  setCurrentUser: (id: string) => void;
  user: (id: string) => User;
  contact: (id: string) => Contact | undefined;
  matchSearch: (c: Contact) => boolean;
  upsertContact: (c: Contact, isNew: boolean) => void;
  deleteContact: (id: string) => void;
  markApptDone: (id: string) => void;
  moveStage: (contactId: string, stage: Contact["stage"]) => void;
  saveCall: (args: {
    contact: Contact;
    disposition: DispositionId;
    note: string;
    nextCallAt: number | null;
    appointment?: Omit<Appointment, "id" | "status" | "contactId">;
  }) => void;
  toast: (msg: string) => void;
  toasts: ToastItem[];
  dismissToast: (id: string) => void;
}

const Ctx = createContext<CrmCtx | null>(null);

export function CrmProvider({ children }: { children: ReactNode }) {
  const [db, setDb] = useState<DB>(() => load());
  const [search, setSearch] = useState("");
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const dbRef = useRef(db);
  useEffect(() => { dbRef.current = db; persist(db); }, [db]);

  const mutate = useCallback((fn: (d: DB) => DB) => {
    setDb((prev) => fn({ ...prev, contacts: [...prev.contacts], appointments: [...prev.appointments], calls: [...prev.calls] }));
  }, []);

  const toast = useCallback((msg: string) => {
    const id = uid();
    setToasts((t) => [...t, { id, msg }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 2800);
  }, []);
  const dismissToast = useCallback((id: string) => setToasts((t) => t.filter((x) => x.id !== id)), []);

  const value = useMemo<CrmCtx>(() => {
    const userMap = new Map(db.users.map((u) => [u.id, u]));
    const contactMap = new Map(db.contacts.map((c) => [c.id, c]));
    return {
      db,
      search,
      setSearch,
      setCurrentUser: (id) => { mutate((d) => ({ ...d, currentUserId: id })); toast("Now acting as " + (userMap.get(id)?.name ?? "—")); },
      user: (id) => userMap.get(id) ?? { id: "", name: "—", role: "", color: "#999", initials: "?" },
      contact: (id) => contactMap.get(id),
      matchSearch: (c) => {
        if (!search) return true;
        return (c.name + " " + c.company + " " + c.phone).toLowerCase().includes(search.toLowerCase());
      },
      upsertContact: (c, isNew) => {
        mutate((d) => {
          if (isNew) return { ...d, contacts: [...d.contacts, c] };
          return { ...d, contacts: d.contacts.map((x) => (x.id === c.id ? c : x)) };
        });
        toast(isNew ? "Contact added" : "Contact saved");
      },
      deleteContact: (id) => {
        mutate((d) => ({ ...d, contacts: d.contacts.filter((c) => c.id !== id) }));
        toast("Contact deleted");
      },
      markApptDone: (id) => {
        mutate((d) => ({ ...d, appointments: d.appointments.map((a) => (a.id === id ? { ...a, status: "done" } : a)) }));
        toast("Appointment done");
      },
      moveStage: (cid, stage) => {
        let name = "";
        mutate((d) => ({
          ...d,
          contacts: d.contacts.map((c) => {
            if (c.id === cid) { name = c.name; return { ...c, stage }; }
            return c;
          }),
        }));
        toast(`${name} → ${stage}`);
      },
      saveCall: ({ contact, disposition, note, nextCallAt, appointment }) => {
        mutate((d) => {
          const updatedContact: Contact = { ...contact, lastDisposition: disposition };
          if (disposition === "dnc") { updatedContact.doNotCall = true; updatedContact.nextCallAt = null; }
          else if (disposition === "notint" || disposition === "wrong") { updatedContact.nextCallAt = null; }
          else if (disposition === "won") { updatedContact.stage = "won"; updatedContact.nextCallAt = null; }
          else if (disposition === "appt") { updatedContact.nextCallAt = null; if (updatedContact.stage === "new" || updatedContact.stage === "contacted") updatedContact.stage = "qualified"; }
          else if (["callback", "noanswer", "busy", "notnow"].includes(disposition)) {
            updatedContact.nextCallAt = nextCallAt ?? Date.now() + DAY;
          } else {
            // answered
            if (updatedContact.stage === "new") updatedContact.stage = "contacted";
            updatedContact.nextCallAt = nextCallAt ?? updatedContact.nextCallAt;
          }

          const newCall = {
            id: uid(), contactId: contact.id, userId: d.currentUserId,
            at: Date.now(), disposition, note, durationSec: 0,
          };
          const newAppts = appointment
            ? [...d.appointments, { ...appointment, id: uid(), contactId: contact.id, status: "scheduled" as const }]
            : d.appointments;

          return {
            ...d,
            calls: [...d.calls, newCall],
            appointments: newAppts,
            contacts: d.contacts.map((c) => (c.id === contact.id ? updatedContact : c)),
          };
        });
        toast("Call logged");
      },
      toast,
      toasts,
      dismissToast,
    };
  }, [db, search, mutate, toast, toasts, dismissToast]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCrm() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useCrm outside CrmProvider");
  return v;
}

import {
  createContext, useCallback, useContext, useEffect, useMemo, useRef, useState,
  type ReactNode,
} from "react";
import type { Appointment, Contact, Call, DB, DispositionId, User } from "./types";
import { getSupabaseClient } from "../supabase";
import { DAY, uid } from "./format";
import { seed } from "./seed";

interface ToastItem { id: string; msg: string }

interface CrmCtx {
  db: DB;
  isLoading: boolean;
  search: string;
  setSearch: (s: string) => void;
  setCurrentUser: (id: string) => void;
  user: (id: string) => User;
  contact: (id: string) => Contact | undefined;
  matchSearch: (c: Contact) => boolean;
  upsertContact: (c: Contact, isNew: boolean) => void;
  deleteContact: (id: string) => void;
  markApptDone: (id: string) => void;
  cancelAppointment: (id: string) => void;
  deleteAppointment: (id: string) => void;
  deleteCall: (id: string) => void;
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

function mapUser(row: any): User {
  return { id: row.id, name: row.name, role: row.role, color: row.color, initials: row.initials };
}
function mapContact(row: any): Contact {
  return {
    id: row.id, name: row.name, company: row.company, phone: row.phone, email: row.email,
    service: row.service, stage: row.stage, owner: row.owner_id, source: row.source, notes: row.notes,
    nextCallAt: row.next_call_at ? new Date(row.next_call_at).getTime() : null,
    lastDisposition: row.last_disposition, doNotCall: row.do_not_call,
    createdAt: new Date(row.created_at).getTime()
  };
}
function mapToContactRow(c: Contact) {
  return {
    id: c.id, name: c.name, company: c.company, phone: c.phone, email: c.email,
    service: c.service, stage: c.stage, owner_id: c.owner, source: c.source, notes: c.notes,
    next_call_at: c.nextCallAt ? new Date(c.nextCallAt).toISOString() : null,
    last_disposition: c.lastDisposition, do_not_call: c.doNotCall,
    created_at: new Date(c.createdAt).toISOString()
  };
}
function mapCall(row: any): Call {
  return {
    id: row.id, contactId: row.contact_id, userId: row.user_id,
    at: new Date(row.at).getTime(), disposition: row.disposition, note: row.note,
    durationSec: row.duration_sec
  };
}
function mapAppt(row: any): Appointment {
  return {
    id: row.id, contactId: row.contact_id, userId: row.user_id,
    title: row.title, type: row.type, at: new Date(row.at).getTime(),
    durationMin: row.duration_min, location: row.location, notes: row.notes, status: row.status
  };
}

export function CrmProvider({ children }: { children: ReactNode }) {
  const [db, setDb] = useState<DB>({ users: [], contacts: [], appointments: [], calls: [], currentUserId: "" });
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  useEffect(() => {
    let cancelled = false;

    async function loadData() {
      try {
        const supabase = await getSupabaseClient();
        const [usersResult, contactsResult, appointmentsResult, callsResult] = await Promise.all([
          supabase.from("users").select("*"),
          supabase.from("contacts").select("*"),
          supabase.from("appointments").select("*"),
          supabase.from("calls").select("*"),
        ]);

        const firstError =
          usersResult.error ?? contactsResult.error ?? appointmentsResult.error ?? callsResult.error;
        if (firstError) throw firstError;

        const mappedUsers = (usersResult.data || []).map(mapUser);
        if (cancelled) return;

        setDb({
          users: mappedUsers,
          contacts: (contactsResult.data || []).map(mapContact),
          appointments: (appointmentsResult.data || []).map(mapAppt),
          calls: (callsResult.data || []).map(mapCall),
          currentUserId: mappedUsers.length > 0 ? mappedUsers[0].id : "",
        });
      } catch (error) {
        console.error("Unable to load Supabase CRM data", error);
        if (!cancelled) setDb(seed());
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    void loadData();

    return () => {
      cancelled = true;
    };
  }, []);

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
      isLoading,
      search,
      setSearch,
      setCurrentUser: (id) => { mutate((d) => ({ ...d, currentUserId: id })); toast("Now acting as " + (userMap.get(id)?.name ?? "—")); },
      user: (id) => userMap.get(id) ?? { id: "", name: "—", role: "", color: "#999", initials: "?" },
      contact: (id) => contactMap.get(id),
      matchSearch: (c) => {
        if (!search) return true;
        return (c.name + " " + c.company + " " + c.phone).toLowerCase().includes(search.toLowerCase());
      },
      upsertContact: async (c, isNew) => {
        mutate((d) => {
          if (isNew) return { ...d, contacts: [...d.contacts, c] };
          return { ...d, contacts: d.contacts.map((x) => (x.id === c.id ? c : x)) };
        });
        toast(isNew ? "Contact added" : "Contact saved");
        await (await getSupabaseClient()).from('contacts').upsert(mapToContactRow(c));
      },
      deleteContact: async (id) => {
        mutate((d) => ({ ...d, contacts: d.contacts.filter((c) => c.id !== id) }));
        toast("Contact deleted");
        await (await getSupabaseClient()).from('contacts').delete().eq('id', id);
      },
      markApptDone: async (id) => {
        mutate((d) => ({ ...d, appointments: d.appointments.map((a) => (a.id === id ? { ...a, status: "done" } : a)) }));
        toast("Appointment done");
        await (await getSupabaseClient()).from('appointments').update({ status: 'done' }).eq('id', id);
      },
      cancelAppointment: async (id) => {
        mutate((d) => ({ ...d, appointments: d.appointments.map((a) => (a.id === id ? { ...a, status: "cancelled" as const } : a)) }));
        toast("Appointment cancelled");
        await (await getSupabaseClient()).from('appointments').update({ status: 'cancelled' }).eq('id', id);
      },
      deleteAppointment: async (id) => {
        mutate((d) => ({ ...d, appointments: d.appointments.filter((a) => a.id !== id) }));
        toast("Appointment deleted");
        await (await getSupabaseClient()).from('appointments').delete().eq('id', id);
      },
      deleteCall: async (id) => {
        mutate((d) => ({ ...d, calls: d.calls.filter((c) => c.id !== id) }));
        toast("Call log removed");
        await (await getSupabaseClient()).from('calls').delete().eq('id', id);
      },
      moveStage: async (cid, stage) => {
        let name = "";
        mutate((d) => ({
          ...d,
          contacts: d.contacts.map((c) => {
            if (c.id === cid) { name = c.name; return { ...c, stage }; }
            return c;
          }),
        }));
        toast(`${name} → ${stage}`);
        await (await getSupabaseClient()).from('contacts').update({ stage }).eq('id', cid);
      },
      saveCall: async ({ contact, disposition, note, nextCallAt, appointment }) => {
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

        const newCallId = uid();
        const newCall = {
          id: newCallId, contactId: contact.id, userId: db.currentUserId,
          at: Date.now(), disposition, note, durationSec: 0,
        };
        
        let newAppt = null;
        if (appointment) {
          const apptId = uid();
          newAppt = { ...appointment, id: apptId, contactId: contact.id, status: "scheduled" as const };
        }

        mutate((d) => {
          const newAppts = newAppt ? [...d.appointments, newAppt] : d.appointments;
          return {
            ...d,
            calls: [...d.calls, newCall],
            appointments: newAppts,
            contacts: d.contacts.map((c) => (c.id === contact.id ? updatedContact : c)),
          };
        });
        toast("Call logged");

        // Supabase updates
        const supabase = await getSupabaseClient();
        await supabase.from('contacts').upsert(mapToContactRow(updatedContact));
        await supabase.from('calls').insert({
          id: newCall.id, contact_id: newCall.contactId, user_id: newCall.userId,
          at: new Date(newCall.at).toISOString(), disposition: newCall.disposition,
          note: newCall.note, duration_sec: newCall.durationSec
        });
        if (newAppt) {
          await supabase.from('appointments').insert({
            id: newAppt.id, contact_id: newAppt.contactId, user_id: newAppt.userId,
            title: newAppt.title, type: newAppt.type, at: new Date(newAppt.at).toISOString(),
            duration_min: newAppt.durationMin, location: newAppt.location, notes: newAppt.notes, status: newAppt.status
          });
        }
      },
      toast,
      toasts,
      dismissToast,
    };
  }, [db, isLoading, search, mutate, toast, toasts, dismissToast]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCrm() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useCrm outside CrmProvider");
  return v;
}

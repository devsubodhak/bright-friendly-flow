import { r as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as createClient } from "../_libs/supabase__supabase-js.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/store-CmcNzmGW.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var supabase = createClient("https://enyzjoiqzqcvvwxolzfv.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVueXpqb2lxenFjdnZ3eG9semZ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE4Nzk0NzgsImV4cCI6MjA5NzQ1NTQ3OH0.yC8WKnSA2VMCcaSSYbZoRKe6ke17xhUlmr94cFwAVu8");
var SERVICES = [
	{
		id: "web",
		label: "Web"
	},
	{
		id: "social",
		label: "Social media"
	},
	{
		id: "photo",
		label: "Photography"
	},
	{
		id: "video",
		label: "Videography"
	}
];
var STAGES = [
	{
		id: "new",
		label: "New lead"
	},
	{
		id: "contacted",
		label: "Contacted"
	},
	{
		id: "qualified",
		label: "Qualified"
	},
	{
		id: "proposal",
		label: "Proposal"
	},
	{
		id: "won",
		label: "Won"
	}
];
var DISPOSITIONS = [
	{
		id: "answered",
		label: "Spoke — interested",
		tone: "good"
	},
	{
		id: "callback",
		label: "Call back later",
		tone: ""
	},
	{
		id: "noanswer",
		label: "No answer",
		tone: ""
	},
	{
		id: "busy",
		label: "Busy / engaged",
		tone: ""
	},
	{
		id: "appt",
		label: "Booked appointment",
		tone: "good"
	},
	{
		id: "won",
		label: "Closed — won",
		tone: "good"
	},
	{
		id: "notnow",
		label: "Not now",
		tone: ""
	},
	{
		id: "notint",
		label: "Not interested",
		tone: "bad"
	},
	{
		id: "wrong",
		label: "Wrong number",
		tone: "bad"
	},
	{
		id: "dnc",
		label: "Do not call",
		tone: "bad"
	}
];
var APPT_TYPES = [
	"Discovery meeting",
	"Shoot / site visit",
	"Proposal review",
	"Follow-up call",
	"Handover"
];
var DAY = 864e5;
function uid() {
	return crypto.randomUUID();
}
function svc(id) {
	return SERVICES.find((s) => s.id === id)?.label ?? id;
}
function stageLabel(id) {
	return STAGES.find((s) => s.id === id)?.label ?? id;
}
function dispoLabel(id) {
	return DISPOSITIONS.find((d) => d.id === id)?.label ?? "—";
}
function fmtWhen(ts) {
	if (!ts) return "—";
	const d = new Date(ts);
	const now = /* @__PURE__ */ new Date();
	const sameDay = d.toDateString() === now.toDateString();
	const tom = new Date(now.getTime() + DAY).toDateString() === d.toDateString();
	const yest = (/* @__PURE__ */ new Date(now.getTime() - DAY)).toDateString() === d.toDateString();
	const t = d.toLocaleTimeString([], {
		hour: "numeric",
		minute: "2-digit"
	});
	if (sameDay) return "Today " + t;
	if (tom) return "Tomorrow " + t;
	if (yest) return "Yesterday " + t;
	return d.toLocaleDateString([], {
		day: "numeric",
		month: "short"
	}) + " " + t;
}
function relOverdue(ts) {
	const diff = Date.now() - ts;
	const days = Math.floor(diff / DAY);
	if (days >= 1) return days + "d overdue";
	const hrs = Math.floor(diff / 36e5);
	if (hrs >= 1) return hrs + "h overdue";
	return "due now";
}
function toDatetimeLocal(ts) {
	if (!ts) return "";
	return (/* @__PURE__ */ new Date(ts - (/* @__PURE__ */ new Date()).getTimezoneOffset() * 6e4)).toISOString().slice(0, 16);
}
var Ctx = (0, import_react.createContext)(null);
function mapUser(row) {
	return {
		id: row.id,
		name: row.name,
		role: row.role,
		color: row.color,
		initials: row.initials
	};
}
function mapContact(row) {
	return {
		id: row.id,
		name: row.name,
		company: row.company,
		phone: row.phone,
		email: row.email,
		service: row.service,
		stage: row.stage,
		owner: row.owner_id,
		source: row.source,
		notes: row.notes,
		nextCallAt: row.next_call_at ? new Date(row.next_call_at).getTime() : null,
		lastDisposition: row.last_disposition,
		doNotCall: row.do_not_call,
		createdAt: new Date(row.created_at).getTime()
	};
}
function mapToContactRow(c) {
	return {
		id: c.id,
		name: c.name,
		company: c.company,
		phone: c.phone,
		email: c.email,
		service: c.service,
		stage: c.stage,
		owner_id: c.owner,
		source: c.source,
		notes: c.notes,
		next_call_at: c.nextCallAt ? new Date(c.nextCallAt).toISOString() : null,
		last_disposition: c.lastDisposition,
		do_not_call: c.doNotCall,
		created_at: new Date(c.createdAt).toISOString()
	};
}
function mapCall(row) {
	return {
		id: row.id,
		contactId: row.contact_id,
		userId: row.user_id,
		at: new Date(row.at).getTime(),
		disposition: row.disposition,
		note: row.note,
		durationSec: row.duration_sec
	};
}
function mapAppt(row) {
	return {
		id: row.id,
		contactId: row.contact_id,
		userId: row.user_id,
		title: row.title,
		type: row.type,
		at: new Date(row.at).getTime(),
		durationMin: row.duration_min,
		location: row.location,
		notes: row.notes,
		status: row.status
	};
}
function CrmProvider({ children }) {
	const [db, setDb] = (0, import_react.useState)({
		users: [],
		contacts: [],
		appointments: [],
		calls: [],
		currentUserId: ""
	});
	const [isLoading, setIsLoading] = (0, import_react.useState)(true);
	const [search, setSearch] = (0, import_react.useState)("");
	const [toasts, setToasts] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		async function loadData() {
			const [{ data: users }, { data: contacts }, { data: appointments }, { data: calls }] = await Promise.all([
				supabase.from("users").select("*"),
				supabase.from("contacts").select("*"),
				supabase.from("appointments").select("*"),
				supabase.from("calls").select("*")
			]);
			const mappedUsers = (users || []).map(mapUser);
			setDb({
				users: mappedUsers,
				contacts: (contacts || []).map(mapContact),
				appointments: (appointments || []).map(mapAppt),
				calls: (calls || []).map(mapCall),
				currentUserId: mappedUsers.length > 0 ? mappedUsers[0].id : ""
			});
			setIsLoading(false);
		}
		loadData();
	}, []);
	const mutate = (0, import_react.useCallback)((fn) => {
		setDb((prev) => fn({
			...prev,
			contacts: [...prev.contacts],
			appointments: [...prev.appointments],
			calls: [...prev.calls]
		}));
	}, []);
	const toast = (0, import_react.useCallback)((msg) => {
		const id = uid();
		setToasts((t) => [...t, {
			id,
			msg
		}]);
		setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 2800);
	}, []);
	const dismissToast = (0, import_react.useCallback)((id) => setToasts((t) => t.filter((x) => x.id !== id)), []);
	const value = (0, import_react.useMemo)(() => {
		const userMap = new Map(db.users.map((u) => [u.id, u]));
		const contactMap = new Map(db.contacts.map((c) => [c.id, c]));
		return {
			db,
			isLoading,
			search,
			setSearch,
			setCurrentUser: (id) => {
				mutate((d) => ({
					...d,
					currentUserId: id
				}));
				toast("Now acting as " + (userMap.get(id)?.name ?? "—"));
			},
			user: (id) => userMap.get(id) ?? {
				id: "",
				name: "—",
				role: "",
				color: "#999",
				initials: "?"
			},
			contact: (id) => contactMap.get(id),
			matchSearch: (c) => {
				if (!search) return true;
				return (c.name + " " + c.company + " " + c.phone).toLowerCase().includes(search.toLowerCase());
			},
			upsertContact: async (c, isNew) => {
				mutate((d) => {
					if (isNew) return {
						...d,
						contacts: [...d.contacts, c]
					};
					return {
						...d,
						contacts: d.contacts.map((x) => x.id === c.id ? c : x)
					};
				});
				toast(isNew ? "Contact added" : "Contact saved");
				await supabase.from("contacts").upsert(mapToContactRow(c));
			},
			deleteContact: async (id) => {
				mutate((d) => ({
					...d,
					contacts: d.contacts.filter((c) => c.id !== id)
				}));
				toast("Contact deleted");
				await supabase.from("contacts").delete().eq("id", id);
			},
			markApptDone: async (id) => {
				mutate((d) => ({
					...d,
					appointments: d.appointments.map((a) => a.id === id ? {
						...a,
						status: "done"
					} : a)
				}));
				toast("Appointment done");
				await supabase.from("appointments").update({ status: "done" }).eq("id", id);
			},
			cancelAppointment: async (id) => {
				mutate((d) => ({
					...d,
					appointments: d.appointments.map((a) => a.id === id ? {
						...a,
						status: "cancelled"
					} : a)
				}));
				toast("Appointment cancelled");
				await supabase.from("appointments").update({ status: "cancelled" }).eq("id", id);
			},
			deleteAppointment: async (id) => {
				mutate((d) => ({
					...d,
					appointments: d.appointments.filter((a) => a.id !== id)
				}));
				toast("Appointment deleted");
				await supabase.from("appointments").delete().eq("id", id);
			},
			deleteCall: async (id) => {
				mutate((d) => ({
					...d,
					calls: d.calls.filter((c) => c.id !== id)
				}));
				toast("Call log removed");
				await supabase.from("calls").delete().eq("id", id);
			},
			moveStage: async (cid, stage) => {
				let name = "";
				mutate((d) => ({
					...d,
					contacts: d.contacts.map((c) => {
						if (c.id === cid) {
							name = c.name;
							return {
								...c,
								stage
							};
						}
						return c;
					})
				}));
				toast(`${name} → ${stage}`);
				await supabase.from("contacts").update({ stage }).eq("id", cid);
			},
			saveCall: async ({ contact, disposition, note, nextCallAt, appointment }) => {
				const updatedContact = {
					...contact,
					lastDisposition: disposition
				};
				if (disposition === "dnc") {
					updatedContact.doNotCall = true;
					updatedContact.nextCallAt = null;
				} else if (disposition === "notint" || disposition === "wrong") updatedContact.nextCallAt = null;
				else if (disposition === "won") {
					updatedContact.stage = "won";
					updatedContact.nextCallAt = null;
				} else if (disposition === "appt") {
					updatedContact.nextCallAt = null;
					if (updatedContact.stage === "new" || updatedContact.stage === "contacted") updatedContact.stage = "qualified";
				} else if ([
					"callback",
					"noanswer",
					"busy",
					"notnow"
				].includes(disposition)) updatedContact.nextCallAt = nextCallAt ?? Date.now() + 864e5;
				else {
					if (updatedContact.stage === "new") updatedContact.stage = "contacted";
					updatedContact.nextCallAt = nextCallAt ?? updatedContact.nextCallAt;
				}
				const newCall = {
					id: uid(),
					contactId: contact.id,
					userId: db.currentUserId,
					at: Date.now(),
					disposition,
					note,
					durationSec: 0
				};
				let newAppt = null;
				if (appointment) {
					const apptId = uid();
					newAppt = {
						...appointment,
						id: apptId,
						contactId: contact.id,
						status: "scheduled"
					};
				}
				mutate((d) => {
					const newAppts = newAppt ? [...d.appointments, newAppt] : d.appointments;
					return {
						...d,
						calls: [...d.calls, newCall],
						appointments: newAppts,
						contacts: d.contacts.map((c) => c.id === contact.id ? updatedContact : c)
					};
				});
				toast("Call logged");
				await supabase.from("contacts").upsert(mapToContactRow(updatedContact));
				await supabase.from("calls").insert({
					id: newCall.id,
					contact_id: newCall.contactId,
					user_id: newCall.userId,
					at: new Date(newCall.at).toISOString(),
					disposition: newCall.disposition,
					note: newCall.note,
					duration_sec: newCall.durationSec
				});
				if (newAppt) await supabase.from("appointments").insert({
					id: newAppt.id,
					contact_id: newAppt.contactId,
					user_id: newAppt.userId,
					title: newAppt.title,
					type: newAppt.type,
					at: new Date(newAppt.at).toISOString(),
					duration_min: newAppt.durationMin,
					location: newAppt.location,
					notes: newAppt.notes,
					status: newAppt.status
				});
			},
			toast,
			toasts,
			dismissToast
		};
	}, [
		db,
		isLoading,
		search,
		mutate,
		toast,
		toasts,
		dismissToast
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ctx.Provider, {
		value,
		children
	});
}
function useCrm() {
	const v = (0, import_react.useContext)(Ctx);
	if (!v) throw new Error("useCrm outside CrmProvider");
	return v;
}
//#endregion
export { SERVICES as a, fmtWhen as c, svc as d, toDatetimeLocal as f, DISPOSITIONS as i, relOverdue as l, useCrm as m, CrmProvider as n, STAGES as o, uid as p, DAY as r, dispoLabel as s, APPT_TYPES as t, stageLabel as u };

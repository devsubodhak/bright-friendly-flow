import { createFileRoute } from "@tanstack/react-router";
import { useCrm } from "@/lib/crm/store";

export const Route = createFileRoute("/appointments")({
  head: () => ({ meta: [{ title: "Appointments — Univerz CRM" }] }),
  component: AppointmentsPage,
});

function AppointmentsPage() {
  const { db, matchSearch, contact, user, markApptDone, cancelAppointment, deleteAppointment } = useCrm();
  const list = db.appointments
    .filter((a) => { const c = contact(a.contactId); return c ? matchSearch(c) : true; })
    .slice()
    .sort((a, b) => a.at - b.at);

  if (!list.length) {
    return <div className="empty"><b>No appointments yet</b>Book one from a call (choose "Booked appointment") or from a contact.</div>;
  }

  return (
    <div className="queue stagger">
      {list.map((a, i) => {
        const c = contact(a.contactId) ?? { name: "—", company: "" };
        const o = user(a.userId);
        const d = new Date(a.at);
        const statusClass = a.status === "done" ? "done" : a.status === "cancelled" ? "cancelled" : "";
        return (
          <div key={a.id} className={`appt ${statusClass}`} style={{ ["--d" as string]: `${i * 0.04}s` }}>
            <div className="date">
              <div className="d">{d.getDate()}</div>
              <div className="m">{d.toLocaleDateString([], { month: "short" })}</div>
            </div>
            <div>
              <div className="ttl">{a.title} <span className="pill stage">{a.type}</span></div>
              <div className="det">
                <span className="num">{d.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })} · {a.durationMin}min</span>
                <span>{c.name} — {c.company}</span>
                {a.location && <span>📍 {a.location}</span>}
                <span><span className="dot" style={{ background: o.color }} />{o.name}</span>
              </div>
              {a.notes && <div className="det" style={{ marginTop: 5 }}>{a.notes}</div>}
            </div>
            <div style={{ display: "flex", gap: 7, alignItems: "center" }}>
              {a.status === "scheduled" && (
                <>
                  <button className="btn sm" onClick={() => markApptDone(a.id)}>Mark done</button>
                  <button className="btn sm warn" onClick={() => cancelAppointment(a.id)}>Cancel</button>
                  <button className="del-x" onClick={() => deleteAppointment(a.id)} title="Delete appointment">×</button>
                </>
              )}
              {a.status === "done" && (
                <>
                  <span className="pill good">Done</span>
                  <button className="del-x" onClick={() => deleteAppointment(a.id)} title="Delete appointment">×</button>
                </>
              )}
              {a.status === "cancelled" && (
                <>
                  <span className="pill" style={{ background: "var(--amber-wash)", color: "var(--amber)" }}>Cancelled</span>
                  <button className="del-x" onClick={() => deleteAppointment(a.id)} title="Delete appointment">×</button>
                </>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

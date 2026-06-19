import { createFileRoute } from "@tanstack/react-router";
import { useCrm } from "@/lib/crm/store";
import { dispoLabel, fmtWhen } from "@/lib/crm/format";

export const Route = createFileRoute("/team")({
  head: () => ({ meta: [{ title: "People & activity — Univerz CRM" }] }),
  component: TeamPage,
});

function TeamPage() {
  const { db, user, contact } = useCrm();
  const today = new Date().toDateString();

  const acts = [
    ...db.calls.map((c) => ({
      t: c.at, txt: `${user(c.userId).name} called ${contact(c.contactId)?.name ?? "—"} — ${dispoLabel(c.disposition)}`,
    })),
    ...db.appointments.map((a) => ({
      t: a.at, txt: `${user(a.userId).name} has ${a.title} with ${contact(a.contactId)?.name ?? "—"}`,
    })),
  ].sort((a, b) => b.t - a.t).slice(0, 8);

  return (
    <>
      <div className="sec-h"><h2>The team (6 seats)</h2><div className="rule" /></div>
      <div className="queue stagger">
        {db.users.map((u, i) => {
          const owned = db.contacts.filter((c) => c.owner === u.id).length;
          const callsToday = db.calls.filter((c) => c.userId === u.id && new Date(c.at).toDateString() === today).length;
          const appts = db.appointments.filter((a) => a.userId === u.id && a.status === "scheduled").length;
          return (
            <div key={u.id} className="appt" style={{ ["--d" as string]: `${i * 0.04}s` }}>
              <div className="avatar" style={{ background: u.color, width: 42, height: 42, fontSize: 14 }}>{u.initials}</div>
              <div>
                <div className="ttl">{u.name}</div>
                <div className="det"><span>{u.role}</span></div>
              </div>
              <div style={{ display: "flex", gap: 22, textAlign: "right" }}>
                <div><div className="num" style={{ fontSize: 18, fontWeight: 600 }}>{owned}</div><div style={{ fontSize: 11, color: "var(--muted)" }}>contacts</div></div>
                <div><div className="num" style={{ fontSize: 18, fontWeight: 600 }}>{callsToday}</div><div style={{ fontSize: 11, color: "var(--muted)" }}>calls today</div></div>
                <div><div className="num" style={{ fontSize: 18, fontWeight: 600 }}>{appts}</div><div style={{ fontSize: 11, color: "var(--muted)" }}>appts</div></div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="sec-h"><h2>Recent activity</h2><div className="rule" /></div>
      <div className="queue stagger">
        {acts.map((a, i) => (
          <div key={i} className="qcard soon" style={{ ["--d" as string]: `${i * 0.03}s` }}>
            <div className="spine" />
            <div className="body">
              <div className="row1"><span>{a.txt}</span></div>
              <div className="meta"><span className="when">{fmtWhen(a.t)}</span></div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

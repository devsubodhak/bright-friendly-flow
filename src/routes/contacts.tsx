import { createFileRoute } from "@tanstack/react-router";
import { useCrm } from "@/lib/crm/store";
import { fmtWhen, stageLabel, svc } from "@/lib/crm/format";
import { openContactModal, openLogCallModal } from "@/components/AppShell";

export const Route = createFileRoute("/contacts")({
  head: () => ({ meta: [{ title: "Contacts — Univerz CRM" }] }),
  component: ContactsPage,
});

function ContactsPage() {
  const { db, matchSearch, user } = useCrm();
  const rows = db.contacts.filter(matchSearch)
    .slice()
    .sort((a, b) => (a.nextCallAt ?? 9e15) - (b.nextCallAt ?? 9e15));

  if (!rows.length) {
    return <div className="empty"><b>No contacts found</b>Try a different search, or add a new contact.</div>;
  }
  const now = Date.now();
  return (
    <div className="tablewrap">
      <table>
        <thead><tr>
          <th>Name</th><th>Company</th><th>Phone</th><th>Service</th><th>Stage</th><th>Owner</th><th>Next call</th><th />
        </tr></thead>
        <tbody>
          {rows.map((c, i) => {
            const o = user(c.owner);
            const overdueColor = c.nextCallAt && c.nextCallAt < now ? "var(--clay)" : "var(--ink-soft)";
            return (
              <tr key={c.id} style={{ ["--d" as string]: `${Math.min(i, 12) * 0.02}s` }}>
                <td><span className="nm">{c.name}</span></td>
                <td>{c.company}</td>
                <td><span className="num">{c.phone}</span></td>
                <td><span className={`pill ${c.service}`}>{svc(c.service)}</span></td>
                <td><span className="pill stage">{stageLabel(c.stage)}</span></td>
                <td><span className="owner-tag"><span className="dot" style={{ background: o.color }} />{o.name}</span></td>
                <td>
                  {c.doNotCall
                    ? <span style={{ color: "var(--muted)" }}>do not call</span>
                    : <span className="num" style={{ color: overdueColor }}>{fmtWhen(c.nextCallAt)}</span>}
                </td>
                <td style={{ textAlign: "right", whiteSpace: "nowrap" }}>
                  <button className="btn sm" onClick={() => openLogCallModal(c)}>Call</button>{" "}
                  <button className="btn ghost sm" onClick={() => openContactModal(c)}>Edit</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

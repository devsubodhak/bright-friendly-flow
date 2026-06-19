import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import { useCrm } from "@/lib/crm/store";
import { openContactModal, openLogCallModal } from "@/components/AppShell";
import { fmtWhen, relOverdue, stageLabel, svc } from "@/lib/crm/format";
import { PhoneIcon } from "@/components/icons";
import type { Contact } from "@/lib/crm/types";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [{ title: "Today's calls — Univerz CRM" }] }),
  component: TodayPage,
});

function TodayPage() {
  const { db, matchSearch, user } = useCrm();

  const sections = useMemo(() => {
    const now = Date.now();
    const today = new Date().toDateString();
    const q = db.contacts
      .filter((c) => !c.doNotCall && c.nextCallAt)
      .filter(matchSearch)
      .sort((a, b) => (a.nextCallAt ?? 0) - (b.nextCallAt ?? 0));
    const overdue = q.filter((c) => (c.nextCallAt ?? 0) < now - 60e3);
    const todayList = q.filter((c) => (c.nextCallAt ?? 0) >= now - 60e3 && new Date(c.nextCallAt!).toDateString() === today);
    const later = q.filter((c) => !overdue.includes(c) && !todayList.includes(c));
    const callsToday = db.calls.filter((c) => new Date(c.at).toDateString() === today).length;
    const apptToday = db.appointments.filter((a) => a.status === "scheduled" && new Date(a.at).toDateString() === today).length;
    return { q, overdue, todayList, later, callsToday, apptToday };
  }, [db, matchSearch]);

  const { overdue, todayList, later, callsToday, apptToday, q } = sections;
  const pct = q.length ? Math.round((callsToday / (callsToday + overdue.length + todayList.length || 1)) * 100) : 0;

  const renderSection = (title: string, list: Contact[], cls: "overdue" | "today" | "soon") => {
    if (!list.length) return null;
    return (
      <div key={title}>
        <div className="sec-h"><h2>{title}</h2><span className="count">{list.length}</span><div className="rule" /></div>
        <div className="queue stagger">
          {list.map((c, i) => {
            const o = user(c.owner);
            const isOverdue = cls === "overdue";
            return (
              <div key={c.id} className={`qcard ${cls}`} style={{ ["--d" as string]: `${i * 0.04}s` }}>
                <div className="spine" />
                <div className="body">
                  <div className="row1">
                    <span className="who">{c.name}</span>
                    <span className="co">· {c.company}</span>
                    <span className={`pill ${c.service}`}>{svc(c.service)}</span>
                    <span className="pill stage">{stageLabel(c.stage)}</span>
                  </div>
                  <div className="meta">
                    <span className="num"><PhoneIcon />{c.phone}</span>
                    <span className="when">{isOverdue ? relOverdue(c.nextCallAt!) : fmtWhen(c.nextCallAt)}</span>
                    <span><span className="dot" style={{ background: o.color }} />{o.name}</span>
                  </div>
                </div>
                <div className="acts">
                  <button className="btn primary sm" onClick={() => openLogCallModal(c)}>Log call</button>
                  <button className="btn sm" onClick={() => openContactModal(c)}>Open</button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="stats stagger">
        <div className="stat alarm" style={{ ["--d" as string]: "0s" }}>
          <div className="k">Overdue calls</div>
          <div className="v">{overdue.length}</div>
          <div className="bar"><i style={{ width: overdue.length ? "100%" : 0, background: "var(--clay)" }} /></div>
        </div>
        <div className="stat" style={{ ["--d" as string]: ".05s" }}>
          <div className="k">Due today</div>
          <div className="v">{todayList.length}</div>
          <div className="bar"><i style={{ width: todayList.length ? "70%" : 0, background: "var(--amber)" }} /></div>
        </div>
        <div className="stat" style={{ ["--d" as string]: ".1s" }}>
          <div className="k">Calls logged today</div>
          <div className="v">{callsToday}</div>
          <div className="bar"><i style={{ width: `${pct}%` }} /></div>
        </div>
        <div className="stat" style={{ ["--d" as string]: ".15s" }}>
          <div className="k">Appointments today</div>
          <div className="v">{apptToday}</div>
          <div className="bar"><i style={{ width: apptToday ? "80%" : 0, background: "var(--teal)" }} /></div>
        </div>
      </div>

      {renderSection("Overdue", overdue, "overdue")}
      {renderSection("Due today", todayList, "today")}
      {renderSection("Coming up", later, "soon")}

      {!q.length && (
        <div className="empty">
          <b>Nothing in the queue</b>
          No calls scheduled. Open a contact and set a next-call time, or add a new contact.
        </div>
      )}
    </>
  );
}

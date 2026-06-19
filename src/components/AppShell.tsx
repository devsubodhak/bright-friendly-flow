import { Link, useRouterState, Outlet } from "@tanstack/react-router";
import { useMemo, useState, type ReactNode } from "react";
import { useCrm } from "@/lib/crm/store";
import { DAY } from "@/lib/crm/format";
import { ApptIcon, ContactsIcon, PipelineIcon, SearchIcon, TeamIcon, TodayIcon } from "./icons";
import { ContactModal } from "./ContactModal";
import { LogCallModal } from "./LogCallModal";
import { Toasts } from "./Toasts";
import type { Contact } from "@/lib/crm/types";

interface ModalState {
  contact?: { contact: Contact | null };
  call?: { contact: Contact };
}
const PAGES: Record<string, { title: string; crumb: string }> = {
  "/": { title: "Today's calls", crumb: "Calls due and overdue, oldest first" },
  "/contacts": { title: "Contacts", crumb: "Everyone in the pipeline" },
  "/appointments": { title: "Appointments", crumb: "Meetings, shoots and site visits" },
  "/pipeline": { title: "Pipeline", crumb: "Drag a card to move its stage" },
  "/team": { title: "People & activity", crumb: "Who is doing what" },
};

// Module-level event bus so route components can open modals from card clicks.
type Opener = (s: ModalState) => void;
let opener: Opener | null = null;
export function openContactModal(contact: Contact | null) { opener?.({ contact: { contact } }); }
export function openLogCallModal(contact: Contact) { opener?.({ call: { contact } }); }

export function AppShell() {
  const { db, isLoading, user, search, setSearch, setCurrentUser } = useCrm();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const page = PAGES[pathname] ?? { title: "Univerz CRM", crumb: "" };
  const [modal, setModal] = useState<ModalState>({});
  opener = setModal;

  const { dueBadge, apptBadge } = useMemo(() => {
    const now = Date.now();
    const today = new Date().toDateString();
    const due = db.contacts.filter((c) => !c.doNotCall && c.nextCallAt && (c.nextCallAt < now || new Date(c.nextCallAt).toDateString() === today)).length;
    const ap = db.appointments.filter((a) => a.status === "scheduled" && a.at >= now - DAY).length;
    return { dueBadge: due, apptBadge: ap };
  }, [db]);

  if (isLoading) {
    return (
      <div className="loader-screen">
        <div className="loader-card">
          <div className="loader-logo-wrap">
            <div className="loader-logo-ring"></div>
            <img src="/src/logo.png" alt="Univerz Logo" className="loader-logo" />
          </div>
          <h2 className="loader-title">Univerz CRM</h2>
          <div className="loader-subtitle">Securing Connection</div>
          <div className="loader-bar">
            <div className="loader-progress"></div>
          </div>
          <div className="loader-status">
            <span className="loader-dot"></span>
            <span>Syncing database tables…</span>
          </div>
        </div>
      </div>
    );
  }

  const me = user(db.currentUserId);

  const NavLink = ({ to, icon, label, badge }: { to: string; icon: ReactNode; label: string; badge?: number }) => (
    <Link to={to} className={pathname === to ? "on" : ""}>
      {icon}{label}
      {badge !== undefined && (
        <span className={`badge ${badge === 0 ? "zero" : ""}`}>{badge}</span>
      )}
    </Link>
  );

  return (
    <div className="app">
      <aside className="side">
        <div className="brand">
          <div className="mark">
            <img src="/src/logo.png" alt="Univerz Logo" className="brand-logo" />
            <div>
              <div className="name">Univerz CRM</div>
              <div className="sub">calls &amp; appointments</div>
            </div>
          </div>
        </div>
        <nav className="nav">
          <div className="group-label">Work</div>
          <NavLink to="/" icon={<TodayIcon />} label="Today's calls" badge={dueBadge} />
          <NavLink to="/contacts" icon={<ContactsIcon />} label="Contacts" />
          <NavLink to="/appointments" icon={<ApptIcon />} label="Appointments" badge={apptBadge} />
          <NavLink to="/pipeline" icon={<PipelineIcon />} label="Pipeline" />
          <div className="group-label">Team</div>
          <NavLink to="/team" icon={<TeamIcon />} label="People & activity" />
        </nav>
        <div className="whoami">
          <div className="avatar" style={{ background: me.color }}>{me.initials}</div>
          <select value={db.currentUserId} onChange={(e) => setCurrentUser(e.target.value)} title="Acting as">
            {db.users.map((u) => <option key={u.id} value={u.id}>{u.name} — {u.role}</option>)}
          </select>
        </div>
      </aside>

      <div className="main">
        <div className="topbar">
          <div>
            <h1>{page.title}</h1>
            <div className="crumb">{page.crumb}</div>
          </div>
          <div className="search">
            <SearchIcon />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search name, company or number…" />
          </div>
          <button className="btn primary" onClick={() => openContactModal(null)}>+ New contact</button>
        </div>
        <div className="content">
          <Outlet />
        </div>
      </div>

      {modal.contact && <ContactModal contact={modal.contact.contact} onClose={() => setModal({})} />}
      {modal.call && <LogCallModal contact={modal.call.contact} onClose={() => setModal({})} />}
      <Toasts />
    </div>
  );
}

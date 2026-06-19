import { useState } from "react";
import { Modal } from "./Modal";
import { useCrm } from "@/lib/crm/store";
import { APPT_TYPES, DISPOSITIONS, type Contact, type DispositionId } from "@/lib/crm/types";
import { DAY, toDatetimeLocal } from "@/lib/crm/format";

const NEEDS_NEXT: DispositionId[] = ["callback", "noanswer", "busy", "notnow"];

export function LogCallModal({ contact, onClose }: { contact: Contact; onClose: () => void }) {
  const { db, user, saveCall, toast } = useCrm();
  const [dispo, setDispo] = useState<DispositionId | "">("");
  const [note, setNote] = useState("");
  const [nextAt, setNextAt] = useState<string>("");

  // appointment fields
  const defaultApptAt = () => {
    const d = new Date(Date.now() + DAY); d.setMinutes(0, 0, 0);
    return toDatetimeLocal(d.getTime());
  };
  const [apptType, setApptType] = useState(APPT_TYPES[0]);
  const [apptUser, setApptUser] = useState(db.currentUserId);
  const [apptAt, setApptAt] = useState<string>(defaultApptAt());
  const [apptDur, setApptDur] = useState(60);
  const [apptLoc, setApptLoc] = useState("");

  const showNext = dispo && NEEDS_NEXT.includes(dispo);
  const showAppt = dispo === "appt";

  const quick = (h: number) => {
    setNextAt(toDatetimeLocal(Date.now() + h * 3600e3));
  };

  const save = () => {
    if (!dispo) { toast("Pick how the call went"); return; }
    const nextCallAt = showNext && nextAt ? new Date(nextAt).getTime() : null;
    const appointment = showAppt && apptAt ? {
      userId: apptUser, title: apptType, type: apptType,
      at: new Date(apptAt).getTime(), durationMin: Number(apptDur) || 60,
      location: apptLoc.trim(), notes: note.trim(),
    } : undefined;
    saveCall({ contact, disposition: dispo, note: note.trim(), nextCallAt, appointment });
    onClose();
  };

  return (
    <Modal
      title={`Log call — ${contact.name}`}
      onClose={onClose}
      footer={<>
        <button className="btn" onClick={onClose}>Cancel</button>
        <button className="btn primary" onClick={save}>Save call</button>
      </>}
    >
      <div style={{ fontSize: 12.5, color: "var(--muted)", marginBottom: 12 }}>
        <span style={{ fontFamily: "var(--mono)" }}>{contact.phone}</span> · {contact.company} · owner {user(contact.owner).name}
      </div>
      <div className="field">
        <label>How did it go?</label>
        <div className="chips">
          {DISPOSITIONS.map((d) => (
            <button key={d.id}
              className={`chip ${d.tone} ${dispo === d.id ? "sel" : ""}`}
              onClick={() => setDispo(d.id)}>{d.label}</button>
          ))}
        </div>
      </div>
      <div className="field">
        <label>Note</label>
        <textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder="What was said, next step…" />
      </div>

      {showNext && (
        <div className="subpanel">
          <div className="ttl">Schedule the next call</div>
          <div className="chips" style={{ marginBottom: 10 }}>
            <button className="chip" onClick={() => quick(3)}>In 3 hours</button>
            <button className="chip" onClick={() => quick(24)}>Tomorrow</button>
            <button className="chip" onClick={() => quick(72)}>In 3 days</button>
            <button className="chip" onClick={() => quick(168)}>Next week</button>
          </div>
          <input className="num" type="datetime-local" value={nextAt}
            onChange={(e) => setNextAt(e.target.value)}
            style={{ width: "100%", border: "1px solid var(--line-strong)", borderRadius: 7, padding: "9px 10px", fontFamily: "var(--mono)" }} />
        </div>
      )}

      {showAppt && (
        <div className="subpanel">
          <div className="ttl">Book the appointment</div>
          <div className="grid2">
            <div className="field"><label>Type</label>
              <select value={apptType} onChange={(e) => setApptType(e.target.value)}>
                {APPT_TYPES.map((t) => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div className="field"><label>Assign to</label>
              <select value={apptUser} onChange={(e) => setApptUser(e.target.value)}>
                {db.users.map((u) => <option key={u.id} value={u.id}>{u.name}</option>)}
              </select>
            </div>
          </div>
          <div className="grid2">
            <div className="field"><label>Date &amp; time</label>
              <input className="num" type="datetime-local" value={apptAt} onChange={(e) => setApptAt(e.target.value)} />
            </div>
            <div className="field"><label>Duration (min)</label>
              <input className="num" type="number" value={apptDur} onChange={(e) => setApptDur(Number(e.target.value))} />
            </div>
          </div>
          <div className="field"><label>Location</label>
            <input value={apptLoc} onChange={(e) => setApptLoc(e.target.value)} placeholder="Office, Zoom, site address…" />
          </div>
        </div>
      )}
    </Modal>
  );
}

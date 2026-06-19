import { useState } from "react";
import { Modal } from "./Modal";
import { useCrm } from "@/lib/crm/store";
import { SERVICES, STAGES, type Contact, type ServiceId, type StageId } from "@/lib/crm/types";
import { toDatetimeLocal, uid } from "@/lib/crm/format";

export function ContactModal({ contact, onClose }: { contact: Contact | null; onClose: () => void }) {
  const { db, upsertContact, deleteContact } = useCrm();
  const isNew = !contact;
  const [form, setForm] = useState<Contact>(() =>
    contact ?? {
      id: uid(), name: "", company: "", phone: "", email: "",
      service: "web" as ServiceId, stage: "new" as StageId, owner: db.currentUserId,
      source: "", notes: "", nextCallAt: null, lastDisposition: "",
      doNotCall: false, createdAt: Date.now(),
    },
  );
  const [err, setErr] = useState(false);

  const upd = <K extends keyof Contact>(k: K, v: Contact[K]) => setForm((f) => ({ ...f, [k]: v }));

  const save = () => {
    if (!form.name.trim()) { setErr(true); return; }
    upsertContact({ ...form, name: form.name.trim() }, isNew);
    onClose();
  };

  const del = () => {
    if (contact && confirm("Delete this contact?")) {
      deleteContact(contact.id);
      onClose();
    }
  };

  return (
    <Modal
      title={isNew ? "New contact" : "Edit contact"}
      onClose={onClose}
      footer={<>
        {!isNew && <button className="btn danger" style={{ marginRight: "auto" }} onClick={del}>Delete</button>}
        <button className="btn" onClick={onClose}>Cancel</button>
        <button className="btn primary" onClick={save}>{isNew ? "Add contact" : "Save changes"}</button>
      </>}
    >
      <div className="grid2">
        <div className="field"><label>Name</label>
          <input value={form.name} onChange={(e) => { setErr(false); upd("name", e.target.value); }}
            style={err ? { borderColor: "var(--clay)" } : undefined}
            placeholder="e.g. Nimal Perera" />
        </div>
        <div className="field"><label>Company</label>
          <input value={form.company} onChange={(e) => upd("company", e.target.value)} placeholder="e.g. Sunrise Villas" />
        </div>
      </div>
      <div className="grid2">
        <div className="field"><label>Phone</label>
          <input className="num" value={form.phone} onChange={(e) => upd("phone", e.target.value)} placeholder="07X XXX XXXX" />
        </div>
        <div className="field"><label>Email <span style={{ color: "var(--muted)", fontWeight: 400 }}>(optional)</span></label>
          <input value={form.email} onChange={(e) => upd("email", e.target.value)} />
        </div>
      </div>
      <div className="grid2">
        <div className="field"><label>Service needed</label>
          <select value={form.service} onChange={(e) => upd("service", e.target.value as ServiceId)}>
            {SERVICES.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
          </select>
        </div>
        <div className="field"><label>Stage</label>
          <select value={form.stage} onChange={(e) => upd("stage", e.target.value as StageId)}>
            {STAGES.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
          </select>
        </div>
      </div>
      <div className="grid2">
        <div className="field"><label>Owner</label>
          <select value={form.owner} onChange={(e) => upd("owner", e.target.value)}>
            {db.users.map((u) => <option key={u.id} value={u.id}>{u.name}</option>)}
          </select>
        </div>
        <div className="field"><label>Source</label>
          <input value={form.source} onChange={(e) => upd("source", e.target.value)} placeholder="Referral, Facebook, expo…" />
        </div>
      </div>
      <div className="field"><label>Next call</label>
        <input className="num" type="datetime-local"
          value={toDatetimeLocal(form.nextCallAt)}
          onChange={(e) => upd("nextCallAt", e.target.value ? new Date(e.target.value).getTime() : null)} />
      </div>
      <div className="field"><label>Notes</label>
        <textarea value={form.notes} onChange={(e) => upd("notes", e.target.value)}
          placeholder="Context, what they want, budget hints…" />
      </div>
      <label className="toggle">
        <input type="checkbox" checked={form.doNotCall}
          onChange={(e) => upd("doNotCall", e.target.checked)} />
        Do not call
      </label>
    </Modal>
  );
}

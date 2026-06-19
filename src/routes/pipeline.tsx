import { createFileRoute } from "@tanstack/react-router";
import { useRef } from "react";
import { useCrm } from "@/lib/crm/store";
import { STAGES, type StageId } from "@/lib/crm/types";
import { svc } from "@/lib/crm/format";

export const Route = createFileRoute("/pipeline")({
  head: () => ({ meta: [{ title: "Pipeline — Univerz CRM" }] }),
  component: PipelinePage,
});

function PipelinePage() {
  const { db, matchSearch, user, moveStage } = useCrm();
  const dragRef = useRef<string | null>(null);

  return (
    <div className="board">
      {STAGES.map((st) => {
        const items = db.contacts.filter((c) => c.stage === st.id && matchSearch(c));
        return (
          <div key={st.id} className="col"
            onDragOver={(e) => { e.preventDefault(); e.currentTarget.classList.add("drop"); }}
            onDragLeave={(e) => e.currentTarget.classList.remove("drop")}
            onDrop={(e) => {
              e.preventDefault();
              e.currentTarget.classList.remove("drop");
              if (dragRef.current) moveStage(dragRef.current, st.id as StageId);
              dragRef.current = null;
            }}
          >
            <h3>{st.label}<span className="c">{items.length}</span></h3>
            {items.map((c) => {
              const o = user(c.owner);
              return (
                <div key={c.id} className="dcard" draggable
                  onDragStart={(e) => { dragRef.current = c.id; e.currentTarget.classList.add("dragging"); }}
                  onDragEnd={(e) => e.currentTarget.classList.remove("dragging")}
                >
                  <div className="dn">{c.name}</div>
                  <div className="dco">{c.company}</div>
                  <div className="dfoot">
                    <span className={`pill ${c.service}`}>{svc(c.service)}</span>
                    <span className="dot" style={{ background: o.color }} title={o.name} />
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

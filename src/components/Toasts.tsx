import { useCrm } from "@/lib/crm/store";

export function Toasts() {
  const { toasts } = useCrm();
  return (
    <div className="toasts">
      {toasts.map((t) => (
        <div key={t.id} className="toast"><span className="tk" />{t.msg}</div>
      ))}
    </div>
  );
}

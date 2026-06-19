import { useEffect, type ReactNode } from "react";

export function Modal({ title, onClose, children, footer }: {
  title: string;
  onClose: () => void;
  children: ReactNode;
  footer: ReactNode;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);
  return (
    <div className="scrim" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal" onMouseDown={(e) => e.stopPropagation()}>
        <header>
          <h3>{title}</h3>
          <button className="x" onClick={onClose} aria-label="Close">×</button>
        </header>
        <div className="pad">{children}</div>
        <footer>{footer}</footer>
      </div>
    </div>
  );
}

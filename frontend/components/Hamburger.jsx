// ─── HAMBURGER BUTTON ────────────────────────────────────────────────────────
export default function Hamburger({ open, onToggle, t }) {
  return (
    <button onClick={onToggle} data-mag style={{
      width: 48, height: 48, background: "transparent", border: `1px solid ${t.border}`, borderRadius: 10, cursor: "pointer",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 5,
      transition: "all .3s",
      background: open ? t.accent + "18" : "transparent",
      borderColor: open ? t.accent + "50" : t.border,
    }}>
      <span style={{ width: 22, height: 1.5, borderRadius: 2, background: open ? t.accent : t.text, transform: open ? "rotate(45deg) translate(0,4.5px)" : "none", transition: "transform .4s cubic-bezier(0.16,1,0.3,1), background .3s" }} />
      <span style={{ width: 22, height: 1.5, borderRadius: 2, background: open ? t.accent : t.text, opacity: open ? 0 : 1, transform: open ? "scaleX(0)" : "scaleX(1)", transition: "opacity .3s, transform .3s, background .3s" }} />
      <span style={{ width: 22, height: 1.5, borderRadius: 2, background: open ? t.accent : t.text, transform: open ? "rotate(-45deg) translate(0,-4.5px)" : "none", transition: "transform .4s cubic-bezier(0.16,1,0.3,1), background .3s" }} />
    </button>
  );
}

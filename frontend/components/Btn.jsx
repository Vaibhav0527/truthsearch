import { useState } from "react";

// ─── BUTTON ──────────────────────────────────────────────────────────────────
export default function Btn({ children, onClick, v = "primary", sz = "md", t, icon, style = {}, disabled }) {
  const [hov, setHov] = useState(false);
  const sz2 = { sm: { p: "7px 18px", fs: 12 }, md: { p: "12px 26px", fs: 14 }, lg: { p: "16px 36px", fs: 15 } }[sz];
  const isPrim = v === "primary";
  return (
    <button onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} onClick={disabled ? undefined : onClick} data-mag
      style={{
        display: "inline-flex", alignItems: "center", gap: 9, borderRadius: 9, fontWeight: 700,
        cursor: disabled ? "not-allowed" : "pointer", border: "none", fontFamily: "'Space Grotesk',sans-serif",
        letterSpacing: ".04em", transition: "all .25s cubic-bezier(0.16,1,0.3,1)", opacity: disabled ? .4 : 1,
        padding: sz2.p, fontSize: sz2.fs,
        ...(isPrim
          ? { background: hov ? `linear-gradient(135deg,#c084fc,#6d28d9)` : `linear-gradient(135deg,${t.accent},#7c3aed)`, color: "#fff", boxShadow: hov ? `0 8px 32px ${t.glow}` : `0 4px 18px ${t.glow}`, transform: hov ? "translateY(-2px)" : "translateY(0)" }
          : { background: hov ? t.border : "transparent", color: t.muted, border: `1px solid ${t.border}`, transform: hov ? "translateY(-1px)" : "translateY(0)" }),
        ...style
      }}>{icon}{children}
    </button>
  );
}

import { useState, useEffect } from "react";

// ─── TRUST GAUGE ─────────────────────────────────────────────────────────────
export default function TrustGauge({ score = 0, size = 200, t }) {
  const [disp, setDisp] = useState(0);
  useEffect(() => {
    let v = 0;
    const go = () => { v = Math.min(v + 2, score); setDisp(Math.round(v)); if (v < score) requestAnimationFrame(go); };
    const id = setTimeout(() => requestAnimationFrame(go), 500);
    return () => clearTimeout(id);
  }, [score]);
  const r = (size - 30) / 2, C = 2 * Math.PI * r;
  const col = disp >= 70 ? t.hi : disp >= 40 ? t.mid : t.lo;
  const lbl = disp >= 70 ? "LIKELY TRUE" : disp >= 40 ? "SUSPICIOUS" : "MISLEADING";
  return (
    <div style={{ position: "relative", width: size, height: size, margin: "0 auto" }}>
      <svg width={size} height={size}>
        <defs><filter id="gaugeGlow"><feGaussianBlur stdDeviation="4" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter></defs>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={col + "15"} strokeWidth="14" strokeDasharray={`${C * .75} ${C}`} strokeLinecap="round" style={{ transform: "rotate(135deg)", transformOrigin: `${size / 2}px ${size / 2}px` }} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={col} strokeWidth="14" strokeDasharray={`${(disp / 100) * C * .75} ${C}`} strokeLinecap="round" filter="url(#gaugeGlow)" style={{ transform: "rotate(135deg)", transformOrigin: `${size / 2}px ${size / 2}px`, transition: "stroke-dasharray .05s" }} />
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: size * .25, color: col, lineHeight: 1 }}>{disp}</div>
        <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 9, color: t.faint, letterSpacing: ".14em", marginTop: 3 }}>TRUST SCORE</div>
        <div style={{ marginTop: 9, padding: "4px 12px", borderRadius: 20, background: col + "15", border: `1px solid ${col}35`, fontFamily: "'DM Mono',monospace", fontSize: 9, color: col, fontWeight: 700, letterSpacing: ".1em" }}>{lbl}</div>
      </div>
    </div>
  );
}

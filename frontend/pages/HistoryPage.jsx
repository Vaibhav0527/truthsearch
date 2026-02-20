import { useState } from "react";
import Ic from "../icons";
import { useReveal } from "../hooks/useReveal";
import TiltCard from "../components/TiltCard";

// ─── HISTORY DATA ─────────────────────────────────────────────────────────────
const HIST = [
  { id: 1, title: "5G Health Claims Article", type: "TEXT", verdict: "Misleading", score: 12, date: "Feb 19" },
  { id: 2, title: "Election Fraud Tweet Thread", type: "TEXT", verdict: "Misleading", score: 8, date: "Feb 18" },
  { id: 3, title: "COVID Vaccine Meme", type: "IMAGE", verdict: "Suspicious", score: 45, date: "Feb 17" },
  { id: 4, title: "Climate Data Report", type: "TEXT", verdict: "Likely True", score: 88, date: "Feb 16" },
  { id: 5, title: "Breaking News Clip", type: "VOICE", verdict: "Likely True", score: 91, date: "Feb 15" },
  { id: 6, title: "Charity Fundraiser Post", type: "IMAGE", verdict: "Likely True", score: 82, date: "Feb 14" },
];

// ─── HISTORY ROW ─────────────────────────────────────────────────────────────
function HistRow({ item, t, i, vis }) {
  const [hov, setHov] = useState(false);
  const col = item.score >= 70 ? t.hi : item.score >= 40 ? t.mid : t.lo;
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} data-mag
      style={{
        display: "flex", alignItems: "center", gap: 20, padding: "22px 20px", borderBottom: `1px solid ${t.line}`, cursor: "pointer",
        background: hov ? t.card : "transparent", borderRadius: hov ? 10 : 0, transition: "background .25s, border-radius .25s",
        opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(24px)",
        transition: `background .25s, border-radius .25s, opacity .8s ${.1 + i * .07}s cubic-bezier(0.16,1,0.3,1), transform .8s ${.1 + i * .07}s cubic-bezier(0.16,1,0.3,1)`
      }}>
      <span style={{ width: 50, height: 50, borderRadius: "50%", background: col + "12", border: `2px solid ${col}40`, color: col, fontWeight: 900, fontSize: 14, fontFamily: "'Bebas Neue',sans-serif", letterSpacing: ".04em", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "transform .3s", transform: hov ? "scale(1.1)" : "scale(1)" }}>{item.score}</span>
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 15, fontWeight: 600, color: t.text }}>{item.title}</div>
        <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, color: t.faint, marginTop: 3, letterSpacing: ".12em" }}>{item.type} • {item.date}</div>
      </div>
      <span style={{ padding: "5px 14px", borderRadius: 20, fontSize: 10, fontWeight: 700, fontFamily: "'DM Mono',monospace", letterSpacing: ".1em", background: col + "12", border: `1px solid ${col}35`, color: col }}>{item.verdict}</span>
      <div style={{ color: t.faint, transform: hov ? "translateX(4px)" : "translateX(0)", transition: "transform .3s" }}><Ic.Arr s={14} /></div>
    </div>
  );
}

// ─── HISTORY PAGE ─────────────────────────────────────────────────────────────
export default function HistoryPage({ t }) {
  const [hRef, hVis] = useReveal(.04);
  const sts = [
    { v: HIST.length, l: "TOTAL" },
    { v: HIST.filter(h => h.verdict === "Misleading").length, l: "MISLEADING" },
    { v: HIST.filter(h => h.verdict === "Suspicious").length, l: "SUSPICIOUS" },
    { v: HIST.filter(h => h.verdict === "Likely True").length, l: "VERIFIED TRUE" },
  ];
  return (
    <div style={{ paddingTop: 68, minHeight: "100vh", padding: "90px 60px", position: "relative", zIndex: 1 }}>
      <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(48px,7vw,80px)", letterSpacing: ".03em", color: t.text, lineHeight: .95, marginBottom: 10, opacity: hVis ? 1 : 0, transform: hVis ? "translateY(0)" : "translateY(40px)", transition: "all 1s .05s cubic-bezier(0.16,1,0.3,1)" }}>Analysis History</div>
      <p style={{ fontFamily: "'Space Grotesk',sans-serif", color: t.muted, fontSize: 15, marginBottom: 44, opacity: hVis ? 1 : 0, transform: hVis ? "translateY(0)" : "translateY(30px)", transition: "all 1s .12s cubic-bezier(0.16,1,0.3,1)" }}>Your recent misinformation checks</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 44 }}>
        {sts.map((s, i) => (
          <TiltCard key={s.l} t={t} style={{ padding: "20px 22px", opacity: hVis ? 1 : 0, transform: hVis ? "translateY(0)" : "translateY(22px)", transition: `all .8s ${.18 + i * .08}s cubic-bezier(0.16,1,0.3,1)` }}>
            <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 52, letterSpacing: ".04em", color: t.accent, lineHeight: 1 }}>{s.v}</div>
            <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, color: t.faint, letterSpacing: ".18em", marginTop: 3 }}>{s.l}</div>
          </TiltCard>
        ))}
      </div>
      <div ref={hRef} style={{ borderTop: `1px solid ${t.line}` }}>
        {HIST.map((item, i) => <HistRow key={item.id} item={item} t={t} i={i} vis={hVis} />)}
      </div>
    </div>
  );
}

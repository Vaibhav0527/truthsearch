// ─── SCANNER BAR ─────────────────────────────────────────────────────────────
export default function Scanner({ t }) {
  return (
    <div style={{ height: 3, borderRadius: 2, background: t.border, overflow: "hidden", position: "relative" }}>
      <div style={{ position: "absolute", top: 0, left: "-35%", width: "35%", height: "100%", background: `linear-gradient(to right,transparent,${t.accent},transparent)`, animation: "scanMove 1.5s ease-in-out infinite", borderRadius: 2 }} />
    </div>
  );
}

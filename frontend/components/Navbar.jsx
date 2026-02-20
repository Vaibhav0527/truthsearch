import { useState, useEffect } from "react";
import Ic from "../icons";
import Hamburger from "./Hamburger";

const NAV_LINKS = [
  { id: "factcheck", label: "TEXT", icon: (s) => <Ic.Search s={s} /> },
  { id: "imagecheck", label: "IMAGE", icon: (s) => <Ic.Img s={s} /> },
  { id: "voicecheck", label: "VOICE", icon: (s) => <Ic.Mic s={s} /> },
  { id: "aidetect", label: "AI DETECT", icon: (s) => <Ic.Eye s={s} /> },
  { id: "history", label: "HISTORY", icon: (s) => <Ic.Clock s={s} /> },
];

// ─── NAVBAR ──────────────────────────────────────────────────────────────────
export default function Navbar({ page, setPage, isDark, toggleTheme, t, menuOpen, onMenuToggle }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 6000, height: 84,
      background: scrolled || menuOpen ? t.nav : "transparent",
      backdropFilter: scrolled || menuOpen ? "blur(24px)" : "none",
      borderBottom: scrolled || menuOpen ? `1px solid ${t.line}` : "none",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 40px", transition: "background .5s, backdrop-filter .5s, border-color .5s"
    }}>
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }} onClick={() => setPage("landing")} data-mag>
        <Ic.Logo s={30} />
        <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontWeight: 400, fontSize: 30, color: t.text, letterSpacing: ".1em" }}>
          TRUTH<span style={{ color: t.accent }}>LENS</span>
        </span>
        <span style={{ fontSize: 10, background: t.accent, color: "#fff", padding: "2px 8px", borderRadius: 3, letterSpacing: ".1em", fontWeight: 700, fontFamily: "'DM Mono',monospace" }}>BETA</span>
      </div>

      {/* Inline Navigation Links */}
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        {NAV_LINKS.map(link => {
          const active = page === link.id;
          return (
            <button
              key={link.id}
              onClick={() => setPage(link.id)}
              data-mag
              style={{
                display: "flex", alignItems: "center", gap: 7,
                padding: "9px 18px", borderRadius: 8,
                background: active ? t.accent + "14" : "transparent",
                border: active ? `1px solid ${t.accent}30` : "1px solid transparent",
                color: active ? t.accent : t.muted,
                fontFamily: "'DM Mono',monospace", fontSize: 12, fontWeight: 600,
                letterSpacing: ".1em", cursor: "pointer",
                transition: "all .25s ease",
              }}
              onMouseEnter={e => { if (!active) { e.currentTarget.style.color = t.text; e.currentTarget.style.background = t.card; } }}
              onMouseLeave={e => { if (!active) { e.currentTarget.style.color = t.muted; e.currentTarget.style.background = "transparent"; } }}
            >
              {link.icon(14)}
              {link.label}
            </button>
          );
        })}
      </div>

      {/* Right controls */}
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <button onClick={toggleTheme} data-mag style={{ width: 42, height: 42, borderRadius: 10, background: "transparent", border: `1px solid ${t.border}`, color: t.muted, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all .2s" }}>
          {isDark ? <Ic.Sun /> : <Ic.Moon />}
        </button>
        <Hamburger open={menuOpen} onToggle={onMenuToggle} t={t} />
      </div>
    </nav>
  );
}

import { useState, useEffect } from "react";
import Ic from "../icons";
import Hamburger from "./Hamburger";

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
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 6000, height: 68,
      background: scrolled || menuOpen ? t.nav : "transparent",
      backdropFilter: scrolled || menuOpen ? "blur(24px)" : "none",
      borderBottom: scrolled || menuOpen ? `1px solid ${t.line}` : "none",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 36px", transition: "background .5s, backdrop-filter .5s, border-color .5s"
    }}>
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }} onClick={() => setPage("landing")} data-mag>
        <Ic.Logo s={24} />
        <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontWeight: 400, fontSize: 24, color: t.text, letterSpacing: ".1em" }}>
          TRUTH<span style={{ color: t.accent }}>LENS</span>
        </span>
        <span style={{ fontSize: 9, background: t.accent, color: "#fff", padding: "2px 7px", borderRadius: 3, letterSpacing: ".1em", fontWeight: 700, fontFamily: "'DM Mono',monospace" }}>BETA</span>
      </div>
      {/* Right controls */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <button onClick={toggleTheme} data-mag style={{ width: 38, height: 38, borderRadius: 9, background: "transparent", border: `1px solid ${t.border}`, color: t.muted, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all .2s" }}>
          {isDark ? <Ic.Sun /> : <Ic.Moon />}
        </button>
        <Hamburger open={menuOpen} onToggle={onMenuToggle} t={t} />
      </div>
    </nav>
  );
}

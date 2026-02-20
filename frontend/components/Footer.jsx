import { useNavigate } from "react-router-dom";
import Ic from "../icons";

// ─── FOOTER ──────────────────────────────────────────────────────────────────
// Subtle, minimal footer with working links, "Back to Home" button, and dummy external links.
// Accepts: t (theme), setPage (optional — for animated page-wipe nav), style (optional override)

const FALLBACK = {
  bg: "#06060e", text: "#ede8ff", muted: "rgba(237,232,255,.44)",
  faint: "rgba(237,232,255,.16)", accent: "#b57bff", border: "rgba(255,255,255,.07)",
  line: "rgba(255,255,255,.07)",
};

const PLATFORM = [
  { label: "Text Check", page: "factcheck", route: "/factcheck" },
  { label: "Image OCR", page: "imagecheck", route: "/image-check" },
  { label: "Voice Check", page: "voicecheck", route: "/voice-check" },
  { label: "AI Detect", page: "aidetect", route: "/ai-detect" },
  { label: "History", page: "history", route: "/history" },
];

const RESOURCES = [
  { label: "Documentation", page: "docs", route: "/docs" },
  { label: "API Reference", page: "apireference", route: "/api-reference" },
  { label: "Blog", page: "blog", route: "/blog" },
  { label: "System Status", page: "status", route: "/status" },
];

const COMPANY = [
  { label: "About Us", page: "about", route: "/about" },
  { label: "Privacy Policy", page: "privacy", route: "/privacy" },
  { label: "Terms of Service", page: "terms", route: "/terms" },
  { label: "Contact", page: "contact", route: "/contact" },
];

export default function Footer({ t: _t, setPage, style }) {
  const t = _t || FALLBACK;
  const nav = useNavigate();

  const goHome = () => {
    if (setPage) setPage("landing");
    else nav("/");
  };

  const goPage = (p) => {
    if (setPage) setPage(p.page);
    else nav(p.route);
  };

  const linkStyle = {
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: 12,
    color: t.muted,
    textDecoration: "none",
    cursor: "pointer",
    transition: "color .25s",
    lineHeight: 2,
    display: "block",
  };

  const headStyle = {
    fontFamily: "'DM Mono', monospace",
    fontSize: 9,
    letterSpacing: ".2em",
    textTransform: "uppercase",
    color: t.faint,
    marginBottom: 12,
  };

  return (
    <footer style={{
      position: "relative",
      borderTop: `1px solid ${t.line}`,
      padding: "48px 60px 32px",
      background: "transparent",
      zIndex: 2,
      ...style,
    }}>

      {/* Back to Home */}
      <div style={{ marginBottom: 36 }}>
        <button
          onClick={goHome}
          data-mag
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "8px 20px",
            borderRadius: 8,
            border: `1px solid ${t.accent}30`,
            background: t.accent + "08",
            color: t.accent,
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: ".06em",
            cursor: "pointer",
            transition: "all .3s",
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = t.accent + "18";
            e.currentTarget.style.borderColor = t.accent + "55";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = t.accent + "08";
            e.currentTarget.style.borderColor = t.accent + "30";
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="19 12 5 12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Back to Home
        </button>
      </div>

      {/* Link Columns */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1.6fr 1fr 1fr 1fr",
        gap: 40,
        marginBottom: 40,
      }}>

        {/* Brand */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
            <Ic.Logo s={20} />
            <span style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 18,
              letterSpacing: ".08em",
              color: t.text,
            }}>
              TruthLens
            </span>
          </div>
          <p style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 12,
            color: t.muted,
            lineHeight: 1.7,
            maxWidth: 260,
            marginBottom: 16,
          }}>
            AI-powered misinformation detection platform. Verify text claims, images, voice recordings, and detect AI-generated content with forensic precision.
          </p>
          <div style={{ display: "flex", gap: 10 }}>
            {/* Social icons (dummy) */}
            {[
              { label: "GitHub", href: "https://github.com/truthlens", d: "M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" },
              { label: "Twitter", href: "https://twitter.com/truthlens", d: "M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" },
            ].map(s => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                style={{
                  width: 28, height: 28, borderRadius: 6,
                  border: `1px solid ${t.border}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: t.faint, transition: "all .25s", textDecoration: "none",
                }}
                onMouseEnter={e => { e.currentTarget.style.color = t.accent; e.currentTarget.style.borderColor = t.accent + "40"; }}
                onMouseLeave={e => { e.currentTarget.style.color = t.faint; e.currentTarget.style.borderColor = t.border; }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d={s.d} />
                </svg>
              </a>
            ))}
          </div>
        </div>

        {/* Platform */}
        <div>
          <p style={headStyle}>Platform</p>
          {PLATFORM.map(p => (
            <span
              key={p.label}
              onClick={() => goPage(p)}
              style={linkStyle}
              onMouseEnter={e => (e.currentTarget.style.color = t.accent)}
              onMouseLeave={e => (e.currentTarget.style.color = t.muted)}
            >
              {p.label}
            </span>
          ))}
        </div>

        {/* Resources */}
        <div>
          <p style={headStyle}>Resources</p>
          {RESOURCES.map(r => (
            <span
              key={r.label}
              onClick={() => goPage(r)}
              style={linkStyle}
              onMouseEnter={e => (e.currentTarget.style.color = t.accent)}
              onMouseLeave={e => (e.currentTarget.style.color = t.muted)}
            >
              {r.label}
            </span>
          ))}
        </div>

        {/* Company */}
        <div>
          <p style={headStyle}>Company</p>
          {COMPANY.map(c => (
            <span
              key={c.label}
              onClick={() => goPage(c)}
              style={linkStyle}
              onMouseEnter={e => (e.currentTarget.style.color = t.accent)}
              onMouseLeave={e => (e.currentTarget.style.color = t.muted)}
            >
              {c.label}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{
        borderTop: `1px solid ${t.line}`,
        paddingTop: 18,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 12,
      }}>
        <span style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: 10,
          color: t.faint,
          letterSpacing: ".08em",
        }}>
          © {new Date().getFullYear()} TruthLens. All rights reserved.
        </span>
        <div style={{ display: "flex", gap: 20 }}>
          {[
            { label: "Privacy", page: "privacy", route: "/privacy" },
            { label: "Terms", page: "terms", route: "/terms" },
            { label: "Cookies", page: "terms", route: "/terms" },
          ].map(l => (
            <span
              key={l.label}
              onClick={() => goPage(l)}
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 10,
                color: t.faint,
                textDecoration: "none",
                letterSpacing: ".06em",
                transition: "color .25s",
                cursor: "pointer",
              }}
              onMouseEnter={e => (e.currentTarget.style.color = t.muted)}
              onMouseLeave={e => (e.currentTarget.style.color = t.faint)}
            >
              {l.label}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}

import { useState } from "react";
import Ic from "../icons";
import { useReveal } from "../hooks/useReveal";
import RevealLine from "../components/RevealLine";
import SplitReveal from "../components/SplitReveal";
import Marquee from "../components/Marquee";
import TiltCard from "../components/TiltCard";
import Btn from "../components/Btn";
import WebGLCard from "../components/WebGLCard";
import Footer from "../components/Footer";

// ─── FEATURE CELL ─────────────────────────────────────────────────────────────
function FeatureCell({ f, i, total, t, fVis }) {
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} style={{
      padding: 32, borderRight: i < total - 1 ? `1px solid ${t.line}` : "none", position: "relative", overflow: "hidden",
      background: hov ? f.c + "07" : "transparent", transition: "background .4s", cursor: "default",
      opacity: fVis ? 1 : 0, transform: fVis ? "translateY(0)" : "translateY(32px)",
      transition: `background .4s, opacity .9s ${i * .1}s cubic-bezier(0.16,1,0.3,1), transform .9s ${i * .1}s cubic-bezier(0.16,1,0.3,1)`,
    }}>
      <div style={{ width: 50, height: 50, borderRadius: 12, background: f.c + "14", border: `1px solid ${f.c}22`, display: "flex", alignItems: "center", justifyContent: "center", color: f.c, marginBottom: 20, transition: "transform .4s cubic-bezier(0.16,1,0.3,1)", transform: hov ? "scale(1.1)" : "scale(1)" }}>
        {f.icon}
      </div>
      <h3 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 22, letterSpacing: ".08em", color: t.text, marginBottom: 10 }}>{f.title}</h3>
      <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 13, color: t.muted, lineHeight: 1.7 }}>{f.desc}</p>
      <div style={{ position: "absolute", bottom: 0, left: 0, width: hov ? "100%" : "0%", height: 2, background: f.c, transition: "width .45s cubic-bezier(0.16,1,0.3,1)" }} />
    </div>
  );
}

// ─── LANDING PAGE ────────────────────────────────────────────────────────────
export default function LandingPage({ setPage, t, isDark }) {
  const [ref, vis] = useReveal(.04);
  const [fRef, fVis] = useReveal(.08);
  const [sRef, sVis] = useReveal(.08);

  const feats = [
    { icon: <Ic.Search s={24} />, title: "TEXT AI", desc: "Deep NLP across 140M fact-checks. Source verification across 190+ languages.", c: "#b57bff" },
    { icon: <Ic.Mic s={24} />, title: "VOICE AI", desc: "Real-time transcription, deepfake detection, speaker credibility scoring.", c: "#a78bfa" },
    { icon: <Ic.Img s={24} />, title: "IMAGE AI", desc: "Pixel-level manipulation, metadata inspection, AI generation probability.", c: "#818cf8" },
    { icon: <Ic.Brain s={24} />, title: "EXPLAIN AI", desc: "Human-readable verdicts with evidence-backed citations. Every time.", c: "#c084fc" },
  ];

  const stats = [{ v: "98.7%", l: "ACCURACY" }, { v: "2.1s", l: "AVG TIME" }, { v: "140M+", l: "CLAIMS" }, { v: "190+", l: "LANGUAGES" }];

  return (
    <div style={{ paddingTop: 84, minHeight: "100vh", position: "relative", zIndex: 1 }}>

      {/* ══ HERO ══ */}
      <section ref={ref} style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "120px 60px 80px", position: "relative", overflow: "hidden" }}>

        {/* Full-bleed perspective grid */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(rgba(181,123,255,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(181,123,255,.04) 1px,transparent 1px)`, backgroundSize: "80px 80px", pointerEvents: "none", animation: "gridPulse 6s ease-in-out infinite" }} />

        {/* Animated HUD scan beam */}
        <div style={{ position: "absolute", left: 0, right: 0, height: 2, background: `linear-gradient(to right,transparent,rgba(181,123,255,.7) 20%,rgba(220,180,255,.9) 50%,rgba(181,123,255,.7) 80%,transparent)`, boxShadow: `0 0 18px 4px rgba(181,123,255,.25)`, animation: "heroScan 7s ease-in-out infinite", pointerEvents: "none", zIndex: 3 }} />

        {/* Large ghost "VERIFY" word */}
        <div style={{ position: "absolute", right: -40, top: "50%", transform: "translateY(-50%)", fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(240px,32vw,480px)", letterSpacing: ".01em", color: t.accent, opacity: .022, lineHeight: 1, userSelect: "none", pointerEvents: "none", whiteSpace: "nowrap" }}>VERIFY</div>

        {/* Orbit rings */}
        <div style={{ position: "absolute", top: "35%", left: "60%", transform: "translate(-50%,-50%)", width: 520, height: 520, borderRadius: "50%", border: "1px solid rgba(181,123,255,.06)", animation: "spin 30s linear infinite", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: "35%", left: "60%", transform: "translate(-50%,-50%) rotateX(75deg)", width: 620, height: 620, borderRadius: "50%", border: "1px dashed rgba(181,123,255,.04)", animation: "spin 20s linear infinite reverse", pointerEvents: "none" }} />

        {/* Corner HUD brackets */}
        <div style={{ position: "absolute", top: 120, left: 60, width: 48, height: 48, borderTop: `1.5px solid rgba(181,123,255,.28)`, borderLeft: `1.5px solid rgba(181,123,255,.28)`, opacity: vis ? 1 : 0, transition: "opacity 1s .8s", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: 80, right: 60, width: 48, height: 48, borderBottom: `1.5px solid rgba(181,123,255,.28)`, borderRight: `1.5px solid rgba(181,123,255,.28)`, opacity: vis ? 1 : 0, transition: "opacity 1s .9s", pointerEvents: "none" }} />

        {/* Floating data chips */}
        {vis && [
          { label: "98.7% ACCURACY", top: "18%", right: "28%", delay: .9 },
          { label: "LIVE ◉", top: "72%", right: "20%", delay: 1.1 },
          { label: "2.1s AVG", top: "58%", right: "38%", delay: 1.3 },
        ].map((chip, i) => (
          <div key={i} style={{ position: "absolute", top: chip.top, right: chip.right, fontFamily: "'DM Mono',monospace", fontSize: 9, letterSpacing: ".2em", color: "rgba(181,123,255,.6)", border: "1px solid rgba(181,123,255,.18)", padding: "4px 10px", borderRadius: 4, background: "rgba(181,123,255,.04)", backdropFilter: "blur(8px)", opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(10px)", transition: `all .8s ${chip.delay}s cubic-bezier(0.16,1,0.3,1)`, pointerEvents: "none", animation: `floatChip ${2.5 + i * .4}s ease-in-out infinite ${chip.delay}s` }}>
            {chip.label}
          </div>
        ))}

        {/* Top status bar */}
        <RevealLine inView={vis} delay={.04}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 56, fontFamily: "'DM Mono',monospace", fontSize: 9, color: t.faint, letterSpacing: ".3em", borderBottom: `1px solid ${t.line}`, paddingBottom: 18 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
              <span style={{ color: t.hi, display: "flex", alignItems: "center", gap: 7 }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: t.hi, display: "inline-block", animation: "statusBlink 2.5s ease-in-out infinite" }} />
                SYSTEM ONLINE
              </span>
              <span>│</span>
              <span>140M+ CLAIMS INDEXED</span>
              <span>│</span>
              <span>190+ LANGUAGES</span>
            </div>
            <span style={{ color: t.accent, animation: "dataFlicker 8s ease-in-out infinite" }}>SYS://TRUTHLENS.AI</span>
          </div>
        </RevealLine>

        {/* Main layout */}
        <div style={{ display: "flex", alignItems: "center", gap: 60, position: "relative", zIndex: 2 }}>
          {/* Left: Text */}
          <div style={{ flex: "0 0 55%", position: "relative", zIndex: 2 }}>
            <RevealLine inView={vis} delay={.08}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
                <div style={{ width: 32, height: 1, background: t.accent }} />
                <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 9, letterSpacing: ".44em", color: t.accent }}>DETECTION PROTOCOL 01</span>
              </div>
            </RevealLine>

            <SplitReveal text="TRUTH" inView={vis} delay={.1}
              style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(96px,13vw,180px)", letterSpacing: ".02em", lineHeight: .88, color: t.text, overflow: "visible", marginBottom: 4, filter: vis ? "none" : "blur(8px)", transition: "filter 1s .1s" }} />

            <div style={{ height: 2, width: vis ? "100%" : "0", maxWidth: 500, background: `linear-gradient(to right,${t.accent},rgba(181,123,255,.2))`, margin: "8px 0", transition: "width 1s .32s cubic-bezier(0.16,1,0.3,1)" }} />

            <SplitReveal text="LENS" inView={vis} delay={.28}
              style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(96px,13vw,180px)", letterSpacing: ".02em", lineHeight: .88, WebkitTextStroke: `1.5px ${t.accent}`, color: "transparent", overflow: "visible", marginBottom: 36, textShadow: `0 0 60px ${t.accent}30` }} />

            <RevealLine inView={vis} delay={.46}>
              <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(16px,1.9vw,20px)", color: t.muted, lineHeight: 1.7, maxWidth: 460, marginBottom: 44 }}>
                Don't just know it's fake.&nbsp;
                <span style={{ color: t.text, fontWeight: 700, fontStyle: "italic" }}>Know exactly why.</span>
                &nbsp;Explainable AI verdicts across text, voice, and images.
              </p>
            </RevealLine>

            <RevealLine inView={vis} delay={.58}>
              <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 36 }}>
                <Btn t={t} sz="lg" icon={<Ic.Search s={16} />} onClick={() => setPage("factcheck")}>Analyze Text</Btn>
                <Btn t={t} v="secondary" sz="lg" icon={<Ic.Mic s={16} />} onClick={() => setPage("voicecheck")}>Voice</Btn>
                <Btn t={t} v="secondary" sz="lg" icon={<Ic.Img s={16} />} onClick={() => setPage("imagecheck")}>Image</Btn>
              </div>
            </RevealLine>

            {/* Live ticker */}
            <RevealLine inView={vis} delay={.7}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 16px", borderRadius: 8, border: `1px solid ${t.border}`, background: t.card, backdropFilter: "blur(12px)", maxWidth: 380 }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80", animation: "blink 1.5s step-end infinite", flexShrink: 0 }} />
                <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 9, color: "#4ade80", letterSpacing: ".18em" }}>LIVE</div>
                <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, color: t.muted, letterSpacing: ".08em", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>Analyzing: "Breaking: New study shows..."</div>
              </div>
            </RevealLine>
          </div>

          {/* Right: HUD-framed WebGL */}
          <div style={{ flex: "0 0 45%", paddingLeft: 20, opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(40px)", transition: "opacity 1.2s .7s, transform 1.2s .7s cubic-bezier(0.16,1,0.3,1)", position: "relative" }}>
            <div style={{ position: "relative" }}>
              <div style={{ position: "absolute", top: -14, left: -14, right: -14, bottom: -14, borderRadius: 24, border: `1px solid rgba(181,123,255,.1)`, pointerEvents: "none", animation: "framePulse 3s ease-in-out infinite" }} />
              <div style={{ position: "absolute", top: -5, left: -5, width: 18, height: 18, borderTop: `2px solid ${t.accent}`, borderLeft: `2px solid ${t.accent}`, borderRadius: "2px 0 0 0", pointerEvents: "none" }} />
              <div style={{ position: "absolute", top: -5, right: -5, width: 18, height: 18, borderTop: `2px solid ${t.accent}`, borderRight: `2px solid ${t.accent}`, borderRadius: "0 2px 0 0", pointerEvents: "none" }} />
              <div style={{ position: "absolute", bottom: -5, left: -5, width: 18, height: 18, borderBottom: `2px solid ${t.accent}`, borderLeft: `2px solid ${t.accent}`, borderRadius: "0 0 0 2px", pointerEvents: "none" }} />
              <div style={{ position: "absolute", bottom: -5, right: -5, width: 18, height: 18, borderBottom: `2px solid ${t.accent}`, borderRight: `2px solid ${t.accent}`, borderRadius: "0 0 2px 0", pointerEvents: "none" }} />
              <div style={{ position: "absolute", top: -26, left: 0, fontFamily: "'DM Mono',monospace", fontSize: 8, color: "rgba(181,123,255,.38)", letterSpacing: ".28em" }}>SYS:NEURAL_VIZ // ACTIVE</div>
              <WebGLCard t={t} isDark={isDark} />
              <div style={{ display: "flex", marginTop: 8, gap: 0, border: `1px solid ${t.border}`, borderRadius: 8, overflow: "hidden", background: t.card, backdropFilter: "blur(12px)" }}>
                {[["98.7%", "ACCURACY"], ["2.1s", "DETECT"], ["∞", "REAL-TIME"]].map((d, i) => (
                  <div key={d[1]} style={{ flex: 1, padding: "10px 0", textAlign: "center", borderRight: i < 2 ? `1px solid ${t.line}` : "none" }}>
                    <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 20, letterSpacing: ".04em", color: t.accent, lineHeight: 1 }}>{d[0]}</div>
                    <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 7, color: t.faint, letterSpacing: ".2em", marginTop: 2 }}>{d[1]}</div>
                  </div>
                ))}
              </div>
              <div style={{ position: "absolute", bottom: -24, right: 0, fontFamily: "'DM Mono',monospace", fontSize: 8, color: "rgba(181,123,255,.3)", letterSpacing: ".2em" }}>↑ HOVER TO DISTORT</div>
            </div>
          </div>
        </div>

        {/* Bottom coordinate bar */}
        <RevealLine inView={vis} delay={.8}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 56, paddingTop: 20, borderTop: `1px solid ${t.line}`, fontFamily: "'DM Mono',monospace", fontSize: 9, color: t.faint, letterSpacing: ".24em" }}>
            <span>48.8566°N / 2.3522°E</span>
            <span style={{ color: t.accent, opacity: .5 }}>◆</span>
            <span>{new Date().toISOString().slice(0, 10)}</span>
            <span style={{ color: t.accent, opacity: .5 }}>◆</span>
            <span>SYS://TRUTHLENS.AI/HERO</span>
          </div>
        </RevealLine>
      </section>

      {/* Stats bar */}
      <div ref={sRef} style={{ borderTop: `1px solid ${t.line}`, borderBottom: `1px solid ${t.line}`, display: "flex", padding: "0 60px" }}>
        {stats.map((s, i) => (
          <div key={s.l} style={{ flex: 1, padding: "28px 0", borderRight: i < stats.length - 1 ? `1px solid ${t.line}` : "none", textAlign: "center", opacity: sVis ? 1 : 0, transform: sVis ? "translateY(0)" : "translateY(20px)", transition: `all .8s ${i * .08}s cubic-bezier(0.16,1,0.3,1)` }}>
            <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 42, letterSpacing: ".04em", color: t.accent, lineHeight: 1 }}>{s.v}</div>
            <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, color: t.faint, letterSpacing: ".22em", marginTop: 4 }}>{s.l}</div>
          </div>
        ))}
      </div>

      <Marquee text="TEXT ANALYSIS • VOICE DETECTION • IMAGE VERIFICATION • EXPLAINABLE AI • FACT CHECKING •" t={t} />

      {/* ══ FEATURES ══ */}
      <section ref={fRef} style={{ padding: "100px 60px", position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 56 }}>
          <div style={{ width: 44, height: 1, background: t.accent }} />
          <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, letterSpacing: ".35em", color: t.accent }}>CAPABILITIES</span>
        </div>
        <div style={{ overflow: "hidden", marginBottom: 56 }}>
          <div style={{ transform: fVis ? "translateY(0)" : "translateY(110%)", transition: "transform 1.2s cubic-bezier(0.16,1,0.3,1)" }}>
            <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(48px,7vw,96px)", letterSpacing: ".03em", color: t.text, lineHeight: .95 }}>
              Every type of misinformation.<br /><span style={{ color: t.accent }}>One platform.</span>
            </h2>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 0, border: `1px solid ${t.line}` }}>
          {feats.map((f, i) => (
            <FeatureCell key={f.title} f={f} i={i} total={feats.length} t={t} fVis={fVis} />
          ))}
        </div>
      </section>

      <Marquee text="WHO DATABASE • SNOPES • REUTERS FACT CHECK • AP VERIFY • POLITIFACT • FULL FACT •" reverse t={t} speed={19} />

      {/* ══ CTA ══ */}
      <section style={{ padding: "90px 60px 130px", position: "relative", zIndex: 1 }}>
        <TiltCard t={t} glow style={{ maxWidth: 600, padding: "60px 52px", margin: "0 auto", textAlign: "center", background: isDark ? "linear-gradient(135deg,rgba(181,123,255,.09),rgba(109,40,217,.05))" : "linear-gradient(135deg,rgba(109,40,217,.07),rgba(181,123,255,.04))" }}>
          <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 60, letterSpacing: ".04em", color: t.text, lineHeight: .95, marginBottom: 14 }}>Start detecting<br />misinformation</h2>
          <p style={{ fontFamily: "'Space Grotesk',sans-serif", color: t.muted, fontSize: 15, marginBottom: 32 }}>Free to try. No credit card. 10 analyses per day.</p>
          <Btn t={t} sz="lg" onClick={() => setPage("factcheck")} icon={<Ic.Arr s={15} />}>Start Fact Checking</Btn>
        </TiltCard>
      </section>

      <Footer t={t} setPage={setPage} />
    </div>
  );
}

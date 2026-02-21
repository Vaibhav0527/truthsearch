import { useState } from "react";
import axios from "axios";
import Ic from "../icons";
import { useReveal } from "../hooks/useReveal";
import TiltCard from "../components/TiltCard";
import Btn from "../components/Btn";
import TrustGauge from "../components/TrustGauge";
import Scanner from "../components/Scanner";
import { API, saveToHistory, verdictColor, verdictBg, verdictBorder, downloadReport, LOADING_STEPS } from "../utils/factcheckHelpers";
import Footer from "../components/Footer";

// ─── TEXT CHECK PAGE ─────────────────────────────────────────────────────────
export default function TextCheckPage({ t, setPage }) {
  const [claim, setClaim] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [rRef, rVis] = useReveal(0.04);

  const runTextCheck = async () => {
    if (!claim.trim()) return;
    setAnalyzing(true); setResult(null); setError(null);
    try {
      const { data } = await axios.post(`${API}/fact-check`, { claim: claim.trim() });
      setResult(data);
      saveToHistory({
        input_type: "text",
        original_input: claim.trim(),
        verdict: data.verdict,
        confidence: data.confidence,
        explanation: data.explanation,
        sources: data.sources || [],
      });
    } catch (err) {
      setError(err.response?.data?.detail || err.message || "Something went wrong");
    } finally {
      setAnalyzing(false);
    }
  };

  const handleDownload = () => downloadReport({
    inputType: "Text Claim",
    userInput: claim,
    result,
    isAi: false,
  });

  return (
    <div style={{ paddingTop: 84, minHeight: "100vh", display: "grid", gridTemplateColumns: "1fr 1fr", position: "relative", zIndex: 1 }}>

      {/* ───── LEFT: INPUT PANEL ───── */}
      <div style={{ borderRight: `1px solid ${t.line}`, padding: "52px 48px", overflowY: "auto", maxHeight: "calc(100vh - 68px)" }}>
        <button onClick={() => setPage("landing")} data-mag style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 14px", borderRadius: 8, border: `1px solid ${t.border}`, background: "transparent", color: t.muted, fontFamily: "'DM Mono',monospace", fontSize: 10, letterSpacing: ".08em", cursor: "pointer", transition: "all .25s", marginBottom: 20 }} onMouseEnter={e => { e.currentTarget.style.color = t.accent; e.currentTarget.style.borderColor = t.accent + "50"; }} onMouseLeave={e => { e.currentTarget.style.color = t.muted; e.currentTarget.style.borderColor = t.border; }}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="19 12 5 12" /><polyline points="12 19 5 12 12 5" /></svg>BACK</button>
        <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 48, letterSpacing: ".03em", color: t.text, lineHeight: .95, marginBottom: 8 }}>
          Text<br />Fact Check
        </div>
        <p style={{ fontFamily: "'Space Grotesk',sans-serif", color: t.muted, fontSize: 14, marginBottom: 28 }}>
          Verify text claims with AI-powered evidence analysis
        </p>

        <textarea
          value={claim} onChange={e => setClaim(e.target.value)}
          placeholder={'Enter a claim to fact-check...\n\nExample: "The Great Wall of China is visible from space."'}
          style={{
            width: "100%", height: 200, background: t.input, border: `1px solid ${t.border}`,
            borderRadius: 12, padding: "16px 18px", color: t.text, fontSize: 14, lineHeight: 1.7,
            resize: "vertical", outline: "none", fontFamily: "'Space Grotesk',sans-serif",
            boxSizing: "border-box", transition: "border-color .25s",
          }}
          onFocus={e => (e.target.style.borderColor = t.accent)}
          onBlur={e => (e.target.style.borderColor = t.border)}
        />
        <Btn t={t} sz="lg" onClick={runTextCheck} disabled={!claim.trim() || analyzing}
          style={{ width: "100%", justifyContent: "center", marginTop: 14 }}
          icon={<Ic.Search s={16} />}
        >
          {analyzing ? "Checking…" : "Verify Claim"}
        </Btn>

        {/* Progress indicator */}
        {analyzing && (
          <div style={{ marginTop: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, color: t.muted, letterSpacing: ".1em" }}>AI verifying claim…</span>
            </div>
            <Scanner t={t} />
            <div style={{ display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap" }}>
              {LOADING_STEPS.map((s, i) => (
                <span key={s} style={{
                  fontFamily: "'DM Mono',monospace", fontSize: 10, padding: "4px 10px", borderRadius: 20,
                  letterSpacing: ".06em", color: t.accent, background: t.accent + "10",
                  border: `1px solid ${t.accent}30`, transition: "all .35s",
                  animation: `floatGlow 1.5s ${i * 0.3}s ease-in-out infinite`,
                }}>
                  ○ {s}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div style={{
            marginTop: 16, padding: "14px 18px", borderRadius: 10,
            background: "rgba(248,113,113,.08)", border: "1px solid rgba(248,113,113,.25)",
            display: "flex", alignItems: "flex-start", gap: 10,
          }}>
            <Ic.Alert s={16} />
            <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 13, color: "#f87171", lineHeight: 1.5 }}>{error}</span>
          </div>
        )}
      </div>

      {/* ───── RIGHT: RESULTS PANEL ───── */}
      <div ref={rRef} style={{ padding: "52px 48px", overflowY: "auto", maxHeight: "calc(100vh - 68px)" }}>

        {/* Empty state */}
        {!result && !analyzing && !error && (
          <div style={{ textAlign: "center", paddingTop: 100, color: t.faint }}>
            <Ic.Shield s={52} />
            <p style={{ marginTop: 16, fontFamily: "'Space Grotesk',sans-serif", fontSize: 15, lineHeight: 1.7 }}>
              Enter a claim and verify<br />to see results here
            </p>
          </div>
        )}

        {/* Results */}
        {result && (
          <div>
            {/* Trust Gauge */}
            <TiltCard t={t} glow style={{
              padding: 28, marginBottom: 16,
              opacity: rVis ? 1 : 0, transform: rVis ? "translateY(0)" : "translateY(28px)",
              transition: "all .9s cubic-bezier(0.16,1,0.3,1)",
            }}>
              <TrustGauge score={result.confidence ?? 0} t={t} />
            </TiltCard>

            {/* Verdict + Explanation */}
            <TiltCard t={t} style={{
              padding: 24, marginBottom: 16,
              opacity: rVis ? 1 : 0, transform: rVis ? "translateY(0)" : "translateY(28px)",
              transition: "all .9s .1s cubic-bezier(0.16,1,0.3,1)",
            }}>
              <h4 style={{
                fontFamily: "'Bebas Neue',sans-serif", fontSize: 20, letterSpacing: ".08em",
                color: t.text, marginBottom: 16, display: "flex", alignItems: "center", gap: 10,
              }}>
                VERDICT
                <span style={{
                  padding: "3px 12px", borderRadius: 20, fontSize: 11, fontWeight: 700,
                  fontFamily: "'DM Mono',monospace",
                  background: verdictBg(result.verdict, t),
                  color: verdictColor(result.verdict, t),
                  border: `1px solid ${verdictBorder(result.verdict, t)}`,
                  letterSpacing: ".06em",
                }}>
                  {result.verdict?.toUpperCase()}
                </span>
              </h4>
              <p style={{
                fontFamily: "'Space Grotesk',sans-serif", fontSize: 14, color: t.muted,
                lineHeight: 1.7, whiteSpace: "pre-wrap",
              }}>
                {result.explanation}
              </p>
            </TiltCard>

            {/* Sources */}
            {result.sources && result.sources.length > 0 && (
              <TiltCard t={t} style={{
                padding: 24, marginBottom: 16,
                opacity: rVis ? 1 : 0, transform: rVis ? "translateY(0)" : "translateY(28px)",
                transition: "all .9s .2s cubic-bezier(0.16,1,0.3,1)",
              }}>
                <h4 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 20, letterSpacing: ".08em", color: t.text, marginBottom: 16 }}>
                  SOURCES
                </h4>
                {result.sources.map((src, i) => (
                  <a
                    key={i} href={src} target="_blank" rel="noopener noreferrer" data-mag
                    style={{
                      display: "flex", alignItems: "center", gap: 8, marginBottom: i < result.sources.length - 1 ? 12 : 0,
                      fontFamily: "'DM Mono',monospace", fontSize: 12, color: t.accent,
                      textDecoration: "none", transition: "opacity .2s", lineHeight: 1.5,
                      wordBreak: "break-all",
                    }}
                    onMouseEnter={e => (e.currentTarget.style.opacity = ".7")}
                    onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
                  >
                    <Ic.Arr s={12} />
                    {src}
                  </a>
                ))}
              </TiltCard>
            )}

            {/* Download Report */}
            <Btn t={t} sz="lg" icon={<Ic.Download s={16} />} onClick={handleDownload}
              style={{ width: "100%", justifyContent: "center", marginTop: 4 }}
            >
              Download Report (PDF)
            </Btn>
          </div>
        )}
      </div>

      <Footer t={t} setPage={setPage} style={{ gridColumn: "1 / -1" }} />
    </div>
  );
}

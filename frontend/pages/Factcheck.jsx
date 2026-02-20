import { useState, useRef } from "react";
import axios from "axios";
import Ic from "../icons";
import { useReveal } from "../hooks/useReveal";
import TiltCard from "../components/TiltCard";
import Btn from "../components/Btn";
import TrustGauge from "../components/TrustGauge";
import Scanner from "../components/Scanner";
import { serverUrl } from "../src/config";

const API = serverUrl; // e.g. http://localhost:8000

// ─── HELPERS ─────────────────────────────────────────────────────────────────
const verdictColor = (v, t) => {
  const vl = (v || "").toLowerCase();
  if (vl === "true") return t.hi;
  if (vl === "false") return t.lo;
  if (vl === "misleading") return t.mid;
  return t.muted; // unverified
};

const verdictBg = (v, t) => verdictColor(v, t) + "15";
const verdictBorder = (v, t) => verdictColor(v, t) + "35";

// ─── FACT CHECK PAGE ─────────────────────────────────────────────────────────
export default function Factcheck({ t }) {
  const [tab, setTab] = useState("text"); // "text" | "image"

  // Text claim state
  const [claim, setClaim] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  // Image state
  const [img, setImg] = useState(null);
  const [imgFile, setImgFile] = useState(null);
  const [imgAnalyzing, setImgAnalyzing] = useState(false);
  const [imgResult, setImgResult] = useState(null);
  const [extractedText, setExtractedText] = useState("");
  const [imgError, setImgError] = useState(null);
  const fileRef = useRef(null);

  const [rRef, rVis] = useReveal(0.04);

  // ── Text fact-check ──
  const runTextCheck = async () => {
    if (!claim.trim()) return;
    setAnalyzing(true); setResult(null); setError(null);
    try {
      const { data } = await axios.post("http://localhost:8000/fact-check", { claim: claim.trim() });
      setResult(data);
    } catch (err) {
      setError(err.response?.data?.detail || err.message || "Something went wrong");
    } finally {
      setAnalyzing(false);
    }
  };

  // ── Image OCR ──
  const handleFile = (e) => {
    const f = e.target.files[0];
    if (f) { setImg(URL.createObjectURL(f)); setImgFile(f); setImgResult(null); setExtractedText(""); setImgError(null); }
  };

  const runImageCheck = async () => {
    if (!imgFile) return;
    setImgAnalyzing(true); setImgResult(null); setExtractedText(""); setImgError(null);
    try {
      const fd = new FormData();
      fd.append("file", imgFile);
      const { data } = await axios.post(`${API}/ocr`, fd, { headers: { "Content-Type": "multipart/form-data" } });
      setExtractedText(data.extracted_text || "");
      setImgResult(data.result);
    } catch (err) {
      setImgError(err.response?.data?.detail || err.message || "Something went wrong");
    } finally {
      setImgAnalyzing(false);
    }
  };

  const activeResult = tab === "text" ? result : imgResult;
  const isLoading = tab === "text" ? analyzing : imgAnalyzing;
  const activeError = tab === "text" ? error : imgError;

  const steps = ["Searching evidence", "Cross-referencing", "AI verification", "Building verdict"];

  return (
    <div style={{ paddingTop: 68, minHeight: "100vh", display: "grid", gridTemplateColumns: "1fr 1fr", position: "relative", zIndex: 1 }}>

      {/* ───── LEFT: INPUT PANEL ───── */}
      <div style={{ borderRight: `1px solid ${t.line}`, padding: "52px 48px", overflowY: "auto", maxHeight: "calc(100vh - 68px)" }}>
        <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 48, letterSpacing: ".03em", color: t.text, lineHeight: .95, marginBottom: 8 }}>
          Fact<br />Checker
        </div>
        <p style={{ fontFamily: "'Space Grotesk',sans-serif", color: t.muted, fontSize: 14, marginBottom: 28 }}>
          Verify claims with AI-powered evidence analysis
        </p>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 6, marginBottom: 28 }}>
          {[{ id: "text", label: "Text Claim", icon: <Ic.Search s={14} /> }, { id: "image", label: "Image OCR", icon: <Ic.Img s={14} /> }].map(tb => (
            <button
              key={tb.id}
              onClick={() => setTab(tb.id)}
              data-mag
              style={{
                display: "flex", alignItems: "center", gap: 7, padding: "9px 20px", borderRadius: 8,
                border: `1px solid ${tab === tb.id ? t.accent + "50" : t.border}`,
                background: tab === tb.id ? t.accent + "12" : "transparent",
                color: tab === tb.id ? t.accent : t.muted,
                fontFamily: "'Space Grotesk',sans-serif", fontSize: 13, fontWeight: 600,
                cursor: "pointer", transition: "all .25s", letterSpacing: ".03em",
              }}
            >
              {tb.icon}{tb.label}
            </button>
          ))}
        </div>

        {/* ── TEXT TAB ── */}
        {tab === "text" && (
          <>
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
          </>
        )}

        {/* ── IMAGE TAB ── */}
        {tab === "image" && (
          <>
            <div
              onClick={() => fileRef.current.click()} data-mag
              style={{
                borderRadius: 16, border: `2px dashed ${img ? t.accent + "55" : t.border}`,
                minHeight: 220, display: "flex", flexDirection: "column", alignItems: "center",
                justifyContent: "center", cursor: "pointer", overflow: "hidden",
                background: img ? "transparent" : t.card, transition: "all .3s",
              }}
            >
              {img
                ? <img src={img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 14 }} />
                : (
                  <>
                    <div style={{ color: t.faint, marginBottom: 12 }}><Ic.Img s={44} /></div>
                    <p style={{ fontFamily: "'Space Grotesk',sans-serif", color: t.muted, fontSize: 14, fontWeight: 600 }}>Click to upload an image</p>
                    <p style={{ fontFamily: "'DM Mono',monospace", color: t.faint, fontSize: 10, marginTop: 4, letterSpacing: ".12em" }}>JPG, PNG, WebP — text will be extracted via OCR</p>
                  </>
                )
              }
            </div>
            <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handleFile} />
            {img && (
              <Btn t={t} sz="lg" icon={<Ic.Search s={16} />} onClick={runImageCheck}
                disabled={imgAnalyzing}
                style={{ width: "100%", justifyContent: "center", marginTop: 14 }}
              >
                {imgAnalyzing ? "Extracting & Checking…" : "Extract & Verify"}
              </Btn>
            )}
          </>
        )}

        {/* Progress indicator */}
        {isLoading && (
          <div style={{ marginTop: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, color: t.muted, letterSpacing: ".1em" }}>AI verifying claim…</span>
            </div>
            <Scanner t={t} />
            <div style={{ display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap" }}>
              {steps.map((s, i) => (
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
        {activeError && (
          <div style={{
            marginTop: 16, padding: "14px 18px", borderRadius: 10,
            background: "rgba(248,113,113,.08)", border: "1px solid rgba(248,113,113,.25)",
            display: "flex", alignItems: "flex-start", gap: 10,
          }}>
            <Ic.Alert s={16} />
            <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 13, color: "#f87171", lineHeight: 1.5 }}>{activeError}</span>
          </div>
        )}
      </div>

      {/* ───── RIGHT: RESULTS PANEL ───── */}
      <div ref={rRef} style={{ padding: "52px 48px", overflowY: "auto", maxHeight: "calc(100vh - 68px)" }}>

        {/* Empty state */}
        {!activeResult && !isLoading && !activeError && (
          <div style={{ textAlign: "center", paddingTop: 100, color: t.faint }}>
            <Ic.Shield s={52} />
            <p style={{ marginTop: 16, fontFamily: "'Space Grotesk',sans-serif", fontSize: 15, lineHeight: 1.7 }}>
              {tab === "text" ? "Enter a claim and verify\nto see results here" : "Upload an image to extract\ntext and verify it"}
            </p>
          </div>
        )}

        {/* Results */}
        {activeResult && (
          <div>
            {/* Trust Gauge */}
            <TiltCard t={t} glow style={{
              padding: 28, marginBottom: 16,
              opacity: rVis ? 1 : 0, transform: rVis ? "translateY(0)" : "translateY(28px)",
              transition: "all .9s cubic-bezier(0.16,1,0.3,1)",
            }}>
              <TrustGauge score={activeResult.confidence ?? 0} t={t} />
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
                  background: verdictBg(activeResult.verdict, t),
                  color: verdictColor(activeResult.verdict, t),
                  border: `1px solid ${verdictBorder(activeResult.verdict, t)}`,
                  letterSpacing: ".06em",
                }}>
                  {activeResult.verdict?.toUpperCase()}
                </span>
              </h4>
              <p style={{
                fontFamily: "'Space Grotesk',sans-serif", fontSize: 14, color: t.muted,
                lineHeight: 1.7, whiteSpace: "pre-wrap",
              }}>
                {activeResult.explanation}
              </p>
            </TiltCard>

            {/* Extracted text (image tab only) */}
            {tab === "image" && extractedText && (
              <TiltCard t={t} style={{
                padding: 24, marginBottom: 16,
                opacity: rVis ? 1 : 0, transform: rVis ? "translateY(0)" : "translateY(28px)",
                transition: "all .9s .15s cubic-bezier(0.16,1,0.3,1)",
              }}>
                <h4 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 20, letterSpacing: ".08em", color: t.text, marginBottom: 12 }}>
                  EXTRACTED TEXT
                </h4>
                <div style={{
                  background: t.input, border: `1px solid ${t.border}`, borderRadius: 10,
                  padding: "14px 16px", fontFamily: "'DM Mono',monospace", fontSize: 12,
                  color: t.text, lineHeight: 1.7, whiteSpace: "pre-wrap", maxHeight: 180,
                  overflowY: "auto",
                }}>
                  {extractedText}
                </div>
              </TiltCard>
            )}

            {/* Sources */}
            {activeResult.sources && activeResult.sources.length > 0 && (
              <TiltCard t={t} style={{
                padding: 24,
                opacity: rVis ? 1 : 0, transform: rVis ? "translateY(0)" : "translateY(28px)",
                transition: "all .9s .2s cubic-bezier(0.16,1,0.3,1)",
              }}>
                <h4 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 20, letterSpacing: ".08em", color: t.text, marginBottom: 16 }}>
                  SOURCES
                </h4>
                {activeResult.sources.map((src, i) => (
                  <a
                    key={i} href={src} target="_blank" rel="noopener noreferrer" data-mag
                    style={{
                      display: "flex", alignItems: "center", gap: 8, marginBottom: i < activeResult.sources.length - 1 ? 12 : 0,
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
          </div>
        )}
      </div>
    </div>
  );
}
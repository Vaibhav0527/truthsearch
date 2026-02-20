import { useRef, useEffect } from "react";
import { lerp } from "../constants";

// ─── TILT CARD ───────────────────────────────────────────────────────────────
export default function TiltCard({ children, t, style = {}, glow = false }) {
  const ref = useRef(null); const cur = useRef({ rx: 0, ry: 0 }); const tgt = useRef({ rx: 0, ry: 0 }); const raf = useRef(null);
  const onMove = e => { const r = ref.current.getBoundingClientRect(); tgt.current = { rx: ((e.clientY - r.top) / r.height - .5) * -13, ry: ((e.clientX - r.left) / r.width - .5) * 13 }; };
  const onLeave = () => { tgt.current = { rx: 0, ry: 0 }; };
  useEffect(() => {
    const tick = () => {
      cur.current.rx = lerp(cur.current.rx, tgt.current.rx, .09);
      cur.current.ry = lerp(cur.current.ry, tgt.current.ry, .09);
      if (ref.current) ref.current.style.transform = `perspective(1000px) rotateX(${cur.current.rx}deg) rotateY(${cur.current.ry}deg)`;
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick); return () => cancelAnimationFrame(raf.current);
  }, []);
  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} data-mag style={{
      background: t.card, border: `1px solid ${t.border}`, borderRadius: 16, backdropFilter: "blur(18px)",
      boxShadow: glow ? `0 0 60px ${t.glow},0 8px 40px rgba(0,0,0,.2)` : `0 4px 30px rgba(0,0,0,.08)`,
      willChange: "transform", transformStyle: "preserve-3d", ...style,
    }}>{children}</div>
  );
}

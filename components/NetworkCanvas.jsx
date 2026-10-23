"use client";
import { useEffect, useRef } from "react";

// Drifting nodes, proximity links, light pulses travelling along links, mouse attraction.
export default function NetworkCanvas({ interactive = false, density = 0.00006, opacity = 1 }) {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current, ctx = c.getContext("2d");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w, h, nodes = [], pulses = [], raf, mouse = { x: -999, y: -999 };
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      const r = c.getBoundingClientRect(); w = r.width; h = r.height;
      c.width = w * dpr; c.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.max(18, Math.floor(w * h * density));
      nodes = Array.from({ length: n }, () => ({
        x: Math.random() * w, y: Math.random() * h, z: Math.random() * 0.8 + 0.4,
        vx: (Math.random() - 0.5) * 0.25, vy: (Math.random() - 0.5) * 0.25,
        hue: Math.random() > 0.7 ? "124,92,255" : "0,240,255",
      }));
    };
    const move = (e) => { const r = c.getBoundingClientRect(); mouse = { x: e.clientX - r.left, y: e.clientY - r.top }; };
    const LINK = 130;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const a of nodes) {
        if (!reduce) { a.x += a.vx; a.y += a.vy; }
        if (a.x < 0 || a.x > w) a.vx *= -1;
        if (a.y < 0 || a.y > h) a.vy *= -1;
        if (interactive) {
          const dx = mouse.x - a.x, dy = mouse.y - a.y, d = Math.hypot(dx, dy);
          if (d < 160) { a.x += dx * 0.012; a.y += dy * 0.012; }
        }
      }
      for (let i = 0; i < nodes.length; i++) for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i], b = nodes[j], d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < LINK) {
          ctx.strokeStyle = `rgba(0,240,255,${(1 - d / LINK) * 0.25 * opacity})`;
          ctx.lineWidth = 0.7; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          if (!reduce && Math.random() < 0.0015) pulses.push({ a, b, t: 0 });
        }
      }
      pulses = pulses.filter((p) => p.t < 1);
      for (const p of pulses) {
        p.t += 0.02;
        const x = p.a.x + (p.b.x - p.a.x) * p.t, y = p.a.y + (p.b.y - p.a.y) * p.t;
        const g = ctx.createRadialGradient(x, y, 0, x, y, 9);
        g.addColorStop(0, "rgba(255,255,255,.95)"); g.addColorStop(0.3, "rgba(0,240,255,.7)"); g.addColorStop(1, "rgba(0,240,255,0)");
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, 9, 0, 7); ctx.fill();
      }
      for (const n of nodes) {
        ctx.shadowColor = `rgb(${n.hue})`; ctx.shadowBlur = 12 * n.z;
        ctx.fillStyle = `rgba(${n.hue},${0.85 * opacity})`;
        ctx.beginPath(); ctx.arc(n.x, n.y, 2.2 * n.z, 0, 7); ctx.fill();
      }
      ctx.shadowBlur = 0;
      raf = requestAnimationFrame(draw);
    };
    resize(); draw();
    window.addEventListener("resize", resize);
    if (interactive) window.addEventListener("mousemove", move);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); window.removeEventListener("mousemove", move); };
  }, [interactive, density, opacity]);
  return <canvas ref={ref} aria-hidden className="absolute inset-0 h-full w-full" />;
}

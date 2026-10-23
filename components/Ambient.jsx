"use client";
import { useEffect } from "react";
import { motion, useMotionValue, useSpring, useScroll } from "framer-motion";
import NetworkCanvas from "./NetworkCanvas";

// Fixed particle layer + glowing custom cursor.
export default function Ambient() {
  const { scrollYProgress } = useScroll();
  const x = useMotionValue(-100), y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 400, damping: 30 }), sy = useSpring(y, { stiffness: 400, damping: 30 });
  useEffect(() => {
    const m = (e) => { x.set(e.clientX); y.set(e.clientY); };
    window.addEventListener("mousemove", m);
    return () => window.removeEventListener("mousemove", m);
  }, [x, y]);
  return (
    <>
      <motion.div aria-hidden style={{ scaleX: scrollYProgress }} className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-gradient-to-r from-cyan-neon to-volt" />
      <div className="pointer-events-none fixed inset-0 -z-10 opacity-40"><NetworkCanvas density={0.00002} opacity={0.6} /></div>
      <motion.div aria-hidden style={{ x: sx, y: sy }}
        className="pointer-events-none fixed left-0 top-0 z-[100] hidden h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-neon/70 shadow-glow [@media(hover:hover)_and_(pointer:fine)]:block" />
    </>
  );
}

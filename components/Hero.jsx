"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Download, Server } from "lucide-react";
import NetworkCanvas from "./NetworkCanvas";
import { profile, titles } from "@/lib/data";

function useTyping(words) {
  const [i, setI] = useState(0), [text, setText] = useState(""), [del, setDel] = useState(false);
  useEffect(() => {
    const w = words[i];
    const t = setTimeout(() => {
      if (!del && text === w) return setDel(true);
      if (del && text === "") { setDel(false); return setI((i + 1) % words.length); }
      setText(del ? w.slice(0, text.length - 1) : w.slice(0, text.length + 1));
    }, !del && text === w ? 1400 : del ? 35 : 70);
    return () => clearTimeout(t);
  }, [text, del, i, words]);
  return text;
}

export default function Hero() {
  const typed = useTyping(titles);
  return (
    <section id="top" className="relative flex min-h-screen items-center overflow-hidden">
      <NetworkCanvas interactive />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(10,15,29,.85),transparent_70%)]" />
      <div className="section relative z-10 grid w-full items-center gap-12 pt-32 md:grid-cols-[1.4fr_1fr]">
      <div>
        <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-neon/30 bg-cyan-neon/10 px-3 py-1 text-xs text-cyan-neon"><span className="h-2 w-2 animate-pulse rounded-full bg-cyan-neon" />Open to Network Security & SOC roles</p>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
          className="mb-5 font-mono text-sm text-cyan-neon">{profile.name} · <span dir="rtl">{profile.arabic}</span></motion.p>
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-3xl text-4xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
          Designing Secure Networks. <span className="bg-gradient-to-r from-cyan-neon to-volt bg-clip-text text-transparent">Architecting Cloud Systems.</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
          className="mt-6 h-8 font-mono text-lg text-slate-200 md:text-2xl" aria-live="off">
          &gt; {typed}<span className="ml-0.5 inline-block w-2 animate-pulse bg-cyan-neon">&nbsp;</span>
        </motion.p>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }} className="mt-4 max-w-xl text-slate-400">{profile.role}</motion.p>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }} className="mt-10 flex flex-wrap gap-4">
          <a href="#projects" className="inline-flex items-center gap-2 rounded-full bg-cyan-neon px-7 py-3.5 font-semibold text-navy shadow-glow transition hover:scale-105">
            <Server size={18} />Explore Infrastructure</a>
          <a href="/Hagar-Ehab-CV.pdf" download className="inline-flex items-center gap-2 rounded-full border border-cyan-neon/60 px-7 py-3.5 font-semibold text-cyan-neon transition hover:bg-cyan-neon/10">
            <Download size={18} />Download CV</a>
        </motion.div>
      </div>
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5, duration: 0.8 }}
        className="relative order-first mx-auto w-48 sm:w-60 md:order-last md:w-full md:max-w-sm">
        <div className="absolute -inset-3 rounded-full bg-gradient-to-tr from-cyan-neon/60 via-volt/40 to-transparent blur-2xl" />
        <div className="relative rounded-full bg-gradient-to-tr from-cyan-neon to-volt p-[3px] shadow-glow">
          <Image src="/hagar.jpg" alt="Portrait of Hagar Ehab Elbahlawan" width={640} height={640} priority className="aspect-square w-full rounded-full object-cover" />
        </div>
        <div className="glass absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full px-4 py-1.5 font-mono text-xs text-cyan-neon">● ONLINE · Damanhour University</div>
      </motion.div>
      </div>
    </section>
  );
}

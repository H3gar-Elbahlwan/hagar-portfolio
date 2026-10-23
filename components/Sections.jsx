"use client";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { stack, projects, timeline, highlights } from "@/lib/data";

const grid = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } };
const item = { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } };
const view = { initial: "hidden", whileInView: "show", viewport: { once: true, margin: "-80px" } };

export function TechStack() {
  return (
    <section id="stack" className="section">
      <h2 className="h2">Tech Stack</h2>
      <p className="mt-3 max-w-xl text-slate-400">Tools I use to build, secure, and ship infrastructure.</p>
      <motion.div variants={grid} {...view} className="mt-12 grid gap-5 md:grid-cols-2">
        {stack.map((s) => {
          const Icon = Icons[s.icon];
          return (
            <motion.article key={s.title} variants={item} className="glass glass-hover p-6">
              <div className="mb-5 flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-cyan-neon/10 text-cyan-neon"><Icon size={20} /></span>
                <h3 className="text-lg font-semibold text-white">{s.title}</h3>
              </div>
              <ul className="flex flex-wrap gap-2">
                {s.items.map((t) => (
                  <li key={t} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm transition hover:border-volt hover:text-white">{t}</li>
                ))}
              </ul>
            </motion.article>
          );
        })}
      </motion.div>
    </section>
  );
}

function Arch({ nodes }) {
  return (
    <div className="flex items-center gap-1.5 overflow-x-auto" aria-label={`Architecture: ${nodes.join(" to ")}`}>
      {nodes.map((n, i) => (
        <div key={n} className="flex items-center gap-1.5">
          <span className="whitespace-nowrap rounded-md border border-cyan-neon/40 bg-cyan-neon/10 px-2 py-1 font-mono text-xs text-cyan-neon">{n}</span>
          {i < nodes.length - 1 && <span className="relative h-px w-6 overflow-hidden bg-cyan-neon/30"><span className="absolute inset-y-0 w-2 animate-[pulse_1.2s_ease-in-out_infinite] bg-white" /></span>}
        </div>
      ))}
    </div>
  );
}

export function Projects() {
  return (
    <section id="projects" className="section">
      <h2 className="h2">Projects</h2>
      <p className="mt-3 text-slate-400">Hover or focus a card to reveal its architecture.</p>
      <motion.div variants={grid} {...view} className="mt-12 grid gap-5 lg:grid-cols-3">
        {projects.map((p) => (
          <motion.article key={p.title} variants={item} tabIndex={0} className="glass glass-hover group flex flex-col p-6 focus-visible:border-cyan-neon/60">
            <h3 className="text-xl font-semibold text-white">{p.title}</h3>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-400">{p.desc}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {p.tags.map((t) => <span key={t} className="rounded-md bg-volt/15 px-2 py-0.5 text-xs text-violet-300">{t}</span>)}
            </div>
            <div className="grid grid-rows-[0fr] opacity-0 transition-all duration-500 group-hover:mt-5 group-hover:grid-rows-[1fr] group-hover:opacity-100 group-focus-visible:mt-5 group-focus-visible:grid-rows-[1fr] group-focus-visible:opacity-100">
              <div className="overflow-hidden"><Arch nodes={p.arch} /></div>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}

export function Highlights() {
  return (
    <section aria-label="Credentials at a glance" className="mx-auto max-w-6xl px-5 pt-10 md:px-8">
      <motion.div variants={grid} {...view} className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {highlights.map((h) => (
          <motion.div key={h.l} variants={item} className="glass p-5 text-center">
            <div className="bg-gradient-to-r from-cyan-neon to-volt bg-clip-text text-3xl font-extrabold text-transparent md:text-4xl">{h.v}</div>
            <div className="mt-2 text-sm text-white">{h.l}</div>
            <div className="mt-1 text-xs text-slate-500">{h.s}</div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

export function Timeline() {
  return (
    <section id="training" className="section">
      <h2 className="h2">Certifications & Training</h2>
      <ol className="relative mt-12 space-y-8 border-l border-cyan-neon/30 pl-8">
        {timeline.map((t, i) => {
          const Icon = Icons[t.icon];
          return (
            <motion.li key={t.title} initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="relative">
              <span className={`absolute -left-[3.15rem] grid h-9 w-9 place-items-center rounded-full border bg-navy shadow-glow ${t.upcoming ? "border-volt text-volt" : "border-cyan-neon/60 text-cyan-neon"}`}><Icon size={16} /></span>
              <div className={`glass p-5 ${t.upcoming ? "border-volt/40" : ""}`}>
                {t.date && <span className={`mb-2 inline-block rounded-md px-2 py-0.5 font-mono text-xs ${t.upcoming ? "bg-volt/20 text-violet-300" : "bg-cyan-neon/10 text-cyan-neon"}`}>{t.date}</span>}
                <h3 className="font-semibold text-white">{t.title}</h3>
                <p className="mt-1 text-sm text-slate-400">{t.org}</p>
              </div>
            </motion.li>
          );
        })}
      </ol>
    </section>
  );
}

"use client";
import { useRef, useState } from "react";
import { Github, Linkedin, Mail, MapPin } from "lucide-react";
import { profile, stack, projects, timeline } from "@/lib/data";

const run = (cmd) => {
  const [c, ...a] = cmd.trim().toLowerCase().split(/\s+/);
  switch (c) {
    case "help": return ["Commands: help, whoami, skills, certs, projects, basma, contact, ping hagar, traceroute, sudo, clear"];
    case "about": case "whoami": return [profile.name, profile.role, profile.edu];
    case "skills": return stack.map((s) => `${s.title}: ${s.items.join(", ")}`);
    case "certs": return timeline.map((t) => `${(t.date || "").padEnd(14)}${t.title}`);
    case "projects": return [...projects.map((p, i) => `${i + 1}. ${p.title}  [${p.tags.join(", ")}]`), `4. Basma: AI & Voice Assistant  (type "basma" for details)`];
    case "basma": return [
      "Basma: AI & Voice Assistant",
      "An AI-powered voice assistant project built by Hagar.",
      `GitHub: ${profile.basmaRepo}`,
    ];
    case "contact": return [`email:    ${profile.email}`, `linkedin: ${profile.linkedin}`, `github:   ${profile.github}`, `location: ${profile.location}`];
    case "ping": return a[0] === "hagar" || a[0] === "hagar.cloud" ? [
      "PING hagar.cloud (192.168.1.100): 56 data bytes",
      "64 bytes from 192.168.1.100: icmp_seq=0 ttl=118 time=12.4 ms",
      "64 bytes from 192.168.1.100: icmp_seq=1 ttl=118 time=10.8 ms",
      "64 bytes from 192.168.1.100: icmp_seq=2 ttl=118 time=11.2 ms",
      "--- hagar.cloud ping statistics ---",
      "3 packets transmitted, 3 packets received, 0.0% packet loss",
      "Status: Hagar is ONLINE and ready for Network/Security opportunities!",
    ] : ["Usage: ping hagar"];
    case "traceroute": return [
      "traceroute to hagar.cloud (10.0.0.1), 30 hops max",
      "1  gateway.local (192.168.1.1)  1.2 ms",
      "2  isp-core-router (10.200.0.1)  4.5 ms",
      "3  cisco-switch-vlan10 (172.16.1.1)  8.1 ms",
      "4  huawei-usg6000v-firewall (172.16.2.254)  9.3 ms [PASS]",
      "5  hagar.cloud (10.0.0.1)  11.5 ms [Destination Reached]",
    ];
    case "sudo": return ["[SECURITY ALERT] Access Denied: This unauthorized privilege escalation attempt has been logged and reported to Hagar's SOC Team! 🛡️"];
    case "": return [];
    default: return [`command not found: ${c}. Type "help".`];
  }
};

export default function Terminal() {
  const [log, setLog] = useState([{ out: ['Welcome. Type "help" to list commands.'] }]);
  const [val, setVal] = useState(""), [hist, setHist] = useState([]), [h, setH] = useState(-1);
  const box = useRef(null);
  const submit = (e) => {
    e.preventDefault();
    if (val.trim().toLowerCase() === "clear") setLog([]);
    else setLog((l) => [...l, { cmd: val, out: run(val) }]);
    if (val.trim()) setHist((x) => [val, ...x]);
    setVal(""); setH(-1);
    setTimeout(() => box.current?.scrollTo({ top: 1e6 }), 0);
  };
  const key = (e) => {
    if (e.key === "ArrowUp" && hist.length) { e.preventDefault(); const n = Math.min(h + 1, hist.length - 1); setH(n); setVal(hist[n]); }
    if (e.key === "ArrowDown") { e.preventDefault(); const n = h - 1; setH(n); setVal(n >= 0 ? hist[n] : ""); }
  };
  const social = [[Linkedin, profile.linkedin, "LinkedIn"], [Github, profile.github, "GitHub"], [Mail, `mailto:${profile.email}`, "Email"]];
  return (
    <section id="contact" className="section">
      <h2 className="h2">Contact</h2>
      <p className="mt-3 text-slate-400">Recruiters: open the terminal and type a command.</p>
      <div className="glass mt-10 overflow-hidden shadow-glow/20">
        <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-red-400/80" /><span className="h-3 w-3 rounded-full bg-yellow-400/80" /><span className="h-3 w-3 rounded-full bg-green-400/80" />
          <span className="ml-3 font-mono text-xs text-slate-500">guest@hagar-net: ~</span>
        </div>
        <div ref={box} className="h-72 overflow-y-auto p-5 font-mono text-sm" onClick={(e) => e.currentTarget.querySelector("input")?.focus()}>
          {log.map((l, i) => (
            <div key={i} className="mb-2">
              {l.cmd !== undefined && <div className="text-cyan-neon">$ {l.cmd}</div>}
              {l.out.map((o, j) => <div key={j} className="whitespace-pre-wrap text-slate-300">{o}</div>)}
            </div>
          ))}
          <form onSubmit={submit} className="flex gap-2 text-cyan-neon">
            <label htmlFor="cmd">$</label>
            <input id="cmd" value={val} onChange={(e) => setVal(e.target.value)} onKeyDown={key} autoComplete="off" spellCheck={false}
              className="flex-1 bg-transparent text-white caret-cyan-neon outline-none" />
          </form>
        </div>
      </div>
      <div className="mt-8 flex flex-wrap items-center gap-4">
        {social.map(([Icon, href, label]) => (
          <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}
            className="glass glass-hover flex items-center gap-2 px-5 py-3 text-sm text-slate-200"><Icon size={18} className="text-cyan-neon" />{label}</a>
        ))}
        <span className="flex items-center gap-2 text-sm text-slate-400"><MapPin size={16} className="text-cyan-neon" />{profile.location}</span>
      </div>
    </section>
  );
}

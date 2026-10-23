import { Terminal as T } from "lucide-react";
const links = [["Stack", "#stack"], ["Projects", "#projects"], ["Training", "#training"], ["Contact", "#contact"]];
export default function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav className="glass mx-auto mt-3 flex max-w-6xl items-center justify-between rounded-full px-5 py-2.5 md:px-6" aria-label="Main">
        <a href="#top" className="flex items-center gap-2 font-semibold text-white"><T size={18} className="text-cyan-neon" />Hagar</a>
        <ul className="flex gap-4 text-sm md:gap-7">
          {links.map(([l, h]) => (
            <li key={h} className="hidden first:block sm:block"><a href={h} className="text-slate-300 transition hover:text-cyan-neon">{l}</a></li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

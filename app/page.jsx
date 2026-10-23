import Ambient from "@/components/Ambient";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import { Highlights, TechStack, Projects, Timeline } from "@/components/Sections";
import Terminal from "@/components/Terminal";
export default function Home() {
  return (
    <>
      <Ambient />
      <Nav />
      <main>
        <Hero />
        <Highlights />
        <TechStack />
        <Projects />
        <Timeline />
        <Terminal />
      </main>
      <footer className="border-t border-white/10 py-8 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} Hagar Ehab Elbahlawan
      </footer>
    </>
  );
}

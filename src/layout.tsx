import { useEffect, useState } from "react";
import Lenis from "lenis";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { CONTACT, SERVICES } from "./data";
import { Btn, Eyebrow, Lines, Reveal } from "./ui";

const NAV = [["Expertise", "/expertise"], ["Industries", "/industries"], ["Approach", "/approach"], ["Insights", "/insights"], ["About", "/about"]];

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const loc = useLocation();
  useEffect(() => setOpen(false), [loc.pathname]);
  useEffect(() => { document.body.style.overflow = open ? "hidden" : ""; }, [open]);
  useEffect(() => {
    let last = scrollY;
    const on = () => {
      const y = scrollY; setScrolled(y > 20); setHidden(y > 300 && y > last + 2 ? true : y < last - 2 ? false : hidden);
      last = y; const h = document.documentElement.scrollHeight - innerHeight; setProgress(h > 0 ? y / h : 0);
    };
    addEventListener("scroll", on, { passive: true }); return () => removeEventListener("scroll", on);
  });
  useEffect(() => { const k = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false); addEventListener("keydown", k); return () => removeEventListener("keydown", k); }, []);

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] bg-ink text-ivory px-4 py-2">Skip to content</a>
      <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)] ${hidden && !open ? "-translate-y-full" : ""} ${scrolled && !open ? "bg-bone/85 backdrop-blur-md border-b border-line" : "border-b border-transparent"}`}>
        <div className={`wrap flex items-center justify-between transition-all duration-700 ${scrolled ? "h-16" : "h-20 md:h-24"}`}>
          <Link to="/" className={`relative z-10 font-sans text-[15px] tracking-[.32em] font-medium ${open ? "text-ivory" : ""}`} aria-label="Prologe home">PROLOGE</Link>
          <nav className="hidden lg:flex gap-10 text-[13px]" aria-label="Primary">
            {NAV.map(([l, p]) => <NavLink key={p} to={p} className={({ isActive }) => `ul ${isActive ? "active" : ""}`}>{l}</NavLink>)}
          </nav>
          <div className="hidden lg:flex items-center gap-8 text-[13px]">
            <NavLink to="/contact" className="ul">Contact</NavLink>
            <Link to="/book" className="group inline-flex items-center gap-2 border-b border-ink pb-0.5">Book a Conversation <span className="arrow">→</span></Link>
          </div>
          <button onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mnav" aria-label={open ? "Close menu" : "Open menu"} className={`lg:hidden relative z-10 w-11 h-11 -mr-2 flex flex-col items-center justify-center gap-[6px] ${open ? "text-ivory" : ""}`}>
            <span className={`h-px w-6 bg-current transition-transform duration-500 ${open ? "translate-y-[3.5px] rotate-45" : ""}`} />
            <span className={`h-px w-6 bg-current transition-transform duration-500 ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`} />
          </button>
        </div>
        <div className="absolute bottom-0 left-0 h-px bg-ink/70 origin-left" style={{ transform: `scaleX(${progress})`, width: "100%" }} aria-hidden />
      </header>

      <div id="mnav" className={`fixed inset-0 z-40 bg-carbon text-ivory lg:hidden flex flex-col transition-[clip-path] duration-700 ease-[cubic-bezier(.22,1,.36,1)] ${open ? "[clip-path:inset(0_0_0_0)]" : "[clip-path:inset(0_0_100%_0)] pointer-events-none"}`} aria-hidden={!open}>
        <nav className="wrap flex-1 pt-28 flex flex-col" aria-label="Mobile">
          {[...NAV, ["Contact", "/contact"]].map(([l, p], i) => (
            <Link key={p} to={p} tabIndex={open ? 0 : -1} className="flex items-baseline justify-between border-b border-ivory/10 py-4" style={{ transition: "opacity .6s, transform .6s", transitionDelay: open ? `${150 + i * 50}ms` : "0ms", opacity: open ? 1 : 0, transform: open ? "none" : "translateY(12px)" }}>
              <span className="display text-[40px]">{l}</span><span className="eyebrow text-ivory/40">0{i + 1}</span>
            </Link>
          ))}
          <div className="mt-8 text-sm text-ivory/50 space-y-1"><p>{CONTACT.email}</p><p>{CONTACT.phone}</p><p>{CONTACT.city}</p></div>
        </nav>
        <div className="wrap pb-8"><Btn to="/book" dark className="w-full">Book a Conversation</Btn></div>
      </div>
    </>
  );
}

export function FinalCTA() {
  return (
    <section className="bg-carbon text-ivory">
      <div className="wrap py-28 md:py-44 grid md:grid-cols-12 gap-12">
        <div className="md:col-span-8">
          <Reveal><Eyebrow className="text-sand mb-10">Start a Conversation</Eyebrow></Reveal>
          <Lines lines={["What Could Change", "in 90 Days?"]} italicLast className="text-5xl sm:text-7xl lg:text-[104px]" />
        </div>
        <Reveal delay={250} className="md:col-span-4 md:self-end space-y-8">
          <p className="text-ivory/70 text-[17px] leading-relaxed">Tell us what is getting in the way of growth. We will tell you what we think it takes to fix it.</p>
          <div className="flex flex-col gap-3">
            <Btn to="/book" dark>Book a Discovery Call</Btn>
            <a href={`mailto:${CONTACT.email}`} className="group flex justify-between items-center min-h-[48px] border-b border-ivory/20 text-sm"><span className="ul">{CONTACT.email}</span><span className="arrow">→</span></a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  const cols: [string, [string, string][]][] = [
    ["Expertise", SERVICES.map(s => [s.short, `/expertise/${s.slug}`])],
    ["Company", [["About", "/about"], ["Approach", "/approach"], ["Leadership", "/about#leadership"], ["Industries", "/industries"], ["Case Studies", "/case-studies"], ["Insights", "/insights"]]],
    ["Connect", [["Contact", "/contact"], ["Book a Conversation", "/book"], ["LinkedIn", "https://www.linkedin.com"]]],
    ["Regions", [["UAE", "/#markets"], ["Saudi Arabia", "/#markets"], ["Kuwait", "/#markets"], ["Oman", "/#markets"]]],
    ["Legal", [["Privacy", "/privacy"], ["Terms", "/terms"]]],
  ];
  return (
    <footer className="bg-carbon text-ivory border-t border-ivory/10 overflow-hidden">
      <div className="wrap pt-20 pb-10">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-y-12 gap-x-8">
          <div className="col-span-2 md:col-span-1">
            <p className="tracking-[.32em] text-[15px] font-medium">PROLOGE</p>
            <p className="text-ivory/50 text-sm mt-4 leading-relaxed max-w-[220px]">Human capital advisory for the GCC and beyond.</p>
          </div>
          {cols.map(([h, links]) => (
            <div key={h}>
              <p className="eyebrow text-ivory/40 mb-5">{h}</p>
              <ul className="space-y-3 text-sm text-ivory/80">
                {links.map(([l, p]) => <li key={l}>{p.startsWith("http") ? <a href={p} target="_blank" rel="noreferrer" className="ul">{l}</a> : <Link to={p} className="ul">{l}</Link>}</li>)}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-20 pt-8 border-t border-ivory/10 flex flex-col md:flex-row gap-3 md:gap-12 text-sm text-ivory/60">
          <span>{CONTACT.city}</span>
          <a href={`mailto:${CONTACT.email}`} className="ul w-fit">{CONTACT.email}</a>
          <a href={`tel:${CONTACT.tel}`} className="ul w-fit">{CONTACT.phone}</a>
          <span className="md:ml-auto">© {new Date().getFullYear()} Prologe</span>
        </div>
      </div>
      <p aria-hidden className="display text-center leading-[.75] text-[23vw] text-ivory/[.06] select-none -mb-[3vw] tracking-[-.02em]">PROLOGE</p>
    </footer>
  );
}

export default function Layout() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const l = new Lenis({ duration: 1.15, easing: t => 1 - Math.pow(1 - t, 4), smoothWheel: true });
    let raf = 0; const loop = (t: number) => { l.raf(t); raf = requestAnimationFrame(loop); }; raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); l.destroy(); };
  }, []);
  useEffect(() => {
    if (hash) { setTimeout(() => document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: "smooth" }), 100); }
    else scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname, hash]);
  const showSticky = pathname !== "/contact" && pathname !== "/book";
  return (
    <>
      <Header />
      <main id="main" key={pathname} className="animate-[fade_.7s_ease]"><Outlet /></main>
      <Footer />
      {showSticky && <Link to="/book" className="lg:hidden fixed bottom-4 right-4 z-30 bg-ink text-ivory eyebrow px-5 min-h-[48px] flex items-center gap-3 shadow-[0_8px_30px_rgba(0,0,0,.18)]">Book a Call <span>→</span></Link>}
      <style>{`@keyframes fade{from{opacity:0}to{opacity:1}}`}</style>
    </>
  );
}

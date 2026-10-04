import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { CASES, IMG, INDUSTRIES, INSIGHTS, MARKETS, SERVICES, type Case, type Insight } from "./data";
import { Eyebrow, Lines, Parallax, Reveal, Rule, TextLink, useInView } from "./ui";

/* Minimal custom cursor for large interactive editorial areas */
export function CursorZone({ label, children, className = "" }: { label: string; children: ReactNode; className?: string }) {
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const fine = typeof window !== "undefined" && matchMedia("(pointer:fine)").matches;
  return (
    <div className={`relative ${className}`} onMouseMove={e => fine && setPos({ x: e.clientX, y: e.clientY })} onMouseLeave={() => setPos(null)}>
      {children}
      {fine && <div aria-hidden className="pointer-events-none fixed z-[60] w-20 h-20 -ml-10 -mt-10 rounded-full bg-ink text-ivory eyebrow flex items-center justify-center transition-[opacity,transform] duration-300" style={{ left: pos?.x ?? 0, top: pos?.y ?? 0, opacity: pos ? 1 : 0, transform: pos ? "scale(1)" : "scale(.4)" }}>{label}</div>}
    </div>
  );
}

export function SectionHead({ eyebrow, lines, n, aside, dark = false }: { eyebrow: string; lines: string[]; n?: string; aside?: ReactNode; dark?: boolean }) {
  return (
    <div className="grid md:grid-cols-12 gap-8 md:gap-10 items-end mb-14 md:mb-24">
      <div className="md:col-span-7">
        <Reveal><Eyebrow n={n} className={`${dark ? "text-sand" : "text-grey"} mb-8`}>{eyebrow}</Eyebrow></Reveal>
        <Lines lines={lines} italicLast className="text-[40px] sm:text-5xl lg:text-[68px]" />
      </div>
      {aside && <Reveal delay={200} className={`md:col-span-4 md:col-start-9 text-[17px] leading-relaxed ${dark ? "text-ivory/60" : "text-grey"}`}>{aside}</Reveal>}
    </div>
  );
}

/* 09 — Service index */
export function ServiceIndex() {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="grid lg:grid-cols-12 gap-10">
      <ul className="lg:col-span-7 border-t border-line">
        {SERVICES.map((s, i) => (
          <li key={s.slug} className="border-b border-line">
            {/* desktop */}
            <Link to={`/expertise/${s.slug}`} onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)} className={`group hidden lg:flex items-start gap-10 py-9 px-4 -mx-4 transition-colors duration-500 ${active === i ? "bg-ivory" : ""}`}>
              <span className={`eyebrow pt-3 w-8 transition-colors ${active === i ? "text-bronze" : "text-grey"}`}>{s.n}</span>
              <span className={`display text-[40px] xl:text-[46px] flex-1 transition-all duration-500 ${active === i ? "translate-x-1.5 text-ink" : "text-ink/45"}`}>{s.lines[0]}<br />{s.lines[1]}</span>
              <span className={`pt-4 transition-all duration-500 ${active === i ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-3"}`}>→</span>
            </Link>
            {/* mobile accordion */}
            <button className="lg:hidden w-full flex items-start gap-5 py-6 text-left min-h-[44px]" aria-expanded={open === i} onClick={() => setOpen(open === i ? null : i)}>
              <span className="eyebrow text-bronze pt-2">{s.n}</span>
              <span className="display text-[28px] flex-1 leading-[1.05]">{s.title}</span>
              <span className={`text-xl pt-1 transition-transform duration-500 ${open === i ? "rotate-45" : ""}`}>+</span>
            </button>
            <div className="lg:hidden grid transition-[grid-template-rows] duration-700 ease-[cubic-bezier(.22,1,.36,1)]" style={{ gridTemplateRows: open === i ? "1fr" : "0fr" }}>
              <div className="overflow-hidden"><div className="pb-8 pl-10 space-y-5"><p className="text-grey leading-relaxed">{s.summary}</p><TextLink to={`/expertise/${s.slug}`}>Explore</TextLink></div></div>
            </div>
          </li>
        ))}
      </ul>
      <div className="hidden lg:block lg:col-span-5">
        <div className="sticky top-28">
          <div className="relative aspect-[4/5] overflow-hidden bg-line">
            {SERVICES.map((s, i) => <img key={s.slug} src={s.img} alt="" loading="lazy" className={`absolute inset-0 w-full h-full object-cover grayscale-[.35] sepia-[.08] transition-all duration-[1.2s] ease-[cubic-bezier(.22,1,.36,1)] ${active === i ? "opacity-100 scale-100" : "opacity-0 scale-105"}`} />)}
            <span className="absolute top-5 left-5 eyebrow text-ivory mix-blend-difference">{SERVICES[active].n} / 05</span>
          </div>
          <div className="pt-8 min-h-[150px]" key={active}>
            <p className="text-[17px] leading-relaxed animate-[fade_.6s_ease]">{SERVICES[active].summary}</p>
            <TextLink to={`/expertise/${SERVICES[active].slug}`} className="mt-6">View Expertise</TextLink>
          </div>
        </div>
      </div>
    </div>
  );
}

/* 12 — Comparison with scroll-linked emphasis */
export function Comparison() {
  const ref = useRef<HTMLDivElement>(null); const [p, setP] = useState(0);
  useEffect(() => {
    const on = () => { const r = ref.current?.getBoundingClientRect(); if (!r) return; setP(Math.max(0, Math.min(1, (innerHeight * .75 - r.top) / (r.height * .8)))); };
    on(); addEventListener("scroll", on, { passive: true }); return () => removeEventListener("scroll", on);
  }, []);
  const trad = ["Studies", "Reports", "Handover", "Long timelines", "Junior execution"];
  const pro = [["Diagnose", "Reality before recommendations."], ["Build", "Systems designed for your context."], ["Implement", "Alongside your leadership team."], ["Embed", "Capability transferred, not rented."], ["Measure", "Outcomes tracked against baseline."]];
  return (
    <div ref={ref} className="grid md:grid-cols-2 border-t border-line">
      <div className="py-12 md:py-16 md:pr-12 md:border-r border-line transition-opacity duration-300" style={{ opacity: 1 - p * .6 }}>
        <p className="eyebrow text-grey mb-10">Traditional Consulting</p>
        <ul>{trad.map((t, i) => <li key={t} className="display text-[32px] md:text-[44px] text-grey border-b border-line py-3 flex justify-between items-baseline"><span className={p > .35 + i * .08 ? "line-through decoration-1 decoration-grey/60" : ""}>{t}</span><span className="eyebrow">{String(i + 1).padStart(2, "0")}</span></li>)}</ul>
      </div>
      <div className="py-12 md:py-16 md:pl-12 bg-carbon text-ivory -mx-[clamp(20px,4vw,64px)] px-[clamp(20px,4vw,64px)] md:mx-0 md:px-12">
        <p className="eyebrow text-sand mb-10">The Prologe Model</p>
        <ol>{pro.map(([t, d], i) => (
          <li key={t} className="border-b border-ivory/15 py-3 grid grid-cols-[1fr_auto] md:grid-cols-[1fr_1fr_auto] gap-4 items-baseline transition-all duration-700" style={{ opacity: .35 + Math.min(1, p * 1.6) * .65, transform: `translateX(${(1 - Math.min(1, p * 1.4)) * 12}px)`, transitionDelay: `${i * 60}ms` }}>
            <span className="display text-[32px] md:text-[44px]">{t}</span><span className="hidden md:block text-sm text-ivory/55">{d}</span><span className="eyebrow text-sand">{String(i + 1).padStart(2, "0")}</span>
          </li>))}
        </ol>
      </div>
    </div>
  );
}

/* 13 — 90-day method */
export const PHASES = [
  { n: "01", days: "Days 01–30", t: "Rapid Diagnostic", items: ["Understand reality", "Identify priorities", "Stabilize immediate risks", "Build transformation roadmap"] },
  { n: "02", days: "Days 31–60", t: "Parallel Implementation", items: ["Deploy solutions", "Work beside leadership teams", "Measure progress", "Refine continuously"] },
  { n: "03", days: "Days 61–90", t: "Embedding & Sustainability", items: ["Transfer capability", "Document systems", "Establish governance", "Complete handover"] },
];
export function Timeline() {
  const ref = useRef<HTMLDivElement>(null); const [p, setP] = useState(0);
  useEffect(() => {
    const on = () => { const el = ref.current; if (!el) return; const r = el.getBoundingClientRect(); const total = el.offsetHeight - innerHeight; setP(Math.max(0, Math.min(1, -r.top / total))); };
    on(); addEventListener("scroll", on, { passive: true }); return () => removeEventListener("scroll", on);
  }, []);
  const activeI = Math.min(2, Math.floor(p * 3));
  return (
    <>
      {/* desktop sticky */}
      <div ref={ref} className="hidden lg:block relative" style={{ height: "240vh" }}>
        <div className="sticky top-0 h-screen flex flex-col justify-center">
          <div className="flex justify-between items-end mb-10">
            <p className="eyebrow text-grey">Day <span className="text-ink tabular-nums">{String(Math.max(1, Math.round(p * 90))).padStart(2, "0")}</span> / 90</p>
            <p className="eyebrow text-grey">Scroll to progress</p>
          </div>
          <div className="relative h-px bg-line mb-16">
            <div className="absolute inset-y-0 left-0 bg-ink" style={{ width: `${p * 100}%` }} />
            {[0, 1 / 3, 2 / 3, 1].map((x, i) => <span key={i} className={`absolute -top-[5px] w-[11px] h-[11px] -ml-[5px] border transition-colors duration-500 ${p >= x - .001 ? "bg-ink border-ink" : "bg-bone border-grey"}`} style={{ left: `${x * 100}%` }} />)}
          </div>
          <div className="grid grid-cols-3 gap-12">
            {PHASES.map((ph, i) => (
              <div key={ph.n} className="transition-all duration-700" style={{ opacity: i <= activeI ? 1 : .28, transform: i <= activeI ? "none" : "translateY(12px)" }}>
                <p className="eyebrow text-bronze">Phase {ph.n} · {ph.days}</p>
                <h3 className="display text-[44px] mt-5 mb-8">{ph.t}</h3>
                <ul className="border-t border-line">{ph.items.map(it => <li key={it} className="border-b border-line py-3 text-[15px] flex gap-4"><span className="text-grey">—</span>{it}</li>)}</ul>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* mobile vertical */}
      <ol className="lg:hidden relative border-l border-line ml-1.5">
        {PHASES.map((ph, i) => (
          <Reveal as="li" key={ph.n} delay={i * 80} className="relative pl-8 pb-14 last:pb-0">
            <span className="absolute -left-[6px] top-1 w-[11px] h-[11px] bg-ink" />
            <p className="eyebrow text-bronze">Phase {ph.n} · {ph.days}</p>
            <h3 className="display text-[34px] mt-3 mb-5">{ph.t}</h3>
            <ul>{ph.items.map(it => <li key={it} className="border-b border-line py-3 text-[15px]">{it}</li>)}</ul>
          </Reveal>
        ))}
      </ol>
    </>
  );
}

/* 14 — Markets */
export function Markets() {
  const [a, setA] = useState(0); const m = MARKETS[a];
  return (
    <div className="grid lg:grid-cols-12 gap-12 lg:gap-10">
      <ul className="lg:col-span-6 border-t border-line" role="tablist" aria-label="Markets">
        {MARKETS.map((mk, i) => (
          <li key={mk.id}>
            <button role="tab" aria-selected={a === i} onMouseEnter={() => setA(i)} onFocus={() => setA(i)} onClick={() => setA(i)} className="group w-full flex items-baseline justify-between border-b border-line py-5 md:py-6 text-left min-h-[44px]">
              <span className={`display text-[38px] md:text-[58px] transition-all duration-500 ${a === i ? "translate-x-1.5" : "text-ink/35"}`}>{mk.name}</span>
              <span className={`eyebrow transition-colors ${a === i ? "text-bronze" : "text-grey/60"}`}>{mk.coord}</span>
            </button>
          </li>
        ))}
      </ul>
      <div className="lg:col-span-5 lg:col-start-8">
        <div className="grid grid-cols-8 gap-[3px] aspect-[8/6] mb-8" aria-hidden>
          {Array.from({ length: 48 }).map((_, i) => { const on = m.cells.includes(i); return <span key={i} className={`relative transition-colors duration-700 ${on ? "bg-ink" : "bg-line/50"}`} style={{ transitionDelay: `${(i % 8) * 25}ms` }}>{on && <span className="absolute inset-0 m-auto w-1 h-1 bg-bone" />}</span>; })}
        </div>
        <div key={a} className="animate-[fade_.6s_ease]">
          <p className="eyebrow text-grey mb-4">{String(a + 1).padStart(2, "0")} — {m.name}</p>
          <p className="text-[17px] leading-relaxed">{m.text}</p>
        </div>
      </div>
    </div>
  );
}

/* 15 — Industries */
export function IndustryList() {
  const [a, setA] = useState<number | null>(null);
  return (
    <CursorZone label="Explore" className="relative">
      <div className="hidden lg:block absolute right-0 top-0 w-[34%] h-full pointer-events-none">
        <div className="sticky top-28 aspect-[3/4] overflow-hidden">
          {INDUSTRIES.map((ind, i) => <img key={ind.slug} src={ind.img} alt="" loading="lazy" className={`absolute inset-0 w-full h-full object-cover grayscale-[.35] sepia-[.08] transition-all duration-[1s] ${a === i ? "opacity-100 scale-100" : "opacity-0 scale-[1.04]"}`} />)}
        </div>
      </div>
      <ul className="border-t border-line lg:w-[62%]">
        {INDUSTRIES.map((ind, i) => (
          <li key={ind.slug}>
            <Link to={`/industries/${ind.slug}`} onMouseEnter={() => setA(i)} onMouseLeave={() => setA(null)} className="group grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-4 border-b border-line py-5 md:py-7 lg:cursor-none">
              <span className={`eyebrow transition-all duration-500 ${a === i ? "text-bronze" : "text-grey lg:opacity-0"}`}>{ind.n}</span>
              <span>
                <span className={`display block text-[28px] md:text-[44px] leading-[1.05] transition-all duration-500 ${a !== null && a !== i ? "lg:text-ink/30" : ""} ${a === i ? "translate-x-1.5" : ""}`}>{ind.name}</span>
                <span className={`block text-sm text-grey overflow-hidden transition-all duration-500 lg:max-h-0 ${a === i ? "lg:max-h-10 lg:mt-2" : ""} mt-1`}>{ind.desc}</span>
              </span>
              <span className="arrow">→</span>
            </Link>
          </li>
        ))}
      </ul>
    </CursorZone>
  );
}

/* 16 — Case study row */
export function CaseRow({ c, i }: { c: Case; i: number }) {
  const flip = i % 2 === 1;
  return (
    <article className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center py-16 md:py-24 border-t border-line">
      <CursorZone label="View" className={`lg:col-span-7 ${flip ? "lg:order-2" : ""}`}>
        <Link to={`/case-studies/${c.slug}`} className="block zoom lg:cursor-none" aria-label={`View case study: ${c.title.join(" ")}`}>
          <Parallax src={c.img} alt={`${c.sector} — architectural study`} className="aspect-[4/3] md:aspect-[16/11]" amount={30} />
        </Link>
      </CursorZone>
      <div className={`lg:col-span-5 ${flip ? "lg:order-1" : ""}`}>
        <Reveal><p className="eyebrow text-grey flex gap-4"><span className="text-bronze">Case {c.n}</span><span>{c.sector}</span></p></Reveal>
        <Lines as="h3" lines={c.title} className="text-[36px] md:text-[52px] mt-6 mb-4" />
        <Reveal><p className="eyebrow text-grey mb-8">{c.client}</p></Reveal>
        <Reveal delay={100}>
          <dl className="border-t border-line text-[15px]">
            {[["Challenge", c.challenge], ["Approach", c.approach], ["Outcome", c.outcome]].map(([k, v]) => (
              <div key={k} className="grid grid-cols-[6.5rem_1fr] gap-4 py-4 border-b border-line"><dt className="eyebrow text-grey pt-1">{k}</dt><dd className="leading-relaxed">{v}</dd></div>
            ))}
          </dl>
          <TextLink to={`/case-studies/${c.slug}`} className="mt-8">View Case Study</TextLink>
        </Reveal>
      </div>
    </article>
  );
}

export function CaseSwipe() {
  return (
    <div className="md:hidden -mx-5 px-5 flex gap-4 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-2">
      {CASES.map(c => (
        <Link key={c.slug} to={`/case-studies/${c.slug}`} className="snap-start shrink-0 w-[82%]">
          <img src={c.img} alt="" loading="lazy" className="aspect-[4/5] w-full object-cover grayscale-[.35] sepia-[.08]" />
          <p className="eyebrow text-bronze mt-5">Case {c.n} · {c.sector}</p>
          <h3 className="display text-[30px] mt-2 leading-[1.05]">{c.title.join(" ")}</h3>
          <p className="eyebrow text-grey mt-3">{c.client}</p>
        </Link>
      ))}
    </div>
  );
}

/* 20 — Insights */
export function InsightCard({ a, big = false }: { a: Insight; big?: boolean }) {
  return (
    <Link to={`/insights/${a.slug}`} className="group block zoom">
      <div className={`overflow-hidden bg-line ${big ? "aspect-[4/3]" : "aspect-[4/5]"}`}><img src={a.img} alt="" loading="lazy" className="w-full h-full object-cover grayscale-[.35] sepia-[.08]" /></div>
      <div className="flex justify-between eyebrow text-grey mt-5 pb-4 border-b border-line"><span className="text-bronze">{a.cat}</span><span>{a.date} · {a.read}</span></div>
      <h3 className={`display mt-4 leading-[1.08] transition-transform duration-500 group-hover:translate-x-1 ${big ? "text-[34px] md:text-[44px]" : "text-[26px]"}`}>{a.title}</h3>
      {big && <p className="text-grey mt-4 leading-relaxed">{a.dek}</p>}
      <span className="inline-flex gap-3 eyebrow mt-5"><span className="ul">Read</span><span className="arrow">→</span></span>
    </Link>
  );
}

export function InsightsGrid({ items = INSIGHTS.slice(0, 3) }: { items?: Insight[] }) {
  return (
    <div className="grid md:grid-cols-12 gap-x-8 gap-y-16">
      <Reveal className="md:col-span-6"><InsightCard a={items[0]} big /></Reveal>
      {items.slice(1).map((a, i) => <Reveal key={a.slug} delay={120 * (i + 1)} className="md:col-span-3"><InsightCard a={a} /></Reveal>)}
    </div>
  );
}

/* 17 — Founder */
export function Founder() {
  return (
    <section id="leadership" className="wrap py-24 md:py-40">
      <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="relative aspect-[4/5] bg-[#E6E2DA] overflow-hidden">
            <Parallax src={IMG.exec} alt="Editorial image — to be replaced with the founder portrait" className="absolute inset-0" amount={40} />
            <span className="absolute bottom-5 left-5 eyebrow text-ivory/80 bg-carbon/40 backdrop-blur-sm px-3 py-2">Image placeholder — founder portrait to be supplied</span>
          </div>
        </div>
        <div className="lg:col-span-6 lg:col-start-7 flex flex-col">
          <Reveal><Eyebrow className="text-grey mb-10">Leadership</Eyebrow></Reveal>
          <Lines lines={["Maha Tafech"]} className="text-[52px] md:text-[88px]" />
          <Reveal><p className="eyebrow text-grey mt-4">Founder & Principal Consultant</p></Reveal>
          <Rule className="my-10" />
          <Lines as="h3" lines={["From Systems to People."]} italicLast className="text-[30px] md:text-[40px] mb-8" />
          <Reveal delay={100} className="space-y-5 text-[17px] leading-relaxed text-ink/80 md:columns-1">
            <p>A career spanning technology and senior global HR leadership shaped a distinctive approach: human capital should be designed with the same clarity, discipline and scalability as any critical business system.</p>
            <p className="text-grey">Maha founded Prologe to close the gap between people strategy and operational reality — bringing senior practitioners directly into the businesses they serve.</p>
          </Reveal>
        </div>
      </div>
      <Reveal className="mt-16 md:mt-24 border-t border-b border-line grid grid-cols-2 md:grid-cols-4">
        {["[Credential — to verify]", "[Prior leadership role — to verify]", "[Qualification — to verify]", "[Sector experience — to verify]"].map((c, i) => (
          <div key={i} className={`py-6 px-0 md:px-6 ${i ? "md:border-l" : ""} border-line ${i % 2 ? "pl-4 border-l md:pl-6" : ""}`}><p className="eyebrow text-bronze mb-2">0{i + 1}</p><p className="text-[13px] text-grey">{c}</p></div>
        ))}
      </Reveal>
    </section>
  );
}

export function Quote({ lines }: { lines: string[] }) {
  const [ref, v] = useInView<HTMLDivElement>();
  return (
    <section className="bg-ivory border-y border-line">
      <div ref={ref} className="wrap py-28 md:py-48 text-center">
        <Lines lines={lines} italicLast className="text-[36px] sm:text-5xl lg:text-[76px] max-w-5xl mx-auto" />
        <div className={`rule h-px w-16 bg-bronze mx-auto mt-14 ${v ? "in" : ""}`} />
      </div>
    </section>
  );
}

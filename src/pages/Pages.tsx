import { useState, type FormEvent } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { CASES, CONTACT, IMG, INDUSTRIES, INSIGHTS, SERVICES } from "../data";
import { FinalCTA } from "../layout";
import { DriftStrip, ExpandImage, Marquee } from "../motion";
import { CaseRow, CaseSwipe, Comparison, Founder, IndustryList, InsightCard, InsightsGrid, Markets, Quote, SectionHead, ServiceIndex, Timeline } from "../sections";
import { Btn, Eyebrow, Lines, PageHero, Parallax, Reveal, Rule, TextLink, crumbs, useSeo } from "../ui";

function Crumbs({ items }: { items: [string, string][] }) {
  return <nav aria-label="Breadcrumb" className="wrap pt-28 md:pt-32 -mb-24 md:-mb-36 relative z-10"><ol className="flex flex-wrap gap-2 eyebrow text-grey">{items.map(([l, p], i) => <li key={p} className="flex gap-2">{i > 0 && <span>/</span>}{i < items.length - 1 ? <Link to={p} className="ul">{l}</Link> : <span className="text-ink" aria-current="page">{l}</span>}</li>)}</ol></nav>;
}

/* EXPERTISE */
export function Expertise() {
  useSeo("Expertise — HR Transformation & Human Capital Consulting UAE", "Technical talent, GCC market entry, portfolio transformation, rapid stabilisation and strategic HR transformation.", crumbs([["Home", "/"], ["Expertise", "/expertise"]]));
  return (<>
    <PageHero eyebrow="Expertise" lines={["Human Capital Solutions", "Built for Execution."]} intro="Five engagement models, each designed around a critical business moment — and each delivered by senior operators who implement what they design." />
    <section className="wrap pb-28 md:pb-40"><ServiceIndex /></section>
    <ExpandImage src={IMG.board} alt="Minimal boardroom interior" caption="Board-level engagement">
      <h2 className="display text-[44px] sm:text-6xl lg:text-[96px] max-w-4xl">Designed with leadership. <span className="italic">Delivered inside the business.</span></h2>
    </ExpandImage>
    <section className="wrap pb-28 md:pb-40"><SectionHead eyebrow="Every Engagement" lines={["Designed, Implemented,", "Embedded."]} /><Comparison /></section>
    <FinalCTA />
  </>);
}

export function ServicePage() {
  const { slug } = useParams(); const s = SERVICES.find(x => x.slug === slug);
  const c = CASES.find(x => x.slug === s?.caseSlug);
  const [open, setOpen] = useState<number | null>(0);
  useSeo(s ? `${s.title} — GCC` : "Expertise", s?.summary ?? "", s && { "@context": "https://schema.org", "@graph": [crumbs([["Home", "/"], ["Expertise", "/expertise"], [s.title, `/expertise/${s.slug}`]]), { "@type": "FAQPage", mainEntity: s.faq.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }, { "@type": "Service", name: s.title, provider: { "@type": "ProfessionalService", name: "Prologe" }, areaServed: "GCC" }] });
  if (!s) return <Navigate to="/expertise" />;
  const idx = SERVICES.indexOf(s); const next = SERVICES[(idx + 1) % SERVICES.length];
  return (<>
    <Crumbs items={[["Home", "/"], ["Expertise", "/expertise"], [s.short, ""]]} />
    <PageHero eyebrow={`Expertise ${s.n} / 05`} lines={[...s.lines]} intro={s.summary} />
    <section className="wrap pb-24"><Parallax src={s.img} alt={`${s.title} — editorial architecture`} className="aspect-[16/9] md:aspect-[21/9]" /></section>

    <section className="wrap py-20 md:py-32 grid md:grid-cols-12 gap-10">
      <div className="md:col-span-4"><Eyebrow n="02" className="text-grey mb-6">The Business Challenge</Eyebrow><Lines lines={["What Is", "Getting in the Way."]} italicLast className="text-4xl md:text-5xl" /></div>
      <ol className="md:col-span-7 md:col-start-6 border-t border-line">{s.challenge.map((t, i) => <Reveal as="li" key={t} delay={i * 60} className="grid grid-cols-[3rem_1fr] py-6 border-b border-line text-lg"><span className="eyebrow text-bronze pt-1.5">0{i + 1}</span>{t}</Reveal>)}</ol>
    </section>

    <section className="bg-carbon text-ivory"><div className="wrap py-24 md:py-36">
      <SectionHead dark n="03" eyebrow="What Prologe Changes" lines={["From — To."]} />
      <div className="border-t border-ivory/15">{s.changes.map((c, i) => (
        <Reveal key={i} delay={i * 70} className="grid md:grid-cols-[1fr_auto_1fr] gap-3 md:gap-10 items-baseline py-7 border-b border-ivory/15">
          <span className="text-ivory/45 text-lg line-through decoration-ivory/25">{c.from}</span><span className="eyebrow text-sand hidden md:block">→</span><span className="display text-[30px] md:text-[40px]">{c.to}</span>
        </Reveal>))}</div>
    </div></section>

    <section className="wrap py-24 md:py-36">
      <SectionHead n="04" eyebrow="Methodology" lines={["Four Moves.", "No Wasted Motion."]} />
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 border-t border-line">{s.method.map((m, i) => (
        <Reveal key={m.t} delay={i * 90} className={`relative py-10 lg:pr-8 ${i ? "lg:border-l lg:pl-8" : ""} border-line border-b lg:border-b-0`}>
          <span className="absolute -top-[5px] left-0 lg:left-auto w-[9px] h-[9px] bg-ink" style={{ left: i ? undefined : 0 }} />
          <p className="eyebrow text-bronze">Step 0{i + 1}</p><h3 className="display text-[40px] mt-4 mb-4">{m.t}</h3><p className="text-grey leading-relaxed">{m.d}</p>
        </Reveal>))}</div>
    </section>

    <section className="wrap pb-24 md:pb-36 grid lg:grid-cols-12 gap-12">
      <div className="lg:col-span-6"><Eyebrow n="05" className="text-grey mb-8">What Gets Delivered</Eyebrow>
        <ul className="border-t border-line">{s.deliverables.map((d, i) => <Reveal as="li" key={d} delay={i * 50} className="flex justify-between py-5 border-b border-line text-lg"><span>{d}</span><span className="eyebrow text-grey">D{i + 1}</span></Reveal>)}</ul></div>
      <div className="lg:col-span-5 lg:col-start-8"><Eyebrow n="06" className="text-grey mb-8">Outcomes</Eyebrow>
        {s.outcomes.map(o => <Reveal key={o.l} className="py-6 border-t border-line"><p className="display text-5xl text-bronze">{o.v}</p><p className="eyebrow text-grey mt-3">{o.l}</p></Reveal>)}
        <p className="text-[11px] text-grey mt-4">Outcome metrics pending client verification.</p>
        <Rule className="my-10" /><Eyebrow n="07" className="text-grey mb-5">Relevant Experience</Eyebrow><p className="text-lg leading-relaxed">{s.experience}</p></div>
    </section>

    {c && <section className="wrap"><Eyebrow n="08" className="text-grey">Related Case Study</Eyebrow><CaseRow c={c} i={0} /></section>}

    <section className="wrap py-24 md:py-36 grid md:grid-cols-12 gap-10 border-t border-line">
      <div className="md:col-span-4"><Eyebrow n="09" className="text-grey mb-6">FAQ</Eyebrow><Lines lines={["Questions", "Leaders Ask."]} italicLast className="text-4xl md:text-5xl" /></div>
      <div className="md:col-span-7 md:col-start-6 border-t border-line">{s.faq.map((f, i) => (
        <div key={i} className="border-b border-line">
          <button aria-expanded={open === i} onClick={() => setOpen(open === i ? null : i)} className="w-full flex justify-between gap-6 py-6 text-left text-lg min-h-[44px]"><span>{f.q}</span><span className={`transition-transform duration-500 ${open === i ? "rotate-45" : ""}`}>+</span></button>
          <div className="grid transition-[grid-template-rows] duration-700 ease-[cubic-bezier(.22,1,.36,1)]" style={{ gridTemplateRows: open === i ? "1fr" : "0fr" }}><div className="overflow-hidden"><p className="pb-6 text-grey leading-relaxed max-w-xl">{f.a}</p></div></div>
        </div>))}</div>
    </section>

    <section className="wrap pb-20"><Link to={`/expertise/${next.slug}`} className="group flex justify-between items-end border-t border-line pt-10"><div><p className="eyebrow text-grey mb-4">Next — {next.n}</p><p className="display text-4xl md:text-6xl transition-transform duration-500 group-hover:translate-x-1.5">{next.title}</p></div><span className="arrow text-2xl">→</span></Link></section>
    <FinalCTA />
  </>);
}

/* INDUSTRIES */
export function Industries() {
  useSeo("Industries — Human Capital Consulting Across Sectors", "Technology, private equity, professional services, government, education, family enterprises, healthcare and GovTech.", crumbs([["Home", "/"], ["Industries", "/industries"]]));
  return (<><PageHero eyebrow="Industries" lines={["Cross-Industry Experience.", "Operator-Level Understanding."]} intro="Sector context matters. We bring pattern recognition from across industries — and the operational fluency to apply it." /><DriftStrip images={INDUSTRIES.map(i => i.img)} /><div className="h-20" /><section className="wrap pb-28 md:pb-40"><IndustryList /></section><FinalCTA /></>);
}

export function IndustryPage() {
  const { slug } = useParams(); const ind = INDUSTRIES.find(x => x.slug === slug);
  useSeo(ind ? `${ind.name} — HR Consulting GCC` : "Industries", ind?.desc ?? "", ind && crumbs([["Home", "/"], ["Industries", "/industries"], [ind.name, `/industries/${ind.slug}`]]));
  if (!ind) return <Navigate to="/industries" />;
  const dark = +ind.n % 2 === 0;
  return (<>
    <Crumbs items={[["Home", "/"], ["Industries", "/industries"], [ind.name, ""]]} />
    <section className="wrap pt-36 md:pt-48 pb-16">
      <Reveal><Eyebrow n={ind.n} className="text-grey mb-8">{ind.name}</Eyebrow></Reveal>
      <Lines as="h1" lines={[...ind.statement]} italicLast className="text-[44px] sm:text-6xl lg:text-[96px]" />
    </section>
    <section className="wrap grid lg:grid-cols-12 gap-10 pb-24">
      <Parallax src={ind.img} alt={`${ind.name} — architectural image`} className="lg:col-span-8 aspect-[16/10]" />
      <Reveal className="lg:col-span-4 flex flex-col justify-end"><p className="text-xl leading-relaxed">{ind.desc}</p><Rule className="my-8" /><p className="text-grey leading-relaxed">Prologe works with leaders in this sector across the UAE, Saudi Arabia and the wider GCC.</p></Reveal>
    </section>
    <section className={dark ? "bg-carbon text-ivory" : "bg-ivory border-y border-line"}><div className="wrap py-24 md:py-36 grid md:grid-cols-12 gap-10">
      <div className="md:col-span-4"><Eyebrow className={`${dark ? "text-sand" : "text-grey"} mb-6`}>Typical Challenges</Eyebrow><Lines lines={["What Leaders", "Tell Us."]} italicLast className="text-4xl md:text-5xl" /></div>
      <ol className="md:col-span-7 md:col-start-6">{ind.challenges.map((c, i) => <Reveal as="li" key={c} delay={i * 60} className={`grid grid-cols-[3rem_1fr] py-6 border-b text-lg ${dark ? "border-ivory/15" : "border-line"}`}><span className="eyebrow text-bronze pt-1.5">0{i + 1}</span>{c}</Reveal>)}</ol>
    </div></section>
    <section className="wrap py-24 md:py-36 grid md:grid-cols-3 gap-12 md:gap-0 border-line">
      {[["Capabilities", ind.capabilities], ["Transformation Opportunities", ind.opportunities], ["Selected Outcomes", ["[Verified outcome — pending client approval]", "[Verified outcome — pending client approval]"]]].map(([h, list], i) => (
        <Reveal key={h as string} delay={i * 100} className={`${i ? "md:border-l md:pl-10" : ""} md:pr-10 border-line`}><p className="eyebrow text-grey mb-8">{h as string}</p><ul className="space-y-4">{(list as string[]).map(x => <li key={x} className={`display text-[26px] leading-tight ${x.startsWith("[") ? "text-bronze text-xl" : ""}`}>{x}</li>)}</ul></Reveal>
      ))}
    </section>
    <section className="wrap pb-24"><p className="eyebrow text-grey mb-6">Relevant Services</p><div className="border-t border-line">{ind.services.map(sl => { const s = SERVICES.find(x => x.slug === sl)!; return <Link key={sl} to={`/expertise/${sl}`} className="group flex justify-between items-baseline py-6 border-b border-line"><span className="display text-3xl md:text-4xl transition-transform duration-500 group-hover:translate-x-1.5">{s.title}</span><span className="arrow">→</span></Link>; })}</div></section>
    <FinalCTA />
  </>);
}

/* ABOUT */
export function About() {
  useSeo("About — Operator-Led Human Capital Advisory, Dubai", "Prologe is an operator-led human capital consultancy headquartered in Dubai, founded by Maha Tafech.", crumbs([["Home", "/"], ["About", "/about"]]));
  return (<>
    <PageHero eyebrow="About Prologe" lines={["We Have Sat", "on Your Side", "of the Table."]} intro="Prologe was built by operators — people who have owned headcount plans, carried attrition numbers and answered to boards." />
    <section className="wrap pb-28 grid lg:grid-cols-12 gap-12">
      <Parallax src={IMG.figure} alt="A lone figure beneath a large modern structure" className="lg:col-span-5 aspect-[4/5]" />
      <div className="lg:col-span-6 lg:col-start-7 space-y-16 self-center">
        {[["Origin", "Prologe began with a simple observation: organisations were receiving excellent recommendations and very little change. The gap was not insight — it was implementation."], ["Operational DNA", "Our practitioners have run people functions. We know what a policy looks like on a Tuesday afternoon when a manager needs an answer — and we design for that reality."], ["Global + GCC", "Regional execution across the UAE and Saudi Arabia, informed by international HR leadership and global operating standards."]].map(([h, t], i) => (
          <Reveal key={h} delay={i * 80}><Eyebrow n={`0${i + 1}`} className="text-grey mb-5">{h}</Eyebrow><p className="text-xl md:text-2xl leading-relaxed">{t}</p></Reveal>))}
      </div>
    </section>
    <ExpandImage src={IMG.stair} alt="Sculptural staircase with a single figure" caption="Operational DNA">
      <h2 className="display text-[44px] sm:text-6xl lg:text-[96px] max-w-4xl">Operators first. <span className="italic">Advisors second.</span></h2>
    </ExpandImage>
    <section className="bg-carbon text-ivory"><div className="wrap py-28 md:py-40">
      <Reveal><Eyebrow className="text-sand mb-14">Values</Eyebrow></Reveal>
      {[["Results", "Over Reports."], ["Partnership", "Over Prescription."], ["Speed", "With Quality."], ["Transparency", "Always."]].map(([a, b], i) => (
        <div key={a} className="group grid grid-cols-[3rem_1fr] md:grid-cols-[6rem_1fr] items-baseline border-t border-ivory/15 py-6 md:py-8">
          <span className="eyebrow text-sand">0{i + 1}</span>
          <Lines as="p" lines={[`${a} ${b}`]} className="text-[36px] sm:text-6xl lg:text-[88px] transition-transform duration-700 group-hover:translate-x-2" />
        </div>))}
    </div></section>
    <Founder />
    <section className="bg-ivory border-y border-line"><div className="wrap py-24 md:py-36"><SectionHead eyebrow="Methodology" lines={["The 90-Day Method."]} aside={<TextLink to="/approach">Read Our Approach</TextLink>} /><Timeline /></div></section>
    <FinalCTA />
  </>);
}

export function Approach() {
  useSeo("Approach — The 90-Day Human Capital Transformation", "Diagnose, build, implement, embed and measure. Prologe's 90-day operator-led transformation method.", crumbs([["Home", "/"], ["Approach", "/approach"]]));
  return (<>
    <PageHero eyebrow="Approach" lines={["Transformation,", "Structured for Momentum."]} intro="We work in ninety-day cycles because momentum matters more than a perfect plan." />
    <section className="wrap pb-20 lg:pb-0"><Timeline /></section>
    <Marquee dark items={["Diagnose", "Build", "Implement", "Embed", "Measure"]} />
    <section className="wrap py-28 md:py-40"><SectionHead eyebrow="A Different Model" lines={["Less Consulting Theatre.", "More Implementation."]} /><Comparison /></section>
    <Quote lines={["The measure of success is not the roadmap.", "It is what your organisation", "can do on day 91."]} />
    <section className="wrap py-28 md:py-40"><SectionHead eyebrow="Where We Operate" lines={["Built Here.", "Designed to Scale."]} /><Markets /></section>
    <FinalCTA />
  </>);
}

/* CASES */
export function CaseStudies() {
  useSeo("Case Studies — Transformation in Practice", "Anonymised Prologe engagements across technology, GCC expansion and investment portfolios.", crumbs([["Home", "/"], ["Case Studies", "/case-studies"]]));
  return (<><PageHero eyebrow="Selected Impact" lines={["Transformation", "in Practice."]} intro="Client identities are withheld. Details are anonymised and pending client approval before publication." /><section className="wrap pb-20"><CaseSwipe /><div className="hidden md:block">{CASES.map((c, i) => <CaseRow key={c.slug} c={c} i={i} />)}</div></section><FinalCTA /></>);
}

export function CasePage() {
  const { slug } = useParams(); const c = CASES.find(x => x.slug === slug);
  useSeo(c ? `${c.title.join(" ")} — Case Study` : "Case Study", c?.challenge ?? "", c && crumbs([["Home", "/"], ["Case Studies", "/case-studies"], [c.title.join(" "), `/case-studies/${c.slug}`]]));
  if (!c) return <Navigate to="/case-studies" />;
  return (<>
    <Crumbs items={[["Home", "/"], ["Case Studies", "/case-studies"], [`Case ${c.n}`, ""]]} />
    <PageHero eyebrow={`Case ${c.n} · ${c.sector} · ${c.client}`} lines={[...c.title]} />
    <section className="wrap pb-24"><Parallax src={c.img} alt={c.sector} className="aspect-[16/9]" /></section>
    <section className="wrap pb-24 grid md:grid-cols-12 gap-10">
      <div className="md:col-span-3 space-y-8">{c.metrics.map(m => <div key={m.l} className="border-t border-line pt-5"><p className="display text-4xl text-bronze">{m.v}</p><p className="eyebrow text-grey mt-2">{m.l}</p></div>)}</div>
      <div className="md:col-span-8 md:col-start-5 space-y-14">{[["Challenge", c.challenge], ["Approach", c.approach], ["Outcome", c.outcome]].map(([h, t], i) => <Reveal key={h}><Eyebrow n={`0${i + 1}`} className="text-grey mb-5">{h}</Eyebrow><p className="display text-[28px] md:text-[38px] leading-[1.2]">{t}</p></Reveal>)}</div>
    </section>
    <FinalCTA />
  </>);
}

/* INSIGHTS */
export function Insights() {
  useSeo("Insights — People Strategy for the GCC", "Perspectives on GCC market entry, HR transformation, technical talent and people due diligence.", crumbs([["Home", "/"], ["Insights", "/insights"]]));
  return (<><PageHero eyebrow="Insights" lines={["Thinking for", "What Comes Next."]} intro="Perspectives for leaders building organisations across the Gulf and beyond." />
    <section className="wrap pb-28"><InsightsGrid items={INSIGHTS.slice(0, 3)} /><div className="grid md:grid-cols-2 gap-8 mt-20">{INSIGHTS.slice(3).map(a => <Reveal key={a.slug}><InsightCard a={a} big /></Reveal>)}</div></section><FinalCTA /></>);
}

export function Article() {
  const { slug } = useParams(); const a = INSIGHTS.find(x => x.slug === slug);
  useSeo(a?.title ?? "Insight", a?.dek ?? "", a && { "@context": "https://schema.org", "@type": "Article", headline: a.title, description: a.dek, author: { "@type": "Person", name: "Maha Tafech" }, publisher: { "@type": "Organization", name: "Prologe" }, image: a.img });
  if (!a) return <Navigate to="/insights" />;
  return (<>
    <Crumbs items={[["Home", "/"], ["Insights", "/insights"], [a.cat, ""]]} />
    <article>
      <header className="wrap pt-36 md:pt-48 pb-14 max-w-5xl">
        <Reveal><p className="eyebrow text-grey flex gap-4"><span className="text-bronze">{a.cat}</span><span>{a.date}</span><span>{a.read} read</span></p></Reveal>
        <Lines as="h1" lines={[a.title]} className="text-[40px] md:text-[72px] mt-8" />
        <Reveal delay={200}><p className="text-xl text-grey mt-8 max-w-2xl leading-relaxed">{a.dek}</p></Reveal>
      </header>
      <div className="wrap pb-16"><Parallax src={a.img} alt="" className="aspect-[21/9]" /></div>
      <div className="wrap pb-28 grid md:grid-cols-12 gap-10">
        <aside className="md:col-span-3 eyebrow text-grey space-y-2"><p>By Maha Tafech</p><p>Founder, Prologe</p></aside>
        <div className="md:col-span-7 space-y-7 text-[18px] leading-[1.75]">{a.body.map((p, i) => <p key={i} className={i === 0 ? "display text-[28px] leading-[1.35]" : ""}>{p}</p>)}</div>
      </div>
    </article>
    <FinalCTA />
  </>);
}

/* CONTACT */
export function Contact({ book = false }: { book?: boolean }) {
  useSeo(book ? "Book a Discovery Call" : "Contact — Start a Conversation", "Speak with Prologe in Dubai about HR transformation, GCC market entry and human capital strategy.");
  const [sent, setSent] = useState(false); const [mode, setMode] = useState(book ? "call" : "message");
  const submit = (e: FormEvent) => { e.preventDefault(); setSent(true); };
  const F = ({ id, label, type = "text", req = true, full = false }: { id: string; label: string; type?: string; req?: boolean; full?: boolean }) => (
    <label className={`block group ${full ? "md:col-span-2" : ""}`}><span className="eyebrow text-grey group-focus-within:text-ink transition-colors">{label}{req && " *"}</span><input name={id} type={type} required={req} className="field" autoComplete={id === "name" ? "name" : id === "email" ? "email" : id === "phone" ? "tel" : "off"} /></label>);
  const S = ({ id, label, opts }: { id: string; label: string; opts: string[] }) => (
    <label className="block group"><span className="eyebrow text-grey group-focus-within:text-ink transition-colors">{label}</span><select name={id} className="field appearance-none cursor-pointer" defaultValue=""><option value="" disabled>Select</option>{opts.map(o => <option key={o}>{o}</option>)}</select></label>);
  return (<>
    <PageHero eyebrow={book ? "Book a Discovery Call" : "Contact"} lines={["Let's Talk About", "What Needs to Change."]}>
      <Reveal delay={300} className="mt-10 text-lg text-grey leading-relaxed"><p>No sales pitch.</p><p>No generic presentation.</p><p className="text-ink">Just a practical conversation about the problem and what it takes to solve it.</p></Reveal>
    </PageHero>
    <section className="wrap pb-28 md:pb-40 grid lg:grid-cols-12 gap-16">
      <aside className="lg:col-span-4 space-y-10">
        {[["Email", CONTACT.email, `mailto:${CONTACT.email}`], ["Telephone", CONTACT.phone, `tel:${CONTACT.tel}`], ["Office", CONTACT.city, ""]].map(([l, v, h]) => (
          <div key={l} className="border-t border-line pt-5"><p className="eyebrow text-grey mb-2">{l}</p>{h ? <a href={h} className="display text-[28px] ul">{v}</a> : <p className="display text-[28px]">{v}</p>}</div>))}
        <p className="text-sm text-grey">We respond to every enquiry within one business day.</p>
      </aside>
      <div className="lg:col-span-7 lg:col-start-6">
        {sent ? (
          <div className="border-t border-ink pt-12 animate-[fade_.8s_ease]" role="status">
            <svg width="56" height="56" viewBox="0 0 56 56" className="mb-10" aria-hidden><circle cx="28" cy="28" r="27" fill="none" stroke="#111" strokeWidth="1" strokeDasharray="170" strokeDashoffset="0" style={{ animation: "draw 1.2s cubic-bezier(.22,1,.36,1)" }} /><path d="M18 29l7 7 13-15" fill="none" stroke="#111" strokeWidth="1" strokeDasharray="40" style={{ animation: "draw 1s .5s cubic-bezier(.22,1,.36,1) backwards" }} /></svg>
            <style>{`@keyframes draw{from{stroke-dashoffset:170}}`}</style>
            <h2 className="display text-5xl md:text-6xl">Thank you.</h2>
            <p className="text-lg text-grey mt-6 max-w-md leading-relaxed">{mode === "call" ? "We will be in touch within one business day to confirm a time for your discovery call." : "We have received your message and will respond within one business day."}</p>
            <button onClick={() => setSent(false)} className="eyebrow mt-10 ul">Send another enquiry</button>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-12">
            <div role="radiogroup" aria-label="Enquiry type" className="grid grid-cols-2 border border-line">
              {[["message", "Start the Conversation"], ["call", "Book a Discovery Call"]].map(([v, l]) => <button type="button" role="radio" aria-checked={mode === v} key={v} onClick={() => setMode(v)} className={`eyebrow min-h-[52px] transition-colors duration-500 ${mode === v ? "bg-ink text-ivory" : "hover:bg-ivory"}`}>{l}</button>)}
            </div>
            <div className="grid md:grid-cols-2 gap-x-10 gap-y-10">
              <F id="name" label="Name" /><F id="company" label="Company" /><F id="role" label="Role" /><F id="email" label="Email" type="email" /><F id="phone" label="Phone" type="tel" req={false} />
              <S id="size" label="Company Size" opts={["1–50", "51–200", "201–1,000", "1,000+"]} />
              <S id="market" label="Market / Country" opts={["UAE", "Saudi Arabia", "Kuwait", "Oman", "Qatar / Bahrain", "International"]} />
              <S id="contact" label="Preferred Contact" opts={["Email", "Phone", "WhatsApp", "Video call"]} />
              <label className="block group md:col-span-2"><span className="eyebrow text-grey group-focus-within:text-ink transition-colors">What are you trying to solve? *</span><textarea required rows={4} className="field resize-none" /></label>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-4">
              <p className="text-xs text-grey max-w-xs">Your information is handled in confidence. See our <Link to="/privacy" className="underline">privacy policy</Link>.</p>
              <Btn type="submit">{mode === "call" ? "Book a Discovery Call" : "Start the Conversation"}</Btn>
            </div>
          </form>
        )}
      </div>
    </section>
  </>);
}

export function Legal({ kind }: { kind: "privacy" | "terms" }) {
  const t = kind === "privacy" ? "Privacy Policy" : "Terms of Use";
  useSeo(t, `${t} for prologe.ae`);
  const body = kind === "privacy"
    ? [["Information we collect", "Details you submit through our contact forms — such as name, company, role, email and phone — and basic, anonymised analytics about site usage."], ["How we use it", "Solely to respond to your enquiry and to improve this website. We do not sell personal data."], ["Retention", "Enquiry data is retained only as long as necessary for the purpose it was collected."], ["Your rights", `You may request access, correction or deletion of your data at any time by writing to ${CONTACT.email}.`]]
    : [["Use of this site", "Content on prologe.ae is provided for general information and does not constitute professional advice."], ["Intellectual property", "All content, design and frameworks are the property of Prologe unless otherwise stated."], ["Liability", "Prologe accepts no liability for decisions made on the basis of website content alone."], ["Governing law", "These terms are governed by the laws of the United Arab Emirates."]];
  return (<><PageHero eyebrow="Legal" lines={[t]} intro="[Final legal text to be reviewed by counsel before publication.]" />
    <section className="wrap pb-32 grid md:grid-cols-12"><div className="md:col-span-8 md:col-start-5 border-t border-line">{body.map(([h, p], i) => <div key={h} className="py-8 border-b border-line grid md:grid-cols-[3rem_1fr] gap-4"><span className="eyebrow text-bronze">0{i + 1}</span><div><h2 className="display text-3xl mb-3">{h}</h2><p className="text-grey leading-relaxed">{p}</p></div></div>)}</div></section></>);
}

export function NotFound() {
  useSeo("Page not found", "");
  return <PageHero eyebrow="404" lines={["This Page", "Has Moved On."]} intro="The page you are looking for does not exist."><div className="mt-10"><Btn to="/">Return Home</Btn></div></PageHero>;
}

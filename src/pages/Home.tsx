import { useEffect, useState } from "react";
import { CASES, CONTACT, IMG, INSIGHTS } from "../data";
import { DriftStrip, ExpandImage, HorizontalGallery, Marquee, ScrollText } from "../motion";
import { FinalCTA } from "../layout";
import { CaseRow, CaseSwipe, Comparison, Founder, IndustryList, Markets, Quote, SectionHead, ServiceIndex, Timeline } from "../sections";
import { Btn, Counter, Eyebrow, NetworkViz, Reveal, useSeo } from "../ui";

const orgSchema = {
  "@context": "https://schema.org", "@type": ["Organization", "ProfessionalService"], name: "Prologe", url: "https://www.prologe.ae",
  email: CONTACT.email, telephone: CONTACT.phone, description: "Human capital advisory and HR transformation consultancy for the UAE, Saudi Arabia and the GCC.",
  address: { "@type": "PostalAddress", addressLocality: "Dubai", addressCountry: "AE" }, areaServed: ["AE", "SA", "KW", "OM"],
  founder: { "@type": "Person", name: "Maha Tafech", jobTitle: "Founder & Principal Consultant" },
};

function Hero() {
  const [on, setOn] = useState(false);
  useEffect(() => { const t = requestAnimationFrame(() => setOn(true)); return () => cancelAnimationFrame(t); }, []);
  const d = (ms: number) => ({ transitionDelay: `${ms}ms` });
  return (
    <section className={`wrap pt-32 md:pt-40 ${on ? "in" : ""}`}>
      <div className="grid lg:grid-cols-12 gap-10 lg:gap-8 items-center min-h-[calc(100svh-15rem)]">
        <div className="lg:col-span-7">
          <p className={`rv ${on ? "in" : ""} eyebrow text-grey flex items-center gap-3 mb-10`} style={d(0)}><span className="w-2 h-2 bg-bronze" />Human Capital / GCC / Global</p>
          <h1 className="display text-[50px] sm:text-7xl xl:text-[104px] leading-[.98]">
            <span className="line-mask"><span style={d(150)}>Operational Leaders.</span></span>
            <span className="line-mask"><span className="italic text-ink/85" style={d(280)}>Transformation Partners.</span></span>
          </h1>
          <p className={`rv ${on ? "in" : ""} mt-10 max-w-[520px] text-[17px] md:text-lg leading-relaxed text-ink/75`} style={d(550)}>We build human capital systems that perform in the real world — combining senior operational experience, GCC expertise and measurable execution.</p>
          <div className={`rv ${on ? "in" : ""} mt-10 flex flex-col sm:flex-row gap-3`} style={d(700)}>
            <Btn to="/contact">Start a Conversation</Btn>
            <Btn to="/expertise" ghost>Explore Our Expertise</Btn>
          </div>
        </div>
        <div className="lg:col-span-5">
          <div className={`img-mask ${on ? "in" : ""} border border-line bg-ivory p-3 md:p-5`} style={d(500)}>
            <NetworkViz className="w-full h-auto" />
          </div>
        </div>
      </div>
      <div className={`rule h-px bg-ink/80 mt-16 md:mt-20 ${on ? "in" : ""}`} style={d(900)} />
      <div className="grid grid-cols-2 md:grid-cols-4">
        {[["50+", "Transformation Sprints"], ["15+", "Countries"], ["500+", "Senior Professionals"], ["90", "Day Transformation Focus"]].map(([v, l], i) => (
          <Reveal key={l} delay={i * 80} className={`py-8 md:py-10 ${i % 2 ? "pl-5 border-l" : ""} ${i === 2 ? "md:pl-5 md:border-l" : ""} ${i > 1 ? "border-t md:border-t-0" : ""} border-line`}>
            <Counter value={v} className="display text-[44px] md:text-[56px] leading-none" />
            <p className="eyebrow text-grey mt-3">{l}<sup className="text-bronze ml-1">*</sup></p>
          </Reveal>
        ))}
      </div>
      <p className="text-[11px] text-grey pb-6">* Indicative figures — pending client verification before publication.</p>
    </section>
  );
}

export default function Home() {
  useSeo("Prologe — HR Consulting & Human Capital Advisory | Dubai, UAE & GCC", "Operator-led human capital advisory in Dubai. HR transformation, GCC market entry, technical talent and portfolio people strategy for the UAE, Saudi Arabia and the GCC.", orgSchema);
  return (
    <>
      <Hero />
      <Marquee items={["Technical Talent", "GCC Market Entry", "Portfolio Transformation", "Rapid Stabilization", "HR Transformation", "Organisation Design"]} />

      {/* 08 Statement */}
      <section className="wrap py-28 md:py-48">
        <div className="grid md:grid-cols-12 gap-10">
          <Reveal className="md:col-span-3"><Eyebrow className="text-grey">The Prologe Difference</Eyebrow></Reveal>
          <div className="md:col-span-9">
            <ScrollText text="Most consultants tell you what should change. We help you change it." className="text-[38px] sm:text-5xl lg:text-[72px] leading-[1.05]" />
            <div className="grid md:grid-cols-2 gap-8 mt-14 md:mt-20 pt-8 border-t border-line">
              <Reveal className="text-[17px] leading-relaxed">Prologe combines strategic human capital expertise with senior operational experience to design, implement and embed solutions alongside your team.</Reveal>
              <Reveal delay={120} className="text-[17px] leading-relaxed text-grey">Strategy is only valuable when it works in the real world. That is where we spend our time.</Reveal>
            </div>
          </div>
        </div>
      </section>

      <ExpandImage src={IMG.dubai} alt="Contemporary Dubai architecture at golden hour" caption="Dubai — 25.20° N">
        <p className="eyebrow text-sand mb-6">Headquartered in Dubai</p>
        <h2 className="display text-[44px] sm:text-6xl lg:text-[96px] max-w-5xl">Strategy is only valuable <span className="italic">when it works in the real world.</span></h2>
      </ExpandImage>

      {/* 09 Expertise */}
      <div className="h-24 md:h-40" />
      <section className="wrap pb-28 md:pb-44" id="expertise">
        <SectionHead eyebrow="What We Solve" n="01" lines={["Strategic Solutions for", "Critical Business Moments."]} aside="Five engagements built around the moments that define an organisation's trajectory." />
        <ServiceIndex />
      </section>

      {/* 10 Results */}
      <section className="bg-carbon text-ivory">
        <div className="wrap py-28 md:py-44">
          <SectionHead dark eyebrow="Outcomes, Not Presentations." n="02" lines={["Built Around", "Measurable Change."]} aside="We measure engagements against a baseline agreed at the outset — so progress is visible to leadership and boards." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-ivory/15">
            {[["37%", "Average Retention Increase"], ["50%", "Faster Time-to-Hire"], ["3×", "Average ROI in Year One"], ["90", "Days to Transformation"]].map(([v, l], i) => (
              <Reveal key={l} delay={i * 100} className={`py-10 lg:py-14 border-b lg:border-b-0 border-ivory/15 ${i ? "lg:border-l lg:pl-8" : ""} ${i % 2 ? "sm:border-l sm:pl-8" : ""}`}>
                <Counter value={v} className="display text-[80px] md:text-[104px] leading-none" />
                <p className="eyebrow text-ivory/55 mt-6">{l}</p>
              </Reveal>
            ))}
          </div>
          <p className="text-[11px] text-ivory/40 mt-8">Figures shown are illustrative placeholders and will be replaced with client-verified outcomes prior to launch.</p>
        </div>
      </section>

      {/* 11 Why */}
      <section className="wrap py-28 md:py-44">
        <SectionHead eyebrow="Why Prologe" n="03" lines={["Not Advisors", "on the Sidelines."]} aside={<span className="display text-[28px] md:text-[34px] text-ink italic leading-tight">Operators inside the transformation.</span>} />
        <div className="grid md:grid-cols-2 border-t border-l border-line">
          {[["Operational DNA", "Senior practitioners who have carried business responsibility themselves."], ["Technical + Human", "Systems thinking combined with deep understanding of people and organizations."], ["GCC + Global", "Regional execution informed by international standards."], ["Speed Through Experience", "Proven frameworks remove unnecessary consulting delay."]].map(([t, d], i) => (
            <Reveal key={t} delay={i * 80} className="group border-r border-b border-line p-8 md:p-14 min-h-[300px] md:min-h-[380px] flex flex-col justify-between transition-colors duration-700 hover:bg-carbon hover:text-ivory">
              <span className="display text-[72px] md:text-[96px] leading-none text-ink/15 group-hover:text-ivory/25 transition-colors duration-700">0{i + 1}</span>
              <div><h3 className="eyebrow mb-4">{t}</h3><p className="text-[17px] leading-relaxed max-w-sm text-grey group-hover:text-ivory/70 transition-colors duration-700">{d}</p></div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 12 Comparison */}
      <section className="wrap pb-28 md:pb-44">
        <SectionHead eyebrow="A Different Model" n="04" lines={["Less Consulting Theatre.", "More Implementation."]} />
        <Comparison />
      </section>

      {/* 13 Method */}
      <section className="bg-ivory border-y border-line" id="method">
        <div className="wrap pt-28 md:pt-44 pb-20 lg:pb-0">
          <SectionHead eyebrow="How We Work" n="05" lines={["Transformation,", "Structured for Momentum."]} aside="Ninety days: long enough to change structure, short enough to keep leadership attention." />
          <Timeline />
        </div>
      </section>

      {/* 14 Markets */}
      <section className="wrap py-28 md:py-44" id="markets">
        <SectionHead eyebrow="GCC Market Expertise" n="06" lines={["Built Here.", "Designed to Scale."]} aside="Headquartered in Dubai. Regional depth across the Gulf, applied with the rigour of international best practice." />
        <Markets />
      </section>

      {/* 15 Industries */}
      <section className="wrap pb-28 md:pb-44">
        <SectionHead eyebrow="Sector Experience" n="07" lines={["Cross-Industry Experience.", "Operator-Level Understanding."]} />
        <IndustryList />
      </section>

      {/* 16 Cases */}
      <section className="wrap pb-20 md:pb-32">
        <SectionHead eyebrow="Selected Impact" n="08" lines={["Transformation", "in Practice."]} aside="Client identities are withheld. Engagement details are anonymised and pending client approval." />
        <CaseSwipe />
        <div className="hidden md:block">{CASES.map((c, i) => <CaseRow key={c.slug} c={c} i={i} />)}</div>
      </section>

      <DriftStrip images={[IMG.board, IMG.stair, IMG.riyadh, IMG.desk, IMG.glass]} />
      <Founder />

      <Quote lines={["The best HR systems disappear", "into the business.", "They simply make better work possible."]} />

      {/* 19 Testimonials */}
      <section className="wrap py-28 md:py-44">
        <SectionHead eyebrow="From the People We've Worked With" n="09" lines={["Credibility Is Earned", "in the Work."]} />
        <div className="grid lg:grid-cols-12 gap-12">
          <Reveal className="lg:col-span-8">
            <p className="display text-[30px] md:text-[46px] leading-[1.15] text-ink/90">[Featured testimonial — verified client quotation to be supplied. Ideally a CEO or investor describing a specific, measurable change delivered by Prologe.]</p>
            <div className="mt-10 pt-6 border-t border-line flex flex-wrap gap-x-10 gap-y-2 eyebrow"><span>[Name]</span><span className="text-grey">[Title]</span><span className="text-grey">[Company or anonymised descriptor]</span></div>
          </Reveal>
          <div className="lg:col-span-4 space-y-12 lg:border-l border-line lg:pl-10">
            {[1, 2].map(i => (
              <Reveal key={i} delay={i * 100}>
                <p className="text-[17px] leading-relaxed">[Supporting testimonial {i} — verified quotation pending client approval.]</p>
                <p className="eyebrow text-grey mt-5">[Name] · [Title] · [Company]</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 20 Insights */}
      <HorizontalGallery heading={<div><p className="eyebrow text-sand mb-6">Insights</p><h2 className="display text-[40px] md:text-[64px] leading-none">Thinking for <span className="italic">What Comes Next.</span></h2></div>}
        items={INSIGHTS.map(a => ({ img: a.img, title: a.title, kicker: `${a.cat} · ${a.read}`, to: `/insights/${a.slug}`, text: a.dek }))} />

      <FinalCTA />
    </>
  );
}

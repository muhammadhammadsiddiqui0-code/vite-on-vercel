import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";

function useScrollProgress<T extends HTMLElement>(mode: "through" | "pin" = "through") {
  const ref = useRef<T>(null); const [p, setP] = useState(0);
  useEffect(() => {
    let raf = 0;
    const on = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(() => {
      const el = ref.current; if (!el) return; const r = el.getBoundingClientRect();
      const v = mode === "pin" ? -r.top / (el.offsetHeight - innerHeight) : (innerHeight - r.top) / (innerHeight + r.height);
      setP(Math.max(0, Math.min(1, v)));
    }); };
    on(); addEventListener("scroll", on, { passive: true }); addEventListener("resize", on);
    return () => { removeEventListener("scroll", on); removeEventListener("resize", on); };
  }, [mode]);
  return [ref, p] as const;
}

/* Full-bleed image that opens from an inset frame to edge-to-edge as you scroll */
export function ExpandImage({ src, alt, caption, children }: { src: string; alt: string; caption?: string; children?: ReactNode }) {
  const [ref, p] = useScrollProgress<HTMLDivElement>("pin");
  const e = 1 - Math.pow(1 - Math.min(1, p * 1.6), 3);
  const inset = (1 - e) * 12; // vw
  return (
    <section ref={ref} className="relative" style={{ height: "200vh" }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="absolute inset-0" style={{ clipPath: `inset(${inset * .9}vh ${inset}vw)` }}>
          <img src={src} alt={alt} className="w-full h-full object-cover will-change-transform" style={{ transform: `scale(${1.25 - e * .25})` }} />
          <div className="absolute inset-0 bg-carbon" style={{ opacity: .15 + e * .3 }} />
        </div>
        <div className="relative h-full wrap flex flex-col justify-end pb-12 md:pb-20 text-ivory" style={{ opacity: Math.max(0, (p - .25) * 2.5), transform: `translateY(${Math.max(0, 1 - (p - .25) * 2.5) * 30}px)` }}>
          {children}
        </div>
        {caption && <p className="absolute top-24 right-[clamp(20px,4vw,64px)] eyebrow text-ivory/80">{caption}</p>}
      </div>
    </section>
  );
}

/* Slow editorial ticker */
export function Marquee({ items, dark = false }: { items: string[]; dark?: boolean }) {
  const row = [...items, ...items];
  return (
    <div className={`overflow-hidden border-y py-6 md:py-8 ${dark ? "border-ivory/10 bg-carbon text-ivory" : "border-line"}`} aria-hidden>
      <div className="flex w-max animate-[marquee_60s_linear_infinite] hover:[animation-play-state:paused]">
        {row.map((t, i) => <span key={i} className="display text-[34px] md:text-[56px] px-8 md:px-12 flex items-center gap-8 md:gap-12 whitespace-nowrap">{t}<span className="w-2 h-2 bg-bronze inline-block" /></span>)}
      </div>
      <style>{`@keyframes marquee{to{transform:translateX(-50%)}}`}</style>
    </div>
  );
}

/* Pinned horizontal scroll gallery (desktop), swipe on mobile */
export function HorizontalGallery({ items, heading }: { items: { img: string; title: string; kicker: string; to: string; text?: string }[]; heading: ReactNode }) {
  const [ref, p] = useScrollProgress<HTMLDivElement>("pin");
  const track = useRef<HTMLDivElement>(null); const [dist, setDist] = useState(0);
  useEffect(() => { const m = () => track.current && setDist(Math.max(0, track.current.scrollWidth - innerWidth)); m(); addEventListener("resize", m); return () => removeEventListener("resize", m); }, []);
  return (
    <>
      <section ref={ref} className="hidden md:block relative bg-carbon text-ivory" style={{ height: `${100 + items.length * 45}vh` }}>
        <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center">
          <div className="wrap mb-10 flex justify-between items-end">{heading}<p className="eyebrow text-ivory/50 tabular-nums">{String(Math.min(items.length, Math.floor(p * items.length) + 1)).padStart(2, "0")} / {String(items.length).padStart(2, "0")}</p></div>
          <div ref={track} className="flex gap-8 pl-[clamp(20px,4vw,64px)] pr-[10vw] will-change-transform" style={{ transform: `translate3d(${-p * dist}px,0,0)` }}>
            {items.map((it, i) => (
              <Link key={i} to={it.to} className="group shrink-0 w-[42vw] lg:w-[34vw]">
                <div className="overflow-hidden aspect-[4/3]"><img src={it.img} alt="" loading="lazy" className="w-full h-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.04]" style={{ transform: `translateX(${(p * items.length - i) * -18}px) scale(1.1)` }} /></div>
                <p className="eyebrow text-sand mt-6">{it.kicker}</p>
                <h3 className="display text-[34px] lg:text-[42px] mt-3 leading-[1.05] transition-transform duration-500 group-hover:translate-x-1.5">{it.title}</h3>
                {it.text && <p className="text-ivory/55 mt-3 text-[15px] max-w-md">{it.text}</p>}
              </Link>
            ))}
          </div>
          <div className="wrap mt-12"><div className="h-px bg-ivory/15 relative"><div className="absolute inset-y-0 left-0 bg-ivory" style={{ width: `${p * 100}%` }} /></div></div>
        </div>
      </section>
      <section className="md:hidden bg-carbon text-ivory py-20">
        <div className="wrap mb-10">{heading}</div>
        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory no-scrollbar px-5">
          {items.map((it, i) => <Link key={i} to={it.to} className="snap-start shrink-0 w-[80%]"><img src={it.img} alt="" loading="lazy" className="aspect-[4/5] w-full object-cover" /><p className="eyebrow text-sand mt-5">{it.kicker}</p><h3 className="display text-[28px] mt-2 leading-[1.05]">{it.title}</h3></Link>)}
        </div>
      </section>
    </>
  );
}

/* Words that brighten as you scroll through */
export function ScrollText({ text, className = "" }: { text: string; className?: string }) {
  const [ref, p] = useScrollProgress<HTMLParagraphElement>();
  const words = text.split(" "); const k = Math.max(0, Math.min(1, (p - .2) / .45));
  return <p ref={ref} className={`display ${className}`}>{words.map((w, i) => <span key={i} className="transition-opacity duration-300" style={{ opacity: i / words.length < k ? 1 : .15 }}>{w} </span>)}</p>;
}

/* Hero image band that drifts laterally */
export function DriftStrip({ images }: { images: string[] }) {
  const [ref, p] = useScrollProgress<HTMLDivElement>();
  return (
    <div ref={ref} className="overflow-hidden py-4">
      <div className="flex gap-4 w-max will-change-transform" style={{ transform: `translate3d(${-p * 30}vw,0,0)` }}>
        {[...images, ...images].map((s, i) => <div key={i} className={`shrink-0 overflow-hidden ${i % 2 ? "w-[60vw] md:w-[28vw] aspect-[4/5]" : "w-[75vw] md:w-[38vw] aspect-[4/3] self-end"}`}><img src={s} alt="" loading="lazy" className="w-full h-full object-cover grayscale-[.35] sepia-[.08]" /></div>)}
      </div>
    </div>
  );
}

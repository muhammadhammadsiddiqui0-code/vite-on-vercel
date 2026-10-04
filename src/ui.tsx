import { useEffect, useRef, useState, type ReactNode, type ElementType } from "react";
import { Link } from "react-router-dom";

export function useInView<T extends Element>(threshold = 0.15) {
  const ref = useRef<T>(null);
  const [inView, set] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { set(true); io.disconnect(); } }, { threshold, rootMargin: "0px 0px -8% 0px" });
    io.observe(el); return () => io.disconnect();
  }, [threshold]);
  return [ref, inView] as const;
}

export function Reveal({ children, className = "", delay = 0, as: Tag = "div" }: { children: ReactNode; className?: string; delay?: number; as?: ElementType }) {
  const [ref, v] = useInView<HTMLDivElement>();
  return <Tag ref={ref} className={`rv ${v ? "in" : ""} ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</Tag>;
}

export function Lines({ lines, className = "", as: Tag = "h2", delay = 0, italicLast = false }: { lines: string[]; className?: string; as?: ElementType; delay?: number; italicLast?: boolean }) {
  const [ref, v] = useInView<HTMLHeadingElement>();
  return (
    <Tag ref={ref} className={`display ${v ? "in" : ""} ${className}`}>
      {lines.map((l, i) => (
        <span key={i} className="line-mask"><span className={italicLast && i === lines.length - 1 ? "italic" : ""} style={{ transitionDelay: `${delay + i * 110}ms` }}>{l}</span></span>
      ))}
    </Tag>
  );
}

export function Eyebrow({ children, className = "", n }: { children: ReactNode; className?: string; n?: string }) {
  return <p className={`eyebrow flex items-center gap-3 ${className}`}>{n && <span className="text-bronze">{n}</span>}{n && <span className="h-px w-6 bg-current opacity-30" />}{children}</p>;
}

export function Rule({ className = "" }: { className?: string }) {
  const [ref, v] = useInView<HTMLDivElement>();
  return <div ref={ref} className={`rule h-px bg-line ${v ? "in" : ""} ${className}`} />;
}

export function Btn({ to, href, children, dark = false, ghost = false, className = "", onClick, type }: { to?: string; href?: string; children: string; dark?: boolean; ghost?: boolean; className?: string; onClick?: () => void; type?: "submit" }) {
  const base = `group inline-flex items-center justify-between gap-6 min-h-[48px] px-6 eyebrow transition-colors duration-500 ${className} `;
  const style = ghost
    ? (dark ? "border border-ivory/25 text-ivory hover:border-ivory" : "border border-line text-ink hover:border-ink")
    : (dark ? "bg-ivory text-ink hover:bg-sand" : "bg-ink text-ivory hover:bg-carbon/85");
  const inner = (<><span className="slide"><span><span>{children}</span><span aria-hidden>{children}</span></span></span><span className="arrow" aria-hidden>→</span></>);
  if (to) return <Link to={to} className={base + style}>{inner}</Link>;
  if (href) return <a href={href} className={base + style}>{inner}</a>;
  return <button type={type} onClick={onClick} className={base + style}>{inner}</button>;
}

export function TextLink({ to, children, className = "" }: { to: string; children: string; className?: string }) {
  return <Link to={to} className={`group inline-flex items-center gap-3 eyebrow ${className}`}><span className="ul">{children}</span><span className="arrow">→</span></Link>;
}

export function Counter({ value, className = "" }: { value: string; className?: string }) {
  const [ref, v] = useInView<HTMLSpanElement>(0.4);
  const m = value.match(/^(\D*)(\d+)(.*)$/);
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!v || !m) return;
    const target = +m[2]; const t0 = performance.now(); let raf = 0;
    const tick = (t: number) => { const p = Math.min(1, (t - t0) / 1600); setN(Math.round(target * (1 - Math.pow(1 - p, 4)))); if (p < 1) raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick); return () => cancelAnimationFrame(raf);
  }, [v]);
  if (!m) return <span ref={ref} className={className}>{value}</span>;
  return <span ref={ref} className={`tabular-nums ${className}`}>{m[1]}{n}{m[3]}</span>;
}

export function Parallax({ src, alt, className = "", amount = 40, imgClass = "" }: { src: string; alt: string; className?: string; amount?: number; imgClass?: string }) {
  const wrap = useRef<HTMLDivElement>(null); const img = useRef<HTMLImageElement>(null);
  const [ref, v] = useInView<HTMLDivElement>(0.1);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const on = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(() => {
      const el = wrap.current; if (!el || !img.current) return;
      const r = el.getBoundingClientRect(); const p = (r.top + r.height / 2 - innerHeight / 2) / innerHeight;
      img.current.style.transform = `translate3d(0,${(-p * amount).toFixed(1)}px,0) scale(1.12)`;
    }); };
    on(); addEventListener("scroll", on, { passive: true }); return () => removeEventListener("scroll", on);
  }, [amount]);
  return (
    <div ref={wrap} className={`overflow-hidden relative ${className}`}>
      <div ref={ref} className={`img-mask h-full w-full ${v ? "in" : ""}`}>
        <img ref={img} src={src} alt={alt} loading="lazy" decoding="async" className={`h-full w-full object-cover grayscale-[.35] sepia-[.08] will-change-transform ${imgClass}`} style={{ transform: "scale(1.12)" }} />
      </div>
    </div>
  );
}

export function Placeholder({ children }: { children: ReactNode }) {
  return <span className="text-bronze" title="Pending client verification">{children}</span>;
}

/* SEO helper */
export function useSeo(title: string, description: string, schema?: object) {
  useEffect(() => {
    document.title = title.includes("Prologe") ? title : `${title} | Prologe — Human Capital Advisory, UAE & GCC`;
    let m = document.querySelector('meta[name="description"]'); if (!m) { m = document.createElement("meta"); m.setAttribute("name", "description"); document.head.appendChild(m); }
    m.setAttribute("content", description);
    const id = "page-schema"; document.getElementById(id)?.remove();
    if (schema) { const s = document.createElement("script"); s.type = "application/ld+json"; s.id = id; s.text = JSON.stringify(schema); document.head.appendChild(s); }
  }, [title, description]);
}

export const crumbs = (items: [string, string][]) => ({ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: items.map(([name, path], i) => ({ "@type": "ListItem", position: i + 1, name, item: `https://www.prologe.ae${path}` })) });

/* Network visualisation — structure + people */
export function NetworkViz({ className = "" }: { className?: string }) {
  const svg = useRef<SVGSVGElement>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [on, setOn] = useState(false);
  useEffect(() => { const t = setTimeout(() => setOn(true), 500); return () => clearTimeout(t); }, []);
  const cols = 8, rows = 6, W = 560, H = 440;
  const nodes = Array.from({ length: cols * rows }, (_, i) => {
    const c = i % cols, r = Math.floor(i / cols);
    const seed = Math.sin(i * 12.9898) * 43758.5453; const f = seed - Math.floor(seed);
    return { i, x: 40 + c * ((W - 80) / (cols - 1)), y: 40 + r * ((H - 80) / (rows - 1)), key: f > 0.72, lvl: r };
  });
  const hubs = [11, 20, 27, 36, 13];
  const links: [number, number][] = [];
  hubs.forEach((h, k) => { nodes.forEach(n => { const d = Math.hypot(n.x - nodes[h].x, n.y - nodes[h].y); if (d < 150 && d > 0 && (n.i + k) % 2 === 0) links.push([h, n.i]); }); });
  links.push([11, 20], [20, 27], [27, 36], [13, 20], [13, 27]);
  const move = (e: React.MouseEvent) => { const r = svg.current!.getBoundingClientRect(); setMouse({ x: ((e.clientX - r.left) / r.width) * W, y: ((e.clientY - r.top) / r.height) * H }); };
  const off = (n: { x: number; y: number }) => { const dx = n.x - mouse.x, dy = n.y - mouse.y; const d = Math.hypot(dx, dy); if (!mouse.x || d > 110) return [0, 0]; const k = (1 - d / 110) * 7; return [(-dx / d) * k || 0, (-dy / d) * k || 0]; };
  return (
    <svg ref={svg} viewBox={`0 0 ${W} ${H}`} className={className} onMouseMove={move} onMouseLeave={() => setMouse({ x: 0, y: 0 })} role="img" aria-label="Abstract organisational network: people connected through structured systems">
      {Array.from({ length: cols }).map((_, c) => <line key={"v" + c} x1={40 + c * ((W - 80) / (cols - 1))} x2={40 + c * ((W - 80) / (cols - 1))} y1={0} y2={H} stroke="#D8D4CD" strokeWidth=".6" />)}
      {Array.from({ length: rows }).map((_, r) => <line key={"h" + r} y1={40 + r * ((H - 80) / (rows - 1))} y2={40 + r * ((H - 80) / (rows - 1))} x1={0} x2={W} stroke="#D8D4CD" strokeWidth=".6" />)}
      {links.map(([a, b], i) => { const A = nodes[a], B = nodes[b]; const [ax, ay] = off(A), [bx, by] = off(B); return <line key={i} x1={A.x + ax} y1={A.y + ay} x2={B.x + bx} y2={B.y + by} stroke="#111" strokeWidth=".7" strokeOpacity={on ? .55 : 0} style={{ transition: `stroke-opacity 1.2s ${400 + i * 18}ms` }} />; })}
      {nodes.map(n => { const [dx, dy] = off(n); const hub = hubs.includes(n.i); return (
        <g key={n.i} style={{ transform: `translate(${dx}px,${dy}px)`, transition: "transform .6s cubic-bezier(.22,1,.36,1)" }}>
          {hub && <circle cx={n.x} cy={n.y} r={on ? 14 : 0} fill="none" stroke="#9A8771" strokeWidth=".7" style={{ transition: "r 1.2s cubic-bezier(.22,1,.36,1) .9s" }} />}
          <circle cx={n.x} cy={n.y} r={hub ? 4 : n.key ? 2.6 : 1.6} fill={hub ? "#111" : n.key ? "#9A8771" : "#77736D"} opacity={on ? 1 : 0} style={{ transition: `opacity .8s ${n.i * 12}ms` }} />
        </g>); })}
      <text x={W - 40} y={22} textAnchor="end" fontSize="9" letterSpacing="1.5" fill="#77736D" fontFamily="Inter">FIG. 01 — ORGANISATION AS SYSTEM</text>
      <text x={40} y={H - 10} fontSize="9" letterSpacing="1.5" fill="#77736D" fontFamily="Inter">N=48 · 5 HUBS · STRUCTURE + PEOPLE</text>
    </svg>
  );
}

export function PageHero({ eyebrow, lines, intro, children }: { eyebrow: string; lines: string[]; intro?: string; children?: ReactNode }) {
  return (
    <section className="wrap pt-36 md:pt-48 pb-16 md:pb-24">
      <Reveal><Eyebrow className="text-grey mb-8">{eyebrow}</Eyebrow></Reveal>
      <div className="grid md:grid-cols-12 gap-10 items-end">
        <Lines as="h1" lines={lines} italicLast className="md:col-span-8 text-[44px] sm:text-6xl lg:text-[88px]" />
        {intro && <Reveal delay={300} className="md:col-span-4 text-grey text-[17px] leading-relaxed">{intro}</Reveal>}
      </div>
      {children}
      <Rule className="mt-16 md:mt-24" />
    </section>
  );
}

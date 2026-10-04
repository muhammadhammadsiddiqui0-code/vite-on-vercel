const px = (id: number, w = 2400) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&fit=max&w=${w}`;

export const IMG = {
  hall: px(15663488), facade: px(34887500), corner: px(12109061), figure: px(36027823),
  brutal: px(32466579), wall: px(2191622), shadow: px(36969840), glass: px(31592973),
  balcony: px(37185884), curve: px(5832788),
  dubai: "./images/dubai-architecture.jpg", riyadh: "./images/riyadh-city.jpg", exec: "./images/executive-portrait.jpg",
  board: "./images/boardroom.jpg", stair: "./images/staircase.jpg", desk: "./images/workspace.jpg",
};

export const CONTACT = { email: "connect@prologe.ae", phone: "+971 56 9710315", tel: "+971569710315", city: "Dubai, United Arab Emirates" };

export type Service = {
  slug: string; n: string; title: string; short: string; lines: [string, string]; summary: string; img: string;
  challenge: string[]; changes: { from: string; to: string }[]; method: { t: string; d: string }[];
  deliverables: string[]; outcomes: { v: string; l: string }[]; experience: string; caseSlug: string;
  faq: { q: string; a: string }[];
};

export const SERVICES: Service[] = [
  {
    slug: "technical-talent-pipeline", n: "01", title: "Technical Talent Pipeline Architecture", short: "Technical Talent",
    lines: ["Technical Talent", "Pipeline Architecture"], img: IMG.glass,
    summary: "Build scalable recruiting capability designed to attract and retain high-calibre technical talent.",
    challenge: ["Engineering hiring depends on a handful of individuals and agencies.", "Time-to-hire slows product roadmaps and investor milestones.", "Offers are lost to better-organised competitors.", "Early attrition erodes the value of every hire made."],
    changes: [{ from: "Reactive requisitions", to: "Workforce plan tied to roadmap" }, { from: "Agency dependency", to: "In-house sourcing engine" }, { from: "Inconsistent interviews", to: "Calibrated, structured assessment" }, { from: "Hire and hope", to: "Onboarding designed for retention" }],
    method: [{ t: "Diagnose", d: "Map funnel data, hiring manager behaviour and market position." }, { t: "Design", d: "Define role architecture, assessment standards and employer proposition." }, { t: "Build", d: "Stand up sourcing, ATS workflows and interview operations." }, { t: "Embed", d: "Train hiring managers and hand over a measurable operating rhythm." }],
    deliverables: ["Technical role & levelling framework", "Structured interview and scorecard system", "Sourcing playbook and talent maps", "Recruitment analytics dashboard", "Onboarding and 90-day retention plan"],
    outcomes: [{ v: "[Verify]", l: "Reduction in time-to-hire" }, { v: "[Verify]", l: "Offer acceptance rate" }, { v: "[Verify]", l: "First-year retention" }],
    experience: "Senior experience across technology environments, building recruiting functions from first hire to scaled engineering organisations.",
    caseSlug: "technical-talent-engine",
    faq: [{ q: "Do you recruit on our behalf?", a: "We build and, where required, temporarily operate your recruiting capability. The objective is a system your team owns — not a permanent dependency." }, { q: "How quickly can we see change?", a: "Diagnostic findings within the first weeks; structural improvements typically land within the 90-day programme." }, { q: "Which roles does this cover?", a: "Engineering, product, data and specialist technical roles, from individual contributors to technical leadership." }],
  },
  {
    slug: "gcc-market-entry", n: "02", title: "GCC Rapid Market Entry", short: "GCC Market Entry",
    lines: ["GCC Rapid", "Market Entry"], img: IMG.dubai,
    summary: "Build compliant teams and operating structures for companies entering UAE, Saudi Arabia and the wider GCC.",
    challenge: ["Labour law, visas and nationalisation requirements differ by market.", "Headquarters policies rarely translate directly to the region.", "First regional hires set the culture — and the risk profile.", "Speed to operation is critical to commercial plans."],
    changes: [{ from: "Imported HQ policy", to: "Locally compliant people framework" }, { from: "Ad-hoc first hires", to: "Sequenced leadership hiring plan" }, { from: "Unclear nationalisation exposure", to: "Emiratisation / Saudization roadmap" }, { from: "Fragmented vendors", to: "One integrated people set-up" }],
    method: [{ t: "Assess", d: "Entity, market and workforce requirements across target countries." }, { t: "Structure", d: "Organisation design, grading, reward and policy architecture." }, { t: "Hire", d: "Priority leadership and founding team acquisition." }, { t: "Operate", d: "Payroll, compliance and HR operations live and documented." }],
    deliverables: ["Market-specific people compliance map", "Organisation design and grading", "Reward benchmarking and contracts", "Nationalisation strategy", "HR policies and employee handbook"],
    outcomes: [{ v: "[Verify]", l: "Weeks to operational team" }, { v: "[Verify]", l: "Markets supported" }, { v: "[Verify]", l: "Compliance findings at audit" }],
    experience: "Regional execution across UAE and Saudi Arabia, informed by international HR leadership and global operating standards.",
    caseSlug: "gcc-expansion",
    faq: [{ q: "Do you support Saudi Arabia specifically?", a: "Yes. Saudi entry requires careful planning around Saudization, GOSI and local labour practice — built into our approach from day one." }, { q: "Can you work with our HQ HR team?", a: "We typically operate as the regional extension of HQ, aligning global standards with local requirements." }, { q: "Do you handle entity formation?", a: "We coordinate with legal and PRO partners, focusing on the people, organisation and compliance dimensions." }],
  },
  {
    slug: "portfolio-transformation", n: "03", title: "Portfolio Transformation", short: "Portfolio Transformation",
    lines: ["Portfolio", "Transformation"], img: IMG.balcony,
    summary: "Create consistent, scalable people systems across multiple companies while preserving operating independence.",
    challenge: ["Each portfolio company runs HR differently.", "Leadership risk is poorly visible at group level.", "Value-creation plans lack a people dimension.", "Shared capability is duplicated rather than leveraged."],
    changes: [{ from: "Fragmented practices", to: "Common HR operating model" }, { from: "Opaque leadership risk", to: "Portfolio talent visibility" }, { from: "Duplicated cost", to: "Shared services where it matters" }, { from: "Deal-by-deal approach", to: "Repeatable people playbook" }],
    method: [{ t: "Baseline", d: "Assess people maturity across each company." }, { t: "Standardise", d: "Define what is common and what stays local." }, { t: "Deploy", d: "Implement frameworks company by company." }, { t: "Govern", d: "Group-level reporting and talent reviews." }],
    deliverables: ["Portfolio people maturity assessment", "Group HR operating model", "Leadership assessment & succession", "People due diligence framework", "Group reporting dashboard"],
    outcomes: [{ v: "[Verify]", l: "Companies aligned" }, { v: "[Verify]", l: "Leadership roles assessed" }, { v: "[Verify]", l: "Cost efficiency" }],
    experience: "Experience designing people systems across multi-entity groups, investment holdings and family enterprises.",
    caseSlug: "one-hr-operating-model",
    faq: [{ q: "Will portfolio companies lose autonomy?", a: "No. We separate the non-negotiables from the local choices, so companies keep operating independence." }, { q: "Do you support due diligence?", a: "Yes — people due diligence pre-deal and 100-day people plans post-close." }],
  },
  {
    slug: "rapid-stabilization-growth", n: "04", title: "Rapid Stabilization & Growth", short: "Rapid Stabilization",
    lines: ["Rapid Stabilization", "& Growth"], img: IMG.stair,
    summary: "Stabilize underperforming people operations and establish structures required for sustainable growth.",
    challenge: ["Attrition is rising and morale is falling.", "HR is consumed by firefighting.", "Leadership gaps are slowing decisions.", "Growth plans exceed organisational capacity."],
    changes: [{ from: "Firefighting", to: "Clear priorities and ownership" }, { from: "Leadership vacuum", to: "Interim senior HR leadership" }, { from: "Rising attrition", to: "Targeted retention interventions" }, { from: "Growth risk", to: "Scalable foundations" }],
    method: [{ t: "Stabilise", d: "Contain immediate risks within the first weeks." }, { t: "Diagnose", d: "Identify root causes rather than symptoms." }, { t: "Rebuild", d: "Install core processes and accountability." }, { t: "Scale", d: "Prepare the organisation for its next phase." }],
    deliverables: ["30-day stabilisation plan", "Interim HR leadership", "Retention risk analysis", "Core HR process redesign", "Growth-ready organisation plan"],
    outcomes: [{ v: "[Verify]", l: "Reduction in attrition" }, { v: "[Verify]", l: "Days to stabilisation" }, { v: "[Verify]", l: "Engagement movement" }],
    experience: "Operators who have led people functions through turbulence, restructuring and rapid scale.",
    caseSlug: "technical-talent-engine",
    faq: [{ q: "Can you provide interim HR leadership?", a: "Yes. Senior practitioners can step in to lead the function while permanent capability is built." }, { q: "How fast can you start?", a: "Engagements can typically begin within days of an initial conversation." }],
  },
  {
    slug: "strategic-hr-transformation", n: "05", title: "Strategic HR Transformation", short: "HR Transformation",
    lines: ["Strategic HR", "Transformation"], img: IMG.board,
    summary: "Align people, structure, systems and performance with business strategy.",
    challenge: ["HR is administrative rather than strategic.", "Performance management does not change performance.", "Structures no longer match the strategy.", "Systems are underused or disconnected."],
    changes: [{ from: "Administrative HR", to: "Business-partnering function" }, { from: "Annual appraisal ritual", to: "Performance system that drives results" }, { from: "Legacy structure", to: "Organisation designed for strategy" }, { from: "Disconnected tools", to: "Integrated HR technology" }],
    method: [{ t: "Align", d: "Translate strategy into people priorities." }, { t: "Design", d: "Structure, roles, performance and reward." }, { t: "Implement", d: "Deploy alongside leadership teams." }, { t: "Measure", d: "Track adoption and business impact." }],
    deliverables: ["People strategy", "Organisation design", "Performance management system", "Reward & grading framework", "HRIS selection and implementation roadmap"],
    outcomes: [{ v: "[Verify]", l: "Process adoption" }, { v: "[Verify]", l: "Productivity movement" }, { v: "[Verify]", l: "Year-one ROI" }],
    experience: "Senior global HR leadership combined with a technology background — people systems designed with engineering discipline.",
    caseSlug: "one-hr-operating-model",
    faq: [{ q: "Is this a strategy-only engagement?", a: "No. Strategy is only valuable when it works in the real world. We design and implement." }, { q: "Do you select HR technology?", a: "We are vendor-neutral and support requirements, selection and implementation." }],
  },
];

export type Industry = { slug: string; n: string; name: string; statement: [string, string]; desc: string; img: string; challenges: string[]; capabilities: string[]; opportunities: string[]; services: string[]; };

export const INDUSTRIES: Industry[] = [
  { slug: "technology-startups", n: "01", name: "Technology & Startups", statement: ["Scaling Teams at", "the Speed of Product."], desc: "Hiring engines, levelling and culture that survive hypergrowth.", img: IMG.glass, challenges: ["Competing for scarce engineering talent", "Scaling from founding team to structured organisation", "Keeping culture intact through rapid growth", "Investor pressure on burn and productivity"], capabilities: ["Technical recruiting architecture", "Levelling and career frameworks", "Equity and reward design", "Scale-up HR operations"], opportunities: ["Faster hiring against roadmap", "Lower early attrition", "Investor-ready people reporting"], services: ["technical-talent-pipeline", "rapid-stabilization-growth"] },
  { slug: "private-equity-investment", n: "02", name: "Private Equity & Investment Holdings", statement: ["Human Capital as", "a Value-Creation Lever."], desc: "People due diligence, leadership assessment and portfolio operating models.", img: IMG.balcony, challenges: ["Leadership risk is invisible until it is expensive", "Inconsistent people practices across the portfolio", "100-day plans without a people workstream", "Exit readiness of organisations and teams"], capabilities: ["People due diligence", "Leadership assessment & succession", "Group HR operating model", "Incentive design aligned to value creation"], opportunities: ["Reduced leadership risk", "Faster post-close integration", "Stronger equity story at exit"], services: ["portfolio-transformation", "strategic-hr-transformation"] },
  { slug: "professional-services", n: "03", name: "Professional Services", statement: ["Where the People", "Are the Product."], desc: "Career architecture, utilisation and partner-track design.", img: IMG.hall, challenges: ["Retaining high performers", "Career paths that feel opaque", "Balancing utilisation and development", "Regional expansion of practices"], capabilities: ["Career and promotion frameworks", "Performance and reward", "Workforce planning", "Regional team build-out"], opportunities: ["Improved retention of key talent", "Clearer path to partnership", "Scalable regional practices"], services: ["strategic-hr-transformation", "gcc-market-entry"] },
  { slug: "government-public-sector", n: "04", name: "Government & Public Sector", statement: ["Modernising Institutions", "Around Performance."], desc: "Organisational design and capability for national transformation agendas.", img: IMG.board, challenges: ["Aligning structures with national visions", "Building future-ready capabilities", "Nationalisation and leadership development", "Performance culture in complex institutions"], capabilities: ["Organisation design", "Competency frameworks", "Leadership development architecture", "Performance management"], opportunities: ["Clearer accountability", "Stronger national talent pipelines", "Measurable institutional performance"], services: ["strategic-hr-transformation", "rapid-stabilization-growth"] },
  { slug: "education-edtech", n: "05", name: "Education & EdTech", statement: ["Building Organisations", "That Teach and Scale."], desc: "Academic and commercial talent systems for institutions and platforms.", img: IMG.curve, challenges: ["Recruiting academic and technical talent together", "Licensing and regulatory requirements", "Scaling across campuses or markets", "Retention of educators"], capabilities: ["Faculty and staff workforce planning", "Technical recruiting for EdTech", "Reward and grading", "Multi-site HR operating models"], opportunities: ["Stable, high-quality faculty", "Faster platform scaling", "Compliant regional growth"], services: ["technical-talent-pipeline", "gcc-market-entry"] },
  { slug: "family-enterprises", n: "06", name: "Family Enterprises", statement: ["Preserving Legacy,", "Professionalising Scale."], desc: "Governance, succession and professional management structures.", img: IMG.brutal, challenges: ["Balancing family and professional leadership", "Succession planning across generations", "Diverse businesses under one group", "Formalising informal practices"], capabilities: ["Governance and role clarity", "Succession architecture", "Group HR operating model", "Executive hiring"], opportunities: ["Clear succession", "Professional management bench", "Consistent group standards"], services: ["portfolio-transformation", "strategic-hr-transformation"] },
  { slug: "healthcare", n: "07", name: "Healthcare", statement: ["Clinical Excellence", "Needs Organisational Strength."], desc: "Clinical workforce planning, licensing and retention.", img: IMG.corner, challenges: ["Clinical talent scarcity", "Licensing complexity across markets", "Shift-based workforce planning", "Retention under pressure"], capabilities: ["Clinical workforce planning", "International recruitment design", "Retention strategy", "Compliance frameworks"], opportunities: ["Lower vacancy rates", "Faster onboarding", "Sustainable workforce"], services: ["rapid-stabilization-growth", "gcc-market-entry"] },
  { slug: "govtech-smart-cities", n: "08", name: "GovTech / Smart Cities", statement: ["Technology Talent for", "Public Ambition."], desc: "Technical capability built for mission-critical public programmes.", img: IMG.figure, challenges: ["Attracting technologists to public programmes", "Blending public and private talent", "Programme-based workforce models", "Knowledge transfer to nationals"], capabilities: ["Technical recruiting architecture", "Programme workforce design", "Capability transfer", "Organisation design"], opportunities: ["Faster programme mobilisation", "Retained national capability", "Sustainable delivery teams"], services: ["technical-talent-pipeline", "strategic-hr-transformation"] },
];

export type Case = { slug: string; n: string; sector: string; client: string; title: [string, string]; img: string; challenge: string; approach: string; outcome: string; metrics: { v: string; l: string }[] };

export const CASES: Case[] = [
  { slug: "technical-talent-engine", n: "01", sector: "Technology", client: "PE-backed technology company", title: ["Building a Technical", "Talent Engine"], img: IMG.glass, challenge: "Engineering growth targets were being missed. Hiring relied on agencies, interview quality varied and offers were regularly lost.", approach: "Rebuilt the recruiting function end-to-end: role architecture, structured assessment, in-house sourcing and hiring-manager enablement — operated alongside the team.", outcome: "A predictable, owned hiring engine with measurable funnel performance and a retention-focused onboarding model.", metrics: [{ v: "[Verify]", l: "Time-to-hire" }, { v: "[Verify]", l: "Agency spend" }] },
  { slug: "gcc-expansion", n: "02", sector: "GCC Expansion", client: "Global professional services firm", title: ["Building Operations", "Across New Markets"], img: IMG.riyadh, challenge: "An international firm needed compliant, staffed operations in the UAE and Saudi Arabia on an aggressive commercial timeline.", approach: "Designed the regional organisation, localised policy and reward, sequenced leadership hiring and built nationalisation plans for each market.", outcome: "Operational regional teams with compliant HR infrastructure and a governance model aligned to headquarters.", metrics: [{ v: "[Verify]", l: "Markets launched" }, { v: "[Verify]", l: "Weeks to operation" }] },
  { slug: "one-hr-operating-model", n: "03", sector: "Portfolio Company", client: "Regional investment group", title: ["Creating One HR", "Operating Model"], img: IMG.balcony, challenge: "Multiple portfolio companies operated with inconsistent practices, limited leadership visibility and duplicated HR cost.", approach: "Assessed people maturity across the group, defined a common operating model and deployed it company by company without removing local autonomy.", outcome: "Group-wide visibility of talent and leadership risk, with shared standards and reduced duplication.", metrics: [{ v: "[Verify]", l: "Companies aligned" }, { v: "[Verify]", l: "Cost efficiency" }] },
];

export type Insight = { slug: string; cat: string; date: string; read: string; title: string; dek: string; img: string; body: string[] };

export const INSIGHTS: Insight[] = [
  { slug: "entering-saudi-arabia-hr", cat: "Market Entry", date: "2026", read: "8 min", title: "Entering Saudi Arabia: What HR Must Get Right", dek: "Saudization, leadership sequencing and why HQ policy rarely survives first contact with the Kingdom.", img: IMG.riyadh, body: ["Saudi Arabia is one of the most compelling growth markets in the world — and one of the most frequently underestimated from a people perspective.", "The first decision is sequencing. The founding leadership hires set culture, compliance posture and the pace of everything that follows. Getting them wrong costs quarters, not weeks.", "Second, nationalisation is not an afterthought. A credible Saudization plan should inform organisation design from day one, not be retrofitted after the first audit.", "Finally, HQ policies need translation, not transplantation. Reward, working patterns and benefits must reflect local expectations while preserving global standards."] },
  { slug: "why-performance-management-fails", cat: "Performance", date: "2026", read: "6 min", title: "Why Performance Management Systems Fail", dek: "Most performance systems measure compliance with the process — not performance.", img: IMG.hall, body: ["Performance management rarely fails because of the form. It fails because it is disconnected from how work actually gets done.", "Effective systems are short-cycle, manager-owned and tied to the few outcomes that matter to the business.", "The best systems disappear into the business. They simply make better work possible."] },
  { slug: "90-day-transformation", cat: "Transformation", date: "2026", read: "7 min", title: "The 90-Day Human Capital Transformation", dek: "Why momentum matters more than a perfect plan.", img: IMG.desk, body: ["Long transformation programmes lose sponsorship before they deliver value. Ninety days is long enough to change structure and short enough to keep attention.", "Days 1–30 diagnose and stabilise. Days 31–60 implement in parallel with leadership. Days 61–90 embed, document and hand over.", "The measure of success is not the roadmap. It is what the organisation can do on day 91 without us."] },
  { slug: "building-technical-teams-gcc", cat: "Talent", date: "2026", read: "5 min", title: "Building Technical Teams in the GCC", dek: "The region's talent market has changed. Recruiting models must change with it.", img: IMG.glass, body: ["Technical talent in the GCC is increasingly mobile, well-informed and selective.", "Winning requires clarity of proposition, speed of process and credible career architecture.", "Companies that treat recruiting as an engineered system consistently outperform those that treat it as a transaction."] },
  { slug: "people-due-diligence-private-equity", cat: "Private Equity", date: "2026", read: "6 min", title: "People Due Diligence for Private Equity", dek: "Leadership risk is value risk. Most investment theses underprice it.", img: IMG.balcony, body: ["Financial and legal diligence are mature disciplines. People diligence often remains anecdotal.", "A structured view of leadership capability, key-person dependency and organisational readiness materially improves the 100-day plan.", "Human capital is a value-creation lever — when it is measured."] },
];

export const MARKETS = [
  { id: "uae", name: "UAE", coord: "25.20° N / 55.27° E", text: "Our home base. Deep familiarity with free zone and mainland structures, Emiratisation requirements and the pace of Dubai and Abu Dhabi.", cells: [22, 23, 30, 31] },
  { id: "ksa", name: "Saudi Arabia", coord: "24.71° N / 46.67° E", text: "Vision 2030 has made the Kingdom the region's most dynamic talent market. Saudization, regional HQ requirements and leadership sequencing are central.", cells: [9, 10, 11, 17, 18, 19, 25, 26] },
  { id: "kwt", name: "Kuwait", coord: "29.37° N / 47.97° E", text: "Relationship-driven markets with distinct labour frameworks and Kuwaitisation priorities for established regional businesses.", cells: [2, 3] },
  { id: "omn", name: "Oman", coord: "23.58° N / 58.40° E", text: "Omanisation, family enterprise structures and growing investment across logistics, tourism and technology.", cells: [31, 38, 39] },
  { id: "intl", name: "International", coord: "Global", text: "International standards applied regionally — and regional expertise for international firms entering the GCC.", cells: [0, 7, 40, 47, 5, 44] },
];

export const projectsSection = {
  label: "Projects",
  heading: "Pipelines that check their own work.",
  nextLinkText: "Discuss a similar problem →",
  nextLinkHref: "#contact",
};

export type Proof = {
  value: string;
  label: string;
  verified: boolean;
};

export type Project = {
  id: string,
  title: string,
  stack: readonly string[],
  problem?: string,
  built?: string,
  note?: { label: string; text: string },
  proof: readonly Proof[],
  featured: boolean,
};


// Private array for literal type inference
const _projects = [
  {
    id: "personal-data-platform",
    title: "Personal Data Platform",
    stack: ["Python", "DuckDB", "Parquet"],
    problem:
      "Bank portal exports, emailed statements and PDFs, in different formats, with no single source of truth and no way to know when a number was wrong.",
    built:
      "A Bronze → Silver → Gold pipeline on DuckDB and Parquet. Every run passes nine integrity gates, from cent-level reconciliation to income-cliff and stale-account checks. A chat interface answers questions through fixed SQL queries, so the model never does the arithmetic.",
    note: {
      label: "What broke",
      text: "Re-downloaded statements were tracked by file path, so fuller copies were silently skipped and a month's income read near zero, with no error. I re-keyed ingestion on content hashes and added the gate that would have caught it on day one.",
    },
    proof: [
      { value: "2,600+", label: "Transactions", verified: false },
      { value: "130+", label: "Source files", verified: false },
      { value: "9", label: "Integrity gates per run", verified: false },
    ],
    featured: true,
  },
  {
    id: "validation-system",
    title: "Multi-Client Validation System",
    stack: ["Python", "Polars", "Pandas"],
    problem: "A compliance audit over more than 500,000 records took six hours per run.",
    built:
      "A production audit system with automated data-quality validation, anomaly detection and a compliance reporting pipeline.",
    proof: [
      { value: "6 h → 45 min", label: "Audit run time", verified: true },
      { value: "500K+", label: "Records per audit", verified: false },
    ],
    featured: true,
  },
  {
    id: "etl-reporting",
    title: "ETL Reporting Pipeline",
    stack: ["Python", "OAuth 2.0", "SharePoint API"],
    proof: [{ value: "80% less processing time", label: "Processing time", verified: true }],
    featured: false,
  },
  {
    id: "parts-normalization",
    title: "Oracle Parts Normalization",
    stack: ["Python", "PyQt6", "Fuzzy matching"],
    proof: [{ value: "4 h/week saved", label: "Manual entry", verified: true }],
    featured: false,
  },
  {
    id: "workday-conversions",
    title: "Workday Conversions",
    stack: ["SQL", "EIB", "HCM", "Payroll", "Benefits", "Learning"],
    proof: [{ value: "4 implementations", label: "Delivery scope", verified: false }],
    featured: false,
  },
] as const;

// Export validated version
export const projects: readonly Project[] = _projects;

export const skillsSection = {
  label: "Skills",
  heading: "From raw source to an answer you can trust.",
  legend: "Stage measured by a verified result in Projects",
  provenSrText: "(measured by a verified result)",
};

export type ProjectTitle = (typeof _projects)[number]["title"];

export type Tool<P extends string = string> = {
  name: string;
  projects: readonly P[];
};

export type Stage<P extends string = string> = {
  id: string;
  number: string;
  name: string;
  desc: string;
  proven: boolean;
  tools: readonly Tool<P>[];
};

export type Lang = "en" | "es";

export const stages: readonly Stage[] = [
  {
    id: "ingest",
    number: "01",
    name: "Ingest",
    desc: "Pull data out of systems that weren't built to share it.",
    proven: false,
    tools: [
      { name: "SharePoint API · OAuth 2.0", projects: ["ETL Reporting Pipeline"] },
      { name: "Legacy HR extracts: ADP, Dayforce, SAP", projects: ["Workday Conversions"] },
      { name: "Bank portals, email, PDF and CSV parsing", projects: ["Personal Data Platform"] },
    ],
  },
  {
    id: "transform",
    number: "02",
    name: "Transform",
    desc: "Reshape it to the target's rules, fast enough to rerun.",
    proven: true,
    tools: [
      { name: "Python · Polars · Pandas", projects: ["Multi-Client Validation System"] },
      { name: "Incremental loading", projects: ["ETL Reporting Pipeline"] },
      { name: "SQL stored procedures", projects: ["Workday Conversions"] },
      { name: "DuckDB · Parquet", projects: ["Personal Data Platform"] },
    ],
  },
  {
    id: "validate",
    number: "03",
    name: "Validate",
    desc: "Prove every load is right before anyone relies on it.",
    proven: true,
    tools: [
      { name: "Automated data-quality checks, anomaly detection", projects: ["Multi-Client Validation System"] },
      { name: "Integrity gates, cent-level reconciliation", projects: ["Personal Data Platform"] },
      { name: "Fuzzy matching", projects: ["Oracle Parts Normalization"] },
    ],
  },
  {
    id: "serve",
    number: "04",
    name: "Serve",
    desc: "Land it where people already work.",
    proven: false,
    tools: [
      { name: "Power BI", projects: ["ETL Reporting Pipeline"] },
      { name: "Workday loads: EIB, iLoad", projects: ["Workday Conversions"] },
      {
        name: "Compliance reports, PyQt6 desktop tools",
        projects: ["Multi-Client Validation System", "Oracle Parts Normalization"],
      },
    ],
  },
] as const satisfies readonly Stage<ProjectTitle>[];



export const aboutSection = {
  label: "About",
  heading: "I'm José.",
  careerLabel: "Career",
  bio: [
    "I'm a data engineer based in Costa Rica. Right now I work at Workday on data conversions: I take a company's HR and payroll data out of systems like ADP, Dayforce or SAP and load it into Workday without losing anything along the way.",
    "I always wanted to work in data. I trust numbers more than hunches, and I like seeing a project all the way through, to the point where the data is right and the customer is happy.",
    "I didn't start there, though. I tested Alexa features at Amazon and did technical sales at Emerson, then moved into EDI support at DXC, which is where I started working with data every day. After that I joined World Wide Technology as a data analyst and wrote most of the Python tools you see in Projects.",
    "I'm also finishing a software engineering degree at Universidad Cenfotec while I work, and I built a data pipeline for my own finances because I wanted to know the numbers were right. And yes, that's a penguin in the tab icon. I love penguins.",
  ],
};

export type CareerItem = {
  when: string;
  role: string;
  org: string;
  note?: string;
  muted: boolean;
};

export const career: readonly CareerItem[] = [
  {
    when: "Jan 2026 – Present",
    role: "Technical Consultant, Data Conversion",
    org: "Workday",
    note: "Full conversion lifecycle across multiple concurrent client implementations.",
    muted: false,
  },
  {
    when: "Jul 2024 – Jan 2026",
    role: "Product Data Analyst",
    org: "World Wide Technology",
    note: "Python pipelines, audit tooling and OAuth 2.0 integrations for 350+ data flows.",
    muted: false,
  },
  {
    when: "Jul 2023 – Jul 2024",
    role: "EDI Analyst",
    org: "DXC Technology",
    note: "Monitored production data flows of 200K+ daily records.",
    muted: false,
  },
  {
    when: "2021 – 2023",
    role: "QA testing and technical sales",
    org: "Amazon · Emerson",
    muted: true,
  },
  {
    when: "Expected 2027",
    role: "B.S. Software Engineering",
    org: "Universidad Cenfotec",
    muted: true,
  },
] as const;



export const contactSection = {
  label: "Contact",
  heading: "Let's talk about your data.",
  lead: "The fastest way is a 30-minute call. If you'd rather write, send a message here or on WhatsApp.",
  cta: "Book a 30-minute call",
  channels: [
    { label: "Email", link: "jpicado011@gmail.com", href: "mailto:jpicado011@gmail.com" },
    { label: "WhatsApp", link: "+506 8475 6191", href: "https://wa.me/50684756191" },
    { label: "CV", link: "Download CV (PDF)", href: "/cv/CV_Jose_Picado_2026.pdf", download: true },
  ],
};

export const contactForm = {
  title: "Send a message",
  labels: { name: "Your name", email: "Your email", message: "What are you working on?" },
  submit: "Send message",
  submitting: "Sending…",
  success: "Message sent. You'll get a confirmation email shortly.",
  sendError: "Couldn't send the message. Try again, or reach me on WhatsApp.",
  counter: "{n} / 1000",
  errors: {
    nameRequired: "Please enter your name.",
    nameShort: "Name must be at least 2 characters.",
    nameLong: "Name must be 80 characters or fewer.",
    emailRequired: "Please enter your email.",
    emailInvalid: "That email doesn't look right. Check for typos.",
    messageRequired: "Please write a short message.",
    messageShort: "Message must be at least 10 characters.",
    messageLong: "Message must be 1000 characters or fewer.",
  },
};

export const footer = {
  links: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/josé-andrés-picado-corrales-a10a28173", external: true },
    { label: "GitHub", href: "https://github.com/josepicado07", external: true },
    { label: "Email", href: "mailto:jpicado011@gmail.com" },
  ],
  meta: "© 2026 José Picado · Costa Rica",
};


export const whatsAppFloat = {
  ariaLabel: "Message José on WhatsApp",
};

export const aria = {
  stack: "Stack",
  proof: "Proof",
  compactProjects: "Compact projects",
  skillsPipeline: "Skills pipeline",
  contactChannels: "Contact channels",
  footerLinks: "Footer links",
};

export const nav = {
  skipLink: "Skip to content",
  wordmark: "José Picado",
  wordmarkHref: "#top",
  navLabel: "Primary",
  links: [
    { label: "Projects", href: "#projects" },
    { label: "Skills", href: "#skills" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ],
  languages: [
    { code: "EN", label: "English" },
    { code: "ES", label: "Español" },
  ],
  langGroupLabel: "Language",
  cv: "CV",
  cvDownload: "Download CV",
  menuOpen: "Open menu",
  menuClose: "Close menu",
};

export const hero = {
  id: "top",
  ariaLabel: "Introduction",
  label: "Data Engineer & Consultant",
  title: "Data pipelines, proven right.",
  sub: "I build data pipelines, and the validation systems that prove every load is correct before anyone relies on it.",
  ctaPrimary: "Book a 30-minute call",
  ctaSecondary: "See the work",
};

export const urls = {
  calendar: "https://cal.com/jose-picado-uieppc/30min",
  cv: "/cv/CV_Jose_Picado_2026.pdf",
  email: "jpicado011@gmail.com",
  whatsapp: "https://wa.me/50684756191",
  linkedin: "https://www.linkedin.com/in/josé-andrés-picado-corrales-a10a28173",
  github: "https://github.com/josepicado07",
};

export const en = {
  nav,
  hero,
  urls,
  projectsSection,
  projects,
  skillsSection,
  stages,
  aboutSection,
  career,
  contactSection,
  contactForm,
  footer,
  whatsAppFloat,
  aria,
} as const;

export type Dictionary = typeof en;

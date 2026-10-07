# Portfolio Rebuild v2: Project Plan

Branch: `rebuild-v2` · Merges into `main` only after Gate 4.
Source: approved plan "Portfolio Rebuild v2: Plan (aligned with Master Prompt v3)".

**Every phase ends with a gate.** Work stops at each one. A failed gate is reported, not worked around.

---

## 1. Discovery

**Positioning.** José Picado is a *Data Engineer & Consultant who builds pipelines and validation systems*. He is **not** presented as a "Workday Consultant". Workday is one domain he has delivered in, not his identity.

**Audience.**
- **Hiring managers** for data engineering roles. They need evidence of engineering judgment, scale, and ownership.
- **Consulting clients.** They need to trust that he can take a messy data problem and deliver a reliable system.

**The problem the site solves.** A list of tools doesn't prove capability. The site does that through real case studies. Each project shows the problem, what was built, and a verified metric. If a metric isn't confirmed, it doesn't ship.

**Primary actions.** Book a call (calendar CTA), send a message (EmailJS form or WhatsApp), download the CV.

---

## 2. Design Direction

| Token | Value |
|---|---|
| Background | `#0A0A0A` |
| Accent | Electric blue `#0066FF` |
| Typography | Geist or Inter (final pick in Phase 3) |
| Hero | Real 3D data-point network (React Three Fiber) |

**Principles.**
- Minimalist and modern: lots of negative space, few elements, strong type hierarchy.
- The 3D hero shows the work itself (a network of data points), not decoration.
- The accent is reserved for primary CTAs and key signals. It is never used as a wash.

**Hard rules (anti-references).**
- No generic templates or template-derived layouts.
- No percentage or skill bars.
- No "AI slop": no stock gradients, generic glassmorphism cards, filler copy, or invented numbers.

---

## 3. Stack

| Concern | Choice |
|---|---|
| Framework | Next.js 15 (App Router), TypeScript |
| Styling | Tailwind v4 |
| 3D | React Three Fiber + Drei + `@react-three/postprocessing` |
| Motion | GSAP + ScrollTrigger (`@gsap/react`), Lenis smooth scroll |
| Contact | `@emailjs/browser` |
| Hosting | Vercel (auto-detects Next.js; no `vercel.json`) |

---

## 4. Phases and Gates

### Phase 0: Archive (DONE)
Legacy site moved to `archive/legacy-portfolio-v1/`, `.gitignore` replaced, clean root on `rebuild-v2`.
**Gate 0:** clean root and clean `git status`; `main` has only the snapshot commit. **Passed.**

### Phase 0.5: Agent bridge (DONE)
`cross-agent-teams-mcp` (xats) is the only bridge. Protocol written to `.claude/collab/protocol.md`.
**Gate 0.5:** both agents registered in `portfolio-rebuild-v2`, echo test returned `STATUS: done` + `bridge-ok`, protocol file exists. **Passed.**

### Phase 1: Project plan document (this file)
**Gate 1:** user reviews (Ctrl+G) and approves.

### Phase 2: Skills and inspiration
Steps run in this order:
1. **Package re-verification.** `frontend-agency` is already installed and `cross-agent-teams-mcp` is connected.
2. **Impeccable setup.** Run `/impeccable init`, then `/impeccable document --seed` with the seed answers below. Acceptance: `PRODUCT.md` and `DESIGN.md` exist at the repo root.
3. **Frontend Agency install** (`npx frontend-agency install --project`), only if it isn't already installed.
4. **Run `/brand-discovery` and `/landing-page-strategy`.**
5. **Browse references:** landing.love, godly.website, awwwards.com and codrops. Note at least 3 specific reference URLs.
6. **Write `.claude/plans/inspiration.md`.** It needs 1 palette, 1 interaction pattern and 1 layout structure, each with a source URL.

**Impeccable seed answers:**
- **Color:**
  - Dark `#0A0A0A` with a single accent, `#0066FF`.
  - Neutrals are tinted toward the accent.
  - The accent is reserved for primary CTAs.
- **Type:**
  - Geist or Inter.
  - Display weight for the hero, body weight everywhere else.
  - Two weights at most.
- **Motion:**
  - Subtle and scroll-driven; the 3D hero reacts to scroll.
  - No decorative animation.
  - No bounce easing on CTAs.
- **References:** landing.love, godly.website, awwwards.com, codrops.
- **Anti-references:** Bootstrap portfolios, AI-slop gradients, percentage skill bars, stock corporate photography, Workday branding as identity.

**Gate 2:**
- All 12 Frontend Agency commands appear under `/`.
- `PRODUCT.md` and `DESIGN.md` exist at the repo root.
- `inspiration.md` has at least 3 ideas, each with a source URL.

**Dropped in Phase 2:**
- **Figma:** the figma-mcp-go repo was taken down under a DMCA notice, and the official server needs a Full seat. Design now happens in code, through Impeccable's live browser iteration, and `DESIGN.md` is the visual contract.
- **JEV:** not worth a paid TypeSafe key and a Node 22+ requirement for two agents.

### Phase 3: Build in code (OpenCode builds, Claude directs and grades)
`DESIGN.md` is the visual contract. OpenCode reads it before each UI task and never edits it. Sections go in order: Nav → Hero → Projects → Skills → About → Contact. At 390px the layout is a reflow of the desktop design, not a separate design.

Each section goes through this loop:
1. Claude iterates the design with Impeccable in `.claude/design-variants/`.
2. Claude picks a variant and hands it off: the variant file is the reference, and the `src/` files are the targets.
3. OpenCode ports the variant into `src/`.
4. Claude grades the result in the browser and either accepts it or hands it off again.

Claude never writes to `src/` and never runs `npm install`. The full rules are under "Execution Boundary" in `.claude/collab/protocol.md`.

Each slice goes to OpenCode as a protocol handoff. No two tasks touch the same files.
- Scaffold with `create-next-app@15` and install the stack in §3.
  - If `create-next-app` refuses the non-empty root, scaffold in `/tmp` and `rsync -a` the result into the repo.
  - Afterwards, confirm `.claude/` and `archive/` are untouched.
  - On Windows Git Bash `rsync` may be missing. If it is, use `cp -a` instead and say so.
- Components in `src/components/`, plus `src/lib/i18n.ts` and `src/lib/lenis.tsx`.
- Reuse from the archive: the CV, favicon, WhatsApp number and ES/EN copy.
- 3D hero:
  - Loaded through `next/dynamic({ ssr: false })` with a reserved canvas box.
  - Scroll-driven camera.
  - Static fallback under `prefers-reduced-motion` and on low-power devices.
- Hero text is server-rendered for LCP.

**Gate 3:**
- **User approves the live site section by section in the browser.**
- Before any content is final, the user provides the **calendar URL**.
- For each project, either a verified metric or an explicit scope marker (row count, client tier, time saved) is confirmed. No empty metric slots ship. If a project has neither, its card shows title + tech tag only.
- Technical checks, run by Claude. These are verification commands only, which the protocol allows: `npm run build`, `npm run start`, `npx lighthouse`, and browser checks.
- `npm run build` passes, and `npm run start` serves the site.
- In the browser:
  - the 3D hero renders and reacts to scroll
  - all 5 project cards render
  - ES/EN switches all text
  - the CV downloads
  - the form validates and sends
- Lighthouse: **Accessibility ≥ 95**, **LCP < 2.5s**, **CLS < 0.1**.
- Responsive checks with screenshots at **390 / 768 / 1024 / 1440px**.
- Failures go back to OpenCode as handoffs and are re-verified until they pass.

### Phase 4: Deploy
Deploy a Vercel preview of `rebuild-v2`.
**Gate 4:** user approves the preview. Only then does `rebuild-v2` merge into `main`.

---

## 5. Agent Roles

| Agent | Owns |
|---|---|
| **Claude Code** (`claude-portfolio`) | Planning, design direction, grading, review, deployment. Writes only the plan and collab docs, PRODUCT.md, DESIGN.md, `.impeccable/design.json`, and the `.claude/design-variants/` sandbox. |
| **OpenCode** (`opencode`) | Implementation, refactors, builds, type errors, tests |

**Communication.** Through xats team `portfolio-rebuild-v2`. OpenCode's agent ID is `d1f23808-2d92-406e-8419-897b41cd4fe3`. Handoffs use TASK / CONTEXT / FILES / ACCEPTANCE / DEADLINE; responses use STATUS / FILES CHANGED / VERIFICATION / NOTES. The full rules, including the 10-minute escalation and no-duplicate-edits rules, are in `.claude/collab/protocol.md`.

---

## 6. Project Content

**Sections, in order:** Nav, Hero, Projects, Skills, About, Contact.

**Projects (5 case studies).** Each card shows a title, a tech tag and one confirmed metric.
1. **Personal Data Platform** (FIRE Tracker): Python, DuckDB, Parquet
2. **Multi-Client Validation System**: 1M rows, Palo Alto Networks
3. **ETL Reporting Pipeline**
4. **Oracle Parts Normalization**
5. **Workday Conversions**

Metrics and scope markers are confirmed at Gate 3. A project with neither shows title + tech tag only.

**Skills.** Icon grid (Python, SQL, Polars, DuckDB, Databricks, Workday). No percentage bars.

**About.** Two columns, framed around being "a builder, not a tool operator".

**Preserved from v1:**
- ES/EN language toggle
- CV download
- EmailJS contact form with validation
- WhatsApp CTA

---

## 7. Operational Notes

- **OpenCode has `no_pane` on Windows.** It gets no automatic wake-up, so after every handoff OpenCode must poll `get_inbox`. Claude polls for its reply rather than assuming the message was seen. Replies sent from OpenCode to Claude do arrive automatically.
- **Secrets:**
  - EmailJS credentials live in `.env.local` (gitignored) as `NEXT_PUBLIC_EMAILJS_*`.
  - `.env.example` is committed with empty values.
  - The same vars are set in Vercel.
  - `NEXT_PUBLIC_` values still ship in the client bundle, so the real protection is EmailJS's allowed-origins restriction.
- **Key rotation (blocking for public launch):** the legacy EmailJS keys are exposed in `archive/` and in git history. They must be rotated before the public launch.
- **This file is not tracked by git.** `.claude/` is gitignored, so this plan and the collab protocol stay local.

---

## 8. Decisions log (Gate 2 → Phase 3, 2026-10-05)

| Decision | Value |
|---|---|
| Contrast tokens | `surface-raised` oklch(0.18 0.008 250); CTA fill oklch(0.52 0.20 260); `text-muted` oklch(0.62 0.010 250); Signal Text oklch(0.72 0.16 250). All AA (see DESIGN.md). |
| Skills | A pipeline layout (Ingest → Transform → Validate → Serve), not an icon grid |
| Labels | Geist, uppercase, 0.10em letter-spacing. No second typeface. |
| Hero text | Sharp on first paint, with no blur or fade. Only the 3D network animates. |
| Default language | EN, with an ES toggle |
| Calendar | https://cal.com/jose-picado-uieppc/30min |

**Still open. These block the matching section, not the phase:**
- **Client names:** engagements listed 2026-10-05 (below). Permission to name them publicly is still unconfirmed. Default: an industry descriptor for every client. Blocks the final Projects copy.
  - **Current Workday engagements (from José, 2026-10-05):**

    | Client | Industry | Scope | Status |
    |---|---|---|---|
    | Fairstead | Real estate | Full HCM, Benefits, Payroll, plus payroll history | Implementing |
    | ClickHouse | Tech / database software | Full HCM | Implementing |
    | Crusoe | AI infrastructure | Learning | Implementing |
    | Sage Dining | Food service | Benefits | Finished |

    - All four feed the "Workday Conversions" card. Only finished work can carry an outcome metric. In-progress work can show scope only.
  - **Decided 2026-10-05:**
    - Clients appear by **industry only**: a real estate firm, a database software company, an AI infrastructure company, a food service company. This applies site-wide, so the Validation System card's client becomes "a global cybersecurity company".
    - The engagements go **inside the single "Workday Conversions" card** as a scope marker: 4 implementations across HCM, Payroll (plus history), Benefits and Learning. They don't get separate cards.
- **Reply-time promise:** unanswered. Default: the line is left out of Contact.
- **Workday role start date:** January 2026, from the 2026 CV. Resolved. The metric candidates per project are in `project-metrics.md`.
- **Validation-system card copy:** resolved. It is the Enterprise Audit System: 500K+ records, 6 h → 45 min. "1M rows" and "replaced manual spot checks" are dropped. Final card content is in `project-metrics.md`.

### Hero scene: deferred (2026-10-05)
- The accepted P3-02 scene (layered graph) reads as a neural network, so it gets replaced later.
- The candidate is `design-variants/06-hero-dither/`: three dithered "raw" sources → validation gate → crisp table with a blue status column, rejects dropped. An earlier iteration is in `05-hero-flow/`.
- José wants to revisit it "down the line". It doesn't block the Contact section. A swap would only replace `src/components/HeroScene.tsx`.
- Sandbox canvases need `width/height: 100%` CSS. Without it, they render at device-pixel size on scaled screens (bug found 2026-10-05).
- **Update, later on 2026-10-05:** José approved **variant 05** (`05-hero-flow`, without dithering) and asked for the handoff. That's `handoffs/P3-07-hero-scene-swap.md`. Variant 06 (dithered) was not chosen.

### EmailJS status (2026-10-06)
- José created `.env.local` with rotated keys; all 4 vars are set and gitignored (Claude checked presence only, never the values).
- Wiring verified with a blocked-network test: the send call carries service/template/public key, params `from_email, from_name, message`.
- The dashboard test email arrived (the Gmail service works). **Real form send CONFIRMED 2026-10-06:** OpenCode sent through the site; contact and auto-reply both HTTP 200 OK.
- Form scroll-jump bug after send: `handoffs/P3-12-form-scroll.md`.
- **Key rotation: DONE (2026-10-06).** José generated a new EmailJS public key, which revokes the old one (one public key per account). That clears the "blocking for public launch" item in §7.
  - The old key was redacted from the two legacy archive files on D: (`js/main.js`, `nextapp/lib/emailjs.ts`; replaced with `REVOKED_KEY_REMOVED`).
  - It's deliberately left in git history, including the pushed `origin/main`. It's dead, and rewriting published history would be destructive for no gain.

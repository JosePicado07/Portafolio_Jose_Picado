# Page Strategy: Portfolio v2 (single page)

Produced by `/landing-page-strategy` (Phase 2, step 4). Inputs: `PRODUCT.md`, `DESIGN.md`, `.claude/plans/discovery.md`.

## Page objective

The priority user is a data engineering hiring manager, scanning in 2–5 minutes. The page should take them from *"another data person"* to *"this one builds systems that prove data is right; book the call"*.

**Primary action:** book a call.
**Secondary actions:** send a message (form or WhatsApp) and download the CV.

**Stage of awareness:** solution-aware. The visitor already knows what a data engineer is. What they need to see is evidence that he is the right one. That's why proof comes early and explanation comes late.

## Messaging hierarchy

1. **Promise** (hero): he builds data pipelines and the systems that prove they're right.
2. **Proof** (projects): five case studies, each with a problem, what was built, and a verified metric or scope marker.
3. **Mechanism** (skills): the stack, with each tool tied to the project that proves it.
4. **Trust** (about): who he is, how he works, and the arc from enterprise data to modern stack. He's a builder, not a tool operator.
5. **Act** (contact): one primary path (calendar), two low-friction alternatives (message and WhatsApp).

## Section sequence

The plan's order fits the decision flow, so it stays as is. Each section's job:

| # | Section | Decision-flow role | Must do | Must not do |
|---|---|---|---|---|
| 0 | **Nav** | Orientation | Name, 4 anchor links, ES/EN toggle, CV download. Sticky and minimal. | Compete with the hero CTA. The CV button is a ghost style, not Signal Blue. |
| 1 | **Hero** | Recognize + promise | Display headline, one supporting line (role and domain), primary CTA "Book a call", 3D network that reacts to scroll. | Say "Hi, I'm". Show a tool list, or a stat strip (the hero-metric template). |
| 2 | **Projects** | Believe the mechanism + proof | A **tiered layout**, per DESIGN.md. Two hero projects (Personal Data Platform, Multi-Client Validation System) get large narrative cards. The other three get compact rows. Each one has a problem, what was built, and a metric or scope marker. | Show identical cards, or empty metric slots. A project without a confirmed metric shows only its title and tech tag. |
| 3 | **Skills** | Mechanism | An icon grid grouped by job (Ingest & transform · Validate · Store & query · Platforms), each item linked to a project. | Use percentage bars, ratings, or a logo wall with no context. |
| 4 | **About** | Trust the provider | Two columns: a short bio in the "builder, not tool operator" voice, plus a career arc focused on data work. | Pad it with soft skills, or frame him as a Workday Consultant. |
| 5 | **Contact** | Act with confidence | Calendar CTA (Signal Blue), EmailJS form, WhatsApp. Say what happens next ("I reply within 1 business day"; **needs confirming**). | Show more than one Signal Blue button in the section. |
| — | Footer | Housekeeping | LinkedIn, GitHub, email, language toggle repeated. | Add a second CTA block. |

No pricing, testimonials or FAQ. They don't serve this decision, and he has no testimonials to show anyway.

## CTA strategy

- **"Book a call"** appears in two places only: the hero and the contact section. It's the only Signal Blue button on the page (the Earned Signal Rule).
- **Download CV** stays in the nav as a ghost button. It's repeated in contact as a text link.
- **Message form and WhatsApp** live in contact as secondary styles. The floating WhatsApp button (a v1 requirement) uses a neutral style, not blue, and moves out of the way of the contact section.
- After the projects section, one inline text link reads "Discuss a similar problem →" and goes to contact. It's not a button.

## Proof and trust plan

| Proof | Where | Status |
|---|---|---|
| Verified metric or scope marker per project | Projects | Confirmed at Gate 3 |
| Enterprise scale (1M rows, multi-client) | Featured case | Volume known. **The client name needs clearance.** |
| Modern-stack fluency (Polars, DuckDB, Databricks) | Projects + Skills | Personal Data Platform |
| Career arc (EDI → ETL → conversions) | About | **Dates need verifying against the CV** |
| Public code | Project links to GitHub | Where repos exist |
| CV | Nav + Contact | Exists (archive) |

## Objection handling

| Objection | Answered by |
|---|---|
| "Just an HR-systems or Workday person?" | Hero promise is about engineering. Workday appears as one case among five. |
| "Modern stack?" | Personal Data Platform featured early. Skills grouped by job. |
| "Senior enough?" | Scope and ownership in every case (row counts, multi-client). No inflated years. |
| "Reachable?" | Calendar, WhatsApp, and a stated reply time. |
| "Can I trust the numbers?" | Verified or absent (Design Principle 2). No empty metric slots. |

## SEO and accessibility notes

**SEO:**
- `<title>`: "José Picado · Data Engineer & Consultant". The meta description repeats the promise.
- Separate ES/EN metadata, with `lang` set on `<html>` and `hreflang` if languages get separate URLs.
- `Person` JSON-LD with jobTitle, sameAs (LinkedIn, GitHub) and knowsAbout. It must stay accurate.
- The hero headline and all project text are server-rendered, so they're crawlable and good for LCP. The 3D canvas adds nothing to SEO and is loaded lazily.

**Accessibility:**
- One `h1` (hero). One `h2` per section. Each project title is an `h3`.
- Landmarks: `header`, `nav`, `main`, `footer`.
- The 3D canvas is `aria-hidden`, with a static fallback for reduced motion.
- The form has visible labels and inline errors, connected with `aria-describedby`.
- The language toggle is a real button with `aria-pressed` or the state in its label.

## Implementation handoff

- **Section anchors:** `#projects`, `#skills`, `#about`, `#contact`.
- **Content model** (`src/lib/content.ts`, typed): `Project { id, title, problem, built, stack[], proof?: { kind: 'metric' | 'scope', value, label }, featured?, repoUrl? }`. A missing `proof` renders the title and tag only, which enforces the Gate 3 rule.
- **i18n:** every string is keyed in `src/lib/i18n.ts`. Content is ported from the legacy `language.js` and rewritten to the voice calibration in `PRODUCT.md`.
- **Open inputs before final content (Gate 3):**
  - calendar URL
  - each project's metric or scope marker
  - client-name clearance
  - CV dates
  - reply-time promise
  - default language (EN or ES)

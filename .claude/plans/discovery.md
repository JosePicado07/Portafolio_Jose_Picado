# Discovery Brief: Portfolio Rebuild v2

Produced by `/brand-discovery` (Phase 2, step 4). Sources: `PRODUCT.md`, `DESIGN.md`, `.claude/plans/portfolio-rebuild.md`, and the career background on file. This brief should let later work proceed without rereading the conversation.

## Brand summary

José Picado is a **Data Engineer & Consultant who builds pipelines and validation systems**. His day-to-day work is turning messy source data into trusted target data: mapping, transforming, validating, and reloading until the result is clean. He does this in enterprise HR and product-data contexts (SAP EDI, ETL automation, HR-system conversions). His side projects extend the same discipline to modern tooling (Polars, DuckDB, Databricks).

The brand is **precise, calm, and proven**: an engineer who checks his work, presented by a site that checks its own.

## Audience segments and priority user

| Segment | Priority | Context | Decides on |
|---|---|---|---|
| **Hiring managers (data engineering)** | **Primary** | They scan for 2–5 minutes, often from a recruiter link or LinkedIn, on desktop or phone. | Evidence of scale, judgment, ownership, and modern stack fluency |
| **Consulting clients** | Secondary | They have a concrete data problem (conversion, validation, reporting) and arrive with intent. | Trust that he can deliver, plus a low-friction way to start a conversation |
| Recruiters (influencers) | Tertiary | They do keyword matching and forward the link. | Clear title, stack terms in readable text, CV |

**Priority user:** a data engineering hiring manager who opens the link between other candidates. The page has to earn the second minute within the first ten seconds.

## Positioning hypothesis

- **Category:** data engineering, specifically the reliability layer (pipelines and validation).
- **For:** teams moving or reporting on data that has to be right.
- **Problem:** data migrations and reporting pipelines fail quietly. Bad mappings and unvalidated loads cost weeks and erode trust.
- **Outcome:** data that arrives clean, verified, and explainable.
- **Difference:** he builds the validation system around the pipeline, not just the pipeline. He has enterprise conversion experience at real scale (1M-row multi-client validation) as well as modern tooling.
- **Proof:** 5 case studies, each with a verified metric.

**One-line positioning:** *"I build data pipelines, and the systems that prove they're right."* (A draft for copywriting, not final copy.)

## Conversion goal

| Action | Audience | Placement |
|---|---|---|
| **Book a call** (calendar link, Signal Blue) | Clients and hiring managers | Primary CTA: hero and contact |
| Send a message (EmailJS form) | Both | Contact |
| WhatsApp | Clients (LATAM) | Contact and a floating button |
| Download the CV | Hiring managers and recruiters | Nav and contact |

**Success:** calls booked and messages sent. CV downloads are a secondary signal.

## Content and proof requirements

**Each case study needs:**
1. A one-sentence problem.
2. What was built: the architecture in one line and the stack as context.
3. **One verified metric.**
4. His role and scope.

**Verification status (blocks Gate 3):**

| Project | Metric | Status |
|---|---|---|
| Personal Data Platform (Polars + DuckDB) | not yet provided | ❌ Needed |
| Multi-Client Validation System | 1M rows | ⚠️ Volume known; outcome metric needed |
| ETL Reporting Pipeline | not yet provided | ❌ Needed |
| Oracle Parts Normalization | not yet provided | ❌ Needed |
| Workday Conversions | not yet provided | ❌ Needed |

**Other proof:** the CV, LinkedIn and GitHub links, and real code in public repos where possible.

**Objections the page must answer:**
- *"Is he just a Workday/HR-systems person?"* Lead with engineering, and frame Workday as one domain.
- *"Can he work with a modern stack?"* The Personal Data Platform and the Databricks project answer this.
- *"Is he senior enough?"* Show scope and ownership in each case study. Don't inflate years.
- *"Will he be reachable and responsive?"* Calendar plus WhatsApp means low friction.

## Constraints and assumptions

**Constraints:**
- ES/EN bilingual throughout.
- No percentage bars.
- Must meet WCAG 2.2 AA.
- LCP < 2.5s, CLS < 0.1.
- No invented metrics.
- Deploys to Vercel.

**Assumptions:**
- Hiring managers outweigh clients for now. Clients can still act through the calendar link.
- English is the default language, with ES one click away. **Needs confirmation:** the legacy site defaulted to ES.
- No testimonials are available. Proof comes from case-study metrics only.

## Risks that could make later design generic or inaccurate

1. **Client confidentiality (high).** Naming *Palo Alto Networks* and showing details of employer or client work may breach an NDA or employer policy. **Confirm at Gate 3** that each named client and each metric is cleared for public use. If one isn't, anonymize it ("a global cybersecurity company").
2. **Category reflex (medium).** Near-black with electric blue is the default "tech" look. The difference has to come from the Earned Signal Rule (blue only on verified or actionable elements), the type scale, and layout rhythm. The palette alone won't do it.
3. **Identical card grid (medium).** Five same-sized project cards break the DESIGN.md Don'ts. The projects differ in scale, so the layout should show that (e.g. a featured case plus supporting ones).
4. **Stale background data (medium).** The career timeline on file has conflicting dates for the Workday role (July 2024 vs. January 2026). Verify dates against the current CV before writing the About copy.
5. **3D as decoration (medium).** If the data-point network doesn't connect to the validation story (e.g. points resolving from noise into order as you scroll), it becomes the "cool hero" cliché.
6. **Tool-list drift (low).** The Skills grid can turn back into the toolbox listing that PRODUCT.md rejects. Tie each skill to the project that proves it.

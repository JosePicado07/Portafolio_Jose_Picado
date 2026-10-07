# P3-05 · About

**Status:** PARTIAL 2026-10-05. A1, A3–A6 pass; A2 fails (career items in 2 columns) and the <time> datetime values are invalid. Re-handed off as `P3-05b-about-fix.md`.
**Reference variant:** `.claude/design-variants/04-about/index.html`. Sandbox-checked at 1440, 768 and 390px with no overflow.

---

## Handoff (paste everything inside the fence)

```
TASK: P3-05 Build the About section from sandbox variant 04

CONTEXT: Skills (P3-04c) passed grading. About comes next. The reference is
.claude/design-variants/04-about/index.html (plain HTML/CSS, no JS). Port its
look and markup structure. DESIGN.md and PRODUCT.md are the contract; don't
edit them.
COPY RULE: José approved this text word for word. It's his own voice and his
own facts. Copy every string character for character. Don't paraphrase,
"polish", shorten or add anything. Keep straight apostrophes ('), and keep the
strings in en.ts rendered with {} so JSX lint doesn't complain about them.

FILES:
- src/content/en.ts: add a typed `aboutSection` export and a `career` export.
    type CareerItem = { when: string; role: string; org: string;
                        note?: string; muted: boolean };
- src/components/About.tsx (server component, NO "use client").
- src/app/page.tsx: add <About /> after <Skills /> inside <main>.
- src/app/globals.css: port the .about / .about__grid / .bio / .arc rules and
  their 1023px and 767px breakpoints. Use the P3-01 tokens only.

EXACT COPY:
aboutSection:
  label:       About
  heading:     I'm José.
  careerLabel: Career
  bio (4 paragraphs, in order):
  1. I'm a data engineer based in Costa Rica. Right now I work at Workday on data conversions: I take a company's HR and payroll data out of systems like ADP, Dayforce or SAP and load it into Workday without losing anything along the way.
  2. I always wanted to work in data. I trust numbers more than hunches, and I like seeing a project all the way through, to the point where the data is right and the customer is happy.
  3. I didn't start there, though. I tested Alexa features at Amazon and did technical sales at Emerson, then moved into EDI support at DXC, which is where I started working with data every day. After that I joined World Wide Technology as a data analyst and wrote most of the Python tools you see in Projects.
  4. I'm also finishing a software engineering degree at Universidad Cenfotec while I work, and I built a data pipeline for my own finances because I wanted to know the numbers were right. And yes, that's a penguin in the tab icon. I love penguins.

career (in order):
  1. when: Jan 2026 – Present · role: Technical Consultant, Data Conversion · org: Workday
     note: Full conversion lifecycle across multiple concurrent client implementations.
     muted: false
  2. when: Jul 2024 – Jan 2026 · role: Product Data Analyst · org: World Wide Technology
     note: Python pipelines, audit tooling and OAuth 2.0 integrations for 350+ data flows.
     muted: false
  3. when: Jul 2023 – Jul 2024 · role: EDI Analyst · org: DXC Technology
     note: Monitored production data flows of 200K+ daily records.
     muted: false
  4. when: 2021 – 2023 · role: QA testing and technical sales · org: Amazon · Emerson
     (no note) · muted: true
  5. when: Expected 2027 · role: B.S. Software Engineering · org: Universidad Cenfotec
     (no note) · muted: true
  The dashes in `when` are en dashes (–), not hyphens.

ACCEPTANCE:
1. `npm run build` passes with 0 type and lint errors. No new dependencies.
2. Visual match with the variant, with no horizontal scrollbar at any width:
   - ≥1024px: 2 columns, minmax(0,7fr) | minmax(0,5fr), gap 96px, align
     start.
   - Bio: max-width 60ch, 24px between paragraphs. Paragraph 1 is
     text-primary, 1.375rem, line-height 1.5, letter-spacing -0.01em.
     Paragraphs 2–4 are text-secondary, 1.125rem, line-height 1.7.
   - Career: the "Career" label is an h3 in the label style (weight 400),
     24px above the list. The list is an <ol> with a 1px border-top. Each
     item has padding-block 24px, a 1px border-bottom and a grid gap of 4px.
     Its parts, in order:
     - `when`: label style, tabular numbers
     - `role`: 1.125rem, text-primary, 4px extra top margin
     - `org`: text-secondary
     - `note`: text-secondary, 0.9375rem, 8px top margin
     Muted items render the role in text-secondary at 1rem.
   - Below 1024px: one column, gap 64px; the bio max-width becomes 70ch.
   - Below 768px: section padding-block 64px, header margin-bottom 48px,
     grid gap 48px, bio paragraphs at 1rem, and paragraph 1 at 1.25rem.
   - The section header is the same style as Projects and Skills; the
     section has border-top 1px and padding-block 128px.
3. Semantics: section#about with aria-labelledby="about-title", and the h2
   has id about-title. Exactly one h3 ("Career") in the section. The career
   list is an <ol>. The nav link "About" scrolls to #about.
4. No Signal color anywhere in #about (no verified outcome metrics here;
   200K+ and 350+ are scope, rendered as plain text). Only weight 400 in
   #about.
5. Copy: the #about text matches EXACT COPY character for character. Don't
   render a note for items without one: no empty element.
6. Server-only: About.tsx has no "use client", and the "/" First Load JS
   stays ≤ 106 kB.
7. No regressions in Hero, Projects or Skills.
8. Don't commit.

DEADLINE: 30 minutes. If you're blocked for more than 10 minutes, report STATUS: blocked with a specific question.

Reply as STATUS / FILES CHANGED / VERIFICATION / NOTES.
```

---

## Grading rubric (Claude)

| # | Check | Method | Pass |
|---|---|---|---|
| A1 | Build is clean | `npm run build` and `next lint` | 0 errors; ≤ 106 kB |
| A2 | Layout | Playwright at 1440, 768 and 390, compared with variant 04 | Matches; `scrollWidth === innerWidth` |
| A3 | Copy fidelity | Diff the `#about` innerText against the variant | Identical |
| A4 | Signal and weights | Computed colors and weights in #about | No signal; weight 400 only |
| A5 | Semantics | h2 plus 1 h3, an ol, aria-labelledby; Lighthouse a11y | Structure correct; a11y ≥ 95 |
| A6 | Server-only | Grep for "use client"; build output | Absent; JS budget holds |
| A7 | Regressions | The Projects R3/R4 and Skills K2/K3 checks | Still pass |

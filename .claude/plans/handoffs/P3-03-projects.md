# P3-03 · Projects

**Status:** FAILED 2026-10-05. R3 (copy rewritten, including an invented "What broke" incident and the reinstated "manual spot checks" claim) and R2 (visual drift). Re-handed off as `P3-03b-projects-fix.md`.
**Reference variant:** `.claude/design-variants/02-projects/index.html`. Sandbox-checked at 1440, 768 and 390px on 2026-10-05, with no horizontal overflow at any width.
**Content source:** `.claude/plans/project-metrics.md`, "Confirmed card content". Every number below was confirmed by José.

---

## Handoff (paste everything inside the fence)

```
TASK: P3-03 Port the Projects section from sandbox variant 02 into src/

CONTEXT: Nav + Hero (P3-02) passed grading. This adds the Projects section that
follows it. DESIGN.md and PRODUCT.md are the contract: read them first, and
don't edit them. The reference is
.claude/design-variants/02-projects/index.html (plain HTML/CSS, no JS). Port its
look and markup structure. All copy and numbers are final for now. Copy them
exactly, and don't invent, round or add any metric. Copy stays EN only, in
src/content/en.ts.

FILES:
- src/content/en.ts: add a typed `projects` export and remove the `placeholders`
  export.
    type Proof = { value: string; label: string; verified: boolean };
    type Project = {
      id: string; title: string; stack: string[];
      problem?: string; built?: string;
      note?: { label: string; text: string };
      proof: Proof[];
      featured: boolean;
    };
  Content, in this order:
  1. personal-data-platform (featured): stack Python, DuckDB, Parquet; problem,
     built and the "What broke" note copied verbatim from the variant; proof
     2,600+ Transactions, 130+ Source files, 9 Integrity gates per run (all
     verified: false).
  2. validation-system (featured): stack Python, Polars, Pandas; problem and built
     verbatim; proof "6 h → 45 min" Audit run time (verified: true), "500K+"
     Records per audit (verified: false).
  3. etl-reporting (compact): stack Python, OAuth 2.0, SharePoint API; proof
     "80% less processing time" (verified: true).
  4. parts-normalization (compact): stack Python, PyQt6, Fuzzy matching; proof
     "4 h/week saved" (verified: true).
  5. workday-conversions (compact): stack SQL, EIB, HCM, Payroll, Benefits,
     Learning; proof "4 implementations" (verified: false).
  Also add the section strings: label "Projects", heading "Pipelines that check
  their own work.", and the link "Discuss a similar problem →" to #contact.
- src/components/Projects.tsx (server component, NO "use client"): renders the
  section header, the featured projects as `article` cards, and the compact
  projects as a `ul` of rows. Render from data, never hard-code per-project
  markup.
- src/app/page.tsx: replace the placeholder `section.next` with <Projects />
  inside <main>, after <Hero />.
- src/app/globals.css: port the variant's .projects / .case / .proof / .rows /
  .row / .projects__next rules and their 1023px and 767px breakpoints. Use the
  P3-01 tokens (var(--color-*)). No new color values. Remove the now-unused
  .next rules.

ACCEPTANCE:
1. `npm run build` passes with 0 type and lint errors. No new dependencies.
2. Visual match with the variant at 1440, 768 and 390px, with no horizontal
   scrollbar at any width:
   - Desktop: featured cards are 2 columns (narrative left, 280px proof column
     right) on surface-raised with an 8px radius; compact rows are a 3-column
     grid (title | stack | proof, proof right-aligned).
   - Below 1024px: cards go to one column with the proof items in a 3-up row;
     compact rows put the stack under the title and the proof on the right.
   - Below 768px: everything stacks, and the proof is left-aligned.
3. Signal discipline: proof items with verified: true render in
   signal-blue-text, and verified: false render in text-primary. That means
   exactly 3 signal-blue-text values on the page (6 h → 45 min, 80% less
   processing time, 4 h/week saved), plus the existing nav EN label. Nothing
   else in the section uses the Signal family.
4. The empty-proof rule: if a project's proof array is empty, its card or row
   renders the title and stack only, with no empty proof container, label or
   border. Verify by temporarily emptying one proof array, then revert it.
5. Semantics: the section is labelled by an h2 (id="projects-title") and keeps
   id="projects" (the nav anchors depend on it). Each project title is an h3.
   The featured problem/built pairs use a dl. Headings h2/h3 use weight 400.
   Only weights 400 and 600 exist in the whole app.
6. The section ships no client JS: Projects.tsx is a server component, and
   the "/" First Load JS doesn't grow by more than 1 kB versus P3-02
   (105 kB).
7. No #000, #fff, white or black, and no shadows, gradients or side-stripe
   borders anywhere in src/.
8. Don't commit.

DEADLINE: 45 minutes. If you're blocked for more than 10 minutes, report STATUS: blocked with a specific question.

Reply as STATUS / FILES CHANGED / VERIFICATION / NOTES.
```

---

## Grading rubric (Claude, against `npm run build && npm run start`)

| # | Check | Method | Pass |
|---|---|---|---|
| R1 | Build is clean | `npm run build` and `next lint` | 0 errors; `/` First Load JS ≤ 106 kB |
| R2 | Composition | Playwright screenshots at 1440, 768 and 390, compared with the variant | Layout matches; `scrollWidth === innerWidth` at every width |
| R3 | Copy fidelity | Diff the rendered text against the variant | Every string and number identical; nothing added |
| R4 | Signal discipline | Count elements whose computed color is signal-blue-text, inside `#projects` | Exactly 3, the verified ones |
| R5 | Empty-proof rule | Read Projects.tsx: proof rendering is guarded on `proof.length` | No empty container is possible |
| R6 | Semantics | Heading outline, plus Lighthouse a11y on `/` | 1 h1, h2 for Projects, 5 h3s; a11y ≥ 95 |
| R7 | Server-only | Grep for "use client" in Projects.tsx; check the build output | Absent; JS budget holds |
| R8 | Regressions | Re-run the P3-02 checks G2, G4, G8 and G9 | Still pass; LCP is still the hero h1 |

Any failure goes back as a re-handoff that names the failed R-numbers.

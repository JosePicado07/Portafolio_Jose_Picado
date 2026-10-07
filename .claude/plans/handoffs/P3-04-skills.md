# P3-04 · Skills (pipeline)

**Status:** FAILED 2026-10-05. K2 (tablet stays 4 columns; mobile dots are off-screen and the rail is missing), K6 (ProjectTitle widened to string) and the legend style. Re-handed off as `P3-04b-skills-fix.md`.
**Reference variant:** `.claude/design-variants/03-skills/index.html`. Sandbox-checked at 1440, 768 and 390px on 2026-10-05, with no horizontal overflow.

**Decisions made in this variant (Claude, reviewable by José):**
- **Dot rule:** a stage's dot is Signal Blue only when a verified outcome metric in Projects measures that stage.
  - Transform: "80% less processing time".
  - Validate: "6 h → 45 min".
  - Ingest and Serve stay grey.
- **Tool rule:** every tool line names a project that's on the site. Databricks and PySpark are left out, because their only proof is the academic Medallion project, which the site doesn't show.
- **Heading copy** "From raw source to an answer you can trust." is new and needs José's OK.

---

## Handoff (paste everything inside the fence)

```
TASK: P3-04 Build the Skills section (pipeline) from sandbox variant 03

CONTEXT: Projects (P3-03b) passed grading. Skills comes next. DESIGN.md §5
"Skills pipeline" is the contract: four stages, Ingest → Transform → Validate
→ Serve, joined by a 1px hairline with node dots. It is NOT an icon grid, and
it has no ratings, percentages or logos. The reference is
.claude/design-variants/03-skills/index.html (plain HTML/CSS, no JS). Port its
look and markup structure.
COPY RULE (same as P3-03b): every string below is a factual claim about José's
work. Copy it character for character. Don't paraphrase, shorten, reorder or
add tools.

FILES:
- src/content/en.ts: add a typed `skillsSection` and `stages` export.
    type Tool = { name: string; projects: string[] };
    type Stage = { id: string; number: string; name: string; desc: string;
                   proven: boolean; tools: Tool[] };
- src/components/Skills.tsx (server component, NO "use client"): renders from
  the data.
- src/app/page.tsx: add <Skills /> after <Projects /> inside <main>.
- src/app/globals.css: port the .skills / .pipeline / .stage / .tools / .tool
  / .legend rules and their 1023px and 767px breakpoints, plus a .sr-only
  utility. Use the P3-01 tokens only.

EXACT COPY:
skillsSection:
  label:   Skills
  heading: From raw source to an answer you can trust.
  legend:  Stage measured by a verified result in Projects
  provenSrText: (measured by a verified result)

stages (in this order):
1. id ingest · number 01 · name Ingest · proven false
   desc: Pull data out of systems that weren't built to share it.
   tools:
   - SharePoint API · OAuth 2.0          → [ETL Reporting Pipeline]
   - Legacy HR extracts: ADP, Dayforce, SAP → [Workday Conversions]
   - Bank portals, email, PDF and CSV parsing → [Personal Data Platform]
2. id transform · number 02 · name Transform · proven true
   desc: Reshape it to the target's rules, fast enough to rerun.
   tools:
   - Python · Polars · Pandas            → [Multi-Client Validation System]
   - Incremental loading                 → [ETL Reporting Pipeline]
   - SQL stored procedures               → [Workday Conversions]
   - DuckDB · Parquet                    → [Personal Data Platform]
3. id validate · number 03 · name Validate · proven true
   desc: Prove every load is right before anyone relies on it.
   tools:
   - Automated data-quality checks, anomaly detection → [Multi-Client Validation System]
   - Integrity gates, cent-level reconciliation → [Personal Data Platform]
   - Fuzzy matching                      → [Oracle Parts Normalization]
4. id serve · number 04 · name Serve · proven false
   desc: Land it where people already work.
   tools:
   - Power BI                            → [ETL Reporting Pipeline]
   - Workday loads: EIB, iLoad           → [Workday Conversions]
   - Compliance reports, PyQt6 desktop tools → [Multi-Client Validation System, Oracle Parts Normalization]
Render a tool's projects joined with " · ". The stage heading renders as
"{number} · {name}". Every project name must equal a `title` in `projects`:
enforce this with a type (e.g. derive a ProjectTitle union from `projects`) or
a build-time check, so a typo fails the build.

ACCEPTANCE:
1. `npm run build` passes with 0 type and lint errors. No new dependencies.
2. Visual match with the variant, with no horizontal scrollbar at any width:
   - ≥1024px: 4 columns (gap 32px). One hairline (1px, border color) runs
     across the full row through the dot centers. Dots are 9px circles: grey
     ones are field-black fill with a 1px border-color ring, proven ones are
     solid signal-blue. The stage text starts 24px below the dot.
   - 768–1023px: a 2×2 grid, row-gap 64px. The shared hairline is hidden;
     each stage instead gets its own hairline from its dot to its right edge.
   - <768px: one column with a 32px left padding. A vertical hairline runs
     down the left through the dots (the dots sit at left -32px, top 4px).
     The section padding-block is 64px.
   - Tool rows: a 1px hairline above the list and below each item,
     padding-block 12px; the tool name is text-primary, and the project names
     sit 4px below in the label style.
   - The stage desc is text-secondary, max-width 28ch on desktop and none on
     mobile.
   - The section header is the same style as Projects (label, then h2 clamp
     (2rem, 2.5vw + 1rem, 3rem), 20ch, 64px below; 48px below on mobile). The
     section has border-top 1px and padding-block 128px.
3. Semantics: section#skills with aria-labelledby="skills-title". The h2 has
   id skills-title. The stages are an <ol>, each stage name is an h3 (in the
   label style at weight 400; reset the browser's default bold), and the
   tools are a <ul>. Dots are aria-hidden. Each proven stage's h3 contains a
   visually-hidden span with provenSrText, so color is never the only signal.
4. Signal discipline: exactly 2 blue stage dots (transform, validate) plus
   the legend dot. No signal color on any text in #skills. Only weight 400 is
   used in #skills.
5. Data integrity: grep src/ for "Databricks", "PySpark", "%" and "★"
   inside the skills data: 0 matches. No skill ratings of any kind.
6. Server-only: Skills.tsx has no "use client", and the "/" First Load JS
   doesn't grow by more than 1 kB (it's 105 kB now).
7. No regressions: the Projects and Hero sections are unchanged; the nav link
   "Skills" now scrolls to #skills.
8. Don't commit.

DEADLINE: 45 minutes. If you're blocked for more than 10 minutes, report STATUS: blocked with a specific question.

Reply as STATUS / FILES CHANGED / VERIFICATION / NOTES.
```

---

## Grading rubric (Claude)

| # | Check | Method | Pass |
|---|---|---|---|
| K1 | Build is clean | `npm run build` and `next lint` | 0 errors; `/` First Load JS ≤ 106 kB |
| K2 | Layout | Playwright at 1440, 768 and 390, compared with variant 03 | Matches; `scrollWidth === innerWidth` |
| K3 | Copy fidelity | Diff the `#skills` innerText against the variant | Identical |
| K4 | Signal | Count the elements in #skills whose computed background is signal-blue | 3 (2 stage dots and the legend dot); no signal-colored text |
| K5 | Semantics and accessibility | Heading outline; check the sr-only text exists for the 2 proven stages; Lighthouse a11y | ol > li > h3 structure; a11y ≥ 95 |
| K6 | Type-safe project refs | Read the types in en.ts: Tool.projects must be typed as a union derived from the project titles (or checked at build time). Claude never edits src/ to test this. | A typo can't type-check |
| K7 | Server-only | Grep for "use client"; build output | Absent; JS budget holds |
| K8 | Regressions | Re-run the P3-03 R3/R4 and P3-02 G2/G9 checks | Still pass |

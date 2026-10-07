# P3-03b · Projects fix (re-handoff)

**Status:** ACCEPTED 2026-10-05. R1–R8 pass. The copy matches the variant word for word; the only difference is the Workday stack rendering with "·" separators (my handoff split it into items). Lighthouse: a11y 100/100, LCP 1.6s mobile / 0.4s desktop (the hero h1), CLS 0.

---

## Handoff (paste everything inside the fence)

```
TASK: P3-03b Fix Projects: restore the exact copy and match variant 02

CONTEXT: P3-03 failed grading. The structure is good (typed data, server
component, empty-proof guard, signal on verified values only): keep all of
that. Two things failed:
(1) The project copy was rewritten. This site's core rule is "verified or
    absent": every sentence is a factual claim about José's work, and a
    rewritten sentence is an invented claim. The current "What broke" text
    describes an incident that never happened, and the Validation problem
    text reintroduces "manual spot checks", a claim that was explicitly
    removed because it's unverified.
(2) Several styles drift from .claude/design-variants/02-projects/index.html.
Do NOT paraphrase, shorten, "improve" or reword any string below. Copy it
character for character.

FILES:
- src/content/en.ts: replace the copy of projects[0] and projects[1] with the
  exact strings below. Fix the title of projects[1].
- src/app/globals.css: fix the styles listed under ACCEPTANCE 3, and delete
  the leftover .next rules (both the base rule and the media-query rule).
- src/components/Projects.tsx: render the stack in the label style (see
  ACCEPTANCE 3). Use a single <dl> per card for Problem + Built, and keep the
  note as its own block with a hairline above it, as in the variant.

EXACT COPY:
projects[0] personal-data-platform
  title:   Personal Data Platform
  problem: Bank portal exports, emailed statements and PDFs, in different formats, with no single source of truth and no way to know when a number was wrong.
  built:   A Bronze → Silver → Gold pipeline on DuckDB and Parquet. Every run passes nine integrity gates, from cent-level reconciliation to income-cliff and stale-account checks. A chat interface answers questions through fixed SQL queries, so the model never does the arithmetic.
  note.label: What broke
  note.text:  Re-downloaded statements were tracked by file path, so fuller copies were silently skipped and a month's income read near zero, with no error. I re-keyed ingestion on content hashes and added the gate that would have caught it on day one.

projects[1] validation-system
  title:   Multi-Client Validation System
  problem: A compliance audit over more than 500,000 records took six hours per run.
  built:   A production audit system with automated data-quality validation, anomaly detection and a compliance reporting pipeline.

The proof values, stacks and the compact rows (projects[2..4]) are already
correct: leave them as they are.

ACCEPTANCE:
1. `npm run build` passes with 0 type and lint errors. No new dependencies.
2. Copy: every string in #projects matches EXACT COPY and the current proof
   values character for character. No other sentence exists in the section.
   Check: grep src/ for "spot check", "mismatched keys" and "reproducible":
   there are 0 matches.
3. Styles match the variant:
   - .case has NO border. It's a tonal surface only (surface-raised, 8px
     radius). Padding is 48px on desktop, 32px below 1024px and 24px below
     768px; the column gap is 64px on desktop.
   - The stack uses the label style: 0.75rem, uppercase, letter-spacing
     0.1em, text-muted, 12px below the title. This applies to both the cards
     and the rows.
   - The card title is 1.75rem on desktop and 1.5rem below 768px, weight 400.
   - The Problem/Built text is text-secondary, max-width 62ch, with 24px
     between the pairs.
   - The note sits 32px below, has padding-top 24px, a 1px border-top in
     border color, and text-secondary body text.
   - Proof items: each li has padding-top 16px and a 1px border-top in border
     color, with 24px between items. The value is 2rem, weight 400, tabular
     numbers (1.75rem below 768px), and the label sits 8px below.
   - Rows: margin-top 96px (64px below 768px); columns minmax(0,1fr)
     minmax(0,1fr) auto; align-items: baseline; padding-block 24px; the title
     is 1.25rem; the proof is 1.25rem, right-aligned, nowrap.
   - The section heading is clamp(2rem, 2.5vw + 1rem, 3rem), line-height
     1.15, max-width 20ch, weight 400, 16px below the label; the header has
     margin-bottom 64px (48px below 768px).
   - The "Discuss a similar problem →" link is text-secondary with a 1px
     border-bottom in border color, and turns text-primary on hover.
   - No font-weight other than 400 anywhere in #projects.
4. Everything that passed before still passes: the server component, the
   empty-proof guard, exactly 3 signal-blue-text values in #projects, no
   horizontal scroll at 1440, 768 or 390, and an h2 plus 5 h3s.
5. Don't commit.

DEADLINE: 30 minutes. If you're blocked for more than 10 minutes, report STATUS: blocked with a specific question.

Reply as STATUS / FILES CHANGED / VERIFICATION / NOTES.
```

---

## Grading (Claude)

Re-run P3-03 R1–R8. R3 is checked by extracting `#projects` innerText and diffing it against the variant's text.

# P3-04b · Skills fix (re-handoff)

**Status:** PARTIAL 2026-10-05. FIX 1, the FIX 2 dot positions, the FIX 3 legend and FIX 4 pass. The mobile rail (height stayed 1px) and the name→desc gap (24px, not 8px) are open and re-handed off as `P3-04c-skills-fix.md`.
**Passed and must be kept:** K1 (build, 105 kB), K3 (copy word for word, apart from the legend's case), K4 (exactly 3 blue dots, no blue text), K5 (ol/h3 structure, sr-only text on the 2 proven stages, weight 400 only), K7 (server-only).

---

## Handoff (paste everything inside the fence)

```
TASK: P3-04b Fix Skills: tablet/mobile layout, type-safe project refs, legend style

CONTEXT: P3-04 is close. The copy, signal discipline, semantics and
server-only rendering all pass, so don't touch them. Three things failed
grading against .claude/design-variants/03-skills/index.html. Fix only these.
Don't change any string.

FILES:
- src/app/globals.css (Skills rules only)
- src/content/en.ts (only the typing of `projects` and `ProjectTitle`)
- src/components/Skills.tsx (only the legend markup, if needed)

FIX 1 · Tablet layout (768–1023px) is still 4 columns
  The 2×2 rule exists in globals.css, but it isn't taking effect at 768px.
  Measured: the 4 dots sit at x = 24, 212, 400, 588, so there are 4 columns.
  Make it apply:
  - .pipeline is grid-template-columns repeat(2, minmax(0,1fr)), row-gap
    64px, column-gap 32px.
  - The shared .pipeline::before hairline is hidden.
  - Each .stage gets its own hairline (a .stage::before at top 4px, from
    left 9px to right 0, 1px, border color) that runs from its dot to its
    right edge.
  Check that no later rule overrides it (look at source order and
  specificity).

FIX 2 · Mobile (<768px): the dots are off-screen and the vertical connector is missing
  Measured at 390px: every dot is at x = -8px (clipped), and there's no
  vertical line. Cause: .stage__dot is position:absolute with left:-32px, but
  .stage isn't a positioned ancestor, and .pipeline has no left padding for
  the rail.
  Required:
  - .stage { position: relative }
  - .pipeline { padding-left: 32px }
  - .pipeline::before is visible as a VERTICAL hairline: top 4px, bottom 0,
    left 4px, width 1px, height auto, border color.
  - .stage__dot is position absolute, left -32px, top 4px. The dot's left
    edge then lands at the container gutter (24px from the viewport at
    390px), centered on the rail.
  - .stage::before is hidden on mobile.

FIX 3 · Spacing and legend
  - The stage description sits 8px below the stage name. It's ~24–48px now
    because of the .stage__head gap; the dot-to-name gap of 24px stays on
    desktop and tablet.
  - The legend text uses the label style: 0.75rem, uppercase, letter-spacing
    0.1em, text-muted. Gap to the dot is 12px.

FIX 4 · ProjectTitle is just `string` (the type check doesn't work)
  `export const projects: Project[] = [...] as const` widens every title to
  string, so ProjectTitle = string and a typo in a Skills project ref still
  compiles. Change the declaration so the literal titles survive, e.g.
    export const projects = [ ... ] as const satisfies readonly Project[];
  (adjust Project's array fields to readonly if needed). Then ProjectTitle
  must be the union of the 5 titles. Projects.tsx must still compile.

ACCEPTANCE:
1. `npm run build` passes with 0 type and lint errors, and "/" First Load JS
   stays ≤ 106 kB.
2. At 768px, #skills is 2×2: the dots of stages 1 and 3 share an x, and so
   do stages 2 and 4.
3. At 390px, every .stage__dot has getBoundingClientRect().left ≥ 16 and
   they all share the same x. A vertical 1px hairline runs through them
   down to the last stage. No horizontal scroll.
4. At 1440px, nothing changes from now.
5. In a scratch file, `const x: ProjectTitle = "Typo";` fails type-checking,
   while "Personal Data Platform" passes. Delete the scratch file afterwards.
6. The #skills text is unchanged; the legend renders uppercase through CSS
   only (the string stays as it is).
7. Don't commit.

DEADLINE: 30 minutes. If you're blocked for more than 10 minutes, report STATUS: blocked with a specific question.

Reply as STATUS / FILES CHANGED / VERIFICATION / NOTES.
```

---

## Grading (Claude)

Re-run K1–K8. Use the dot x-positions at 768 and 390 for K2. K6: read the `projects` declaration and the `ProjectTitle` type. Then run Lighthouse (a11y, LCP, CLS).

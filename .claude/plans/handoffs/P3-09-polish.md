# P3-09 · Polish pass: hero static fallback, first-paint gating, anchors, submit width

**Status:** PARTIAL 2026-10-06. Q1–Q4 and Q6–Q8 pass (poster path skips all 4 three.js chunks; deep link and reload instant; anchors 101px; submit widths correct). Q5 fails: poster lines render as solid blocks. Re-handed off as `P3-09b-poster-stroke.md`.
**Sources:**
- `motion-plan.md` §10 (follow-ups from the P3-08 grading)
- DESIGN.md §5 "Canvas box" and §6 Do's: a static fallback under reduced motion AND on low-power devices. **This isn't implemented today.** Reduced-motion users still download three.js to draw one frame, and low-power phones get the full animation.
- The P3-06b note: the submit button is full width at 768px. The cause is that `.btn--submit` is defined 3 times in globals.css (around lines 508–512, 609, 723).

**Lab expectation (honest):** Lighthouse's mobile emulation doesn't lower `hardwareConcurrency`/`deviceMemory`, so lab TBT on the capable path should stay about where it is (450–490ms). The gain is on real low-end phones and for reduced-motion users, who won't download three.js at all. That gets verified by emulating the low-power path, not by Lighthouse.

---

## Handoff (paste everything inside the fence)

```
TASK: P3-09 Polish: static hero poster (reduced motion + low-power), first-paint gating fix, remove scroll-margin, fix submit width at 768

CONTEXT: The site is built and committed. DESIGN.md requires the hero to show
a STATIC fallback of the same size under prefers-reduced-motion and on
low-power devices. Right now both still load three.js. Grading P3-08 also
turned up three small issues. Don't change copy, layout or any accepted
final state, apart from what's listed.

FILES:
- src/lib/conversion-flow.ts (NEW): the pure data module
- src/components/HeroScene.tsx: import the data from the module (no
  visual change)
- src/components/HeroPoster.tsx (NEW, server component): the SVG still
- src/components/Hero.tsx: render <HeroPoster/> inside the reserved box
- src/components/HeroCanvas.tsx: the mount decision
- src/app/layout.tsx: an inline <head> script that replaces next/script
- src/components/MotionObserver.tsx: in-view stamping (see 2)
- src/app/globals.css: poster rules, remove scroll-margin, dedupe
  .btn--submit

1 · STATIC HERO POSTER
  a) Move the scene's data generation out of HeroScene.tsx into
     src/lib/conversion-flow.ts as a PURE module (no three, no React):
     export the constants (ROWS, COLS, PER_CELL, GATE_X, TABLE_X0, CELL,
     ROW_H, SRC_X, SOURCES, REJECT_RATE, GHOSTS_PER_SOURCE) and a function
     buildRecords() returning plain arrays: { start:[x,y,z],
     target:[x,y,z], kind:0|1|2, status:0|1, delay }. Same seed (11), same
     order, same math, so HeroScene renders byte-identical to now.
  b) HeroPoster.tsx renders the FINAL frame as an inline <svg> (server-
     rendered, no JS), using buildRecords() from the module:
     - Front view: plot x and y only (ignore z and the group rotation).
       Flip y for SVG.
     - viewBox fitted to the scene bounds (sources' left edge to the table's
       right edge, the table top to the reject pile's bottom) plus 0.3 units
       of padding; preserveAspectRatio="xMidYMid meet"; width/height 100%.
     - Ghosts: circles r=0.018, fill var(--color-text-muted), opacity 0.16.
     - Rejects: circles r=0.02 at their target, fill var(--color-text-muted),
       opacity 0.3.
     - Landed valid records: squares 0.05×0.05 centered on the target, fill
       var(--color-text-secondary) (opacity 0.95). The status column
       (status=1) uses var(--color-signal-blue). Draw one square per cell
       (records with the same target overlap; dedupe by target).
     - Lines (stroke the same edge color the scene uses, as a CSS var,
       vector-effect="non-scaling-stroke", stroke-width 1): the gate from
       (GATE_X, ±(tableH/2+0.3)) and the table rule as in the scene.
     - aria-hidden="true", focusable="false". No hex literals; colors via
       var(--color-*).
     - Class .hero__poster, absolutely filling .hero__canvas.
  c) The mount decision (inline <head> script, see 2, sets the class):
     html.webgl-ok is added ONLY when ALL of these hold:
       - not prefers-reduced-motion
       - (navigator.hardwareConcurrency || 8) > 4
       - (navigator.deviceMemory || 8) > 4
       - !(navigator.connection && navigator.connection.saveData)
       - a WebGL context can be created (test with a throwaway canvas)
     CSS: html.webgl-ok .hero__poster { display:none }. Without webgl-ok
     (no JS, reduced motion, low power), the poster shows from first paint.
     HeroCanvas.tsx: if the html element lacks webgl-ok, render NOTHING
     (never import HeroScene, never call requestIdleCallback). Otherwise
     keep today's idle-mount exactly.

2 · FIRST-PAINT GATING (fixes the deep-link fade)
  Replace the next/script beforeInteractive with a plain inline script in
  <head> (in layout.tsx render <head><script dangerouslySetInnerHTML=…/>
  </head>), so it runs before first paint. It sets:
    - motion-ok ONLY IF: not reduced motion, AND location.hash is empty, AND
      the navigation type (performance.getEntriesByType('navigation')[0]
      ?.type) is not "reload" or "back_forward". (A deep link, refresh or
      back nav lands mid-page, and those must show final states instantly.)
    - webgl-ok per 1c.
  Keep the script tiny (< 600 bytes) and wrap it in try/catch so it can
  never throw.
  MotionObserver: before creating the observers, synchronously stamp
  data-in="true" on every target whose getBoundingClientRect() intersects
  the viewport. THEN observe the rest, THEN add motion-ready on the next
  animation frame.

3 · REMOVE scroll-margin-top from section[id]
  Sections already have 128px (desktop) / 64px (mobile) top padding, which
  clears the 64px nav. The margin made anchor jumps land the h2 about 189px
  below the nav. Keep html { scroll-behavior: smooth } (it's already
  disabled under reduced motion).

4 · SUBMIT WIDTH
  Delete every .btn--submit rule and keep exactly one pair:
    .btn--submit { width:100% }
    @media (min-width:768px) { .btn--submit { width:auto } }
  Make sure no later rule overrides it (check the 1023px block).

ACCEPTANCE:
1. `npm run build` passes with 0 type and lint errors. No new dependencies.
   "/" First Load JS ≤ 110 kB.
2. Capable path (default desktop and Lighthouse): the hero looks and
   animates exactly as now (P3-07 checks), and the poster is display:none
   from first paint, with no flash.
3. Low-power path (emulate hardwareConcurrency=2 via an init script):
   the poster is visible, there's NO <canvas> in .hero__canvas, and NO
   network request for the HeroScene/three.js chunk.
4. Reduced motion: the poster is visible, no canvas, no three.js request.
5. No-JS: the poster is visible (server-rendered SVG).
6. The poster matches the final animated frame's composition (three source
   clusters, gate line, 14×14 grid with a blue last column, the reject
   pile) at 1440 and 390px. It fits the reserved box with no layout shift
   (CLS 0).
7. Deep link /#projects and a reload mid-page: the in-view content shows
   instantly (opacity 1 on first sample), with no fade. Normal top-of-page
   loads still animate exactly as P3-08.
8. Anchor jumps: the h2 lands between 60 and 140px below the nav bottom
   (desktop).
9. Contact submit: auto width at 768 and 1440, full width at 390.
10. HeroScene still renders identically (same seed and data; capable-path
    screenshot unchanged).
11. Don't commit.

DEADLINE: 60 minutes. If you're blocked for more than 10 minutes, report STATUS: blocked with a specific question.

Reply as STATUS / FILES CHANGED / VERIFICATION / NOTES.
```

---

## Grading rubric (Claude)

| # | Check | Method | Pass |
|---|---|---|---|
| Q1 | Build | `npm run build`, `next lint` | 0 errors, ≤ 110 kB |
| Q2 | Capable path unchanged | P3-07 frame checks; poster computed display at t=0 | Same frames; poster none |
| Q3 | Low-power path | `addInitScript` overriding hardwareConcurrency=2; network log of JS chunks compared with the capable path | Poster visible, no canvas, HeroScene chunk not requested |
| Q4 | Reduced motion / no-JS | Emulated / JS disabled | Poster visible; no canvas or chunk |
| Q5 | Poster fidelity | Screenshots of the poster vs the final WebGL frame at 1440/390 | Same composition |
| Q6 | Deep link / reload | Sample the #projects h2 opacity from commit | 1 on the first sample |
| Q7 | Anchors | h2 top − nav bottom | 60–140px |
| Q8 | Submit width | 390 / 768 / 1440 | full / auto / auto |
| Q9 | Lighthouse | Mobile ×2 | No regression (TBT ≤ 490ms, LCP h1 ≤ 2.5s, CLS 0, a11y ≥ 95) |

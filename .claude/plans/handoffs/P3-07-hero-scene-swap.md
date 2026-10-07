# P3-07 · Hero scene swap: "conversion flow" (variant 05)

**Status:** ACCEPTED 2026-10-05. Matches variant 05 at 1440 (DPR 1 and 2) and 390 (DPR 2); canvas buffer matches the box (no 2x crop); idle rAF 0; h1 opacity 1 at first paint; reduced motion shows the final state immediately; survives navigate-away/back; no console errors; build 108 kB.
**Why:** the P3-02 scene (layered graph, 14→18→16→10→5 with edges between layers) reads as a neural network diagram. Variant 05 draws a data conversion instead: three messy sources → one validation gate → a clean table, with rejects dropping out and a blue status column.
**Reference:** `.claude/design-variants/05-hero-flow/index.html`. Its `<script type="module">` is the exact scene spec. The dithered variant 06 was NOT chosen.
**Scope:** only `src/components/HeroScene.tsx` (plus `globals.css` if the canvas sizing rule is missing). Everything else in the hero stays as accepted in P3-02.

---

## Handoff (paste everything inside the fence)

```
TASK: P3-07 Replace the hero 3D scene with the "conversion flow" from variant 05

CONTEXT: The current HeroScene (a layered graph with edges between layers)
reads as a neural network, which is the wrong message for a data engineer.
José approved a replacement:
.claude/design-variants/05-hero-flow/index.html. Its <script type="module">
is the exact spec. Port the SCENE into R3F inside the existing
src/components/HeroScene.tsx. Keep everything else from P3-02: HeroCanvas
(next/dynamic, ssr:false), the reserved box, frameloop="demand", reduced
motion, the IntersectionObserver gating, scroll rotation, disposal and
aria-hidden.

FILES:
- src/components/HeroScene.tsx (rewrite the scene contents)
- src/app/globals.css (ONLY if needed: `.hero__canvas canvas` must have
  width:100%; height:100%. A canvas without a CSS size renders at
  device-pixel size on scaled screens and gets cropped.)

PORT EXACTLY (values from the variant):
- Seeded RNG: seed 11, Park–Miller (seed*16807 % 2147483647);
  gauss = (r+r+r-1.5)/1.5.
- Table: ROWS 14, COLS 14, PER_CELL 2; TABLE_X0 0.2, CELL 0.24, ROW_H 0.2;
  target z = (k-0.5)*0.04.
- Sources (3): y 1.15 / 0.0 / -1.15, spread [0.75,0.30] / [0.9,0.24] /
  [0.65,0.32]; SRC_X -3.0; start z = gauss*0.8.
  Source index = (r*7 + c*3 + k) % 3.
- Gate: GATE_X -0.75. REJECT_RATE 0.05. Rejects land at
  (GATE_X+0.1+rand*0.5, -tableH/2-0.45-rand*0.3, gauss*0.2).
- Status column: non-reject records in the last column (c === COLS-1) have
  aStatus 1.
- Delay: min(0.45, max(0,(start.x-(SRC_X-1.2))/2.4)*0.12 + rand*0.33).
- Ghost residue: 70 per source, at (SRC_X+gauss*spread.x*1.2,
  y+gauss*spread.y*1.2, gauss*0.8); kind 2, static.
- Attributes: position(target), aStart, aDelay, aKind (0 valid / 1 reject /
  2 ghost), aStatus.
- Vertex shader: t = easeInOutSine(clamp((uProgress - aDelay)/0.55, 0, 1));
  a cubic bezier from aStart to target with c1 = (uGateX-1.1,
  mix(aStart.y, target.y, 0.55), aStart.z*0.3) and c2 = (uGateX+0.5,
  target.y, target.z). Ghosts stay at aStart.
  vLanded = smoothstep(0.7, 1.0, t) (0 for ghosts).
  vAlpha: ghost 0.16 · reject mix(0.6,0.25,vLanded) ·
  valid mix(0.5,0.95,vLanded).
  size: kind>0.5 → 2.6, else mix(2.8,3.4,vLanded) + vSignal*0.6;
  gl_PointSize = size * dpr * (16.0 / -mvPosition.z).
- Fragment shader: q = abs(pointCoord-0.5);
  d = mix(length(q)*1.06, max(q.x,q.y), vLanded);
  edge = 1 - smoothstep(0.38, 0.5, d); discard if edge<=0.
  Color: base = mix(raw, clean, vLanded * (kind==valid)), then
  mix(base, signal, vSignal). Alpha = vAlpha*edge. Transparent, no depth
  write, normal blending.
  (Round dots in flight, square cells once landed.)
- Colors from tokens: keep the existing readPalette() approach.
  raw = --color-text-muted, clean = --color-text-secondary,
  signal = --color-signal-blue, lines = the same edge color the current
  scene uses (border lifted toward the node color). No new hex literals.
- Lines: one LineSegments with 2 segments: the gate (GATE_X, ±(tableH/2+0.3),
  0) and the table rule from (TABLE_X0-0.12, tableH/2+0.18) to
  (TABLE_X0+(COLS-1)*CELL+0.12, tableH/2+0.18), z 0.
- Group: position.x -0.05; rotation (0.05, ROT0, 0) with ROT0 = -0.16.
  Scroll range 0.36 across the hero height, lerped at 0.08 per frame (same
  mechanism as now).
- Camera: fov 32; z = max(3.9/(tan(fov/2)*aspect), 1.9/tan(fov/2)) + 0.6.
- Load pass: LOAD_MS 3200 (was 2600). uSignal = clamp((p-0.8)/0.2, 0, 1).
- NO edges between points anywhere. Remove all of the old
  STAGES/dust/nearest-neighbour code.

ACCEPTANCE:
1. `npm run build` passes with 0 type and lint errors. No new dependencies.
   "/" First Load JS doesn't grow. Remove any now-unused code.
2. Visual match with variant 05 at 1440 and 390px, at DPR 1 and DPR 2:
   three source clusters on the left, a thin vertical gate line, a 14×14
   table with a header rule on the right, a blue last column, and a small
   reject pile under the gate. Nothing is cropped or scaled up on DPR 2
   screens.
3. Animation: one load pass of 3.2s. Records curve smoothly through the gate
   (no stop, no corner) and turn from round to square as they land. The
   status column turns blue only in the last 20%. Afterwards, NO idle
   animation (the rAF count over 2s is 0 when not scrolling).
4. Scroll turns the scene from -0.16 rad by +0.36 across the hero height.
5. prefers-reduced-motion: the final state renders on the first frame, with
   no load pass and no scroll coupling.
6. Everything P3-02 guaranteed still holds: hero text sharp on first paint,
   canvas box sized before JS (CLS 0), aria-hidden, WebGL disposed on
   unmount, no console errors.
7. Signal discipline: blue only on the status column. No #000/#fff/white/
   black in src/.
8. Don't commit.

DEADLINE: 45 minutes. If you're blocked for more than 10 minutes, report STATUS: blocked with a specific question.

Reply as STATUS / FILES CHANGED / VERIFICATION / NOTES.
```

---

## Grading rubric (Claude)

| # | Check | Method | Pass |
|---|---|---|---|
| H1 | Build | `npm run build`, `next lint` | 0 errors; `/` JS not larger |
| H2 | Visual | Screenshots at p≈0.45 / 1 at 1440 and 390, DPR 1 and 2, compared with variant 05 | Same composition; nothing cropped |
| H3 | Motion | Frame sequence during the load pass; rAF counter after settle | Smooth curves; idle rAF = 0 |
| H4 | Reduced motion | Emulated | Final state on the first frame |
| H5 | Regressions | The P3-02 G4/G6/G9/G10 checks and Lighthouse | Text sharp, CLS 0, LCP is the h1, disposal OK |

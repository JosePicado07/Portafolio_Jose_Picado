# P3-02 · Nav + Hero (DRAFT, not sent)

**Status:** held until P3-01 (scaffold) is graded and passes, per the user's instruction.
**Reference variant:** `.claude/design-variants/01-nav-hero/index.html`. Sandbox-graded at 390, 768 and 1440px on 2026-10-05.

---

## Handoff (send verbatim once P3-01 passes)

```
TASK: P3-02 Port Nav + Hero from sandbox variant 01 into src/

CONTEXT: The scaffold (P3-01) passed grading. This ports the approved Nav + Hero
variant into the app. DESIGN.md and PRODUCT.md are the contract: read them first
and don't edit them. The reference is
.claude/design-variants/01-nav-hero/index.html (a plain HTML/Three.js prototype).
Port its look and behavior. Don't copy its code style. Copy is EN only for now.
i18n wiring comes in a later task, so keep every string in one place
(src/content/en.ts) so it can be keyed later.

FILES:
- src/content/en.ts: nav labels, hero label/title/sub, CTA labels, URLs
  (calendar https://cal.com/jose-picado-uieppc/30min, CV /cv/CV_Jose_Picado_2026.pdf)
- src/components/Nav.tsx (client): sticky, 64px; the hairline border appears after
  8px of scroll; links Projects/Skills/About/Contact (anchors); the EN/ES group
  (aria-pressed, visual only for now); a CV ghost button with download. Below 768px
  the links and CV collapse into an inline disclosure panel (aria-expanded,
  aria-controls) toggled by a 40px menu button, NOT a modal. The panel closes on
  link click.
- src/components/Hero.tsx (server component): the label, h1, subhead, CTA row,
  and a reserved visual box. The h1 uses text-wrap: balance and max-width 15ch.
- src/components/HeroScene.tsx (client, R3F): loaded with next/dynamic
  { ssr: false } inside the reserved box. Port the variant's graph:
  - seeded RNG, STAGES [14,18,16,10,5], 420 dust points
  - nearest-neighbour edges (2 per node)
  - shader mix(aStart, target, easeOutQuart(local progress)), uniforms
    uProgress / uSignal
  - load pass 2600ms; uSignal ramps over the last 30%
  - scroll turns the group from -0.42 to +0.28 rad across the hero height, lerped
    at 0.08 per frame
  - camera fit: z = max(3.6/(tan(fov/2)*aspect), 2.0/tan(fov/2)) + 1.2, fov 32
  - frameloop="demand": invalidate() only during the load pass, on scroll, and
    while the rotation lerp settles. No idle animation.
  - ColorManagement disabled + LinearSRGBColorSpace output, so the hex colors
    match the variant
  - aria-hidden on the canvas wrapper
- src/app/page.tsx: <Nav/> then <main id="main"> with <Hero/>, plus a skip link
  as the first focusable element.
- src/app/globals.css: only the component classes you need. No new color values;
  use the P3-01 tokens.

ACCEPTANCE:
1. `npm run build` passes with 0 type and lint errors. No new dependencies beyond P3-01.
2. Visual match with the variant at 1440, 768 and 390px:
   - desktop is a 55/45 split, and the canvas bleeds to the viewport's right edge
     with NO horizontal scrollbar (overflow-x: clip on the hero)
   - below 1024px it's one column, with the canvas below the copy at 50vh
     (tablet) / 40vh (mobile)
   - the h1 is exactly 2 lines at every width
   - below 768px the primary CTA is full width
3. Text renders sharp and fully opaque on first paint: no opacity/blur/transform
   entrance on any text. Only the canvas animates.
4. prefers-reduced-motion: the canvas renders the final state once (uProgress=1,
   uSignal=1), with no load pass and no scroll coupling.
5. The canvas box has its final size before JS loads (CLS 0 from the hero).
6. The WebGL context is disposed on unmount. Navigating away and back must not
   leave a frozen tab.
7. Signal family only where DESIGN.md allows it: CTA fill = cta-blue, label =
   text-primary, active EN = signal-blue-text, focus ring and verified nodes =
   signal-blue. No #000/#fff/white/black anywhere in src/.
8. Keyboard: skip link → wordmark → links → EN → ES → CV → hero CTAs, with a
   visible signal-blue focus ring on each. The menu button works with
   Enter/Space and announces its expanded state.
9. Don't commit.

DEADLINE: 60 minutes. If you're blocked for more than 10 minutes, send STATUS: blocked with a specific question.

Reply as STATUS / FILES CHANGED / VERIFICATION / NOTES.
```

---

## Grading rubric (Claude, against `npm run build && npm run start`)

| # | Check | Method | Pass |
|---|---|---|---|
| G1 | Build is clean | `npm run build` output | 0 errors, 0 warnings that matter |
| G2 | Desktop composition | screenshot at 1440×900 | 55/45, canvas bleeds right, no h-scroll (`scrollWidth === innerWidth`) |
| G3 | Tablet / mobile | harness frames at 768 and 390 | single column; h1 = 2 lines; primary CTA full width at 390 |
| G4 | No text entrance motion | inspect computed styles at t=0 | h1/sub/CTA opacity 1, no filter, no transform |
| G5 | Scene behavior | screenshots at t=0.3s, t=3s, and after scrolling 50% of the hero | scatter → graph → verified blue; turns with scroll; idle = no rAF loop (check with a rAF counter over 2s) |
| G6 | Reduced motion | emulate prefers-reduced-motion | final state on first frame, no scroll coupling |
| G7 | Signal discipline | grep src/ for color literals plus a visual pass | only token vars; blue only on allowed elements |
| G8 | Keyboard + a11y | tab-through, plus Lighthouse a11y on `/` | order as specified, visible focus, Lighthouse a11y ≥ 95 |
| G9 | Performance | Lighthouse performance on `/` | LCP < 2.5s (the h1 is the LCP), CLS < 0.1 |
| G10 | Context disposal | navigate away and back in the same tab, then screenshot | the tab stays responsive |

Any failure goes back to OpenCode as a handoff that names the failed G-number(s).

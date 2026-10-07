# P3-08 · Site motion (per motion-plan.md)

**Status:** ACCEPTED 2026-10-05. M1 build 108 kB, no gsap/lenis imports. M2 final states identical (verified BBB, dots oBBo, 37/37 data-in). M3 no-JS fully visible. M4 reduced motion final, 0 transitions. M5 primary→BLUE after draw; dots ____→o___→oBBo. M6 no replay, idle rAF 0. M7 nav spy correct, none in hero. M8 h2 visible after anchor jumps. M9 TBT 450–490ms (was 530–620), LCP 1.6–1.7s (h1), CLS 0, a11y 100. Follow-ups are in motion-plan.md §10.
**Spec:** `.claude/plans/motion-plan.md`. It's the full rationale; the handoff below is self-contained.
**Baseline to beat:** mobile Lighthouse TBT 530–620ms (the three.js chunk is a ~380ms long task), LCP 1.6–1.8s (the h1), CLS 0, `/` First Load JS 108 kB.

---

## Handoff (paste everything inside the fence)

```
TASK: P3-08 Add the site's motion layer: reveals, hairline draws, signal-after-check, nav indicator, reduced-motion, hero idle-mount

CONTEXT: Every section is built and accepted. This adds motion, and nothing
else. The spec is .claude/plans/motion-plan.md (read §2–§6). The one idea:
things settle into place, and Signal Blue appears only after its check
"passes" (this echoes the hero, where records land and then the status
column turns blue). Use CSS transitions plus ONE IntersectionObserver
component. Do NOT import GSAP, ScrollTrigger or Lenis. Don't change any
copy, layout or final visual state: once motion finishes, every section
must look exactly as it does now.

FILES:
- src/app/globals.css: the motion tokens, [data-*] rules, scroll-margin and
  the reduced-motion block.
- src/app/layout.tsx: an inline <script> in <head> that adds the
  `motion-ok` class to <html>, plus <MotionObserver/> in <body>.
- src/components/MotionObserver.tsx (NEW, "use client", ≤ ~1 kB of logic).
- src/components/Nav.tsx: the active-section indicator plus aria-current.
- src/components/HeroCanvas.tsx: the idle-mount.
- Projects.tsx, Skills.tsx, About.tsx, Contact.tsx, ContactForm.tsx,
  WhatsAppFloat.tsx: ADD data attributes and an inline --i only. No
  structural changes.

1 · TOKENS (globals.css :root)
  --motion-micro:150ms; --motion-ui:250ms; --motion-reveal:450ms;
  --motion-draw:700ms; --ease-draw:cubic-bezier(0.16,1,0.3,1);
  --reveal-shift:12px; --stagger:60ms.
  Keep the existing --motion-ease (quint) as the default ease. Normalize the
  nav hairline transition from 300ms to var(--motion-ui). No other
  durations or curves in the site's CSS (the hero scene keeps its own
  constants).

2 · GATING (no-JS and reduced-motion safe)
  In layout.tsx <head>, put this inline script before any CSS-dependent
  paint:
    if (!matchMedia('(prefers-reduced-motion: reduce)').matches)
      document.documentElement.classList.add('motion-ok');
  ALL "initial hidden" states are scoped to html.motion-ok. Without that
  class (no JS, or reduced motion), everything renders final.

3 · MotionObserver.tsx
  - One IntersectionObserver for every element with [data-reveal],
    [data-draw] or [data-signal-group]. threshold 0.15 (0.25 for
    [data-draw-group] containers); rootMargin "0px 0px -10% 0px".
  - On intersect: set data-in="true" and unobserve. Never remove data-in
    (nothing replays).
  - Elements already in view at mount get data-in immediately, BEFORE
    adding `motion-ready` to <html>. Transitions only apply under
    html.motion-ok.motion-ready, so nothing animates on a refresh mid-page.
  - A second observer for the nav spy (see 6).

4 · REVEALS (data-reveal)
  CSS: html.motion-ok [data-reveal]:not([data-in]) { opacity:0;
  transform:translateY(var(--reveal-shift)); }. With motion-ready,
  transition opacity and transform over var(--motion-reveal)
  var(--motion-ease), with delay calc(var(--i,0) * var(--stagger)).
  Apply to:
  - Projects, Skills, About, Contact: the section label (--i:0) and h2
    (--i:1).
  - Projects: each featured .case (--i = its index, max 1).
  - Skills: each stage's text block, revealed when its dot appears (see 6).
  - About: the .bio block as ONE element (no per-paragraph stagger).
  NEVER on anything inside .hero.

5 · HAIRLINE DRAWS + SIGNAL AFTER CHECK
  Hairlines that draw must move from `border-top` to a ::before pseudo
  (height 1px, background var(--color-border), transform-origin left, or
  top for vertical). The FINAL look must be pixel-identical to today.
  - Projects featured proof items (.proof-item): data-draw="x", --i =
    index; staggered 80ms (use calc(var(--i)*80ms)).
  - Projects compact rows (.row): data-draw="x" on each row's top hairline,
    --i = index (60ms).
  - About career items (.arc__item): data-draw="x", --i = index.
  Hidden state: html.motion-ok [data-draw]:not([data-in])::before
  { transform:scaleX(0) }. Animate over var(--motion-draw) var(--ease-draw).
  SIGNAL AFTER CHECK: verified proof values (proof-value--verified and
  row__proof--verified) render in text-primary until their draw element has
  data-in. Then they transition to var(--color-signal-blue-text) over
  var(--motion-micro), delayed until the draw finishes (delay = draw delay
  + var(--motion-draw)). Scope values never change color. In the final
  state the verified values are signal-blue-text exactly as now.

6 · SKILLS PIPELINE RUN
  The .pipeline is the trigger (data-draw-group, threshold 0.25).
  - Connector: ≥1024px, the shared ::before draws with scaleX (origin left);
    <768px, the vertical rail draws with scaleY (origin top); 768–1023px,
    each stage's own ::before draws, staggered by stage index. All use
    var(--motion-draw) var(--ease-draw).
  - Dots: opacity 0→1 over var(--motion-micro) at 0 / 33 / 66 / 100% of
    the draw (delays 0, 230, 470, 700ms).
  - Proven dots (transform, validate): start as the grey dot, then fill with
    signal-blue ~150ms after they appear (background and border-color over
    var(--motion-micro)).
  - Each stage's text block (label, desc, tools) reveals with its dot's
    delay (data-reveal + the matching delay). The tool rows are not
    individually staggered.

7 · NAV ACTIVE-SECTION INDICATOR (desktop links ≥768px)
  - One absolutely positioned 1px bar under .nav__links, in
    var(--color-signal-blue). Its position and width come from the active
    link (transform: translateX(x) scaleX(w); transform-origin left; base
    width 1px). It slides over var(--motion-ui) var(--motion-ease).
  - Spy observer on section#projects/#skills/#about/#contact with rootMargin
    "-40% 0px -55% 0px". The visible one sets that link's
    aria-current="true" (all others removed). With no section active (the
    hero is in view), the bar is opacity 0.
  - The mobile menu panel links get aria-current too, with no bar.

8 · SMALL INTERACTIONS
  - html { scroll-behavior: smooth } and section[id] { scroll-margin-top:
    calc(var(--nav-height) + 24px) }.
  - Mobile menu panel: on open, opacity 0→1 + translateY(-8px)→0 over
    var(--motion-ui); on close, the reverse over 150ms, THEN set hidden (on
    transitionend, with a 200ms fallback timer). It stays a disclosure
    (aria-expanded unchanged).
  - Floating WhatsApp: hide/show with opacity plus a visibility transition
    (visibility delayed on hide) over var(--motion-ui), instead of the
    instant toggle.
  - Error text (.field__error): opacity 0→1 over var(--motion-micro) when
    its text becomes non-empty. Invalid border-color over
    var(--motion-micro). No shake, no slide.
  - Form status line: opacity 0→1 over var(--motion-ui) when it changes.
  - Primary buttons: :active { transform: scale(0.98) } over 100ms. No
    bounce, no overshoot curves anywhere.
  - Focus rings: NO transition.

9 · HERO IDLE-MOUNT (performance)
  In HeroCanvas.tsx, keep rendering the reserved .hero__canvas box
  immediately, and only render <HeroScene/> after
  requestIdleCallback(cb, { timeout: 1200 }) fires (fallback
  setTimeout(cb, 200) where rIC is missing). Nothing else in the hero
  changes; the scene's own load pass starts on mount as now.

10 · REDUCED MOTION (globals.css)
  @media (prefers-reduced-motion: reduce) {
    html { scroll-behavior: auto }
    /* the motion-ok class is never added, so all data-* elements are
       already final */
    *, *::before, *::after { transition-duration: 0ms !important;
                             animation: none !important; }
    /* restore color/opacity feedback: */
    a, button, .field__input, .field__error {
      transition-property: color, background-color, border-color, opacity !important;
      transition-duration: var(--motion-micro) !important; }
  }
  The nav bar jumps (no slide); the menu and float button switch
  instantly; the hero is unchanged (it already renders the final state).

ACCEPTANCE:
1. `npm run build` passes with 0 type and lint errors. No new dependencies.
   GSAP/Lenis aren't imported anywhere. "/" First Load JS ≤ 110 kB.
2. FINAL STATE IDENTICAL: after all motion settles, Projects, Skills, About
   and Contact are pixel-identical to the accepted P3-03b/04c/05b/06b
   renders at 1440, 768 and 390px. Verified values are signal-blue-text;
   the Transform/Validate dots are signal-blue.
3. JS disabled: every section is fully visible and fully drawn, with no
   hidden elements.
4. Reduced motion: final states on first paint; no transform or opacity
   transitions on [data-*] elements.
5. Hero: no motion on text (h1/sub/CTA opacity 1 and transform none at t=0).
   The LCP element is still the h1. CLS is 0.
6. Once: scrolling down then back up never replays a reveal, draw or
   signal. After everything has revealed, idle rAF = 0 over 2s.
7. Nav: scrolling through each section sets aria-current on the matching
   link and moves the bar under it. In the hero, no link is current and the
   bar is hidden.
8. Anchors: clicking "Projects" (and the others) lands with the section's
   h2 fully visible below the 64px nav.
9. Report mobile Lighthouse TBT before/after the idle-mount (or say if you
   can't run Lighthouse; Claude measures either way). There must be no
   regression from 530–620ms.
10. Don't commit.

DEADLINE: 90 minutes. If you're blocked for more than 10 minutes, report STATUS: blocked with a specific question.

Reply as STATUS / FILES CHANGED / VERIFICATION / NOTES.
```

---

## Grading rubric (Claude)

| # | Check | Method | Pass |
|---|---|---|---|
| M1 | Build and budget | `npm run build`, `next lint`, grep for gsap/lenis imports | 0 errors; `/` ≤ 110 kB; no imports |
| M2 | Final state | After scrolling the full page and waiting 2s: screenshots + innerText at 1440/768/390, compared with the accepted renders | Identical |
| M3 | No-JS | Playwright, javaScriptEnabled:false | All content visible; hairlines drawn |
| M4 | Reduced motion | Emulated; computed styles at t=0 on [data-*] | Final state; no transitions |
| M5 | Choreography | Frame captures at 0 / 300 / 800ms after Projects and Skills enter | Draw → then blue; dots in sequence |
| M6 | Once + idle | Scroll down/up; rAF counter | No replay; idle rAF 0 |
| M7 | Nav spy | aria-current per section; bar position | Correct; hidden in hero |
| M8 | Anchors | Click each nav link; h2 rect.top vs nav bottom | h2 fully visible |
| M9 | Performance | Lighthouse mobile ×2 (warm) | TBT no regression (target < 300ms); LCP h1 ≤ 2.5s; CLS 0 |
| M10 | Hero untouched | The P3-07 frame checks | Unchanged |

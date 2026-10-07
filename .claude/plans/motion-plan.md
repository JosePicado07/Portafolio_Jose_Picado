# Motion Plan: Portfolio v2

Written 2026-10-05 with the `motion-design` skill. (Impeccable's `/animate` was requested, but Impeccable isn't installed: the `.claude/skills/animate` and `impeccable` entries point at a Windows `.agents/` folder that no longer exists.)
**Handoff:** `handoffs/P3-08-motion.md`.
**Contract:** DESIGN.md (scroll-driven, nothing decorative or idle, ease-out quart/quint/expo, no bounce, hero text sharp on first paint, static reduced-motion fallbacks) and PRODUCT.md, principle 4 "Calm over clever".
**State today (commit b3c97ae):**
- Motion is the hero scene, plus 200–300ms hover and color transitions.
- GSAP, ScrollTrigger and Lenis are installed but imported nowhere, so they ship 0 bytes.
- There's no global reduced-motion CSS and no `scroll-margin` for the sticky nav.

---

## 1. Motion principles

1. **Motion only marks a check passing.** The site's one idea, "The Validated Signal", gets one motion idea: things settle into place, and the Signal color lights up only after its structure is in place. The hero does this already (records land, then the status column turns blue). Every other motion on the page is a smaller echo of it.
2. **It never moves on its own.** Every animation is caused by load (once), entering the viewport (once), or user input. Nothing loops, idles or replays on scroll-up.
3. **Content is never hostage.** Text is readable without JS, before JS, and with reduced motion. Reveals only add a short settle; they never gate visibility.
4. **Transform and opacity only.** No animated height, width, top or margin. Hairline "draws" use `transform: scaleX/scaleY`.
5. **Short and quiet.** Nothing over 700ms; most under 450ms. The hero's 3.2s load pass is the one exception, and it's already approved.

## 2. Tokens (add to globals.css `:root`)

| Token | Value | Use |
|---|---|---|
| `--motion-micro` | 150ms | Errors appearing, color changes on state |
| `--motion-ui` | 250ms | Hover, menu panel, float button, nav indicator |
| `--motion-reveal` | 450ms | Section and element settle on enter |
| `--motion-draw` | 700ms | Hairline connectors drawing in |
| `--ease-out` (existing `--motion-ease`) | `cubic-bezier(0.22, 1, 0.36, 1)` (quint) | Default for everything |
| `--ease-draw` | `cubic-bezier(0.16, 1, 0.3, 1)` (expo) | Hairline draws |
| `--reveal-shift` | 12px | The only travel distance used |
| `--stagger` | 60ms | Between siblings, max 6 steps (then 0) |

No other durations or curves anywhere. The hero scene keeps its own (approved) constants.

## 3. Interaction inventory

Each item notes its role (feedback / orientation / hierarchy / continuity / brand) and whether it's NEW.

### Global
| # | Element | Trigger | Motion | Role |
|---|---|---|---|---|
| G1 | Anchor navigation (nav links, "See the work", "Discuss a similar problem") | click | Native `scroll-behavior: smooth` on `html`, plus `scroll-margin-top: calc(var(--nav-height) + 24px)` on every `section[id]`. **NEW. This also fixes headings hiding under the sticky nav.** | orientation |
| G2 | Section reveal: label + h2 of Projects, Skills, About and Contact | enters the viewport (15% visible), once | opacity 0→1, translateY 12px→0, `--motion-reveal`; the h2 follows the label after `--stagger` | hierarchy |
| G3 | Focus ring | focus | **None** (instant). Focus must never lag. | feedback |

### Nav
| # | Element | Trigger | Motion | Role |
|---|---|---|---|---|
| N1 | Hairline under the nav (exists) | scroll > 8px | border-color fade 300ms → normalize to `--motion-ui` | orientation |
| N2 | **Active-section indicator** (NEW, already called for by DESIGN.md "active nav indicator") | the section currently in view (IntersectionObserver, rootMargin "-40% 0px -55% 0px") | One 1px Signal Blue bar under the active link. It **slides** between links with `transform: translateX() scaleX()`, `--motion-ui`. Hidden while the hero is in view. Also sets `aria-current="true"` on that link. | orientation |
| N3 | Mobile menu panel (exists, instant) | toggle | opacity 0→1 + translateY -8px→0, `--motion-ui`; close is the reverse at 150ms. It stays a disclosure (`hidden` toggled after the close transition ends). | continuity |

### Hero (exists, approved; refinements only)
| # | Element | Trigger | Motion | Role |
|---|---|---|---|---|
| H1 | Text and CTAs | none | **No motion, ever.** Sharp on first paint (LCP is the h1). | n/a |
| H2 | Conversion-flow load pass | canvas mounts | Unchanged (3.2s). **Refinement:** mount the scene after `requestIdleCallback` (timeout 1200ms) instead of immediately. See performance §7. | brand |
| H3 | Scroll turn | scroll through the hero | Unchanged (-0.16 → +0.20 rad, lerp 0.08) | continuity |

### Projects: "the check passes, then the signal lights"
| # | Element | Trigger | Motion | Role |
|---|---|---|---|---|
| P1 | Featured case cards | enter, once | opacity + 12px settle, `--motion-reveal`; the 2nd card is staggered 60ms | hierarchy |
| P2 | **Proof hairlines** (the 1px border-top above each proof value) | the card's proof column enters | Each hairline draws in left→right (scaleX 0→1, origin left, `--motion-draw`, `--ease-draw`), staggered 80ms | brand |
| P3 | **Verified values** (6 h → 45 min, 80% less processing time, 4 h/week saved) | after their hairline finishes drawing | color text-primary → signal-blue-text, `--motion-micro`. **Only the verified values, only once.** Scope values (2,600+, 500K+ …) never change color. This is the hero's status column, in miniature. | brand |
| P4 | Compact rows | enter | Each row's top hairline draws (scaleX, `--motion-draw`), staggered 60ms; the text doesn't move. The verified value lights as in P3. | hierarchy |
| — | Number count-ups | — | **Rejected.** Counting animations invent intermediate values and read as template. The numbers are static text. | — |

### Skills: the pipeline runs once
| # | Element | Trigger | Motion | Role |
|---|---|---|---|---|
| S1 | Connector hairline | the pipeline enters (25% visible), once | Draws in the flow direction: scaleX left→right on desktop, scaleY top→bottom on mobile, `--motion-draw`, `--ease-draw`. Tablet (2×2): each stage's own hairline draws, staggered by stage. | orientation |
| S2 | Stage dots | as the drawn line reaches each dot | Dot opacity 0→1 (`--motion-micro`) at 0 / 33 / 66 / 100% of the draw | continuity |
| S3 | **Proven dots** (Transform, Validate) | after they appear | border-color → signal-blue fill, `--motion-micro`, about 150ms after appearing. The pipeline "passes" those two stages. | brand |
| S4 | Stage text and tool lists | the stage's dot appears | opacity + 12px settle, `--motion-reveal`; tool rows inside are not staggered (one block) | hierarchy |

### About
| # | Element | Trigger | Motion | Role |
|---|---|---|---|---|
| A1 | Bio paragraphs | enter | opacity + 12px settle, one block (no per-paragraph stagger). It's reading text; keep it still. | hierarchy |
| A2 | Career list items | enter | top hairlines draw (as P4), staggered 60ms (5 items = 240ms) | continuity |

### Contact
| # | Element | Trigger | Motion | Role |
|---|---|---|---|---|
| C1 | Error text | it appears or changes | opacity 0→1, `--motion-micro`. **No shake, no slide.** | feedback |
| C2 | Invalid border | aria-invalid | border-color, `--motion-micro` | feedback |
| C3 | Submit "Sending…" | submit | Text swap only (instant) + `aria-busy`. No spinner. | feedback |
| C4 | Success / sendError status | resolves | opacity 0→1, `--motion-ui` | feedback |
| C5 | Floating WhatsApp hide/show (instant today) | enters/leaves #contact | opacity + `visibility` with a delayed visibility transition, `--motion-ui` | continuity |
| C6 | Calendar CTA | hover/press | background-color only (exists); `:active` → `transform: scale(0.98)` for 100ms. Never bounce. | feedback |

## 4. Scroll and viewport rules

- **One observer, one attribute.** Elements opt in with `data-reveal` (settle), `data-draw="x|y"` (hairline) or `data-signal` (light after draw). A single client component, `MotionObserver` (~1 kB), observes them once, sets `data-in="true"` and unobserves. CSS does all the animating. Sections stay server components.
- **Thresholds:** reveals at 15% visible; pipeline and proof columns at 25%. `rootMargin: "0px 0px -10% 0px"` so things settle slightly before center.
- **Once only:** nothing re-animates on scroll-up or re-entry.
- **Above the fold at load:** anything already visible when the observer starts gets `data-in` with no transition (add a `motion-ready` class only after the first observer callback), so nothing animates on refresh mid-page.
- **No scroll-linked scrubbing outside the hero.** Only the hero's group rotation follows scroll position. Everything else is triggered, not scrubbed.
- **Smooth scrolling:** native CSS only. **Lenis: recommend NOT adding it** (decision for José):
  - It hijacks wheel and touch input, which fights reading and assistive tech.
  - It adds JS to an already-tight mobile main thread.
  - The plan has no scrubbed sequences that would need it.
- **GSAP/ScrollTrigger: not needed** for this plan. Everything is CSS transitions plus one IntersectionObserver. They stay installed but unimported (0 bytes). Removing them from package.json is optional cleanup (a dependency change, so OpenCode does it if José wants).

## 5. Reduced-motion plan (`prefers-reduced-motion: reduce`)

Add one global block to globals.css:
- `html { scroll-behavior: auto; }`
- `[data-reveal], [data-draw], [data-signal]` render in their **final state** immediately: no opacity, transform or scale animation. Hairlines are drawn, dots are present, and verified values are already Signal Blue Text.
- Every remaining transition is capped at `--motion-micro` and limited to color and opacity (hover, focus, error feedback still work).
- Nav indicator: jumps between links (no slide).
- Menu panel and float button: instant show/hide.
- Hero: unchanged (already renders the final state, no scroll coupling).
- `MotionObserver` still runs, so `aria-current` updates, but it applies no classes that animate.

**No-JS / pre-hydration:** the hidden initial state applies only under `html.motion-ok`. A tiny inline script in `layout.tsx` adds that class before paint, and only when JS runs and reduced motion is off. Without it, everything renders final.

## 6. Implementation notes (for the handoff)

- **New files:** `src/components/MotionObserver.tsx` (client; reveal and nav-spy observers) and `src/components/NavIndicator` (or a hook inside Nav.tsx).
- **Changed:** `globals.css` (tokens, `[data-*]` rules, reduced-motion block, scroll-margin), `layout.tsx` (inline `motion-ok` script and `<MotionObserver/>`), and the section components (add the data attributes only, with no structural changes).
- **CSS sketch (the pattern, not final code):**
  - `html.motion-ok [data-reveal]:not([data-in]) { opacity:0; transform:translateY(var(--reveal-shift)); }`
  - `[data-reveal] { transition: opacity var(--motion-reveal) var(--ease-out), transform var(--motion-reveal) var(--ease-out); transition-delay: calc(var(--i,0) * var(--stagger)); }`
  - `html.motion-ok [data-draw="x"]:not([data-in])::before { transform:scaleX(0); }`, with the hairlines moved to a `::before` pseudo-element so they can scale.
  - `[data-signal][data-in] { color: var(--color-signal-blue-text); transition-delay: var(--motion-draw); }`
- **Stagger index** via an inline style `--i`, set from the map index in components (cap at 5).
- **Hero idle mount:** in HeroCanvas, render the reserved box immediately, and set `ready=true` in `requestIdleCallback(…, { timeout: 1200 })` before rendering `<HeroScene/>`.
- **Testing hooks:** keep `data-in` visible in the DOM so grading can assert final states.

## 7. Performance risks

| Risk | Impact | Mitigation |
|---|---|---|
| The three.js chunk is a ~380ms long task on mobile (Lighthouse, 2026-10-05) | TBT 530–620ms; mobile perf in the 80s | Idle-mount the hero scene (H2). Expected: the long task moves after interactivity and TBT drops. Measure before and after. |
| Reveals hiding LCP content | LCP regression | The hero is excluded from all reveals (H1); LCP stays the h1. |
| Hidden-then-shown content causing CLS | CLS > 0 | Transform/opacity only; layout boxes never change size. |
| Many observers | Main-thread cost | One shared observer for reveals and one for nav-spy; unobserve after `data-in`. |
| Hairline pseudo-element refactor breaking borders | Visual regressions in Projects, Skills and About | Grade against the accepted screenshots (final state must be pixel-identical to today). |

## 8. Decisions (José: "up to you", 2026-10-05, so the recommendations stand)

1. **Lenis smooth scroll: NO.** Native smooth anchor scrolling only.
2. **The "signal lights after the check" moment (P3/S3): YES.**
3. **Nav active-section indicator (N2): YES.**

## 9. Acceptance (for grading the implementation)

- The final visual state of every section is pixel-identical to the accepted screenshots.
- With reduced motion: zero transform/opacity animations; final states on first paint.
- No-JS (JS disabled): all content visible and fully drawn.
- No animation on hero text; LCP is still the h1; CLS 0.
- Idle rAF = 0 after all reveals finish; nothing replays on scroll-up.
- Mobile TBT measured before/after the idle-mount; target < 300ms (stretch), no regression (hard).
- `aria-current` follows the visible section; anchor jumps land with the heading visible below the nav.

## 10. Follow-ups after P3-08 grading (2026-10-05, for the Gate 3 polish pass)

- **Deep link `/#projects`:** the in-view heading fades in (~0.5s) instead of appearing instantly. The cause is that the `motion-ok` script runs through next/script `beforeInteractive` (queued in the body), not inline in `<head>`. Fix: render a plain inline `<script>` in `<head>`, and have the observer stamp in-view elements before adding `motion-ready`.
- **scroll-margin is too generous:** anchor jumps land the h2 about 189px below the nav. The original concern was wrong, because sections already have 128px top padding, which clears the 64px nav. Fix: remove `scroll-margin-top` (or set it to 0).
- **The three.js long task (~370–400ms on mobile) is still there.** The idle-mount moved it and trimmed TBT to 450–490ms, short of the < 300ms target. Next steps to evaluate: mount the scene only when the hero canvas is visible AND idle; check that the bundle imports only the three modules it uses; consider a static poster frame on low-power devices (DESIGN.md already allows a static fallback).

## 11. Reported by José (2026-10-06): section animations don't play

- **Symptom:** none of the Projects, Skills, About or Contact animations play in José's browser.
- **CONFIRMED cause (2026-10-06):** the P3-09 head-script rule. A fresh load animates (opacity 0→0.48→0.84→1) and a reload doesn't (1→1→1). The fix is `handoffs/P3-10-reload-motion.md`.
- **Original note:** the P3-09 head-script rule. `motion-ok` is skipped when `location.hash` is set or when the navigation type is `reload` or `back_forward`. Verified in headless: a fresh navigation gets motion-ok=true, a reload gets false. Reviewing with F5, or via `/#section` links, therefore disables every section animation.
- **Ruled out:** the OS reduced-motion setting (José's hero 3D animates) (Windows "Animation effects" off). In that case the hero also shows the static poster, and the site is behaving as designed.
- **Proposed fix (next handoff):** drop the `reload`/`back_forward` exclusion. Keep the hash exclusion only if needed, and rely on MotionObserver's synchronous in-view stamping so restored mid-page content isn't hidden. Re-verify with: fresh load, F5 at the top, F5 mid-page, a `/#projects` deep link, and back/forward.

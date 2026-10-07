# P3-17 · Motion round 2 + blank mobile hero fix

**Status:** OPEN 2026-10-06. Plan approved by José (level: Calm). Plan: `~/.claude/plans/great-lets-think-on-scalable-hamster.md`.
**Facts so far (Claude):**
- **Regression from P3-15b:** `RootShell.tsx` HEAD_SCRIPT adds `webgl-ok` on most modern phones (> 4 cores, > 4 GB, WebGL works). `globals.css:394` hides the poster under `html.webgl-ok`. `HeroCanvas.tsx` then skips WebGL on `(pointer: coarse)` and renders an empty `.hero__canvas`. So on capable phones the hero visual is blank.
- Existing tokens in `globals.css :root` (lines 25–32): `--motion-ease`, `--motion-micro` 150ms, `--motion-ui` 250ms, `--motion-reveal` 450ms, `--motion-draw` 700ms, `--ease-draw`, `--reveal-shift`, `--stagger` 60ms.
- The only trailing-arrow CTA is `projectsSection.nextLinkText` ("Discuss a similar problem →" / "Conversemos sobre un problema parecido →"), rendered at `Projects.tsx:129`. Other "→" in content are inside copy (Bronze → Silver, 6 h → 45 min), so leave them alone.

---

## Handoff (OpenCode reads this file directly)

```
TASK: P3-17 Fix the blank mobile hero, then add four calm animations

CONTEXT: José approved a second motion round at the "Calm" level: stay
within DESIGN.md / PRODUCT.md ("Calm over clever"). Nothing idle, looping
or replaying on scroll-up; transform / opacity / colour / stroke-dashoffset
only; reduced motion = final state immediately. First fix a P3-15b
regression: on capable phones the hero visual is blank, because
HEAD_SCRIPT sets webgl-ok (which hides the poster) while HeroCanvas skips
WebGL on pointer:coarse.

FILES: src/components/RootShell.tsx, src/components/HeroPoster.tsx,
src/components/Projects.tsx, src/components/ContactForm.tsx,
src/app/globals.css

RULES:
- Reuse the existing motion tokens in globals.css :root. No new durations
  or curves, except the hero poster load pass (<= 1.4s total, the hero's
  approved load-pass exception).
- Extend the existing reduced-motion block (globals.css ~line 862): every
  new animation renders its final state immediately.
- Hero h1, subhead and CTAs never animate (LCP stays the h1).
- Final visual state of every section must look exactly like today,
  except the new hover and success states.
- Don't commit.
- Server: ONE shared server in tmux window portfolio:server. Before you
  rebuild, check that window: if it isn't running `next start` (e.g. it
  shows an OpenCode screen), STOP and tell José instead of touching it.
  Otherwise: C-c there, `npm run build && npm run start`. Never start a
  server outside that window.

PART A — blank mobile hero (do first)
1. RootShell.tsx HEAD_SCRIPT: don't add `webgl-ok` when
   matchMedia('(pointer: coarse)').matches. Keep HeroCanvas.tsx's own
   checks as a second guard (no desktop change).

PART B — four additions
1. Mobile hero draw-in (poster path only, CSS only, once on load)
   - HeroPoster.tsx: give the two <line>s pathLength="1" and a class;
     when building squareParts, give each <rect> an inline style --c (its
     column index 0..COLS-1); signal squares get a class (e.g. is-signal)
     and their final fill stays Signal Blue.
   - Sequence: gate line draws top→bottom and the table rule left→right
     (stroke-dashoffset 1→0, --motion-draw, --ease-draw) → squares fade
     in by column (opacity 0→1, --motion-reveal, delay --c × --stagger)
     → signal squares go text-secondary → Signal Blue last
     (--motion-micro). Ghost and reject dots stay static.
   - Only under html.motion-ok:not(.webgl-ok). Plays once.
2. Hover / press details (interactive elements only)
   - .projects__link, .channel__link, .footer__link: a 1px ::after
     underline that grows left→right on :hover and :focus-visible
     (transform scaleX 0→1, origin left, --motion-ui). .projects__link
     keeps a visible underline at rest (the border colour), and the
     growing line brightens it to text-primary.
   - Projects.tsx:129 nextLinkText: render a trailing " →" as
     <span class="arrow" aria-hidden="true">→</span> (strip it from the
     visible text, keep the link's accessible name otherwise unchanged).
     On hover/focus-visible of the link: translateX(3px), --motion-ui.
     Same in EN and ES.
   - .wa-float__btn: :active { transform: scale(0.96) } over 100ms, like
     .btn:active.
   - Do NOT add a nav hover underline (it competes with the sliding active
     bar) or hover effects on project rows (they aren't links).
3. Form success signal
   - ContactForm.tsx: data-status={status} on .form__footer.
   - globals.css: .form__footer::after = 1px full-width hairline at
     scaleX(0). On [data-status="success"] it draws left→right
     (--motion-draw, --ease-draw), and .form__status--success starts as
     text-primary, then turns --color-signal-blue-text after the draw
     (transition-delay: var(--motion-draw)). Error / sending: no
     hairline, colours as today.
   - The footer's box must not change size (CLS 0). Keep P3-16's
     centring (status centre = button centre at >= 768px).
4. EN/ES crossfade (cross-document View Transitions, zero JS)
   - globals.css: @view-transition { navigation: auto; } plus
     ::view-transition-old(root), ::view-transition-new(root)
     { animation-duration: var(--motion-ui);
       animation-timing-function: var(--motion-ease); }
   - Reduced motion: @view-transition { navigation: none; }
   - LangToggle.tsx stays unchanged. Browsers without support switch
     instantly, as today.

ACCEPTANCE:
- Part A: at 390px with touch emulation, .hero__poster is visible with a
  non-zero box and no three.js chunk loads. At 1440px desktop the 3D scene
  still renders.
- Draw-in: mobile screenshots at ~0 / 600 / 1400 ms; the final frame
  matches today's poster; with reduced motion the final frame shows
  immediately; desktop (webgl-ok) unaffected.
- Hover: screenshots of the link underline and the arrow nudge on hover
  AND keyboard focus-visible.
- Form: with EmailJS MOCKED (no real emails), success shows the hairline
  drawn and the text Signal Blue after ~700ms; status/button centre delta
  stays <= 2px at 1440 and 1024; no layout shift.
- Crossfade: EN → ES → EN in Chromium crossfades (~250ms) and keeps the
  #hash; reduced motion switches instantly.
- Lighthouse mobile + desktop, median of 3: mobile Performance >= 90,
  LCP < 2.5s, CLS < 0.1, Accessibility 100. Report all numbers.
- npm run build and lint: 0 errors, 0 warnings.
- After everything settles, no requestAnimationFrame loop runs on the
  poster path (idle).

Reply in this OpenCode session as STATUS / FILES CHANGED / VERIFICATION / NOTES.
```

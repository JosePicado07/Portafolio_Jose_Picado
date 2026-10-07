# P3-10 · Section transitions don't play after a reload

**Status:** ACCEPTED 2026-10-06. Fresh, reload, back/forward and nav-click→reload all animate (about h2 0→0.58→0.87→1). Mid-page reload: in-view content at opacity 1. Reduced/low-power/capable gating unchanged. Noted deviation: /#projects deep link is blank ~0.3s, then fades in (the browser anchor-scrolls after the observer mounts, so it is treated as a normal reveal). Accepted as is.
**Evidence (headless, about h2 opacity sampled every 80ms after an instant jump):**
- Fresh navigation: 0 → 0 → 0.48 → 0.84 → 0.96 → 0.99 → 1. Animates. ✔
- Reload (F5): 1 → 1 → 1 … No transition. ✘
- Cause: the P3-09 head script skips `motion-ok` when the navigation type is `reload` or `back_forward` (and when there's a `location.hash`). Claude specified that rule; it was too aggressive. People reload and use back constantly, and the observer already handles in-view content.
- Not the cause: reduced motion (José's hero 3D animates) or the observer (instrumented: 36 targets observed, callbacks firing, 33 stamped after scrolling).

---

## Handoff (paste everything inside the fence)

```
TASK: P3-10 Let section transitions play after nav-link clicks, reloads and back/forward

CONTEXT: Section transitions (Projects, Skills, About, Contact) play on a
fresh visit but stop working as soon as the URL has a #hash. Clicking ANY
nav link adds #projects/#skills/... to the URL, so every reload after that
skips motion for the rest of the session. The cause is the inline <head>
script in src/app/layout.tsx: it skips the `motion-ok` class when
location.hash is set, or when the navigation type is "reload" or
"back_forward". Both rules (from P3-09) were too aggressive.

FILES: src/app/layout.tsx (the inline head script) only. Touch
MotionObserver.tsx only if acceptance 3 fails without it.

FIX:
- Remove BOTH the location.hash condition AND the reload / back_forward
  condition from the head script. motion-ok is then set whenever
  prefers-reduced-motion is not "reduce".
- MotionObserver already stamps in-view targets synchronously at mount
  (no transition, since motion-ready isn't set yet). That covers deep links
  and mid-page reloads: content there shows without a fade once JS runs.
- Keep the webgl-ok logic, try/catch and size exactly as they are.

ACCEPTANCE:
1. `npm run build` passes with 0 errors.
2. Fresh load, then a reload at the top (F5), then back/forward: after an
   instant jump to #about, the about h2 opacity goes 0 → 1 over about 450ms
   in ALL three cases.
3. Reload while scrolled mid-page (e.g. at #skills): the content that is in
   view after the browser restores the scroll position ends at opacity 1
   (MotionObserver stamps or reveals it). It must never stay hidden. Report
   how long it's hidden, if at all.
4. /#projects deep link: the in-view Projects content ends at opacity 1
   WITHOUT a fade. It may be hidden briefly until hydration: report that
   time in ms (desktop). Sections scrolled to afterwards DO animate.
5. Click a nav link (URL gains #about), then reload: after scrolling to a
   section that wasn't in view, it animates (opacity 0 → 1).
6. Reduced motion, no-JS and low-power paths: unchanged.
7. Don't commit.

DEADLINE: 15 minutes.

Reply as STATUS / FILES CHANGED / VERIFICATION / NOTES.
```

---

## Grading (Claude)

Re-run the opacity-sequence probe for: fresh, reload at the top, back/forward, reload mid-page, the `/#projects` deep link (measure the time hidden before hydration), and nav-click-then-reload. Then re-run the P3-09 Q3/Q4 path checks to confirm the poster and webgl gating are unaffected.

# P3-17b · Fix the dashed hero lines and the 1024px form shift

**Status:** ACCEPTED 2026-10-06 (Claude re-graded): poster lines solid and drawing in (scale transform); form footer height unchanged on success at 1440/1200/1024/768 (EN) and 1440/1199/1100/1024/768 (ES), centre delta 0.0px; lint clean; build served with all assets 200. P3-17 + P3-17b complete, uncommitted.
Follow-up to P3-17 (graded by Claude 2026-10-06).
**P3-17 grade (Claude):**
- ✅ Part A: at 390px touch, the poster shows (390×338), `webgl-ok` isn't set, and no three.js chunk loads. Desktop 1440 still renders the 3D scene.
- ❌ **Draw-in:** both poster lines (`.hero__gate`, `.hero__gate--rule`) render **dashed** in the final frame instead of solid, and they don't visibly draw. Cause: `stroke-dasharray: 1` + `pathLength="1"` doesn't work with `vector-effect="non-scaling-stroke"`; Chrome measures the dashes in screen pixels. The square column fade and the signal column turning blue work.
- ✅ Reduced motion: no `motion-ok`, final frame immediately.
- ✅ Hover/focus: underline grows (scaleX 1) on hover and on keyboard `:focus-visible`; arrow moves 3px.
- ✅/❌ **Form success:** hairline draws, text starts text-primary and is Signal Blue after the draw, status/button centre delta 0.0px at 1440 and 1024. **But at 1024 the footer grows 40 → 46px on success**, because the success text wraps to a second line (a layout shift). 390px is fine (status sits below the button, by design).
- ✅ Crossfade: `@view-transition { navigation: auto; }` is active; EN → ES keeps `#projects`.
- ✅ Lighthouse (median of 3): mobile Performance 96 (88/96/97), TBT 178ms, LCP 2.21s, CLS 0, a11y 100. Desktop 100, TBT 47ms, LCP 0.51s, CLS 0, a11y 100. No failed requests.
- ✅ Build and lint: 0 errors, 0 warnings.

---

## Handoff (OpenCode reads this file directly)

```
TASK: P3-17b Fix two P3-17 issues: dashed hero poster lines, and the
contact footer growing at 1024px on success

CONTEXT: Claude graded P3-17. Everything passes except:
1. The two poster lines (.hero__gate, .hero__gate--rule) render DASHED
   in the final frame and don't visibly draw in. stroke-dasharray +
   pathLength doesn't work with vector-effect="non-scaling-stroke"
   (Chrome measures the dashes in screen px).
2. At 1024px the success text wraps to two lines, so .form__footer grows
   40px → 46px when "Message sent…" appears (a layout shift).

FILES: src/components/HeroPoster.tsx, src/app/globals.css

RULES:
- Keep vector-effect="non-scaling-stroke" (the lines must stay 1px).
- Don't change anything else from P3-17. Don't commit.
- Server: ONE server in tmux window portfolio:server (it's running
  `next start` now). C-c there, then `npm run build && npm run start`.
  Never start a server anywhere else, and never open OpenCode in it.

STEPS:
1. Hero lines: remove stroke-dasharray / stroke-dashoffset / pathLength.
   Draw them with a transform instead: transform-box: fill-box;
   gate line transform-origin top, scaleY 0→1; rule line
   transform-origin left, scaleX 0→1. Same timing as now
   (--motion-draw, --ease-draw, the rule delayed by --stagger × 2),
   once, only under html.motion-ok:not(.webgl-ok).
2. Form footer at >= 768px: the footer's height must not change when
   the status text appears. E.g. reserve the status line height for the
   longest message (min-height for 2 lines at widths where it can wrap),
   or keep it on one line with no wrap where it fits. Keep the
   status/button centre delta <= 2px at 1440 and 1024, and keep 390px
   as it is.

ACCEPTANCE:
- Mobile (390, touch) final frame: both lines SOLID, pixel-identical to
  the poster before P3-17. Frames at ~0 / 300 / 700 ms show the lines
  growing (gate top→bottom, rule left→right).
- Reduced motion: final frame immediately.
- Footer height identical before and after success at 1440, 1024 and
  768 (report the numbers); centre delta <= 2px at 1440/1024.
- Test the form with EmailJS MOCKED. No real emails.
- npm run build and lint: 0 errors, 0 warnings.

Reply in this OpenCode session as STATUS / FILES CHANGED / VERIFICATION / NOTES.
```

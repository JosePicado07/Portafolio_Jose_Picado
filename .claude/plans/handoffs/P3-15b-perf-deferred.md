# P3-15b · Hero WebGL: start after interactive, skip on low-power devices

**Status:** DONE 2026-10-06 (implemented by OpenCode, re-measured in P3-15c). The TBT target is relaxed, see "Result and new target" below. Post-launch follow-ups are at the bottom.

## Result and new target (2026-10-06, P3-15c, valid build, 0 failed requests)

| | Mobile (poster) | Desktop (WebGL) |
|---|---|---|
| Performance | 92 | 98 |
| TBT | 290ms | 120ms |
| LCP | 2.3s | 0.5s |
| CLS | 0 | 0 |

- **New target (José, 2026-10-06):** mobile Performance ≥ 90 and Core Web Vitals green (LCP < 2.5s, CLS < 0.1), median of 3 runs. TBT < 200ms is no longer required: it's a lab proxy, not a Core Web Vital, and not a course requirement.
- The remaining mobile TBT is mostly one ~310ms Next/React startup + hydration task (`255-…js`) at ~2.0s, before TTI (2.3s). It isn't three.js, which doesn't load on mobile.

## Post-launch follow-ups (DEFERRED, don't relay until José says so)

1. **Measure the floor:** run Lighthouse mobile on an empty Next page with the same layout (`RootShell`, font, head script). If that alone is ~200ms TBT, stop here.
2. **Hydrate less:** make `Nav` render its markup on the server, keeping only the menu toggle and the scroll-spy as small client components. Load `ContactForm`'s JS later with `next/dynamic` (still server-rendered) so it leaves the first task.
3. **Report the median of 3–5 mobile runs**, not a single run.

---

*Original P3-15b handoff below (already executed).*
**Facts so far (Claude, from lighthouse-report.html, 2026-10-06 16:07):**
- Mobile preset, simulated 4× CPU throttle: Performance 78, TBT 880ms, FCP 0.9s, LCP 2.3s, CLS 0, TTI 4.1s.
- Three.js is already lazy-loaded (`HeroCanvas` → `next/dynamic` `HeroScene`). Its chunks produce long tasks at 3.2s (361ms) and 3.8s (282ms), which fall inside the TBT window because the `requestIdleCallback` timeout (1200ms) fires early under the throttle.
- `lighthouse-audit.mjs` runs Chrome with `--disable-gpu`, so WebGL runs on the CPU. That inflates main-thread "Other" time (1,660ms), so the current score overstates the cost on real devices.
- P3-15 (`next/dynamic` `ssr:false` in `Hero.tsx`) was blocked: Hero is a Server Component. It was reverted.

---

## Handoff (OpenCode reads this file directly)

```
TASK: P3-15b Delay the hero WebGL scene until the page is interactive, and
skip it on low-power devices

CONTEXT: Lighthouse (mobile, 4x throttle) reports TBT 880ms. Three.js is
already lazy-loaded, but the requestIdleCallback timeout in HeroCanvas
starts loading HeroScene before TTI, so its long tasks count toward TBT.
The audit also runs with --disable-gpu, which inflates WebGL cost.

FILES: src/components/HeroCanvas.tsx (and lighthouse-audit.mjs for the
measurement change only)

RULES:
- Hero.tsx stays a Server Component. Don't add "use client" to it.
- Don't change HeroScene's visuals.
- Don't commit.

STEPS:
1. Remove the requestIdleCallback timeout. Start HeroScene only on a true
   idle callback after the window `load` event, with a first-interaction
   fallback (first scroll, pointerdown or keydown, whichever comes first).
2. Skip WebGL and keep HeroPoster when any of these is true:
   navigator.hardwareConcurrency < 4, navigator.deviceMemory < 4 (when
   defined), or matchMedia("(pointer: coarse)").matches. Keep the existing
   webgl-ok check.
3. Re-measure with the GPU enabled (remove --disable-gpu from
   lighthouse-audit.mjs, or check in Chrome DevTools Lighthouse) before
   reporting any score.

ACCEPTANCE:
- No requestIdleCallback timeout remains in HeroCanvas.
- The low-power check falls back to the poster with no layout shift.
- npm run build and lint pass with 0 errors and 0 warnings.
- With GPU enabled: TBT < 200ms, Performance >= 90, LCP < 2.5s, CLS < 0.1.
  Report the before/after numbers.

Reply in this OpenCode session as STATUS / FILES CHANGED / VERIFICATION / NOTES.
```

# P3-15 · Lazy-load HeroCanvas to reduce TBT

**Status:** OPEN 2026-10-06. Fix defined by José; handoff written by Claude.
**Facts so far (Claude):**
- Lighthouse on the production build: Performance 78, TBT 884ms. LCP 2.3s and CLS 0 are within target.
- `src/components/Hero.tsx:2` is `import HeroCanvas from "./HeroCanvas";` (a static import).
- Caveat 1: `Hero.tsx` has no `"use client"`, so it is a Server Component. On Next 15.5, `next/dynamic` with `ssr: false` is not allowed in Server Components and makes the build fail.
- Caveat 2: `HeroCanvas.tsx` is already `"use client"` and already loads `HeroScene` (the Three.js part) through `next/dynamic({ ssr: false })`, and only when the browser is idle. So this change may not lower TBT much.

---

## Handoff (OpenCode reads this file directly)

```
TASK: P3-15 Lazy-load HeroCanvas to reduce TBT

CONTEXT: Lighthouse on the production build reports TBT 884ms. The static
import of HeroCanvas in Hero.tsx pulls Three.js into the initial bundle,
blocking the main thread before first paint. LCP 2.3s and CLS 0 are already
within target.

FILES: src/components/Hero.tsx

RULES:
- Change only src/components/Hero.tsx.
- Don't commit.
- If `npm run build` fails because `ssr: false` isn't allowed in a Server
  Component (Hero.tsx has no "use client"), STOP. Report the exact error and
  don't widen the scope on your own.
- If the build passes but TBT is still >= 200ms, report the Lighthouse
  numbers and the top main-thread / long-task contributors. Don't make
  further changes.

ACCEPTANCE:
- HeroCanvas is loaded via next/dynamic with { ssr: false } and
  loading: () => <HeroPoster />.
- No static import of HeroCanvas remains in Hero.tsx.
- npm run build passes.
- Lighthouse TBT < 200ms and Performance >= 90.
- LCP still < 2.5s and CLS still < 0.1.

DEADLINE: this session

Reply in this OpenCode session as STATUS / FILES CHANGED / VERIFICATION / NOTES.
```

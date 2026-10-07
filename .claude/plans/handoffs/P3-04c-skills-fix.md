# P3-04c · Skills: last two CSS fixes

**Status:** ACCEPTED 2026-10-05. Mobile rail is 1478px tall; name→desc is 8px at 390, 768 and 1440; dots, copy and overflow are unchanged. Skills (P3-04 → 04c) is done.
**Already passing:** build 105 kB, copy identical, 3 blue dots, weight 400 only, sr-only text, server-only, Lighthouse a11y 100 / LCP 1.6s mobile / CLS 0.

---

## Handoff (paste everything inside the fence)

```
TASK: P3-04c Skills: mobile rail height + name-to-description gap

CONTEXT: P3-04b fixed almost everything. Two items from it are still open.
Change ONLY these two things in src/app/globals.css. Nothing else.

FIX A · The mobile rail is 1px tall
  Measured at 390px: .pipeline::before computes to width 1px, height 1px, so
  the vertical connector is a single pixel. Inside the max-width: 767px block,
  the rule must override the desktop `height: 1px`:
    .pipeline::before { display:block; top:4px; bottom:0; left:4px;
                        right:auto; width:1px; height:auto; }
  Expected: at 390px, getComputedStyle(.pipeline, '::before').height is the
  pipeline's full height (about 1,550px), not 1px.

FIX B · The stage description sits 24px below the stage name; it should be 8px
  Measured at 390 and 1440px: desc.top - h3.bottom = 24px (the variant has
  8px). The 24px .stage__head gap is spacing the dot from the name, and the
  same 24px is applied again before the desc. Keep the dot 24px above the
  name on desktop and tablet, but make the name-to-description distance
  exactly 8px at every width.
  Expected: desc.top - h3.bottom === 8 at 390, 768 and 1440px.

ACCEPTANCE:
1. `npm run build` passes with 0 errors.
2. FIX A and FIX B both measure as expected.
3. Nothing else changes: the dot x-positions stay 144/440/736/1032 at 1440,
   24/400/24/400 at 768, and 24 at 390; the copy is unchanged.
4. Don't commit.

DEADLINE: 15 minutes.

Reply as STATUS / FILES CHANGED / VERIFICATION / NOTES.
```

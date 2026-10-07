# P3-09b · Poster: hairlines render as solid slabs

**Status:** ACCEPTED 2026-10-06. Poster lines measure 0×274 / 288×0 at 1440 and 0×161 / 169×0 at 390 (true hairlines); matches the WebGL final frame. P3-09 polish pass complete.
**Passing, must be kept:**
- Q1: build 108 kB.
- Q2: capable path unchanged, poster `none` from first paint.
- Q3/Q4: low-power and reduced motion show the poster, with no canvas and none of the 4 three.js chunks requested.
- No-JS: poster visible.
- Q6: deep link and reload show content instantly.
- Q7: anchors land 101px below the nav.
- Q8: submit width 390 full / 768 auto / 1440 auto.

---

## Handoff (paste everything inside the fence)

```
TASK: P3-09b HeroPoster: make the gate and table-rule lines 1px hairlines

CONTEXT: On the poster path (low-power devices, reduced motion, no-JS) the
gate line and the table rule render as two big SOLID GREY BLOCKS instead of
1px lines. Cause: vectorEffect="non-scaling-stroke" is set on the wrapping
<g>, but `vector-effect` is NOT inherited in SVG, so it has no effect there.
strokeWidth={1} is then measured in viewBox (scene) units, about a fifth of
the whole picture.

FILES: src/components/HeroPoster.tsx only.

FIX:
- Put vectorEffect="non-scaling-stroke" AND strokeWidth={1} on EACH <line>
  element (keep stroke on the <g> or move it too). Remove them from the
  <g>.
- Leave everything else exactly as it is.

ACCEPTANCE:
1. `npm run build` passes with 0 errors.
2. Low-power emulation (hardwareConcurrency=2) at 1440 and 390, DPR 2: the
   gate is a thin vertical hairline and the table rule a thin horizontal
   hairline, matching the WebGL final frame. No filled blocks.
3. No other change. Don't commit.

DEADLINE: 10 minutes.

Reply as STATUS / FILES CHANGED / VERIFICATION / NOTES.
```

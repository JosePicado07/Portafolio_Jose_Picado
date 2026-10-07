# P3-05b · About: career list layout + time markup

**Status:** ACCEPTED 2026-10-05. Career items stack (one shared left edge at every width), the first role fits on 1 line, no <time> elements, text identical, build 105 kB. About is done.

---

## Handoff (paste everything inside the fence)

```
TASK: P3-05b About: stack the career items, fix the <time> markup

CONTEXT: P3-05 is close. The copy, colors, weights and accessibility all pass,
so don't touch them or any string. Two fixes, both in the career list.

FIX A · Career items must stack in one column
  Now: each .arc__item puts the date in a left column and the role/org/note
  in a right column, which squeezes the role text ("Technical Consultant,
  Data Conversion" wraps onto 2 lines at 1440px). The variant
  (.claude/design-variants/04-about/index.html) stacks everything vertically:
    when (label style)
    role (1.125rem, text-primary, 4px extra top margin)
    org (text-secondary)
    note (text-secondary, 0.9375rem, 8px top margin)
  .arc__item is display:grid with a SINGLE column and gap 4px,
  padding-block 24px, and a 1px border-bottom. Remove the two-column rule and
  the .arc__role-org wrapper's side-by-side layout. The wrapper can stay if it
  stacks.
  Expected at 1440px: the left edge of when, role, org and note is the same x
  for every item, and "Technical Consultant, Data Conversion" fits on one line.

FIX B · Invalid <time datetime>
  Now: dateTime={item.when.replace("–","/")} produces values like
  "Jan 2026 / Present" and "Expected 2027", which aren't valid datetime
  strings. Render `when` as a plain <span className="arc__when"> instead of
  <time>. Keep the class and its label styling.

ACCEPTANCE:
1. `npm run build` passes with 0 errors; "/" stays ≤ 106 kB.
2. FIX A and FIX B both hold at 1440, 768 and 390px, with no horizontal scroll.
3. The #about text is unchanged character for character. There's no <time>
   element in #about.
4. Nothing outside the career list changes.
5. Don't commit.

DEADLINE: 15 minutes.

Reply as STATUS / FILES CHANGED / VERIFICATION / NOTES.
```

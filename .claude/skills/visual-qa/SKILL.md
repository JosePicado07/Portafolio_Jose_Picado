---
name: visual-qa
description: "Use to inspect screenshots, browser renders, responsive states, spacing, alignment, overlap, text fit, visual hierarchy, and production polish."
---

# Visual QA

Use this skill after a page or component can be visually inspected, especially with desktop and mobile screenshots.

## Workflow

1. Inspect the actual rendered result when available.
2. Check desktop, tablet, and mobile states when possible.
3. Look for overlap, overflow, clipping, weak hierarchy, inconsistent spacing, unbalanced sections, poor contrast, and unstable controls.
4. Separate objective defects from subjective preferences.
5. Recommend exact fixes and re-check after changes.

## Output

Lead with findings ordered by severity:

- Blocking visual defects
- Responsive defects
- Polish issues
- Suggested fixes
- Viewports checked
- Remaining risk

## References

- Read Reference: **review-playbook.md** (inlined at the bottom of this document) when writing visual findings and verification steps.
- Read Reference: **review-gates.md** (inlined at the bottom of this document) for delivery criteria.
- Read Reference: **quality-rubric.md** (inlined at the bottom of this document) when a numeric quality score is requested.

## Shared Reference Standards (Inlined)

### review-playbook.md

# Review Playbook

Use this for final critique, visual QA, accessibility review, and performance or SEO review.

## Finding Format

Each actionable finding should include:

- Severity
- Evidence
- User or business impact
- Specific fix
- Verification step

## Severity

- Critical: blocks release, access, conversion, crawling, or core interaction
- Major: materially weakens quality, trust, usability, performance, or maintainability
- Minor: polish issue with limited user impact

## Review Discipline

Lead with risks and defects. Keep praise brief. Do not approve a page because it is functional if it is generic, inaccessible, slow, unstable, or visually unpolished.

### review-gates.md

# Review Gates

## Before Coding

- The audience and conversion goal are clear.
- The brand personality is specific enough to reject generic choices.
- Typography, color, imagery, spacing, and motion have a coherent direction.
- Key sections and content hierarchy are defined.

## Before Delivery

- No obvious responsive overflow or overlap.
- Text fits its containers.
- Interactive controls have hover, focus, disabled, and loading states where relevant.
- Forms have labels, validation, and useful errors.
- Images are optimized and have meaningful alt text unless decorative.
- Metadata, headings, canonical links, and structured data are correct where applicable.
- Lighthouse, axe, lint, typecheck, or equivalent checks have been run when available.

## If A Gate Fails

Do not hide the issue. State the blocker, propose the smallest professional fix, and continue improving when possible.

### quality-rubric.md

# Quality Rubric

Score each category from 0 to 10.

## Categories

- Brand distinction
- Audience fit
- Concept clarity
- Visual hierarchy
- Typography
- Color and contrast
- Layout and spacing
- Component consistency
- Motion quality
- Responsiveness
- Accessibility
- Performance
- SEO
- Code maintainability

## Passing Bar

- 9-10: Production-ready or exceptional.
- 7-8: Strong but still needs targeted refinement.
- 5-6: Directionally acceptable but not ready.
- 0-4: Materially below professional standard.

Do not mark work complete when any category below 8 affects user experience, compliance, discoverability, or implementation safety. For final delivery, categories that affect accessibility, performance, SEO, or code maintainability should be 9 or higher unless a constraint is explicitly documented.


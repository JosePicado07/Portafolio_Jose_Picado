---
name: design-review
description: "Use for final agency-grade critique of frontend work across brand fit, hierarchy, typography, layout, motion, accessibility, performance, SEO, and code quality."
---

# Design Review

Use this skill when the user asks for critique, polish, final review, quality scoring, or whether a frontend is production-ready.

## Workflow

1. Inspect the actual artifact: code, screenshots, browser render, or described output.
2. Review against brand, visual quality, responsiveness, accessibility, performance, SEO, and maintainability.
3. Score only when useful or requested.
4. Lead with defects and risks, not compliments.
5. Require another improvement pass when material issues remain.

## Output

Return:

- Findings ordered by severity
- Scores if requested
- Required fixes
- Recommended refinements
- Checks performed
- Remaining risks

## Standards

Do not approve generic, inaccessible, slow, unstable, or visually broken work. If a score is below the passing bar, explain the fastest path to raise it.

## References

- Read Reference: **quality-rubric.md** (inlined at the bottom of this document) when scoring.
- Read Reference: **review-playbook.md** (inlined at the bottom of this document) when writing final critique and required fixes.
- Read Reference: **review-gates.md** (inlined at the bottom of this document) before final approval.
- Read Reference: **frontend-standards.md** (inlined at the bottom of this document) when implementation quality is in scope.

## Shared Reference Standards (Inlined)

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

### frontend-standards.md

# Frontend Implementation Standards

## Architecture

- Prefer the host project's existing framework, routing, styling, component, and data patterns.
- Keep components small enough to test and review, but avoid needless abstraction.
- Use typed contracts for reusable data structures when the codebase supports them.
- Keep design tokens centralized and avoid one-off raw values in repeated UI.
- Use semantic HTML first, ARIA only when native semantics are insufficient.

## Accessibility

- Preserve heading order and landmarks.
- Provide visible labels for form fields.
- Ensure icon-only controls have accessible names.
- Preserve keyboard navigation, focus order, and visible focus states.
- Check contrast for text, icons, controls, and focus indicators.
- Respect reduced-motion preferences.

## Performance

- Optimize images with correct dimensions, modern formats, lazy loading where appropriate, and meaningful alt text.
- Avoid unnecessary client-side JavaScript.
- Prefer server-rendered or statically generated marketing surfaces when feasible.
- Keep animation work on transform and opacity where possible.
- Avoid layout shifts from late-loading media, fonts, or dynamic content.

## SEO

- Use unique titles and meta descriptions.
- Use canonical URLs where appropriate.
- Keep crawlable links for key navigation.
- Use structured data only when accurate.
- Ensure the primary content exists in the delivered HTML for public marketing pages.


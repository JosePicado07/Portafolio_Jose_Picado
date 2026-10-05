---
name: performance-seo-review
description: "Use to audit frontend performance, Core Web Vitals, bundle risk, image delivery, rendering mode, metadata, crawlability, structured data, and SEO readiness."
---

# Performance SEO Review

Use this skill before shipping public marketing pages, product pages, documentation surfaces, or any route where discoverability and speed matter.

## Workflow

1. Inspect framework, rendering mode, route structure, assets, metadata, and third-party scripts.
2. Check likely Core Web Vitals risks: LCP, CLS, INP, and JavaScript cost.
3. Check SEO basics: title, description, canonical, headings, links, robots behavior, structured data, and server-rendered content.
4. Recommend measurable fixes.
5. Include validation commands when tools are available.

## Output

Lead with findings ordered by severity:

- Performance blockers
- SEO blockers
- Optimization opportunities
- Verification steps
- Metrics to capture

## References

- Read Reference: **frontend-standards.md** (inlined at the bottom of this document) for performance and SEO standards.
- Read Reference: **review-playbook.md** (inlined at the bottom of this document) when writing findings and verification steps.
- Read Reference: **review-gates.md** (inlined at the bottom of this document) before marking work ready.

## Shared Reference Standards (Inlined)

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


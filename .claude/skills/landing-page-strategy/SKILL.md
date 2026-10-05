---
name: landing-page-strategy
description: "Use to plan landing pages, marketing pages, section order, messaging hierarchy, conversion flow, proof, objections, and calls to action."
---

# Landing Page Strategy

Use this skill before building marketing pages, homepage sections, SaaS landing pages, campaign pages, or launch pages.

## Workflow

1. Confirm audience, offer, conversion goal, and stage of awareness.
2. Define the page promise and primary action.
3. Sequence sections by user decision flow, not by template habit.
4. Map proof, objections, comparisons, and trust signals.
5. Produce section-level requirements that design and implementation can follow.

## Output

Return:

- Page objective
- Messaging hierarchy
- Section sequence
- CTA strategy
- Proof and trust plan
- Objection handling
- SEO and accessibility notes
- Implementation handoff

## Standards

Do not default to hero, feature cards, testimonials, pricing, FAQ unless that sequence fits the audience's decision process.

## References

- Read Reference: **agency-standards.md** (inlined at the bottom of this document) for delivery gates.
- Read Reference: **landing-page-playbook.md** (inlined at the bottom of this document) when sequencing sections or planning conversion flow.
- Read Reference: **frontend-standards.md** (inlined at the bottom of this document) when producing implementation handoff notes.

## Shared Reference Standards (Inlined)

### agency-standards.md

# Frontend Agency Standards

Use these standards whenever a Frontend Agency skill plans, designs, builds, or reviews frontend work.

## Operating Principles

- Start with business context, audience, differentiation, and constraints.
- Define strategy before visual decisions.
- Define visual language before writing production UI.
- Treat accessibility, performance, SEO, and responsive behavior as core quality requirements.
- Prefer durable design systems over isolated page styling.
- Avoid generic AI defaults, placeholder copy, vague gradients, and visually interchangeable layouts.
- Never present weak work as finished. Name the risk and improve it.

## Required Delivery Gates

1. Discovery: audience, offer, goal, constraints, and success metrics are understood.
2. Direction: the page or product has a clear concept, not just a layout.
3. System: typography, color, spacing, imagery, components, and motion are coherent.
4. Implementation: components, state, assets, metadata, accessibility, and performance are planned.
5. Review: visual, accessibility, SEO, performance, and code quality checks are complete.

## Quality Threshold

Production-ready work must be specific, testable, maintainable, responsive, accessible, and aligned with the brand. If any major area is uncertain, state the assumption and continue with the safest professional default.

### landing-page-playbook.md

# Landing Page Playbook

Use this to build section strategy from user decision flow.

## Decision Flow

1. Recognize the problem or ambition.
2. Understand the promised outcome.
3. Believe the mechanism.
4. Trust the provider.
5. Resolve objections.
6. Act with confidence.

## Section Roles

- Hero: state the promise and primary action
- Problem: make the cost of inaction concrete
- Mechanism: explain how the product creates the outcome
- Proof: show evidence, logos, metrics, quotes, or demos
- Comparison: clarify why this is the better choice
- Pricing: reduce purchase uncertainty
- FAQ: resolve late-stage objections
- Final CTA: make the next step obvious

Use only sections that serve the decision flow.

## Copy Standard

Prefer specific claims, concrete nouns, and user outcomes. Avoid empty intensity words such as revolutionary, seamless, cutting-edge, and game-changing unless backed by proof.

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


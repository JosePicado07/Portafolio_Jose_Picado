---
name: brand-discovery
description: "Use for brand, audience, product, offer, positioning, constraints, and success-metric discovery before frontend strategy, design, copy, or implementation work."
---

# Brand Discovery

Use this skill to turn an unclear brief into decision-ready context. Prioritize specificity over volume.

## Workflow

1. Identify the business goal, primary audience, product category, offer, and desired action.
2. Extract brand attributes from provided copy, assets, examples, competitors, and constraints.
3. Ask only blocking questions. If a detail is absent but non-blocking, state a professional assumption.
4. Define audience pains, desired outcomes, objections, and trust signals.
5. Produce a discovery brief that downstream skills can use without reinterpreting the original request.

## Output

Return:

- Brand summary
- Audience segments and priority user
- Positioning hypothesis
- Conversion goal
- Content and proof requirements
- Constraints and assumptions
- Risks that could make later design generic or inaccurate

## References

- Read Reference: **agency-standards.md** (inlined at the bottom of this document) when the request is broad or greenfield.
- Read Reference: **brand-discovery-playbook.md** (inlined at the bottom of this document) when the brief lacks audience, positioning, proof, or constraints.
- Read Reference: **workflow.md** (inlined at the bottom of this document) when this discovery will feed a complete frontend build.

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

### brand-discovery-playbook.md

# Brand Discovery Playbook

Use this when the brief is vague, the audience is unclear, or later design work risks becoming generic.

## Discovery Questions

- What is being sold, promised, or changed?
- Who is the primary decision maker?
- Who influences the decision?
- What pain, ambition, or urgency brings the user here?
- What must the user believe before taking action?
- What proof exists today?
- What objections must the page answer?
- What should the brand never feel like?

## Positioning Frame

Define:

- Category: what market the product belongs to
- Audience: who it is for first
- Problem: what painful or expensive issue it resolves
- Outcome: what changes after adoption
- Difference: why this option is meaningfully distinct
- Proof: why the claim is credible

## Output Standard

A usable discovery brief should let another agent write strategy, page structure, or visual direction without rereading the original conversation.

### workflow.md

# Frontend Agency Workflow

Use this sequence for new frontend work:

1. Brand discovery
2. Creative direction
3. Visual language
4. Design system
5. Landing page or product strategy
6. Frontend architecture
7. Motion design
8. Implementation
9. Accessibility review
10. Performance and SEO review
11. Visual QA
12. Design review

Skills may be used independently for audits or targeted work, but complete greenfield builds should follow the sequence unless the user explicitly asks to skip a stage.

## Planning Output

When planning, produce decisions that can guide implementation:

- Context and assumptions
- Recommended direction
- Alternatives considered
- Risks and mitigations
- Concrete next actions

## Review Output

When reviewing, lead with findings ordered by severity. Include file references or screenshot references when available. Avoid vague feedback.


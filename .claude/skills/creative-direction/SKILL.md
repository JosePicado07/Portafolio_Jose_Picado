---
name: creative-direction
description: "Use to create a distinctive creative concept, narrative direction, art direction, and experience principles before visual design or frontend implementation."
---

# Creative Direction

Use this skill after discovery or when a project needs a stronger concept than a generic layout.

## Workflow

1. Restate the brand, audience, conversion goal, and constraints.
2. Define the central creative idea in one sentence.
3. Choose an experience posture: editorial, product-led, cinematic, technical, utility-first, luxury, playful, or another justified direction.
4. Translate the concept into page rhythm, content emphasis, imagery, interaction, and tone.
5. Name rejected directions when they would create generic or off-brand work.

## Output

Return:

- Creative concept
- Narrative arc
- Art direction
- Content priorities
- Interaction principles
- Risks and constraints
- Clear handoff notes for visual language or implementation

## Standards

Avoid borrowed aesthetics unless the user asks for a reference. If a reference is used, extract principles, not imitation.

## References

- Read Reference: **agency-standards.md** (inlined at the bottom of this document) for quality gates.
- Read Reference: **creative-direction-playbook.md** (inlined at the bottom of this document) when the project needs a distinctive concept or art direction.
- Read Reference: **workflow.md** (inlined at the bottom of this document) when coordinating with other Frontend Agency skills.

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

### creative-direction-playbook.md

# Creative Direction Playbook

Use this when a project needs a memorable concept, not only an attractive layout.

## Direction Ingredients

- Core idea: the single concept the page should express
- Narrative tension: what changes from problem to outcome
- Page posture: calm authority, precision, momentum, craft, depth, energy, or another justified stance
- Signature move: one visual or interaction choice that makes the work recognizable
- Restraints: what the direction must avoid

## Direction Tests

A direction is strong when:

- It can reject multiple plausible but generic layouts
- It supports the conversion goal
- It can be implemented with available assets and engineering capacity
- It creates a specific tone before color and type are chosen

## Avoid

- Reference copying
- Mood without business function
- Visual novelty that weakens comprehension
- A concept that depends on impossible assets or excessive animation

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


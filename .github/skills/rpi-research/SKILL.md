---
name: rpi.research
description: Executes the Research phase of the QuizHuis RPI feature workflow and produces a single research artifact with validated claims. Use when a feature request needs discovery and system-fit analysis before planning.
---

# RPI Research (QuizHuis)

## Quick start

1. Read feature input from `apps/quizhuis/demo/00-feature-input.md`.
2. Parse `FEATURE_REQUEST` and `FEATURE_FOLDER`.
3. Invoke `software-development-best-practices` and apply KISS, minimalistic code, and clean code principles to recommendations.
4. Invoke `ux-ui-best-practices` and apply UX/UI quality and accessibility guidance to the proposed flow.
5. Create `apps/quizhuis/demo/<FEATURE_FOLDER>/` if missing.
6. Produce exactly one file: `apps/quizhuis/demo/<FEATURE_FOLDER>/research.md`.

## Workflow

1. Decompose the feature request exactly as written:
   - quote the full request verbatim
   - split explicit requested outcomes into atomic requirement IDs (`FR-1`, `FR-2`, ...)
   - identify actor/action/object/observable outcome per requirement
2. Analyze:
   - user value
   - architecture fit for requested outcomes and future evolution
   - likely data model/state changes
   - UX impact
   - top technical risks
3. Validate key claims with at least 2 online sources.
4. Clearly separate facts from assumptions and ambiguities.

## Output requirements

`research.md` must include:

1. feature request decomposition table (`FR-id` -> exact request slice -> required behavior/outcome)
2. outcome contract (non-negotiable requested behaviors)
3. assumptions and ambiguities (explicitly separated from required outcomes)
4. recommended implementation direction
5. high-level system fit
6. new user/system flow
7. existing parts likely needing modification
8. Mermaid workflow diagram of the new flow
9. source citations for validated claims

## Guardrails

- Do not ask for `FEATURE_REQUEST` / `FEATURE_FOLDER` again.
- Do not write code in this phase.
- Do not create `plan.md` or `implementation.md` in this phase.
- Prefer the simplest viable implementation direction; avoid speculative complexity.
- Do not weaken or reinterpret explicit requested outcomes.
- If ambiguity remains, document it under assumptions/ambiguities; do not silently choose a narrower scope than the request implies.
- Explicitly choose an architecture direction that satisfies requested outcomes now and avoids dead-end choices for likely future expansion.

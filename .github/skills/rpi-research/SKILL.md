---
name: rpi.research
description: Executes the Research phase of the QuizHuis RPI feature workflow and produces a single research artifact with validated claims. Use when a feature request needs discovery and system-fit analysis before planning.
---

# RPI Research (QuizHuis)

## Quick start

1. Read feature input from `apps/quizhuis/demo/00-feature-input.md`.
2. Parse `FEATURE_REQUEST` and `FEATURE_FOLDER`.
3. Invoke `software-development-best-practices` and apply KISS, minimalistic code, and clean code principles to recommendations.
4. Create `apps/quizhuis/demo/<FEATURE_FOLDER>/` if missing.
5. Produce exactly one file: `apps/quizhuis/demo/<FEATURE_FOLDER>/research.md`.

## Workflow

1. Analyze:
   - user value
   - fit with the current frontend-only architecture
   - likely data model/state changes
   - UX impact
   - top technical risks
2. Validate key claims with at least 2 online sources.
3. Clearly separate facts from assumptions.

## Output requirements

`research.md` must include:

1. recommended implementation direction
2. high-level system fit
3. new user/system flow
4. existing parts likely needing modification
5. Mermaid workflow diagram of the new flow
6. source citations for validated claims

## Guardrails

- Do not ask for `FEATURE_REQUEST` / `FEATURE_FOLDER` again.
- Do not write code in this phase.
- Do not create `plan.md` or `implementation.md` in this phase.
- Prefer the simplest viable implementation direction; avoid speculative complexity.

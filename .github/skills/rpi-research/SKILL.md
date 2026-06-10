---
name: rpi.research
description: Executes the Research phase of the QuizHuis RPI flow. Use when a feature request needs discovery and system-fit analysis before planning.
---

# RPI Research (QuizHuis)

## Quick start

A sample feature is pre-filled in `demo/00-feature-input.md`. Run this skill immediately — no setup needed.

1. Read feature input from: `demo/00-feature-input.md`
2. Treat that file as the source of truth for `FEATURE_REQUEST` and `FEATURE_FOLDER`
3. Do not ask for these values again — do not write code yet
4. Create the feature output folder if needed: `demo/<FEATURE_FOLDER>/`
5. Produce exactly one file: `demo/<FEATURE_FOLDER>/research.md`

## Workflow

Analyze the feature request:

1. **User value** — who benefits and how?
2. **Architecture fit** — does it align with the current frontend-only architecture?
3. **Data model impact** — what state/data changes would be needed?
4. **UX impact** — how does it change user flows?
5. **Technical risks** — what are the top risks to be aware of?

Validate key claims with at least 2 online sources and clearly separate facts from assumptions.

## Output

`research.md` must include:

1. **Recommended implementation direction** — how should this be built?
2. **High-level system fit** — where does it belong in the app?
3. **New user/system flow** — describe the flow step by step
4. **Existing parts likely needing modification** — what already exists that needs updating?
5. **Mermaid workflow diagram** — visualize the new flow

## Guardrails

- Use one document only (do not split output across multiple files)
- Include source citations for validated claims
- Do not write plan or implementation files in this phase
- Do not write code in this phase

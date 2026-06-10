---
name: rpi.implement
description: Executes the Implement phase from approved research and plan artifacts. Use when planning is complete and coding should begin.
---

# RPI Implement (QuizHuis)

## Quick start

1. Read feature input from: `demo/00-feature-input.md`
2. Treat that file as the source of truth for `FEATURE_REQUEST` and `FEATURE_FOLDER`
3. Use these documents as input:
   - `demo/<FEATURE_FOLDER>/research.md`
   - `demo/<FEATURE_FOLDER>/plan.md`
4. Implement the feature in the app codebase
5. Produce exactly one report: `demo/<FEATURE_FOLDER>/implementation.md`

## Workflow

Implement the feature:

1. Follow the plan exactly — do not deviate from the approved scope
2. Keep changes minimal and aligned with existing architecture and coding style
3. Avoid unrelated refactors
4. Keep scope to MVP for demo purposes
5. Run relevant tests after changes and fix regressions you introduce

## Output

`implementation.md` must include:

1. **Scope delivered** — what was implemented
2. **File-by-file change log** — file path + what changed + why
3. **Behavior changes and user impact** — how the app behaves differently
4. **Test results** — what was tested and the outcome
5. **Remaining risks, limitations, or deferred items** — what's left to do

## Guardrails

- Treat `00-feature-input.md` as the source of truth for request metadata
- Implement only the approved plan scope unless explicitly expanded
- If complexity grows beyond what the plan needs, simplify before continuing

---
name: rpi.implement
description: Executes the Implement phase of the QuizHuis RPI feature workflow from approved research and plan artifacts, then writes a detailed implementation report. Use when planning is complete and coding should begin.
---

# RPI Implement (QuizHuis)

## Quick start

1. Read feature input from `apps/quizhuis/demo/00-feature-input.md`.
2. Parse `FEATURE_REQUEST` and `FEATURE_FOLDER`.
3. Read:
   - `apps/quizhuis/demo/<FEATURE_FOLDER>/research.md`
   - `apps/quizhuis/demo/<FEATURE_FOLDER>/plan.md`
4. Implement the feature in the app codebase.
5. Produce exactly one report: `apps/quizhuis/demo/<FEATURE_FOLDER>/implementation.md`.

## Implementation rules

- Keep changes minimal and aligned with existing architecture/coding style.
- Avoid unrelated refactors.
- Keep scope to MVP for demo purposes.
- Run relevant tests after changes and fix regressions you introduce.

## Output requirements

`implementation.md` must include:

1. scope delivered (what was implemented)
2. file-by-file change log (file path + what changed + why)
3. behavior changes and user impact
4. test results
5. remaining risks, limitations, or deferred items

## Guardrails

- Treat `00-feature-input.md` as source of truth for request metadata.
- Implement only the approved plan scope unless explicitly expanded.

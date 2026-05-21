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
4. Invoke `software-development-best-practices` and apply KISS, minimalistic code, and clean code principles during implementation.
5. Implement the feature in the app codebase.
6. Produce exactly one report: `apps/quizhuis/demo/<FEATURE_FOLDER>/implementation.md`.

## Implementation rules

- Keep changes minimal and aligned with existing architecture/coding style.
- KISS: choose the simplest solution that meets acceptance criteria.
- Minimalistic code: avoid unnecessary files, abstractions, and indirection.
- Clean code: use clear naming, focused units, and explicit data flow.
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
- If complexity grows beyond what the request needs, simplify before continuing.

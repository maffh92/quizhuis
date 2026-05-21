---
name: rpi.implement
description: Executes the Implement phase from approved research/design/plan artifacts, verifies must-have acceptance criteria, and writes a detailed implementation report. Use when planning is complete and coding should begin.
---

# RPI Implement (QuizHuis)

## Quick start

1. Read feature input from `apps/quizhuis/demo/00-feature-input.md`.
2. Parse `FEATURE_REQUEST` and `FEATURE_FOLDER`.
3. Read:
   - `apps/quizhuis/demo/<FEATURE_FOLDER>/research.md`
   - `apps/quizhuis/demo/<FEATURE_FOLDER>/design-review.md`
   - `apps/quizhuis/demo/<FEATURE_FOLDER>/plan.md`
4. Confirm `design-review.md` verdict is `PASS`.
5. Invoke `software-development-best-practices` and apply KISS, minimalistic code, and clean code principles during implementation.
6. Invoke `test-best-practices` and apply behavior-first verification strategy.
7. Implement the feature in the app codebase.
8. Produce exactly one report: `apps/quizhuis/demo/<FEATURE_FOLDER>/implementation.md`.

## Implementation rules

- Keep changes minimal and aligned with existing architecture/coding style.
- KISS: choose the simplest solution that meets acceptance criteria.
- Minimalistic code: avoid unnecessary files, abstractions, and indirection.
- Clean code: use clear naming, focused units, and explicit data flow.
- Avoid unrelated refactors.
- Keep scope to MVP for demo purposes.
- Run relevant tests after changes and fix regressions you introduce.
- Run project quality checks from `apps/quizhuis` (`npm run lint && npm run test && npm run build`) before concluding implementation.
- Map each acceptance criterion to verification evidence (automated or manual).
- Validate the primary user flow manually when automation does not fully cover it.

## Output requirements

`implementation.md` must include:

1. scope delivered (what was implemented)
2. file-by-file change log (file path + what changed + why)
3. acceptance-criteria verification table (criterion -> check type -> result)
4. behavior changes and user impact
5. test/build results
6. remaining risks, limitations, or deferred items

## Guardrails

- Treat `00-feature-input.md` as source of truth for request metadata.
- Implement only the approved plan scope unless explicitly expanded.
- If complexity grows beyond what the request needs, simplify before continuing.
- If any must-have acceptance criterion is unmet, do not report the phase as complete; list blockers and required fixes.

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
   - `apps/quizhuis/demo/<FEATURE_FOLDER>/design-review.md` (use the latest appended design-review-cycle section)
   - `apps/quizhuis/demo/<FEATURE_FOLDER>/plan.md`
   - `apps/quizhuis/demo/<FEATURE_FOLDER>/review.md` (if present from a previous failed review cycle; use the latest appended review-cycle section)
4. Confirm the latest design-review-cycle verdict in `design-review.md` is `PASS`.
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
- Map each must-have acceptance criterion to executable verification evidence.
- For interactive must-haves (multi-step user actions, cross-component/state wiring, navigation/deep-linking, async/network behavior), add or update automated integration-style tests; code inspection may supplement but cannot be sole evidence.
- If automation is truly infeasible for an interactive must-have, include deterministic manual validation steps + expected outcomes + rationale in `implementation.md`.
- Validate the primary user flow with executable evidence before concluding implementation.
- When `review.md` exists with latest review-cycle verdict `FAIL`, treat listed required fixes from that latest cycle as mandatory in-scope work for this iteration.
- Preserve all previously satisfied must-have acceptance criteria while addressing review fixes.
- Keep verification evidence current for every must-have criterion in every iteration (including unchanged behavior).

## Output requirements

`implementation.md` must include:

1. scope delivered (what was implemented)
2. file-by-file change log (file path + what changed + why)
3. acceptance-criteria verification table (criterion -> evidence type -> evidence trace (test file/command/manual script) -> result)
4. behavior changes and user impact
5. test/build results (commands + outcomes)
6. remaining risks, limitations, or deferred items
7. review-loop reconciliation (if applicable): required fixes from the latest review cycle in `review.md` -> resolution status -> evidence

## Guardrails

- Treat `00-feature-input.md` as source of truth for request metadata.
- Implement only the approved plan scope unless explicitly expanded.
- If complexity grows beyond what the request needs, simplify before continuing.
- If any must-have acceptance criterion is unmet, do not report the phase as complete; list blockers and required fixes.
- Do not mark interactive must-have criteria as satisfied using only code inspection.
- If required executable evidence for an interactive must-have is missing, report `FAIL` and list the missing tests/validation steps.
- If review-driven rework regresses a previously passing must-have criterion, report `FAIL` and list the regression explicitly.

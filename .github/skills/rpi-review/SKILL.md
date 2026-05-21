---
name: rpi.review
description: Reviews RPI outputs and implementation quality, produces a PASS/FAIL review gate artifact, and records durable findings in harness memory. Use when implementation is complete and progression to compounding must be explicitly approved.
---

# RPI Review (QuizHuis)

## Quick start

1. Receive orchestrator inputs (`FEATURE_REQUEST`, `FEATURE_FOLDER`, paths).
2. Read:
   - `apps/quizhuis/demo/<FEATURE_FOLDER>/research.md`
   - `apps/quizhuis/demo/<FEATURE_FOLDER>/design-review.md`
   - `apps/quizhuis/demo/<FEATURE_FOLDER>/plan.md`
   - `apps/quizhuis/demo/<FEATURE_FOLDER>/implementation.md`
3. Invoke `software-development-best-practices` and apply KISS, minimalistic code, and clean code principles as review lenses.
4. Extract must-have acceptance criteria from request + plan and `FR-id` decomposition from `research.md`; classify each criterion as interactive or non-interactive.
5. Independently verify delivered behavior in the workspace (do not rely only on `implementation.md`), including:
   - required project checks from `apps/quizhuis` (`npm run lint && npm run test && npm run build`)
   - primary user flow validation with executable evidence (automated preferred; manual with explicit steps/results when required)
6. Review delivered work quality and improvement opportunities.
7. Append gate result as a new review-cycle section in `apps/quizhuis/demo/<FEATURE_FOLDER>/review.md` (create file if missing).
8. Write findings to `.harness/memory/YYYY-MM-DD.md`.

## Review focus

1. Correctness gate: each must-have acceptance criterion is proven with independent evidence.
2. Scope alignment: request vs delivered behavior.
3. Plan adherence: what matched, what diverged, why.
4. Regression safety: previously satisfied must-have criteria still pass after rework.
5. Technical quality: architecture fit, code clarity, risk hotspots.
6. Testing quality: coverage relevance and confidence gaps.
7. UX/UI fit: consistency with expected user flow.
8. Improvement opportunities: quick wins vs deferred items.
9. Simplicity audit: where complexity can be reduced while preserving requested behavior.
10. Evidence sufficiency: interactive must-haves are not accepted with code-inspection-only evidence.

## Output requirements

1. Produce exactly one gate file:
   - `apps/quizhuis/demo/<FEATURE_FOLDER>/review.md`
2. `review.md` is append-only:
   1. If file is missing, create it.
   2. If file exists, preserve all prior review cycles.
   3. Append a new section at the end titled: `## Review Cycle: <ISO-8601 timestamp>`
3. The newly appended review-cycle section must include:
   1. verdict (`PASS` or `FAIL`)
   2. must-have acceptance-criteria verification table (criterion -> evidence type -> evidence trace -> result)
   3. request-fulfillment matrix (`FR-id` -> expected outcome -> evidence trace -> result)
   4. blocking issues (required for `FAIL`, each mapped to an unmet must-have criterion, unmet `FR-id`, or a critical risk)
   5. required fixes before progression
   6. quality observations
   7. next-step instruction:
      - `PASS` -> proceed to `rpi.compound`
      - `FAIL` -> return to `rpi.implement` with required fixes
   8. regression notes (what remained stable vs what regressed)
4. The latest appended review-cycle section is the source of truth for orchestration decisions.
5. `PASS` is allowed only when every must-have criterion has explicit independent evidence and the primary user flow works end-to-end.
6. Interactive must-haves require executable evidence (`integration-test`, `e2e-test`, or deterministic `manual-run` evidence with observed results); code-inspection-only evidence is insufficient for `PASS`.
7. `PASS` is allowed only when every `FR-id` from `research.md` has explicit evidence and `PASS` status in the request-fulfillment matrix.
8. Update/create a dated memory file under `.harness/memory/`.
9. Add a section titled: `## Feature Review: <FEATURE_FOLDER>`.
10. Include:
   1. summary verdict
   2. what is good
   3. what can be done better
   4. prioritized improvements
   5. carry-over risks/limitations

## Guardrails

- Do not modify app source code in this phase.
- Limit writes to:
  - `apps/quizhuis/demo/<FEATURE_FOLDER>/review.md`
  - `.harness/memory/YYYY-MM-DD.md`
- Keep findings concise and actionable.
- Do not rewrite research/plan/implementation artifacts here.
- Do not rely solely on implementation claims; verify against code/check outputs and observed behavior.
- If any must-have criterion cannot be verified, set verdict to `FAIL` and list the exact missing evidence/fixes.
- If any interactive must-have has only code-inspection evidence, set verdict to `FAIL` and require explicit executable verification work.
- If any `FR-id` lacks evidence or has no explicit review result, set verdict to `FAIL` and require traceability fixes.
- Use code inspection as supplemental evidence, not sole PASS evidence for interactive must-haves.
- Use `PASS` with quality observations for non-blocking improvements.
- Reserve `FAIL` for unmet must-have criteria, broken primary flow, regressions, or critical user-impacting risk.
- Never overwrite or delete previous review-cycle sections in `review.md`.

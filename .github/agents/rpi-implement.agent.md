---
name: rpi-implement-agent
description: Executes only the RPI implementation phase, applies testing best practices, and writes the implementation report artifact. Use when planning is approved and coding should begin.
---

You execute only the Implement phase.

1. Invoke skills in this order:
   - `rpi.implement`
   - `software-development-best-practices`
   - `test-best-practices`
2. Read:
   - `apps/quizhuis/demo/<FEATURE_FOLDER>/research.md`
   - `apps/quizhuis/demo/<FEATURE_FOLDER>/design-review.md` (use the latest appended design-review-cycle section)
   - `apps/quizhuis/demo/<FEATURE_FOLDER>/plan.md`
   - `apps/quizhuis/demo/<FEATURE_FOLDER>/review.md` (if present from a prior failed review; use the latest appended review-cycle section)
3. Continue only when the latest design-review-cycle verdict is `PASS`.
4. Implement the approved plan scope (plus required fixes from the latest failed review cycle when present), preserve previously satisfied must-have criteria, and run required checks.
5. Produce executable verification evidence for every must-have criterion.
   - Ensure every `FR-id` from `research.md` is explicitly addressed in implementation outputs.
   - For interactive must-have criteria (multi-step user flows, cross-component/state transitions, deep-linking/navigation, async/network behavior), add/update automated integration-style tests.
   - Do not rely on code inspection as the sole evidence for interactive must-haves.
6. Produce exactly one artifact:
   - `apps/quizhuis/demo/<FEATURE_FOLDER>/implementation.md`
7. If must-have acceptance criteria are unmet, `FR-id` traceability is incomplete, interactive-evidence requirements are not met, or regressions occur after rework, return `FAIL` with required fixes.

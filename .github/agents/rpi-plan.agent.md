---
name: rpi-plan-agent
description: Executes only the RPI planning phase and writes the implementation plan artifact. Use when design-review passed and implementation planning is required.
---

You execute only the Plan phase.

1. Invoke skills in this order:
   - `rpi.plan`
   - `software-development-best-practices`
2. Read:
   - `apps/quizhuis/demo/<FEATURE_FOLDER>/research.md`
   - `apps/quizhuis/demo/<FEATURE_FOLDER>/design-review.md` (use the latest appended design-review-cycle section)
3. Continue only when the latest design-review-cycle verdict is `PASS`.
4. Produce exactly one artifact:
   - `apps/quizhuis/demo/<FEATURE_FOLDER>/plan.md`
5. Do not write code.

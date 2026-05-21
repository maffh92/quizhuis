---
name: rpi-design-review-agent
description: Executes only the RPI design-review phase and writes a PASS/FAIL design gate artifact. Use when research is complete and planning needs explicit design approval.
---

You execute only the Design Review phase.

1. Invoke skills in this order:
   - `rpi.design-review`
   - `software-development-best-practices`
   - `ux-ui-best-practices`
2. Read:
   - `apps/quizhuis/demo/<FEATURE_FOLDER>/research.md`
3. Validate `research.md` includes request decomposition (`FR-id` coverage) and that design direction covers each `FR-id` without downgrading requested outcomes.
4. Produce exactly one artifact by appending a new design-review-cycle section (never overwrite previous design-review cycles):
   - `apps/quizhuis/demo/<FEATURE_FOLDER>/design-review.md`
5. Ensure the latest appended design-review-cycle section contains explicit verdict (`PASS` or `FAIL`) and required changes.
6. Do not write code.

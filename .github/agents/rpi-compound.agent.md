---
name: rpi-compound-agent
description: Executes only the RPI compounding phase after review PASS and applies consistent documentation updates when required. Use when review is complete and compounding should finalize the feature flow.
---

You execute only the Compound phase.

1. Invoke skills in this order:
   - `rpi.compound`
   - `software-development-best-practices`
   - `documentation-writing-consistency`
2. Read:
   - `apps/quizhuis/demo/<FEATURE_FOLDER>/review.md` (use the latest appended review-cycle section)
   - `.harness/memory/YYYY-MM-DD.md`
3. Continue only when the latest review-cycle verdict is `PASS`.
4. Apply doc updates only if required by review findings.
5. Record compound decision in `.harness/memory/YYYY-MM-DD.md`.
6. Do not modify app source code in this phase.

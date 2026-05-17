# Implement Phase Prompt (I)

No replacements needed in this file.
Set values once in: `demo/00-feature-input.md`

```text
Act as an Implementation Agent for QuizHuis.

Read feature input from:
demo/00-feature-input.md

Treat that file as the source of truth for:
- FEATURE_REQUEST
- FEATURE_FOLDER

Implement FEATURE_REQUEST exactly as defined in the approved plan.

Use these documents as input:
- demo/<FEATURE_FOLDER>/research.md
- demo/<FEATURE_FOLDER>/plan.md

Rules:
- keep changes minimal and aligned with existing architecture and coding style
- avoid unrelated refactors
- keep scope to MVP for demo purposes
- run relevant tests after changes and fix regressions you introduce

After implementing, deliver exactly one implementation report at:
demo/<FEATURE_FOLDER>/implementation.md

implementation.md must include a detailed description of what was added, where, and why:
1. scope delivered (what was implemented)
2. file-by-file change log (file path + what changed + why)
3. behavior changes and user impact
4. test results
5. remaining risks, limitations, or deferred items
```

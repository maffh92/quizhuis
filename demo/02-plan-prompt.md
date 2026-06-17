# Plan Phase Prompt (P)

No replacements needed in this file.
Set values once in: `demo/00-feature-input.md`

```text
Act as a Planning Agent for QuizHuis.

Read feature input from:
demo/00-feature-input.md

Treat that file as the source of truth for:
- FEATURE_REQUEST
- FEATURE_FOLDER

Use this research document as input:
demo/<FEATURE_FOLDER>/research.md

Create an implementation plan only, no code changes yet.
Deliver all planning output as exactly one Markdown document at:
demo/<FEATURE_FOLDER>/plan.md

Provide:
1. prioritized task decomposition
2. dependency notes
3. acceptance criteria
4. test strategy
5. rollback plan

Focus on execution order and why each task is prioritized.
Do not write implementation details as code changes in this phase.
```

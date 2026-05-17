# Plan Phase Prompt (P)

Replace `{{FEATURE_REQUEST}}` with the same request used in research.

```text
Act as a Planning Agent.
Input is the approved research recommendation for: {{FEATURE_REQUEST}}.
Create an implementation plan only, no code changes yet.

Provide:
1. prioritized task decomposition
2. dependency notes
3. acceptance criteria
4. test strategy
5. rollback plan

Focus on execution order and why each task is prioritized.
```

---
name: software-development-best-practices
description: Applies software engineering best practices for planning, implementation, and refactoring in this repository. Use when building features, fixing bugs, reviewing architecture tradeoffs, or when the user asks for development best practices.
---

# Software Development Best Practices

## Quick start

1. Confirm scope and success criteria before editing.
2. Read existing code paths and reuse existing helpers first.
3. Make the smallest complete change that solves the root cause.
4. Keep type safety and explicit error handling intact.
5. Run project checks in `apps/quizhuis` after changes.

## Workflow

1. **Understand first**
   - Read relevant files end-to-end before editing.
   - Align with existing naming, layering, and patterns.
2. **Implement safely**
   - Prefer composition over duplication.
   - Avoid broad catches and silent fallback behavior.
   - Keep data flow explicit and predictable.
3. **Keep boundaries clear**
   - App/product code in `apps/quizhuis`.
   - Harness/runtime code in `.harness`.
   - Skill/policy docs in `.github/skills`.
4. **Validate**
   - `cd apps/quizhuis && npm run lint && npm run test && npm run build`

## Checklist

- Behavior changed intentionally and completely.
- No unrelated refactors.
- No weakening of typing (`any`/unsafe casts).
- Error paths remain explicit.

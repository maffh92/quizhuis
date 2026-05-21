---
name: software-development-best-practices
description: Applies software engineering best practices for planning, implementation, and refactoring in this repository. Use when building features, fixing bugs, reviewing architecture tradeoffs, or when the user asks for development best practices.
---

# Software Development Best Practices

## Core principles

1. **KISS (Keep It Simple, Stupid)**
   - Prefer the simplest solution that fully satisfies the request.
   - If two options work, choose the one with fewer moving parts.
2. **Minimalistic code**
   - Add the smallest complete change set.
   - Avoid speculative abstractions, layers, or config not needed now.
3. **Clean code**
   - Use intention-revealing names and focused functions.
   - Keep responsibilities clear and avoid hidden side effects.

## Quick start

1. Confirm scope and success criteria before editing.
2. Read existing code paths and reuse existing helpers first.
3. Make the smallest complete change that solves the root cause.
4. Keep type safety and explicit error handling intact.
5. Run project checks in `apps/quizhuis` after changes.
6. Apply KISS, minimalistic code, and clean code principles in every decision.

## Workflow

1. **Understand first**
   - Read relevant files end-to-end before editing.
   - Align with existing naming, layering, and patterns.
2. **Implement safely**
    - Prefer composition over duplication.
   - Default to the simplest architecture that works.
   - Add new abstractions only when they provide clear, immediate value.
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
- KISS: no avoidable complexity was introduced.
- Minimalistic: no unnecessary files, abstractions, or indirection were added.
- Clean code: names and structure are clear, focused, and maintainable.
- No unrelated refactors.
- No weakening of typing (`any`/unsafe casts).
- Error paths remain explicit.

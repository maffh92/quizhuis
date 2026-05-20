---
name: test-best-practices
description: Guides test strategy and implementation with behavior-focused, deterministic tests that stay maintainable during refactors. Use when adding tests, fixing flaky tests, deciding coverage depth, or improving test quality.
---

# Test Best Practices

## Quick start

1. Define the behavior that matters to users.
2. Test through public interfaces, not internals.
3. Prefer deterministic inputs, clocks, and assertions.
4. Keep one clear intent per test.
5. Run tests from `apps/quizhuis`.

## Workflow

1. **Pick the right level**
   - Unit: isolated pure logic.
   - Integration: feature flow and state transitions.
   - Avoid over-mocking core domain behavior.
2. **Write resilient tests**
   - Use clear Arrange-Act-Assert structure.
   - Assert observable outcomes, not implementation details.
   - Avoid brittle snapshots unless UI shape is the real contract.
3. **Stabilize reliability**
   - Remove timing races and random inputs.
   - Use explicit fake timers when needed.
   - Keep fixtures minimal and domain-accurate.
4. **Run and evaluate**
   - `cd apps/quizhuis && npm run test`

## Quality checks

- Test name states behavior.
- Failure message is actionable.
- Test survives internal refactors.
- No redundant tests for the same behavior.

# Vitest with behavioral domain tests, no component tests

We're adding test coverage using Vitest, focused exclusively on domain logic (scoring, phase transitions, bot simulation) tested through public interfaces. No React component/UI tests for now.

**Why Vitest:** Zero-config with the existing Vite pipeline — same transform, same ESM support, no separate build toolchain to maintain.

**Why domain-only:** The app is a single-player quiz with simple UI interactions. The complex, bug-prone logic lives in pure functions (`calculateScore`) and the Zustand state machine — these are testable without a DOM or React rendering. Component tests would add jsdom/RTL overhead to verify what amounts to "renders the current phase," which the domain tests already prove works correctly.

**Why inject randomness instead of mocking `Math.random`:** Bot simulation depends heavily on randomness. Rather than `vi.spyOn(Math, 'random')` (global, fragile, order-dependent), we inject a `random: () => number` parameter into bot functions. This keeps tests deterministic without coupling them to the mocking framework. Trade-off: slightly changes production function signatures, but the default parameter keeps call sites clean.

**Why export `calculateScore`:** It's a pure function with complex branching (3 question types × time bonus × partial scoring). Testing it indirectly through `submitAnswer` requires full store setup just to verify arithmetic. Direct access lets us exhaustively cover edge cases without ceremony.

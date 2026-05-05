# Zustand store as hand-rolled state machine for game flow

The quiz game flow (LOBBY → QUESTION_INTRO → QUESTION_ACTIVE → RESULT_REVEAL → LEADERBOARD → next question) is implemented as explicit transition functions in a single Zustand store, rather than using a state machine library like XState or a React `useReducer`.

**Why:** The game has a small, linear set of phases with simple guard conditions. XState adds bundle size and ceremony (machine definitions, service spawning) for a state graph that fits in ~50 lines of Zustand actions. `useReducer` was rejected because the timer, player simulation, and scoring all need to read/write the same store — Zustand's `getState()` and subscriptions make this ergonomic outside of React components (e.g., in `setTimeout` callbacks for bot answers).

**Trade-off:** If the phase graph becomes significantly more complex (branching paths, parallel states, delayed transitions with cancellation), migrating to XState would be worth the cost. For now the linear flow doesn't justify it.

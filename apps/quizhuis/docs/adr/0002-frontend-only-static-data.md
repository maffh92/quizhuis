# Frontend-only architecture with static quiz data

**Status:** Superseded by [0005-pragmatic-architecture-fit](0005-pragmatic-architecture-fit.md)

QuizHuis runs entirely in the browser with no backend. Quiz data is loaded from static JSON files (`public/quizzes/*.json`) via `fetch()`. Player simulation, scoring, and game flow all happen client-side.

**Why:** The primary use case is a single person playing a quiz on their own device, optionally with simulated opponents. There's no need for real-time synchronization, persistence, or authentication. Removing the backend eliminates deployment complexity (single static site), enables offline use, and makes development fast.

**Trade-off:** The `fetch('/quizzes/...')` pattern is deliberately API-shaped so that a backend can be introduced later by changing URLs — but no backend is planned. If real multiplayer (multiple devices) is ever needed, this decision would need to be revisited.

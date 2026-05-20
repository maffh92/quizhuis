# Harness workspace

This directory stores agent harness artifacts.

- `memory/`: durable, repo-tracked memory.
- `session/`: local, non-versioned scratch data.

Agents should use the `ce-compound` skill for memory updates.

Manual local fallback:

`./.harness/scripts/roll-harness-memory.sh`

This script runs the Copilot CLI prompt from `.harness/prompt/compound.md`.

# Harness workspace

This directory stores agent harness artifacts.

- `memory/`: durable, repo-tracked memory.
- `session/`: local, non-versioned scratch data.

Run memory compounding manually with:

`./.harness/scripts/roll-harness-memory.sh`

This script runs the Copilot CLI prompt from `.harness/prompt/compound.md`.

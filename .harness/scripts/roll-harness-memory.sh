#!/usr/bin/env bash
set -euo pipefail

repo_root="$(git rev-parse --show-toplevel)"
prompt_file="$repo_root/.harness/prompt/compound.md"

if [ ! -f "$prompt_file" ]; then
  echo "Prompt file not found: $prompt_file" >&2
  exit 1
fi

prompt="$(cat "$prompt_file")"
if [ -z "$(printf '%s' "$prompt" | tr -d '[:space:]')" ]; then
  echo "Prompt file is empty: $prompt_file" >&2
  exit 1
fi

if command -v copilot >/dev/null 2>&1; then
  cd "$repo_root"
  copilot --allow-all-tools --allow-all-paths -p "$prompt"
  exit 0
fi

if command -v gh >/dev/null 2>&1 && gh copilot -- --help >/dev/null 2>&1; then
  cd "$repo_root"
  gh copilot -- --allow-all-tools --allow-all-paths -p "$prompt"
  exit 0
fi

echo "Copilot CLI was not found. Install it or use 'gh copilot'." >&2
exit 1

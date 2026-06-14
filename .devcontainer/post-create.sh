#!/bin/bash
# =============================================================================
# post-create.sh
# =============================================================================
#
# Bootstraps the devcontainer once it has been built. Wired up via
# .devcontainer/devcontainer.json `postCreateCommand`.
#
# =============================================================================
set -euo pipefail
trap 'echo "❌ Error on line $LINENO"; exit 1' ERR

echo "🚀 Starting post-create configuration..."

# 1. Sync project dependencies
echo "📚 Syncing dependencies..."
uv sync --all-groups

# 2. Install Git hooks
echo "🪝 Installing pre-commit hooks..."
uv run pre-commit install

echo "✅ Configuration completed successfully!"

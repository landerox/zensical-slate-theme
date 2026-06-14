# Justfile - Task runner for zensical-slate-theme

default:
    @just --list

# =============================================================================
# Development
# =============================================================================

# Start EN dev server (alias for serve-en)
serve: serve-en

# Synchronize Spanish assets from English assets (maintains DRY in Git, copies for Zensical)
sync-assets:
    #!/usr/bin/env bash
    set -euo pipefail
    echo "Synchronizing bilingual assets..."
    rm -rf content/es/assets
    if [ -d content/en/assets ]; then
        mkdir -p content/es/assets
        cp -R content/en/assets/* content/es/assets/ 2>/dev/null || true
    fi


# EN dev server at http://127.0.0.1:8000
serve-en: sync-assets
    uv run zensical serve -f zensical.toml

# ES dev server at http://127.0.0.1:8001
serve-es: sync-assets
    uv run zensical serve -f zensical.es.toml -a localhost:8001

# Build EN + ES into site/
build: build-en build-es
    # GitHub Pages serves /404.html for any unresolved path and is
    # locale-agnostic, so a copy of the EN 404 would show in English
    # even under /es/*. Replace Zensical's generic 404.html with a
    # tiny router that forwards /es/* errors to /es/404/ and everything
    # else to /404/. See .config/404-router.html.
    @cp .config/404-router.html site/404.html

# Build EN site (clears site/ first)
build-en: sync-assets
    uv run zensical build -f zensical.toml --clean

# Build ES site into site/es/
build-es: sync-assets
    uv run zensical build -f zensical.es.toml --clean


# Remove site/ and Python caches
clean:
    rm -rf .cache site .ruff_cache .pytest_cache

# Clean caches and rebuild EN + ES
rebuild: clean build

# =============================================================================
# Quality Assurance
# =============================================================================

# Run all pre-commit hooks across the repo
lint:
    uv run pre-commit run --all-files

# Run ESLint on JavaScript files
lint-js:
    uv run pre-commit run eslint --all-files

# Run Stylelint on CSS files
lint-css:
    uv run pre-commit run stylelint --all-files

# Audit Python deps for known vulnerabilities (pip-audit)
audit:
    #!/usr/bin/env bash
    set -euo pipefail
    req=$(mktemp -t pip-audit-XXXXXX.txt)
    trap 'rm -f "$req"' EXIT
    uv export --frozen --format requirements-txt --no-emit-project --output-file "$req"
    # PYSEC-2026-89: not applicable to build-time static-site usage.
    # See exposure assessment in the commit introducing this flag.
    uv run pip-audit --requirement "$req" --ignore-vuln PYSEC-2026-89

# Run cspell on all files
spell:
    uv run pre-commit run cspell --all-files

# Validate outbound links in content/ with lychee
links:
    lychee --config .config/lychee.toml content/

# =============================================================================
# Dependencies
# =============================================================================

# Install / refresh dependencies from uv.lock
sync:
    uv sync --all-groups

# Upgrade lockfile and sync
update:
    uv lock --upgrade
    uv sync --all-groups

# List outdated dependencies
outdated:
    uv tree --outdated

# =============================================================================
# Git Hooks
# =============================================================================

# Install git hooks (pre-commit + commit-msg)
hooks-install:
    uv run pre-commit install

# Update hook revs to latest tags
hooks-update:
    uv run pre-commit autoupdate

# Uninstall git hooks
hooks-uninstall:
    uv run pre-commit uninstall

# =============================================================================
# Security
# =============================================================================

# Pin all GitHub Actions references to SHAs (rerun after editing workflows)
pin-actions:
    pinact run

# =============================================================================
# Utilities
# =============================================================================

# Show dependency tree
tree:
    uv tree

# Open EN dev server in browser
open:
    xdg-open http://127.0.0.1:8000 2>/dev/null || open http://127.0.0.1:8000

# Conventional commit (commitizen guided)
commit:
    uv run cz commit

# Preview next version bump without committing or tagging
release-preview:
    uv run cz bump --dry-run

# Bump version + tag (commitizen). CHANGELOG.md is updated by hand
# beforehand — see docs/decisions.md § 4. Do NOT pass --changelog.
bump:
    uv run cz bump

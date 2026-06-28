# AGENTS.md — Single Source of Truth for AI Assistants 🤖

This file is automatically loaded by coding agents (Claude Code, Antigravity
CLI, Copilot CLI, etc.) to understand the structure, architecture,
conventions, and workflow of this repository.

## 1. Project Overview

- **Stack**: Python 3.13, Zensical Static Site Generator (Rust-powered under
  the hood), `uv` (package manager), `just` (task runner).
- **Purpose**: A bilingual (EN/ES) portfolio and blog site theme and starter
  template.
- **Hosting / Deploy**: GitHub Pages, with automatic deployments via GitHub
  Actions (`.github/workflows/deploy.yml`).

- `zensical_slate_theme/`: The core Python theme package containing base styles
  (`extra.css`), scripts (`extra.js`), default images, and `mkdocs_theme.yml`.
- `content/en/`: English pages, blog posts, and optional custom asset
  overrides.
- `content/es/`: Spanish pages and blog posts.
- `content/en/assets/`: Optional custom design asset overrides (e.g., personal
  images) for the Starter Template.
- `scripts/check_i18n.py`: Python script verifying directory and front-matter
  symmetry between English and Spanish.
- `Justfile`: Task runner definitions for syncing, building, linting, and
  testing.
- `docs/security_assessment.md`: The threat model and assurance case for
  repository security and CI/CD policies.
- `docs/decisions.md`: Architectural and design decisions for the repository
  (including changelog and audit scoping).

## 3. Critical Rules for AI Agents ⚠️

- **Security Posture & Compliance**: AI Assistants must align all development
  workflows with the official [Security Assessment](file:///home/nano/workspaces/github/personal/zensical-slate-theme/docs/security_assessment.md).
  Mitigations such as Gitleaks secrets detection, CodeQL scans, and DCO commit
  checks must be strictly adhered to.
- **Bilingual Asset Policy (DRY)**: NEVER edit any CSS, JS, fonts, or primary
  images inside `content/es/assets/` directly!
  - `zensical_slate_theme/` is the single source of truth for theme-wide core
    assets (CSS, JS, default images).
  - `content/en/assets/` is the single source of truth for custom,
    project-specific overrides.
  - The Spanish assets directory is completely overwritten by `just sync-assets`
    (called automatically during dev serve and builds).
- **Bilingual Content Symmetry**: Every Markdown page or blog post under
  `content/en/` MUST have a relative-path counterpart under `content/es/`.
  - Always run `python3 scripts/check_i18n.py` after adding, deleting, or
    editing Markdown files to verify heading levels, front-matter keys, and
    page structures remain synchronized.
- **Zensical Placeholders**: When adding placeholder text, avoid square
  brackets `[Placeholder]` to prevent Zensical from interpreting them as
  unresolved Markdown link references. Use braces `{Placeholder}` or double
  curly braces `{{ Placeholder }}` instead.
- **Theme Asset Injection (Zero-Config)**: The package uses
  `zensical_slate_theme/main.html` to automatically inject the theme's default
  styles (`extra.css`) and scripts (`extra.js`).
  - DO NOT declare `extra_css = ["/assets/css/extra.css"]` or
    `extra_javascript = ["/assets/js/extra.js"]` in the starter template
    configuration files (`zensical.toml` or `zensical.es.toml`), as they are now
    loaded natively via theme layout inheritance.
  - If a user wishes to declare site-specific custom overrides, they can do so
    in `zensical.toml`, but core theme styles must not be manually configured.
- **Propose, Do Not Execute (Command Restraint)**: AI Assistants must always
  **propose commands** to the user instead of executing them directly, unless
  the user has explicitly requested otherwise (e.g., asking to run a specific
  command or task). All system commands and git actions (such as staging,
  committing, pushing, and PR creation) must be fully proposed first for
  explicit user approval.
- **No Force Pushing (Rewriting History Prohibited)**: Coding agents MUST NEVER
  use `git push --force` or `git push --force-with-lease` under any
  circumstances. If a branch's commit history needs correction, propose closing
  the current Pull Request, deleting the remote branch, and recreating it fresh
  rather than rewriting history.
- **PR Template Compliance**: Every Pull Request (PR) created by a coding agent
  must strictly comply with and fill out the template defined in
  `.github/PULL_REQUEST_TEMPLATE.md`.
  - As a staging step, the agent must save the fully completed PR template text
    to `.tmp/pull_request.txt` to verify metadata and checklist items before
    proposing final changes.
- **No Direct Local Merges/Rebases (PR-Only)**: Coding agents MUST NEVER run
  merge or rebase locally. The agent's role is strictly to prepare work on a
  separate release or feature branch (e.g., `release/v<version>`), commit
  changes, propose pushing, and prepare the Pull Request (PR).
  - Merging or rebasing of the PR must be left entirely to the user.
  - In GitHub settings, only "Squash and merge" or "Rebase and merge" must be
    allowed (merge commits are prohibited). The feature branch must be set to
    automatically delete immediately upon a successful merge.
- **Strict Lowercase Commit Messages**: All commit messages and PR titles MUST
  be strictly in lowercase conventional commits format (e.g., `chore(release):
  bump version to 0.1.0`, `style(format): format markdown`). Uppercase
  characters or non-standard scopes in commits are strictly prohibited.
- **Mandatory DCO Sign-off (Signed-off-by)**: Every single commit must be
  explicitly signed-off to pass the Developer Certificate of Origin (DCO) CI
  check. When proposing git commit commands, always include the `-s` or
  `--signoff` flag (e.g., `git commit -s -m "..."`).
- **Workspace Version Alignment**: All project and release version numbers
  MUST always be kept strictly aligned across all files in the repository.
  Whenever the release version is bumped or changed, the version must match
  identically in:
  - `pyproject.toml` (both the main `version` and `[tool.commitizen]` section)
  - `zensical_slate_theme/__init__.py` (`__version__`)
  - `README.md` (the SVG badge version number)
  - `CHANGELOG.md` (the release header, e.g., `## [0.1.0] - 2026-06-07`)

## 4. Workflows & Commands

- **Development**:
  - English dev server (port 8000): `just serve` (or `just serve-en`)
  - Spanish dev server (port 8001): `just serve-es`
- **Build**:
  - Build both languages into `site/`: `just build`
- **Linting & Quality**:
  - Run all quality checks: `just lint`
  - Run spellcheck specifically: `just spell`
  - Verify outbound links: `just links`
- **Synchronization**:
  - Sync python dependencies: `just sync`

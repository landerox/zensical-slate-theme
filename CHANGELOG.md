# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.2] - 2026-06-21

### Changed

- Upgraded pinned `uv` tool version to `0.11.23` across all workflows
  (`ci.yml`, `deploy.yml`, `quality.yml`, `uv-upgrade.yml`).
- Upgraded `uv` in `.devcontainer/Dockerfile` to `0.11.23` and pinned it with
  its multi-architecture manifest list SHA256 digest:
  `sha256:d0a0a753ab981624b49c97abc98821c1c09f4ca69d1ef5cee69c501be3d88479`.
- Upgraded `zensical` dependency to `0.0.46` in `pyproject.toml` and updated its
  version badge in `README.md`.

### Fixed

- Resolved syntax error in DCO validation workflow (`dco.yml`) when manually
  triggered via `workflow_dispatch` with empty pull request parameters.

### Security

- Configured `main-branch-protection` repository ruleset requiring signed
  commits, linear history, pull requests, and status checks (`ci`, `DCO`).
- Enabled commit signing (`sign-commits: true`) in the weekly lockfile upgrade
  workflow (`uv-upgrade.yml`) to satisfy branch protection requirements.
- Configured grouped security updates in `dependabot.yml` to consolidate action
  and python dependency security alerts.

---

## [0.1.1] - 2026-06-18

### Fixed

- Upgraded pip inside .devcontainer/Dockerfile to 26.1.2.
- Downgraded lychee version to v0.23.0 in links checker workflow to resolve
  archive extraction bug in lycheeverse/lychee-action.

---

## [0.1.0] - 2026-06-13

### Added

- **CodeQL Security Analysis**:
  - Configured a new CodeQL analysis workflow (`.github/workflows/codeql.yml`)
    using the latest `github/codeql-action@v4` (v4.36.2) to scan Python and
    JavaScript/TypeScript.

### Changed

- **CI/CD & Tooling Updates**:
  - Upgraded pinned `uv` tool version to `0.11.21` across all workflows
    (`ci.yml`, `deploy.yml`, `quality.yml`, `uv-upgrade.yml`).
  - Upgraded `uv` in `.devcontainer/Dockerfile` to `0.11.21` and pinned it with
    its multi-architecture manifest list SHA256 digest
    (`sha256:ff07b86af50d4d9391d9daf4ff89ce427bc544f9aae87057e69a1cc0aa369946`).
- **Interactive Theme Enhancements**:
  - Switched canvas resize logic in `extra.js` to `setTransform` to prevent
    transform compounding.
  - Upgraded neural network background parameters: particle count (`115`),
    connection distance (`220px`), particle radius (`2.5px - 5.5px`), and
    cursor attraction (`200px`).
  - Added path-aware dynamic particle accent hues (AI/ML, Data, DevOps/Cloud)
    for the interactive background.
  - Refined navigation tab active indicator with a centered-inset underline
    (`::after` pseudo-element) in `extra.css`.
  - Increased footer social links hover scale to `scale(1.25)`.
  - Updated copyright and author details across site configs (`zensical.toml`,
    `zensical.es.toml`) and `LICENSE-CONTENT` to reflect dual-licensing
    (Code: MIT, Content: CC-BY-4.0).
  - Registered Spanish word `licencia` in spelling dictionary config
    `.config/.cspell.json`.

---

## [0.1.0] - 2026-06-09

### Added

- **Slate Aesthetics & Interactivity**:
  - Premium deep graphite theme design with smooth custom variables.
  - Interactive Canvas neural particle network responding dynamically to cursor
    coordinate changes.
  - Circular ripple page animation on light/dark mode toggling.
  - Interactive 3D glassmorphism hover glare tilt-cards.
- **Bilingual Structure (EN/ES)**:
  - Perfect relative path structural symmetry between `/` (English) and `/es/`
    (Spanish).
  - DRY billingual asset sync (`just sync-assets`) automatically mirroring
    extra stylesheets, JS scripts, and custom fonts.
  - Strict directory and markdown front-matter checker script
    (`python3 scripts/check_i18n.py`).
- **Developer Containerization (`.devcontainer`)**:
  - Full Dev Container configurations for Docker, VS Code, and Codespaces.
  - Idempotent `post-create.sh` bootstrapping Python virtualenvs and staging
    pre-commit hooks.
  - Automated `install-github-binary.sh` utility to fetch and compile missing
    system dependencies (`lychee`, `pinact`).
- **Professional Community & Guidelines**:
  - Interactive GitHub YAML Issue Forms for bugs (`bug_report.yml`) and
    feature requests (`feature_request.yml`).
  - Strict Developer Certificate of Origin (DCO) sign-off policy
    (`CONTRIBUTING.md`).
  - Welcoming contributor standards (`CODE_OF_CONDUCT.md`) and private
    security vulnerability policy (`SECURITY.md`).
- **Production CI/CD Workflows**:
  - **Deploy to Pages**: Automated builds and deployments to GitHub Pages on
    merges to main.
  - **CI Quality & Build**: Standard pre-commit lints, style lints,
    spellcheck, dependency audit, and test-build verification.
  - **CI DCO Check**: Pull Request verifications confirming all commits
    contain valid signed-off signatures.
  - **Lighthouse CI**: Automated performance, accessibility, SEO, and
    best-practices audits uploaded as PR artifacts.
  - **Weekly uv upgrade**: Automated weekly transitive dependencies lockfile
    upgrade pulls.
  - **Weekly link check**: Scheduled outbound link validator creating
    automated issues upon detecting broken references.
- **Dual-License Model**:
  - Source Code and tool configurations released under the **MIT License**
    (`LICENSE`).
  - Authored site content, assets, and markdown prose released under the
    **Creative Commons Attribution 4.0 International License**
    (`LICENSE-CONTENT`).

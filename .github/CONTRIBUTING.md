# Contributing Guide

Welcome! This document outlines the process for contributing to this project.

## Quick Start

### Prerequisites

- Python 3.13+
- [uv](https://docs.astral.sh/uv/) (package manager)
- [just](https://github.com/casey/just#installation) (command runner)
- [lychee](https://github.com/lycheeverse/lychee) (optional, for link checks)

### Setup

```bash
# 1. Install dependencies
just sync

# 2. Install pre-commit hooks
just hooks-install

# 3. Start dev server
just serve
```

Then open [http://localhost:8000](http://localhost:8000) in your browser.

---

## Development Workflow

1. **Branching:** Create a descriptive branch: `git checkout -b feat/my-feature`.
2. **Development:** Make your changes and run `just serve` to preview locally.
3. **Quality:** Run `just lint` before committing (or let pre-commit hooks run automatically).
4. **Commits:** Use `just commit` for interactive conventional commits (e.g.,
   `feat:`, `fix:`, `docs:`, `chore:`).

---

## How to Contribute

### Small Changes (typos, broken links)

- Fork the repository
- Make your changes
- Submit a PR

### New Content or Major Changes

- Open an issue first to discuss
- Wait for feedback before investing significant time
- Submit a PR referencing the issue
- One focused change per PR

---

## Adding a New Page

1. Create a new Markdown file under `content/en/` and its relative-path
   counterpart under `content/es/`.
2. Ensure both pages are fully synchronized in terms of heading structure,
   front-matter keys, etc.
3. Run `python3 scripts/check_i18n.py` to verify symmetry between English and
   Spanish.
4. Add the navigation entry in `zensical.toml` and `zensical.es.toml` under
   the `[nav]` section.
5. Run `just serve` to preview your changes locally.

---

## Developer Certificate of Origin (DCO)

To ensure a clean legal pedigree for all contributions, this project requires
contributions to comply with the Developer Certificate of Origin (DCO). By
contributing, you certify that you have the right to submit your contribution
under the project's dual-license model (MIT for code/configs, and CC-BY-4.0
for content).

To comply with the DCO, you must sign off your git commits by adding a
`Signed-off-by:` line at the end of each commit message. You can automate
this by running:

```bash
git commit -s -m "feat: your commit message"
```

---

## Roles and Responsibilities

This is an open-source static site theme and starter template. The project is
maintained by its maintainers, who retain sole write, merge, and administrative
access to this main repository. Contributors are welcome to submit bug reports,
suggestions, and Pull Requests.

---

## License

By contributing, you agree that your contributions will be licensed under the
project's dual-license model:

- **Code, workflows, and configurations**: licensed under the MIT License (see
  [LICENSE](LICENSE)).
- **Prose, articles, and site content**: licensed under the Creative Commons
  Attribution 4.0 International License.

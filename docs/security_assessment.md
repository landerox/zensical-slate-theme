# Security Assessment — zensical-slate-theme

A consolidated threat model and assurance case for the personal static
portfolio theme and starter template. This document satisfies OpenSSF Best
Practices Baseline-2 criterion `osps_sa_03_01` and supports the security
commitments documented in the repository.

## Scope

`zensical-slate-theme` is a hybrid packaged theme and starter template
generated via [Zensical](https://zensical.org) (Python) and hosted on GitHub
Pages. The repository contains the core Python theme package
(`zensical_slate_theme/`), markdown content (`content/`), site configurations
(`zensical.toml`, `zensical.es.toml`), GitHub Actions CI/CD workflows, and
development task runners. It does not run a daemon, does not expose dynamic
backend application endpoints, and does not process user credentials.

## Attack surface

| Surface | What it exposes | Where it lives |
| --- | --- | --- |
| GitHub Pages hosting | The published theme demo site rendered in user browsers over HTTPS | `site/` (built output hosted by GitHub) |
| CI / CD deployment | GitHub Actions workflows running with repository secrets / tokens | `.github/workflows/*.yml` |
| Supply chain | Third-party GitHub Actions, pre-commit hooks, and Python packages (Zensical, Jinja2, Click, Markdown, ESLint, Stylelint, cspell, etc.) | `.github/workflows/*.yml`, `.pre-commit-config.yaml`, `pyproject.toml`, `uv.lock` |
| Developer environment | Devcontainer and local shell configurations used to build and validate the site | `.devcontainer/`, `Justfile` |

## Threats considered

Each threat is mapped to the active controls in place to mitigate it.

### T1. Leaked credentials in version control

* **Risk**: A maintainer accidentally commits a secret API key, token, or
  private configuration.
* **Mitigations**:
  * `gitleaks` runs as a pre-commit hook on every local commit and in CI via
    `pre-commit` on every pull request.
  * `.gitignore` explicitly excludes local configurations (`.venv`, `.cache`,
    `.tmp`, etc.).

### T2. Malicious or accidental push to `main`

* **Risk**: Unauthorized code or compromised configuration is pushed directly
  to the production branch.
* **Mitigations**:
  * **Branch Protection Ruleset**: The `main-branch-protection` ruleset
    enforces the following policies on `main`:
    * **Requires a Pull Request**: Direct pushes to `main` are blocked. All
      changes must go through a PR.
    * **Requires Signed Commits**: Cryptographic signature verification is
      enforced on all commits.
    * **Requires Linear History**: Only Squash or Rebase merge methods are
      allowed (preventing merge commits).
    * **Required Status Checks**: The status checks `ci` (quality and build)
      and `dco` (DCO check) must pass before merging.
  * **DCO Check**: The `CI · DCO Check` workflow (`dco.yml`) verifies that every
    commit carries a Developer Certificate of Origin (`Signed-off-by:`)
    sign-off, establishing legal accountability for contributions.

### T3. Workflow privilege escalation

* **Risk**: A compromised workflow step or action exfiltrates secret tokens or
  overrides repository settings.
* **Mitigations**:
  * **Minimal Permissions**: Every workflow specifies a default
    `permissions: contents: read` block. Elevated permissions (like
    `security-events: write` in `codeql.yml` or `pages: write` and
    `id-token: write` in `deploy.yml`) are restricted strictly to the individual
    jobs that require them.
  * **SHA-256 Pinning**: All third-party GitHub Actions are pinned to their full
    40-character SHA-256 commits, with human-readable tag comments (e.g.,
    `actions/checkout@df4cb1c069e1874edd31b4311f1884172cec0e10 # v6.0.3`). This
    prevents tag-spoofing supply chain attacks.
  * **Workflow Linting**: `zizmor` runs in pre-commit and CI, scanning for
    dangerous workflow patterns (like unsafe `github.context` injections or
    unpinned uses). `actionlint` validates YAML structure.
  * **No credentials persistence**: The checkout step uses
    `persist-credentials: false` to ensure workflow tokens are not persisted to
    the working directory.

### T4. Compromised package or Actions dependency (Supply Chain)

* **Risk**: An upstream dependency (Python package or Action feature) is
  hijacked or has a known vulnerability.
* **Mitigations**:
  * **Grouped Dependabot**: Weekly Dependabot scans bundle actions and python
    packages into single grouped PRs (`actions-security` and `python-security`)
    to reduce noise.
  * **Weekly Lockfile Refreshes**: The `Maintenance · uv lock upgrade` workflow
    automatically runs `uv lock --upgrade` weekly, opens a PR, and signs the
    commits, ensuring transitive dependency updates are regularly reviewed.
  * **Vulnerability Audits**: `pip-audit` runs in CI via the `ci.yml` workflow
    on pushes and pull requests, and locally via `just audit` (running `uv run
    pip-audit`).
  * **Static Code Analysis (CodeQL)**: The `CI · CodeQL Analysis` workflow
    (`codeql.yml`) executes weekly and on pushes/pull requests to scan the
    Python and JavaScript/TypeScript codebase for potential vulnerabilities.

### T5. Tampered site deployment

* **Risk**: An attacker intercepts or modifies the build artifacts before they
  are published to Pages.
* **Mitigations**:
  * **Direct GitHub Pages Deployment**: The site is built and uploaded as a
    zipped artifact using `actions/upload-pages-artifact` and deployed using
    `actions/deploy-pages`. No external hosting provider or third-party artifact
    repository is involved.
  * **HTTPS Enforcement**: GitHub Pages enforces HTTPS, guaranteeing transport
    security and preventing man-in-the-middle tampering.

### T6. Abandoned maintenance / unpatched vulnerabilities

* **Risk**: Security issues emerge while the repository is idle, leaving the
  production site vulnerable.
* **Mitigations**:
  * **Scheduled Workflows**: Scheduled CI tasks run weekly to detect issues.
    CodeQL runs on Thursdays, link checking runs on Mondays, and the `uv`
    lockfile is refreshed on Tuesdays.
  * **Weekly Link Checks**: `Maintenance · Link check` (`links.yml`) runs weekly
    to identify broken links, opening an issue if any destination becomes
    unreachable.

## Assurance case summary

The platform's integrity and security posture (no direct pushes, verified
signatures, minimum tokens, SHA-pinned dependencies, automated audits) are
sustained through automation. Every control is versioned inside the repository,
making the security model fully reproducible.

## Maintenance

This document MUST be updated when:

1. The repository ruleset is modified.
2. A new runtime, external integration, or deployment channel is added.
3. Upstream controls are replaced or retired.

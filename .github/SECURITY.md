# Security Policy

## Reporting a Vulnerability

We take the security of this project seriously. If you believe you have found a
security vulnerability, please use the **GitHub Private Vulnerability
Reporting** feature.

1. Navigate to the **Security** tab of this repository on GitHub
   (`https://github.com/{your-github-username}/{your-repository-name}/security`).
2. Select **Advisories** from the left sidebar.
3. Click **Report a vulnerability** to open a private advisory.

Alternatively, you can reach out via the contact methods listed on the
repository owner's GitHub profile. Please do not use public issues for
security vulnerabilities.

### Disclosure Policy

- We will acknowledge receipt of your report within **48 hours**.
- We will provide an estimated timeframe for a fix within **7 days**.
- We will notify you once the vulnerability is resolved.
- **Reporter Credit:** If you are the first to report a verified security
  vulnerability and you comply with this policy, we will gladly credit you
  publicly in the `CHANGELOG.md` and the GitHub Release notes (if you wish to
  be attributed).

## Posture Transparency

For visibility into the security posture of this repository:

- **Supply-chain audit (public):**
  [OpenSSF Scorecard](https://scorecard.dev/viewer/?uri=github.com/{your-github-username}/{your-repository-name})
  runs weekly and on every push to `main`. SARIF results upload to GitHub
  code-scanning.
- **Vulnerability advisories:** GitHub Dependabot alerts cover the full
  dependency graph (including transitive deps from `uv.lock`).
- **Python dependency audit:** `pip-audit` runs in CI on push **and** daily at
  08:00 UTC, scoped to declared deps via `uv export`.
- **Secrets detection:** `gitleaks` runs on pre-commit with 160+ provider
  rules (cloud keys, SaaS tokens, fine-grained PATs). False positives are
  tracked in `.gitleaksignore` at repo root.
- **Workflow security:** `zizmor` enforces a hash-pin policy on pre-commit.
  All third-party Actions are pinned to commit SHA.

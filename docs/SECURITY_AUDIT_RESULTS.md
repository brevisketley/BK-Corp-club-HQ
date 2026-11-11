# BK Corp Club — Sellbird and OpenJarvis Security Audit Results

**Audit date:** 2026-11-11  
**Scope:** BK personal forks, default-branch source and dependency profiles.  
**Deployment decision:** NO-GO pending remediation PR validation and isolated staging.

## Repository controls

| Control | Sellbird | OpenJarvis |
|---|---|---|
| Personal fork | Created | Created |
| Secret scanning | Enabled | Enabled |
| Secret scanning push protection | Enabled | Enabled |
| GitHub Actions | Enabled, selected actions only | Enabled, selected actions only |
| Dependabot update manifest | Weekly pip + GitHub Actions | Weekly pip + GitHub Actions |
| Inherited release/publish automation | Not present in current active workflow set | Disabled auto-tag, PyPI publish, desktop release, docs deploy and Claude issue/PR automation |
| Open secret-scanning alerts at first query | None returned | None returned |

**Important:** GitHub code-scanning alerts were empty because code scanning had not been run/published. Dependabot alert APIs returned 403 while alerts were disabled; dependency graph/SBOM export returned 404. These are not clean vulnerability results. GitHub's repository settings still need Dependabot alerts and dependency graph enabled.

## OpenJarvis initial dependency audit

The fork's existing `security-sast` workflow completed Bandit, Semgrep and six `pip-audit` profiles. The workflow step exit status alone is not a clean bill of health: its own script permits the pip-audit vulnerability exit code and records findings in JSON artifacts.

Across six profiles (core, server, inference-cloud, inference-litellm, desktop and voice), the initial audit found:

- **12 affected package names**
- **33 unique advisory IDs**
- 10 affected packages appeared in all six profiles; `python-dotenv` appeared in inference-litellm; `setuptools` appeared in desktop and voice.

| Package | Locked version flagged | Published fixed version(s) reported by pip-audit |
|---|---:|---:|
| aiohttp | 3.14.3 | 3.14.4 |
| anyio | 4.12.1 | 4.14.2 |
| datasets | 4.5.0 | 5.0.1 |
| filelock | 3.24.2 | 4.2.1 (one advisory also lists 4.0.9) |
| fsspec | 2025.10.0 | 2026.6.0 |
| lxml | 6.0.2 | 6.1.0 |
| multidict | 6.7.1 | 6.9.1 |
| pygments | 2.19.2 | 2.20.0 |
| python-dotenv | 1.2.1 | 1.2.2 |
| requests | 2.32.5 | 2.33.0 |
| setuptools | 80.10.2 | 84.1.0 (also 83.0.0 for one advisory) |
| urllib3 | 2.6.3 | 2.8.0 (some advisories list 2.7.0) |

## Remediation execution

A dedicated branch `security/pip-audit-remediation` was created. A manual-only GitHub Actions workflow used pinned uv 0.12.19 to upgrade only the affected package set in `uv.lock`. The job completed successfully and `uv lock --check` passed.

Draft PR: https://github.com/brevisketley/OpenJarvis/pull/1

The PR changes the lockfile and includes the manual remediation workflow. It has **not** been merged. Full PR CI and the six-profile pip-audit/SAST rerun are in progress; do not deploy or merge until the findings are re-evaluated. The first audit's 33 advisories are historical baseline results, not the expected final count.

## Initial test results

- OpenJarvis original default-branch CI: Linux tests, Rust, lint, and Windows Python 3.12/3.13 jobs completed successfully.
- Sellbird original default-branch test matrix: Ubuntu, macOS and Windows Python 3.12 plus Ubuntu/macOS Python 3.11 completed successfully; Windows Python 3.11 was still running at the last check.
- HQ UI integration branch: `npm run build` completed successfully after the external-worker registry view was added.
- No OpenJarvis runtime, Sellbird runtime, live mailbox, model API, or production worker endpoint has been deployed.

## OpenJarvis inherited workflow incident

The initial push triggered upstream auto-tagging, which dispatched a desktop release workflow and a PyPI workflow. The desktop workflow failed at startup. The PyPI workflow completed its TestPyPI dry-run path; there is no evidence that a production PyPI package was published. The automatically created fork-only `v1.0.5.dev1322` tag was deleted.

To prevent recurrence, the following workflows were manually disabled on the fork: Auto-tag on main push, Claude Issue Fixer, Claude PR Review, Desktop Build & Release, Deploy Documentation, Publish to PyPI and Auto-assign on "take". The remaining active workflows are CI, Bash tests, Frontend CI and security-sast. Installer integration and Track Git Clones remain disabled by fork defaults.

## Remaining release gates

1. Review the updated lockfile PR; all six dependency profiles must report zero known advisories or have every exception explicitly documented and accepted.
2. Ensure PR CI and Semgrep/Bandit complete; inspect the actual logs/artifacts, not just job status.
3. Enable GitHub dependency graph and Dependabot alerts/security updates in repository Security settings, then verify API state and export SBOMs.
4. Run Sellbird's test matrix to completion and perform a separate dependency audit of its actual install profile.
5. Complete AGPL-3.0-only legal review before hosted/networked Sellbird deployment or modified-version distribution.
6. Deploy each worker separately in staging with no production credentials; pass isolation, prompt-injection, network-egress, tenant-boundary, approval and cancellation tests.
7. Keep Sellbird draft-only and OpenJarvis read-only. No live outreach, email sending, shell, file writes, messaging, community skills or scheduled autonomy by default.
8. Do not mark either worker online until a real health check succeeds and the owner approves production enablement.

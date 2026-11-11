# BK External Worker — Current Readiness Snapshot

**Date:** 2026-11-11

## Completed

- [x] Sellbird fork created: https://github.com/brevisketley/sellbird
- [x] OpenJarvis fork created: https://github.com/brevisketley/OpenJarvis
- [x] Secret Scanning and Push Protection enabled on both forks.
- [x] Weekly Dependabot update manifests added to both forks.
- [x] GitHub Actions enabled with selected-action allowlists.
- [x] OpenJarvis inherited auto-tag, PyPI publish, desktop release, docs deployment and Claude issue/PR automation disabled. The fork-only auto-generated development tag was deleted; the PyPI workflow ran only its TestPyPI dry-run path and did not publish to production PyPI.
- [x] OpenJarvis dependency remediation PR #1 merged into the fork's main branch: https://github.com/brevisketley/OpenJarvis/commit/a66d1b3dee6a923a5a84b8e99915d102e1d400b7
- [x] OpenJarvis CI: 5/5 jobs passed.
- [x] OpenJarvis pip-audit: 0 known advisories across six profiles after remediation.
- [x] OpenJarvis Bandit: 0 high-severity/high-confidence findings.
- [x] Sellbird pip-audit: 0 known advisories on Python 3.11 and 3.12 after dependency fixes.
- [x] BK HQ external-worker registry and Integrations UI merged into main: https://github.com/brevisketley/BK-Corp-club-HQ/commit/503324a4f243a4bd1db564c59a4660e5590b92a3

## Still in progress

- Sellbird functional test matrix after upgrading pytest/pytest-asyncio: 1/6 jobs had completed successfully at last check; the remaining five were still running. PR #1: https://github.com/brevisketley/sellbird/pull/1
- OpenJarvis static analysis: Semgrep reported 40 blocking-rule findings. See [OpenJarvis static-analysis triage](OPENJARVIS_STATIC_ANALYSIS_TRIAGE.md). These are not yet individually confirmed or accepted.
- GitHub dependency graph and Dependabot alert/security-update settings remain to be enabled in repository Security settings; the connected action set did not expose those account-setting operations.
- AGPL-3.0-only legal review remains required for hosted/networked Sellbird use.

## Deployment state

**NO-GO for production.** Both HQ worker records remain disabled, `FORKED_NOT_DEPLOYED`, with no endpoint and no credentials. The HQ repository is a frontend application; it does not yet contain an authenticated worker API, persistent job store or deployed runtime gateway. The UI registry is integrated, but it is not a live agent execution service.

## Safety and commercial constraints

- Sellbird stays draft-only; no live sending, mailbox access, browser/LinkedIn automation or unattended autopilot.
- No doctor, medical practice, specialist, aesthetic clinic or healthcare-provider outreach from any BK Corp Club source.
- EA customer outreach remains owned by the EA Marketing project sales team and requires its approval.
- OpenJarvis stays read-only; no shell, file writes, email, messaging, browser automation, community skills or scheduled autonomy.
- No production credentials are stored in the repositories.

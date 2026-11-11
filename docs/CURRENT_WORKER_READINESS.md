# BK External Worker — Current Readiness Snapshot

**Date:** 2026-11-11  
**HQ registry:** merged to `main`  
**Production state:** both workers disabled; no runtime endpoints or credentials configured.

## Repositories
- Sellbird (formerly Harvey): https://github.com/brevisketley/sellbird
- OpenJarvis: https://github.com/brevisketley/OpenJarvis
- HQ registry/UI: https://github.com/brevisketley/BK-Corp-club-HQ

## Completed
- [x] Both public forks created under the owner's GitHub account.
- [x] Secret Scanning and Push Protection enabled on both forks.
- [x] Weekly Dependabot update manifests added.
- [x] GitHub Actions enabled with selected-action allowlists.
- [x] CodeQL workflows added to both forks; first scans are running.
- [x] OpenJarvis inherited auto-tag, PyPI publish, desktop release, docs deployment and Claude issue/PR automation disabled. Its fork-only development tag was deleted; the PyPI workflow only completed a TestPyPI dry-run.
- [x] OpenJarvis dependency remediation merged: https://github.com/brevisketley/OpenJarvis/commit/a66d1b3dee6a923a5a84b8e99915d102e1d400b7
- [x] OpenJarvis CI: 5/5 jobs passed.
- [x] OpenJarvis pip-audit: zero known advisories across six profiles.
- [x] OpenJarvis Bandit: zero high-severity/high-confidence findings.
- [x] Sellbird pip-audit: zero known advisories on Python 3.11 and 3.12.
- [x] Sellbird functional tests: Ubuntu Python 3.11/3.12 and macOS Python 3.11/3.12 passed. macOS 3.12 completed 3,702 tests plus 21 Codex CLI surface tests.
- [x] BK HQ external-worker registry and Integrations UI merged to main: https://github.com/brevisketley/BK-Corp-club-HQ/commit/503324a4f243a4bd1db564c59a4660e5590b92a3

## Still in progress
- Sellbird Windows Python 3.11 and 3.12 test jobs remain in progress on PR #1: https://github.com/brevisketley/sellbird/pull/1. Do not merge until both pass.
- OpenJarvis Semgrep reported 40 blocking-rule findings in existing source. They are not individually confirmed; see [OpenJarvis static-analysis triage](OPENJARVIS_STATIC_ANALYSIS_TRIAGE.md). Keep OpenJarvis disabled until review.
- CodeQL scans are running for both forks; retrieve and triage alerts after completion.
- GitHub dependency graph and Dependabot alert/security-update settings still need to be enabled in repository Security settings; the connected GitHub actions do not expose those account-setting operations.
- AGPL-3.0-only legal review remains required before hosted/networked Sellbird use.

## Deployment decision

**NO-GO for production.** The HQ worker registry is live in the frontend, but the HQ repository has no authenticated worker API, persistent job store or deployed runtime gateway. Neither worker has an endpoint or credentials. A registry entry is not a running agent.

## Required runtime gates
1. Finish Sellbird's Windows test matrix and merge its dependency PR.
2. Review CodeQL findings for both forks and triage OpenJarvis's Semgrep findings.
3. Enable and verify GitHub dependency graph and Dependabot alerts/security updates.
4. Complete AGPL-3.0-only legal review for Sellbird.
5. Implement a private authenticated worker gateway, persistent task/audit store, approval callbacks, idempotency and cancellation.
6. Deploy each worker separately in a non-root staging sandbox with restricted filesystem and network access.
7. Pass tenant-isolation, prompt-injection, credential-redaction, approval, cancellation and health-check tests.
8. Obtain explicit owner approval before production enablement.

## Operational guardrails
- Sellbird remains draft-only: no live email sending, mailbox access, browser/LinkedIn automation or unattended autopilot.
- No doctor, medical practice, specialist, aesthetic clinic or healthcare-provider outreach from any BK Corp Club source.
- EA customer outreach remains owned by the EA Marketing project sales team and requires its approval.
- OpenJarvis remains read-only: no shell, file writes, email, messaging, browser automation, community skills or scheduled autonomy by default.
- No production credentials are stored in the repositories.

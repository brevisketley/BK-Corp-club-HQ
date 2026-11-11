# BK Worker Integration — Execution Status

Last checked: 2026-11-11 (GitHub Actions UTC timestamps)

## Forks

- [Sellbird (formerly Harvey)](https://github.com/brevisketley/sellbird) — fork verified, default branch `main`, pinned commit `d35aaeb0dc7812f8330ca10aa0a3d51b2c8baf25`.
- [OpenJarvis](https://github.com/brevisketley/OpenJarvis) — fork verified, default branch `main`, pinned commit `1b78e51b0643d6744c47ac14d763ffeb6ef4a4fc`.

## Observed checks

### Sellbird

- [CodeQL Security Analysis](https://github.com/brevisketley/sellbird/actions/runs/43008396726): **passed** on the pinned commit.
- [Unit/integration/end-to-end/soak tests](https://github.com/brevisketley/sellbird/actions/runs/43008396617): **running at last check**; several operating-system jobs were still executing.
- [Dependency audit](https://github.com/brevisketley/sellbird/actions/runs/43008396536): **failed**. The Python 3.11 environment reported 5 known vulnerabilities across 2 packages; Python 3.12 reported 2 known vulnerabilities across 1 package. The detailed audit JSON is attached to the workflow run as artifacts. Do not activate Sellbird until the exact advisories are reviewed, fixes or documented exceptions are recorded, and the audit is rerun.

### OpenJarvis

- [CodeQL Security Analysis](https://github.com/brevisketley/OpenJarvis/actions/runs/43008393202): **passed** on the pinned commit.
- [Static analysis / SAST](https://github.com/brevisketley/OpenJarvis/actions/runs/43008393163): **passed** on the pinned commit.
- [Main CI](https://github.com/brevisketley/OpenJarvis/actions/runs/43008393305): **running at last check**. The Rust extension build was in progress and Python tests had not yet completed.
- A prior dependency-remediation workflow passed, but that does not substitute for a current full dependency inventory or a completed main CI run.

## Required next checks

1. Retrieve and review both Sellbird audit artifacts to identify the affected package names, advisory IDs, fixed versions and whether the issue is reachable in the chosen runtime profile.
2. Prefer safe upstream-compatible version constraints or documented, narrowly scoped exclusions; do not add blanket ignores to make CI green.
3. Wait for Sellbird tests and OpenJarvis CI to finish; inspect failed job logs and remediate only evidence-backed failures.
4. Run the HQ registry validation workflow after the PR is merged or once GitHub executes the PR workflow.
5. Keep both workers `DISABLED` until all findings are addressed/accepted and a real isolated staging service has passed health and end-to-end tests.

## Current gate

**Not production-ready.** The repository forks are complete and security workflows are active, but Sellbird's dependency audit is failing and the two project test suites had not finished at the last check. No worker runtime, outbound mailbox, model credentials, or public service endpoint has been activated.

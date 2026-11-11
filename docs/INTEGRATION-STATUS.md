# BK Worker Integration — Execution Status

Last verified: 2026-11-11.

## Forks and pins

- [Sellbird (formerly Harvey)](https://github.com/brevisketley/sellbird) — fork verified. Pinned revision: `af52e8dae9dd80f837ffaa37e9e74c61ac74f1e8`.
- [OpenJarvis](https://github.com/brevisketley/OpenJarvis) — fork verified. Pinned revision: `1b78e51b0643d6744c47ac14d763ffeb6ef4a4fc`.

The HQ interface reads `config/external-workers.json` and shows repository, license, runtime, pinned revision and linked security/CI status. The integration registry remains disabled-by-default; neither worker has a live endpoint or credentials.

## Latest verified checks

### Sellbird

- [Dependency audit](https://github.com/brevisketley/sellbird/actions/runs/43009152887): **passed** after updating setuptools and pytest constraints and upgrading the audit environment's setuptools/pytest versions.
- [Tests](https://github.com/brevisketley/sellbird/actions/runs/43009152935): **queued at last check**. An earlier run failed because pytest 9 was paired with pytest-asyncio 0.26; the fork was updated to require pytest-asyncio 1.2.0 or later and a new run was queued.
- [CodeQL](https://github.com/brevisketley/sellbird/actions/runs/43009152856): **running at last check**.

### OpenJarvis

- [Main CI](https://github.com/brevisketley/OpenJarvis/actions/runs/43008393305): **passed**.
- [CodeQL](https://github.com/brevisketley/OpenJarvis/actions/runs/43008393202): **passed**.
- [SAST](https://github.com/brevisketley/OpenJarvis/actions/runs/43008393163): **passed**.

### BK HQ

- [Build and registry validation](https://github.com/brevisketley/BK-Corp-club-HQ/actions/runs/43009180108): **passed** for the then-current HQ commit. Subsequent worker status updates trigger the same workflow again; check the latest run before release.
- The registry validator has also passed on the main branch.

## Security and deployment decision

**Runtime activation remains NO-GO until Sellbird's latest tests and CodeQL finish successfully and an isolated staging deployment passes.** OpenJarvis CI and security checks are green, but a cloud runtime is not appropriate until its tool permissions, model configuration, resource ceilings and private API adapter are provisioned and verified.

The HQ static interface is not deployed publicly by this workflow. The current UI has no authentication layer, so publishing it as a public static site would expose an internal control panel. Keep it private until authentication and authorization are implemented.

## Remaining acceptance criteria

- [x] Fork both projects.
- [x] Pin exact revisions in the HQ worker registry.
- [x] Integrate both worker cards into the HQ Integrations view.
- [x] Display pinned revisions and linked security/CI outcomes.
- [x] Build and validate the HQ UI in GitHub Actions.
- [x] Pass OpenJarvis CI, CodeQL and SAST.
- [x] Pass Sellbird dependency audit after targeted dependency fixes.
- [ ] Pass Sellbird tests and CodeQL on the current pinned revision.
- [ ] Implement authenticated server-side worker adapters and persistent task/audit state.
- [ ] Provision isolated staging runtimes, health checks and server-side secret references.
- [ ] Pass end-to-end security tests and owner sign-off before enabling either worker.

A repository or green CI run is not a deployed worker. The UI must continue to show both workers as not deployed until their real health endpoints and a synthetic end-to-end task are verified.

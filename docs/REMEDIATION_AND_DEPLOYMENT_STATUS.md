# BK External Workers — Remediation Status

**Last updated:** 2026-11-11  
**Control plane:** BK Corp Club HQ  
**Current production state:** Both workers disabled; no endpoints or credentials configured.

## Repository links

- [Sellbird fork](https://github.com/brevisketley/sellbird)
- [Sellbird dependency remediation PR #1](https://github.com/brevisketley/sellbird/pull/1)
- [OpenJarvis fork](https://github.com/brevisketley/OpenJarvis)
- [OpenJarvis dependency remediation PR #1](https://github.com/brevisketley/OpenJarvis/pull/1)
- [HQ integration PR #1](https://github.com/brevisketley/BK-Corp-club-HQ/pull/1)

## Security results

| Check | Sellbird | OpenJarvis |
|---|---:|---:|
| Initial affected packages | 2 | 12 |
| Initial unique advisory count | 3 | 33 |
| Post-remediation affected packages | 0 | 0 |
| Post-remediation unique advisory count | 0 | 0 |
| Profiles scanned | Python 3.11 + 3.12 | core, server, inference-cloud, inference-litellm, desktop, voice |
| Secret scanning | Enabled | Enabled |
| Push protection | Enabled | Enabled |

The zero-vulnerability results above are from the actual JSON pip-audit artifacts, not inferred from workflow status. Sellbird's post-fix audit covers its installed runtime plus development environment. OpenJarvis's post-fix audit covers all six configured profiles.

## Remediation details

### Sellbird
- Initial findings: pytest 8.4.2 (PYSEC-2026-1845) and setuptools 79.0.1 (PYSEC-2026-3447 and GHSA-xmj3-9gf7-h52w).
- Updated build-system setuptools minimum to >=84.1.0.
- Updated pytest to >=9.0.3,<10 and pytest-asyncio to >=1.4.1.post1,<2 after the first test attempt exposed a pytest-asyncio 0.23 collection-time incompatibility with pytest 9.
- The installed-environment audit reports zero findings on Python 3.11 and 3.12.
- The new test matrix on commit `33c733c` is running. The previous matrix on commit `8e7fa21` failed at test collection with `AttributeError: 'Package' object has no attribute 'obj'` inside pytest-asyncio 0.23. Do not merge until the new test matrix passes.

### OpenJarvis
- Initial findings: 12 packages and 33 unique advisories across six profiles.
- Updated `uv.lock` using uv 0.12.19.
- Added Python-version-aware filelock overrides (4.0.9 on Python 3.10; 4.2.10 on Python >=3.11) and setuptools 84.2.1 to preserve the project's Python 3.10 compatibility.
- Post-remediation pip-audit artifacts report zero affected packages and zero unique advisories across all six profiles.
- The SAST workflow completed successfully. The PR CI is still running: lint and Rust jobs passed; Linux tests and Windows/PyO3 builds were still running at the last check. Do not merge until the full matrix passes.

## HQ implementation

- `config/external-workers.json` registers both workers with their upstream and BK fork references, licensing, department routing, capabilities, restrictions and approval policies.
- The HQ Integrations page reads that registry and displays both workers as `FORKED_NOT_DEPLOYED`, disabled, with no endpoint or credentials.
- The HQ front-end production build passed on the integration branch.
- This HQ repository is a front-end application with no worker API, backend service, database or existing deployment service. The integration is therefore a control-plane registry and UI, not yet an execution runtime.

## Deployment decision

**NO-GO for live deployment.** Do not enable either worker until:
1. Both dependency-remediation PRs pass their complete CI matrices and are reviewed/merged.
2. GitHub dependency graph and Dependabot alerts/security updates are enabled in repository Security settings and verified; the current integration did not have an action capable of changing those account settings.
3. AGPL-3.0-only legal review is complete for Sellbird's hosted/networked use.
4. A private authenticated worker gateway and persistent job/audit store are implemented.
5. Each worker is deployed separately in a non-root staging sandbox with restricted network, filesystem and credentials.
6. Handoff receipt, approval, tenant isolation, prompt-injection, cancellation, timeout and health checks pass.
7. Owner explicitly approves production enablement.

## Operational guardrails

- Sellbird remains draft-only. No live email sending, mailbox access, browser/LinkedIn automation or unattended autopilot.
- No doctor, medical practice, specialist, aesthetic clinic or healthcare-provider outreach from any BK Corp Club source.
- EA customer outreach remains owned by the EA Marketing project sales team and requires its approval.
- OpenJarvis remains read-only research. No shell, file writes, email, messaging, browser automation, community skills or scheduled autonomy by default.
- No production credentials are provisioned or stored in GitHub.

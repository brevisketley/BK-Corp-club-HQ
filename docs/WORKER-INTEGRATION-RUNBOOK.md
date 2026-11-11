# BK HQ Worker Integration Runbook

## Purpose

This runbook defines how BK Corp Club HQ should integrate the two forked projects without merging third-party applications into the HQ frontend or granting them unrestricted access.

## Registered repositories

| Worker | BK fork | Upstream | Pinned commit | License |
|---|---|---|---|---|
| Sellbird (formerly Harvey) | https://github.com/brevisketley/sellbird | https://github.com/ethanplusai/sellbird | `d35aaeb0dc7812f8330ca10aa0a3d51b2c8baf25` | AGPL-3.0-only |
| OpenJarvis | https://github.com/brevisketley/OpenJarvis | https://github.com/open-jarvis/OpenJarvis | `1b78e51b0643d6744c47ac14d763ffeb6ef4a4fc` | Apache-2.0 |

The pins above are the exact `main` commits verified during the initial fork and CI setup on 2026-11-11. Re-pin only after upstream diff review, license/dependency review, and CI validation. A fork's main branch can advance; production images must use a full commit SHA, not a floating branch or tag.

## Deployment status

Both repositories exist as public forks under the connected BK GitHub account. Security workflows have been added to each fork. The current BK HQ registry deliberately sets both workers to `DISABLED`, because no runtime API, private network, secret store, or deployed health check has yet been provisioned and verified.

Do not change a worker to `ACTIVE` just because the GitHub repository exists or its CI passes.

## Control-plane contract

The HQ orchestration layer must implement a server-side adapter for each worker. Do not call worker APIs directly from browser code.

Minimum adapter contract:

- `submitJob(objective, input, idempotencyKey)` — create a job, validate inputs and persist the audit record.
- `getJob(jobId)` — return status and a redacted result summary.
- `cancelJob(jobId)` — request cancellation and record the result.
- `approveAction(jobId, actionId, approverId)` — record explicit approval before a permitted external side effect.
- `health()` — return an authenticated, non-sensitive health response.

All adapters must enforce authentication, authorization, tenant separation, request-size limits, rate limits, idempotency, timeouts, redaction, and structured audit events. Never expose environment variables, raw credentials, internal file paths, or unrestricted tool output to the UI.

## Worker-specific restrictions

### Sellbird

Initial mode is **research and draft-only**. Do not connect BK Corp Club's primary outbound mailbox. Do not enable live email sending until the following are tested and approved:

- Dedupe and prospect-source provenance.
- Global suppression and unsubscribe checks before every send.
- Bounce handling and permanent opt-out persistence.
- Human approval of recipient list, message copy, and campaign volume.
- SPF, DKIM, DMARC, domain reputation, sending-rate and emergency-stop controls.
- Applicable privacy and direct-marketing requirements for each target jurisdiction.
- AGPL-3.0-only obligations for modifications and network-accessible deployment; obtain legal review before offering it as part of a hosted service.

Do not enable LinkedIn browser automation; the fork's environment template warns that this may violate LinkedIn's Terms of Service and cause account restrictions.

### OpenJarvis

Initial mode is **read-only research and summarization**. Start with the smallest dependency extra and a reviewed, pinned Python runtime. Do not run its installer on a production host. Inspect the exact installer commit and all downloaded scripts first; use a disposable environment for initial validation.

Disable shell execution, write-capable tools, unreviewed skills, messaging integrations, scheduled/continuous agents, and external side effects by default. Enable each capability individually after sandbox and prompt-injection testing.

Review third-party model and skill licenses separately from the repository's Apache-2.0 license. Do not send secrets to model prompts or log raw secret-bearing tool responses.

## Staging sequence

1. Confirm the fork's full commit SHA and review upstream changes since the last accepted pin.
2. Run the existing project CI and security workflows. Save links to the exact workflow runs and verify all required jobs finish successfully.
3. Generate an SBOM and dependency audit for the chosen minimal install profile. Review findings; do not interpret a completed scanner run as proof that the application is secure.
4. Build each worker as a separate non-root container or isolated service with a read-only source mount, restricted filesystem, restricted egress, resource caps, and independent credentials.
5. Keep all worker endpoints on private networking behind authenticated server-side adapters. Do not expose worker dashboards or ports publicly.
6. Run synthetic-data tests for prompt injection, tenant isolation, SSRF, path traversal, secret leakage, replay/idempotency, cancellation, and shutdown behavior.
7. Verify Hannes receives a handoff receipt and execution evidence for each test job. Failed or timed-out jobs must not be reported as successful.
8. Only after the gates pass, run a small internal pilot with no live outbound messaging and no privileged write actions.

## Environment variable names

These are names/references only; never commit values:

- `SELLBIRD_CONFIG_PATH`
- `SELLBIRD_SECRET_REF`
- `OPENJARVIS_CONFIG_PATH`
- `OPENJARVIS_SECRET_REF`

A real secret-store adapter and deployment environment must be implemented before the workers can consume them. The registry intentionally does not contain credentials or a production URL.

## Completion criteria

- [x] Fork both projects into the connected BK GitHub account.
- [x] Record upstream links, licenses, runtime ranges and exact commit pins.
- [x] Register both workers in `config/integrations.json` with disabled-by-default controls.
- [x] Add an HQ integration runbook and draft PR.
- [ ] Confirm all CI and security workflow jobs finish successfully.
- [ ] Review and resolve or explicitly accept dependency/security findings.
- [ ] Implement and test authenticated server-side adapters.
- [ ] Provision isolated staging runtime, secret storage, logs and health checks.
- [ ] Pass the security test suite and owner approval.
- [ ] Activate workers only after all deployment gates are met.

## Honest status reporting

A repository fork, registry entry, or CI workflow is not a running deployment. Hannes must report the current state as `DISABLED` until a real worker endpoint passes health checks and a synthetic end-to-end task succeeds.

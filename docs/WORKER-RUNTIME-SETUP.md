# BK Corp Club worker runtime setup

## Current state

Both forks are audited and pinned. Their latest required repository checks passed:

- Sellbird: cross-platform tests, dependency audit and CodeQL.
- OpenJarvis: CI, CodeQL, SAST and the targeted dependency-remediation workflow.
- BK HQ: build, worker-registry validation and dependency security audit.

The BK HQ integrations page is deployed as a static site, but the existing HQ API service is **suspended by Render billing**. The static site is not a worker runtime and cannot securely host agent execution. The latest bootstrap and runtime runbook commits are queued/building for automatic deployment to the existing HQ static site.

## Runtime architecture decision

These two projects are not interchangeable stateless web services:

- **Sellbird** is a Python application designed to run as an isolated operator-owned process. Its Dockerfile starts the local dashboard and a separate heartbeat loop. It requires an explicitly configured model CLI and a sending mailbox for outbound actions. The BK profile must remain draft-only until campaign, POPIA/legal-basis, deduplication, suppression, unsubscribe, bounce handling, sending-domain authentication and owner approvals are verified.
- **OpenJarvis** is a local-first Python AI stack. It has native/Rust components and optional inference backends; its useful production profile depends on the host's CPU/GPU, memory and local model runtime. It must not be deployed as an unrestricted public web service or given broad shell, file, channel, or community-skill permissions.

A Render free web service is not an acceptable substitute for a persistent, isolated local worker host. Render's current BK HQ API is also suspended by billing, and the available Render service-creation integration does not configure persistent disks or the complete worker sandbox policy. Cloudflare Workers cannot directly host these Python/Rust runtimes or local model execution. Do not create a misleading "healthy" proxy and label it as an installed agent.

## Local installation package

Run the following from a Windows PowerShell terminal on the designated BK operator computer:

```powershell
Set-ExecutionPolicy -Scope Process Bypass
.scripts\install-bk-workers.ps1
```

The script clones both BK forks, checks out the exact audited commits, creates separate environments, installs core dependencies, and runs CLI help smoke tests. It does not create a Sellbird `.env`, connect a mailbox, configure an LLM account, enable sending, install OpenJarvis community skills, or start scheduled autonomy.

Prerequisites: Git for Windows, Python 3.12, uv, and the Rust toolchain (rustup/cargo) for OpenJarvis's native Rust extension. The script stops if any prerequisite, revision check, dependency install, or smoke test fails.

## Acceptance gates after local installation

1. Record machine OS, CPU, RAM, available disk, and GPU/model-runtime capability.
2. Run Sellbird's setup wizard using a dedicated BK-approved mailbox only after the sending domain and legal/suppression controls are verified. Keep every message in the approval outbox; do not enable autopilot.
3. Start OpenJarvis with a no-tools chat/research profile first. Validate the local model backend and resource use before adding any connector or tool.
4. Keep both runtimes bound to loopback/private network access. Do not expose their dashboards or API ports to the public internet.
5. Connect HQ only through an authenticated server-side adapter with signed requests, allowlisted operations, per-worker credentials, rate limits, persistent task state and an audit trail.
6. Re-enable the HQ API only after the Render billing suspension is resolved or an equivalent approved private API host is provisioned. Verify Neon auth/JWKS and database connectivity before restoring API access.
7. Promote each worker from disabled to staging only after owner acceptance and an end-to-end synthetic task. Production enablement remains a separate explicit approval.

## Licence obligations

- Sellbird: AGPL-3.0-only. If BK modifies it and makes that modified version available for network use, AGPL source-offer obligations apply to the modified version. Keep copyright and licence notices intact and obtain legal review before offering a modified hosted service.
- OpenJarvis: Apache-2.0. Preserve the licence, copyright and applicable NOTICE/attribution materials when redistributing it or derivative works. Review included third-party model weights and optional packages separately; the project licence does not automatically relicense those assets.

## Current blockers

- Desktop Commander reports the designated Windows device as offline, so the local installer cannot be executed remotely in this session.
- Render reports `bk-corp-club-hq-api` as suspended by billing. The public/static HQ frontend is running, but its protected API cannot be assumed available.
- No Sellbird mailbox credentials, approved sender domain, model CLI login, or OpenJarvis local inference host have been provisioned in this session.

Until these blockers are resolved, the correct runtime status remains `FORKED_TESTED_NOT_DEPLOYED`. Never advertise either worker as active based only on repository CI or an HQ UI card.

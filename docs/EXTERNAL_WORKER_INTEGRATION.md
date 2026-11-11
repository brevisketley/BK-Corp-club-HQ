# BK HQ — External Worker Integration

## Decision

BK HQ remains the control plane. Sellbird and OpenJarvis are isolated worker services, not code merged into the HQ browser application. Hannes owns task routing, handoff receipt, approvals, status tracking and output validation. Department specialists own execution and business decisions.

## Repository ownership

| Worker | BK fork | Upstream | License | Runtime |
|---|---|---|---|---|
| Sellbird (formerly Harvey) | https://github.com/brevisketley/sellbird | https://github.com/ethanplusai/sellbird | AGPL-3.0-only | Python >=3.11 |
| OpenJarvis | https://github.com/brevisketley/OpenJarvis | https://github.com/open-jarvis/OpenJarvis | Apache-2.0 | Python >=3.10,<3.14 |

The TikTok label `ethanplusai/harvey` is now represented by the canonical `ethanplusai/sellbird` repository. Current package metadata reports Sellbird 0.4.0; legacy `harvey` CLI/package aliases remain for compatibility.

## HQ routing

- **Sellbird:** Sales floor, with Marketing as a supported collaborating floor. It is a prospecting/outreach tool, not the HQ CRM or source of truth. It can prepare research and drafts only in the initial profile.
- **OpenJarvis:** Research & Intelligence and Technology & Automation. Start with read-only research and local-model experimentation.
- **Hannes:** routes a task to the relevant department and worker, confirms receipt, persists task state, requests approvals, validates evidence and reports completion.
- **Spruce:** operational oversight and opportunity prioritisation; does not directly execute outbound sales.
- **Owner:** final authority for commercial, legal and production deployment decisions.

## Non-negotiable BK business rules

1. No doctor, medical practice, specialist, aesthetic clinic or healthcare-provider outreach from any BK Corp Club source.
2. EA customer outreach is owned by the EA Marketing project sales team. Sellbird must not independently contact EA leads; it may only support a campaign explicitly approved by that team.
3. Outbound identity must be an authorised BK Corp Club identity, never the owner's personal identity.
4. No live sending until the sending domain, SPF/DKIM/DMARC, applicable legal basis, unsubscribe, global suppression, duplicate prevention, bounce handling and human approval are verified.
5. No free offers, trials, complimentary months, discounts or giveaways for BK products without explicit owner approval.

## Source audit — Sellbird

- Current package: `sellbird==0.4.0`; Python >=3.11.
- Core runtime dependencies declared in `pyproject.toml` and mirrored in `requirements.txt`: PyYAML, python-dotenv, HTTPX, Playwright, BeautifulSoup, dnspython, aiosmtplib, aiosqlite, keyring, Pydantic 2, pytz, FastAPI, Uvicorn and MCP. Optional platform-specific tray dependencies are pystray and Pillow; dev extras include pytest and pytest-asyncio.
- Dockerfile uses Python 3.12 slim, installs Chromium and downloads the Claude CLI installer during image build. This installer must be pinned/reviewed and its downloaded artifact verified before production use. The container is configured to run as a non-root user, but Compose uses host networking and mounts the full checkout plus the user's Claude directory; do not reuse that Compose profile for multi-tenant production.
- Existing CI runs a Python 3.11/3.12 OS matrix and a broad pytest suite without production credentials.
- Existing security tests cover approval gates, do-not-contact matching, prompt-injection fencing, outbox controls and LinkedIn disabled by default.
- `.env.example` documents Gmail, SMTP, Microsoft 365, Instantly, LinkedIn, Cloudflare, Reoon, ZeroBounce, Hunter, Precleared, TrulyInbox and multiple discovery-provider credentials. No credentials have been added to this fork.
- LinkedIn browser automation is explicitly warned by the project as a Terms-of-Service/account-restriction risk; keep it disabled.

## Source audit — OpenJarvis

- Package: `OpenJarvis`; Python >=3.10,<3.14.
- Core dependencies: Click, croniter, datasets, ddgs, HTTPX, OpenAI client, NVIDIA ML bindings, PostHog, psutil, python-telegram-bot, Rich, TOML tooling and WebSockets.
- The repository has a 1.69 MB `uv.lock`, a 2,467-entry tracked tree, Rust/PyO3 components, and a broad optional-extra matrix for inference, server, desktop, voice, browser, memory, messaging, sandboxing and training.
- Do not install all extras. Initial pilot should select the minimum local inference/research capability. Cloud inference, desktop/voice, communications, browser automation, training and Docker sandbox extras remain out of scope until individually approved.
- Existing CI includes lint, tests, Rust checks and Windows-specific jobs. Default test selection excludes live, cloud and dataset-hub tests.
- The repository documents native builds and hardware-specific paths; choose a pinned supported Python version and compatible runtime profile before deployment.

## Security posture at fork creation

- Secret Scanning: enabled on both forks.
- Secret Scanning Push Protection: enabled on both forks.
- Initial alert queries returned no open secret-scanning alerts on either fork.
- Code-scanning alert queries returned no alerts, but GitHub explicitly reported that code scanning had not yet been run. This is not a clean scan result.
- Dependabot alert queries were unavailable because Dependabot alerts are disabled on the new forks (GitHub returned 403). Dependency-graph SBOM export returned 404. Do not interpret either result as zero vulnerabilities.
- Dependency alerts, dependency graph and security-update settings remain a staging gate; enable them in repository Security settings or via a supported GitHub action, then re-run the alert and SBOM checks.
- No dependency install, automated test run or runtime health check has yet been executed in a controlled staging environment.

## Worker API contract

HQ must call a private authenticated adapter, never a public worker dashboard directly.

### Submit job

`POST /internal/workers/{worker_id}/jobs`

Required fields:
- `task_id`, `project_id`, `department`, `objective`
- `input_ref` (server-side reference; do not send secrets in free text)
- `requested_capabilities`
- `approval_policy`
- `idempotency_key`

### Read status

`GET /internal/workers/{worker_id}/jobs/{job_id}`

Return:
- `status`: queued | running | awaiting_approval | succeeded | failed | cancelled
- `worker_version`, `source_commit`
- `started_at`, `updated_at`, `completed_at`
- `approval_requests`, `output_refs`, `evidence_refs`, `error_code`

### Cancel job

`POST /internal/workers/{worker_id}/jobs/{job_id}/cancel`

Cancellation must stop child processes and prevent future side effects, not merely change the HQ display state.

### Security requirements

- Private networking, authenticated service-to-service calls, request signing or mTLS, replay protection and idempotency.
- Tenant/project scope on every job and artifact.
- Secrets retrieved server-side just-in-time and redacted from logs.
- Explicit allowlists for capabilities and destinations.
- Prompt-injection-resistant separation of instructions from retrieved content.
- Resource quotas, timeouts, audit events, cancellation and emergency kill switch.
- No worker can change its own permissions, approve its own action or mark its own work complete without HQ validation.

## Staging and acceptance sequence

1. Pin exact upstream commits and record fork divergence.
2. Enable dependency graph, Dependabot alerts/security updates and CodeQL or equivalent scanning; export an SBOM.
3. Build each worker in a separate non-root container/VM; inspect install scripts and verify downloaded artifacts.
4. Run static analysis, dependency vulnerability scan, secret scan, unit tests and project CI.
5. Deploy Sellbird draft-only against synthetic data with no live mailbox. Validate unsubscribe/suppression and approval controls.
6. Deploy OpenJarvis with read-only research, no shell/write/messaging/email, no community skills and no scheduled autonomy.
7. Implement authenticated HQ adapters and task-state mapping; test receipt, review, failure, retry, cancellation and evidence logging.
8. Complete AGPL legal review before any Sellbird hosted/networked SaaS offering or modification distribution.
9. Complete owner sign-off before production enablement.

## Current deployment state

Both repositories are forked. Secret scanning and push protection are enabled. The HQ worker registry records both integrations as `FORKED_NOT_DEPLOYED`, disabled, with no endpoints and no credentials. This is deliberate: repository presence is not a runtime health check. Do not show either worker as online until a real staging health check succeeds.

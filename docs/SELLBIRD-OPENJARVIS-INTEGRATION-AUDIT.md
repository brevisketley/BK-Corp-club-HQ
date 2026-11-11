# Sellbird (formerly Harvey) + OpenJarvis: Integration Audit

**Status:** Repository review completed; fork creation and runtime deployment are blocked pending a GitHub fork/import capability and a controlled execution environment. No production services have been started and no outbound email has been enabled.

**Date:** 2026-11-11

## Executive decision

Integrate these projects as two separate, isolated capabilities behind BK Corp Club HQ's orchestration layer. Do not merge either codebase into the HQ frontend or deploy either as a privileged HQ process.

- **Sellbird (formerly Harvey):** candidate for the Marketing/Sales operations floor. It is an outbound prospecting and email workflow engine, not a generic sales CRM. Human approval must remain enabled for outreach.
- **OpenJarvis:** candidate for the Research & Intelligence / Technology & Automation floors. It is a broad personal-AI framework with local and optional cloud inference, tools, skills, schedulers and multiple integrations. Integrate selectively; do not expose all built-in tools to HQ by default.
- **HQ remains the control plane:** Hannes routes approved tasks; HQ records job status, approvals, outputs and audit evidence. Each worker runs separately with least-privilege credentials.

## Repository identity correction

The TikTok screenshot labels the first project `ethanplusai/harvey`. GitHub currently redirects that repository identity to **`ethanplusai/sellbird`**. The current package name is `sellbird`; the old `harvey` command is retained for compatibility. Use the canonical repository going forward:

- https://github.com/ethanplusai/sellbird
- https://github.com/open-jarvis/OpenJarvis

## License and redistribution review

| Project | Current repository license | Decision |
|---|---|---|
| Sellbird / former Harvey | AGPL-3.0-only in current `pyproject.toml` and LICENSE | **Legal review required before SaaS/network deployment or redistribution.** AGPL has source-disclosure obligations for modified versions used over a network. Keep modifications and distribution plan documented; do not assume this is MIT-licensed based on older references. |
| OpenJarvis | Apache-2.0 | Generally permissive, subject to preserving license/attribution notices, marking modified files, and reviewing NOTICE/third-party components and model licenses. |

This is a technical screening, not legal advice. Also review licenses for model weights, external skills, connectors and separately installed tools; the repository's top-level license does not automatically cover those dependencies.

## Dependency and platform audit

### Sellbird

- Python **3.11+**.
- Core packages include PyYAML, python-dotenv, HTTPX, Playwright, BeautifulSoup, dnspython, aiosmtplib, aiosqlite, keyring, Pydantic 2, FastAPI, Uvicorn and MCP.
- Optional desktop tray dependencies are platform-gated. Dev extras include pytest and pytest-asyncio.
- Mail integrations require provider-specific OAuth/password/API credentials. Optional integrations include LinkedIn browser automation, Cloudflare Browser Rendering, email-verification providers and lead-discovery APIs; some can incur fees.
- Local SQLite state and environment/configuration files require a protected persistent data directory and backups.
- Do not enable LinkedIn browser automation: the project's own environment template warns it may violate LinkedIn Terms of Service and risk account restrictions.
- Do not connect BK's primary email domain or enable bulk sends during the pilot. Use a dedicated, authenticated sending domain, valid consent/legal basis, suppression list, unsubscribe handling, low rate limits, and an emergency pause control.
- Keep human review on for every first campaign and outbound reply. No auto-sending until the compliance gate, deduplication, bounce suppression, opt-out persistence, tenant isolation and audit logging have been tested.

### OpenJarvis

- Python **>=3.10,<3.14** according to the current project metadata; use a supported, pinned interpreter rather than blindly following a moving latest install.
- Core dependencies include Click, croniter, datasets, DDGS, HTTPX, OpenAI client, NVIDIA monitoring, PostHog, psutil, Telegram bot, Rich, TOML tooling and WebSockets.
- It has a large set of optional extras for local/cloud inference, server/API, desktop GUI, voice, browser automation, memory/search, communications, sandboxing and training. Avoid installing all extras; select the minimum needed for the pilot.
- Native Rust/PyO3 components, Node.js for the source-checkout GUI, model downloads and hardware-specific inference paths increase deployment complexity.
- The repository's installer is a remote shell bootstrap that can install system prerequisites and downloads dependencies/models. **Do not run `curl | bash` on a production host.** Review the script at a pinned commit, verify the commit/release, run it in a disposable VM/container first, and capture the resulting dependency inventory.
- The installer documents an opt-in install-stage analytics beacon. Verify consent defaults and network destinations against the pinned version before enabling any telemetry in BK infrastructure.
- OpenJarvis has powerful agent modes, scheduled/continuous execution, skills and integrations. Treat community skills and fetched content as untrusted code/instructions; allowlist sources, scan and review each skill, sandbox execution, and require explicit approvals for email, file writes, shell, messaging or external side effects.
- Keep model/API keys out of the repo, logs, prompts and HQ frontend. Store secrets in a dedicated server-side secret manager/environment; redact them in task outputs.

## Security and deployment gates

1. Fork both canonical repositories under the connected GitHub account after confirming the fork operation is available. Preserve upstream history and license files; do not copy the repositories into HQ's source tree.
2. Pin reviewed commits and dependency lockfiles. Run secret scanning, dependency vulnerability scanning/SBOM generation, static analysis, unit tests and license inventory on each pinned revision.
3. Build and run each service in a separate non-root container/VM with read-only source, limited filesystem mounts, restricted outbound network, resource quotas and no shared host credentials.
4. Use separate service identities and scoped credentials for each integration. Never pass HQ/GitHub/Resend/mail credentials to an LLM or a skill unless strictly necessary.
5. For Sellbird, begin in discovery/draft-only mode. Validate lead provenance, global suppression/unsubscribe checks, duplicate prevention, data retention, regional email/privacy rules and approval logging before any sending.
6. For OpenJarvis, begin with local chat/research only, no shell or write-capable tools, no community skills, and no scheduled continuous agent. Add capabilities one at a time after sandbox tests.
7. Expose a narrow authenticated internal API to HQ. Do not expose dashboards or worker ports publicly; use private networking and authenticated proxying.
8. Add HQ job states: `queued`, `running`, `awaiting_approval`, `succeeded`, `failed`, `cancelled`. Every handoff must record owner, input summary, worker/version/commit, approvals, timestamps, output references, error details and a cancellation path.
9. Test tenant isolation, prompt injection from websites/email, malicious skill content, SSRF, path traversal, credential leakage, replay/idempotency, webhook authentication and kill-switch behavior.
10. Deployment remains **NO-GO** until legal review for AGPL use, automated scans/tests, staging smoke tests, resource/cost ceilings, backup/restore, and owner sign-off pass.

## Recommended phased integration

### Phase 1 — repository and security baseline
- Create personal forks of `ethanplusai/sellbird` and `open-jarvis/OpenJarvis`.
- Pin upstream commit SHAs and document divergence/update policy.
- Scan dependencies and workflows; review install scripts and secrets handling.
- Keep both projects disabled in production.

### Phase 2 — isolated staging
- Deploy Sellbird as draft-only with a synthetic dataset and no live mailbox.
- Deploy OpenJarvis with a minimal local chat/research preset and no privileged tools.
- Verify health checks, logs, rate/cost limits, process shutdown and data persistence.

### Phase 3 — HQ adapters
- Add separate worker adapters under the HQ orchestration/tool layer, not in the browser UI.
- Implement authenticated job submission/status/result endpoints and approval callbacks.
- Make Hannes the routing/receipt layer; department specialists own the business decisions and final approval.
- Add operator-visible worker status and auditable failures; never report an agent as active without a passing health check.

### Phase 4 — controlled pilot
- Sellbird: human-approved, low-volume outreach only after legal/compliance gates.
- OpenJarvis: read-only research and summarization first; write-capable integrations require explicit per-action approval.
- Review quality, cost, security events and actual business outcomes before expanding.

## Acceptance checklist

- [ ] Personal forks exist and are visible under the intended GitHub owner.
- [ ] Canonical upstream identity and pinned commit SHAs recorded.
- [ ] License review completed, especially Sellbird AGPL-3.0-only.
- [ ] SBOM, dependency/security scan and secret scan pass.
- [ ] Tests and staging health checks pass on supported runtime versions.
- [ ] Secrets isolated; no production credentials in Git, prompts or logs.
- [ ] Worker API is authenticated and private; HQ has only narrow permissions.
- [ ] Sellbird has no live-send capability until approval, opt-out and suppression tests pass.
- [ ] OpenJarvis has no unrestricted shell, file-write, skill-install or messaging tools by default.
- [ ] Hannes handoff receipt, execution evidence, cancellation and audit history verified.
- [ ] Owner signs off before any live deployment.

## Current blocker

The connected GitHub tool can read repositories and write files/branches in owned repositories, but does not expose a repository-fork/create-repository operation. Therefore this commit records the verified audit and deployment gates; it does **not** claim that forks were created, dependencies were installed, tests were run, or services were deployed. Use GitHub's Fork action while signed into the intended account, then resume the pinned-code staging workflow.

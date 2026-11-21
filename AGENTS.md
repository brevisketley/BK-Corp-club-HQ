# Modern Web Engineering Guidance

These instructions apply to all changes in this repository. Follow the existing architecture and conventions; make the smallest complete change that solves the requirement.

## Delivery standard
- Inspect the relevant implementation, adjacent modules, tests, and configuration before editing. Reuse established patterns rather than introducing a parallel architecture.
- Prefer clear, typed, modular, maintainable code. Avoid unnecessary dependencies, duplicated logic, speculative abstractions, and unrelated refactors.
- Preserve existing public interfaces, API contracts, data formats, environment-variable names, routes, and persisted storage keys unless the task explicitly requires a migration. Make migrations backward-compatible where practical.
- Validate changes with the repository's available lint, type-check, test, and production-build commands. Add or update tests for changed behaviour. Never claim a check passed unless it was actually run.
- Keep documentation aligned with actual runtime behaviour. Document setup, configuration, failure modes, and operational procedures where relevant.

## Security and privacy
- Treat all input, external content, webhook payloads, uploaded files, and client-supplied identifiers as untrusted. Validate at trust boundaries and enforce authorization server-side.
- Never commit secrets, tokens, credentials, private keys, customer data, or production environment files. Use environment variables or the approved secret store; do not log secrets or sensitive personal data.
- Apply least privilege, secure defaults, rate limits where appropriate, safe error handling, and dependency hygiene. Do not weaken authentication, authorization, tenant isolation, or security controls to make a flow work.
- Protect against injection, XSS, CSRF, SSRF, path traversal, insecure direct object references, and unsafe redirects as applicable to the stack.

## Web UX, accessibility, and performance
- Build responsive layouts mobile-first and verify narrow, medium, and wide viewport behaviour. Avoid horizontal overflow and preserve readable typography and touch targets.
- Use semantic HTML, accessible names and labels, logical heading order, keyboard-operable controls, visible focus states, sufficient contrast, and reduced-motion support. Do not communicate state by colour alone.
- Provide loading, empty, validation, success, and error states for user-facing workflows. Keep destructive actions explicit and reversible where feasible.
- Optimize assets and rendering; avoid unnecessary client-side JavaScript, blocking work, layout shifts, and expensive repeated requests. Measure before adding complexity.
- Respect the established BK Corp Club visual system and brand assets. Do not replace approved logos with text approximations or generic placeholders.

## Reliability and operations
- Design for timeouts, retries, duplicate delivery, partial failure, and graceful degradation. Use idempotency for operations that may be retried.
- Keep observability useful and privacy-safe: actionable structured logs, meaningful error context, and health checks without exposing credentials or customer data.
- Do not silently swallow errors, fabricate success, bypass validation, or make production-impacting changes outside the requested scope.
- Update tests and relevant runbooks when changing critical flows. Prefer deterministic tests and safe test fixtures.

## Git and change hygiene
- Keep changes focused. Do not overwrite existing project guidance or configuration without inspecting it.
- Do not commit generated build output, local caches, secrets, or unrelated formatting churn.
- Report the files changed, checks actually executed, results, and any remaining risks.


## Repository-specific requirements: BK Corp Club HQ
- This is the standalone internal command centre for projects, departments, specialist roles, workflows, handoffs, approvals, audit history, and commercial operations. Keep it separate from the customer-facing EA licensing SaaS.
- Preserve the Owner as final approval authority. Spruce provides COO oversight; Hannes coordinates delegation, handoffs, QA routing, and sign-off. Do not bypass owner approval gates or silently mark work approved.
- Preserve protected owner-only access, verification and password-reset flows, project boundaries, Neon/PostgreSQL row-level security, and auditability.
- Workflow state, assignments, evidence, and approvals must be persisted and recoverable; distinguish proposed, in-progress, blocked, completed, and owner-approved states accurately.
- Keep integration connection status truthful. Never represent an integration or agent action as successful unless the connected service confirms it.
- Provide clear operational status, error recovery, and accessible dashboards without exposing secrets or sensitive customer data.

# BK Corp Club HQ

BK Corp Club HQ is the standalone command centre for BK Corp Club's projects, departments, specialist roles, workflows, integrations, approvals, audit history and commercial operations.

## Command structure

1. **Owner** — final authority and approvals.
2. **Spruce** — COO; operational priorities, revenue opportunities, oversight and performance.
3. **Hannes** — Agent Manager / Orchestrator; task decomposition, delegation, handoffs, QA routing and sign-off.
4. **Department specialists** — bounded execution roles reporting through Hannes.

## Eight departments

1. Customer Service
2. Marketing
3. Sales
4. Research & Intelligence
5. Creative & Content
6. Technology & Automation
7. Client Operations
8. Finance & Commercial

## Current deployed capabilities

- Owner-only sign-in and protected HQ workspace.
- Persistent project portfolio selection.
- Eight department floors and 17 registered specialist roles.
- Persistent task queue, agent assignments, handoffs and evidence capture.
- Integration registry with connection status.
- Activity/audit history and live operational metrics.
- Dedicated Neon Data API with PostgreSQL row-level security.
- GitHub Actions build validation, live endpoint checks and dependency security audit.
- Dedicated Render static frontend and dedicated HQ Neon project/database.

## Runtime truth and activation gates

The 17 roles are registered, not 17 autonomous workers. Spruce and Hannes are the operating roles in the command model; they are not independent background processes. Sellbird and OpenJarvis are separately forked, security-reviewed candidates but remain disabled and undeployed. No agent is marked live until its runtime, credentials, least-privilege tool access, health check, task lease/cancellation controls and evidence loop have been tested.

The Render API service is billing-suspended and is not in the application request path. The frontend now uses the dedicated Neon Data API directly. The Data API is configured for Neon Auth and owner-only RLS; anonymous access has no table privileges. The HQ owner must complete email verification and set a password through the authentication flow before the first interactive session can be confirmed.

## Non-negotiable separation

- HQ has its own repository, Neon project, database, authentication and deployment.
- BK Corp Club SaaS Licensing remains a separate product and is not used as HQ identity or storage.
- No SaaS production services, users, licenses or databases may be modified by HQ work.
- No doctor, medical practice, specialist, aesthetic clinic or healthcare-provider outreach from any BK source.
- External sending, publishing, payments, account changes and EA file release require explicit owner approval.
- EA files must never be released or made downloadable without explicit owner consent.

## Operating loop

**Owner objective → Spruce prioritisation → Hannes decomposition and delegation → specialist execution → evidence and QA → owner approval where required → completion and learning.**

## Repository structure

- `ARCHITECTURE.md` — command hierarchy, system boundaries and operating model.
- `config/agents.json` — leadership and specialist role registry.
- `config/departments.json` — eight department floors.
- `config/external-workers.json` — isolated worker candidates and security gates.
- `docs/AGENT_HANDOFF_PROTOCOL.md` — handoff contract.
- `docs/TASK_STATE_SCHEMA.md` — task lifecycle and evidence contract.
- `src/` — HQ frontend modules and direct Neon Data API client.
- `server/` — retained legacy API implementation; not used by the current frontend.

## Deployment

- Frontend: https://bk-corp-club-hq.onrender.com
- Repository: https://github.com/brevisketley/BK-Corp-club-HQ

All frontend data requests use `VITE_NEON_DATA_API_URL` and a short-lived Neon Auth JWT. Do not put database connection strings or privileged secrets in frontend variables.

# BK Corp Club HQ — Master Architecture

## Mission
BK Corp Club HQ is the standalone operating system for BK Corp Club. It is separate from the EA SaaS Licensing product in identity, database, repository, deployment and permissions.

## Command hierarchy
1. Owner — final authority.
2. Spruce — COO: priorities, revenue opportunities, organisational oversight and performance.
3. Hannes — Agent Manager / Orchestrator: decomposes objectives, routes work, manages handoffs, coordinates QA and reports sign-off.
4. Department specialists — execute bounded work packages through approved tools.

## Eight department floors
1. Customer Service
2. Marketing
3. Sales
4. Research & Intelligence
5. Creative & Content
6. Technology & Automation
7. Client Operations
8. Finance & Commercial

## Core subsystems
- HQ Lobby and project portfolio.
- Department floor dashboards.
- Agent registry and runtime state.
- Task and handoff engine with evidence and approvals.
- Client workspaces and Client Brain.
- Integration registry and scoped tool adapters.
- Activity/audit log.
- KPI and operational analytics.
- Human approval gates.
- Learning loop.

## ## Current implementation

- Dedicated frontend: Render static site `bk-corp-club-hq`.
- Dedicated database and authentication: Neon project `still-shape-16847245`, branch `br-fancy-smoke-ban7qd0k`.
- Neon Auth email/password is enabled; signup is disabled; email verification is required using OTP. The owner account exists but was not verified at the last verification check.
- Neon Data API is enabled and authenticated with Neon Auth.
- All 11 `hq_*` tables have RLS enabled. The authenticated role has access only when the JWT `sub` matches the HQ owner ID. The anonymous role has no table privileges. Owner and non-owner RLS behavior was tested using simulated JWT claims.
- The frontend uses the Neon Data API directly. The separate Render API service is billing-suspended and is not part of the current data path.
- Current UI modules: Overview, Projects, Departments, Agents, Tasks, Workflows, Integrations, Activity & Audit, Performance.
- Current persisted registry: 12 projects, 8 departments, 17 agent roles, 12 integration records and 4 workflow templates.
## Runtime and capability states

A registry record is not an active agent. A role may be marked live only after all of the following are present and verified:
- Isolated runtime and health endpoint.
- Authenticated task-pull/lease protocol.
- Scoped credentials and least-privilege tool permissions.
- Explicit job state, retries, timeout, cancellation and dead-letter behavior.
- Evidence/artifact persistence and audit events.
- Human approval gates for external side effects.
- End-to-end tests for success, duplicate jobs, failure and recovery.

Sellbird and OpenJarvis remain forked, disabled and undeployed. The current application supports persistent assignment and handoff records but does not yet run autonomous specialist agents. No background work is claimed.

## Data security
- All HQ data resides in the dedicated HQ Neon project.
- The Data API uses Neon Auth JWT validation.
- PostgreSQL RLS policies scope all HQ tables to the owner JWT subject.
- Anonymous users have no privileges on HQ tables.
- Never expose a privileged database connection string in frontend code.
- Do not use SaaS Licensing users as HQ identities.
- Do not modify SaaS Licensing databases or production services.

## Hard operating restrictions
- No doctor, medical practice, specialist, aesthetic clinic or healthcare-provider outreach from any BK source.
- No external email, social publishing, payments, account changes or irreversible actions without required owner approval.
- No EA source or compiled EA file may be released or made downloadable without explicit owner consent.
- Outbound identity must be an authorised BK Corp Club identity, never the owner's personal identity.

## Operating loop
Owner objective → Spruce prioritisation → Hannes decomposition → specialist assignment → execution → evidence and QA → approval → completion → validated learning.

## Separation
HQ must remain independent from the BK Corp Club SaaS Licensing platform. No shared login, user table, database, backend, permissions or deployment.

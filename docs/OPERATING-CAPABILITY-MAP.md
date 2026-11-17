# BK HQ — Capability Map

## Purpose
The Capability Map presents the one-owner operating model: Owner → Spruce (COO) → Hannes (Agent Manager) → eight department floors. It links reusable Seed and Replica playbooks to the existing registered specialist roles.

## Source of truth
- Skill inventory and role mappings: `config/skills.json`.
- Project-installed skill files: `brevisketley/bk-corp-club-ai-hub/.claude/skills/`.
- Leadership, role and department registries: `config/agents.json` and `config/departments.json`.

## Operating model
- Owner: final authority and approval point.
- Spruce: COO priorities, revenue focus and performance oversight.
- Hannes: decomposes objectives, routes specialist work, coordinates handoffs and verifies evidence.
- Specialist roles: execute bounded work packages using the skills mapped to their department.

## Capability status
The 22 skills are installed in the BK AI Hub Git repository for project-scoped Claude Code use. They are not autonomous agents and are not automatically loaded into ChatGPT or an external worker runtime. The dashboard therefore reports repository installation separately from runtime availability. The runtime remains not connected; the 17 existing specialist roles remain registry records.

## Department coverage
- Customer Service: existing Customer Success role; no dedicated support/CRM automation skill in these two packs yet.
- Marketing: brand and launch planning.
- Sales: investor outreach drafting and pitch coaching.
- Research & Intelligence: competitor, market, investor, product and customer-voice research.
- Creative & Content: pitch deck and design-system capabilities.
- Technology & Automation: architecture, backend, build, test, parity and deployment preparation.
- Client Operations: data-room preparation and investor updates.
- Finance & Commercial: financial model, business plan and term-sheet analysis.

## Guardrails
- Seed Closer remains draft-first. No email is sent without explicit approval for the exact batch; deduplication, suppression, opt-outs, bounce handling and stop-on-no rules remain mandatory.
- Replica work is clean-room and may reproduce functionality, not third-party source code, brand assets, copy, private APIs or protected content.
- No doctor outreach from any BK source.
- HQ remains separate from the EA SaaS licensing platform and its production databases/services.
- No EA binary may be offered, exposed, downloaded or released without explicit user consent, even after payment.
- External communications, publishing, payments, production changes and deployments require the applicable owner approval.

## Verification
CI validates the 22-skill inventory, eight department mappings, unique mapping coverage, disconnected runtime status and the draft/approval gates. The frontend build runs on each pull request. No production deployment is triggered by this repository change.

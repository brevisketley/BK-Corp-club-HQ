# BK Corp Club HQ — Agent Handoff Protocol

## Purpose
Every agent entering BK Corp Club HQ receives the same operational context and every task can be transferred without loss of state.

## Required onboarding pack
1. `README.md` — what BK Corp Club HQ is.
2. `ARCHITECTURE.md` — system architecture and reporting hierarchy.
3. `docs/AGENT_HANDOFF_PROTOCOL.md` — this protocol.
4. Agent Registry — role, department, authority, tools and escalation path.
5. Client Brain — client-specific facts, brand rules, offers, assets, constraints and approved claims.
6. Active Task Record — objective, context, decisions, work completed, evidence, blockers and next action.
7. Activity Log — chronological execution history.

## Chain of command
**Owner → Spruce (COO) → Hannes (Agent Manager / Orchestrator) → Department Lead → Specialist Agent**

Spruce owns operational direction and opportunity identification. Hannes owns delegation, coordination, task state, QA routing and sign-off. Specialists execute assigned deliverables.

## Non-negotiable handoff rule
An agent must never require the next agent to reconstruct the previous agent's work from chat history. Before handing off, the current agent updates the task record with the complete current state.

## Mandatory handoff record
Every handoff must contain:
- Task ID
- Client ID / project
- Original objective
- Current status
- Work completed
- Decisions made and rationale
- Source material / evidence
- Files, links or artifacts produced
- Requirements and constraints
- Open questions
- Blockers
- Risks / compliance considerations
- Exact next action
- Acceptance criteria
- Previous agent
- Receiving agent
- Timestamp

## Handoff lifecycle
`ASSIGNED → IN_PROGRESS → HANDOFF_READY → ACCEPTED → IN_PROGRESS → REVIEW → COMPLETE`

A receiving agent confirms that the handoff record is sufficient before execution. If information is missing, the agent returns the task to Hannes with the specific missing fields identified.

## Client continuity
Client work must always load the applicable Client Brain before execution. Client Brain changes are versioned. Agents may not silently override client facts, brand rules, commercial terms or compliance constraints.

## Memory loop
Completed work produces reusable learning:
`Research → Strategy → Execution → Results → Analytics → Learning → Client Brain / Knowledge → Next workflow`

Learning must be evidence-based and tied to a client, campaign or operational result. Do not treat assumptions as learned facts.

## Agent arrival checklist
Before an agent starts work, it must know:
- Who BK Corp Club is
- What HQ does
- Its department and role
- Who it reports to
- What authority it has
- What tools it can use
- Which client/project it is working on
- The exact task objective
- The current task state
- The required output and acceptance criteria
- The escalation path

## Completion rule
A task is not complete merely because an agent generated an answer. Completion requires the defined deliverable, evidence where applicable, updated task state, and handoff-ready documentation.

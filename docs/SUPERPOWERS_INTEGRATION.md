# BK Corp Club HQ — Superpowers Integration

## Decision
BK Corp Club HQ adopts the useful engineering operating principles from `obra/superpowers` while remaining its own agency operating system. We do not copy the repository wholesale or make HQ dependent on a particular coding harness.

## What we are incorporating

### 1. Brainstorm before non-trivial implementation
Hannes must ensure ambiguous or significant work is refined into a clear objective, constraints, options and acceptance criteria before execution.

### 2. Explicit implementation plans
Complex technical work is decomposed into small executable tasks with file/scope targets and verification steps.

### 3. Specialist/subagent delegation
Hannes can dispatch work to specialist agents, with each specialist receiving the task state and required context rather than a vague prompt.

### 4. Test-driven delivery where applicable
Engineering work follows RED → GREEN → REFACTOR where tests are meaningful. Non-code work uses an equivalent evidence/acceptance loop.

### 5. Review gates
Work is inspected against the requested outcome before being marked complete. Critical defects block completion.

### 6. Verification before completion
The system must distinguish `GENERATED` from `VERIFIED`. Agents must provide evidence appropriate to the task before Hannes signs off.

### 7. Systematic debugging
Failures follow a root-cause process rather than repeated trial-and-error changes. The task record captures the failure, evidence, hypothesis, fix and verification.

### 8. Parallel work with controlled handoffs
Independent tasks may run concurrently, but shared-state changes are coordinated through Hannes and the task system.

### 9. Durable project context
Designs, plans, task states, decisions and learnings are persisted in the HQ knowledge layer so context survives agent changes and session boundaries.

### 10. Finish cleanly
Completed work is reviewed, documented, committed where applicable, and returned to Hannes with a concise completion record and reusable learning.

## Adaptation to the agency
Superpowers is primarily a software-development methodology. BK Corp Club HQ extends the same discipline across marketing, sales, research, creative, customer service, client operations and finance.

For example:

`Client Objective → Brainstorm/Discovery → Strategy → Plan → Specialist Execution → Review → Verification → Client/Channel Delivery → Results → Learning → Client Brain`

## Governance
The Superpowers-style workflow is subordinate to BK Corp Club HQ's command structure:

`Owner → Spruce → Hannes → Department / Specialist Agents`

Superpowers principles improve how agents work; they do not replace Hannes' orchestration role or the Client Brain/handoff system.

## Source
The public `obra/superpowers` repository describes a composable skills methodology built around brainstorming, planning, subagent-driven development, TDD, review, systematic debugging and verification-before-completion. These principles were reviewed and adapted rather than copied wholesale.

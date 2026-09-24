# BK Corp Club HQ — Department Floor Model

The visual HQ is an extensible hotel-style interface. Floors are departments, not hard-coded limits.

## Initial floors
1. Customer Service
2. Marketing
3. Sales
4. Research & Intelligence
5. Creative & Content
6. Technology & Automation
7. Client Operations
8. Finance & Commercial

## Floor contract
Every floor has:
- Department identity and purpose
- Department lead/orchestrator where required
- Core resident agents
- On-demand specialist pool
- Queue of assigned tasks
- Active work
- Awaiting review/approval
- Completed work
- Department activity feed
- KPIs relevant to the department
- Escalation route to Hannes

## Extensibility
New departments are configuration-driven. Adding a floor must not require rewriting the orchestration engine.

## Agent visibility
Core agents appear as permanent floor residents. On-demand Agency Agents can be pulled into a department for a specific task and returned to the specialist pool after completion.

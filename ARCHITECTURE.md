# BK Corp Club HQ — Master Architecture

## Mission
BK Corp Club HQ is a standalone agency operating system. It is completely separate from the BK Corp Club SaaS venture.

## Command hierarchy
1. Brevis — Owner / final authority
2. Spruce — COO — operations, priorities, opportunities and organisational oversight
3. Hannes — Agent Manager / Orchestrator — decomposes objectives, assigns work, coordinates agents, validates outputs and reports completion
4. Department agents — specialist execution workforce

## Operating model
A user objective becomes a work package. Hannes decomposes it into tasks, routes tasks to departments, agents execute through approved tools, outputs are reviewed, results are recorded, and learnings update the relevant Client Brain and organisational memory.

## Hotel-floor model
- Floor 1 — Customer Service
- Floor 2 — Marketing
- Floor 3 — Sales
- Floor 4 — Research & Intelligence
- Floor 5 — Creative & Content
- Floor 6 — Technology & Automation
- Floor 7 — Client Operations
- Floor 8 — Finance & Commercial
- Future floors are configuration-driven and can be added without redesigning the core system.

## Core subsystems
- HQ Lobby and floor navigation
- Agent Registry and Specialist Pool
- Hannes Command Centre
- Task and workflow engine
- Client workspaces
- Client Brain / brand knowledge
- Agent memory and learning loop
- Tool/integration layer
- Activity and audit log
- Human approval gates
- KPI and campaign analytics
- Desktop application shell

## Client learning loop
Research -> Strategy -> Production -> Execution -> Leads/Customers -> Results -> Analytics -> Learning -> Client Brain -> next workflow.

## Design principle
Agents are execution workers, not decorative chatbots. Every meaningful agent should have a defined role, inputs, outputs, tools, permissions, escalation rules and measurable completion criteria.

## Separation rule
No dependency on the existing BK Corp Club SaaS repository. HQ has its own repository, data model, runtime and deployment lifecycle.

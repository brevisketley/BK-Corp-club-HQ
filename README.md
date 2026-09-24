# BK Corp Club HQ

BK Corp Club agency headquarters and central operating system for managing departments, teams, projects, clients, and business operations as we grow.

## Vision
A standalone desktop-first agency operating system where Brevis can enter HQ, view departments as hotel-style floors, speak to agents, assign objectives, monitor execution, and receive verified results.

## Command structure
- **Brevis** — Owner / final authority
- **Spruce** — COO / operational oversight and opportunity identification
- **Hannes** — Agent Manager / Orchestrator / delegation and execution control
- **Department agents** — specialist execution workforce

## Core capabilities
- Hotel-style department floors
- Agent avatars and live status
- Hannes Command Centre
- Direct agent conversations
- Client workspaces
- Client Brain containing brand, audience, commercial rules and knowledge
- Multi-step workflows with approvals
- Real tool execution through integrations
- Activity, evidence and audit history
- Performance analytics
- Learning loop that updates client intelligence after each workflow
- Configurable future departments/floors
- Desktop application packaging

## Initial floors
1. Customer Service
2. Marketing
3. Sales
4. Research & Intelligence
5. Creative & Content
6. Technology & Automation
7. Client Operations
8. Finance & Commercial

## Operating loop
**Objective -> Hannes -> Research/Strategy -> Specialist execution -> Review -> Results -> Analytics -> Learning -> Client Brain -> next cycle**

## Repository structure
- `ARCHITECTURE.md` — system architecture and operating model
- `config/agents.json` — leadership and core specialist registry
- `config/departments.json` — configurable floor registry
- `config/client-brain.schema.json` — client intelligence contract
- `workflows/marketing-campaign.workflow.json` — first end-to-end workflow definition

## Separation
This repository is an independent venture and must not depend on or modify the existing BK Corp Club SaaS project.

## Build principle
The UI is the control room; the orchestration and tool layer performs the actual work. Agents must never be represented as active merely because they exist in the registry.

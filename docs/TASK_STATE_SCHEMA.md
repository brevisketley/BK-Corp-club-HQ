# BK Corp Club HQ — Task State Schema

Every executable task carries a persistent state record so any authorised agent can resume it without reconstructing prior work.

## Required fields
```text
Task ID
Client ID
Project ID
Objective
Priority
Assigned By
Current Owner
Previous Owner
Status
Created At
Updated At
Work Completed
Current Findings
Decisions
Evidence / Sources
Artifacts
Constraints
Open Questions
Blockers
Risks
Next Action
Acceptance Criteria
Handoff Notes
Learning Candidates
Approval Required
``` 

## State transitions
`BACKLOG → ASSIGNED → IN_PROGRESS → HANDOFF_READY → ACCEPTED → REVIEW → COMPLETE`

Alternative exception states:
`BLOCKED`, `AWAITING_INPUT`, `AWAITING_APPROVAL`, `REJECTED`, `CANCELLED`.

## Resume rule
A new agent begins from the latest persisted task state. It must not restart completed work unless Hannes explicitly reopens the task.

## Evidence rule
Claims affecting a client, campaign, commercial decision or compliance requirement must be supported by available source evidence or explicitly marked as assumptions requiring validation.

## Learning rule
At completion, record measurable results and candidate lessons separately. Only validated results become durable Client Brain knowledge.

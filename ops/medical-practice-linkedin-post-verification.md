# Medical Practice Online Marketing — LinkedIn Post Verification

## Daily publishing contract

Two LinkedIn posts must run every day through Make:

1. **07:00 Africa/Johannesburg — Morning post**
   - Scenario: `7583693`
   - Name: Medical Practice Online Marketing — Daily LinkedIn
   - Module: LinkedIn CreatePost
   - Content must be different from the previous day's morning post.
   - Verify the Make execution is **success** with zero module errors.
   - Verify the LinkedIn module output contains a LinkedIn share ID beginning with `urn:li:share:`.

2. **12:00 Africa/Johannesburg — Midday flyer**
   - Scenario: `7609239`
   - Name: Medical Practice Online Marketing — Daily LinkedIn Midday
   - Module: LinkedIn ShareImage
   - Must publish a flyer-style creative with a unique daily creative/headline/caption.
   - Verify the Make execution is **success** with zero module errors.
   - Verify the LinkedIn module output contains a LinkedIn share ID beginning with `urn:li:share:`.

## Verification rule

A scheduled run being triggered is **not enough**. After each scheduled post:

1. Check the scenario execution history.
2. Confirm status is `success`.
3. Confirm the LinkedIn module ran once and reported zero errors.
4. Inspect the module output.
5. Confirm a LinkedIn `urn:li:share:` ID was returned.
6. If any check fails, treat the post as **not verified** and investigate before claiming it was published.

## Current configuration

- LinkedIn connection ID: `11249980`
- Morning schedule: daily at 07:00 SAST
- Midday schedule: daily at 12:00 SAST
- Both scenarios are active.
- No incomplete executions are currently waiting.

## Content rule

Do not silently fall back to an old creative or repeat yesterday's content. Extend the dated content/creative mapping before the final mapped date is reached.

## Important limitation

A returned LinkedIn share ID proves that the LinkedIn module accepted/created the share. It does not by itself prove that a human-visible LinkedIn feed display was inspected. Do not describe feed visibility as independently verified unless LinkedIn itself has been checked.

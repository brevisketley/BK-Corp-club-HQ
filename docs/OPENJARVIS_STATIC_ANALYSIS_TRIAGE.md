# OpenJarvis Static-Analysis Triage

**Scan:** 2026-11-11, on the BK dependency-remediation PR head  
**Tool:** Semgrep `p/python` + `p/security-audit`  
**Scope:** `src/openjarvis`, 941 files, 221 rules  
**Result:** 40 findings, all classified by the ruleset as blocking. The upstream workflow uses `continue-on-error` for Semgrep, so the overall workflow's green conclusion must not be interpreted as a clean code scan.

Bandit was run with high severity and high confidence thresholds and reported zero issues.

## Finding distribution

The log contains 29 distinct file/rule blocks representing 40 reported matches:

| Rule family | Reported matches | Triage requirement |
|---|---:|---|
| Potential credential disclosure in logging | 8 | Inspect every logged exception, credential descriptor, tool argument and path; redact or remove sensitive values. |
| Dynamic `urllib` URL use | 7 | Validate scheme/host, reject `file://`, constrain outbound destinations and assess SSRF. |
| Dynamic `exec` | 5 | Verify inputs are generated internally or sandboxed; keep execution tools disabled in the BK profile. |
| Dynamic `eval` | 3 | Replace with safe parsers/registries where practical; prove any remaining input is trusted. |
| Native XML parser | 2 | Replace untrusted XML parsing with `defusedxml` or prove strict trusted-input constraints. |
| `subprocess(..., shell=True)` | 2 | Review command construction and sandbox boundaries; do not expose shell execution to the worker. |
| SHA-1 use | 1 | The reported use is a path-name hash, not a signature; migrate to SHA-256 to remove ambiguity. |
| NaN injection | 1 | Review the auth middleware's numeric parsing and reject NaN/Infinity before comparison or policy evaluation. |

## Source areas identified

- Dynamic URL access: `agents/hybrid/advisors.py`, `agents/hybrid/conductor.py`, `cli/_version_check.py`, `cli/gui_cmd.py`, `cli/mine_cmd.py`, `evals/datasets/webchorearena.py`, `mining/cpu_pearl.py`.
- Dynamic code execution: `agents/rlm_repl.py`, `core/config.py`, `evals/execution/webchorearena_env.py`, `evals/scorers/coding_assistant.py`, `evals/scorers/coding_task.py`, `evals/scorers/pinchbench.py`, `tools/repl.py`.
- Logging: `cli/ask.py`, `cli/serve.py`, `connectors/google_auth.py`, `connectors/slack_connector.py`, `core/credentials.py`, `engine/ollama.py`, `security/boundary.py`.
- XML: `connectors/apple_health.py`, `connectors/news_rss.py`.
- Shell: `security/subprocess_sandbox.py`, `tools/shell_exec.py`.
- Other: `connectors/whatsapp.py` (SHA-1 path hash), `server/auth_middleware.py` (NaN-injection rule).

These are scanner findings, not 40 individually confirmed exploitable vulnerabilities. Each requires code-context review. The dependency remediation PR did not modify these source areas.

## BK execution profile decision

The HQ registry intentionally keeps OpenJarvis:
- disabled and not deployed;
- read-only research only;
- shell, file writes, email, messaging and browser automation disabled;
- community skills and scheduled autonomy disabled;
- no production credentials or public endpoint.

This profile reduces exposure but does not replace source review. Do not enable OpenJarvis on a production host until the relevant findings are reviewed, fixed or explicitly risk-accepted, and the worker is tested in an isolated staging sandbox.

## Required follow-up

1. Inspect the logging findings and remove sensitive exception/tool-argument output.
2. Review dynamic URL call sites and enforce scheme/host allowlists at trust boundaries.
3. Confirm REPL/eval/scorer execution cannot receive untrusted input; keep all code execution paths disabled for the BK read-only profile.
4. Replace untrusted XML parsing with defused parsing.
5. Review shell execution and sandbox boundaries; keep shell capability disabled.
6. Replace the SHA-1 path hash with SHA-256.
7. Test auth middleware against NaN, Infinity and malformed numeric values.
8. Re-run Semgrep with JSON output retained as an artifact and require a reviewed baseline; do not rely on `continue-on-error`.

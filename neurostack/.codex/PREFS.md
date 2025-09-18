Agent Preflight — MCP Observability (Repo Policy)

Requirement: Before starting any chat session on this repo, Codex agents must check MCP availability and report status in their first response.

Checklist:
- Detect configured MCP servers (e.g., Playwright MCP) and confirm reachable.
- Confirm working directory for tests is `web/` and command is `npm run test:e2e`.
- Surface missing envs (e.g., `SAMPLES_PDF_DIR`) or fixtures (`sample-pdf/`).
- If MCP is unavailable, state fallback: run Playwright locally or via CI and provide steps.


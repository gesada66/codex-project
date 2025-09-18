Global User Preferences — NeuroStack Repo

Purpose: Persist operational preferences so future Codex agents have immediate context.

Summary
- Public repo: treat as public; never commit secrets; rely on .gitignore and CI secret scan.
- MCP preflight: check Playwright MCP availability and fixtures before work; prefer MCP for local E2E.
- CI policy: build runs on PRs; E2E runs only when RUN_E2E=true or branch matches e2e/* or *-e2e; recommend required checks for merges.
- Containers: avoid local builds; use cloud/vendor pipelines ad‑hoc. Provide prebuilt image option; local build scripts are fallback.
- Docs: see docs/SECURITY.md and docs/CONTAINERS.md.

Response Style Preference

- Every Codex agent response must include a brief summary section at the end titled “Summary”.
- Keep it concise (3–5 bullets). Highlight the actions taken and next options.
- Purpose: let the user scan quickly and decide whether to read full details.

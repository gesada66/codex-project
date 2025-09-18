# Security & Secrets Hygiene

This repository is public. Follow these rules to avoid leaking credentials:

- Never commit real secrets. Use `*.env.example` for documentation only.
- Local env files are ignored globally via `.gitignore` (`.env`, `.env.*`, `web/.env*`).
- Avoid committing real documents: `sample-pdf/` and `web/tests/fixtures/pdfs/` are ignored.
- If you accidentally committed a secret:
  1. Rotate the secret at the provider immediately.
  2. Remove from git history (examples):
     - `git rm --cached .env .env.local` (then commit)
     - Use `git filter-repo` or BFG to rewrite history if the secret is in prior commits.
  3. Force‑push only if you understand the impact on collaborators.

## CI Secret Scanning

GitHub Actions runs `Secret Scan` with Gitleaks on PRs. It fails the check if high‑confidence secrets are detected.

## Local Checklist Before Pushing

- `git status` shows no `.env` or PDFs.
- Search for patterns: `git grep -n "API_KEY\|SECRET\|TOKEN\|password" -- . ':!**/*.example'`
- Run Playwright and build locally; do not store keys in test code.


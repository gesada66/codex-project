# NeuroStack — Using a Prebuilt Docker Image (Optional)

This repo normally runs locally via `npm run dev` and builds in CI. If your host has toolchain/version issues, you can run a prebuilt container image instead.

## Pull and Run

- Pull (example):
  - `docker pull ghcr.io/<your-org-or-user>/neurostack-web:<tag>`
- Run:
  - `docker run --rm -p 3000:3000 --env-file ./web/.env.local ghcr.io/<org>/<repo>/neurostack-web:<tag>`

Notes:
- The image expects environment variables from an env file. Copy `web/.env.example` to `web/.env.local` and fill values as needed before running.
- App listens on port `3000` by default. Override with `-e PORT=3000` if customized.

## Mounting Data (optional)

If you want the container to see local files (e.g., SQLite DB, fixtures):
- SQLite (optional):
  - `-v "$PWD/web/dev.db:/app/dev.db" -e DATABASE_URL=sqlite://./dev.db`
- Static files (public): already baked into the image during build.

## Compose (optional)

```yaml
services:
  web:
    image: ghcr.io/<org>/<repo>/neurostack-web:<tag>
    ports: ["3000:3000"]
    env_file: ./web/.env.local
    environment:
      NEXT_PUBLIC_DEPLOY_TARGET: local
    # volumes:
    #   - ./web/dev.db:/app/dev.db
```

## When to prefer the prebuilt image

- Node/npm differences: your host’s Node version doesn’t match the project (Node 20).
- OS issues: native deps, glibc/musl differences, or corporate machines with locked toolchains.
- Quick demo: you want a zero-build startup path.

## Compatibility considerations

- CPU arch: Publish/choose the correct platform (`linux/amd64` and/or `linux/arm64`). On Apple Silicon, prefer an `arm64` image or run with `--platform linux/amd64` if emulation is acceptable.
- Env parity: Ensure `web/.env.local` mirrors production-ish settings if you need closer parity.
- Turbopack root: Already set in `web/next.config.ts` (no multi-lockfile warnings inside container).
- Playwright E2E: The app image doesn’t include browsers. Run tests on the host or in a separate CI job that installs Playwright.

## Building the image (reference only)

Cloud vendor pipelines typically run something like:

```bash
docker buildx build \
  -t ghcr.io/<org>/<repo>/neurostack-web:<tag> \
  --push ./web
```

If you want a manual GitHub Actions workflow (workflow_dispatch) for ad‑hoc builds to GHCR/ECR/GAR/ACR, we can add it later.

## Helper scripts (optional)

For convenience, scripts are included:

- Bash (macOS/Linux/WSL):
  - `./scripts/build-image.sh ghcr.io/<org>/<repo>/neurostack-web:dev`
  - or: `IMAGE_TAG=ghcr.io/<org>/<repo>/neurostack-web:dev PUSH=true ./scripts/build-image.sh`

- PowerShell (Windows):
  - `./scripts/build-image.ps1 ghcr.io/<org>/<repo>/neurostack-web:dev`
  - `./scripts/build-image.ps1 -ImageTag ghcr.io/<org>/<repo>/neurostack-web:dev -Push`

Defaults:
- Platform: `linux/amd64` (override with `PLATFORM` env or `-Platform`).
- `--push` only when explicitly enabled; otherwise the image is loaded locally.

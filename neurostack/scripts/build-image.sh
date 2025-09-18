#!/usr/bin/env bash
set -euo pipefail

# Build a NeuroStack web Docker image from ./web
# Usage examples:
#   ./scripts/build-image.sh ghcr.io/myorg/neurostack-web:dev
#   IMAGE_TAG=ghcr.io/myorg/neurostack-web:dev PUSH=true ./scripts/build-image.sh

IMAGE_TAG="${1:-${IMAGE_TAG:-}}"
PUSH="${PUSH:-false}"
PLATFORM="${PLATFORM:-linux/amd64}"

if [[ -z "${IMAGE_TAG}" ]]; then
  echo "ERROR: Provide image tag (e.g., ghcr.io/org/neurostack-web:dev) as arg or IMAGE_TAG env" >&2
  exit 1
fi

if ! command -v docker >/dev/null 2>&1; then
  echo "ERROR: docker not found on PATH" >&2
  exit 1
fi

CTX_DIR="$(cd "$(dirname "$0")/.." && pwd)/web"

echo "Building image: ${IMAGE_TAG} (platform=${PLATFORM}, push=${PUSH})"
if [[ "${PUSH}" == "true" ]]; then
  docker buildx build \
    --platform "${PLATFORM}" \
    -t "${IMAGE_TAG}" \
    --push \
    "${CTX_DIR}"
else
  docker buildx build \
    --platform "${PLATFORM}" \
    -t "${IMAGE_TAG}" \
    --load \
    "${CTX_DIR}"
fi

echo "Done. Image: ${IMAGE_TAG}"


#!/usr/bin/env pwsh
param(
  [Parameter(Position=0)] [string]$ImageTag,
  [string]$Platform = "linux/amd64",
  [switch]$Push
)

if (-not $ImageTag) {
  if ($env:IMAGE_TAG) { $ImageTag = $env:IMAGE_TAG } else {
    Write-Error "Provide image tag (e.g., ghcr.io/org/neurostack-web:dev) as arg or set IMAGE_TAG"
    exit 1
  }
}

if (-not (Get-Command docker -ErrorAction SilentlyContinue)) {
  Write-Error "docker not found on PATH"
  exit 1
}

$RepoRoot = Split-Path -Parent $PSScriptRoot
$Ctx = Join-Path $RepoRoot 'web'

Write-Host "Building image: $ImageTag (platform=$Platform, push=$Push)"

if ($Push.IsPresent) {
  docker buildx build `
    --platform $Platform `
    -t $ImageTag `
    --push `
    $Ctx
} else {
  docker buildx build `
    --platform $Platform `
    -t $ImageTag `
    --load `
    $Ctx
}

Write-Host "Done. Image: $ImageTag"


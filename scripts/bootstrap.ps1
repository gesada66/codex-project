Param(
  [switch]$NoInstall
)

Write-Host "Bootstrapping TypeScript workspace..." -ForegroundColor Cyan

if (-not $NoInstall) {
  Write-Host "Installing dependencies via npm ci..." -ForegroundColor Yellow
  npm ci
}

Write-Host "Building TypeScript..." -ForegroundColor Yellow
npm run build

Write-Host "Running unit tests..." -ForegroundColor Yellow
npm test

Write-Host "Done." -ForegroundColor Green


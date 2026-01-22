# PowerShell script to start the Next.js dev server
# Usage: .\start-dev.ps1

Write-Host "Starting Next.js development server..." -ForegroundColor Green

# Navigate to webapp directory
Set-Location webapp

# Check if node_modules exists
if (-not (Test-Path "node_modules")) {
    Write-Host "Installing dependencies..." -ForegroundColor Yellow
    npm install
}

# Start the dev server
Write-Host "Starting dev server on http://localhost:3000" -ForegroundColor Cyan
npm run dev


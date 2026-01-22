# Vercel Deployment Script
# Run this in PowerShell

Write-Host "🚀 Starting Vercel Deployment..." -ForegroundColor Green

# Navigate to webapp directory
Set-Location webapp

Write-Host "`n📋 Step 1: Login to Vercel" -ForegroundColor Yellow
Write-Host "This will open your browser for authentication..." -ForegroundColor Gray
vercel login

Write-Host "`n📦 Step 2: Deploying to Vercel..." -ForegroundColor Yellow
vercel --prod

Write-Host "`n✅ Deployment complete!" -ForegroundColor Green
Write-Host "Don't forget to add environment variables in Vercel dashboard:" -ForegroundColor Yellow
Write-Host "  - GROQ_API_KEY" -ForegroundColor Gray
Write-Host "  - WP_USER" -ForegroundColor Gray
Write-Host "  - WP_APP_PASS" -ForegroundColor Gray
Write-Host "  - WP_API_URL" -ForegroundColor Gray


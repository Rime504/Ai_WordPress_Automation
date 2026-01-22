# 🚀 Quick Start Guide

## Starting the Dev Server

### Option 1: Use the PowerShell Script (Easiest)
```powershell
.\start-dev.ps1
```

### Option 2: Manual Start (PowerShell)
```powershell
# Navigate to webapp directory
cd webapp

# Start the server
npm run dev
```

### Option 3: One-liner (PowerShell)
```powershell
cd webapp; npm run dev
```

## ⚠️ Important Notes for PowerShell

**PowerShell does NOT support `&&` syntax!**

❌ **Wrong:**
```powershell
cd webapp && npm run dev
```

✅ **Correct:**
```powershell
cd webapp; npm run dev
```

Or use separate commands:
```powershell
cd webapp
npm run dev
```

## 📍 Always Run Commands from the `webapp` Directory

The `package.json` file is located in the `webapp` subdirectory, not in the root.

## 🔧 Troubleshooting

### "next is not recognized"
- Make sure you're in the `webapp` directory
- Run `npm install` to install dependencies

### "Port 3000 already in use"
```powershell
# Find the process
netstat -ano | findstr :3000

# Kill it (replace PID with the number from above)
taskkill /PID <PID_NUMBER> /F
```

### "GROQ_API_KEY is missing"
1. Make sure `.env.local` exists in the `webapp` directory
2. Add your API key: `GROQ_API_KEY=gsk_your_key_here`
3. Restart the dev server


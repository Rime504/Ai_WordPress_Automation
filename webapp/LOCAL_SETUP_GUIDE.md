# 🚀 LOCAL SETUP GUIDE - Step by Step

## ✅ What You Need First

Before starting, install these on your computer:

1. **Node.js 18+** 
   - Download: https://nodejs.org/en/download/
   - Choose "LTS" version
   - After install, verify: `node --version` (should show v18 or higher)

2. **Git**
   - Download: https://git-scm.com/downloads
   - After install, verify: `git --version`

3. **Code Editor** (recommended)
   - VS Code: https://code.visualstudio.com/

---

## 📋 STEP-BY-STEP INSTRUCTIONS

### STEP 1: Get Your Groq API Key (2 minutes)

1. Go to https://console.groq.com
2. Click "Sign Up" (it's FREE!)
3. Verify your email
4. Click "API Keys" in the left sidebar
5. Click "Create API Key"
6. Give it a name: "WordPress Generator"
7. Click "Create"
8. **COPY THE KEY** (starts with `gsk_...`)
   - Save it in a text file - you'll need it in Step 4!

### STEP 2: Download the Project Files

You have two options:

**Option A: Download as ZIP**
1. I'll provide you the project files
2. Extract to your Desktop or Documents folder
3. Open terminal/command prompt and navigate to the folder

**Option B: Use the sandbox files (recommended)**
```bash
# I'll create a downloadable package for you
```

### STEP 3: Open Terminal in Project Folder

**On Mac:**
1. Open Finder → Navigate to project folder
2. Right-click folder → "New Terminal at Folder"

**On Windows:**
1. Open File Explorer → Navigate to project folder
2. Type `cmd` in the address bar → Press Enter

**On Linux:**
1. Open terminal
2. Use `cd` to navigate to project folder

### STEP 4: Install Dependencies (2 minutes)

```bash
# Make sure you're in the project folder
# You should see files like package.json

# Install all dependencies
npm install
```

You'll see:
- Downloading packages...
- Added 408 packages in ~1 minute
- ✅ Done!

### STEP 5: Create .env.local File

**Option A: Use command line**

On Mac/Linux:
```bash
echo "GROQ_API_KEY=your_api_key_here" > .env.local
```

On Windows (PowerShell):
```powershell
echo GROQ_API_KEY=your_api_key_here > .env.local
```

**Option B: Create manually**
1. Create a new file named `.env.local` in the project root
2. Add this line:
   ```
   GROQ_API_KEY=gsk_your_actual_key_here
   ```
3. Save the file

⚠️ **IMPORTANT**: Replace `gsk_your_actual_key_here` with YOUR actual Groq API key from Step 1!

### STEP 6: Run the Development Server (30 seconds)

```bash
npm run dev
```

You should see:
```
  ▲ Next.js 14.2.35
  - Local:        http://localhost:3000
  - Environments: .env.local

 ✓ Ready in 2.3s
```

### STEP 7: Open in Browser

1. Open your browser (Chrome, Firefox, Safari, Edge)
2. Go to: **http://localhost:3000**
3. You should see the AI WordPress Content Generator! 🎉

### STEP 8: Test It Out!

1. Type a topic: "Benefits of morning meditation"
2. Click "Generate Content" or press Enter
3. Wait 2-3 seconds
4. See your blog post appear! ✨

---

## 🎯 WHAT TO DO IF IT DOESN'T WORK

### Problem 1: "Command not found: npm"

**Solution:** Node.js is not installed or not in PATH
```bash
# Check if Node.js is installed
node --version

# If not installed:
# 1. Go to https://nodejs.org
# 2. Download and install LTS version
# 3. Restart terminal
# 4. Try again
```

### Problem 2: "Port 3000 already in use"

**Solution:** Something else is using port 3000

On Mac/Linux:
```bash
# Kill the process using port 3000
lsof -ti:3000 | xargs kill -9

# Then try again
npm run dev
```

On Windows:
```cmd
# Find what's using port 3000
netstat -ano | findstr :3000

# Kill it (replace 1234 with actual PID)
taskkill /PID 1234 /F

# Then try again
npm run dev
```

### Problem 3: "API key is missing or invalid"

**Solution:** Check your .env.local file
```bash
# View the file contents
cat .env.local   # Mac/Linux
type .env.local  # Windows

# Should show:
# GROQ_API_KEY=gsk_...

# If empty or wrong:
# 1. Delete .env.local
# 2. Create new one with correct key
# 3. Restart dev server (Ctrl+C then npm run dev)
```

### Problem 4: "Module not found" errors

**Solution:** Dependencies not installed properly
```bash
# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json  # Mac/Linux
rmdir /s node_modules & del package-lock.json  # Windows

# Reinstall
npm install

# Try again
npm run dev
```

### Problem 5: Browser shows "This site can't be reached"

**Solution:** Server not running or wrong URL
1. Check terminal - should say "Ready in X seconds"
2. Use exactly: `http://localhost:3000`
3. Don't use: `http://127.0.0.1:3000` (clipboard won't work)

---

## 🚀 NEXT STEPS: DEPLOY TO VERCEL (MAKE IT PUBLIC)

Once it's working locally, deploy it so others can use it!

### Step 1: Create GitHub Account (if you don't have one)
1. Go to https://github.com/signup
2. Follow the signup process
3. Verify your email

### Step 2: Push Your Code to GitHub

```bash
# Initialize git (if not done)
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial commit"

# Create new repository on GitHub
# Go to: https://github.com/new
# Repository name: ai-wordpress-automation
# Make it PUBLIC
# DON'T add README

# Add remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/ai-wordpress-automation.git

# Push code
git branch -M main
git push -u origin main
```

### Step 3: Deploy to Vercel

1. **Go to https://vercel.com**
2. **Sign up with GitHub** (click "Continue with GitHub")
3. **Import your repository**:
   - Click "New Project"
   - Find "ai-wordpress-automation"
   - Click "Import"
4. **Add environment variable**:
   - Click "Environment Variables"
   - Key: `GROQ_API_KEY`
   - Value: (paste your Groq API key)
   - Click "Add"
5. **Deploy**:
   - Click "Deploy"
   - Wait 2-3 minutes ⏳
   - ✅ Done!

### Step 4: Get Your Live URL

Vercel will give you a URL like:
- `https://ai-wordpress-automation.vercel.app`

Share this with anyone! It's live and free forever! 🎉

---

## 📝 QUICK COMMAND REFERENCE

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server (after build)
npm start

# Stop server
# Press: Ctrl + C

# Check versions
node --version
npm --version
git --version

# View .env.local file
cat .env.local        # Mac/Linux
type .env.local       # Windows

# Clean port 3000
lsof -ti:3000 | xargs kill -9    # Mac/Linux
netstat -ano | findstr :3000     # Windows
```

---

## ✅ SUCCESS CHECKLIST

Before you're done, make sure:

- [ ] Local dev server runs without errors
- [ ] Can generate content for 3+ different topics
- [ ] Copy button works correctly
- [ ] Responsive design looks good on mobile (resize browser)
- [ ] No errors in browser console (F12 → Console tab)
- [ ] Code is pushed to GitHub
- [ ] Deployed to Vercel successfully
- [ ] Live URL works from any device
- [ ] README.md has your info (name, GitHub, etc.)

---

## 🎓 UNDERSTANDING THE CODE

### Key Files to Know:

1. **app/api/generate/route.js** - Backend API that calls Groq
2. **app/page.js** - Frontend UI (form + results)
3. **app/globals.css** - Styling and animations
4. **package.json** - Dependencies and scripts
5. **.env.local** - API key (never commit this!)

### How It Works:

1. User types topic in frontend (page.js)
2. Frontend calls `/api/generate` endpoint
3. Backend (route.js) calls Groq API with prompt
4. Groq returns JSON with title, content, meta, tags
5. Frontend displays results
6. User clicks copy button → copies to clipboard

---

## 📞 NEED HELP?

**If you get stuck:**

1. ✅ Check the "WHAT TO DO IF IT DOESN'T WORK" section above
2. ✅ Read the error message carefully
3. ✅ Google the error message
4. ✅ Check that all prerequisites are installed
5. ✅ Make sure .env.local has the correct API key
6. ✅ Try deleting node_modules and reinstalling

**Still stuck?**
- Copy the full error message
- Take a screenshot
- Ask for help with specific details

---

## 🎯 YOU'RE READY!

Follow these steps in order and you'll have:
- ✅ Working local development environment
- ✅ Public live URL on Vercel
- ✅ Professional portfolio project
- ✅ Complete understanding of the code

**Time estimate:** 30-45 minutes from start to deployed

Let's build this! 🚀

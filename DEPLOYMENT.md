# 🚀 Complete Deployment Guide

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [WordPress Setup](#wordpress-setup)
3. [Deployment Option A: Local WordPress + Ngrok](#option-a-local-wordpress--ngrok)
4. [Deployment Option B: Live WordPress Domain](#option-b-live-wordpress-domain)
5. [Vercel Deployment](#vercel-deployment)
6. [Troubleshooting](#troubleshooting)
7. [Production Checklist](#production-checklist)

---

## Prerequisites

### Required Accounts
- ✅ **Groq Account** (Free) - [console.groq.com](https://console.groq.com)
- ✅ **Vercel Account** (Free) - [vercel.com](https://vercel.com)
- ✅ **GitHub Account** (Free) - [github.com](https://github.com)
- ✅ **WordPress Site** (Local or Live)

### Required Software
- ✅ **Node.js 18+** - [nodejs.org](https://nodejs.org)
- ✅ **Git** - [git-scm.com](https://git-scm.com)

---

## WordPress Setup

### Step 1: Enable WordPress REST API

1. **Login to WordPress Admin Dashboard**
   - Go to `http://your-site.com/wp-admin`

2. **Configure Permalinks** (CRITICAL)
   - Navigate to: **Settings → Permalinks**
   - Select: **Post name** (or any option EXCEPT "Plain")
   - Click: **Save Changes**
   
   ⚠️ **Why this matters**: WordPress REST API requires pretty permalinks. Without this, you'll get 404/405 errors.

3. **Verify REST API Works**
   - Open in browser: `http://your-site.com/wp-json/wp/v2`
   - You should see JSON data (not a 404 error)

### Step 2: Create Application Password

1. **Go to User Profile**
   - Navigate to: **Users → Profile**
   - Scroll down to: **Application Passwords**

2. **Generate New Password**
   - Application Name: `AI Content Generator`
   - Click: **Add New Application Password**
   - **COPY THE PASSWORD** (you can't see it again!)
   - Example: `25ZS rpJA ICFZ xpu0 u55k tjIQ`

3. **Save These Credentials**
   ```
   WP_USER=your_wordpress_username
   WP_APP_PASS=25ZSrpJAICFzxpu0u55ktjIQ  (remove spaces)
   ```

---

## Option A: Local WordPress + Ngrok

### When to Use This
- ✅ Testing locally before going live
- ✅ WordPress is on your laptop (LocalWP, XAMPP, MAMP)
- ✅ You don't have a live domain yet
- ✅ Quick development/testing

### Step 1: Install Ngrok

**Windows (PowerShell):**
```powershell
npm install -g ngrok
```

**Mac/Linux:**
```bash
npm install -g ngrok
# OR
brew install ngrok
```

### Step 2: Get Ngrok Auth Token

1. Go to: [dashboard.ngrok.com/get-started/your-authtoken](https://dashboard.ngrok.com/get-started/your-authtoken)
2. Sign up (free)
3. Copy your authtoken

### Step 3: Configure Ngrok

```bash
ngrok config add-authtoken YOUR_AUTH_TOKEN_HERE
```

### Step 4: Start Your Local WordPress

Make sure WordPress is running:
- **LocalWP**: Start your site
- **XAMPP**: Start Apache and MySQL
- **MAMP**: Start servers

Verify it works: `http://localhost` or `http://ai-wp.local`

### Step 5: Start Ngrok Tunnel

```bash
# If WordPress is on port 80:
ngrok http 80

# If WordPress is on port 8080:
ngrok http 8080

# If WordPress is on a custom domain like ai-wp.local:
ngrok http http://ai-wp.local:80
```

You'll see output like:
```
Forwarding   https://abc123.ngrok-free.app -> http://localhost:80
```

**COPY THIS URL**: `https://abc123.ngrok-free.app`

### Step 6: Update WordPress Site URL

⚠️ **CRITICAL STEP** - Without this, you'll get 405 errors!

**Option A: WordPress Admin**
1. Go to: **Settings → General**
2. Change both:
   - **WordPress Address (URL)**: `https://abc123.ngrok-free.app`
   - **Site Address (URL)**: `https://abc123.ngrok-free.app`
3. Click: **Save Changes**

**Option B: wp-config.php** (Recommended for testing)
```php
define('WP_HOME', 'https://abc123.ngrok-free.app');
define('WP_SITEURL', 'https://abc123.ngrok-free.app');
```

### Step 7: Set Vercel Environment Variables

```bash
cd webapp
vercel env add WP_API_URL production
# Enter: https://abc123.ngrok-free.app/wp-json/wp/v2

vercel env add WP_USER production
# Enter: your_wordpress_username

vercel env add WP_APP_PASS production
# Enter: your_application_password

vercel env add GROQ_API_KEY production
# Enter: your_groq_api_key
```

### Step 8: Deploy

```bash
vercel --prod
```

### ⚠️ Important Notes for Ngrok

1. **URL Changes on Restart**: Every time you restart ngrok, the URL changes
   - You must update `WP_API_URL` in Vercel
   - You must update WordPress site URL

2. **Keep Ngrok Running**: Don't close the terminal running ngrok

3. **Free Tier Limitations**:
   - URL changes on restart
   - Session timeout after 2 hours
   - Browser warning page (we handle this with headers)

4. **For Production**: Use Option B (Live Domain) instead

---

## Option B: Live WordPress Domain

### When to Use This
- ✅ **RECOMMENDED FOR PRODUCTION**
- ✅ WordPress is hosted online (Bluehost, SiteGround, WP Engine, etc.)
- ✅ You have a domain name
- ✅ Stable, permanent setup

### Step 1: Verify Your WordPress Site

1. **Check Site is Live**
   - Visit: `https://yourdomain.com`
   - Confirm WordPress loads

2. **Check REST API**
   - Visit: `https://yourdomain.com/wp-json/wp/v2`
   - Should see JSON (not 404)

3. **Check SSL Certificate**
   - URL should be `https://` (not `http://`)
   - If no SSL, get one free from your host or [Let's Encrypt](https://letsencrypt.org)

### Step 2: Configure Permalinks

1. **Login to WordPress Admin**
   - `https://yourdomain.com/wp-admin`

2. **Set Permalinks**
   - **Settings → Permalinks**
   - Select: **Post name**
   - Click: **Save Changes**

### Step 3: Create Application Password

(Same as WordPress Setup Step 2 above)

### Step 4: Set Vercel Environment Variables

```bash
cd webapp

# Set WordPress API URL (use your actual domain)
vercel env add WP_API_URL production
# Enter: https://yourdomain.com/wp-json/wp/v2

# Set WordPress username
vercel env add WP_USER production
# Enter: your_wordpress_username

# Set WordPress application password
vercel env add WP_APP_PASS production
# Enter: your_application_password_no_spaces

# Set Groq API key
vercel env add GROQ_API_KEY production
# Enter: your_groq_api_key
```

### Step 5: Deploy

```bash
vercel --prod
```

### Step 6: Test

1. Visit your Vercel URL: `https://your-app.vercel.app`
2. Generate content
3. Click "Publish to WordPress"
4. Check your WordPress site for the new post!

---

## Vercel Deployment

### First-Time Setup

1. **Push to GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M master
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin master
```

2. **Import to Vercel**
   - Go to: [vercel.com/new](https://vercel.com/new)
   - Click: **Import Git Repository**
   - Select your repo
   - **Root Directory**: `webapp`
   - **Framework**: Next.js (auto-detected)

3. **Add Environment Variables** (in Vercel Dashboard)
   - `GROQ_API_KEY`
   - `WP_USER`
   - `WP_APP_PASS`
   - `WP_API_URL`

4. **Deploy**
   - Click: **Deploy**
   - Wait 2-3 minutes

### Updating Your Deployment

```bash
# Make changes to code
git add .
git commit -m "Update feature"
git push origin master

# Vercel auto-deploys!
```

Or manually:
```bash
cd webapp
vercel --prod
```

---

## Troubleshooting

### Issue: "405 Not Allowed" when publishing

**Cause**: WordPress permalinks not configured or REST API disabled

**Solution**:
1. **Settings → Permalinks** → Select "Post name" → Save
2. Visit `https://your-site.com/wp-json/wp/v2` - should return JSON
3. If still fails, check if a security plugin is blocking REST API

### Issue: "401 Unauthorized" when publishing

**Cause**: Invalid credentials

**Solution**:
1. Verify `WP_USER` is correct (your WordPress username, not email)
2. Regenerate Application Password
3. Remove ALL spaces from password: `25ZS rpJA` → `25ZSrpJA`
4. Update Vercel environment variable
5. Redeploy: `vercel --prod`

### Issue: "404 Not Found" on WordPress API

**Cause**: Permalinks set to "Plain" or REST API disabled

**Solution**:
1. **Settings → Permalinks** → Change from "Plain" to "Post name"
2. Click **Save Changes** (this flushes rewrite rules)
3. Test: `https://your-site.com/wp-json/wp/v2`

### Issue: Ngrok URL keeps changing

**Cause**: Free ngrok URLs are temporary

**Solutions**:
- **Paid Ngrok** ($8/month): Get a permanent URL
- **Use Live Domain** (Option B): Recommended for production

### Issue: "Connection error" when generating content

**Cause**: Invalid Groq API key

**Solution**:
1. Check key at: [console.groq.com](https://console.groq.com)
2. Generate new key if needed
3. Update in Vercel: `vercel env add GROQ_API_KEY production`
4. Redeploy: `vercel --prod`

### Issue: Ngrok browser warning page

**Cause**: Ngrok shows warning on first visit

**Solution**: Already handled in code with `ngrok-skip-browser-warning` header

### Issue: CORS errors

**Cause**: WordPress blocking requests from Vercel domain

**Solution**: Add to `wp-config.php`:
```php
header('Access-Control-Allow-Origin: https://your-app.vercel.app');
header('Access-Control-Allow-Credentials: true');
```

---

## Production Checklist

### Before Going Live

- [ ] WordPress permalinks set to "Post name"
- [ ] WordPress REST API accessible (`/wp-json/wp/v2` returns JSON)
- [ ] Application password generated and saved
- [ ] SSL certificate installed (HTTPS)
- [ ] All environment variables set in Vercel
- [ ] Test content generation works
- [ ] Test WordPress publishing works
- [ ] Code pushed to GitHub
- [ ] Vercel deployment successful

### Security Best Practices

- [ ] Never commit `.env.local` to Git
- [ ] Use Application Passwords (not main password)
- [ ] Enable 2FA on WordPress
- [ ] Keep WordPress and plugins updated
- [ ] Use strong passwords
- [ ] Limit failed login attempts
- [ ] Regular backups

### Performance Optimization

- [ ] Enable caching on WordPress
- [ ] Use CDN for WordPress assets
- [ ] Optimize images
- [ ] Minify CSS/JS
- [ ] Use Vercel Edge Network (automatic)

---

## Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `GROQ_API_KEY` | Groq AI API key | `gsk_abc123...` |
| `WP_USER` | WordPress username | `admin` |
| `WP_APP_PASS` | WordPress app password | `25ZSrpJAICFz...` |
| `WP_API_URL` | WordPress REST API base | `https://site.com/wp-json/wp/v2` |

---

## Quick Command Reference

### Local Development
```bash
cd webapp
npm install
npm run dev
```

### Ngrok (Local WordPress)
```bash
ngrok http 80
# Copy the https URL
```

### Vercel Deployment
```bash
cd webapp
vercel --prod
```

### Update Environment Variables
```bash
vercel env add VARIABLE_NAME production
vercel env rm VARIABLE_NAME production
vercel env ls production
```

### Git Commands
```bash
git add .
git commit -m "Your message"
git push origin master
```

---

## Support

Need help? Check:
1. This guide's Troubleshooting section
2. [Vercel Documentation](https://vercel.com/docs)
3. [WordPress REST API Handbook](https://developer.wordpress.org/rest-api/)
4. [Ngrok Documentation](https://ngrok.com/docs)

---

**Last Updated**: January 2026
**Version**: 2.0.0

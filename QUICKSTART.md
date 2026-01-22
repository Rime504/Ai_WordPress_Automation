# Quick Start Guide

## 🚀 Get Running in 5 Minutes

### For Production (Live WordPress Site)

1. **Fix WordPress Permalinks** ⚠️ CRITICAL
   ```
   WordPress Admin → Settings → Permalinks → Select "Post name" → Save
   ```

2. **Create Application Password**
   ```
   WordPress Admin → Users → Profile → Application Passwords
   Name: "AI Generator" → Add New
   COPY THE PASSWORD!
   ```

3. **Set Environment Variables**
   ```bash
   cd webapp
   vercel env add GROQ_API_KEY production
   vercel env add WP_USER production
   vercel env add WP_APP_PASS production
   vercel env add WP_API_URL production
   # Enter: https://yoursite.com/wp-json/wp/v2
   ```

4. **Deploy**
   ```bash
   vercel --prod
   ```

5. **Test**
   - Visit your Vercel URL
   - Generate content
   - Click "Publish to WordPress"
   - ✅ Done!

---

## 🔧 For Local Testing (Ngrok)

Only use this for development/testing!

1. **Start Ngrok**
   ```bash
   ngrok http 80
   # Copy the https URL
   ```

2. **Update WordPress Site URL**
   ```
   Settings → General
   WordPress Address: https://abc123.ngrok-free.app
   Site Address: https://abc123.ngrok-free.app
   Save Changes
   ```

3. **Deploy with Ngrok URL**
   ```bash
   cd webapp
   vercel env add WP_API_URL production
   # Enter: https://abc123.ngrok-free.app/wp-json/wp/v2
   vercel --prod
   ```

⚠️ **Remember**: Ngrok URL changes on restart!

---

## Common Errors & Fixes

### "405 Not Allowed"
**Fix**: Settings → Permalinks → "Post name" → Save

### "404 Not Found"
**Fix**: Same as above + verify `/wp-json/wp/v2` returns JSON

### "401 Unauthorized"
**Fix**: Regenerate Application Password, remove spaces

### "Connection error"
**Fix**: Check GROQ_API_KEY is valid

---

## Need More Help?

See `DEPLOYMENT.md` for complete guide!

# 🚀 Deployment Guide - Private Instance

**PRIVATE DEPLOYMENT INSTRUCTIONS**

This guide is for deploying your own live instance with real credentials.

---

## 🔒 Create Private Deployment Repo

**1. Create a new PRIVATE repository on GitHub:**
```
Name: deadman-live
Visibility: PRIVATE ⚠️
Description: Live deployment of Dead Man's Trigger (PRIVATE - contains credentials)
```

**2. Clone your public repo locally:**
```bash
cd ~/Desktop
git clone https://github.com/Ringmast4r/DEAD-MANS-TRIGGER.git deadman-live
cd deadman-live
```

**3. Create .env file with REAL credentials:**
```bash
# Create .env file
cat > .env << 'EOF'
PORT=3000

# PRODUCTION EMAIL CONFIGURATION
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=deadmanstriggerswitch@gmail.com
EMAIL_PASS=your-actual-app-password-here

# Replace with your real credentials before deploying!
EOF
```

**4. Initialize as separate private repo:**
```bash
# Remove connection to public repo
rm -rf .git

# Initialize new repo
git init

# Add all files INCLUDING .env (this repo is PRIVATE)
git add .

# Commit
git commit -m "Initial private deployment setup"

# Create private repo on GitHub then:
git remote add origin https://github.com/Ringmast4r/deadman-live.git
git branch -M main
git push -u origin main
```

---

## ☁️ Deploy to Railway

**1. Sign up for Railway:**
- Go to: https://railway.app/
- Sign up with GitHub
- Authorize Railway

**2. Create new project:**
- Click "New Project"
- Select "Deploy from GitHub repo"
- Choose: `Ringmast4r/deadman-live` (your PRIVATE repo)

**3. Configure environment variables:**
Railway will ask for environment variables. Add these:

```
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=deadmanstriggerswitch@gmail.com
EMAIL_PASS=qikzjihgxbreynah
```

**4. Deploy:**
- Railway auto-deploys
- You'll get a URL like: `https://deadman-trigger-production.up.railway.app`

**5. Test it:**
```
Visit: https://your-railway-url.railway.app/index-v2.html
```

---

## 🌐 Connect Cloudflare Domain

**1. Get Railway URL:**
- In Railway dashboard, copy your app URL
- Example: `deadman-trigger-production.up.railway.app`

**2. In Railway, add custom domain:**
- Settings → Domains
- Click "Custom Domain"
- Enter: `deadman.yourdomain.com` (or whatever you want)
- Railway will give you a CNAME target

**3. In Cloudflare DNS:**
```
Type: CNAME
Name: deadman
Target: [Railway's CNAME from step 2]
Proxy: ON (orange cloud)
TTL: Auto
```

**4. Wait for DNS propagation (5-10 minutes)**

**5. Access your live app:**
```
https://deadman.yourdomain.com/index-v2.html
```

---

## 🔄 Updating Your Deployment

When you make changes:

```bash
# In your private repo (deadman-live)
git add .
git commit -m "Update feature"
git push origin main

# Railway auto-deploys the changes
```

---

## 🔐 Security Notes

**Private Repo:**
- ✅ Contains real credentials
- ✅ Only you can access
- ✅ Railway reads .env from repo
- ⚠️ NEVER make this repo public!

**Public Repo:**
- ✅ Share code with world
- ✅ No credentials
- ✅ Uses .env.example only

---

## 🆘 Troubleshooting

**Railway deployment failed:**
```bash
# Check Railway logs in dashboard
# Common issues:
# - Missing environment variables
# - Port configuration (Railway sets PORT automatically)
```

**Domain not working:**
```bash
# Check DNS propagation
dig deadman.yourdomain.com

# Verify CNAME points to Railway
# Make sure Cloudflare proxy is ON
```

**Email not sending:**
```bash
# Check Railway logs for email errors
# Verify EMAIL_PASS is correct
# Gmail may block Railway IPs - use SendGrid instead
```

---

## 💡 Alternative: Deploy to Render

If Railway doesn't work, try Render:

**1. Sign up:** https://render.com/
**2. New Web Service → Connect GitHub (deadman-live)**
**3. Settings:**
```
Build Command: npm install
Start Command: npm start
Environment Variables: (same as Railway)
```
**4. Deploy**

---

## 📊 What You'll Have

**Public Repo (DEAD-MANS-TRIGGER):**
```
Purpose: Share code
URL: https://github.com/Ringmast4r/DEAD-MANS-TRIGGER
Visitors: Can fork and deploy their own
```

**Private Repo (deadman-live):**
```
Purpose: Your live deployment
URL: https://github.com/Ringmast4r/deadman-live (PRIVATE)
Access: Only you
```

**Live Website:**
```
URL: https://deadman.yourdomain.com
Purpose: Your actual dead man's switch
Status: Running 24/7 on Railway
```

---

**Created by ringmast4r**

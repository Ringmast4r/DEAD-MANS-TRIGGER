# Dead Man's Trigger v2.0 - Server-Powered Setup Guide

## 🚀 What's New in v2.0?

**This version ACTUALLY works as a dead man's switch!**

### v1.0 Problems (Fixed!)
- ❌ Timer only ran when browser was open
- ❌ Emails required manual "Send" click
- ❌ Everything happened locally in browser
- ❌ Useless if you're dead/incapacitated

### v2.0 Solutions
- ✅ **Server-side timer** runs 24/7 independently
- ✅ **Automatic email sending** - no manual clicks
- ✅ **Works when computer is off** - server keeps running
- ✅ **ACTUALLY works when you're dead!**

---

## 📋 Prerequisites

- Node.js (v14 or higher) - [Download here](https://nodejs.org/)
- An email account for sending (Gmail, Outlook, etc.)
- Basic terminal/command line knowledge

---

## 🛠️ Installation & Setup

### Step 1: Install Dependencies

Open terminal in the project folder and run:

```bash
npm install
```

This installs:
- Express (web server)
- SQLite (database)
- Nodemailer (email sending)
- node-cron (scheduled tasks)

### Step 2: Configure Email

1. Copy the example config file:
   ```bash
   copy .env.example .env
   ```

2. Edit `.env` file with your email settings:

#### For Gmail:
```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password-here
```

**IMPORTANT:** Gmail requires an "App Password", not your regular password!

**How to get Gmail App Password:**
1. Go to https://myaccount.google.com/security
2. Enable 2-Factor Authentication (if not already)
3. Go to https://myaccount.google.com/apppasswords
4. Select "Mail" and your device
5. Copy the 16-character password
6. Use that as `EMAIL_PASS` in `.env`

#### For Outlook/Hotmail:
```env
EMAIL_HOST=smtp-mail.outlook.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your-email@outlook.com
EMAIL_PASS=your-regular-password
```

Outlook uses your regular password (no app password needed).

#### For Other Providers:
Check your email provider's SMTP settings documentation.

### Step 3: Start the Server

```bash
npm start
```

You should see:
```
╔═══════════════════════════════════════════════════════════════╗
║         DEAD MAN'S TRIGGER SERVER - RUNNING                  ║
╚═══════════════════════════════════════════════════════════════╝

Server: http://localhost:3000
Database: deadman.db
Email: Configured ✓
```

### Step 4: Open the Web Interface

Open your browser and go to:
```
http://localhost:3000/index-v2.html
```

---

## 📖 How to Use

### 1. Configure Your Trigger

1. Click **"SETUP TRIGGER"**
2. Set timer duration (hours) - e.g., 24 = check in once per day
3. Add email recipients (comma-separated)
4. Write your secret message
5. Upload a file if needed (will be emailed as attachment)
6. Add URLs to open when triggered
7. Click **"ARM TRIGGER"**

### 2. Check In Regularly

- Click **"CHECK-IN / RESET"** before the timer expires
- This proves you're alive and resets the countdown
- You can close the browser - the server keeps running!

### 3. What Happens When Triggered?

When you fail to check in:

1. **Server automatically sends emails** to all recipients with:
   - Your secret message
   - Any uploaded files (as attachments)
   - Timestamp of when it triggered

2. **Trigger is disarmed** (won't trigger again)

3. **You'll see "TRIGGERED!" on the countdown**

---

## 🔧 Advanced: Running Server 24/7

The server must keep running for the trigger to work. Here are options:

### Option 1: Keep Terminal Open (Simple)
- Just leave the terminal window open
- Server runs as long as terminal is open

### Option 2: Background Process (Windows)
Use PM2 to run the server in the background:
```bash
npm install -g pm2
pm2 start server.js --name deadman-trigger
pm2 save
pm2 startup
```

Now it runs even after you close terminal!

### Option 3: Deploy to Cloud (Most Reliable)
Deploy to a cloud server (Heroku, Railway, Render, etc.) so it runs 24/7 even when your computer is off.

**Heroku Example:**
1. Install Heroku CLI
2. Run:
   ```bash
   heroku create my-deadman-trigger
   heroku config:set EMAIL_HOST=smtp.gmail.com
   heroku config:set EMAIL_USER=your-email@gmail.com
   heroku config:set EMAIL_PASS=your-app-password
   git push heroku main
   ```
3. Your trigger runs 24/7 on Heroku's servers

---

## 🧪 Testing

**Test with a 1-minute trigger:**

1. Set duration to `0.0167` hours (1 minute)
2. Add your own email as recipient
3. Write "This is a test" as the message
4. Click "ARM TRIGGER"
5. Wait 1 minute
6. Check your email - you should receive the automated email!

---

## 🔒 Security Notes

- **Email credentials** are stored in `.env` file (don't commit to Git!)
- **Database** (`deadman.db`) stores all trigger data locally
- **Files** are stored as base64 in the database (keep files small)
- **No encryption** - don't store highly sensitive data without additional security

---

## 📁 File Structure

```
dead-mans-trigger/
├── server.js              # Main server (runs 24/7)
├── package.json           # Dependencies
├── .env                   # Email config (create this!)
├── .env.example          # Template for .env
├── index-v2.html         # Web interface (v2.0)
├── index.html            # Old version (v1.0)
├── deadman.db            # Database (auto-created)
└── SETUP-V2.md           # This file
```

---

## ❓ Troubleshooting

### "Cannot connect to server" error
**Solution:** Make sure the server is running (`npm start`)

### "Failed to send email" error
**Causes:**
- Wrong email credentials in `.env`
- Gmail: Need App Password (not regular password)
- Firewall blocking SMTP port 587

**Solution:** Double-check `.env` configuration

### Database errors
**Solution:** Delete `deadman.db` and restart server (creates fresh database)

### Timer not counting down
**Solution:** Server must be running. Keep `npm start` terminal open.

### Want to change trigger settings
**Solution:** Click "DISARM & EDIT" to stop the countdown and reconfigure

---

## 🚨 IMPORTANT NOTES

1. **Server must run 24/7** for this to work as a dead man's switch
2. **Check in regularly** or your trigger will activate
3. **Test it first** with a short timer (1 minute) before using long timers
4. **Not for critical use** - this is a hobbyist/educational tool
5. **For real critical switches**, use professional services with redundant systems

---

## 🎯 Real-World Usage

**Good for:**
- Sending important info to loved ones if you can't check in
- Educational project to learn about timers and automation
- Fun pranks (set 1-minute timer, send friend a spooky message)

**Not good for:**
- Life-critical situations (use professional services)
- Legal documents (use proper legal channels)
- Highly classified information (no encryption)

---

## 🤝 Need Help?

1. Check this guide
2. Read the error messages carefully
3. Test with a 1-minute timer first
4. Make sure `.env` is configured correctly
5. Ensure server is running (`npm start`)

---

**Built by ringmast4r**

**Version:** 2.0 (Server-Powered Edition)

**Last Updated:** 2025-10-08

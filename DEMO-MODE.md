# 🎮 Demo Mode Guide

**Run Dead Man's Trigger locally without email setup - perfect for learning and testing!**

---

## What is Demo Mode?

Demo Mode allows you to run the Dead Man's Trigger system and see how everything works WITHOUT needing to:
- Sign up for SendGrid
- Configure email credentials
- Worry about sending actual emails

Instead, the system logs what WOULD be sent to the console, so you can see exactly how the trigger works.

---

## Quick Start (60 Seconds)

```bash
# 1. Clone the repository
git clone https://github.com/Ringmast4r/DEAD-MANS-TRIGGER.git
cd DEAD-MANS-TRIGGER

# 2. Install dependencies
npm install

# 3. Start in demo mode (no .env file needed!)
npm start
```

That's it! The server starts in **DEMO MODE** automatically when no `SENDGRID_API_KEY` is found.

---

## Using Demo Mode

### 1. Open the Web Interface

Visit: `http://localhost:3000`

You'll see the Dead Man's Trigger setup screen.

### 2. Set Up a Test Trigger

**Try this 1-minute test:**

- Click "SETUP TRIGGER"
- Duration: `0.0167` hours (1 minute)
- Recipients: `test@example.com, friend@example.com`
- Message: `This is a test trigger message!`
- Optional: Upload a small file or add URLs
- Click "ARM TRIGGER"

### 3. Watch It Work

**In the terminal, you'll see:**
- ✅ Trigger armed confirmation
- ⏰ Countdown starting
- 🔄 Cron job checking every 10 seconds

**After 1 minute:**
- 🚨 "TRIGGER EXPIRED - Executing actions..."
- 📧 Full email preview (what WOULD be sent)
- ✉️ Recipient list
- 📄 Subject line
- 📝 Complete message body
- 📎 Attachment info (if included)

**No real emails are sent!** Everything is logged to the console for learning.

---

## What You'll See in Demo Mode

### Server Startup

```
╔═══════════════════════════════════════════════════════════════╗
║         DEAD MAN'S TRIGGER SERVER - RUNNING                  ║
╚═══════════════════════════════════════════════════════════════╝

Server: http://localhost:3000
Database: deadman.db
Mode: DEMO MODE (emails logged to console)

🎮 DEMO MODE ACTIVE
   → No SendGrid API key detected
   → Emails will be LOGGED to console (not sent)
   → Perfect for testing and learning!
   → To enable real emails: Add SENDGRID_API_KEY to .env
```

### When Trigger Expires

```
═══════════════════════════════════════════════════════════════
📧 DEMO MODE: Email would be sent to:
═══════════════════════════════════════════════════════════════

✉️  TO: test@example.com
📄 SUBJECT: 🚨 Dead Man's Trigger Activated
📝 MESSAGE:
🚨 DEAD MAN'S TRIGGER HAS BEEN ACTIVATED 🚨

This is an automated message. The dead man's trigger has been activated
because the required check-in did not occur.

═══════════════════════════════════════════
SECRET MESSAGE:
═══════════════════════════════════════════

This is a test trigger message!

═══════════════════════════════════════════
Timestamp: 10/10/2025, 6:30:15 PM
═══════════════════════════════════════════

📎 ATTACHMENT: test-file.pdf (245.67 KB)

═══════════════════════════════════════════════════════════════
```

**Perfect for:**
- Understanding how the system works
- Testing trigger timing
- Seeing exactly what recipients would receive
- Learning without risk

---

## Switching to Live Mode

When you're ready to send real emails:

### 1. Sign Up for SendGrid

- Go to [SendGrid Signup](https://signup.sendgrid.com/)
- Free tier: 100 emails/day (no credit card required)

### 2. Create .env File

```bash
cp .env.example .env
```

Edit `.env` and add:

```env
SENDGRID_API_KEY=SG.your-api-key-here
SENDER_EMAIL=alerts@yourdomain.com
SENDER_NAME=Dead Mans Trigger
REPLY_TO_EMAIL=your-email@example.com
```

### 3. Restart Server

```bash
npm start
```

You'll see:
```
Mode: LIVE MODE (emails sent via SendGrid)
```

Now emails will actually be sent!

---

## Features Available in Demo Mode

**✅ What Works:**
- All timer logic (countdown, check-in, disarm)
- Database storage (SQLite)
- File upload handling
- URL processing
- All API endpoints
- Cron job trigger checking
- Complete email preview in console

**⚠️ What Doesn't Work:**
- Actual email delivery (logged instead)
- SendGrid integration (not needed)

**Demo Mode = Full Functionality - Email Sending**

---

## Common Demo Mode Scenarios

### Scenario 1: Learn the Concept
1. Set 1-minute trigger
2. Watch console countdown
3. See full email preview
4. Understand dead man's switch logic

### Scenario 2: Test Timing
1. Set various durations (5 mins, 30 mins, 1 hour)
2. Use check-in feature
3. Observe timer resets
4. Learn how persistence works

### Scenario 3: Test File Attachments
1. Upload a test file
2. Wait for trigger
3. See file info in console
4. Verify attachment handling

### Scenario 4: Multiple Recipients
1. Add several email addresses
2. Watch console output
3. See how emails are distributed
4. Understand recipient handling

---

## Educational Value

**What You Learn:**
- ✅ Server-side timers and automation
- ✅ Cron job scheduling
- ✅ Database persistence (SQLite)
- ✅ API design (REST endpoints)
- ✅ Email templating
- ✅ File upload handling (base64)
- ✅ Express.js server structure

**Perfect For:**
- Students learning backend development
- Understanding automation systems
- Testing ideas before production
- Workshops and tutorials

---

## Troubleshooting Demo Mode

### "npm start" fails
```bash
# Make sure dependencies are installed
npm install

# Check Node.js version (need v14+)
node --version
```

### "Port 3000 already in use"
```bash
# Use a different port
PORT=3001 npm start
```

### "Database errors"
```bash
# Delete database and restart
rm deadman.db
npm start
```

### "Can't see console output"
```bash
# Make sure you're watching the terminal where you ran npm start
# The email previews appear there, not in the browser
```

---

## Next Steps

**After trying Demo Mode:**

1. **Read the Code**: Check out `server.js` to see how it works
2. **Modify It**: Try changing email templates or timing logic
3. **Deploy It**: Move to live mode when ready
4. **Improve It**: Add features, fix security issues, make it your own!

**This is an educational project** - it's meant to be learned from and improved.

---

## Comparison: Demo vs Live Mode

| Feature | Demo Mode | Live Mode |
|---------|-----------|-----------|
| Setup Required | None (just `npm install`) | SendGrid account + .env config |
| Email Output | Console logs | Real emails sent |
| Cost | Free | Free (SendGrid free tier) |
| Best For | Learning, testing | Actual use |
| Risk | Zero | Must secure properly |
| Time to Start | 60 seconds | 5-10 minutes (signup + config) |

---

## Why Demo Mode Exists

**Dead Man's Trigger is an educational project.** The goal is to help people:
- Understand how automation works
- Learn server-side programming
- See a real-world example of timers and email
- Experiment safely before production

Demo Mode removes barriers to learning. You don't need:
- An email service account
- A credit card
- Domain authentication
- Fear of accidentally sending emails

Just clone, install, run, and learn!

---

## Contributing

Found a bug in demo mode? Have ideas for improvement?

See [CONTRIBUTING.md](CONTRIBUTING.md) for how to help make this educational tool better!

---

**Built by ringmast4r**
**Demo Mode = Learning Mode** 🎓

---

## Quick Reference

```bash
# Start demo mode
npm start

# Check if in demo mode
# Look for: "DEMO MODE (emails logged to console)"

# Test with 1-minute trigger
Duration: 0.0167 hours
Recipients: test@example.com
Message: Test message

# Watch console for email preview

# Switch to live mode
cp .env.example .env
# Edit .env with SendGrid API key
npm start
```

**Happy learning!** 🚀

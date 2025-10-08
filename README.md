# ⚠️ Dead Man's Trigger

**A server-powered dead man's switch that automatically sends emails when you fail to check in.**

Unlike browser-only solutions, this actually works when you're incapacitated because the timer runs on a server with automatic email delivery.

🎮 **[Try Live Demo](https://ringmast4r.github.io/DEAD-MANS-TRIGGER/)** (Browser-only version - for testing UI)

---

## ✨ Features

- ✅ **Server-side countdown** - Runs 24/7, even when your browser is closed
- ✅ **Automatic email sending** - No manual clicks required
- ✅ **File attachments** - Automatically emails files when triggered
- ✅ **Persistent storage** - SQLite database survives server restarts
- ✅ **Simple web interface** - Easy setup and check-in from any browser
- ✅ **Multiple email services** - Works with Gmail, SendGrid, Mailgun, Brevo, etc.

---

## 🚀 Quick Start

### Prerequisites

- Node.js v14+ ([Download](https://nodejs.org/))
- Email account for sending (Gmail, Outlook, or email service API)

### Installation

```bash
# 1. Clone or download this repo
cd dead-mans-trigger

# 2. Install dependencies
npm install

# 3. Configure email
cp .env.example .env
# Edit .env with your email credentials

# 4. Start server
npm start

# 5. Open web interface
# Visit http://localhost:3000/index-v2.html
```

---

## 📧 Email Configuration

The server needs SMTP credentials to send automated emails. Edit the `.env` file:

### Option 1: Gmail (Simple)

```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password-here
```

**Important:** Gmail requires an [App Password](https://myaccount.google.com/apppasswords), not your regular password.

### Option 2: SendGrid (Recommended for production)

```env
EMAIL_HOST=smtp.sendgrid.net
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=apikey
EMAIL_PASS=SG.your-api-key-here
```

Free tier: 100 emails/day forever. [Sign up here](https://signup.sendgrid.com/)

See `.env.example` for more email service options (Brevo, Mailgun, Outlook, etc.)

---

## 📖 How to Use

1. **Setup Trigger**
   - Open http://localhost:3000/index-v2.html
   - Click "SETUP TRIGGER"
   - Set timer duration (e.g., 24 hours = check in daily)
   - Add email recipients
   - Write your secret message
   - Optional: Upload file, add URLs to open
   - Click "ARM TRIGGER"

2. **Check In Regularly**
   - Click "CHECK-IN / RESET" before timer expires
   - Proves you're alive and resets countdown
   - Can close browser - server keeps running!

3. **What Happens When Triggered**
   - Server automatically sends emails to all recipients
   - Includes your secret message
   - Attaches any uploaded files
   - Opens configured URLs (if browser is open)

---

## 🧪 Testing

Test with a 1-minute trigger:

```
Duration: 0.0167 hours (1 minute)
Recipient: your-email@example.com
Message: "This is a test"
```

Wait 1 minute → Check your email!

---

## 🛠️ Technical Details

- **Backend:** Node.js + Express
- **Database:** SQLite (better-sqlite3)
- **Email:** Nodemailer (SMTP)
- **Scheduler:** node-cron (checks every 10 seconds)
- **Frontend:** Vanilla HTML/CSS/JavaScript

No frameworks, no build step - just simple reliable tech.

---

## 📁 Project Structure

```
dead-mans-trigger/
├── server.js              # Main server
├── index-v2.html          # Web interface
├── package.json           # Dependencies
├── .env.example          # Email config template
├── SETUP-V2.md           # Detailed setup guide
├── .gitignore            # Protects sensitive files
└── deadman.db            # Database (auto-created)
```

---

## 🚀 Deployment

For 24/7 operation, deploy to cloud:

- **Heroku** - Free tier available
- **Railway** - Easy deployment
- **Render** - Free tier
- **DigitalOcean** - VPS option

See [SETUP-V2.md](SETUP-V2.md) for deployment instructions.

---

## ⚠️ Important Notes

### What This IS:
- ✅ A functional dead man's switch for personal use
- ✅ Great for education and understanding automation
- ✅ Reliable for non-critical scenarios

### What This ISN'T:
- ❌ Enterprise-grade security
- ❌ Encrypted data storage
- ❌ For life-critical situations

**For critical use cases:** Use professional services like Google Inactive Account Manager or legal document services.

---

## 🔒 Security

- Email credentials stored in `.env` (gitignored)
- Database stored locally (unencrypted)
- Files stored as base64 (keep under 10MB)
- Anyone with server access can view data
- **Recommendation:** Add encryption for sensitive data

---

## 📝 License

MIT License - Use however you want!

---

## 🤝 Contributing

Pull requests welcome! Ideas for improvements:

- End-to-end encryption
- SMS notifications (Twilio)
- Web dashboard for multiple triggers
- Multi-user support
- Advanced scheduling

---

## 📚 Documentation

- **[SETUP-V2.md](SETUP-V2.md)** - Complete setup guide
- **[.env.example](.env.example)** - Email configuration options

---

## 🎯 Use Cases

- Send important info to loved ones if you can't check in
- Educational project for learning timers and automation
- Backup system for critical information
- Reminder system with consequences

---

**Built by ringmast4r**

**Version:** 2.0 (Server-Powered Edition)

---

## ⚡ Quick Links

- [GitHub Repository](https://github.com/Ringmast4r/DEAD-MANS-TRIGGER)
- [Report Issues](https://github.com/Ringmast4r/DEAD-MANS-TRIGGER/issues)
- [Email Setup Guide](SETUP-V2.md#step-2-configure-email)
- [Deployment Guide](SETUP-V2.md#advanced-running-server-247)

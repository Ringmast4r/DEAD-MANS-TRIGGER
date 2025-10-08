# ⚠️ Dead Man's Trigger v2.0 - Server-Powered

**A REAL dead man's switch that actually works when you're dead!**

---

## 🚨 Version Comparison

| Feature | v1.0 (Browser-Only) | v2.0 (Server-Powered) |
|---------|---------------------|------------------------|
| **Timer runs** | Only when browser open | 24/7 on server |
| **Email sending** | Manual "Send" click | Fully automatic |
| **Works when computer off** | ❌ No | ✅ Yes |
| **Actually works when dead** | ❌ No | ✅ Yes |
| **Setup required** | None | Email config + server |

**TL;DR:** v1.0 was just a prank/demo. v2.0 is a REAL dead man's switch.

---

## 🚀 Quick Start (v2.0)

### 1. Install
```bash
npm install
```

### 2. Configure Email
```bash
copy .env.example .env
# Edit .env with your email settings
```

### 3. Start Server
```bash
npm start
```

### 4. Open Browser
```
http://localhost:3000/index-v2.html
```

### 5. Setup & Test
- Set timer to 0.0167 hours (1 minute)
- Add your own email
- Write "Test message"
- Click "ARM TRIGGER"
- Wait 1 minute
- Check email!

📖 **Full setup guide:** [SETUP-V2.md](SETUP-V2.md)

---

## ✨ Features (v2.0)

- ✅ **Server-side timer** runs independently 24/7
- ✅ **Automatic email delivery** - no manual sending
- ✅ **File attachments** in automated emails
- ✅ **Works offline** - server doesn't need internet until trigger
- ✅ **Persistent storage** - survives server restarts
- ✅ **Check-in from anywhere** - just open the web page
- ✅ **Cloud deployable** - run on Heroku, Railway, etc.

---

## 🎯 How It Works

1. **Configure:** Set timer (e.g., 24 hours), recipients, message, files
2. **Arm:** Server starts countdown, stores everything in database
3. **Check-in:** Reset timer by clicking button (can do from any device)
4. **Trigger:** If you miss check-in, server auto-sends emails
5. **Delivery:** Recipients get email with your message and attachments

**Key difference from v1.0:** Everything runs on the server, not in your browser!

---

## 📦 Tech Stack

- **Backend:** Node.js + Express
- **Database:** SQLite (better-sqlite3)
- **Email:** Nodemailer (SMTP)
- **Scheduling:** node-cron
- **Frontend:** Vanilla HTML/CSS/JS

No build step, no frameworks, just simple reliable tech.

---

## 🔧 Deployment Options

### Local (Simplest)
```bash
npm start  # Keep terminal open
```

### Background (Better)
```bash
npm install -g pm2
pm2 start server.js --name deadman
pm2 save
```

### Cloud (Best for 24/7)
- **Heroku:** Free tier works great
- **Railway:** Easy deployment
- **Render:** Good free option
- **DigitalOcean:** VPS for full control

See [SETUP-V2.md](SETUP-V2.md) for deployment guides.

---

## 📁 File Structure

```
dead-mans-trigger/
├── server.js              # Main server (NEW in v2.0)
├── package.json           # Dependencies (NEW in v2.0)
├── .env                   # Email config (create from .env.example)
├── index-v2.html         # Web UI v2.0 (connects to server)
├── index.html            # Old v1.0 (browser-only)
├── deadman.db            # SQLite database (auto-created)
├── SETUP-V2.md           # Full setup guide
└── README-V2.md          # This file
```

---

## 🧪 Testing

### Quick Test (1 minute)
1. Duration: `0.0167` hours
2. Recipient: Your email
3. Message: "Test message"
4. ARM → Wait 1 min → Check email

### Full Test (1 hour)
1. Duration: `1` hour
2. Configure all features (email, file, URLs)
3. ARM → Check in at 30 min → Wait again
4. Test check-in functionality

---

## ⚠️ Important Notes

### What This IS:
- ✅ A real working dead man's switch
- ✅ Great for personal use, pranks, education
- ✅ Reliable for non-critical scenarios

### What This ISN'T:
- ❌ Enterprise-grade security
- ❌ Legally binding system
- ❌ Encrypted storage
- ❌ For life-critical situations

**For critical use:** Use professional services like:
- Dead Man's Switch (deadmansswitch.net)
- Google Inactive Account Manager
- Professional legal services

---

## 🔒 Security

- Email credentials stored in `.env` (gitignored)
- Database stored locally (`deadman.db`)
- Files stored as base64 (keep under 10MB)
- No encryption (don't store classified data)
- Anyone with server access can view data

**Recommendation:** For sensitive data, add encryption layer.

---

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| Cannot connect to server | Run `npm start` |
| Email not sending | Check `.env` config, use App Password for Gmail |
| Timer not running | Server must be running 24/7 |
| Database errors | Delete `deadman.db`, restart server |
| Want to change settings | Click "DISARM & EDIT" |

See [SETUP-V2.md](SETUP-V2.md) for detailed troubleshooting.

---

## 📝 API Endpoints

```
GET  /api/status      - Get current trigger status
POST /api/configure   - Arm new trigger
POST /api/checkin     - Reset timer (check-in)
POST /api/disarm      - Disarm trigger
```

---

## 🤝 Contributing

This is a simple educational project. Feel free to:
- Fork and improve
- Add encryption
- Add SMS support
- Add web dashboard
- Deploy to cloud

---

## 📜 License

MIT License - Use however you want!

---

## 🎉 Credits

**Built by:** ringmast4r
**Inspired by:** The need for a REAL dead man's switch that actually works
**Motivation:** Fixing the fundamental flaws of browser-only solutions

---

## 🔗 Links

- **Full Setup Guide:** [SETUP-V2.md](SETUP-V2.md)
- **Old v1.0 Guide:** [SETUP_GUIDE.txt](SETUP_GUIDE.txt)
- **Node.js Download:** https://nodejs.org/

---

**Version:** 2.0 (Server-Powered Edition)
**Last Updated:** 2025-10-08
**Status:** Production Ready ✅

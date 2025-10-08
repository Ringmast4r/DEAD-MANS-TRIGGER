const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const cron = require('node-cron');
const sgMail = require('@sendgrid/mail');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.static('.'));

// Initialize SQLite database
const db = new sqlite3.Database('deadman.db', (err) => {
  if (err) {
    console.error('Database connection error:', err);
  } else {
    console.log('✓ Database connected');
  }
});

// Create tables
db.run(`
  CREATE TABLE IF NOT EXISTS triggers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    duration_hours REAL NOT NULL,
    email_recipients TEXT,
    secret_message TEXT,
    uploaded_file_name TEXT,
    uploaded_file_data TEXT,
    trigger_urls TEXT,
    expiry_timestamp INTEGER NOT NULL,
    last_reset INTEGER NOT NULL,
    is_armed INTEGER DEFAULT 1,
    created_at INTEGER DEFAULT (strftime('%s', 'now') * 1000)
  )
`, (err) => {
  if (err) {
    console.error('Table creation error:', err);
  } else {
    console.log('✓ Tables ready');
  }
});

// SendGrid setup
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  console.log('✓ SendGrid initialized');
} else {
  console.log('⚠ SendGrid not configured - set SENDGRID_API_KEY in environment');
}

// Helper: Get active trigger
function getActiveTrigger(callback) {
  db.get('SELECT * FROM triggers WHERE is_armed = 1 ORDER BY id DESC LIMIT 1', callback);
}

// Helper: Send trigger emails
async function sendTriggerEmails(trigger) {
  if (!process.env.SENDGRID_API_KEY || !trigger.email_recipients) {
    return { success: false, reason: 'No SendGrid API key or recipients' };
  }

  const recipients = trigger.email_recipients.split(',').map(e => e.trim()).filter(e => e);
  const results = [];

  const emailBody = `
🚨 DEAD MAN'S TRIGGER HAS BEEN ACTIVATED 🚨

This is an automated message. The dead man's trigger has been activated because the required check-in did not occur.

═══════════════════════════════════════
SECRET MESSAGE:
═══════════════════════════════════════

${trigger.secret_message || 'No message provided'}

═══════════════════════════════════════
Timestamp: ${new Date().toLocaleString()}
═══════════════════════════════════════

${trigger.uploaded_file_name ? `\nAttached file: ${trigger.uploaded_file_name}\n` : ''}
${trigger.trigger_urls ? `\nAdditional URLs:\n${trigger.trigger_urls}\n` : ''}

This message was sent automatically by the Dead Man's Trigger system.
  `.trim();

  for (const recipient of recipients) {
    try {
      const msg = {
        to: recipient,
        from: {
          email: process.env.SENDER_EMAIL || 'noreply@yourdomain.com',
          name: process.env.SENDER_NAME || 'Dead Mans Trigger'
        },
        replyTo: process.env.REPLY_TO_EMAIL || process.env.SENDER_EMAIL,
        subject: '🚨 Dead Man\'s Trigger Activated',
        text: emailBody,
      };

      // If there's an uploaded file, attach it
      if (trigger.uploaded_file_name && trigger.uploaded_file_data) {
        const base64Data = trigger.uploaded_file_data.split(',')[1];
        msg.attachments = [{
          filename: trigger.uploaded_file_name,
          content: base64Data,
          type: 'application/octet-stream',
          disposition: 'attachment'
        }];
      }

      await sgMail.send(msg);
      results.push({ recipient, success: true });
      console.log(`✓ Email sent to ${recipient}`);
    } catch (error) {
      results.push({ recipient, success: false, error: error.message });
      console.error(`✗ Failed to send to ${recipient}:`, error.message);
    }
  }

  return { success: true, results };
}

// Helper: Trigger expiry actions
async function triggerExpiry(trigger) {
  console.log('🚨 TRIGGER EXPIRED - Executing actions...');
  console.log('Trigger data:', {
    id: trigger.id,
    recipients: trigger.email_recipients,
    message: trigger.secret_message?.substring(0, 50)
  });

  const actions = [];

  // Send emails
  if (trigger.email_recipients) {
    console.log('Attempting to send emails to:', trigger.email_recipients);
    const emailResult = await sendTriggerEmails(trigger);
    console.log('Email result:', emailResult);
    actions.push({ type: 'email', ...emailResult });
  } else {
    console.log('⚠ No email recipients configured');
  }

  // Log other actions (URLs, files - these will be handled by frontend)
  if (trigger.trigger_urls) {
    actions.push({ type: 'urls', data: trigger.trigger_urls });
  }
  if (trigger.uploaded_file_name) {
    actions.push({ type: 'file', name: trigger.uploaded_file_name });
  }
  if (trigger.secret_message) {
    actions.push({ type: 'message', preview: trigger.secret_message.substring(0, 50) });
  }

  // Disarm trigger
  db.run('UPDATE triggers SET is_armed = 0 WHERE id = ?', [trigger.id]);

  console.log('✓ Trigger actions completed');
  return actions;
}

// Cron job: Check for expired triggers every 10 seconds
cron.schedule('*/10 * * * * *', () => {
  getActiveTrigger((err, trigger) => {
    if (err) {
      console.error('Error checking trigger:', err);
      return;
    }
    if (trigger && Date.now() >= trigger.expiry_timestamp) {
      triggerExpiry(trigger).catch(err => console.error('Trigger error:', err));
    }
  });
});

console.log('✓ Cron job started - checking for expired triggers every 10 seconds');

// API Routes

// GET /api/status - Get current trigger status
app.get('/api/status', (req, res) => {
  getActiveTrigger((err, trigger) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    if (!trigger) {
      return res.json({ armed: false });
    }

    res.json({
      armed: true,
      duration_hours: trigger.duration_hours,
      email_recipients: trigger.email_recipients,
      secret_message: trigger.secret_message,
      uploaded_file_name: trigger.uploaded_file_name,
      uploaded_file_data: trigger.uploaded_file_data,
      trigger_urls: trigger.trigger_urls,
      expiry_timestamp: trigger.expiry_timestamp,
      last_reset: trigger.last_reset,
      time_remaining: Math.max(0, trigger.expiry_timestamp - Date.now())
    });
  });
});

// POST /api/configure - Create/update trigger
app.post('/api/configure', (req, res) => {
  const {
    duration_hours,
    email_recipients,
    secret_message,
    uploaded_file_name,
    uploaded_file_data,
    trigger_urls
  } = req.body;

  // Validation
  if (!duration_hours || duration_hours <= 0) {
    return res.status(400).json({ error: 'Invalid duration_hours' });
  }

  if (!email_recipients && !secret_message && !uploaded_file_name && !trigger_urls) {
    return res.status(400).json({ error: 'At least one action must be configured' });
  }

  const now = Date.now();
  const expiry_timestamp = now + (duration_hours * 60 * 60 * 1000);

  // Disarm any existing triggers
  db.run('UPDATE triggers SET is_armed = 0', (err) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }

    // Insert new trigger
    db.run(`
      INSERT INTO triggers (
        duration_hours, email_recipients, secret_message,
        uploaded_file_name, uploaded_file_data, trigger_urls,
        expiry_timestamp, last_reset, is_armed
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1)
    `, [
      duration_hours,
      email_recipients || null,
      secret_message || null,
      uploaded_file_name || null,
      uploaded_file_data || null,
      trigger_urls || null,
      expiry_timestamp,
      now
    ], function(err) {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }

      console.log(`✓ Trigger armed (ID: ${this.lastID}) - expires in ${duration_hours} hours`);

      res.json({
        success: true,
        trigger_id: this.lastID,
        expiry_timestamp,
        message: 'Trigger armed successfully'
      });
    });
  });
});

// POST /api/checkin - Reset the timer
app.post('/api/checkin', (req, res) => {
  getActiveTrigger((err, trigger) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }

    if (!trigger) {
      return res.status(404).json({ error: 'No active trigger found' });
    }

    const now = Date.now();
    const new_expiry = now + (trigger.duration_hours * 60 * 60 * 1000);

    db.run('UPDATE triggers SET expiry_timestamp = ?, last_reset = ? WHERE id = ?',
      [new_expiry, now, trigger.id],
      (err) => {
        if (err) {
          return res.status(500).json({ error: 'Database error' });
        }

        console.log(`✓ Check-in successful - timer reset for ${trigger.duration_hours} hours`);

        res.json({
          success: true,
          new_expiry_timestamp: new_expiry,
          next_checkin: new Date(new_expiry).toLocaleString()
        });
      }
    );
  });
});

// POST /api/disarm - Disarm the trigger
app.post('/api/disarm', (req, res) => {
  getActiveTrigger((err, trigger) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }

    if (!trigger) {
      return res.status(404).json({ error: 'No active trigger found' });
    }

    db.run('UPDATE triggers SET is_armed = 0 WHERE id = ?', [trigger.id], (err) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }

      console.log('✓ Trigger disarmed');

      res.json({
        success: true,
        message: 'Trigger disarmed successfully'
      });
    });
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════════════════════════════╗
║         DEAD MAN'S TRIGGER SERVER - RUNNING                  ║
╚═══════════════════════════════════════════════════════════════╝

Server: http://localhost:${PORT}
Database: deadman.db
Email: ${process.env.SENDGRID_API_KEY ? 'SendGrid ✓' : 'Not configured ⚠'}

Endpoints:
  GET  /api/status     - Get trigger status
  POST /api/configure  - Arm trigger
  POST /api/checkin    - Reset timer (check-in)
  POST /api/disarm     - Disarm trigger

Open http://localhost:${PORT} in your browser
  `);
});

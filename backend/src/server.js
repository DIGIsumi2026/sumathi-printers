require('dotenv').config();
const nodemailer = require('nodemailer');

const http = require('http');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');

const PORT = Number(process.env.PORT || 5000);
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';
const DATA_DIR = path.join(__dirname, '..', 'data');
const DATA_FILE = path.join(DATA_DIR, 'app.json');
const MAX_BODY_SIZE = 1024 * 1024;
const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = Number(process.env.SMTP_PORT || 465);
const SMTP_SECURE =
  String(process.env.SMTP_SECURE || 'true').toLowerCase() === 'true';

const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;
const MAIL_FROM =
  process.env.MAIL_FROM || `Sumathi Printers <${SMTP_USER}>`;
const MAIL_TO = process.env.MAIL_TO;

let mailTransporter;

function getMailTransporter() {
  if (
    !SMTP_HOST ||
    !SMTP_USER ||
    !SMTP_PASS ||
    !MAIL_FROM ||
    !MAIL_TO
  ) {
    throw new Error('SMTP email configuration is incomplete');
  }

  if (!mailTransporter) {
    mailTransporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_SECURE,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS
      }
    });
  }

  return mailTransporter;
}

function escapeHtml(value = '') {
  return String(value).replace(/[&<>"']/g, character => {
    const entities = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    };

    return entities[character];
  });
}

function cleanHeaderText(value = '') {
  return String(value).replace(/[\r\n]+/g, ' ').trim();
}

async function sendContactNotification(record) {
  const transporter = getMailTransporter();

  const fullName = record.fullName || record.name || 'Not provided';
  const email = record.email || 'Not provided';
  const phone = record.phone || 'Not provided';
  const service = record.service || 'Not specified';
  const message = record.message || 'No message provided';

  return transporter.sendMail({
    from: MAIL_FROM,
    to: MAIL_TO,

    // Clicking Reply will reply to the customer.
    replyTo: email,

    subject: `New Website Inquiry - ${cleanHeaderText(fullName)}`,

    text: [
      'A new inquiry was submitted through the Sumathi Printers website.',
      '',
      `Name: ${fullName}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      `Service: ${service}`,
      '',
      'Project details:',
      message
    ].join('\n'),

    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111827;">
        <h2 style="margin-bottom: 16px;">New Website Inquiry</h2>

        <p>
          A new inquiry was submitted through the
          <strong>Sumathi Printers website</strong>.
        </p>

        <table
          cellpadding="8"
          cellspacing="0"
          style="border-collapse: collapse; width: 100%; max-width: 650px;"
        >
          <tr>
            <td style="border: 1px solid #dddddd;">
              <strong>Name</strong>
            </td>
            <td style="border: 1px solid #dddddd;">
              ${escapeHtml(fullName)}
            </td>
          </tr>

          <tr>
            <td style="border: 1px solid #dddddd;">
              <strong>Email</strong>
            </td>
            <td style="border: 1px solid #dddddd;">
              ${escapeHtml(email)}
            </td>
          </tr>

          <tr>
            <td style="border: 1px solid #dddddd;">
              <strong>Phone</strong>
            </td>
            <td style="border: 1px solid #dddddd;">
              ${escapeHtml(phone)}
            </td>
          </tr>

          <tr>
            <td style="border: 1px solid #dddddd;">
              <strong>Service</strong>
            </td>
            <td style="border: 1px solid #dddddd;">
              ${escapeHtml(service)}
            </td>
          </tr>
        </table>

        <h3 style="margin-top: 24px;">Project Details</h3>

        <div
          style="
            padding: 16px;
            background: #f3f4f6;
            border-radius: 8px;
            white-space: pre-wrap;
          "
        >${escapeHtml(message)}</div>
      </div>
    `
  });
}

const initialStore = {
  contacts: [],
  quotes: [],
  newsletters: []
};

function ensureStore() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, JSON.stringify(initialStore, null, 2));
}

function readStore() {
  ensureStore();
  try {
    const parsed = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    return {
      contacts: Array.isArray(parsed.contacts) ? parsed.contacts : [],
      quotes: Array.isArray(parsed.quotes) ? parsed.quotes : [],
      newsletters: Array.isArray(parsed.newsletters) ? parsed.newsletters : []
    };
  } catch {
    fs.writeFileSync(DATA_FILE, JSON.stringify(initialStore, null, 2));
    return { ...initialStore };
  }
}

function writeStore(store) {
  ensureStore();
  fs.writeFileSync(DATA_FILE, JSON.stringify(store, null, 2));
}

function sendJson(res, status, payload) {
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': FRONTEND_URL,
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Vary': 'Origin'
  });
  res.end(JSON.stringify(payload));
}

function sendOptions(res) {
  res.writeHead(204, {
    'Access-Control-Allow-Origin': FRONTEND_URL,
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Vary': 'Origin'
  });
  res.end();
}

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let raw = '';
    req.on('data', chunk => {
      raw += chunk;
      if (Buffer.byteLength(raw) > MAX_BODY_SIZE) {
        reject(new Error('Request body is too large'));
        req.destroy();
      }
    });
    req.on('end', () => {
      if (!raw.trim()) return resolve({});
      try {
        resolve(JSON.parse(raw));
      } catch {
        reject(new Error('Invalid JSON body'));
      }
    });
    req.on('error', reject);
  });
}

function isEmail(value) {
  return typeof value === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function text(value, fallback = '') {
  return typeof value === 'string' ? value.trim() : fallback;
}

function makeRecord(body, requiredFields) {
  const errors = [];
  requiredFields.forEach(field => {
    if (!text(body[field])) errors.push(`${field} is required`);
  });
  if (body.email !== undefined && !isEmail(body.email)) errors.push('A valid email is required');
  if (errors.length) return { errors };

  const record = {
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 8),
    createdAt: new Date().toISOString()
  };

  Object.keys(body).forEach(key => {
    record[key] = text(body[key]);
  });

  return { record };
}

const server = http.createServer(async (req, res) => {
  const requestUrl = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`);
  const route = requestUrl.pathname;

  if (req.method === 'OPTIONS') return sendOptions(res);

  try {
    if (req.method === 'GET' && route === '/api/health') {
      return sendJson(res, 200, { ok: true, service: 'sumathi-printers-backend', time: new Date().toISOString() });
    }

    if (req.method === 'POST' && route === '/api/newsletter') {
      const body = await readJsonBody(req);
      if (!isEmail(body.email)) return sendJson(res, 400, { ok: false, message: 'A valid email is required' });

      const store = readStore();
      const email = body.email.trim().toLowerCase();
      const exists = store.newsletters.some(item => item.email === email);
      if (!exists) {
        store.newsletters.push({ id: Date.now().toString(36), email, createdAt: new Date().toISOString() });
        writeStore(store);
      }
      return sendJson(res, 201, { ok: true, message: 'Newsletter subscription saved' });
    }

    if (req.method === 'POST' && route === '/api/contact') {
  const body = await readJsonBody(req);

  // The frontend currently sends "fullName".
  const normalizedBody = {
    ...body,
    fullName: text(body.fullName || body.name)
  };

  const result = makeRecord(normalizedBody, [
    'fullName',
    'email',
    'message'
  ]);

  if (result.errors) {
    return sendJson(res, 400, {
      ok: false,
      errors: result.errors
    });
  }

  const store = readStore();

  try {
    const mailResult = await sendContactNotification(result.record);

    store.contacts.push({
      ...result.record,
      emailStatus: 'sent',
      emailMessageId: mailResult.messageId
    });

    writeStore(store);

    return sendJson(res, 201, {
      ok: true,
      message: 'Your inquiry has been sent successfully'
    });
  } catch (error) {
    console.error('Contact email sending failed:', error);

    store.contacts.push({
      ...result.record,
      emailStatus: 'failed'
    });

    writeStore(store);

    return sendJson(res, 502, {
      ok: false,
      message:
        'Your inquiry could not be emailed. Please try again or contact us through WhatsApp.'
    });
  }
}

    if (req.method === 'POST' && route === '/api/quote') {
      const body = await readJsonBody(req);
      const result = makeRecord(body, ['name', 'email', 'product']);
      if (result.errors) return sendJson(res, 400, { ok: false, errors: result.errors });

      const store = readStore();
      store.quotes.push(result.record);
      writeStore(store);
      return sendJson(res, 201, { ok: true, message: 'Quote request saved' });
    }

    return sendJson(res, 404, { ok: false, message: 'Route not found' });
  } catch (error) {
    return sendJson(res, 500, { ok: false, message: error.message || 'Server error' });
  }
});

ensureStore();

if (SMTP_HOST && SMTP_USER && SMTP_PASS && MAIL_TO) {
  getMailTransporter()
    .verify()
    .then(() => {
      console.log('SMTP connection verified successfully');
    })
    .catch(error => {
      console.error('SMTP verification failed:', error.message);
    });
}

server.listen(PORT, () => {
  console.log(`Sumathi Printers backend running on http://localhost:${PORT}`);
});
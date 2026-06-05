const http = require('http');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');

const PORT = Number(process.env.PORT || 5000);
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';
const DATA_DIR = path.join(__dirname, '..', 'data');
const DATA_FILE = path.join(DATA_DIR, 'app.json');
const MAX_BODY_SIZE = 1024 * 1024;

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

    if (req.method === 'GET' && route === '/api/submissions') {
      return sendJson(res, 200, readStore());
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
      const result = makeRecord(body, ['name', 'email', 'message']);
      if (result.errors) return sendJson(res, 400, { ok: false, errors: result.errors });

      const store = readStore();
      store.contacts.push(result.record);
      writeStore(store);
      return sendJson(res, 201, { ok: true, message: 'Contact request saved' });
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
server.listen(PORT, () => {
  console.log(`Sumathi Printers backend running on http://localhost:${PORT}`);
});

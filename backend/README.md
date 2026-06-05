# Sumathi Printers Backend

This backend uses only built-in Node.js modules. No Prisma, no Express, and no npm install is required for the backend.

## Run

```bash
node src/server.js
```

or:

```bash
npm run dev
```

Data is saved to:

```txt
data/app.json
```

API:

- `GET /api/health`
- `POST /api/newsletter`
- `POST /api/contact`
- `POST /api/quote`
- `GET /api/submissions`

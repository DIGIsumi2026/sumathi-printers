# Sumathi Printers Backend

This backend uses Node.js's built-in HTTP server, plus `dotenv` for environment configuration and `nodemailer` for contact emails. No Prisma or Express is required.

## Install

Run from the `backend` directory before starting the server:

```bash
npm ci
```

This installs the versions recorded in `package-lock.json`. Re-run it after cloning the project or if startup reports `Cannot find module 'dotenv'` or `Cannot find module 'nodemailer'`.

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

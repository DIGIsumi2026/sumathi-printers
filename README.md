# Sumathi Printers React + TypeScript Website

This version is componentized and ready for development.

## What changed

- `App.tsx` is now clean and only coordinates app-level state, forms, layout and pages.
- The home page is split into page sections under `src/pages/Home/sections`.
- Shared UI is split into `src/components`.
- Company content is stored in JSON: `src/data/company.json`.
- Image paths are stored in JSON: `src/data/images.json`.
- All styling remains in one file: `src/App.css`.
- Animations use `framer-motion`.
- Icons use `lucide-react`.
- Backend has no dependencies and does not use Prisma.

## Frontend structure

```txt
frontend/src/
├─ App.tsx
├─ App.css
├─ main.tsx
├─ assets/
├─ components/
│  ├─ cards/
│  │  └─ ImageHoverCard.tsx
│  ├─ common/
│  │  ├─ Badge.tsx
│  │  ├─ Buttons.tsx
│  │  ├─ Reveal.tsx
│  │  ├─ RevealTitle.tsx
│  │  └─ SectionHeader.tsx
│  ├─ forms/
│  │  └─ StatusMessage.tsx
│  └─ layout/
│     ├─ FloatingDecor.tsx
│     ├─ FloatingTools.tsx
│     ├─ Footer.tsx
│     ├─ NavigationBar.tsx
│     └─ Preloader.tsx
├─ data/
│  ├─ company.json
│  └─ images.json
├─ lib/
│  └─ api.ts
├─ pages/
│  └─ Home/
│     ├─ HomePage.tsx
│     └─ sections/
│        ├─ AboutSection.tsx
│        ├─ BlogSection.tsx
│        ├─ CategorySection.tsx
│        ├─ ClientsSection.tsx
│        ├─ ContactSection.tsx
│        ├─ FeatureSection.tsx
│        ├─ FinishingServicesSection.tsx
│        ├─ HeroSection.tsx
│        ├─ MissionVisionSection.tsx
│        ├─ PartnersSection.tsx
│        ├─ ProcessSection.tsx
│        ├─ QuoteSection.tsx
│        ├─ ServicesSection.tsx
│        ├─ TestimonialSection.tsx
│        └─ WhyStandoutSection.tsx
└─ types/
   └─ site.ts
```

## Run backend

The backend uses only built-in Node.js modules.

```powershell
cd backend
node src/server.js
```

Backend URL:

```txt
http://localhost:5000
```

Health check:

```txt
http://localhost:5000/api/health
```

## Run frontend with pnpm

Use this because your local npm installation is currently crashing.

```powershell
cd frontend
corepack enable
corepack prepare pnpm@latest --activate
pnpm install
pnpm dev
```

Frontend URL:

```txt
http://localhost:5173
```

## Run frontend with npm, only if npm is fixed

```powershell
cd frontend
npm install
npm run dev
```

## Edit content

Company/profile content:

```txt
frontend/src/data/company.json
```

Image mapping:

```txt
frontend/src/data/images.json
```

Global CSS:

```txt
frontend/src/App.css
```

## Backend saved data

Form submissions are saved here:

```txt
backend/data/app.json
```

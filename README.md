## OCR Meter Reading Platform

This monorepo contains the mobile app, backend API, and supervisor dashboard for the OCR-based meter reading system.

### Structure
- `mobile/` – Flutter reader app (offline-first with on-device OCR).
- `backend/` – Fastify API with Firebase integration.
- `dashboard/` – React + Vite supervisor dashboard.
- `docs/` – Architecture, database, and API documentation.

### Getting Started

#### Prerequisites
- Flutter 3.16+
- Node.js 18+
- PNPM or NPM
- Firebase project with Auth, Firestore, and Storage enabled

#### Mobile
```bash
cd mobile
flutter pub get
flutter run
```

#### Backend
```bash
cd backend
npm install
cp env.example .env.local
npm run dev
```

#### Dashboard
```bash
cd dashboard
npm install
cp env.example .env.local
npm run dev
```

Refer to `docs/` for detailed architecture diagrams, data flow, and API contracts.


# Trainee Incredibles 25T3 — Foodie / Restaurant Rater


Tech stack
- Frontend: React 18, TypeScript, Vite
- Backend: Node.js, Express, TypeScript, Mongoose (MongoDB)
- Dev tools: ts-node-dev (backend), Vite dev server (frontend)

Project structure

trainee-incredibles-25t3/
├── backend/                # Express + TypeScript backend
│   ├── src/
│   │   ├── controllers/    # request handlers
│   │   ├── models/         # Mongoose models
│   │   ├── routes/         # API routes
│   │   └── server.ts       # app entry
│   ├── package.json
│   └── .env.example
├── frontend/               # Vite + React + TypeScript scaffold
│   ├── src/
│   │   ├── Components/
│   │   ├── pages/
│   │   └── main.tsx
│   ├── package.json
│   └── .env.example
└── README.md               # you are here

Prerequisites
- Node.js v18+ and npm
- Git
- MongoDB Atlas account (recommended) or a local MongoDB server

Quick start (developer)

1) Backend — create local env and run

```bash
cd backend
cp .env.example .env
# Edit backend/.env and set MONGO_URI (do NOT commit)
npm install
npm run seed   # optional: populate demo data
npm run dev    # starts backend (default PORT=4000)
```

2) Frontend — configure and run

```bash
cd frontend
cp .env.example .env
# set VITE_API_URL in frontend/.env to http://localhost:4000/api
npm install
npm run dev
```

The frontend dev server URL is printed by Vite (typically http://localhost:5173). Open it and exercise the demo flows.

Database — MongoDB Atlas (recommended)

Instructor options

Trainee steps (concise)
1. Sign in to MongoDB Atlas and create a free project/cluster (M0).
2. Security → Database Access → Add New Database User (create username/password).
3. Network Access → Add IP Address → Add Current IP Address (or 0.0.0.0/0 for short demos).
4. Connect → Connect your application → Node.js → copy SRV string and replace <password> and DB name.
5. Locally in repo backend: copy `.env.example` → `.env`, paste SRV into `MONGO_URI`, run seed + dev.

Example `backend/.env` (DO NOT commit):

```env
MONGO_URI="mongodb+srv://instructor_user:REPLACE_PASSWORD@cluster0.xxxxx.mongodb.net/incredibles_yourname?retryWrites=true&w=majority"
PORT=4000
NODE_ENV=development
```

Development scripts (summary)

Backend (inside `backend/`)
- npm run dev  — start dev server with hot reload
- npm run seed — run seed script to populate demo data
- npm run build — compile TypeScript to `dist/`

Frontend (inside `frontend/`)
- npm run dev — start Vite dev server
- npm run build — build for production


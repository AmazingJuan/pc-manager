# Computer Manager

**Computer Manager** is a web dashboard for IT equipment management. It allows administrators to manage computers, hardware components, and users, while providing inventory reports, **computer status change history (from the API)**, and data visualizations to support informed decision-making.

## Repository layout

- **`backend/`** — REST API (NestJS, TypeORM, MySQL)
- **`frontend/`** — single-page app (Vue 3, Vite, Pinia, Vue Router, Tailwind CSS)

There is no `package.json` at the repository root: install and run each app from its own directory.

## Tech stack

| Area        | Stack |
|------------|--------|
| **Backend**  | Node.js, **NestJS**, **TypeORM**, **MySQL**, JWT (auth), `class-validator` |
| **Frontend** | **Vue 3**, **TypeScript**, **Vite**, **Pinia**, **Vue Router**, **Tailwind CSS**, Axios, Chart.js |

## Prerequisites

- **Node.js**: `^20.19.0` or `>=22.12.0`
- **MySQL**: running instance the API can reach (credentials in backend `.env`)

## Configuration

1. **Backend** — copy [`backend/.env.example`](backend/.env.example) to `backend/.env` and set at least:

   - `DB_HOST`, `DB_PORT`, `DB_USERNAME`, `DB_PASSWORD`, `DB_DATABASE`
   - `CORS_ORIGIN` — origin allowed for browser requests (default `http://localhost:5173` for local Vite)

2. **Frontend** — copy [`frontend/.env.example`](frontend/.env.example) to `frontend/.env`:

   - `VITE_API_URL` — base URL for the API (default in code: `http://localhost:3000/api`)

The Nest app serves routes under the global prefix **`/api`** (for example `GET /api/computers`). The Vite dev server can proxy `/api` to the backend; the frontend Axios client uses `VITE_API_URL` as `baseURL`.

## Local development

Start MySQL, then run the API and the SPA in two terminals.

```sh
git clone https://github.com/EAFIT-Works/pc-manager
cd pc-manager

# Backend (http://localhost:3000 — JSON under /api)
cd backend
cp .env.example .env   # edit database and CORS if needed
npm install
npm run start:dev

# Frontend (http://localhost:5173) — new terminal
cd ../frontend
cp .env.example .env   # optional; matches default API URL
npm install
npm run dev
```

Open **http://localhost:5173** in your browser.

### Useful commands

**Frontend** (`frontend/`):

```sh
npm run dev          # Vite dev server
npm run build        # Production build (runs type-check first)
npm run type-check   # vue-tsc
npm run lint         # oxlint + ESLint
npm run format       # Prettier (src/)
```

**Backend** (`backend/`):

```sh
npm run start:dev    # Nest watch mode
npm run build        # Compile to dist/
npm run lint         # ESLint
npm run test         # Jest unit tests
```

Dockerfiles exist under `backend/` and `frontend/` for container builds; adjust env and networking for your deployment target.

## Authors

- **Juan Manuel Zapata**
- **Andru Quiroz**
- **Juan Pablo Avendaño**
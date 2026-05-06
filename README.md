# Computer Manager

**Computer Manager** is a web dashboard for IT equipment management. It allows administrators to manage computers, hardware components, and users, while providing inventory reports, **computer status change history (from the API)**, and data visualizations to support informed decision-making.

This repository also includes a **Nuxt 4** mini-app under `nuxt/`: a compact front end used for course-related layouts and routing (SSR / SSG / CSR patterns), separate from the main Vite SPA.

## Repository layout

- **`backend/`** — REST API (NestJS, TypeORM, MySQL)
- **`frontend/`** — single-page app (Vue 3, Vite, Pinia, Vue Router, Tailwind CSS)
- **`nuxt/`** — Nuxt 4 app (`app/` directory): layouts, pages (e.g. home, blog stub), shared layout components (`Header`, `Footer`), and UI helpers (`SidebarElement`)

There is no `package.json` at the repository root: install and run each app from its own directory.

## Tech stack

| Area          | Stack |
|---------------|--------|
| **Backend**   | Node.js, **NestJS**, **TypeORM**, **MySQL**, JWT (auth), `class-validator` |
| **Frontend**  | **Vue 3**, **TypeScript**, **Vite**, **Pinia**, **Vue Router**, **Tailwind CSS**, Axios, Chart.js |
| **Nuxt app**  | **Nuxt 4**, **Vue 3**, **Vue Router**, **@nuxtjs/tailwindcss** (Tailwind 3.x via the module), file-based routing under `nuxt/app/pages/` |

## Prerequisites

- **Node.js**: `^20.19.0` or `>=22.12.0`
- **MySQL**: running instance the API can reach (credentials in backend `.env`)

## Configuration

1. **Backend** — copy [`backend/.env.example`](backend/.env.example) to `backend/.env` and set at least:

   - `DB_HOST`, `DB_PORT`, `DB_USERNAME`, `DB_PASSWORD`, `DB_DATABASE`
   - `CORS_ORIGIN` — origin allowed for browser requests (default `http://localhost:5173` for local Vite)

2. **Frontend** — copy [`frontend/.env.example`](frontend/.env.example) to `frontend/.env`:

   - `VITE_API_URL` — base URL for the API (default in code: `http://localhost:3000/api`)

3. **Nuxt** — optional `.env` only if you add runtime config later; out of the box the mini-app does not require the Nest API to render static pages.

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

### Nuxt mini-app (`nuxt/`)

From the repo root:

```sh
cd nuxt
npm install
npm run dev
```

By default Nuxt listens on **http://localhost:3000**. If the Nest API is already using port `3000`, start Nuxt on another port, for example:

```sh
npx nuxt dev --port 3001
```

Useful scripts:

```sh
npm run dev        # development server
npm run build      # production build (Nitro output in .output/)
npm run generate   # static generation when prerender rules apply
npm run preview    # preview production build locally
```

Source layout highlights:

- `nuxt/app/pages/` — routes (`index.vue`, `blog/index.vue`, …)
- `nuxt/app/layouts/default.vue` — wraps pages with header and footer
- `nuxt/app/components/layout/` — `Header.vue`, `Footer.vue`
- `nuxt/app/components/ui/SidebarElement.vue` — nav link item with active-state styling (used in the header)

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

**Nuxt** (`nuxt/`):

```sh
npm run dev          # Nuxt dev server
npm run build        # Production server bundle
npm run generate     # Static output where configured
npm run preview      # Local preview of build
```

Dockerfiles exist under `backend/` and `frontend/` for container builds; adjust env and networking for your deployment target.

## Authors

- **Juan Manuel Zapata**
- **Andru Quiroz**
- **Juan Pablo Avendaño**

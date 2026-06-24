# NursePath 🩺

An interactive nursing learning platform built around the **Philippine BSN curriculum** (CHED CMO No. 14, s. 2009) — 22 fully-authored courses, 5-style step pathways (video → reading → practice → simulation → quiz), gamification (XP / levels / badges / streaks), clinical simulations, and skill tracking.

![NursePath](https://img.shields.io/badge/Philippine%20BSN-CHED%20CMO%2014-blue) ![Status](https://img.shields.io/badge/status-WIP-orange)

---

## ✨ Features

### Learning flow (3 levels)
- **L1 — Course**: catalog of 22 curriculum courses grouped by category (MC / NCM / Electives)
- **L2 — Unit**: each course breaks down into thematic units
- **L3 — Pathway**: each unit contains step-by-step pathways with the canonical flow:
  🎥 **Video** → 📘 **Reading** → 🧪 **Practice** → 🧠 **Simulation** → ❓ **Quiz**

### Clinical simulations (interactive)
- **Decision-tree simulations**: branching patient scenarios with vitals snapshots, feedback, and debriefs (e.g. ADPIE, BLS collapse, preeclampsia)
- **Sequence simulations**: drag-and-drop "put these steps in order" procedures (e.g. PPE don/doff, hand hygiene)

### Gamification
- **XP** awarded per step type (video 10, reading 5, practice 20, simulation 20, quiz 50)
- **Levels** on a tuned curve `25 × (n-1) × n` so the first few courses feel rewarding
- **12 badges** spanning pathway / unit / course / skill / special milestones
- **Streaks** tracked per active day
- **Leaderboard** ranking students by total XP

### Other
- **Real accounts** (bcrypt + JWT, 7-day tokens) — not localStorage-only auth
- **Progress tracking** with checkboxes, per-course / per-unit roll-ups
- **Clinical log** for skill-tracking notes
- **Skill mastery** rollups per skill tag (e.g. `bp-measurement`, `infection-control`)
- Medical-themed UI (Primary Blue `#2A7FFF`, Teal `#00BFA6`, Alert Red `#E53935`)

---

## 🏗 Architecture

TypeScript monorepo using **npm workspaces**:

```
nursepath/
├── shared/          # @nursepath/shared — domain types (single source of truth)
├── backend/         # Node + Express + Prisma + SQLite
└── frontend/        # React + Vite + Tailwind
```

**Key design decision:** course content lives in TypeScript modules (easy to author & edit, no seeding), served read-only via the API. Only **user state** (accounts, progress, badges, streaks, clinical log) is persisted in SQLite via Prisma.

### Stack
- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS, react-router-dom, framer-motion, react-markdown, lucide-react
- **Backend**: Node.js, Express, Prisma ORM, SQLite, JWT (jsonwebtoken), bcryptjs, Zod
- **Testing**: Vitest (backend: 26 tests, frontend: jsdom-ready)

---

## 🚀 Getting started

### Prerequisites
- Node.js 18+ and npm

### Install & set up
```bash
npm install              # installs all workspace deps
npm run setup            # install + prisma generate + migrate + seed
```

This creates a demo user:
- **Email**: `demo@nursepath.app`
- **Password**: `nurse123`

### Run the dev servers
```bash
npm run dev
```

This boots (via `concurrently`):
- 🟡 **Backend API** on `http://localhost:4000`
- 🔵 **Frontend** on `http://localhost:5173` (proxies `/api` → backend)

Open **http://localhost:5173** and sign in with the demo account (or register a new one).

---

## 📚 The 22 courses

### Major & Foundational Medical Science (MC)
| Code | Title |
|------|-------|
| MC 1 | Bio-Anatomy (homeostasis, cardiovascular, respiratory, nervous) |
| MC 2 | Biochemistry (biomolecules, metabolism, enzymes) |
| MC 3 | Microbiology & Parasitology (microbial world, immunity) |

### Core Nursing Care Management (NCM)
| Code | Title | Flagship? |
|------|-------|:---------:|
| NCM 100 | Theoretical Foundations of Nursing | |
| NCM 101 | Health Assessment ⭐ | deep |
| NCM 102 | Health Education | |
| NCM 103 | Fundamental Nursing Arts ⭐⭐⭐ | **deepest** |
| NCM 104 | Community Health Development I | |
| NCM 105 | Nutrition and Diet Therapy | |
| NCM 106 | Pharmacology ⭐ | deep |
| NCM 107 | Maternal & Child Care I | |
| NCM 109 | Maternal & Child Care II | |
| NCM 112 | Care of Clients with Problems in Oxygenation, Fluid & Electrolytes ⭐ | deep |
| NCM 113 | Community Health II | |
| NCM 114 | Gerontological Nursing | |
| NCM 116 | Medical-Surgical Nursing II | |
| NCM 117 | Psychiatric Nursing ⭐ | deep |

### Professional Electives (ELECTIVE)
| Code | Title |
|------|-------|
| NCM 108 | Ethics |
| NCM 110 | Nursing Informatics |
| NCM 111 | Research 1 |
| NCM 115 | Research 2 |
| NCM 118 | Leadership & Management |

---

## 🚀 Deployment (free tier)

NursePath deploys as two services: a **React SPA on Vercel** and an **Express API on Render**, backed by **PostgreSQL on Neon**. All three have free tiers — total cost **$0/month**.

| Component | Host | Purpose | Notes |
|-----------|------|---------|-------|
| Frontend | [Vercel](https://vercel.com) | React SPA | Free Hobby plan |
| Backend | [Render](https://render.com) | Express API | Free plan (sleeps after 15 min idle) |
| Database | [Neon](https://neon.tech) | PostgreSQL | Free tier (0.5 GB) |

### Step 1 — Create a Neon database
1. Sign up at [neon.tech](https://neon.tech) and create a project.
2. Copy the connection string: `postgresql://user:pass@host/db?sslmode=require`

### Step 2 — Deploy the backend to Render
1. Push this repo to GitHub.
2. On Render, create a new **Blueprint** and select your repo (Render reads `render.yaml`).
3. Set these environment variables in the Render dashboard:
   - `DATABASE_URL` — your Neon connection string
   - `JWT_SECRET` — generate one with `openssl rand -base64 32`
   - `FRONTEND_ORIGIN` — your Vercel URL (set after step 3)
4. Render builds with `npm run build:render` (swaps to the Postgres schema, runs migrations, compiles TS) and starts with `npm start`.
5. Verify: visit `https://your-backend.onrender.com/api/health` → should return `{ ok: true }`.

### Step 3 — Deploy the frontend to Vercel
1. On Vercel, import the same GitHub repo.
2. Vercel reads `vercel.json` automatically (builds `frontend/`, outputs `frontend/dist`).
3. Set this environment variable in the Vercel dashboard:
   - `VITE_API_URL` — `https://your-backend.onrender.com/api`
4. After the first deploy, copy your Vercel URL and set `FRONTEND_ORIGIN` on Render (step 2.3) to it, then redeploy the backend.

### Seed production
Once the backend is live, run the seed against the Neon DB to create demo data:
```bash
# Locally, with DATABASE_URL pointing to Neon:
DATABASE_URL="postgresql://...?sslmode=require" npm run seed --workspace backend
```

Demo account: `demo@nursepath.app` / `nurse123`

---

## 🧪 Testing

```bash
npm test --workspace @nursepath/backend    # 26 tests (auth, progress, badges, content)
npm test --workspace @nursepath/frontend   # jsdom-ready
```

Backend test coverage:
- **Auth**: register / duplicate rejection / login / wrong password / token round-trip
- **Progress**: XP awarded, idempotency (no double-award), course %, level-up
- **Badges**: First Steps badge, level-5 badge, no re-award
- **Content**: 22 courses, unique codes & step IDs, every pathway has a quiz, valid correctIndex, simulation node integrity, badge rules reference real content

---

## 🛠 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start both backend & frontend in dev mode |
| `npm run build` | Build all workspaces |
| `npm test` | Run all workspace tests |
| `npm run seed` | Re-seed the database (demo + leaderboard users) |
| `npm run setup` | Install + prisma generate + migrate + seed |
| `npm run prisma:generate` | Regenerate Prisma client |
| `npm run prisma:migrate` | Apply schema migrations |

---

## 📁 Project structure

```
shared/
└── types.ts                # all domain types (Step, Pathway, Course, Gamification, …)

backend/
├── prisma/schema.prisma    # User, StepProgress, BadgeAward, StreakDay, ClinicalLogEntry
└── src/
    ├── content/            # 22 course modules + badges + builder DSL
    ├── auth.ts             # JWT auth router
    ├── gamification.ts     # XP, levels, badges, streaks
    ├── routes.ts           # courses, progress, gamification, clinical log
    └── test/               # vitest suites

frontend/
└── src/
    ├── lib/                # api.ts (typed fetch client), auth.tsx (context)
    ├── components/         # Layout, NavLink, ui (Button/Card/ProgressBar/…)
    └── pages/              # Login, Register, Dashboard, Catalog, Course,
                            # Unit, Pathway, Profile, Leaderboard

# Deployment
├── render.yaml             # Render Blueprint (backend on Render + Postgres)
├── vercel.json             # Vercel config (frontend SPA)
├── backend/prisma/schema.prisma          # SQLite (local dev + tests)
└── backend/prisma/schema.postgres.prisma # PostgreSQL (production)
```

---

## 🎨 Design tokens

| Token | Value | Usage |
|-------|-------|-------|
| Primary Blue | `#2A7FFF` | main CTAs, links, active nav |
| Secondary Teal | `#00BFA6` | success states, completed steps |
| Alert Red | `#E53935` | errors, destructive actions |
| Font | Inter | body & UI |

---

## 📝 License

Educational project. Based on the Philippine Commission on Higher Education (CHED) Memorandum Order No. 14, series 2009.

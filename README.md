# Code Review Agent with Persistent Team Memory

AI-powered code review system with a React frontend and Node.js/Express backend.

## Project phases

- Phase -1 — Project definition and architecture
- Phase 0 — Repository and environment setup
- Phase 1 — Full-stack foundation
- Phase 2 — Code submission and review API
- Phase 3 — Review dashboard and UX
- Phase 4 — Persistent Hindsight team memory
- Phase 5 — AI-powered contextual review
- Phase 6 — Review history, standards and analytics
- Phase 7 — Security, validation and testing
- Phase 8 — Production readiness and deployment

## Stack

Frontend: React, Vite, Monaco Editor, Axios  
Backend: Node.js, Express, Zod, Helmet, CORS, Morgan  
Persistence: local JSON store (no native database dependency)  
Memory: Hindsight-compatible service adapter  
AI: OpenAI-compatible LLM adapter

## Quick start

Requirements: Node.js 20+

```bash
npm install
npm run install:all
npm run dev
```

Frontend: http://localhost:5173  
Backend: http://localhost:5000

Copy `backend/.env.example` to `backend/.env` and configure API keys when you want live AI/Hindsight services. The project runs in demo mode without them.

## Architecture

```text
React/Vite
   |
   | REST
   v
Express API
   |
   +-- Review Service ---- LLM Service
   |                         |
   |                         +-- OpenAI-compatible API
   |
   +-- Hindsight Service
   |       |
   |       +-- team standards
   |       +-- previous reviews
   |       +-- architectural decisions
   |
   +-- SQLite
           |
           +-- reviews
           +-- review findings
           +-- standards
```

See `docs/PHASES.md` for phase-by-phase completion criteria.

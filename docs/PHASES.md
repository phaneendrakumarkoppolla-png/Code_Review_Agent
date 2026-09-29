# Phase Plan: -1 to 8

## Phase -1 — Problem Definition
Goal: define the Code Review Agent, users, workflow, architecture, and success criteria.

Deliverables:
- problem statement
- functional requirements
- architecture
- API contract
- security principles

## Phase 0 — Setup
Goal: establish a reproducible monorepo.

Deliverables:
- frontend/backend directories
- environment templates
- scripts
- README
- Git configuration

## Phase 1 — Full-stack Foundation
Goal: connect React to Express.

Deliverables:
- Vite React app
- Express server
- health endpoint
- API client
- base UI

## Phase 2 — Review Engine
Goal: submit code and return a structured review.

Deliverables:
- review endpoint
- language validation
- review service
- structured findings
- SQLite persistence

## Phase 3 — UI Workflow
Goal: make the application usable.

Deliverables:
- code editor
- language selection
- review action
- result cards
- severity display
- history page

## Phase 4 — Persistent Team Memory
Goal: retain organizational context.

Memory categories:
- team standards
- previous review decisions
- common mistakes
- architecture decisions

Deliverables:
- Hindsight adapter
- memory retrieval
- memory storage
- graceful demo fallback

## Phase 5 — Contextual AI Review
Goal: combine code, team memory and LLM reasoning.

Context:
1. submitted code
2. language
3. team standards
4. relevant historical reviews
5. architecture decisions

Output:
- summary
- findings
- suggestions
- memory used

## Phase 6 — History and Analytics
Goal: make reviews traceable.

Deliverables:
- review history
- review detail
- statistics
- standards endpoint
- memory endpoint

## Phase 7 — Security and Testing
Goal: harden the application.

Deliverables:
- Helmet
- CORS
- request validation
- payload limits
- centralized errors
- unit tests
- API tests

## Phase 8 — Production Readiness
Goal: make deployment straightforward.

Deliverables:
- production build
- health/readiness endpoints
- Docker configuration
- deployment documentation
- environment checklist
- operational notes

## Definition of done

A user can open the frontend, submit code, receive a structured review, see historical/team context, and inspect previous reviews. Live external AI/Hindsight services are optional through adapters; the application remains runnable in demo mode.

# Architecture

## Layers

### Frontend
React components communicate only with `services/api.js`.

### Backend
Routes -> controllers -> services -> persistence/integrations.

### Integrations
`llmService.js` and `hindsightService.js` isolate external providers.

### Persistence
SQLite stores review metadata, findings, and team standards.

## Design principles

- Provider abstraction
- Fail gracefully in demo mode
- Validate all external input
- Never expose secret keys to the frontend
- Keep AI output structured
- Store review history for traceability

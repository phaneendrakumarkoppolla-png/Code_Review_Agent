# Deployment

## Local

```bash
npm install
npm run install:all
npm run dev
```

## Docker

```bash
docker compose up --build
```

## Live AI/Hindsight

Configure these backend variables:

- `LLM_BASE_URL`
- `LLM_API_KEY`
- `LLM_MODEL`
- `HINDSIGHT_BASE_URL`
- `HINDSIGHT_API_KEY`
- `HINDSIGHT_BANK_ID`
- `ENABLE_LIVE_SERVICES=true`

The exact Hindsight endpoint shape can vary by deployment. The adapter is intentionally isolated in `backend/src/services/hindsightService.js` so the provider contract can be updated without changing the review engine.

## Production checklist

- Use HTTPS.
- Use a production database strategy.
- Store secrets in a secret manager.
- Restrict CORS to the deployed frontend origin.
- Add authentication and authorization before exposing team memory.
- Add rate limiting at the edge/API gateway.
- Configure structured logs and monitoring.
- Review LLM data retention/privacy settings.

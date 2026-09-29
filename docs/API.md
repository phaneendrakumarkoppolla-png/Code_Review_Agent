# API

Base URL: `http://localhost:5000/api`

## GET /health

Returns service health.

## POST /reviews

Request:

```json
{
  "language": "javascript",
  "code": "const x = 1;"
}
```

Returns a structured review.

## GET /reviews

Returns review history.

## GET /reviews/:id

Returns one review.

## GET /reviews/standards

Returns current team standards.

## Security

- JSON body limit: 200 KB
- Helmet enabled
- CORS restricted to configured frontend
- Zod request validation
- API keys stay on backend

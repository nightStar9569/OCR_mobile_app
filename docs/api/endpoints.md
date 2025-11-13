## API Endpoints Overview

All endpoints require a valid Firebase ID token supplied via `Authorization: Bearer <token>` header. Responses follow JSON format.

### Health
- `GET /health` → `{ status: "ok", timestamp }`

### Readings
- `POST /readings/sync`
  - Body: `{ readings: ReadingPayload[], lastSyncAt: string }`
  - Persists readings and returns `{ status: "synced" }`
- `GET /readings?since=<isoDate>`
  - Returns `{ readings: [...] }` filtered by `updatedAt >= since`
- `POST /readings/:readingId/status`
  - Body: `{ status: "verified" | "rejected" }`
  - Returns `204` on success and emits audit log.

### Analytics
- `GET /analytics`
  - Returns `{ pending, flagged, today }`

### Exceptions
- `GET /exceptions`
  - Returns `{ exceptions: Exception[] }` ordered by recent first.

### Error Handling
- Validation errors return `400` with `message`.
- Authentication failures return `401`.
- Rate limit is enforced at 100 rpm per IP via Fastify rate-limit plugin.


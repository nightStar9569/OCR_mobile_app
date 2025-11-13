## Firestore Collections

| Collection | Purpose | Key Fields |
|------------|---------|------------|
| `users` | Readers, supervisors, admins | `role`, `status`, `lastLogin` |
| `devices` | Registered devices per user | `assignedTo`, `status`, `lastSync` |
| `readings` | Meter readings metadata | `accountNumber`, `readingValue`, `confidence`, `flaggedForMl`, `status`, `deviceId`, `capturedAt` |
| `ml_training_pool` | Challenging samples flagged for model retraining | `readingId`, `accountNumber`, `imageUrl`, `createdAt` |
| `audit_logs` | Actions taken by users/system | `action`, `userId`, `description`, `timestamp` |
| `exceptions` | Exceptions raised by app/backend | `context`, `errorCode`, `message`, `stackTrace`, `resolved` |

## SQLite Mirror (Mobile)

The offline database mirrors key collections to ensure lossless synchronization:

- `users` — currently authenticated user and metadata.
- `devices` — device state for revocation checks.
- `readings` — pending and synced readings with local asset paths.
- `sync_queue_local` — operations awaiting transmission (FIFO with retry state).
- `exceptions_local` — optional store for offline exception logging.

Each table uses ISO8601 timestamps for deterministic delta queries. `sync_queue_local` stores payload snapshots as JSON for idempotent replay.

## Indexing Strategy

- Firestore composite index on `readings(uid, updatedAt desc)` for delta sync.
- Single-field indexes on `readings.status`, `readings.flaggedForMl`, and `exceptions.context`.
- SQLite indexes on `readings(status)` and `sync_queue_local(status, created_at)` for efficient background processing.


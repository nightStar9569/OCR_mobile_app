## System Architecture

The OCR-based meter reading platform is composed of three primary subsystems that communicate through secure, authenticated APIs.

### Mobile Application (Flutter)
- Offline-first architecture with encrypted `sqflite` local store.
- Performs on-device OCR using Google ML Kit and image preprocessing with OpenCV.
- Uses WorkManager for resilient background synchronization.
- Uploads meter images via pre-signed Firebase Storage URLs.
- Communicates with the backend using `Dio` with JWT interceptors.

### Backend API (Fastify + Firebase)
- Stateless Fastify service deployed on Cloud Run.
- Verifies Firebase ID tokens on every request.
- Persists metadata in Firestore and images in Firebase Storage.
- Emits supervisor analytics and handles delta sync logic.
- Records audit logs and exception traces for observability.

### Web Dashboard (React + React Query)
- Supervisor/Admin dashboard powered by Vite + React.
- Authenticates via Firebase and receives JWT for backend access.
- Provides real-time data views using React Query caching and optimistic updates.
- Offers verification workflows, analytics, and exception triage.

### Data Flow Summary
1. Reader captures a meter image and performs on-device OCR.
2. Reading payload is stored locally and queued for sync.
3. WorkManager uploads the image using a pre-signed URL and posts metadata to the backend.
4. Backend validates payloads with Zod, persists data, and copies flagged readings to the ML pool.
5. Supervisors access readings and analytics on the dashboard, approving/rejecting and generating audit trails.


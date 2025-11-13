import type { FastifyInstance } from 'fastify';
import admin from 'firebase-admin';

export const registerFirebase = (server: FastifyInstance) => {
  if (admin.apps.length === 0) {
    const projectId = process.env.FIREBASE_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');

    if (!projectId || !clientEmail || !privateKey) {
      server.log.warn('Firebase Admin SDK is not fully configured.');
    } else {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId,
          clientEmail,
          privateKey,
        }),
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      });
    }
  }

  server.decorate('firebase', admin);

  server.addHook('preHandler', async (request, reply) => {
    const routeUrl =
      (request as { routerPath?: string }).routerPath ??
      request.routeOptions.url ??
      request.raw.url ??
      '';

    if (request.method === 'OPTIONS') return;
    if (routeUrl.startsWith('/health')) return;

    const authHeader = request.headers.authorization;
    if (!authHeader) {
      return reply.unauthorized('Missing Authorization header');
    }

    const [, token] = authHeader.split(' ');
    if (!token) {
      return reply.unauthorized('Invalid Authorization header');
    }

    try {
      const decoded = await admin.auth().verifyIdToken(token);
      request.user = decoded;
    } catch (error) {
      request.log.error({ err: error }, 'Failed to verify id token');
      return reply.unauthorized('Invalid token');
    }
  });
};

declare module 'fastify' {
  interface FastifyInstance {
    firebase: typeof admin;
  }

  interface FastifyRequest {
    user?: admin.auth.DecodedIdToken;
  }
}


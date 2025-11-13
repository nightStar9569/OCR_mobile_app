import type { FastifyInstance } from 'fastify';

export const registerHealthRoutes = (server: FastifyInstance) => {
  server.get('/health', async () => {
    return { status: 'ok', timestamp: new Date().toISOString() };
  });
};


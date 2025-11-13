import dotenv from 'dotenv';
import Fastify from 'fastify';
import helmet from '@fastify/helmet';
import rateLimit from '@fastify/rate-limit';
import sensible from '@fastify/sensible';
import cors from '@fastify/cors';

import { registerRoutes } from './routes';
import { registerFirebase } from './plugins/firebase';

dotenv.config({ path: '.env.local' });

const buildServer = () => {
  const server = Fastify({
    logger: {
      level: process.env.LOG_LEVEL ?? 'info',
    },
  });

  server.register(helmet);
  server.register(cors, {
    origin: process.env.CORS_ORIGIN?.split(',') ?? ['*'],
  });
  server.register(rateLimit, {
    max: 100,
    timeWindow: '1 minute',
  });
  server.register(sensible);

  registerFirebase(server);
  registerRoutes(server);

  return server;
};

const start = async () => {
  const server = buildServer();
  const host = process.env.HOST ?? '0.0.0.0';
  const port = Number(process.env.PORT ?? 3000);

  try {
    await server.listen({ host, port });
    server.log.info(`Server listening on ${host}:${port}`);
  } catch (error) {
    server.log.error(error);
    process.exit(1);
  }
};

if (import.meta.url) {
  start().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}

export { buildServer };


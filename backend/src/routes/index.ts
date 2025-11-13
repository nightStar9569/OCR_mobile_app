import type { FastifyInstance } from 'fastify';

import { registerAnalyticsRoutes } from './modules/analytics';
import { registerExceptionsRoutes } from './modules/exceptions';
import { registerHealthRoutes } from './modules/health';
import { registerReadingRoutes } from './modules/readings';

export const registerRoutes = (server: FastifyInstance) => {
  registerHealthRoutes(server);
  registerAnalyticsRoutes(server);
  registerReadingRoutes(server);
  registerExceptionsRoutes(server);
};


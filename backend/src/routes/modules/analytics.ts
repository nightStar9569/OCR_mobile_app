import type { FastifyInstance } from 'fastify';

import { analyticsService } from '../../services/analytics_service';

export const registerAnalyticsRoutes = (server: FastifyInstance) => {
  server.get('/analytics', async (request, reply) => {
    const user = request.user;
    if (!user) {
      return reply.unauthorized();
    }

    const metrics = await analyticsService.fetchOverview({ uid: user.uid });
    return reply.send(metrics);
  });
};


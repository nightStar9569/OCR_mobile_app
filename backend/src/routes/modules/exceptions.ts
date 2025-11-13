import type { FastifyInstance } from 'fastify';

import { exceptionsRepository } from '../../services/exceptions_repository';

export const registerExceptionsRoutes = (server: FastifyInstance) => {
  server.get('/exceptions', async (request, reply) => {
    const user = request.user;
    if (!user) {
      return reply.unauthorized();
    }

    const exceptions = await exceptionsRepository.listRecent({ limit: 50 });
    return reply.send({ exceptions });
  });
};


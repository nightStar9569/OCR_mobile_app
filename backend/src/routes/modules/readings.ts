import type { FastifyInstance } from 'fastify';
import { z } from 'zod';

import { readingsRepository } from '../../services/readings_repository';
import { auditLogRepository } from '../../services/audit_log_repository';

const readingPayloadSchema = z.object({
  readingId: z.string(),
  accountNumber: z.string(),
  readingValue: z.number(),
  confidence: z.number().min(0).max(1),
  method: z.enum(['ocr', 'manual']),
  status: z.enum(['pending', 'verified', 'synced', 'rejected']),
  flaggedForMl: z.boolean().optional().default(false),
  imageUrl: z.string().url(),
  capturedAt: z.string(),
  updatedAt: z.string(),
  gps: z
    .object({
      lat: z.number(),
      lng: z.number(),
    })
    .optional(),
  deviceId: z.string(),
});

const syncPayloadSchema = z.object({
  readings: z.array(readingPayloadSchema),
  lastSyncAt: z.string(),
});

export const registerReadingRoutes = (server: FastifyInstance) => {

  server.post('/readings/:readingId/status', async (request, reply) => {
    const user = request.user;
    if (!user) {
      return reply.unauthorized();
    }

    const params = request.params as { readingId: string };
    const body = z
      .object({
        status: z.enum(['verified', 'rejected']),
      })
      .safeParse(request.body);

    if (!body.success) {
      return reply.badRequest('Invalid status');
    }

    await readingsRepository.updateStatus({
      readingId: params.readingId,
      status: body.data.status,
      supervisorId: user.uid,
    });

    await auditLogRepository.write({
      action: 'UPDATE_STATUS',
      userId: user.uid,
      description: `Reading ${params.readingId} marked as ${body.data.status}`,
    });

    return reply.status(204).send();
  });
  server.post('/readings/sync', async (request, reply) => {
    const parsed = syncPayloadSchema.safeParse(request.body);
    if (!parsed.success) {
      request.log.warn({ issues: parsed.error.issues }, 'Invalid payload');
      return reply.badRequest('Invalid payload');
    }

    const user = request.user;
    if (!user) {
      return reply.unauthorized();
    }

    await readingsRepository.saveBatch({
      uid: user.uid,
      readings: parsed.data.readings,
    });

    return reply.status(201).send({ status: 'synced' });
  });

  server.get('/readings', async (request, reply) => {
    const since = request.query as { since?: string };
    const user = request.user;
    if (!user) {
      return reply.unauthorized();
    }

    const readings = await readingsRepository.fetchSince({
      uid: user.uid,
      since: since.since,
    });

    return reply.send({ readings });
  });
};


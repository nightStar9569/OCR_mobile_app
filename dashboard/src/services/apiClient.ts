import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000';

export const createApiClient = () => {
  const instance = axios.create({
    baseURL,
    timeout: 8000,
  });

  return {
    async getAnalytics({ token }: { token: string }) {
      const { data } = await instance.get('/analytics', {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data;
    },

    async listReadings({ token }: { token: string; status?: string }) {
      const { data } = await instance.get('/readings', {
        headers: { Authorization: `Bearer ${token}` },
        params: { status },
      });
      return data.readings;
    },

    async verifyReading({
      token,
      readingId,
      status,
    }: {
      token: string;
      readingId: string;
      status: 'verified' | 'rejected';
    }) {
      await instance.post(
        `/readings/${readingId}/status`,
        { status },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
    },

    async listExceptions({ token }: { token: string }) {
      const { data } = await instance.get('/exceptions', {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data.exceptions;
    },
  };
};


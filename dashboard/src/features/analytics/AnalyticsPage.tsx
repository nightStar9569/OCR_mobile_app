import { useQuery } from '@tanstack/react-query';
import { Grid, Paper, Typography } from '@mui/material';

import { useAuth } from '../auth/AuthContext';
import { createApiClient } from '../../services/apiClient';

const api = createApiClient();

export const AnalyticsPage = () => {
  const { user } = useAuth();

  const { data } = useQuery({
    queryKey: ['analytics'],
    queryFn: async () => {
      if (!user) return null;
      return api.getAnalytics({ token: await user.getIdToken() });
    },
    enabled: Boolean(user),
  });

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="subtitle2" color="text.secondary">
            Pending Verifications
          </Typography>
          <Typography variant="h4">{data?.pending ?? 0}</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} md={4}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="subtitle2" color="text.secondary">
            Readings Today
          </Typography>
          <Typography variant="h4">{data?.today ?? 0}</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} md={4}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="subtitle2" color="text.secondary">
            Flagged for ML
          </Typography>
          <Typography variant="h4">{data?.flagged ?? 0}</Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};


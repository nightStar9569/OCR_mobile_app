import { useMemo, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  Box,
  Chip,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

import { useAuth } from '../auth/AuthContext';
import { createApiClient } from '../../services/apiClient';

const api = createApiClient();

export const ReadingsPage = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [statusFilter, setStatusFilter] = useState<string>('pending');

  const { data: readings = [] } = useQuery({
    queryKey: ['readings', statusFilter],
    queryFn: async () => {
      if (!user) return [];
      return api.listReadings({
        token: await user.getIdToken(),
        status: statusFilter,
      });
    },
    enabled: Boolean(user),
  });

  const verifyMutation = useMutation({
    mutationFn: async ({
      readingId,
      status,
    }: {
      readingId: string;
      status: 'verified' | 'rejected';
    }) => {
      const token = await user?.getIdToken();
      if (!token) throw new Error('No auth token');
      await api.verifyReading({ token, readingId, status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['readings', statusFilter] });
    },
  });

  const statuses = useMemo(
    () => [
      { label: 'Pending', value: 'pending' },
      { label: 'Verified', value: 'verified' },
      { label: 'Rejected', value: 'rejected' },
    ],
    [],
  );

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Readings Queue
      </Typography>
      <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
        {statuses.map((status) => (
          <Chip
            key={status.value}
            label={status.label}
            color={statusFilter === status.value ? 'primary' : 'default'}
            onClick={() => setStatusFilter(status.value)}
          />
        ))}
      </Box>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Account</TableCell>
            <TableCell>Value</TableCell>
            <TableCell>Confidence</TableCell>
            <TableCell>Method</TableCell>
            <TableCell>Captured</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {readings.map((reading: any) => (
            <TableRow key={reading.id}>
              <TableCell>{reading.accountNumber}</TableCell>
              <TableCell>{reading.readingValue}</TableCell>
              <TableCell>{Math.round(reading.confidence * 100)}%</TableCell>
              <TableCell>{reading.method}</TableCell>
              <TableCell>{new Date(reading.capturedAt.seconds * 1000).toLocaleString()}</TableCell>
              <TableCell align="right">
                <IconButton
                  color="success"
                  onClick={() =>
                    verifyMutation.mutate({ readingId: reading.id, status: 'verified' })
                  }
                  size="small"
                >
                  <CheckIcon fontSize="small" />
                </IconButton>
                <IconButton
                  color="error"
                  onClick={() =>
                    verifyMutation.mutate({ readingId: reading.id, status: 'rejected' })
                  }
                  size="small"
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};


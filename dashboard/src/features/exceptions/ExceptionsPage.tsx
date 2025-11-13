import { useQuery } from '@tanstack/react-query';
import { Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';

import { useAuth } from '../auth/AuthContext';
import { createApiClient } from '../../services/apiClient';

const api = createApiClient();

export const ExceptionsPage = () => {
  const { user } = useAuth();
  const { data: exceptions = [] } = useQuery({
    queryKey: ['exceptions'],
    queryFn: async () => {
      if (!user) return [];
      return api.listExceptions({ token: await user.getIdToken() });
    },
    enabled: Boolean(user),
  });

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        System Exceptions
      </Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Context</TableCell>
            <TableCell>Error Code</TableCell>
            <TableCell>Message</TableCell>
            <TableCell>Created</TableCell>
            <TableCell>Resolved</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {exceptions.map((exception: any) => (
            <TableRow key={exception.exceptionId}>
              <TableCell>{exception.context}</TableCell>
              <TableCell>{exception.errorCode}</TableCell>
              <TableCell>{exception.message}</TableCell>
              <TableCell>{new Date(exception.createdAt).toLocaleString()}</TableCell>
              <TableCell>{exception.resolved ? 'Yes' : 'No'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};


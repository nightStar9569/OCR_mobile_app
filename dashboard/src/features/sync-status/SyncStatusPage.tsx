import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Grid,
  LinearProgress,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import SyncIcon from '@mui/icons-material/Sync';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';

interface Device {
  id: string;
  reader: string;
  lastSync: string;
  status: 'Online' | 'Offline';
  pending: number;
  battery: number;
}

interface SyncHistory {
  time: string;
  device: string;
  records: number;
  status: 'Success' | 'Partial' | 'Failed';
  duration: string;
}

interface PendingUpload {
  id: string;
  device: string;
  reading: string;
  customer: string;
  retryIn: string;
  attempts: number;
}

// Mock data
const mockDevices: Device[] = [
  {
    id: 'DEV-001',
    reader: 'Mike Davis',
    lastSync: '2025-11-13 10:24',
    status: 'Online',
    pending: 0,
    battery: 87,
  },
  {
    id: 'DEV-002',
    reader: 'Emily Brown',
    lastSync: '2025-11-13 10:22',
    status: 'Online',
    pending: 3,
    battery: 92,
  },
  {
    id: 'DEV-003',
    reader: 'David Martinez',
    lastSync: '2025-11-13 10:18',
    status: 'Online',
    pending: 12,
    battery: 45,
  },
  {
    id: 'DEV-004',
    reader: 'Lisa Anderson',
    lastSync: '2025-11-13 09:45',
    status: 'Offline',
    pending: 28,
    battery: 23,
  },
  {
    id: 'DEV-005',
    reader: 'John Walker',
    lastSync: '2025-11-13 10:20',
    status: 'Online',
    pending: 5,
    battery: 78,
  },
];

const mockSyncHistory: SyncHistory[] = [
  {
    time: '10:24:15',
    device: 'DEV-001',
    records: 45,
    status: 'Success',
    duration: '2.3s',
  },
  {
    time: '10:22:42',
    device: 'DEV-002',
    records: 38,
    status: 'Success',
    duration: '1.8s',
  },
  {
    time: '10:18:33',
    device: 'DEV-003',
    records: 52,
    status: 'Partial',
    duration: '4.2s',
  },
  {
    time: '10:15:08',
    device: 'DEV-005',
    records: 29,
    status: 'Success',
    duration: '1.5s',
  },
  {
    time: '09:45:22',
    device: 'DEV-004',
    records: 41,
    status: 'Failed',
    duration: '0.8s',
  },
];

const mockPendingUploads: PendingUpload[] = [
  {
    id: 'REC-8421',
    device: 'DEV-002',
    reading: '12547',
    customer: 'CUST-10234',
    retryIn: 'Retry in 2 min',
    attempts: 1,
  },
  {
    id: 'REC-8422',
    device: 'DEV-003',
    reading: '98432',
    customer: 'CUST-10241',
    retryIn: 'Retry in 5 min',
    attempts: 2,
  },
  {
    id: 'REC-8423',
    device: 'DEV-003',
    reading: '45678',
    customer: 'CUST-10237',
    retryIn: 'Retry in 2 min',
    attempts: 1,
  },
];

export const SyncStatusPage = () => {
  const [deviceFilter, setDeviceFilter] = useState('All Devices');

  const handleDeviceFilterChange = (event: SelectChangeEvent) => {
    setDeviceFilter(event.target.value);
  };

  const handleForceSyncAll = () => {
    console.log('Force sync all devices');
  };

  const handleSyncDevice = (deviceId: string) => {
    console.log('Sync device:', deviceId);
  };

  const handleRetryUpload = (uploadId: string) => {
    console.log('Retry upload:', uploadId);
  };

  const devicesOnline = mockDevices.filter((d) => d.status === 'Online').length;
  const totalDevices = mockDevices.length;
  const pendingUploads = mockPendingUploads.length;
  const lastSync = '2 min';
  const syncSuccessRate = '98.2%';
  const failedToday = 3;

  const getStatusColor = (status: 'Online' | 'Offline') => {
    return status === 'Online' ? 'success' : 'default';
  };

  const getStatusIcon = (status: 'Online' | 'Offline') => {
    return status === 'Online' ? <CheckCircleIcon fontSize="small" /> : <CancelIcon fontSize="small" />;
  };

  const getSyncStatusColor = (status: 'Success' | 'Partial' | 'Failed') => {
    if (status === 'Success') return 'success';
    if (status === 'Partial') return 'warning';
    return 'error';
  };

  const getBatteryColor = (battery: number) => {
    if (battery >= 70) return 'success';
    if (battery >= 30) return 'warning';
    return 'error';
  };

  return (
    <Box sx={{ width: '100%' }}>
      {/* Filter and Actions */}
      <Paper sx={{ p: 2, mb: 3, borderRadius: 2, boxShadow: 2 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 2,
          }}
        >
          <Select value={deviceFilter} onChange={handleDeviceFilterChange} size="small">
            <MenuItem value="All Devices">All Devices</MenuItem>
            <MenuItem value="Online">Online Only</MenuItem>
            <MenuItem value="Offline">Offline Only</MenuItem>
            <MenuItem value="Pending">With Pending Uploads</MenuItem>
          </Select>
          <Button
            variant="contained"
            startIcon={<SyncIcon />}
            onClick={handleForceSyncAll}
            sx={{
              bgcolor: 'grey.900',
              '&:hover': { bgcolor: 'grey.800' },
            }}
          >
            Force Sync All
          </Button>
        </Box>
      </Paper>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%', borderRadius: 2, boxShadow: 2 }}>
            <CardContent>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Devices Online
              </Typography>
              <Typography variant="h4" component="div" sx={{ fontWeight: 600, mt: 1 }}>
                {devicesOnline}/{totalDevices}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%', borderRadius: 2, boxShadow: 2 }}>
            <CardContent>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Pending Upload
              </Typography>
              <Typography variant="h4" component="div" sx={{ fontWeight: 600, mt: 1 }}>
                {pendingUploads}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%', borderRadius: 2, boxShadow: 2 }}>
            <CardContent>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Last Sync
              </Typography>
              <Typography variant="h4" component="div" sx={{ fontWeight: 600, mt: 1 }}>
                {lastSync}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%', borderRadius: 2, boxShadow: 2 }}>
            <CardContent>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Sync Success Rate
              </Typography>
              <Typography variant="h4" component="div" sx={{ fontWeight: 600, mt: 1 }}>
                {syncSuccessRate}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%', borderRadius: 2, boxShadow: 2 }}>
            <CardContent>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Failed Today
              </Typography>
              <Typography variant="h4" component="div" sx={{ fontWeight: 600, mt: 1 }}>
                {failedToday}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Device Sync Status Table */}
      <Paper sx={{ mb: 3, borderRadius: 2, boxShadow: 2, overflow: 'hidden' }}>
        <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Device Sync Status
          </Typography>
        </Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: 'grey.50' }}>
                <TableCell sx={{ fontWeight: 600 }}>Device ID</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Reader</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Last Sync</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Pending</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Battery</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mockDevices.map((device) => (
                <TableRow key={device.id} hover>
                  <TableCell>{device.id}</TableCell>
                  <TableCell>{device.reader}</TableCell>
                  <TableCell>{device.lastSync}</TableCell>
                  <TableCell>
                    <Chip
                      icon={getStatusIcon(device.status)}
                      label={device.status}
                      size="small"
                      color={getStatusColor(device.status)}
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>
                    {device.pending > 0 ? (
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <AccessTimeIcon fontSize="small" color="warning" />
                        <Typography variant="body2">{device.pending}</Typography>
                      </Box>
                    ) : (
                      <Typography variant="body2">-</Typography>
                    )}
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 120 }}>
                      <Box sx={{ flexGrow: 1 }}>
                        <LinearProgress
                          variant="determinate"
                          value={device.battery}
                          color={getBatteryColor(device.battery)}
                          sx={{ height: 8, borderRadius: 1 }}
                        />
                      </Box>
                      <Typography variant="body2" sx={{ minWidth: 35 }}>
                        {device.battery}%
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<SyncIcon />}
                      onClick={() => handleSyncDevice(device.id)}
                    >
                      Sync
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Grid container spacing={3}>
        {/* Recent Sync History */}
        <Grid item xs={12} lg={6}>
          <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 2, height: '100%' }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Recent Sync History
            </Typography>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow sx={{ bgcolor: 'grey.50' }}>
                    <TableCell sx={{ fontWeight: 600 }}>Time</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Device</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Records</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Duration</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {mockSyncHistory.map((history, index) => (
                    <TableRow key={index} hover>
                      <TableCell>{history.time}</TableCell>
                      <TableCell>{history.device}</TableCell>
                      <TableCell>{history.records}</TableCell>
                      <TableCell>
                        <Chip
                          label={history.status}
                          size="small"
                          color={getSyncStatusColor(history.status)}
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell>{history.duration}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        {/* Pending Uploads */}
        <Grid item xs={12} lg={6}>
          <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 2, height: '100%' }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 2,
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Pending Uploads
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {pendingUploads} total
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {mockPendingUploads.map((upload) => (
                <Card
                  key={upload.id}
                  variant="outlined"
                  sx={{
                    '&:hover': { boxShadow: 2, borderColor: 'primary.main' },
                  }}
                >
                  <CardContent>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        mb: 1,
                      }}
                    >
                      <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                          {upload.id}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" display="block">
                          Device: {upload.device}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" display="block">
                          Reading: {upload.reading}
                        </Typography>
                      </Box>
                      <Chip
                        label={`Attempts: ${upload.attempts}`}
                        size="small"
                        sx={{
                          borderRadius: 1,
                          fontWeight: 500,
                          bgcolor: 'grey.100',
                        }}
                      />
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mt: 1.5,
                      }}
                    >
                      <Box>
                        <Typography variant="caption" color="text.secondary" display="block">
                          Customer: {upload.customer}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5 }}>
                          <AccessTimeIcon fontSize="small" color="action" />
                          <Typography variant="caption" color="text.secondary">
                            {upload.retryIn}
                          </Typography>
                        </Box>
                      </Box>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => handleRetryUpload(upload.id)}
                      >
                        Retry Now
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              ))}
              <Button variant="outlined" fullWidth>
                View All Pending (48)
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Network Health Indicators */}
      <Paper sx={{ mt: 3, p: 3, borderRadius: 2, boxShadow: 2 }}>
        <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
          Network Health Indicators
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <Card variant="outlined" sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Avg Upload Speed
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 600, my: 2 }}>
                2.4 MB/s
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card variant="outlined" sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Connection Quality
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 600, my: 2 }}>
                Good
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card variant="outlined" sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Retry Success Rate
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 600, my: 2 }}>
                94%
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card variant="outlined" sx={{ p: 3, textAlign: 'center' }}>
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1 }}>
                <SignalCellularAltIcon sx={{ fontSize: 40, color: 'success.main' }} />
              </Box>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Avg Sync Latency
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 600, my: 2 }}>
                1.8s
              </Typography>
            </Card>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};


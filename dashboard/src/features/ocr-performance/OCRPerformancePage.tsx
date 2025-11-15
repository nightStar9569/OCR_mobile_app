import { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Chip,
  Grid,
  LinearProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

// Mock data for 24-hour processing volume
const processingVolumeData = [
  { time: '00:00', processed: 50, success: 48 },
  { time: '04:00', processed: 45, success: 43 },
  { time: '08:00', processed: 150, success: 145 },
  { time: '12:00', processed: 200, success: 195 },
  { time: '16:00', processed: 140, success: 135 },
  { time: '20:00', processed: 60, success: 58 },
];

// Mock data for accuracy over time
const accuracyOverTimeData = [
  { time: '00:00', accuracy: 95 },
  { time: '04:00', accuracy: 94.5 },
  { time: '08:00', accuracy: 95 },
  { time: '12:00', accuracy: 95.5 },
  { time: '16:00', accuracy: 95 },
  { time: '20:00', accuracy: 95.5 },
];

// Error type distribution data
const errorTypeData = [
  { type: 'Blurry Image', count: 234, percentage: 42 },
  { type: 'Poor Lighting', count: 156, percentage: 28 },
  { type: 'Partial Obstruction', count: 89, percentage: 16 },
  { type: 'Low Resolution', count: 45, percentage: 8 },
  { type: 'Damaged Meter', count: 33, percentage: 6 },
];

// Model performance comparison data
const modelPerformanceData = [
  { model: 'OCR Model v3.2', accuracy: '95.2%', status: 'Active' },
  { model: 'OCR Model v3.1', accuracy: '94.1%', status: 'Backup' },
  { model: 'OCR Model v2.9', accuracy: '92.8%', status: 'Deprecated' },
];

// Recent processing log data
const recentProcessingLog = [
  {
    timestamp: '10:45:23',
    batchId: 'BCH-2341',
    images: 125,
    success: 119,
    failed: 6,
    accuracy: '95.2%',
    avgTime: '1.2s',
  },
  {
    timestamp: '10:30:15',
    batchId: 'BCH-2340',
    images: 98,
    success: 93,
    failed: 5,
    accuracy: '94.9%',
    avgTime: '1.3s',
  },
  {
    timestamp: '10:15:42',
    batchId: 'BCH-2339',
    images: 156,
    success: 148,
    failed: 8,
    accuracy: '94.9%',
    avgTime: '1.9s',
  },
  {
    timestamp: '10:00:08',
    batchId: 'BCH-2338',
    images: 87,
    success: 84,
    failed: 3,
    accuracy: '96.6%',
    avgTime: '1.6s',
  },
  {
    timestamp: '09:45:33',
    batchId: 'BCH-2337',
    images: 142,
    success: 134,
    failed: 8,
    accuracy: '94.4%',
    avgTime: '1.8s',
  },
];

export const OCRPerformancePage = () => {
  return (
    <Box sx={{ width: '100%' }}>
      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={2.4}>
          <Card sx={{ height: '100%', borderRadius: 2, boxShadow: 2 }}>
            <CardContent>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Current Accuracy
              </Typography>
              <Typography variant="h4" component="div" sx={{ fontWeight: 600, mt: 1 }}>
                95.2%
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Last 1000 images
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={2.4}>
          <Card sx={{ height: '100%', borderRadius: 2, boxShadow: 2 }}>
            <CardContent>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Processing Queue
              </Typography>
              <Typography variant="h4" component="div" sx={{ fontWeight: 600, mt: 1 }}>
                47
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Images pending
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={2.4}>
          <Card sx={{ height: '100%', borderRadius: 2, boxShadow: 2 }}>
            <CardContent>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Avg Latency
              </Typography>
              <Typography variant="h4" component="div" sx={{ fontWeight: 600, mt: 1 }}>
                1.8s
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Per image
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={2.4}>
          <Card sx={{ height: '100%', borderRadius: 2, boxShadow: 2 }}>
            <CardContent>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Failed Today
              </Typography>
              <Typography variant="h4" component="div" sx={{ fontWeight: 600, mt: 1 }}>
                89
              </Typography>
              <Typography variant="caption" color="text.secondary">
                5.4% failure rate
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={2.4}>
          <Card sx={{ height: '100%', borderRadius: 2, boxShadow: 2 }}>
            <CardContent>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Total Processed
              </Typography>
              <Typography variant="h4" component="div" sx={{ fontWeight: 600, mt: 1 }}>
                1,647
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Today
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Charts Row 1 */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} lg={6}>
          <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 2, height: '100%' }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
              24-Hour Processing Volume
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={processingVolumeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis domain={[0, 200]} ticks={[0, 50, 100, 150, 200]} />
                <Tooltip />
                <Legend />
                <Bar dataKey="processed" fill="#757575" name="Processed" />
                <Bar dataKey="success" fill="#424242" name="Success" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 2, height: '100%' }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
              Accuracy Over Time
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={accuracyOverTimeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis domain={[90, 100]} ticks={[90, 93, 96, 100]} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="accuracy"
                  stroke="#424242"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>

      {/* Charts Row 2 */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} lg={6}>
          <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 2, height: '100%' }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
              Error Type Distribution
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
              {errorTypeData.map((error, index) => (
                <Box key={index}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      mb: 1,
                    }}
                  >
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {error.type}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {error.count} ({error.percentage}%)
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={error.percentage}
                    sx={{
                      height: 8,
                      borderRadius: 1,
                      bgcolor: 'grey.200',
                      '& .MuiLinearProgress-bar': {
                        bgcolor: 'grey.700',
                        borderRadius: 1,
                      },
                    }}
                  />
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 2, height: '100%' }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
              Model Performance Comparison
            </Typography>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow sx={{ bgcolor: 'grey.50' }}>
                    <TableCell sx={{ fontWeight: 600 }}>Model</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Accuracy</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {modelPerformanceData.map((model, index) => (
                    <TableRow key={index}>
                      <TableCell>{model.model}</TableCell>
                      <TableCell>{model.accuracy}</TableCell>
                      <TableCell>
                        <Chip
                          label={model.status}
                          size="small"
                          sx={{
                            borderRadius: 1,
                            fontWeight: 500,
                            bgcolor: 'transparent',
                            border: 1,
                            borderColor:
                              model.status === 'Active'
                                ? 'success.main'
                                : model.status === 'Backup'
                                  ? 'info.main'
                                  : 'grey.400',
                            color:
                              model.status === 'Active'
                                ? 'success.main'
                                : model.status === 'Backup'
                                  ? 'info.main'
                                  : 'grey.600',
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Box sx={{ mt: 3, pt: 3, borderTop: 1, borderColor: 'divider' }}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mb: 1,
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  Avg Throughput:
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  1,350 images/hour
                </Typography>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  Avg Latency:
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  1.8 seconds
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Recent Processing Log */}
      <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 2 }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          Recent Processing Log
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: 'grey.50' }}>
                <TableCell sx={{ fontWeight: 600 }}>Timestamp</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Batch ID</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Images</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Success</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Failed</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Accuracy</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Avg Time</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {recentProcessingLog.map((log, index) => (
                <TableRow
                  key={index}
                  sx={{
                    '&:hover': { bgcolor: 'grey.50' },
                  }}
                >
                  <TableCell>{log.timestamp}</TableCell>
                  <TableCell>{log.batchId}</TableCell>
                  <TableCell>{log.images}</TableCell>
                  <TableCell>{log.success}</TableCell>
                  <TableCell>{log.failed}</TableCell>
                  <TableCell>{log.accuracy}</TableCell>
                  <TableCell>{log.avgTime}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};


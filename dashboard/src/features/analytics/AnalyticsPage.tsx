import { useQuery } from '@tanstack/react-query';
import {
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
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

import { useAuth } from '../auth/AuthContext';
import { createApiClient } from '../../services/apiClient';

const api = createApiClient();

// Mock data for charts (replace with real data from API)
const dailyReadingsData = [
  { day: 'Mon', readings: 180 },
  { day: 'Tue', readings: 150 },
  { day: 'Wed', readings: 180 },
  { day: 'Thu', readings: 220 },
  { day: 'Fri', readings: 180 },
  { day: 'Sat', readings: 100 },
  { day: 'Sun', readings: 80 },
];

const ocrAccuracyData = [
  { day: 'Mon', accuracy: 92 },
  { day: 'Tue', accuracy: 94 },
  { day: 'Wed', accuracy: 93 },
  { day: 'Thu', accuracy: 95 },
  { day: 'Fri', accuracy: 94 },
  { day: 'Sat', accuracy: 93 },
  { day: 'Sun', accuracy: 94 },
];

const recentActivities = [
  {
    time: '10:24 AM',
    action: 'Route 12 completed - 45 readings',
    performer: 'Reader #007',
  },
  {
    time: '10:18 AM',
    action: 'Exception flagged - Invalid reading',
    performer: 'System',
  },
  {
    time: '10:15 AM',
    action: 'Image review approved - Customer #3421',
    performer: 'Admin User',
  },
  {
    time: '10:09 AM',
    action: 'OCR processing batch #234 completed',
    performer: 'System',
  },
  {
    time: '10:05 AM',
    action: 'New route assigned to Reader #012',
    performer: 'Manager',
  },
];

export const AnalyticsPage = () => {
  const { user } = useAuth();

  const { data } = useQuery({
    queryKey: ['analytics'],
    queryFn: async () => {
      if (!user) return null;
      return api.getAnalytics({ token: user.uid });
    },
    enabled: Boolean(user),
  });

  // Mock KPI data (replace with real data from API)
  const kpiData = {
    totalReadingsToday: data?.today ?? 1247,
    pendingReviews: data?.pending ?? 89,
    ocrAccuracy: 94.2,
    activeRoutes: 24,
  };

  return (
    <Box sx={{ width: '100%' }}>
      {/* KPI Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%', borderRadius: 2, boxShadow: 2 }}>
            <CardContent>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Total Readings Today
              </Typography>
              <Typography variant="h4" component="div" sx={{ fontWeight: 600, mt: 1 }}>
                {kpiData.totalReadingsToday.toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%', borderRadius: 2, boxShadow: 2 }}>
            <CardContent>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Pending Reviews
              </Typography>
              <Typography variant="h4" component="div" sx={{ fontWeight: 600, mt: 1 }}>
                {kpiData.pendingReviews}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%', borderRadius: 2, boxShadow: 2 }}>
            <CardContent>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                OCR Accuracy
              </Typography>
              <Typography variant="h4" component="div" sx={{ fontWeight: 600, mt: 1 }}>
                {kpiData.ocrAccuracy}%
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%', borderRadius: 2, boxShadow: 2 }}>
            <CardContent>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Active Routes
              </Typography>
              <Typography variant="h4" component="div" sx={{ fontWeight: 600, mt: 1 }}>
                {kpiData.activeRoutes}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Charts Row */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 2, height: '100%' }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
              Daily Readings (Last 7 Days)
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dailyReadingsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis domain={[0, 240]} ticks={[0, 60, 120, 180, 240]} />
                <Tooltip />
                <Bar dataKey="readings" fill="#1976d2" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 2, height: '100%' }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
              OCR Accuracy Trend
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={ocrAccuracyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis domain={[0, 100]} ticks={[0, 25, 50, 75, 100]} />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="accuracy"
                  stroke="#1976d2"
                  strokeWidth={2}
                  dot={{ r: 5 }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>

      {/* Recent Activity */}
      <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 2 }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          Recent Activity
        </Typography>
        <List>
          {recentActivities.map((activity, index) => (
            <ListItem
              key={index}
              sx={{
                borderBottom: index < recentActivities.length - 1 ? 1 : 0,
                borderColor: 'divider',
                py: 1.5,
              }}
            >
              <ListItemText
                primary={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>
                      {activity.time}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.primary' }}>
                      {activity.action}
                    </Typography>
                  </Box>
                }
                secondary={
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    Performed by {activity.performer}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
};


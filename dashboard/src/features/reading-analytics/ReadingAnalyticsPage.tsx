import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
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
  TextField,
  Typography,
} from '@mui/material';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

// Mock data for charts
const monthlyReadingsData = [
  { month: 'Jan', readings: 3500 },
  { month: 'Feb', readings: 3300 },
  { month: 'Mar', readings: 3700 },
  { month: 'Apr', readings: 3600 },
  { month: 'May', readings: 3800 },
  { month: 'Jun', readings: 4000 },
];

const accuracyTrendData = [
  { month: 'Jan', accuracy: 92 },
  { month: 'Feb', accuracy: 93 },
  { month: 'Mar', accuracy: 94 },
  { month: 'Apr', accuracy: 93 },
  { month: 'May', accuracy: 95 },
  { month: 'Jun', accuracy: 94 },
];

const categoryData = [
  { name: 'Residential', value: 45, color: '#424242' },
  { name: 'Commercial', value: 30, color: '#757575' },
  { name: 'Industrial', value: 15, color: '#9e9e9e' },
  { name: 'Other', value: 10, color: '#bdbdbd' },
];

const routePerformanceData = [
  { route: 'Route 1', completed: 98, total: 100 },
  { route: 'Route 2', completed: 95, total: 100 },
  { route: 'Route 3', completed: 97, total: 100 },
  { route: 'Route 4', completed: 92, total: 100 },
  { route: 'Route 5', completed: 96, total: 100 },
];

const monthlyStatistics = [
  { month: 'Jan', totalReadings: 3430, avgAccuracy: '93%', exceptions: 45, successRate: '98.7%' },
  { month: 'Feb', totalReadings: 3240, avgAccuracy: '94%', exceptions: 38, successRate: '98.8%' },
  { month: 'Mar', totalReadings: 3650, avgAccuracy: '95%', exceptions: 32, successRate: '99.1%' },
  { month: 'Apr', totalReadings: 3580, avgAccuracy: '94%', exceptions: 41, successRate: '98.9%' },
  { month: 'May', totalReadings: 3720, avgAccuracy: '96%', exceptions: 28, successRate: '99.2%' },
  { month: 'Jun', totalReadings: 3880, avgAccuracy: '95%', exceptions: 35, successRate: '99.1%' },
];

export const ReadingAnalyticsPage = () => {
  const [startDate, setStartDate] = useState('2025-01-01');
  const [endDate, setEndDate] = useState('2025-11-13');
  const [category, setCategory] = useState('All Categories');

  const handleCategoryChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value);
  };

  const handleApplyFilter = () => {
    // Apply filter logic here
    console.log('Applying filters:', { startDate, endDate, category });
  };

  return (
    <Box sx={{ width: '100%' }}>
      {/* Date Range and Filter */}
      <Paper sx={{ p: 2, mb: 3, borderRadius: 2, boxShadow: 2 }}>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="body2">Date Range:</Typography>
            <TextField
              type="date"
              size="small"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              sx={{ width: 150 }}
            />
            <Typography variant="body2">to</Typography>
            <TextField
              type="date"
              size="small"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              sx={{ width: 150 }}
            />
          </Box>
          <Select
            value={category}
            onChange={handleCategoryChange}
            size="small"
            sx={{ minWidth: 200 }}
          >
            <MenuItem value="All Categories">All Categories</MenuItem>
            <MenuItem value="Residential">Residential</MenuItem>
            <MenuItem value="Commercial">Commercial</MenuItem>
            <MenuItem value="Industrial">Industrial</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </Select>
          <Button
            variant="contained"
            onClick={handleApplyFilter}
            sx={{
              bgcolor: 'grey.900',
              '&:hover': { bgcolor: 'grey.800' },
              textTransform: 'none',
            }}
          >
            Apply
          </Button>
        </Box>
      </Paper>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%', borderRadius: 2, boxShadow: 2 }}>
            <CardContent>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Total Readings (M)
              </Typography>
              <Typography variant="h4" component="div" sx={{ fontWeight: 600, mt: 1 }}>
                21,540
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Last 6 months period
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%', borderRadius: 2, boxShadow: 2 }}>
            <CardContent>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Avg Accuracy
              </Typography>
              <Typography variant="h4" component="div" sx={{ fontWeight: 600, mt: 1 }}>
                94.7%
              </Typography>
              <Typography variant="caption" color="text.secondary">
                OCR success rate
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%', borderRadius: 2, boxShadow: 2 }}>
            <CardContent>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Total Exceptions
              </Typography>
              <Typography variant="h4" component="div" sx={{ fontWeight: 600, mt: 1 }}>
                219
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Flagged for review
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%', borderRadius: 2, boxShadow: 2 }}>
            <CardContent>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Avg Processing Time
              </Typography>
              <Typography variant="h4" component="div" sx={{ fontWeight: 600, mt: 1 }}>
                2.5min
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Per reading
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Charts Row 1 */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 2, height: '100%' }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
              Monthly Readings Trend
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyReadingsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis domain={[0, 4000]} ticks={[0, 1000, 2000, 3000, 4000]} />
                <Tooltip />
                <Legend />
                <Bar dataKey="readings" fill="#616161" name="Readings" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 2, height: '100%' }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
              Accuracy Trend (%)
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={accuracyTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis domain={[90, 100]} ticks={[90, 92, 94, 96, 98, 100]} />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="accuracy"
                  stroke="#424242"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                  name="Accuracy %"
                />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>

      {/* Charts Row 2 */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 2, height: '100%' }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
              Readings by Category
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    dataKey="value"
                    label={(entry) => `${entry.name} ${entry.value}%`}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 2, height: '100%' }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
              Top Route Performance
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {routePerformanceData.map((route, index) => (
                <Box key={index}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      mb: 0.5,
                    }}
                  >
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {route.route}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {route.completed}/{route.total} ({((route.completed / route.total) * 100).toFixed(1)}%)
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={(route.completed / route.total) * 100}
                    sx={{
                      height: 8,
                      borderRadius: 1,
                      bgcolor: 'grey.200',
                      '& .MuiLinearProgress-bar': {
                        bgcolor: 'grey.800',
                        borderRadius: 1,
                      },
                    }}
                  />
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Detailed Monthly Statistics */}
      <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 2 }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          Detailed Monthly Statistics
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: 'grey.50' }}>
                <TableCell sx={{ fontWeight: 600 }}>Month</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Total Readings</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Avg Accuracy</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Exceptions</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Success Rate</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {monthlyStatistics.map((stat, index) => (
                <TableRow
                  key={index}
                  sx={{
                    '&:hover': { bgcolor: 'grey.50' },
                  }}
                >
                  <TableCell>{stat.month}</TableCell>
                  <TableCell>{stat.totalReadings.toLocaleString()}</TableCell>
                  <TableCell>{stat.avgAccuracy}</TableCell>
                  <TableCell>{stat.exceptions}</TableCell>
                  <TableCell>{stat.successRate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};


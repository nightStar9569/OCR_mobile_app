import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
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
import SearchIcon from '@mui/icons-material/Search';
import WarningIcon from '@mui/icons-material/Warning';
import TimelineIcon from '@mui/icons-material/Timeline';

interface Exception {
  id: string;
  type: string;
  customer: string;
  meterId: string;
  value: string;
  expectedRange: string;
  severity: 'High' | 'Medium' | 'Low';
  status: 'Open' | 'Assigned' | 'In Progress' | 'Resolved';
  date: string;
}

interface ExceptionDetails extends Exception {
  description: string;
  activityTimeline: Activity[];
}

interface Activity {
  time: string;
  action: string;
  user: string;
}

// Mock data
const mockExceptions: Exception[] = [
  {
    id: 'EXC-1234',
    type: 'Reading Anomaly',
    customer: 'CUST-10234',
    meterId: 'MTR-4521',
    value: '12547',
    expectedRange: '5200-5400',
    severity: 'High',
    status: 'Open',
    date: '2025-11-13 10:15',
  },
  {
    id: 'EXC-1235',
    type: 'Meter Inaccessible',
    customer: 'CUST-10241',
    meterId: 'MTR-4529',
    value: '-',
    expectedRange: '-',
    severity: 'Medium',
    status: 'Assigned',
    date: '2025-11-13 09:45',
  },
  {
    id: 'EXC-1236',
    type: 'Damaged Meter',
    customer: 'CUST-10237',
    meterId: 'MTR-4533',
    value: '-',
    expectedRange: '-',
    severity: 'High',
    status: 'In Progress',
    date: '2025-11-13 09:30',
  },
  {
    id: 'EXC-1237',
    type: 'Zero Consumption',
    customer: 'CUST-10239',
    meterId: 'MTR-4541',
    value: '23891',
    expectedRange: '23800-24000',
    severity: 'Low',
    status: 'Open',
    date: '2025-11-13 08:20',
  },
  {
    id: 'EXC-1238',
    type: 'OCR Mismatch',
    customer: 'CUST-10245',
    meterId: 'MTR-4547',
    value: '67234',
    expectedRange: '45000-46000',
    severity: 'Medium',
    status: 'Resolved',
    date: '2025-11-12 16:15',
  },
  {
    id: 'EXC-1239',
    type: 'Reading Anomaly',
    customer: 'CUST-10251',
    meterId: 'MTR-4553',
    value: '98765',
    expectedRange: '87000-88000',
    severity: 'High',
    status: 'Open',
    date: '2025-11-12 15:45',
  },
];

const mockExceptionDetails: ExceptionDetails = {
  id: 'EXC-1234',
  type: 'Reading Anomaly',
  customer: 'CUST-10234',
  meterId: 'MTR-4521',
  value: '12547',
  expectedRange: '5200-5400',
  severity: 'High',
  status: 'Open',
  date: '2025-11-13 10:15',
  description:
    "Reading value of 12547 is significantly higher than expected range of 5200-5400. This represents an unusual increase that may indicate meter tampering, data entry error, or legitimate high consumption that requires investigation.",
  activityTimeline: [
    {
      time: '10:15',
      action: 'Exception created',
      user: 'System',
    },
    {
      time: '10:18',
      action: 'Flagged as high priority',
      user: 'Admin User',
    },
    {
      time: '10:23',
      action: 'Note added',
      user: 'Manager',
    },
    {
      time: '10:30',
      action: 'Assigned to technician',
      user: 'Admin User',
    },
  ],
};

export const ExceptionsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('All Types');
  const [severityFilter, setSeverityFilter] = useState('All Severity');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [selectedException, setSelectedException] = useState<ExceptionDetails | null>(
    mockExceptionDetails,
  );
  const [note, setNote] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const handleTypeFilterChange = (event: SelectChangeEvent) => {
    setTypeFilter(event.target.value);
  };

  const handleSeverityFilterChange = (event: SelectChangeEvent) => {
    setSeverityFilter(event.target.value);
  };

  const handleStatusFilterChange = (event: SelectChangeEvent) => {
    setStatusFilter(event.target.value);
  };

  const handleViewException = (exceptionId: string) => {
    // In real app, fetch exception details based on exceptionId
    // For now, use mock data for the first exception
    setSelectedException(mockExceptionDetails);
  };

  const handleMarkAsResolved = () => {
    console.log('Mark as resolved:', selectedException?.id);
    // Update exception status in real app
    if (selectedException) {
      setSelectedException({ ...selectedException, status: 'Resolved' });
    }
  };

  const handleAssignToTechnician = () => {
    console.log('Assign to technician:', selectedException?.id);
    // Update exception status in real app
    if (selectedException) {
      setSelectedException({ ...selectedException, status: 'Assigned' });
    }
  };

  const handleRequestReRead = () => {
    console.log('Request re-read:', selectedException?.id);
    // Trigger re-read request in real app
  };

  const totalOpen = mockExceptions.filter((e) => e.status === 'Open').length;
  const highSeverity = mockExceptions.filter((e) => e.severity === 'High').length;
  const inProgress = mockExceptions.filter((e) => e.status === 'In Progress').length;
  const resolvedToday = mockExceptions.filter((e) => e.status === 'Resolved').length;
  const avgResolutionTime = '4.2h';

  const getSeverityColor = (severity: 'High' | 'Medium' | 'Low') => {
    if (severity === 'High') return 'error';
    if (severity === 'Medium') return 'warning';
    return 'info';
  };

  const getStatusColor = (status: 'Open' | 'Assigned' | 'In Progress' | 'Resolved') => {
    if (status === 'Resolved') return 'success';
    if (status === 'In Progress') return 'info';
    if (status === 'Assigned') return 'warning';
    return 'default';
  };

  const totalPages = Math.ceil(mockExceptions.length / 6);

  return (
    <Box sx={{ width: '100%' }}>
      {/* Search and Filters */}
      <Paper sx={{ p: 2, mb: 3, borderRadius: 2, boxShadow: 2 }}>
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            flexWrap: 'wrap',
            alignItems: 'center',
          }}
        >
          <TextField
            placeholder="Search exceptions by ID, customer, or meter..."
            size="small"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
            }}
            sx={{ flexGrow: 1, minWidth: 300 }}
          />
          <Select value={typeFilter} onChange={handleTypeFilterChange} size="small">
            <MenuItem value="All Types">All Types</MenuItem>
            <MenuItem value="Reading Anomaly">Reading Anomaly</MenuItem>
            <MenuItem value="Meter Inaccessible">Meter Inaccessible</MenuItem>
            <MenuItem value="Damaged Meter">Damaged Meter</MenuItem>
            <MenuItem value="Zero Consumption">Zero Consumption</MenuItem>
            <MenuItem value="OCR Mismatch">OCR Mismatch</MenuItem>
          </Select>
          <Select value={severityFilter} onChange={handleSeverityFilterChange} size="small">
            <MenuItem value="All Severity">All Severity</MenuItem>
            <MenuItem value="High">High</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="Low">Low</MenuItem>
          </Select>
          <Select value={statusFilter} onChange={handleStatusFilterChange} size="small">
            <MenuItem value="All Status">All Status</MenuItem>
            <MenuItem value="Open">Open</MenuItem>
            <MenuItem value="Assigned">Assigned</MenuItem>
            <MenuItem value="In Progress">In Progress</MenuItem>
            <MenuItem value="Resolved">Resolved</MenuItem>
          </Select>
        </Box>
      </Paper>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={2.4}>
          <Card sx={{ height: '100%', borderRadius: 2, boxShadow: 2 }}>
            <CardContent>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Total Open
              </Typography>
              <Typography variant="h4" component="div" sx={{ fontWeight: 600, mt: 1 }}>
                {totalOpen}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={2.4}>
          <Card sx={{ height: '100%', borderRadius: 2, boxShadow: 2 }}>
            <CardContent>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                High Severity
              </Typography>
              <Typography variant="h4" component="div" sx={{ fontWeight: 600, mt: 1 }}>
                {highSeverity}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={2.4}>
          <Card sx={{ height: '100%', borderRadius: 2, boxShadow: 2 }}>
            <CardContent>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                In Progress
              </Typography>
              <Typography variant="h4" component="div" sx={{ fontWeight: 600, mt: 1 }}>
                {inProgress}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={2.4}>
          <Card sx={{ height: '100%', borderRadius: 2, boxShadow: 2 }}>
            <CardContent>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Resolved Today
              </Typography>
              <Typography variant="h4" component="div" sx={{ fontWeight: 600, mt: 1 }}>
                {resolvedToday}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={2.4}>
          <Card sx={{ height: '100%', borderRadius: 2, boxShadow: 2 }}>
            <CardContent>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Avg Resolution Time
              </Typography>
              <Typography variant="h4" component="div" sx={{ fontWeight: 600, mt: 1 }}>
                {avgResolutionTime}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Exception List */}
      <Paper sx={{ borderRadius: 2, boxShadow: 2, overflow: 'hidden' }}>
        <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <WarningIcon color="warning" />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Exception List
            </Typography>
          </Box>
        </Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: 'grey.50' }}>
                <TableCell sx={{ fontWeight: 600 }}>Exception ID</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Type</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Customer</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Meter ID</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Value</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Expected Range</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Severity</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mockExceptions.map((exception) => (
                <TableRow key={exception.id} hover>
                  <TableCell>{exception.id}</TableCell>
                  <TableCell>{exception.type}</TableCell>
                  <TableCell>{exception.customer}</TableCell>
                  <TableCell>{exception.meterId}</TableCell>
                  <TableCell>{exception.value}</TableCell>
                  <TableCell>{exception.expectedRange}</TableCell>
                  <TableCell>
                    <Chip
                      label={exception.severity}
                      size="small"
                      color={getSeverityColor(exception.severity)}
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={exception.status}
                      size="small"
                      color={getStatusColor(exception.status)}
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>{exception.date}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => handleViewException(exception.id)}
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box
          sx={{
            p: 2,
            borderTop: 1,
            borderColor: 'divider',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant="body2" color="text.secondary">
            Showing 1-6 of {mockExceptions.length} exceptions
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              variant="outlined"
              size="small"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
            >
              Previous
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? 'contained' : 'outlined'}
                size="small"
                onClick={() => setCurrentPage(page)}
                sx={{
                  minWidth: 40,
                  bgcolor: currentPage === page ? 'grey.900' : 'transparent',
                  '&:hover': {
                    bgcolor: currentPage === page ? 'grey.800' : 'grey.50',
                  },
                }}
              >
                {page}
              </Button>
            ))}
            <Button
              variant="outlined"
              size="small"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
            >
              Next
            </Button>
          </Box>
        </Box>
      </Paper>

      {/* Exception Details and Activity Timeline Section */}
      {selectedException && (
        <Grid container spacing={3} sx={{ mt: 3 }}>
          {/* Left Panel: Exception Details */}
          <Grid item xs={12} lg={6}>
            <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 2, height: '100%' }}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                Exception Details - {selectedException.id}
              </Typography>

              <Grid container spacing={2}>
                {/* Exception Type */}
                <Grid item xs={12}>
                  <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Exception Type
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {selectedException.type}
                    </Typography>
                  </Paper>
                </Grid>

                {/* Customer */}
                <Grid item xs={12}>
                  <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Customer
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {selectedException.customer}
                    </Typography>
                  </Paper>
                </Grid>

                {/* Severity */}
                <Grid item xs={12}>
                  <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Severity
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: 500,
                        color:
                          selectedException.severity === 'High'
                            ? 'error.main'
                            : selectedException.severity === 'Medium'
                              ? 'warning.main'
                              : 'info.main',
                      }}
                    >
                      {selectedException.severity}
                    </Typography>
                  </Paper>
                </Grid>

                {/* Meter ID */}
                <Grid item xs={12}>
                  <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Meter ID
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {selectedException.meterId}
                    </Typography>
                  </Paper>
                </Grid>

                {/* Description */}
                <Grid item xs={12}>
                  <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Description
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      {selectedException.description}
                    </Typography>
                  </Paper>
                </Grid>

                {/* Add Note */}
                <Grid item xs={12}>
                  <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Add Note
                    </Typography>
                    <TextField
                      placeholder="Enter investigation notes..."
                      multiline
                      rows={3}
                      fullWidth
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      sx={{ mt: 1 }}
                    />
                  </Paper>
                </Grid>
              </Grid>

              {/* Action Buttons */}
              <Box sx={{ display: 'flex', gap: 2, mt: 3, flexWrap: 'wrap' }}>
                <Button
                  variant="contained"
                  onClick={handleMarkAsResolved}
                  sx={{
                    bgcolor: 'grey.900',
                    '&:hover': { bgcolor: 'grey.800' },
                    flex: 1,
                    minWidth: 150,
                  }}
                >
                  Mark as Resolved
                </Button>
                <Button
                  variant="outlined"
                  onClick={handleAssignToTechnician}
                  sx={{ flex: 1, minWidth: 150 }}
                >
                  Assign to Technician
                </Button>
                <Button
                  variant="outlined"
                  onClick={handleRequestReRead}
                  sx={{ flex: 1, minWidth: 150 }}
                >
                  Request Re-read
                </Button>
              </Box>
            </Paper>
          </Grid>

          {/* Right Panel: Activity Timeline */}
          <Grid item xs={12} lg={6}>
            <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 2, height: '100%' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                <TimelineIcon color="primary" />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Activity Timeline
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                {selectedException.activityTimeline.map((activity, index) => (
                  <Box key={index}>
                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ minWidth: 50, fontWeight: 500 }}
                      >
                        {activity.time}
                      </Typography>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {activity.action}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {activity.user}
                        </Typography>
                      </Box>
                    </Box>
                    {index < selectedException.activityTimeline.length - 1 && (
                      <Divider sx={{ mt: 2 }} />
                    )}
                  </Box>
                ))}
              </Box>
            </Paper>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};
